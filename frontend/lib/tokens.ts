import { defineChain } from "thirdweb";

// BNB Chain Testnet
export const bnbTestnet = defineChain(97);

// Tokens on BNB Chain Testnet
export const TOKENS = {
  USDT: {
    address: "0x1E685A5d614aB471d5943bFD5A88A994524a2DD0" as const, // MockERC20 deployed contract
    symbol: "USDT",
    decimals: 6,
    name: "Tether USDt",
    logo: "💵",
  },
} as const;

export type TokenSymbol = keyof typeof TOKENS;
