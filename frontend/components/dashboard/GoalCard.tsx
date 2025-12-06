"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Coins, Clock, Loader2 } from "lucide-react";
import { TopUpModal } from "./TopUpModal";
import { DEFI_PROTOCOLS } from "./InvestModal";
import { useActiveAccount } from "thirdweb/react";
import { prepareContractCall, sendTransaction, waitForReceipt } from "thirdweb";
import { getContract } from "thirdweb/contract";
import { client } from "@/lib/thirdwebClient";
import { bnbTestnet } from "@/lib/tokens";
import { CONTRACT_ADDRESSES } from "@/lib/contracts";
import { TOKENS } from "@/lib/tokens";

interface GoalProps {
  id: number;
  title: string;
  badge: string;
  apy: number;
  progress: number;
  currentAmount: number;
  targetAmount: number;
  date: string;
  investedAmount: number;
  investedProtocol: string | null;
  nextPayout: string | null;
  onTopUp: (amount: number) => void;
  onInvest: (protocolId: string, amount: number) => void;
}

export const GoalCard = ({
  id,
  title,
  badge,
  apy,
  progress,
  currentAmount,
  targetAmount,
  date,
  investedAmount,
  investedProtocol,
  nextPayout,
  onTopUp,
  onInvest,
}: GoalProps) => {
  const account = useActiveAccount();
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);
  const [isInvesting, setIsInvesting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const protocol = investedProtocol
    ? DEFI_PROTOCOLS.find((p) => p.id === investedProtocol)
    : null;

  const handleInvest = async () => {
    if (!account || currentAmount <= 0) {
      setError("No funds available to invest");
      return;
    }

    setIsInvesting(true);
    setError(null);

    try {
      // Convert amount to token units (USDT has 6 decimals)
      const amountInWei = BigInt(
        Math.floor(currentAmount * 10 ** TOKENS.USDT.decimals)
      );

      // Get contract instances
      const tokenContract = getContract({
        client,
        chain: bnbTestnet,
        address: CONTRACT_ADDRESSES.MOCK_ERC20,
      });

      const poolContract = getContract({
        client,
        chain: bnbTestnet,
        address: CONTRACT_ADDRESSES.AHDAAF_POOL,
      });

      // Step 1: Check and approve token spending
      const { allowance } = await import("thirdweb/extensions/erc20");

      const currentAllowance = await allowance({
        contract: tokenContract,
        owner: account.address,
        spender: CONTRACT_ADDRESSES.AHDAAF_POOL,
      });

      if (currentAllowance < amountInWei) {
        // Need to approve - approve() already returns a PreparedTransaction
        const { approve } = await import("thirdweb/extensions/erc20");
        const approveTx = approve({
          contract: tokenContract,
          spender: CONTRACT_ADDRESSES.AHDAAF_POOL,
          amount: amountInWei,
        });

        const approveResult = await sendTransaction({
          transaction: approveTx,
          account,
        });

        await waitForReceipt(approveResult);
      }

      // Step 2: Call deposit function
      const depositTx = prepareContractCall({
        contract: poolContract,
        method: "function deposit(uint256 goalId, uint256 amount) external",
        params: [BigInt(id), amountInWei],
      });

      const depositResult = await sendTransaction({
        transaction: depositTx,
        account,
      });

      await waitForReceipt(depositResult);

      // Call the onInvest callback for UI updates (using first protocol as default)
      onInvest(DEFI_PROTOCOLS[0]?.id || "pancakeswap", currentAmount);
    } catch (err: any) {
      console.error("Transaction error:", err);
      
      // Handle different error types
      let errorMessage = "Transaction failed. Please try again.";
      
      if (err?.message) {
        errorMessage = err.message;
      } else if (typeof err === "string") {
        errorMessage = err;
      } else if (err?.reason) {
        errorMessage = err.reason;
      } else if (err?.error?.message) {
        errorMessage = err.error.message;
      } else if (err?.data?.message) {
        errorMessage = err.data.message;
      } else if (err?.shortMessage) {
        errorMessage = err.shortMessage;
      } else if (err?.code === 4001) {
        errorMessage = "Transaction rejected by user";
      } else if (err?.code === "ACTION_REJECTED") {
        errorMessage = "Transaction rejected by user";
      }
      
      setError(errorMessage);
    } finally {
      setIsInvesting(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-gray-100 w-full"
    >
      <div className="flex justify-between items-start mb-6">
        <span className="bg-orange-50 text-orange-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {badge}
        </span>
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>

      <div className="mb-6">
        <div className="flex justify-between text-xs mb-2">
          <span className="text-gray-400">Progress</span>
          <span className="text-gray-900 font-bold">{progress}%</span>
        </div>
        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-[#1F854E] rounded-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">
            Current
          </p>
          <p className="text-lg sm:text-xl font-bold text-gray-900">
            ${currentAmount.toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">
            Target
          </p>
          <p className="text-gray-500 font-medium text-sm">
            ${targetAmount.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Next Payout */}
      {nextPayout && (
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-1.5">
            <span className="text-base">💰</span>
            <span>AhdaafPoolV1</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>Payout: {nextPayout}</span>
          </div>
        </div>
      )}

      {/* Goal Date & Action Buttons */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-gray-50 gap-3">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <div className="w-4 h-4 rounded-full border border-gray-200 flex items-center justify-center shrink-0">
            <div className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
          </div>
          <span className="whitespace-nowrap">Goal: {date}</span>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleInvest}
            disabled={isInvesting || currentAmount <= 0 || !account}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1 text-xs font-bold text-purple-700 hover:text-purple-800 transition-colors border border-purple-200 rounded-full px-3 py-1.5 hover:border-purple-400 hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isInvesting ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Invest <Coins className="w-3 h-3" />
              </>
            )}
          </button>
          <button
            onClick={() => setIsTopUpModalOpen(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1 text-xs font-bold text-gray-900 hover:text-green-600 transition-colors border border-gray-200 rounded-full px-3 py-1.5 hover:border-green-600"
          >
            Top Up <Plus className="w-3 h-3" />
          </button>
        </div>
        {error && (
          <div className="mt-2 text-xs text-red-600 bg-red-50 rounded-lg p-2">
            {error}
          </div>
        )}
      </div>

      <TopUpModal
        isOpen={isTopUpModalOpen}
        onClose={() => setIsTopUpModalOpen(false)}
        onTopUp={onTopUp}
        goalTitle={title}
        goalId={id}
        currentAmount={currentAmount}
        targetAmount={targetAmount}
        date={date}
      />
    </motion.div>
  );
};
