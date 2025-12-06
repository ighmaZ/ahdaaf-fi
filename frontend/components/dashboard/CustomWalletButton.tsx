"use client";

import { useActiveAccount, useDisconnect } from "thirdweb/react";
import { useTokenBalances } from "@/hooks/useTokenBalances";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function CustomWalletButton() {
  const account = useActiveAccount();
  const { disconnect } = useDisconnect();
  const { balances, isLoading } = useTokenBalances();
  const [showMenu, setShowMenu] = useState(false);

  if (!account) {
    return null;
  }

  const usdtBalance = balances.length > 0 ? balances[0] : null;
  const truncatedAddress = `${account.address.slice(
    0,
    6
  )}...${account.address.slice(-4)}`;

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-3 px-4 py-2.5 bg-black rounded-full hover:opacity-90 transition-opacity"
      >
        {/* Purple gradient circle */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex-shrink-0" />

        {/* Address and Balance */}
        <div className="flex flex-col items-start">
          <span className="text-white font-semibold text-sm">
            {truncatedAddress}
          </span>
          <span className="text-gray-400 text-xs">
            {isLoading
              ? "Loading..."
              : usdtBalance
              ? `${usdtBalance.balance} ${usdtBalance.symbol}`
              : "0 USDT"}
          </span>
        </div>

        <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
      </button>

      {/* Dropdown Menu */}
      {showMenu && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
          <div className="p-2">
            <button
              onClick={() => {
                disconnect();
                setShowMenu(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Disconnect Wallet
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
