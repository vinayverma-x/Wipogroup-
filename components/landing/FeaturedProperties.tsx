'use client';

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface Property {
  id: number;
  title: string;
  location: string;
  image: string;
  price: string;
  roi: string;
  tag: string;
  beds: number;
  baths: number;
  sqft: string;
}

const properties: Property[] = [
  { 
    id: 1, 
    title: "Luxury Villa in Mumbai", 
    location: "Bandra West, Mumbai", 
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=800", 
    price: "₹1,50,00,000", 
    roi: "+12.4%", 
    tag: "Villa",
    beds: 4,
    baths: 3,
    sqft: "2500 sq ft"
  },
  { 
    id: 2, 
    title: "Modern Apartment", 
    location: "Andheri East, Mumbai", 
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800", 
    price: "₹85,00,000", 
    roi: "+8.2%", 
    tag: "Apartment",
    beds: 3,
    baths: 2,
    sqft: "1800 sq ft"
  },
  { 
    id: 3, 
    title: "Commercial Space", 
    location: "BKC, Mumbai", 
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800", 
    price: "₹2,50,00,000", 
    roi: "+15.1%", 
    tag: "Commercial",
    beds: 0, // Icons will handle showing relevant info
    baths: 2,
    sqft: "3000 sq ft"
  },
];

const FeaturedProperties = () => {
  const router = useRouter();

  const goToContact = () => {
    router.push('/contact');
  };

  return (
    <section className="py-12 md:py-24 px-4 sm:px-6 bg-[#fafdfc] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-emerald-50/60 rounded-full blur-[80px] md:blur-[120px] -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-16 gap-8 text-center md:text-left">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              className="flex items-center justify-center md:justify-start gap-2 text-emerald-600 font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs mb-4"
            >
              <span className="w-6 md:w-8 h-[2px] bg-emerald-600" />
              Wipo Group Selection
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              className="text-3xl sm:text-4xl md:text-6xl font-[1000] text-slate-900 tracking-tight leading-tight"
            >
              Featured <span className="text-emerald-500 font-normal italic serif">Properties</span>
            </motion.h2>
          </div>
          
          <motion.button 
            onClick={goToContact} 
            whileHover={{ scale: 1.05, color: "#059669" }}
            whileTap={{ scale: 0.95 }}
            className="text-slate-900 font-bold border-b-2 border-emerald-500 pb-1 flex items-center gap-2 group transition-all text-sm md:text-base"
          >
            Contact for All
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:rotate-45 transition-transform">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </motion.button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={goToContact}
              className="group relative bg-white rounded-[32px] md:rounded-[40px] p-3 md:p-4 border border-emerald-50 shadow-xl shadow-emerald-900/5 cursor-pointer overflow-hidden transition-all hover:shadow-emerald-200"
            >
              <div className="relative aspect-[4/3] sm:aspect-square md:h-80 w-full rounded-[24px] md:rounded-[32px] overflow-hidden">
                <img 
                  src={property.image} 
                  alt={property.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                
                <div className="absolute top-4 right-4">
                  <span className="bg-[#22C55E] text-white px-3 py-1 rounded-full text-[10px] font-bold">
                    {property.tag}
                  </span>
                </div>

                <div className="absolute inset-0 bg-emerald-900/20 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-[2px]">
                  <div className="bg-white px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl flex items-center gap-2 md:gap-3 shadow-2xl">
                    <div className="text-left">
                      <p className="text-[8px] md:text-[10px] text-emerald-500 font-bold uppercase">Estimated ROI</p>
                      <p className="text-lg md:text-xl font-black text-slate-900">{property.roi}</p>
                    </div>
                    <div className="bg-emerald-500 text-white p-1.5 md:p-2 rounded-full">
                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 md:mt-6 px-2 text-left">
                <h3 className="font-bold text-xl md:text-2xl text-slate-900 group-hover:text-emerald-600 transition-colors tracking-tight line-clamp-1">
                  {property.title}
                </h3>
                <div className="flex items-center gap-1 text-slate-400 mt-1 mb-4">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span className="text-xs font-medium text-slate-500">{property.location}</span>
                </div>
                
                <p className="text-[#22C55E] font-bold text-2xl mb-4">{property.price}</p>

                <div className="flex items-center gap-4 text-slate-500 text-sm">
                  {property.beds > 0 && (
                    <div className="flex items-center gap-1">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7v11m18-11v11M3 11h18M5 11V9a2 2 0 012-2h10a2 2 0 012 2v2"/></svg>
                      <span>{property.beds}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 21h10M9 5H7a2 2 0 00-2 2v11a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 5v2m6-2v2"/></svg>
                    <span>{property.baths}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
                    <span>{property.sqft}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <button className="w-full bg-[#22C55E] text-white py-3 rounded-xl font-bold hover:bg-emerald-600 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;