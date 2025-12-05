"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { GoalCard } from "./GoalCard";
import { CreateGoalModal } from "./CreateGoalModal";
import { DEFI_PROTOCOLS } from "./InvestModal";

export interface Goal {
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
}

// Helper function to calculate next payout date
const getNextPayoutDate = (protocolId: string): string => {
  const protocol = DEFI_PROTOCOLS.find((p) => p.id === protocolId);
  if (!protocol) return "";

  const now = new Date();
  switch (protocol.payoutFrequency) {
    case "Daily":
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      return tomorrow.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    case "Weekly":
      const nextWeek = new Date(now);
      nextWeek.setDate(nextWeek.getDate() + (7 - nextWeek.getDay()));
      return nextWeek.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    case "Monthly":
      const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      return nextMonth.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    default:
      return "";
  }
};

const initialGoals: Goal[] = [
  {
    id: 1,
    title: "Hajj Fund 2026",
    badge: "Hajj Vault",
    apy: 8.5,
    progress: 56,
    currentAmount: 8450,
    targetAmount: 15000,
    date: "Jun 2026",
    investedAmount: 0,
    investedProtocol: null,
    nextPayout: null,
  },
  {
    id: 2,
    title: "Tesla Model Y",
    badge: "Auto Vault",
    apy: 12.4,
    progress: 27,
    currentAmount: 12300,
    targetAmount: 45000,
    date: "Dec 2025",
    investedAmount: 0,
    investedProtocol: null,
    nextPayout: null,
  },
];

export const GoalVaults = () => {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateGoal = (goalData: {
    title: string;
    targetAmount: number;
    date: string;
  }) => {
    const newGoal: Goal = {
      id: Date.now(),
      title: goalData.title,
      badge: "Savings Vault",
      apy: parseFloat((5.0 + Math.random() * 5).toFixed(1)), // Random APY between 5-10%
      progress: 0,
      currentAmount: 0,
      targetAmount: goalData.targetAmount,
      date: goalData.date,
      investedAmount: 0,
      investedProtocol: null,
      nextPayout: null,
    };
    setGoals([...goals, newGoal]);
  };

  const handleTopUp = (goalId: number, amount: number) => {
    setGoals(
      goals.map((goal) => {
        if (goal.id === goalId) {
          const newCurrentAmount = goal.currentAmount + amount;
          const newProgress = Math.min(
            Math.round((newCurrentAmount / goal.targetAmount) * 100),
            100
          );
          return {
            ...goal,
            currentAmount: newCurrentAmount,
            progress: newProgress,
          };
        }
        return goal;
      })
    );
  };

  const handleInvest = (goalId: number, protocolId: string, amount: number) => {
    setGoals(
      goals.map((goal) => {
        if (goal.id === goalId) {
          const protocol = DEFI_PROTOCOLS.find((p) => p.id === protocolId);
          return {
            ...goal,
            investedAmount: goal.investedAmount + amount,
            investedProtocol: protocolId,
            nextPayout: getNextPayoutDate(protocolId),
            apy: protocol?.apy || goal.apy,
          };
        }
        return goal;
      })
    );
  };

  return (
    <section className="mb-8 sm:mb-12">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-1 h-5 sm:h-6 bg-[#1F854E] rounded-full" />
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            My Goal Vaults
          </h2>
        </div>
        <button className="text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <AnimatePresence mode="popLayout">
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              {...goal}
              onTopUp={(amount) => handleTopUp(goal.id, amount)}
              onInvest={(protocolId, amount) =>
                handleInvest(goal.id, protocolId, amount)
              }
            />
          ))}

          <motion.button
            layout
            onClick={() => setIsCreateModalOpen(true)}
            whileHover={{
              scale: 1.02,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            }}
            whileTap={{ scale: 0.98 }}
            className="bg-white/50 border-2 border-dashed border-gray-300 rounded-3xl flex flex-col items-center justify-center gap-4 text-gray-500 hover:border-green-500 hover:text-green-600 transition-all min-h-[200px] sm:min-h-[300px] group p-4"
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Plus className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-gray-900 group-hover:text-green-700 text-sm sm:text-base">
                Create New Goal
              </h3>
              <p className="text-xs text-gray-400">Start your journey</p>
            </div>
          </motion.button>
        </AnimatePresence>
      </div>

      <CreateGoalModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateGoal={handleCreateGoal}
      />
    </section>
  );
};
