# Demo CCTP Transfers

This project demonstrates how to perform cross-chain transfers using Circle's CCTP (Cross-Chain Transfer Protocol) and the **Wormhole SDK**. The tutorial covers three main scenarios for transferring assets between different blockchains:

 - **Manual transfer** – step-by-step transfer where each phase of the process is manually handled
 - **Automatic transfer** – fully automated transfer where steps are executed in one command
 - **Partial manual transfer** – completing a transfer from a given transaction ID (in case of an interrupted or incomplete transfer)

## Prerequisites

Before you begin, ensure you have the following:

 - [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed on your machine
 - [USDC tokens](https://faucet.circle.com/) on supported chains. This tutorial uses Avalanche and Sepolia as examples
 - A wallet with a private key, funded with native tokens (Testnet or Mainnet) for gas fees

Create a `.env` file at the root of the project with your private keys:

```bash
ETH_PRIVATE_KEY="INSERT_PRIVATE_KEY"
SOL_PRIVATE_KEY="INSERT_PRIVATE_KEY" // must be base58 not a byte array!
```

## Installation

1. Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/wormhole-foundation/demo-cctp-transfer.git
cd demo-cctp-transfer
```

2. Install the project dependencies:

```bash
npm install
```

## Running Transfers

### Manual Transfer

In a manual transfer, each step is controlled explicitly, allowing you to initiate the transfer, wait for Circle attestation, and complete the process.

```bash
npm run circle:manual
```

Process:

 - The script initiates the transfer from the source chain (e.g., Avalanche)
 - Waits for Circle attestation
 - Completes the transfer on the destination chain (e.g., Sepolia)

### Automatic Transfer

The automatic transfer performs the entire process in a single execution. It automatically handles both initiation and completion of the transfer, including managing gas payments.

```bash
npm run circle:auto
```

Process:

 - The transfer is executed between the source chain (e.g., Avalanche) and the destination chain (e.g., Sepolia)
 - Gas fees can be managed automatically if set to true

### Partial Transfer

This script is useful if the transfer process is interrupted or if you need to resume a transfer using a transaction ID (`txid`). Please update the `txid` in the script before running.

```bash
npm run circle:partial
```

Process:

 - Rebuilds a transfer from a specific transaction ID
 - Completes the transfer using the transaction state

## Conclusion

This tutorial covers basic usage of the Wormhole SDK to transfer assets across different blockchains using Circle's CCTP. Each of the provided scripts illustrates a different approach to handling transfers, allowing for flexibility depending on your use case.

For more information, refer to the official [Wormhole documentation](https://wormhole.com/docs/learn/messaging/cctp/).
