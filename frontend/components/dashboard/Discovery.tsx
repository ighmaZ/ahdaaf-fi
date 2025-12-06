"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Globe, CircleDollarSign } from "lucide-react";

const strategies = [
  {
    id: 1,
    name: "BNB Shariah Earn",
    tags: ["Halal", "Low Risk"],
    pair: "USDT",
    tvl: "$12.8M",
    apy: "12.1%",
    icon: "bg-cyan-100", // Placeholder for icon
  },
  {
    id: 2,
    name: "PancakeSwap Liquidity Provision",
    tags: ["Halal", "Medium Risk"],
    pair: "USDT-BUSD",
    tvl: "$12.8M",
    apy: "12.1%",
    icon: "bg-cyan-100", // Placeholder for icon
  },
];

export const Discovery = () => {
  return (
    <section>
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Discovery</h2>
          <p className="text-sm text-gray-500">
            Explore our profit strategies on BNB Chain
          </p>
        </div>

        <div className="bg-white px-3 py-1.5 rounded-full border border-green-100 flex items-center gap-2 text-xs font-medium text-green-700">
          <ShieldCheck className="w-3 h-3" />
          Halal Verified
        </div>
      </div>

      <div className="space-y-4">
        {strategies.map((strategy, index) => (
          <motion.div
            key={strategy.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between group hover:border-green-200 transition-colors"
          >
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div
                className={`w-12 h-12 rounded-full ${strategy.icon} flex items-center justify-center shrink-0`}
              >
                <div className="w-6 h-6 rounded-full bg-blue-500 opacity-50" />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-900">{strategy.name}</h3>
                  {strategy.tags.includes("Halal") && (
                    <span className="bg-green-50 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded-md">
                      Halal
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{strategy.pair}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                  <span
                    className={`${
                      strategy.tags.includes("Low Risk")
                        ? "text-green-600 bg-green-50"
                        : "text-orange-600 bg-orange-50"
                    } px-2 py-0.5 rounded-md`}
                  >
                    {strategy.tags.find((t) => t.includes("Risk"))}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between md:gap-12">
              <div className="text-right md:text-left">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">
                  TVL
                </p>
                <p className="text-gray-900 font-bold">{strategy.tvl}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
