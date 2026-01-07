'use client';

import { motion } from "framer-motion";
import React from "react";
import { useRouter } from "next/navigation"; // Router import kiya

const CTASection = () => {
  const router = useRouter(); // Router instance initialize kiya

  return (
    <section className="py-24 px-6 bg-white relative overflow-hidden">
      
      {/* --- Smooth Animated Background "The Aura" --- */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 50, 0],
            rotate: [0, 45, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[5%] w-[60%] h-[60%] bg-emerald-100/40 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            x: [0, -50, 0],
            rotate: [0, -45, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[10%] -right-[5%] w-[50%] h-[50%] bg-green-100/30 rounded-full blur-[100px]"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="relative group">
          
          {/* Glass Card Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden bg-white/60 backdrop-blur-3xl border border-white shadow-[0_40px_100px_-20px_rgba(16,185,129,0.1)] rounded-[50px] p-10 md:p-20"
          >
            {/* Inner Design Elements */}
            <div className="absolute top-0 right-0 p-10 opacity-10">
               <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1"><circle cx="12" cy="12" r="10"/><path d="M12 2v20M2 12h20"/></svg>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center space-y-8">
              
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="px-5 py-2 bg-emerald-50 border border-emerald-100 rounded-full"
              >
                <span className="text-emerald-700 text-[10px] font-black uppercase tracking-[0.3em]">Secure Ecosystem</span>
              </motion.div>

              {/* Main Text Content */}
              <div className="space-y-6 max-w-4xl">
                <h2 className="text-4xl md:text-6xl font-[1000] text-slate-900 tracking-tighter leading-tight">
                  Ready to Start Your <br />
                  <span className="text-emerald-500 italic font-serif font-medium">Investment Journey?</span>
                </h2>
                <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                  Join thousands of successful investors who trust <span className="text-slate-900 font-bold tracking-tight uppercase text-base">WIPO Group</span> for their property and investment needs.
                </p>
              </div>

              {/* --- Working Buttons Section --- */}
              <div className="flex flex-col sm:flex-row items-center gap-5 pt-6 w-full justify-center">
                {/* Button 1: Register */}
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push('/auth/signup')} // Navigation added
                  className="px-10 py-5 bg-emerald-500 text-white font-black rounded-2xl shadow-xl shadow-emerald-500/30 flex items-center gap-3 transition-all w-full sm:w-auto justify-center cursor-pointer"
                >
                  Create Free Account
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
                </motion.button>

                {/* Button 2: Contact */}
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#f8fafc" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push('/contact')} // Navigation added
                  className="px-10 py-5 bg-white border-2 border-slate-100 text-slate-900 font-bold rounded-2xl transition-all w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer"
                >
                  Contact Us
                </motion.button>
              </div>

              {/* Trust Indicators */}
             
            </div>

            {/* Subtle Overlay Pattern */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;