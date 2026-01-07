"use client"

import { Trophy, Users, Copy, Share2, CheckCircle2 } from "lucide-react"
import { useState } from "react"

const leaderboardData = {
  weekly: [
    { rank: 1, name: "Rajesh Kumar", referrals: 45, earnings: 5000 },
    { rank: 2, name: "Priya Sharma", referrals: 38, earnings: 3500 },
    { rank: 3, name: "Amit Patel", referrals: 32, earnings: 2500 },
    { rank: 4, name: "Sneha Gupta", referrals: 28, earnings: 1800 },
    { rank: 5, name: "Vikram Singh", referrals: 25, earnings: 1500 },
  ],
  monthly: [
    { rank: 1, name: "Ankit Verma", referrals: 180, earnings: 50000 },
    { rank: 2, name: "Neha Reddy", referrals: 156, earnings: 35000 },
    { rank: 3, name: "Rohit Mehta", referrals: 142, earnings: 25000 },
    { rank: 4, name: "Kavita Joshi", referrals: 128, earnings: 18000 },
    { rank: 5, name: "Suresh Rao", referrals: 115, earnings: 15000 },
  ],
  yearly: [
    { rank: 1, name: "Manish Agarwal", referrals: 2150, earnings: 1000000 },
    { rank: 2, name: "Deepika Iyer", referrals: 1890, earnings: 750000 },
    { rank: 3, name: "Arjun Nair", referrals: 1650, earnings: 500000 },
    { rank: 4, name: "Pooja Desai", referrals: 1420, earnings: 350000 },
    { rank: 5, name: "Karan Chopra", referrals: 1280, earnings: 250000 },
  ],
}

export default function ReferEarnPage() {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<"weekly" | "monthly" | "yearly">("weekly")
  
  const t = (key: string) => {
    const translations: Record<string, string> = {
      "refer.title": "Refer & Earn",
      "refer.subtitle": "Invite friends to WIPO and grow your wealth together with rewards.",
      "refer.your_code": "Referral Link",
      "refer.share_earn": "Share this link to start earning commissions",
      "refer.rewards": "Rewards Program",
      "refer.weekly_top": "Weekly Bonus",
      "refer.monthly_top": "Monthly Reward",
      "refer.yearly_top": "Annual Jackpot",
      "refer.leaderboard": "Top Referrers",
      "refer.leaderboard_desc": "Highest earners in the community",
      "refer.share": "Share Now",
      "refer.referrals": "Referrals"
    }
    return translations[key] || key
  }

  const formatCurrency = (amount: number) => `₹${amount.toLocaleString('en-IN')}`
  const referralCode = "WIPO7X92B1" 
  const shareUrl = `https://wipogroup.in/signup?ref=${referralCode}`

  const copyReferralCode = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="bg-white min-h-screen py-12 md:py-20 font-sans">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Header Section - Medium Size */}
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 mb-3 rounded-full bg-green-50 border border-green-100 text-green-700 text-xs font-semibold tracking-wide uppercase">
            Partner Program
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
            {t("refer.title")}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base">
            {t("refer.subtitle")}
          </p>
        </div>

        {/* Action Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-16">
          
          {/* Share Section Card */}
          <div className="bg-white border border-gray-100 rounded-[2rem] p-7 md:p-9 shadow-sm">
            <div className="flex items-center gap-5 mb-8">
              <div className="h-12 w-12 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-100">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 leading-tight">{t("refer.your_code")}</h3>
                <p className="text-gray-400 font-medium text-xs uppercase tracking-tighter">{t("refer.share_earn")}</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-green-50/30 border border-green-100 rounded-xl px-5 py-3.5 text-sm font-medium font-mono text-green-800 truncate">
                  {shareUrl}
                </div>
                <button 
                  onClick={copyReferralCode}
                  className="bg-green-600 hover:bg-green-700 text-white p-3.5 rounded-xl transition-all active:scale-90"
                >
                  {copied ? <CheckCircle2 className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                </button>
              </div>
              <button className="w-full flex items-center justify-center gap-2 border-2 border-gray-100 hover:border-green-600 hover:text-green-600 text-gray-700 font-bold py-3.5 rounded-xl transition-all text-sm uppercase">
                <Share2 className="h-4 w-4" />
                {t("refer.share")}
              </button>
            </div>
          </div>

          {/* Rewards Highlights Card */}
          <div className="bg-green-50/50 border border-green-100 rounded-[2rem] p-7 md:p-9 relative overflow-hidden">
            <div className="flex items-center gap-5 mb-8">
              <div className="h-12 w-12 bg-white border border-green-100 rounded-2xl flex items-center justify-center">
                <Trophy className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{t("refer.rewards")}</h3>
                <p className="text-green-600 font-bold text-[11px] uppercase tracking-wider">Earn Every Month</p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { label: "refer.weekly_top", amount: 5000 },
                { label: "refer.monthly_top", amount: 50000 },
                { label: "refer.yearly_top", amount: 1000000 },
              ].map((reward, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white border border-green-100 rounded-xl">
                  <span className="text-xs font-bold text-gray-500 uppercase">{t(reward.label)}</span>
                  <span className="text-lg font-bold text-green-600">{formatCurrency(reward.amount)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leaderboard Section */}
        <div className="bg-white border border-gray-100 rounded-[2.5rem] shadow-sm overflow-hidden">
          <div className="bg-white p-7 md:p-10 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
                <Trophy className="h-7 w-7 text-yellow-500" />
                {t("refer.leaderboard")}
              </h3>
              <p className="text-gray-400 font-medium text-sm mt-1">{t("refer.leaderboard_desc")}</p>
            </div>
            
            <div className="flex bg-gray-100 p-1.5 rounded-xl border border-gray-200 w-fit">
              {(["weekly", "monthly", "yearly"] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setActiveTab(period)}
                  className={`px-6 py-2.5 text-xs font-bold rounded-lg transition-all uppercase tracking-wider ${
                    activeTab === period 
                    ? "bg-green-600 text-white shadow-md" 
                    : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          <div className="p-7 md:p-10">
            <div className="grid gap-4">
              {leaderboardData[activeTab].map((user) => (
                <div
                  key={user.rank}
                  className="flex items-center justify-between p-5 md:p-6 bg-white border border-gray-100 rounded-2xl hover:border-green-600 transition-all group"
                >
                  <div className="flex items-center gap-6">
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center font-bold text-sm
                      ${user.rank === 1 ? "bg-yellow-400 text-white" : 
                        user.rank === 2 ? "bg-slate-300 text-white" : 
                        user.rank === 3 ? "bg-orange-400 text-white" : 
                        "bg-gray-50 text-gray-400"}
                    `}>
                      #{user.rank}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-base">{user.name}</p>
                      <div className="flex items-center gap-1.5 text-green-600 font-semibold text-[11px] mt-0.5 uppercase">
                        <Users className="w-3 h-3" />
                        {user.referrals} {t("refer.referrals")}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                      {formatCurrency(user.earnings)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}