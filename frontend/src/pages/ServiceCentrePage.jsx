import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import {
  Wrench, MapPin, Phone, Clock, ShieldCheck,
  HelpCircle, Zap, Search, ArrowRight,
  Smartphone, ShieldAlert, Filter, Loader2,
  X, MessageCircle, Send
} from 'lucide-react';
import ServiceCenterCard from '../components/ServiceCenterCard';

const ServiceCentrePage = () => {
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [selectedCenter, setSelectedCenter] = useState(null);

  const containerRef = useRef(null);

  const fetchCenters = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/service-centers?search=${searchTerm}&city=${cityFilter}`);
      if (!response.ok) throw new Error('API Error');
      const data = await response.json();
      setCenters(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      console.error("Service Centers Fetch Error:", err);
      setError('Service center data currently unavailable. Using offline protocols.');
      setCenters([]);
      setLoading(false);
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
      icon: <ShieldCheck className="w-10 h-10 text-blue-600" />,
      color: 'bg-blue-50'
    },
    {
      title: 'Sole Reconstruction',
      description: 'Precision replacement of worn-out soles with high-durability 2026 performance rubber polymers.',
      icon: <Wrench className="w-10 h-10 text-indigo-600" />,
      color: 'bg-indigo-50'
    },
    {
      title: 'Fit Optimization',
      description: 'Ergonomic sizing adjustments for the perfect anatomical fit. We modify, you conquer.',
      icon: <HelpCircle className="w-10 h-10 text-emerald-600" />,
      color: 'bg-emerald-50'
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-24 px-6 overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto">

        {/* --- CINEMATIC HERO --- */}
        <section className="relative mb-24 svc-reveal">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[120px] -z-10"></div>
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 border-b border-slate-200 pb-16">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-px bg-blue-600"></div>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.5em]">Maintenance Node 2026</p>
                <div className="ml-4 px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-[8px] font-black uppercase tracking-widest">24/7 All Time Active</span>
                </div>
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-slate-950 tracking-tighter leading-[0.8]">
                ELITE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">RESTORATION.</span>
              </h1>
            </div>
            <p className="text-slate-500 font-medium text-xl max-w-sm italic border-l-2 border-slate-200 pl-8 leading-relaxed">
              "Preserving the integrity of your collection through advanced artisanal craftsmanship."
            </p>
          </div>
        </section>

        {/* --- PREMIUM SERVICES GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {services.map((service, index) => (
            <div key={index} className="group bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-4 transition-all duration-700 svc-reveal">
              <div className={`w-20 h-20 ${service.color} rounded-3xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500`}>
                {service.icon}
              </div>
              <h3 className="text-3xl font-black text-slate-950 mb-6 tracking-tighter uppercase">{service.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed italic mb-10 text-sm">"{service.description}"</p>
              <div className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                 Start Protocol <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>

        {/* --- SEARCH & FILTER SECTION --- */}
        <div className="mb-16 svc-reveal">
           <div className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col md:flex-row gap-6">
              <div className="flex-1 relative group">
                 <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                 <input
                    type="text"
                    placeholder="Search by center name or location..."
                    className="w-full pl-16 pr-8 py-5 bg-slate-50 rounded-2xl font-bold text-slate-900 outline-none focus:bg-white border-2 border-transparent focus:border-blue-100 transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                 />
              </div>
              <div className="flex items-center gap-4">
                 <div className="relative group">
                    <Filter className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <select
                       className="pl-14 pr-10 py-5 bg-slate-50 rounded-2xl font-bold text-slate-900 outline-none appearance-none focus:bg-white border-2 border-transparent focus:border-blue-100 transition-all min-w-[200px]"
                       value={cityFilter}
                       onChange={(e) => setCityFilter(e.target.value)}
                    >
                       <option value="">All Regions</option>
                       <option value="Pune">Pune Node</option>
                       <option value="Mumbai">Mumbai Node</option>
                       <option value="Delhi">Delhi Node</option>
                    </select>
                 </div>
              </div>
           </div>
        </div>

        {/* --- SERVICE CENTERS LIST --- */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 svc-reveal">
             <Loader2 className="w-16 h-16 text-blue-600 animate-spin mb-8" />
             <p className="text-slate-400 font-black tracking-[0.5em] uppercase text-[10px]">Synchronizing Service Nodes...</p>
          </div>
        ) : centers.length === 0 ? (
           <div className="text-center py-40 bg-white rounded-[4rem] border border-slate-100 shadow-sm svc-reveal">
              <ShieldAlert size={64} className="mx-auto text-slate-200 mb-8" />
              <h3 className="text-2xl font-black text-slate-900 uppercase">No Active Nodes</h3>
              <p className="text-slate-400 mt-4 uppercase text-[10px] font-bold tracking-widest">No service centers found in this sector.</p>
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
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl transition-opacity animate-in fade-in" onClick={() => setSelectedCenter(null)}></div>
              <div className="bg-white w-full max-w-2xl rounded-[4rem] overflow-hidden relative z-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom-10 duration-700">
                 <button
                    onClick={() => setSelectedCenter(null)}
                    className="absolute top-10 right-10 w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all"
                 >
                    <X size={24} />
                 </button>

                 <div className="p-12 sm:p-16">
                    <div className="flex items-center gap-3 mb-6">
                       <div className="w-10 h-1 bg-blue-600 rounded-full"></div>
                       <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em]">Direct Intervention</p>
                    </div>
                    <h2 className="text-5xl font-black text-slate-950 tracking-tighter uppercase mb-4 leading-none">{selectedCenter.name}</h2>
                    <p className="text-slate-500 font-medium mb-12 italic">"Your grail restoration starts here. Choose your protocol below."</p>

                    <div className="space-y-6">
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Location Matrix</p>
                             <div className="flex gap-4">
                                <MapPin size={24} className="text-blue-600 shrink-0" />
                                <p className="text-lg font-black text-slate-900 leading-tight">{selectedCenter.address}, {selectedCenter.city}</p>
                             </div>
                          </div>
                          <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100 flex flex-col justify-center">
                             <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-4">Operational Status</p>
                             <div className="flex items-center gap-4">
                                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                                <p className="text-lg font-black text-emerald-700 leading-tight uppercase">24/7 ACTIVE</p>
                             </div>
                          </div>
                       </div>

                       <div className="grid grid-cols-2 gap-4">
                          <button
                             onClick={() => window.location.href = `tel:${selectedCenter.phone}`}
                             className="bg-slate-950 text-white py-6 rounded-3xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-blue-600 transition-all shadow-2xl shadow-slate-200"
                          >
                             <Phone size={20} /> Call Node
                          </button>
                          <button
                             onClick={() => {
                                const message = `Hello, I want to book a shoe repair at *${selectedCenter.name}*. Please confirm the next available slot.`;
                                window.open(`https://wa.me/${selectedCenter.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
                             }}
                             className="bg-emerald-500 text-white py-6 rounded-3xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-emerald-600 transition-all shadow-2xl shadow-emerald-200"
                          >
                             <MessageCircle size={20} /> WhatsApp
                          </button>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        )}

        {/* --- TRUST BAR --- */}
        <div className="mt-40 pt-16 border-t border-slate-200 flex flex-wrap justify-between items-center gap-10 svc-reveal opacity-50 grayscale hover:grayscale-0 transition-all duration-1000">
           <div className="flex items-center gap-4 font-black uppercase tracking-widest text-xs text-slate-400">
              <ShieldAlert size={24} className="text-blue-600" /> Global Craftsmanship Standards
           </div>
           <div className="flex gap-12 font-black uppercase tracking-widest text-[9px] text-slate-400">
              <span>EST. 2026</span>
              <span>Pune HQ Authorized</span>
              <span>Secure Intervention</span>
           </div>
        </div>

      </div>
    </div>
  );
};

export default ServiceCentrePage;
