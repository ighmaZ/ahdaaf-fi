# Quick Deployment Steps

## ✅ Completed
- [x] Dependencies installed
- [x] Contracts compiled successfully
- [x] .env file created

## 📝 Next Steps

### 1. Configure .env File

Edit `.env` and add your credentials:

```bash
# Get from MetaMask: Account Details > Export Private Key
PRIVATE_KEY=0xYourPrivateKeyHere

# Get from: https://bscscan.com/apis (free account)
BSCSCAN_API_KEY=YourBSCScanAPIKey
```

### 2. Choose Deployment Network

**Option A: BSC Testnet (Recommended for testing)**
```bash
npm run deploy:bsc-testnet
```

**Requirements:**
- Get testnet BNB: https://testnet.binance.org/faucet-smart
- Add BSC Testnet to MetaMask: https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain

**Option B: BSC Mainnet (Production)**
```bash
npm run deploy:bsc
```

**Requirements:**
- Real BNB in your wallet for gas fees
- Make sure you've tested on testnet first!

### 3. Verify Contracts

After deployment, you'll see verification commands. Run them:

**For Testnet:**
```bash
npx hardhat verify --network bscTestnet <MOCK_ERC20_ADDRESS>
npx hardhat verify --network bscTestnet <AHDAAF_POOL_ADDRESS> <MOCK_ERC20_ADDRESS>
```

**For Mainnet:**
```bash
npx hardhat verify --network bsc <MOCK_ERC20_ADDRESS>
npx hardhat verify --network bsc <AHDAAF_POOL_ADDRESS> <MOCK_ERC20_ADDRESS>
```

## 🚀 Ready to Deploy?

Once you've added your PRIVATE_KEY and BSCSCAN_API_KEY to `.env`, run:

```bash
# For testnet (recommended first)
npm run deploy:bsc-testnet

# Or for mainnet
npm run deploy:bsc
```

## 📋 What You'll Get

After deployment, save these addresses:
- MockERC20: `0x...`
- AhdaafPoolV1: `0x...`

Add them to your frontend configuration!

