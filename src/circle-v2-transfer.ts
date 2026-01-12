import "@wormhole-foundation/sdk-evm-cctp";
import "@wormhole-foundation/sdk-solana-cctp";
import "@wormhole-labs/cctp-executor-route";

import { Wormhole, circle, routes } from '@wormhole-foundation/sdk';
import evm from '@wormhole-foundation/sdk/platforms/evm';
import solana from '@wormhole-foundation/sdk/platforms/solana';

import { cctpV2StandardExecutorRoute } from '@wormhole-labs/cctp-executor-route';
import type { CCTPv2ExecutorRoute } from '@wormhole-labs/cctp-executor-route/dist/esm/routes/cctpV2Base';
import "dotenv/config";
import { getSigner } from './helpers/helpers';

(async function () {
	const network = 'Testnet';
  	const wh = new Wormhole(network, [
    	evm.Platform,
    	solana.Platform
  	]);

	const sendChain = wh.getChain('Avalanche');
	const rcvChain = wh.getChain('Sepolia');

	// Get signer from local key
	const source = await getSigner(sendChain);
	const destination = await getSigner(rcvChain);

	// Fetch the USDC contract addresses for these chains
  	const srcUsdc = circle.usdcContract.get(network, sendChain.chain);
  	const dstUsdc = circle.usdcContract.get(network, rcvChain.chain);
	if (!srcUsdc || !dstUsdc) {
    	throw new Error('USDC is not configured on the selected source/destination');
  	}

	// Build a routing transfer request (USDC -> USDC)
	const tr = await routes.RouteTransferRequest.create(wh, {
		source: Wormhole.tokenId(sendChain.chain, srcUsdc),
		destination: Wormhole.tokenId(rcvChain.chain, dstUsdc),
		sourceDecimals: 6,
		destinationDecimals: 6,
		sender: source.address,
		recipient: destination.address,
	});

	// Configure the executor route 
  	const ExecutorRoute = cctpV2StandardExecutorRoute({ referrerFeeDbps: 0n });
  	const route = new ExecutorRoute(wh);

	// Define the amount of USDC to transfer
	const amt = '1.000001';

	// Set the native gas drop-off (0 <= nativeGas <= 1)
  	const nativeGasPercent = 0.1;

	const validated = await route.validate(tr, {
		amount: amt,
		options: { nativeGas: nativeGasPercent },
	});

	// Validate inputs and exit early on failure
	if (!validated.valid) {
		const { error } = validated as Extract<typeof validated, { valid: false }>;
		throw new Error(`Validation failed: ${error.message}`);
	}

	const validatedParams = validated.params as CCTPv2ExecutorRoute.ValidatedParams;
	const quote = await route.quote(tr, validatedParams);
	if (!quote.success) {
		const { error } = quote as Extract<typeof quote, { success: false }>;
		throw new Error(`Quote failed: ${error.message}`);
	}

	// Initiate the transfer on the source chain.
  	// The relay provider completes attestation + redemption on the destination.
  	const receipt = await route.initiate(tr, source.signer, quote, destination.address);

	if ('originTxs' in receipt && Array.isArray(receipt.originTxs)) {
    console.log('Source transactions:', receipt.originTxs);

    const lastTx = receipt.originTxs[receipt.originTxs.length - 1];
    if (lastTx) {
      const txid = typeof lastTx === 'string' ? lastTx : lastTx.txid ?? String(lastTx);
      const wormholeScanUrl = `https://wormholescan.io/#/tx/${txid}?network=${network}`;
      console.log('WormholeScan URL:', wormholeScanUrl);
    }
  } else {
    console.log('Receipt returned without origin transactions:', receipt);
  }

  process.exit(0);
})();