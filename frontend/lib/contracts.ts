/**
 * Contract Addresses - BSC Testnet
 * 
 * These are the deployed contract addresses on BSC Testnet
 * Update these if you deploy to a different network or redeploy
 */

export const CONTRACT_ADDRESSES = {
  // AhdaafPoolV1 - Mudarabah Investment Pool
  AHDAAF_POOL: "0x44a36337732c083B7A7E0C13530aAb27f3738b41" as const,
  
  // MockERC20 - USDT Token
  MOCK_ERC20: "0x1E685A5d614aB471d5943bFD5A88A994524a2DD0" as const,
} as const;

/**
 * Network Configuration
 */
export const NETWORK_CONFIG = {
  chainId: 97, // BSC Testnet
  chainName: "BSC Testnet",
  rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545",
  explorerUrl: "https://testnet.bscscan.com",
} as const;

/**
 * Get contract address with validation
 */
export function getContractAddress(contractName: keyof typeof CONTRACT_ADDRESSES): string {
  const address = CONTRACT_ADDRESSES[contractName];
  if (!address || address === "0x0000000000000000000000000000000000000000") {
    throw new Error(`Invalid contract address for ${contractName}`);
  }
  return address;
}

