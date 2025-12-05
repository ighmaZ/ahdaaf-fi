"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Coins, Clock } from "lucide-react";
import { TopUpModal } from "./TopUpModal";
import { InvestModal, DEFI_PROTOCOLS } from "./InvestModal";

interface GoalProps {
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
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);
  const [isInvestModalOpen, setIsInvestModalOpen] = useState(false);

  const protocol = investedProtocol
    ? DEFI_PROTOCOLS.find((p) => p.id === investedProtocol)
    : null;

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
        <div className="text-right">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">
            APY
          </p>
          <p className="text-green-600 font-bold text-lg">{apy}%</p>
        </div>
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
      {nextPayout && protocol && (
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-1.5">
            <span className="text-base">{protocol.logo}</span>
            <span>{protocol.name}</span>
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
            onClick={() => setIsInvestModalOpen(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1 text-xs font-bold text-purple-700 hover:text-purple-800 transition-colors border border-purple-200 rounded-full px-3 py-1.5 hover:border-purple-400 hover:bg-purple-50"
          >
            Invest <Coins className="w-3 h-3" />
          </button>
          <button
            onClick={() => setIsTopUpModalOpen(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1 text-xs font-bold text-gray-900 hover:text-green-600 transition-colors border border-gray-200 rounded-full px-3 py-1.5 hover:border-green-600"
          >
            Top Up <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>

      <TopUpModal
        isOpen={isTopUpModalOpen}
        onClose={() => setIsTopUpModalOpen(false)}
        onTopUp={onTopUp}
        goalTitle={title}
        currentAmount={currentAmount}
        targetAmount={targetAmount}
        date={date}
      />

      <InvestModal
        isOpen={isInvestModalOpen}
        onClose={() => setIsInvestModalOpen(false)}
        onInvest={onInvest}
        goalTitle={title}
        currentAmount={currentAmount}
      />
    </motion.div>
  );
};
