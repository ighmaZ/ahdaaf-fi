# 🎉 Deployed Contracts on BSC Testnet

## Contract Addresses

### MockERC20 (USDT)
**Address:** `0x1E685A5d614aB471d5943bFD5A88A994524a2DD0`  
**Verified:** ✅ https://testnet.bscscan.com/address/0x1E685A5d614aB471d5943bFD5A88A994524a2DD0#code

### AhdaafPoolV1 (Mudarabah Pool)
**Address:** `0x44a36337732c083B7A7E0C13530aAb27f3738b41`  
**Verified:** ✅ https://testnet.bscscan.com/address/0x44a36337732c083B7A7E0C13530aAb27f3738b41#code

## Network Information

- **Network:** BSC Testnet
- **Chain ID:** 97
- **RPC URL:** https://data-seed-prebsc-1-s1.binance.org:8545
- **Explorer:** https://testnet.bscscan.com

## Frontend Configuration

Add these to your frontend `lib/contracts.ts`:

```typescript
export const CONTRACT_ADDRESSES = {
  AHDAAF_POOL: "0x44a36337732c083B7A7E0C13530aAb27f3738b41",
  MOCK_ERC20: "0x1E685A5d614aB471d5943bFD5A88A994524a2DD0",
} as const;

export const NETWORK_CONFIG = {
  chainId: 97,
  chainName: "BSC Testnet",
  rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545",
} as const;
```

## Testing the Contracts

### 1. Get Testnet BNB
Visit: https://testnet.binance.org/faucet-smart

### 2. Interact with Contracts

**View on BSCScan:**
- MockERC20: https://testnet.bscscan.com/address/0x1E685A5d614aB471d5943bFD5A88A994524a2DD0
- AhdaafPoolV1: https://testnet.bscscan.com/address/0x44a36337732c083B7A7E0C13530aAb27f3738b41

**Connect MetaMask:**
1. Add BSC Testnet network
2. Get testnet BNB from faucet
3. Connect to your frontend
4. Start testing deposits and profit distribution!

## Next Steps

1. ✅ Contracts deployed
2. ✅ Contracts verified
3. 📝 Add addresses to frontend
4. 🧪 Test deposit functionality
5. 🚀 Deploy to BSC Mainnet when ready

## Mainnet Deployment

When ready for mainnet, run:
```bash
npm run deploy:bsc
```

Then verify:
```bash
npx hardhat verify --network bsc <MOCK_ERC20_ADDRESS>
npx hardhat verify --network bsc <AHDAAF_POOL_ADDRESS> <MOCK_ERC20_ADDRESS>
```

