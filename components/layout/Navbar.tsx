'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Wallet,
  Settings,
  ShieldCheck,
  LogOut,
  ChevronDown,
  Menu,
  X
} from "lucide-react";

/* =========================
   LINKS CONFIGURATION
========================= */
const publicLinks = [
  { name: "Home", href: "/" },
  { name: "Properties", href: "/properties" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const privateLinks = [
  { name: "Committees", href: "/committees" },
  { name: "Wallet", href: "/Wallet" },
  { name: "Refer & Earn", href: "/refer-earn" },
];

const userMenuItems = [
  { name: "Profile", href: "/profile", icon: User },
  { name: "Wallet", href: "/Wallet", icon: Wallet }, 
  { name: "KYC Verification", href: "/kyc", icon: ShieldCheck },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Navbar() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Default false (Logged out)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync login status on mount
  useEffect(() => {
    setMounted(true);
    const syncAuth = () => {
      // LocalStorage check tabhi hoga jab page load ho chuka ho
      const authState = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(authState);
    };
    syncAuth();
    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  // Scroll & Click Outside logic
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
    router.push("/auth/login");
  };

  // Jab user logged out ho, sirf publicLinks dikhao
  const activeLinks = isLoggedIn ? [...publicLinks, ...privateLinks] : publicLinks;

  // Hydration fix
  if (!mounted) return null;

  return (
    <header className={`fixed top-0 inset-x-0 z-[100] transition-all duration-300 ${isScrolled ? "py-1" : "py-2"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`flex items-center justify-between px-6 py-1.5 rounded-full border transition-all duration-300 ${
            isScrolled 
              ? "bg-white/90 backdrop-blur-md border-slate-200 shadow-lg" 
              : "bg-white border-slate-100 shadow-sm"
          }`}
        >
          {/* LOGO */}
          <Link href="/" className="flex items-center shrink-0 py-1 transition-transform active:scale-95">
            <Image
              src="/wipo-logo.png"
              alt="Logo"
              width={85}
              height={22}
              priority
              className="object-contain w-[75px] sm:w-[85px] h-auto"
            />
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-7">
            {activeLinks.map(link => (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-[14px] font-bold text-slate-600 hover:text-emerald-600 transition-colors group tracking-tight"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full rounded-full" />
              </Link>
            ))}
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-5">
              {isLoggedIn ? (
                /* USER IS LOGGED IN - Show Profile */
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 bg-slate-50 border border-slate-200 pl-1.5 pr-3 py-1 rounded-full hover:bg-emerald-50 transition-all"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-black shadow-sm">
                      JD
                    </div>
                    <span className="font-bold text-[13px] text-slate-700 hidden md:block">Account</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-3 w-52 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden py-1.5 z-[110]"
                      >
                        {userMenuItems.map(item => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-[14px] font-semibold text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 transition-all"
                          >
                            <item.icon className="w-4 h-4 opacity-70" />
                            {item.name}
                          </Link>
                        ))}
                        <div className="my-1.5 border-t border-slate-100" />
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-[14px] font-bold text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" /> Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                /* USER IS LOGGED OUT - Show Login Buttons */
                <div className="flex items-center gap-6">
                  <Link href="/auth/login" className="font-bold text-[15px] text-slate-600 hover:text-emerald-600 transition-colors">
                    Log in
                  </Link>
                  <Link href="/auth/signup">
                    <button className="bg-emerald-600 text-white px-6 py-1.5 rounded-full text-[13.5px] font-black hover:bg-emerald-700 transition-all shadow-md active:scale-95">
                      Join Now
                    </button>
                  </Link>
                </div>
              )}
            </div>

            {/* MOBILE TOGGLE */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-full transition-colors"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </motion.nav>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden mt-2 bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden z-[101]"
            >
              <div className="p-6">
                <div className="flex flex-col gap-1">
                  {activeLinks.map(link => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block font-bold text-[16px] text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 px-4 py-3 rounded-xl transition-all"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
                
                <div className="pt-4 mt-4 border-t border-slate-100">
                  {isLoggedIn ? (
                    <div className="flex flex-col gap-1">
                      {userMenuItems.map(item => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center gap-3 font-bold text-[15px] text-slate-600 px-4 py-3 rounded-xl hover:bg-slate-50"
                        >
                          <item.icon className="w-5 h-5 opacity-70" /> {item.name}
                        </Link>
                      ))}
                      <button onClick={handleLogout} className="w-full mt-2 py-3 bg-red-50 text-red-600 text-[15px] font-black rounded-full">Logout</button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Link href="/auth/login" className="w-full py-3 text-center font-black text-[15px] border border-slate-200 rounded-full">Log in</Link>
                      <Link href="/auth/signup" className="w-full py-3 text-center font-black text-[15px] bg-emerald-600 text-white rounded-full shadow-lg">Get Started</Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}