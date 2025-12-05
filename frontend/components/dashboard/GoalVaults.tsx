"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { GoalCard } from "./GoalCard";
import { CreateGoalModal } from "./CreateGoalModal";

export interface Goal {
  id: number;
  title: string;
  badge: string;
  apy: number;
  progress: number;
  currentAmount: number;
  targetAmount: number;
  date: string;
}

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

  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-[#1F854E] rounded-full" />
          <h2 className="text-xl font-bold text-gray-900">My Goal Vaults</h2>
        </div>
        <button className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              {...goal}
              onTopUp={(amount) => handleTopUp(goal.id, amount)}
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
            className="bg-white/50 border-2 border-dashed border-gray-300 rounded-3xl flex flex-col items-center justify-center gap-4 text-gray-500 hover:border-green-500 hover:text-green-600 transition-all min-h-[300px] group"
          >
            <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Plus className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-gray-900 group-hover:text-green-700">
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
