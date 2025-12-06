"use client";

import { useState } from "react";
import { Search, Bell, ChevronDown, Wallet } from "lucide-react";
import Image from "next/image";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client } from "@/lib/thirdwebClient";
import { useTokenBalances } from "@/hooks/useTokenBalances";
import { bnbTestnet } from "@/lib/tokens";

export const TopNav = () => {
  const account = useActiveAccount();
  const { balances, isLoading } = useTokenBalances();
  const [showBalances, setShowBalances] = useState(false);

  return (
    <nav className="flex items-center justify-between px-8 py-6 bg-[#F0F2F5]/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search vaults, tokens, or goals..."
          className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border-none focus:ring-2 focus:ring-green-500/20 outline-none text-sm shadow-sm text-gray-600 placeholder:text-gray-400 transition-all"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-white/80 transition-colors relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#F0F2F5]"></span>
        </button>

        {/* Token Balances Dropdown */}
        {account && (
          <div className="relative z-[100]">
            <button
              onClick={() => setShowBalances(!showBalances)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all"
            >
              <Wallet className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">
                {isLoading ? "Loading..." : "Balances"}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform ${
                  showBalances ? "rotate-180" : ""
                }`}
              />
            </button>

            {showBalances && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-[100]">
                <div className="p-3 border-b border-gray-100 bg-gray-50">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    BNB Testnet Balance
                  </p>
                </div>
                <div className="p-2 max-h-80 overflow-y-auto">
                  {isLoading ? (
                    <div className="p-4 text-center text-sm text-gray-500">
                      Loading balances...
                    </div>
                  ) : balances.length > 0 ? (
                    balances.map((token) => (
                      <div
                        key={token.symbol}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors gap-4"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-xl flex-shrink-0">
                            {token.logo}
                          </span>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-900">
                              {token.symbol}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {token.name}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm font-bold text-gray-900 flex-shrink-0 text-right">
                          {token.balance}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-sm text-gray-500">
                      No tokens found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <ConnectButton client={client} chain={bnbTestnet} />

        <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-pink-500 p-[2px]">
          <div className="w-full h-full rounded-full bg-white overflow-hidden relative">
            <Image
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="User"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      </div>
    </nav>
  );
};
