"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { TopUpModal } from "./TopUpModal";

interface GoalProps {
  title: string;
  badge: string;
  apy: number;
  progress: number;
  currentAmount: number;
  targetAmount: number;
  date: string;
  onTopUp: (amount: number) => void;
}

export const GoalCard = ({
  title,
  badge,
  apy,
  progress,
  currentAmount,
  targetAmount,
  date,
  onTopUp,
}: GoalProps) => {
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 min-w-[300px] flex-1"
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

      <div className="flex justify-between items-end mb-6">
        <div>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">
            Current
          </p>
          <p className="text-xl font-bold text-gray-900">
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

      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <div className="w-4 h-4 rounded-full border border-gray-200 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
          </div>
          Goal: {date}
        </div>
        <button
          onClick={() => setIsTopUpModalOpen(true)}
          className="flex items-center gap-1 text-xs font-bold text-gray-900 hover:text-green-600 transition-colors border border-gray-200 rounded-full px-3 py-1.5 hover:border-green-600"
        >
          Top Up <Plus className="w-3 h-3" />
        </button>
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
    </motion.div>
  );
};
