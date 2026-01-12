# Demo CCTP Transfers

This project demonstrates how to perform cross-chain transfers using Circle's CCTP (Cross-Chain Transfer Protocol) and the **Wormhole SDK**. 

The tutorial covers the **Executor routes**, which provide an automatic flow: the source transaction initiates the transfer, and a relay provider completes attestation retrieval and redemption on the destination chain.

Two variants are provided:

- **CCTP v1 Executor route** (`circle:executor:v1`)
- **CCTP v2 Executor route** (`circle:executor:v2`)

Which one to run depends on the source/destination configuration.

For a complete tutorial on performing cross-chain transfers using CCTP from scratch, please take a look at the [Wormhole CCTP Tutorial](https://wormhole.com/docs/tutorials/messaging/cctp/).

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

This project demonstrates how to execute native USDC transfers using Circle’s CCTP via the Wormhole Executor framework. Transfers are initiated on the source chain and automatically completed on the destination chain by a relay provider.

Two Executor routes are provided, depending on the CCTP version supported by the destination chain.

### CCTP v1

This script performs a native USDC transfer using the CCTP v1 Executor route. It initiates the transfer on the source chain and relies on a relay provider to handle attestation retrieval and redemption on the destination chain.

```bash
npm run circle:executor:v1
```

Process:

 - Initiates a CCTP USDC burn on the source chain
 - Emits a Wormhole message used for execution
 - Requests execution through the CCTP v1 Executor route
 - A relay provider completes attestation retrieval and redemption on the destination chain

### CCTP v2

This script performs the same flow using the CCTP v2 standard Executor route.  

```bash
npm run circle:executor:v2
```

Process:

 - Initiates a CCTP v2 USDC burn on the source chain
 - Emits a Wormhole message containing transfer metadata
 - Requests execution through the CCTP v2 Executor route
 - A relay provider redeems USDC and completes the transfer on the destination chain

## Conclusion

This repository demonstrates how to perform native USDC transfers using Circle’s CCTP through the Wormhole Executor framework. Transfers are initiated on the source chain and completed automatically by relay providers, without requiring applications to manage attestations or destination-chain redemption.

Both CCTP v1 and CCTP v2 Executor routes are included to support different source/destination configurations. The overall execution flow is the same; only the route selection differs.

For more information, refer to the official [Wormhole documentation](https://wormhole.com/docs/learn/messaging/cctp/).