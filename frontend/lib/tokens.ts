import { defineChain } from "thirdweb";

// BNB Chain Testnet
export const bnbTestnet = defineChain(97);

// Test token on BNB Chain Testnet
export const TOKENS = {
  BUSN: {
    address: "0x622751a38CDaF0C563359AdC50796B736ee2Cd2a" as const,
    symbol: "BUSN",
    decimals: 18,
    name: "BUSN Test Token",
    logo: "🧪",
  },
} as const;

export type TokenSymbol = keyof typeof TOKENS;
