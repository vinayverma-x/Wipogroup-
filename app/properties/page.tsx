"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, LayoutDashboard, PlusCircle, 
  Building, MapPin, Landmark, ArrowRight, 
  IndianRupee, UploadCloud, Bed, Bath, 
  Move, FileText, Trash2, Phone, Mail
} from "lucide-react";
import Loader from "@/components/ui/Loader";

// --- TYPES ---
export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  type: "Residential" | "Commercial" | "Villa" | "Penthouse";
  area: string;
  bedrooms: string;
  bathrooms: string;
  description: string;
  images: string[];
  status: "Available" | "Sold";
  owner: "System" | "User";
}

export default function PropertiesPage() {
  const [activeTab, setActiveTab] = useState<"buy" | "sell" | "list" | "contact">("buy");
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [listForm, setListForm] = useState({
    title: "", location: "", price: "", type: "Residential" as any,
    area: "", bedrooms: "", bathrooms: "", description: "",
    images: [] as string[]
  });

  useEffect(() => {
    const initData = async () => {
      await new Promise(r => setTimeout(r, 1200));
      setProperties([
        {
          id: "1", title: "The Glass House", location: "Malabar Hill, Mumbai", price: 85000000,
          type: "Penthouse", area: "4200", bedrooms: "5", bathrooms: "4",
          description: "Ultra-modern glass structure with 360-degree ocean views.",
          images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"],
          status: "Available", owner: "System"
        },
        {
          id: "2", title: "Serene Villa", location: "Lonavala, MH", price: 32000000,
          type: "Villa", area: "3500", bedrooms: "4", bathrooms: "4",
          description: "Private pool villa surrounded by lush greenery.",
          images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800"],
          status: "Available", owner: "System"
        },
        {
          id: "3", title: "Skyline Business Hub", location: "BKC, Mumbai", price: 125000000,
          type: "Commercial", area: "12000", bedrooms: "0", bathrooms: "10",
          description: "Premium office space in the heart of the financial district.",
          images: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800"],
          status: "Available", owner: "System"
        }
      ]);
      setLoading(false);
    };
    initData();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setListForm(prev => ({ ...prev, images: [...prev.images, ...newImages].slice(0, 10) }));
    }
  };

  const handleListNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (listForm.images.length === 0) return alert("Photo to dalo!");
    const newProp: Property = {
      ...listForm,
      id: Date.now().toString(),
      price: Number(listForm.price),
      status: "Available",
      owner: "User",
    };
    setProperties([newProp, ...properties]);
    setListForm({ title: "", location: "", price: "", type: "Residential", area: "", bedrooms: "", bathrooms: "", description: "", images: [] });
    setActiveTab("sell");
  };

  const openContactPage = () => setActiveTab("contact");
  const handleDelete = (id: string) => setProperties(prev => prev.filter(p => p.id !== id));

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><Loader /></div>;

  return (
    <div className="min-h-screen bg-[#F4F7F5] flex font-sans selection:bg-emerald-100 selection:text-emerald-900 relative">
      
      {/* --- SIDEBAR --- */}
      <aside className="sticky left-6 top-32 w-20 bg-white border border-emerald-100 flex flex-col items-center py-8 rounded-[32px] shadow-2xl hidden lg:flex z-40 self-start">
        <div className="mb-10">
          <motion.div whileHover={{ rotate: 180 }} className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
            <Landmark size={24} />
          </motion.div>
        </div>
        
        <nav className="flex flex-col gap-6">
          <SideBtn active={activeTab === "buy"} onClick={() => setActiveTab("buy")} icon={<ShoppingBag size={22}/>} label="Buy" />
          <SideBtn active={activeTab === "sell"} onClick={() => setActiveTab("sell")} icon={<LayoutDashboard size={22}/>} label="Sell" />
          <SideBtn active={activeTab === "list"} onClick={() => setActiveTab("list")} icon={<PlusCircle size={22}/>} label="Upload" />
        </nav>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 lg:pl-32 p-6 lg:p-12">
        <AnimatePresence mode="wait">
          
          {activeTab === "buy" && (
            <motion.div key="buy" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <div className="mb-10">
                <h1 className="text-5xl font-black text-slate-900 tracking-tight italic">Market <span className="text-emerald-500">Listings</span></h1>
                <p className="text-slate-500 mt-2 font-medium">Click on any property to contact the owner.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {properties.filter(p => p.owner === "System").map(p => (
                  <PropertyCard key={p.id} property={p} onAction={openContactPage} actionLabel="Contact to Buy" />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "sell" && (
            <motion.div key="sell" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="mb-10">
                <h1 className="text-5xl font-black text-slate-900 tracking-tight italic">My <span className="text-emerald-500">Uploads</span></h1>
                <p className="text-slate-500 mt-2 font-medium">Manage your properties listed for sale.</p>
              </div>
              {properties.filter(p => p.owner === "User").length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {properties.filter(p => p.owner === "User").map(p => (
                    <PropertyCard key={p.id} property={p} onAction={() => handleDelete(p.id)} actionLabel="Delete Listing" isOwner />
                  ))}
                </div>
              ) : (
                <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="h-[50vh] bg-white rounded-[48px] border-2 border-dashed border-emerald-100 flex flex-col items-center justify-center text-center p-10">
                  <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mb-6"><Building size={40} /></div>
                  <h3 className="text-2xl font-black text-slate-900">No Properties Uploaded</h3>
                  <button onClick={() => setActiveTab("list")} className="mt-6 bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-[2px]">Upload Now</button>
                </motion.div>
              )}
            </motion.div>
          )}

          {activeTab === "list" && (
            <motion.div key="list" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto">
              <div className="bg-white p-12 rounded-[48px] border border-emerald-50 shadow-2xl">
                <div className="mb-12">
                  <h2 className="text-4xl font-black text-slate-900 tracking-tight italic">List Your <span className="text-emerald-500">Property</span></h2>
                </div>
                <form onSubmit={handleListNew} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-1 space-y-6">
                    <div className="bg-slate-50 p-6 rounded-[32px] border border-slate-100">
                      <input type="file" multiple hidden ref={fileInputRef} onChange={handleImageUpload} accept="image/*" />
                      <div onClick={() => fileInputRef.current?.click()} className="aspect-square bg-white rounded-2xl border-2 border-dashed border-emerald-200 flex flex-col items-center justify-center cursor-pointer">
                        <UploadCloud className="text-emerald-600 mb-2" size={32} />
                        <p className="text-xs font-bold">Upload Photos</p>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        {listForm.images.map((img, idx) => (
                          <div key={idx} className="aspect-square rounded-lg overflow-hidden border border-emerald-100"><img src={img} className="w-full h-full object-cover" alt="" /></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormInput label="Title" icon={<Building size={14}/>} value={listForm.title} onChange={(v: string) => setListForm({...listForm, title: v})} />
                      <FormInput label="Location" icon={<MapPin size={14}/>} value={listForm.location} onChange={(v: string) => setListForm({...listForm, location: v})} />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <FormInput label="Price" icon={<IndianRupee size={14}/>} value={listForm.price} onChange={(v: string) => setListForm({...listForm, price: v})} />
                      <FormInput label="Area" icon={<Move size={14}/>} value={listForm.area} onChange={(v: string) => setListForm({...listForm, area: v})} />
                      <FormInput label="Beds" icon={<Bed size={14}/>} value={listForm.bedrooms} onChange={(v: string) => setListForm({...listForm, bedrooms: v})} />
                      <FormInput label="Baths" icon={<Bath size={14}/>} value={listForm.bathrooms} onChange={(v: string) => setListForm({...listForm, bathrooms: v})} />
                    </div>
                    <textarea required rows={4} className="w-full p-5 bg-slate-50 rounded-[24px] font-bold outline-none border-2 border-transparent focus:border-emerald-500 transition-all text-sm" placeholder="Description..." value={listForm.description} onChange={e => setListForm({...listForm, description: e.target.value})} />
                    <button type="submit" className="w-full bg-emerald-600 text-white py-5 rounded-[24px] font-black uppercase tracking-[3px] shadow-xl">Deploy Listing</button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}

          {activeTab === "contact" && (
            <motion.div key="contact" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto">
              <div className="bg-white p-12 rounded-[50px] shadow-2xl text-center border border-emerald-50">
                <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8"><Phone size={40} /></div>
                <h2 className="text-4xl font-black text-slate-900 mb-4 italic">Get in <span className="text-emerald-500">Touch</span></h2>
                <div className="space-y-4 text-left max-w-sm mx-auto">
                  <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <Phone size={20} className="text-emerald-600"/>
                    <p className="font-black text-slate-800">+1(938)2090088</p>
                  </div>
                  <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <Mail size={20} className="text-emerald-600"/>
                    <p className="font-black text-slate-800">wipogroupn@gmail.com</p>
                  </div>
                </div>
                <button onClick={() => setActiveTab("buy")} className="mt-10 bg-slate-900 text-white px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest">Back to Market</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// --- SUB COMPONENTS ---
function SideBtn({ active, onClick, icon, label }: any) {
  return (
    <div className="relative group">
      <motion.button 
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
        onClick={onClick} 
        className={`w-14 h-14 flex items-center justify-center rounded-2xl transition-all ${active ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-200' : 'text-slate-300 hover:bg-emerald-50 hover:text-emerald-600'}`}
      >
        {icon}
      </motion.button>
      <span className="absolute left-16 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 ml-4 shadow-xl">
        {label}
      </span>
    </div>
  );
}

function PropertyCard({ property, onAction, actionLabel, isOwner }: any) {
  return (
    <motion.div layout className="bg-white rounded-[40px] p-4 border border-emerald-50 shadow-xl shadow-emerald-900/5 hover:shadow-emerald-200 transition-all group cursor-pointer">
      {/* Image Area */}
      <div className="h-72 rounded-[32px] overflow-hidden relative">
        <img src={property.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
        <div className="absolute top-4 right-4">
          <span className="bg-[#22C55E] text-white px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider">
            {property.type}
          </span>
        </div>
      </div>

      {/* Details Area */}
      <div className="mt-6 px-2">
        <h3 className="text-2xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors tracking-tight line-clamp-1">
          {property.title}
        </h3>
        
        <div className="flex items-center gap-1 text-slate-400 mt-1 mb-4">
          <MapPin size={14} />
          <span className="text-xs font-bold uppercase tracking-wider truncate">{property.location}</span>
        </div>

        <p className="text-[#22C55E] font-[1000] text-2xl mb-4">
          ₹{property.price.toLocaleString('en-IN')}
        </p>

        {/* Icons Row */}
        <div className="flex items-center gap-5 text-slate-500 font-bold text-xs uppercase tracking-widest">
          {property.bedrooms !== "0" && (
            <div className="flex items-center gap-1.5">
              <Bed size={16} className="text-slate-400" />
              <span>{property.bedrooms}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Bath size={16} className="text-slate-400" />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Move size={16} className="text-slate-400" />
            <span>{property.area} sq ft</span>
          </div>
        </div>

        <button 
          onClick={onAction} 
          className={`w-full py-4 mt-8 rounded-[20px] font-black uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-2 ${
            isOwner 
            ? 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white' 
            : 'bg-[#22C55E] text-white hover:bg-emerald-600 shadow-lg shadow-emerald-100'
          }`}
        >
          {isOwner && <Trash2 size={14}/>}
          {actionLabel}
        </button>
      </div>
    </motion.div>
  );
}

function FormInput({ label, type = "text", icon, value, onChange }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">{icon} {label}</label>
      <input required type={type} value={value} onChange={e => onChange(e.target.value)} className="w-full p-4 bg-slate-50 rounded-2xl font-bold outline-none border-2 border-transparent focus:border-emerald-500 text-sm" />
    </div>
  );
}