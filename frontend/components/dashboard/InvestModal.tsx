"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, TrendingUp, Coins, AlertCircle, Clock } from "lucide-react";

export interface DeFiProtocol {
  id: string;
  name: string;
  type: "Liquidity Provision" | "Lending/Borrowing" | "Liquid Staking";
  network: string;
  apy: number;
  logo: string;
  minInvestment: number;
  payoutFrequency: "Daily" | "Weekly" | "Monthly";
  riskLevel: "Low" | "Medium" | "High";
  isHalalCertified: boolean;
}

export const DEFI_PROTOCOLS: DeFiProtocol[] = [
  {
    id: "pancakeswap",
    name: "PancakeSwap",
    type: "Liquidity Provision",
    network: "BSC Mainnet",
    apy: 12.5,
    logo: "🥞",
    minInvestment: 50,
    payoutFrequency: "Daily",
    riskLevel: "Medium",
    isHalalCertified: true,
  },
  {
    id: "uniswap",
    name: "Uniswap",
    type: "Liquidity Provision",
    network: "Ethereum",
    apy: 8.2,
    logo: "🦄",
    minInvestment: 100,
    payoutFrequency: "Daily",
    riskLevel: "Medium",
    isHalalCertified: true,
  },
  {
    id: "venus",
    name: "Venus",
    type: "Lending/Borrowing",
    network: "BSC Mainnet",
    apy: 6.8,
    logo: "💫",
    minInvestment: 25,
    payoutFrequency: "Daily",
    riskLevel: "Low",
    isHalalCertified: false,
  },
  {
    id: "listadao",
    name: "ListaDAO",
    type: "Liquid Staking",
    network: "BSC Mainnet",
    apy: 5.4,
    logo: "📋",
    minInvestment: 10,
    payoutFrequency: "Weekly",
    riskLevel: "Low",
    isHalalCertified: true,
  },
];

interface InvestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvest: (protocolId: string, amount: number) => void;
  goalTitle: string;
  currentAmount: number;
}

export const InvestModal = ({
  isOpen,
  onClose,
  onInvest,
  goalTitle,
  currentAmount,
}: InvestModalProps) => {
  const [selectedProtocol, setSelectedProtocol] = useState<DeFiProtocol | null>(
    null
  );
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState<"select" | "confirm">("select");

  const handleProtocolSelect = (protocol: DeFiProtocol) => {
    setSelectedProtocol(protocol);
    setStep("confirm");
  };

  const handleBack = () => {
    setStep("select");
    setSelectedProtocol(null);
    setAmount("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProtocol || !amount || parseFloat(amount) <= 0) return;

    onInvest(selectedProtocol.id, parseFloat(amount));

    // Reset form
    setAmount("");
    setSelectedProtocol(null);
    setStep("select");
    onClose();
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const maxInvestable = currentAmount;
  const quickAmounts = [100, 500, 1000].filter((a) => a <= maxInvestable);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "text-green-600 bg-green-50";
      case "Medium":
        return "text-yellow-600 bg-yellow-50";
      case "High":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
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
            <div className="w-full max-w-lg max-h-[85vh] pointer-events-auto">
              <div className="bg-white rounded-3xl shadow-2xl flex flex-col max-h-[85vh]">
                {/* Header */}
                <div className="flex justify-between items-center p-6 pb-4 border-b border-gray-100 shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center">
                      <Coins className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Invest
                      </h2>
                      <p className="text-sm text-gray-500">
                        Grow your {goalTitle}
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

                {/* Available Balance */}
                <div className="px-6 pt-4 shrink-0">
                  <div className="bg-linear-to-br from-purple-50 to-indigo-50 rounded-2xl p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">
                          Available to Invest
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          ${currentAmount.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">
                          From Goal
                        </p>
                        <p className="text-sm font-medium text-purple-600">
                          {goalTitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 pt-4 overflow-y-auto flex-1">
                  {step === "select" ? (
                    <div className="space-y-3">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                        Select Protocol
                      </p>
                      {DEFI_PROTOCOLS.map((protocol) => (
                        <motion.button
                          key={protocol.id}
                          onClick={() => handleProtocolSelect(protocol)}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className="w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all text-left border-2 border-transparent hover:border-purple-200"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-2xl shrink-0">
                              {protocol.logo}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="font-bold text-gray-900">
                                  {protocol.name}
                                </h4>
                                {protocol.isHalalCertified && (
                                  <span className="text-[10px] font-bold px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                                    HALAL
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-gray-500 mt-0.5">
                                {protocol.type} • {protocol.network}
                              </p>
                              <div className="flex flex-wrap items-center gap-2 mt-2">
                                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                  {protocol.apy}% APY
                                </span>
                                <span
                                  className={`text-[10px] font-bold px-2 py-1 rounded-full ${getRiskColor(
                                    protocol.riskLevel
                                  )}`}
                                >
                                  {protocol.riskLevel} Risk
                                </span>
                                <span className="text-[10px] text-gray-500 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {protocol.payoutFrequency}
                                </span>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <TrendingUp className="w-5 h-5 text-purple-400" />
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Selected Protocol */}
                      <div className="bg-purple-50 rounded-2xl p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-2xl">
                            {selectedProtocol?.logo}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-gray-900">
                                {selectedProtocol?.name}
                              </h4>
                              {selectedProtocol?.isHalalCertified && (
                                <span className="text-[10px] font-bold px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                                  HALAL
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500">
                              {selectedProtocol?.type} •{" "}
                              {selectedProtocol?.network}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={handleBack}
                            className="text-xs text-purple-600 font-medium hover:underline"
                          >
                            Change
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-purple-100">
                          <div className="flex items-center gap-1 text-sm">
                            <TrendingUp className="w-4 h-4 text-green-500" />
                            <span className="font-bold text-green-600">
                              {selectedProtocol?.apy}% APY
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>
                              {selectedProtocol?.payoutFrequency} payouts
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Amount Input */}
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                          Investment Amount
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                            $
                          </span>
                          <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                            min={selectedProtocol?.minInvestment}
                            max={maxInvestable}
                            step="0.01"
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-900 placeholder:text-gray-400 text-lg font-medium"
                            required
                          />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          Min: ${selectedProtocol?.minInvestment} • Max: $
                          {maxInvestable.toLocaleString()}
                        </p>
                      </div>

                      {/* Quick Amount Buttons */}
                      {quickAmounts.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {quickAmounts.map((quickAmount) => (
                            <button
                              key={quickAmount}
                              type="button"
                              onClick={() => setAmount(quickAmount.toString())}
                              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                parseFloat(amount) === quickAmount
                                  ? "bg-purple-600 text-white"
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              }`}
                            >
                              ${quickAmount.toLocaleString()}
                            </button>
                          ))}
                          <button
                            type="button"
                            onClick={() => setAmount(maxInvestable.toString())}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                              parseFloat(amount) === maxInvestable
                                ? "bg-purple-600 text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                          >
                            Max
                          </button>
                        </div>
                      )}

                      {/* Estimated Returns */}
                      {amount && parseFloat(amount) > 0 && selectedProtocol && (
                        <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-xl p-4">
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                            Estimated Returns
                          </p>
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <p className="text-xs text-gray-500">Monthly</p>
                              <p className="font-bold text-green-600">
                                +$
                                {(
                                  (parseFloat(amount) * selectedProtocol.apy) /
                                  100 /
                                  12
                                ).toFixed(2)}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Yearly</p>
                              <p className="font-bold text-green-600">
                                +$
                                {(
                                  (parseFloat(amount) * selectedProtocol.apy) /
                                  100
                                ).toFixed(2)}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">APY</p>
                              <p className="font-bold text-green-600">
                                {selectedProtocol.apy}%
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Warning */}
                      <div className="flex items-start gap-2 text-xs text-amber-700 bg-amber-50 rounded-xl p-3">
                        <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>
                          DeFi investments carry risks including smart contract
                          vulnerabilities and impermanent loss. Only invest what
                          you can afford to lose.
                        </span>
                      </div>

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        disabled={
                          !amount ||
                          parseFloat(amount) <
                            (selectedProtocol?.minInvestment || 0)
                        }
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        <Coins className="w-5 h-5" />
                        Invest ${amount || "0"}
                      </motion.button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};
