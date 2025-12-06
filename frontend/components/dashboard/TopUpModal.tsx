"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Wallet,
  DollarSign,
  TrendingUp,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useActiveAccount } from "thirdweb/react";
import { prepareContractCall, sendTransaction, waitForReceipt } from "thirdweb";
import { getContract } from "thirdweb/contract";
import { client } from "@/lib/thirdwebClient";
import { bnbTestnet } from "@/lib/tokens";
import { CONTRACT_ADDRESSES } from "@/lib/contracts";
import { TOKENS } from "@/lib/tokens";

interface TopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTopUp: (amount: number) => void;
  goalTitle: string;
  goalId: number;
  currentAmount: number;
  targetAmount: number;
  date: string;
}

export const TopUpModal = ({
  isOpen,
  onClose,
  onTopUp,
  goalTitle,
  goalId,
  currentAmount,
  targetAmount,
  date,
}: TopUpModalProps) => {
  const account = useActiveAccount();
  const [amount, setAmount] = useState("");
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const remaining = targetAmount - currentAmount;
  const progress = Math.round((currentAmount / targetAmount) * 100);

  const quickAmounts = [100, 500, 1000, remaining > 0 ? remaining : 0].filter(
    (a) => a > 0
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || parseFloat(amount) <= 0 || !account) {
      setError("Please enter a valid amount and connect your wallet");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Convert amount to token units (USDT has 6 decimals)
      const amountInWei = BigInt(
        Math.floor(parseFloat(amount) * 10 ** TOKENS.USDT.decimals)
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
        // Need to approve
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

      // Step 2: Call deposit function on pool contract
      const depositTx = prepareContractCall({
        contract: poolContract,
        method: "function deposit(uint256 goalId, uint256 amount) external",
        params: [BigInt(goalId), amountInWei],
      });

      const depositResult = await sendTransaction({
        transaction: depositTx,
        account,
      });

      await waitForReceipt(depositResult);

      // Call the onTopUp callback for UI updates
      onTopUp(parseFloat(amount));

      // Reset form and close
      setAmount("");
      onClose();
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
      setIsLoading(false);
    }
  };

  const handleQuickAmount = (value: number) => {
    setAmount(value.toString());
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 flex items-center justify-center z-[9999] p-4 pointer-events-none"
          >
            <div className="w-full max-w-md pointer-events-auto">
              <div className="bg-white rounded-3xl p-8 shadow-2xl">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
                      <Wallet className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Top Up
                      </h2>
                      <p className="text-sm text-gray-500">
                        Add to your savings
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Goal Info Card */}
                <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-2xl p-5 mb-6">
                  <h3 className="font-bold text-gray-900 text-lg mb-3">
                    {goalTitle}
                  </h3>

                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">
                        Current
                      </p>
                      <p className="text-xl font-bold text-gray-900">
                        ${currentAmount.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">
                        Target
                      </p>
                      <p className="text-xl font-bold text-green-600">
                        ${targetAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-2">
                    <div className="h-2 w-full bg-white rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="h-full bg-[#1F854E] rounded-full"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">{progress}% complete</span>
                    <span className="text-gray-500 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Goal: {date}
                    </span>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Amount Input */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                      Amount to Add
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        min="0.01"
                        step="0.01"
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-900 placeholder:text-gray-400 text-lg font-medium"
                        required
                      />
                    </div>
                  </div>

                  {/* Quick Amount Buttons */}
                  <div className="flex flex-wrap gap-2">
                    {quickAmounts.map((quickAmount) => (
                      <button
                        key={quickAmount}
                        type="button"
                        onClick={() => handleQuickAmount(quickAmount)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          parseFloat(amount) === quickAmount
                            ? "bg-green-600 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {quickAmount === remaining ? (
                          <span>
                            Fill remaining (${remaining.toLocaleString()})
                          </span>
                        ) : (
                          `$${quickAmount.toLocaleString()}`
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Remaining Info */}
                  {remaining > 0 && (
                    <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 rounded-xl p-3">
                      <span className="text-xs">💡</span>
                      <span>
                        ${remaining.toLocaleString()} remaining to reach your
                        goal
                      </span>
                    </div>
                  )}

                  {/* Error Message */}
                  {error && (
                    <div className="flex items-start gap-2 text-xs text-red-700 bg-red-50 rounded-xl p-3">
                      <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isLoading || !account}
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    className="w-full py-4 bg-[#1F854E] text-white font-bold rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Add Funds"
                    )}
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};
