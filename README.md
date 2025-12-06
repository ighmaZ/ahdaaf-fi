# 🌙 Ahdaaf-Fi

> **"أهداف"** — _Goals_ in Arabic. Your Shariah-compliant pathway to financial freedom.

[![BNB Chain](https://img.shields.io/badge/Built%20on-BNB%20Chain-F0B90B?style=for-the-badge&logo=binance&logoColor=white)](https://www.bnbchain.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Thirdweb](https://img.shields.io/badge/Thirdweb-SDK-7C3AED?style=for-the-badge)](https://thirdweb.com/)

---

## 🎯 The Problem

**1.8 billion Muslims worldwide** face a critical challenge: accessing modern DeFi yields while adhering to Islamic financial principles. Traditional DeFi platforms offer high returns but often involve:

- 🚫 Interest-based lending (Riba)
- 🚫 Excessive speculation (Gharar)
- 🚫 Investments in prohibited industries (Haram)

Meanwhile, **goal-based saving** — for Hajj pilgrimage, education, or major purchases — remains disconnected from yield opportunities, leaving savings to stagnate.

---

## 💡 The Solution

**Ahdaaf-Fi** is an AI-powered, Shariah-compliant DeFi platform on BNB Chain that:

1. **Filters yield opportunities** using AI to surface only Halal-verified protocols
2. **Enables goal-based vaults** where users set targets, deadlines, and track progress
3. **Connects savings to yields** — your Hajj fund or car savings can grow ethically

---

## ✨ Features

### 🕌 Goal Vaults

Create personalized savings vaults with purpose:

- **Hajj Fund** — Save for pilgrimage with target date tracking
- **Auto Vault** — New car? Set your goal and watch progress
- **Education Fund** — Plan for tuition fees
- **Custom Goals** — Any financial objective you have

Each vault tracks:

- 💰 Current Amount vs Target Amount
- 📅 Goal Deadline
- 📈 Progress Percentage
- 🎯 APY on invested funds

### 🤖 AI-Powered Discovery

Our intelligent yield explorer curates the best opportunities:

- **Risk Assessment** — Low, Medium, High risk labeling
- **Halal Verification** — Clear badges for Shariah compliance
- **APY Comparison** — Find the best returns at a glance
- **TVL Insights** — See protocol stability metrics

### ☪️ Halal Filter

Every investment opportunity is screened:

- ✅ No interest-based lending
- ✅ No gambling or speculation protocols
- ✅ Asset-backed yield strategies
- ✅ Transparent profit-sharing models

### 💸 Seamless Investing

From your goal vault, invest directly into:

- **PancakeSwap** — Liquidity provision (12.5% APY)
- **ListaDAO** — Liquid staking (5.4% APY)
- **Venus Protocol** — Lending/Borrowing
- More protocols coming...

Features include:

- Quick amount selection
- Estimated returns calculator
- Payout frequency tracking (Daily/Weekly/Monthly)
- Risk warnings and transparency

### 💳 Top Up Anytime

Add funds to your vaults seamlessly:

- Multiple token support (USDT, BNB, USDC)
- Real-time balance updates
- Progress tracking toward goals

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend                             │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────────┐   │
│  │  Goal       │  │  Discovery   │  │  Invest/TopUp     │   │
│  │  Vaults     │  │  (AI Yield)  │  │  Modals           │   │
│  └─────────────┘  └──────────────┘  └───────────────────┘   │
│                           │                                 │
│              ┌────────────┴────────────┐                    │
│              │    Thirdweb SDK         │                    │
│              │    (Wallet Connection)  │                    │
│              └────────────┬────────────┘                    │
└───────────────────────────┼─────────────────────────────────┘
                            │
┌───────────────────────────┼─────────────────────────────────┐
│                     BNB Chain                               │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────────┐   │
│  │ PancakeSwap │  │   ListaDAO   │  │  Venus Protocol   │   │
│  │   (DEX)     │  │  (Staking)   │  │    (Lending)      │   │
│  └─────────────┘  └──────────────┘  └───────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Contract Details

### MockERC20 (USDT)

**Address:** `0x1E685A5d614aB471d5943bFD5A88A994524a2DD0`  
**Verified:** ✅ https://testnet.bscscan.com/address/0x1E685A5d614aB471d5943bFD5A88A994524a2DD0#code

### AhdaafPoolV1 (Mudarabah Pool)

**Address:** `0x44a36337732c083B7A7E0C13530aAb27f3738b41`  
**Verified:** ✅ https://testnet.bscscan.com/address/0x44a36337732c083B7A7E0C13530aAb27f3738b41#code

---

## 🛠️ Tech Stack

| Layer          | Technology                       |
| -------------- | -------------------------------- |
| **Frontend**   | Next.js 16, React 19, TypeScript |
| **Styling**    | Tailwind CSS 4, Framer Motion    |
| **Web3**       | Thirdweb SDK                     |
| **Blockchain** | BNB Chain (BSC Mainnet)          |
| **Protocols**  | PancakeSwap, ListaDAO, Venus     |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/your-repo/ahdaaf-fi.git
cd ahdaaf-fi

# Install dependencies
cd frontend
yarn install

# Set up environment variables
cp .env.example .env.local
# Add your Thirdweb Client ID

# Run development server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## 🌍 Impact

| Metric              | Potential                         |
| ------------------- | --------------------------------- |
| **Target Market**   | 1.8B Muslims globally             |
| **Islamic Finance** | $3.69 trillion industry (2024)    |
| **DeFi Gap**        | < 1% of DeFi is Shariah-compliant |
| **Goal Savings**    | Hajj alone = $12B annual market   |

---

## 🏆 Why Ahdaaf-Fi Wins

1. **Underserved Market** — Massive untapped demand for ethical DeFi
2. **Clear Value Prop** — Goal-based + Halal + Yield = Unique combination
3. **Production Ready** — Beautiful UI, real protocol integrations
4. **Scalable** — Architecture ready for smart contracts & more chains
5. **Social Impact** — Enabling financial inclusion for Muslim communities

---

## 📄 License

MIT License — See [LICENSE](./LICENSE) for details

---

<div align="center">

**🌙 Ahdaaf-Fi — Where Faith Meets Finance 🌙**

_Grow your savings. Achieve your goals. Stay Halal._

</div>
