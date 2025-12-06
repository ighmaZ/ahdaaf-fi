"use client";

import { motion } from "framer-motion";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/lib/thirdwebClient";
import { bnbTestnet } from "@/lib/tokens";
import { Leaf, Zap } from "lucide-react";
import { Globe } from "@/components/ui/Globe";

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden relative font-sans selection:bg-teal-500/30">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 absolute top-0 w-full z-50">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight">Ahdaaf-Fi</span>
        </div>
        <div className="flex items-center gap-4">
          <ConnectButton
            client={client}
            chain={bnbTestnet}
            connectButton={{
              label: "Connect Wallet",
              className:
                "!bg-[#111] !text-white !border !border-white/10 !px-4 !py-2 !rounded-full !text-sm !font-medium hover:!bg-white/5 !transition-colors !h-auto",
            }}
          />
        </div>
      </nav>

      {/* Background Gradients/Glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal-900/20 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/4" />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 h-screen flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text */}
          <div className="max-w-3xl">
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-teal-900/30 border border-teal-500/30 rounded-full px-4 py-1.5 mb-8"
            >
              <span className="bg-teal-500 text-[#0A0A0A] text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
                NEW
              </span>
              <span className="text-teal-400 text-sm font-medium">
                AI-Powered Yield Discovery
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 tracking-tight"
            >
              The Shariah-Compliant <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-blue-500">
                DeFi Platform
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-gray-400 max-w-xl mb-10 leading-relaxed"
            >
              Ahdaaf-Fi is an AI-powered, Shariah-compliant DeFi platform on BNB
              Chain. Filter yield opportunities, set goal-based vaults, and grow
              your savings ethically.
            </motion.p>
          </div>

          {/* Right Column: CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="custom-connect-hero scale-125">
              <ConnectButton
                client={client}
                chain={bnbTestnet}
                connectButton={{
                  label: "Connect Wallet",
                  className:
                    "!bg-teal-500 !text-black !font-bold !px-10 !py-6 !text-lg !rounded-full !transition-transform hover:!scale-105 !border-none shadow-[0_0_40px_-10px_rgba(45,212,191,0.5)]",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="absolute bottom-12 left-0 w-full px-8 hidden md:block"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-[#111] border border-white/5 rounded-3xl p-6 backdrop-blur-sm hover:border-teal-500/30 transition-colors group">
            <div className="text-gray-500 text-sm mb-2 font-medium group-hover:text-teal-400 transition-colors">
              Yield Opportunities
            </div>
            <div className="text-4xl font-bold text-white mb-2 flex items-center gap-2">
              12.5%{" "}
              <span className="text-sm font-normal text-gray-500 mt-2">
                APY
              </span>
            </div>
            <div className="text-xs text-gray-600">Average Halal Returns</div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#111] border border-white/5 rounded-3xl p-6 backdrop-blur-sm hover:border-teal-500/30 transition-colors group">
            <div className="text-gray-500 text-sm mb-2 font-medium group-hover:text-teal-400 transition-colors">
              Global Impact
            </div>
            <div className="text-4xl font-bold text-white mb-2">1.8B</div>
            <div className="text-xs text-gray-600">Muslims Underserved</div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#111] border border-white/5 rounded-3xl p-6 backdrop-blur-sm hover:border-teal-500/30 transition-colors group">
            <div className="text-gray-500 text-sm mb-2 font-medium group-hover:text-teal-400 transition-colors">
              Shariah Compliant
            </div>
            <div className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
              100%
              <Leaf className="w-6 h-6 text-green-500" />
            </div>
            <div className="inline-flex items-center gap-1 text-xs text-green-500 bg-green-900/20 px-2 py-0.5 rounded-full">
              <Zap className="w-3 h-3" />
              Verified Ethical
            </div>
          </div>
        </div>
      </motion.div>

      {/* Decorative Planet/Circle Graphic */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] rounded-full border border-white/5 pointer-events-none">
        <div className="absolute inset-0 rounded-full border border-teal-500/20 animate-pulse z-10" />
        <Globe className="absolute inset-0 w-full h-full opacity-40" />
      </div>
    </div>
  );
};
