import { CircleTransfer, wormhole } from '@wormhole-foundation/sdk';
import evm from '@wormhole-foundation/sdk/evm';
import solana from '@wormhole-foundation/sdk/solana';
import { getSigner } from './helpers/helpers';

(async function () {
	// Initialize the Wormhole object for the Testnet environment and add supported chains (evm and solana)
	const wh = await wormhole('Testnet', [evm, solana]);

	// Grab chain Contexts -- these hold a reference to a cached rpc client
	const rcvChain = wh.getChain('Solana');

	// Get signer from local key
	const destination = await getSigner(rcvChain);

	const timeout = 60 * 1000; // Timeout in milliseconds (60 seconds)

	// Rebuild the transfer from the source txid
	const xfer = await CircleTransfer.from(
		wh,
		{
			chain: 'Avalanche',
			txid: '0x6b6d5f101a32aa6d2f7bf0bf14d72bfbf76a640e1b2fdbbeeac5b82069cda4dd',
		},
		timeout
	);

	const dstTxIds = await xfer.completeTransfer(destination.signer);
	console.log('Completed transfer: ', dstTxIds);

	console.log('Circle Transfer status: ', xfer);

	process.exit(0);
})();
