# Deployment Guide for BSC

## Prerequisites

1. **Node.js** installed (v16+)
2. **MetaMask** or wallet with BNB for gas
3. **BSCScan API Key** (for verification)

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Environment Variables

1. Copy the example env file:
```bash
cp .env.example .env
```

2. Edit `.env` and add:
   - `PRIVATE_KEY`: Your wallet private key (with BNB for gas)
   - `BSCSCAN_API_KEY`: Get from https://bscscan.com/apis

## Step 3: Compile Contracts

```bash
npm run compile
```

This will compile both contracts and create artifacts.

## Step 4: Deploy to BSC Testnet (Recommended First)

```bash
npm run deploy:bsc-testnet
```

**What you need:**
- BNB in your wallet on BSC Testnet
- Get testnet BNB from: https://testnet.binance.org/faucet-smart

**Output:**
- MockERC20 contract address
- AhdaafPoolV1 contract address
- Verification commands

## Step 5: Verify Contracts on BSCScan

After deployment, verify the contracts:

```bash
# Verify MockERC20
npx hardhat verify --network bscTestnet <MOCK_ERC20_ADDRESS>

# Verify AhdaafPoolV1 (with constructor argument)
npx hardhat verify --network bscTestnet <AHDAAF_POOL_ADDRESS> <MOCK_ERC20_ADDRESS>
```

Or use the commands provided in the deployment output.

## Step 6: Deploy to BSC Mainnet

⚠️ **Only after testing on testnet!**

```bash
npm run deploy:bsc
```

**Requirements:**
- BNB in your wallet (for gas fees)
- Mainnet BSC RPC URL (or use default)

**Verify on BSCScan:**
```bash
npx hardhat verify --network bsc <MOCK_ERC20_ADDRESS>
npx hardhat verify --network bsc <AHDAAF_POOL_ADDRESS> <MOCK_ERC20_ADDRESS>
```

## Troubleshooting

### "Insufficient funds"
- Make sure you have BNB in your wallet
- Check the network (testnet vs mainnet)

### "Contract verification failed"
- Make sure you're using the correct network
- Check constructor arguments match
- Wait a few minutes after deployment before verifying

### "Nonce too high"
- Reset your MetaMask account nonce
- Or wait for pending transactions to complete

## Contract Addresses

After deployment, save your addresses:

```
MockERC20: 0x...
AhdaafPoolV1: 0x...
```

Add these to your frontend configuration!

## Gas Costs (Approximate)

- MockERC20 deployment: ~1,500,000 gas
- AhdaafPoolV1 deployment: ~2,000,000 gas
- Total: ~3.5M gas × gas price

On BSC Testnet: Very cheap (testnet BNB)
On BSC Mainnet: ~$0.50-2.00 depending on gas price

