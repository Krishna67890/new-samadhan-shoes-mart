import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import {
  Wrench, MapPin, Phone, Clock, ShieldCheck,
  HelpCircle, Zap, Search, ArrowRight,
  Smartphone, ShieldAlert, Filter, Loader2,
  X, MessageCircle, Send
} from 'lucide-react';
import ServiceCenterCard from '../components/ServiceCenterCard';
import useFetch from '../hooks/useFetch';

const ServiceCentrePage = () => {
  const [centers, setCenters] = useState([]);
  const { loading, request, error: fetchError } = useFetch();
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [selectedCenter, setSelectedCenter] = useState(null);

  const containerRef = useRef(null);

  const fetchCenters = async () => {
    try {
      const data = await request(`/api/service-centers?search=${searchTerm}&city=${cityFilter}`);
      setCenters(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Service Centers Fetch Error:", err);
      setError('Service center data currently unavailable. Using offline protocols.');
      setCenters([]);
    }
  };

  useEffect(() => {
    fetchCenters();
  }, [searchTerm, cityFilter]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.svc-reveal', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, [loading]);

  const handleBookProtocol = (center) => {
    setSelectedCenter(center);
  };

  const services = [
    {
      title: 'Diamond Restoration',
      description: 'The ultimate rejuvenation for your premium leather and suede grails. 100% molecular-level deep cleaning.',
      icon: <ShieldCheck className="w-10 h-10 text-blue-500" />,
      color: 'bg-blue-600/10'
    },
    {
      title: 'Sole Reconstruction',
      description: 'Precision replacement of worn-out soles with high-durability 2026 performance rubber polymers.',
      icon: <Wrench className="w-10 h-10 text-indigo-500" />,
      color: 'bg-indigo-600/10'
    },
    {
      title: 'Fit Optimization',
      description: 'Ergonomic sizing adjustments for the perfect anatomical fit. We modify, you conquer.',
      icon: <HelpCircle className="w-10 h-10 text-emerald-500" />,
      color: 'bg-emerald-600/10'
    },
  ];

  return (
    <div className="bg-[#050505] min-h-screen pt-32 pb-24 relative overflow-hidden" ref={containerRef}>
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* --- CINEMATIC HERO --- */}
        <section className="relative mb-24 svc-reveal">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 border-b border-white/10 pb-16">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-px bg-blue-600"></div>
                <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.5em] italic">Maintenance Node 2026</p>
                <div className="ml-4 px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center gap-2 border border-emerald-500/20">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-[8px] font-black uppercase tracking-widest">Active</span>
                </div>
              </div>
              <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter leading-[0.8] uppercase">
                ELITE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">RESTORATION.</span>
              </h1>
            </div>
            <p className="text-slate-500 font-black text-[10px] max-w-sm uppercase tracking-[0.4em] border-l-2 border-white/10 pl-8 leading-loose italic">
              "Preserving the integrity of your collection through advanced artisanal craftsmanship."
            </p>
          </div>
        </section>

        {/* --- PREMIUM SERVICES GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {services.map((service, index) => (
            <div key={index} className="group bg-white/5 backdrop-blur-3xl p-12 rounded-[4rem] border border-white/5 hover:border-white/20 transition-all duration-700 svc-reveal shadow-2xl">
              <div className={`w-20 h-20 ${service.color} rounded-3xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500 border border-white/5`}>
                {service.icon}
              </div>
              <h3 className="text-3xl font-black text-white mb-6 tracking-tighter uppercase leading-none">{service.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed italic mb-10 text-sm">"{service.description}"</p>
              <div className="flex items-center gap-2 text-[10px] font-black text-blue-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                 Start Protocol <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>

        {/* --- SEARCH & FILTER SECTION --- */}
        <div className="mb-16 svc-reveal">
           <div className="bg-white/5 p-6 rounded-[3rem] border border-white/10 backdrop-blur-3xl flex flex-col md:flex-row gap-6 shadow-2xl">
              <div className="flex-1 relative group">
                 <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={20} />
                 <input
                    type="text"
                    placeholder="Search maintenance node..."
                    className="w-full pl-20 pr-8 py-6 bg-white/5 rounded-[2.5rem] font-black text-white outline-none focus:bg-white/10 border border-white/5 focus:border-blue-500/30 transition-all text-xs uppercase tracking-widest placeholder:text-slate-700"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                 />
              </div>
              <div className="flex items-center gap-4">
                 <div className="relative group">
                    <Filter className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <select
                       className="pl-16 pr-12 py-6 bg-white/5 rounded-[2.5rem] font-black text-white outline-none appearance-none focus:bg-white/10 border border-white/5 focus:border-blue-500/30 transition-all min-w-[220px] text-xs uppercase tracking-widest cursor-pointer"
                       value={cityFilter}
                       onChange={(e) => setCityFilter(e.target.value)}
                    >
                       <option value="" className="bg-[#111]">Global Regions</option>
                       <option value="Pune" className="bg-[#111]">Pune Node</option>
                       <option value="Mumbai" className="bg-[#111]">Mumbai Node</option>
                       <option value="Nashik" className="bg-[#111]">Nashik Node</option>
                    </select>
                 </div>
              </div>
           </div>
        </div>

        {/* --- SERVICE CENTERS LIST --- */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 svc-reveal">
             <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-8 shadow-[0_0_30px_rgba(37,99,235,0.3)]"></div>
             <p className="text-slate-500 font-black tracking-[0.5em] uppercase text-[10px]">Accessing Secure Protocols...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 svc-reveal">
             {centers.map(center => (
                <ServiceCenterCard key={center._id} center={center} onBook={handleBookProtocol} />
             ))}
          </div>
        )}

        {/* --- BOOKING MODAL OVERLAY --- */}
        {selectedCenter && (
           <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <div className="absolute inset-0 bg-black/90 backdrop-blur-3xl transition-opacity animate-in fade-in" onClick={() => setSelectedCenter(null)}></div>
              <div className="bg-[#0f0f0f] w-full max-w-2xl rounded-[4rem] overflow-hidden relative z-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] border border-white/10 animate-in slide-in-from-bottom-10 duration-700">
                 <button
                    onClick={() => setSelectedCenter(null)}
                    className="absolute top-10 right-10 w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-slate-500 hover:text-white transition-all border border-white/5 hover:border-white/20"
                 >
                    <X size={24} />
                 </button>

                 <div className="p-12 sm:p-16">
                    <div className="flex items-center gap-3 mb-8">
                       <div className="w-10 h-1 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)]"></div>
                       <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] italic">Direct Intervention Protocol</p>
                    </div>
                    <h2 className="text-5xl font-black text-white tracking-tighter uppercase mb-6 leading-none">{selectedCenter.name}</h2>
                    <p className="text-slate-500 font-medium mb-12 italic text-lg leading-relaxed">"Your grail restoration starts here. Choose your secure communication channel."</p>

                    <div className="space-y-6">
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                          <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-md">
                             <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4 italic">Location Matrix</p>
                             <div className="flex gap-4">
                                <MapPin size={24} className="text-blue-500 shrink-0" />
                                <p className="text-lg font-black text-white leading-tight uppercase tracking-tight">{selectedCenter.address}, {selectedCenter.city}</p>
                             </div>
                          </div>
                          <div className="bg-emerald-500/5 p-8 rounded-[2.5rem] border border-emerald-500/10 backdrop-blur-md flex flex-col justify-center">
                             <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-4 italic">Operational Status</p>
                             <div className="flex items-center gap-4">
                                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                                <p className="text-lg font-black text-emerald-500 leading-tight uppercase tracking-tight">24/7 ACTIVE</p>
                             </div>
                          </div>
                       </div>

                       <div className="grid grid-cols-2 gap-6">
                          <button
                             onClick={() => window.location.href = `tel:${selectedCenter.phone}`}
                             className="bg-white text-black py-7 rounded-[2rem] text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-blue-600 hover:text-white transition-all shadow-2xl"
                          >
                             <Phone size={22} /> Call Node
                          </button>
                          <button
                             onClick={() => {
                                const message = `*ELITE RESTORATION REQUEST*\n\nNode: ${selectedCenter.name}\nProtocol: Diamond Restoration\n\nI need a professional service for my footwear. Please confirm the security clearance for a visit.`;
                                window.open(`https://wa.me/${selectedCenter.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
                             }}
                             className="bg-emerald-600 text-white py-7 rounded-[2rem] text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-emerald-500 transition-all shadow-2xl shadow-emerald-500/20"
                          >
                             <MessageCircle size={22} /> WhatsApp
                          </button>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        )}

        {/* --- TRUST BAR --- */}
        <div className="mt-40 pt-16 border-t border-white/5 flex flex-wrap justify-between items-center gap-10 svc-reveal opacity-30 hover:opacity-100 transition-all duration-1000">
           <div className="flex items-center gap-4 font-black uppercase tracking-widest text-[10px] text-slate-500">
              <ShieldAlert size={24} className="text-blue-500" /> Global Craftsmanship Standards Applied
           </div>
           <div className="flex gap-12 font-black uppercase tracking-widest text-[9px] text-slate-600">
              <span>Vision 2026 Authorized</span>
              <span>Elite Maintenance Node</span>
           </div>
        </div>

      </div>
    </div>
  );
};

export default ServiceCentrePage;
