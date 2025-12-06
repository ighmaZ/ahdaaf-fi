"use client";

import { useActiveAccount } from "thirdweb/react";
import { TopNav } from "@/components/dashboard/TopNav";
import { Header } from "@/components/dashboard/Header";
import { GoalVaults } from "@/components/dashboard/GoalVaults";
import { Discovery } from "@/components/dashboard/Discovery";
import { LandingPage } from "@/components/landing/LandingPage";

export default function Home() {
  const account = useActiveAccount();

  if (!account) {
    return <LandingPage />;
  }

  return (
    <main className="min-h-screen bg-[#F3F5F7] pb-20 relative overflow-hidden">
      {/* Palm Background Texture */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-40 mix-blend-multiply"
        style={{
          backgroundImage: `url('/palm-bg.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Background Elements for "Slick" feel */}
      <div className="absolute top-0 left-0 w-full h-96 bg-linear-to-b from-green-50/50 to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-green-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 -left-20 w-[600px] h-[600px] bg-blue-100/20 rounded-full blur-3xl pointer-events-none" />

      <TopNav />

      <div className="max-w-7xl mx-auto px-8 py-8 relative z-10">
        <Header />
        <GoalVaults />
        <Discovery />
      </div>
    </main>
  );
}
