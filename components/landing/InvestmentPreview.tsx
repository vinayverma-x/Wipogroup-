'use client';

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";

const InvestmentPreview = () => {
  const [amount, setAmount] = useState(250000);
  const roi = 15.4;

  // Calculation Logic
  const monthlyReturn = Math.round((amount * (roi / 100)) / 12);
  const yearlyProfit = Math.round(amount * (roi / 100));

  // --- 3D Tilt Logic ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // --- Redirect Logic ---
  const handleInvestClick = () => {
    // Agar aapka committees section isi page par hai
    const element = document.getElementById('committees');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Agar committees dusre page par hai
      window.location.href = '/committees'; 
    }
  };

  return (
    <section className="py-24 px-4 md:px-6 bg-[#fafdfc] relative overflow-hidden">
      
      {/* Dynamic Background Animation */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0] 
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-emerald-100 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            y: [0, -40, 0] 
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-green-100 rounded-full blur-[100px]" 
        />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          
          {/* Left Side: Dynamic Text */}
          <div className="w-full lg:w-[45%] space-y-7 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white shadow-sm border border-emerald-100 rounded-2xl text-emerald-600 text-xs font-bold uppercase tracking-widest"
            >
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
              Real-time Growth
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl font-[1000] text-slate-900 leading-[1] tracking-tight">
              Invest in <br />
              <span className="bg-gradient-to-r from-emerald-600 to-green-400 bg-clip-text text-transparent italic serif font-medium">Your Future</span>
            </h2>
            
            <p className="text-slate-500 text-base md:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed font-medium">
              Join Wipo's premium asset-backed committees. Use the calculator to visualize your passive income.
            </p>

            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto lg:mx-0">
              <div className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                <p className="text-2xl font-black text-slate-900 leading-none">15.4%</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase mt-2">Target ROI</p>
              </div>
              <div className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                <p className="text-2xl font-black text-emerald-600 leading-none">Fixed</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase mt-2">Payouts</p>
              </div>
            </div>
          </div>

          {/* Right Side: 3D Interactive Card */}
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full lg:w-[55%] relative group cursor-pointer"
          >
            {/* Card Glow Effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-[40px] blur-2xl opacity-20 group-hover:opacity-40 transition duration-500" />
            
            <div className="relative bg-slate-900 rounded-[38px] p-8 md:p-12 border border-slate-800 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)]">
              
              <div className="space-y-10" style={{ transform: "translateZ(50px)" }}>
                {/* Selector */}
                <div className="space-y-5">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">Investment</span>
                    <motion.span 
                      key={amount}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-white text-3xl md:text-4xl font-black"
                    >
                      ₹{amount.toLocaleString('en-IN')}
                    </motion.span>
                  </div>
                  <input 
                    type="range" 
                    min="50000" 
                    max="2000000" 
                    step="10000"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  />
                </div>

                {/* Results Glass Boxes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="bg-white/[0.05] backdrop-blur-md border border-white/10 p-6 rounded-3xl">
                    <p className="text-slate-500 text-[10px] font-black uppercase mb-2">Monthly Payout</p>
                    <p className="text-2xl font-black text-white">₹{monthlyReturn.toLocaleString('en-IN')}</p>
                  </div>

                  <div className="bg-emerald-500 p-6 rounded-3xl shadow-xl shadow-emerald-500/20">
                    <p className="text-emerald-950/60 text-[10px] font-black uppercase mb-2">Total Yield (1Yr)</p>
                    <p className="text-emerald-950 text-2xl font-black">₹{yearlyProfit.toLocaleString('en-IN')}</p>
                  </div>
                </div>

                {/* Progress Tracking */}
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-400">Security: Asset-Backed</span>
                    <span className="text-emerald-400">Risk: Low</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full p-[2px]">
                    <motion.div 
                      initial={{ width: "0%" }}
                      whileInView={{ width: "100%" }}
                      className="h-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-cyan-400 rounded-full"
                    />
                  </div>
                </div>

                {/* Main Action Button */}
                <motion.button
                  onClick={handleInvestClick}
                  whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-5 bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 font-black text-lg rounded-2xl shadow-2xl shadow-emerald-500/30 flex items-center justify-center gap-3 transition-all"
                >
                  Invest Now
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
                </motion.button>
              </div>

              {/* Verified Badge */}
              <div className="absolute top-6 right-6 px-3 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-xl">
                <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-tighter">● Secure Pool</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default InvestmentPreview;