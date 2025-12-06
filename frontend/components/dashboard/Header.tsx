"use client";

import { motion } from "framer-motion";
import { TrendingUp, Wallet, PieChart } from "lucide-react";

export const Header = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 mb-8">
      {/* Total Portfolio Value */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:w-[42%] w-full bg-[#1F854E] rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-green-900/20 min-h-[220px] flex flex-col justify-between"
      >
        <div className="absolute right-0 top-0 h-full w-1/2 bg-linear-to-l from-white/5 to-transparent" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />

        <div className="relative z-10">
          <h3 className="text-green-100 text-xs font-semibold tracking-wider uppercase mb-2">
            Total Portfolio Value
          </h3>
          <h1 className="text-5xl font-bold mb-6 tracking-tight">$24,562.84</h1>

          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 text-sm font-medium">
              <TrendingUp className="w-4 h-4" />
              +$1,240.50 (5.2%)
            </div>
          </div>
        </div>
      </motion.div>

      {/* Total Profit Earned */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex-1 bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden flex flex-col justify-between min-h-[220px]"
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-gray-500 text-xs font-bold tracking-wider uppercase">
            Total Profit Earned
          </h3>
          <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
            <PieChart className="w-4 h-4 text-green-600" />
          </div>
        </div>

        <div>
          <div className="flex items-baseline gap-3 mb-1">
            <h2 className="text-3xl font-bold text-gray-900">$3,240.12</h2>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +12.5%
            </span>
          </div>
          <p className="text-gray-400 text-xs">Accumulated across 3 vaults</p>
        </div>
      </motion.div>

      {/* Available Capital */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-1 bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden flex flex-col justify-between min-h-[220px]"
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-gray-500 text-xs font-bold tracking-wider uppercase">
            Available Capital
          </h3>
          <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
            <Wallet className="w-4 h-4 text-green-600" />
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-1">$4,500.00</h2>
          <p className="text-gray-400 text-xs">Ready to deploy</p>
        </div>
      </motion.div>
    </div>
  );
};
