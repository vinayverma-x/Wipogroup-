"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, Lock, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: ""
  });

  // Resend Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showOTP && resendTimer > 0 && !isSuccess) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showOTP, resendTimer, isSuccess]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Step 1: Submit Form & Send OTP
  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setLoading(true);
    // Simulation
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setShowOTP(true);
    setResendTimer(30);
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulation: Verification logic
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setIsSuccess(true);
    
    // Success hone par login page par bhej dega
    setTimeout(() => {
        window.location.href = "/auth/login";
    }, 2000);
  };

  const handleResendOTP = () => {
    setResendTimer(30);
    // Yahan OTP resend ki API call aayegi
    console.log("OTP Resent to", formData.mobile);
  };

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-[#F8FAFC] relative overflow-hidden pt-28 pb-12 px-4">
      
      {/* Background Blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-50/60 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-50/60 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[500px] relative z-10"
      >
        <div className="bg-white border border-slate-200 rounded-[32px] shadow-sm p-8 md:p-10">
          
          <AnimatePresence mode="wait">
            {!showOTP ? (
              /* --- Registration Form --- */
              <motion.div
                key="signup-step"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="text-center mb-8">
                  <Image src="/wipo-logo.png" alt="WIPO" width={110} height={40} className="mx-auto mb-4" />
                  <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Create Account</h1>
                  <p className="text-slate-500 text-[13px] mt-1 font-medium">Verify your number to get started</p>
                </div>

                <form onSubmit={handleInitialSubmit} className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input required type="text" name="name" onChange={handleInputChange} placeholder="Full Name" className="w-full pl-12 pr-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white outline-none transition-all text-[14px] font-medium" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input required type="email" name="email" onChange={handleInputChange} placeholder="Email" className="w-full pl-12 pr-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 text-[14px] font-medium" />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input required type="tel" name="mobile" onChange={handleInputChange} placeholder="Mobile" className="w-full pl-12 pr-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 text-[14px] font-medium" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input required type="password" name="password" onChange={handleInputChange} placeholder="Password" className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 text-[14px] font-medium" />
                    <input required type="password" name="confirmPassword" onChange={handleInputChange} placeholder="Confirm" className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 text-[14px] font-medium" />
                  </div>

                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-100 disabled:opacity-70 mt-2"
                  >
                    {loading ? "Sending OTP..." : "Get OTP"} <ArrowRight size={18} />
                  </button>
                </form>
              </motion.div>
            ) : (
              /* --- OTP Verification --- */
              <motion.div
                key="otp-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck size={32} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Verify OTP</h2>
                <p className="text-slate-500 text-sm mt-2 mb-8 px-4">
                  Code sent to <span className="font-bold text-slate-900">{formData.mobile}</span>
                </p>

                <form onSubmit={handleVerifyOTP} className="space-y-6">
                  <input 
                    required
                    type="text"
                    maxLength={6}
                    autoFocus
                    value={otpValue}
                    onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ""))}
                    placeholder="••••••"
                    className="w-full text-center text-3xl tracking-[12px] font-black py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-emerald-500 focus:bg-white outline-none transition-all"
                  />

                  <div className="flex flex-col gap-4">
                    <button 
                      type="submit"
                      disabled={loading || otpValue.length < 6}
                      className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                          isSuccess ? "bg-green-500 text-white" : "bg-slate-900 hover:bg-black text-white shadow-lg shadow-slate-200"
                      } disabled:opacity-50`}
                    >
                      {loading ? "Verifying..." : isSuccess ? "Success!" : "Complete Registration"}
                    </button>

                    <div className="text-sm font-medium">
                      {resendTimer > 0 ? (
                        <p className="text-slate-400">Resend code in <span className="text-emerald-600">{resendTimer}s</span></p>
                      ) : (
                        <button 
                          type="button"
                          onClick={handleResendOTP}
                          className="text-emerald-600 font-bold hover:underline"
                        >
                          Resend OTP
                        </button>
                      )}
                    </div>
                  </div>
                </form>

                <button 
                  type="button"
                  onClick={() => setShowOTP(false)}
                  className="mt-6 text-xs font-bold text-slate-400 hover:text-slate-600 flex items-center justify-center gap-1 mx-auto"
                >
                   Incorrect Number? Edit
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 pt-6 border-t border-slate-50 text-center">
            <p className="text-[14px] font-medium text-slate-500">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-emerald-600 font-bold hover:underline">Sign In</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}