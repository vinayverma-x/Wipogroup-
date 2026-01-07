'use client';

import { motion } from "framer-motion";
import React from "react";

const stats = [
  { label: "Active Investors", value: "15,000+", icon: "👥" },
  { label: "Total Investments", value: "$450M+", icon: "💰" },
  { label: "Properties Verified", value: "1,200+", icon: "🏢" },
  { label: "Growth Rate", value: "24% YoY", icon: "📈" },
];

const TrustStats= () => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* --- Main Container --- */}
        <div className="bg-emerald-600 rounded-[50px] p-12 md:p-16 relative overflow-hidden shadow-[0_30px_60px_-15px_rgba(16,185,129,0.3)]">
          
          {/* Decorative Background Patterns */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-400/20 rounded-full -ml-10 -mb-10 blur-2xl" />

          <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Side: Text */}
            <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
              <motion.h3 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-4xl md:text-5xl font-black text-white leading-tight"
              >
                The Numbers <br /> Behind the <span className="text-emerald-200">Trust.</span>
              </motion.h3>
              <p className="text-emerald-50/80 text-lg font-medium">
                Our growth is a testament to our commitment to transparency and secure real estate investing.
              </p>
            </div>

            {/* Right Side: Stats Grid */}
            <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-4 md:gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 p-6 md:p-8 rounded-[32px] hover:bg-white hover:text-emerald-700 transition-all duration-500 group"
                >
                  <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-3xl md:text-4xl font-black text-white group-hover:text-emerald-600 tracking-tighter transition-colors">
                      {stat.value}
                    </h4>
                    <p className="text-emerald-100 group-hover:text-emerald-900/60 font-bold text-xs uppercase tracking-widest transition-colors">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
        
        {/* Trusted Partners / Logos (Optional subtle addition) */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-12 grayscale opacity-40 hover:opacity-100 transition-opacity duration-700">
           <span className="text-2xl font-black text-slate-400">FINTECH</span>
           <span className="text-2xl font-black text-slate-400">SECURE-X</span>
           <span className="text-2xl font-black text-slate-400">GLOBAL-ESTATE</span>
           <span className="text-2xl font-black text-slate-400">BLOCK-CHAIN</span>
        </div>
      </div>
    </section>
  );
};

export default TrustStats;