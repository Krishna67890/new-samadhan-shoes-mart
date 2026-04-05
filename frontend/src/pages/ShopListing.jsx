import React, { useState, useEffect } from 'react';
import ShopCard from '../components/Shop/ShopCard';
import { Search, MapPin, SlidersHorizontal, ArrowRight, LayoutGrid, List } from 'lucide-react';
import useFetch from '../hooks/useFetch';

const ShopListing = () => {
  const [shops, setShops] = useState([]);
  const { loading, request } = useFetch();
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    fetchShops();
  }, [search, city]);

  const fetchShops = async () => {
    try {
      const data = await request(`/api/shops?search=${search}&city=${city}`);
      setShops(data);
    } catch (error) {
      console.error('Error fetching shops:', error);
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/10 blur-[120px] rounded-full"></div>

      {/* --- ELITE SEARCH HEADER --- */}
      <div className="container mx-auto px-6 max-w-7xl relative z-10 mb-20">
         <div className="flex flex-col md:flex-row items-center gap-6 bg-white/5 p-5 rounded-[3rem] border border-white/10 backdrop-blur-3xl shadow-2xl">

             {/* Search Input */}
             <div className="flex-1 flex items-center gap-4 px-8 py-5 bg-white/5 rounded-[2.5rem] border border-white/5 hover:border-blue-500/30 transition-all group">
                <Search size={20} className="text-blue-500" />
                <input
                  type="text"
                  placeholder="Search Shoe Dealers..."
                  className="bg-transparent border-none outline-none w-full text-xs font-black uppercase tracking-widest text-white placeholder:text-slate-500"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
             </div>

             {/* Location Input */}
             <div className="flex-1 flex items-center gap-4 px-8 py-5 bg-white/5 rounded-[2.5rem] border border-white/5 hover:border-blue-500/30 transition-all group">
                <MapPin size={20} className="text-rose-500" />
                <input
                  type="text"
                  placeholder="City Node..."
                  className="bg-transparent border-none outline-none w-full text-xs font-black uppercase tracking-widest text-white placeholder:text-slate-500"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
             </div>

             {/* Action Button */}
             <button className="bg-white text-black px-12 py-5 rounded-[2.5rem] text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-blue-600 hover:text-white transition-all shadow-2xl">
                Scan Nodes <ArrowRight size={16} />
             </button>
         </div>
      </div>

      {/* --- DIRECTORY CONTENT --- */}
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex justify-between items-end mb-16">
           <div>
              <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-4 italic">Verified Elite Network</p>
              <h1 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">
                {city ? `Marts in ${city}` : 'Premium Network'}
              </h1>
           </div>

           <div className="hidden md:flex gap-4">
              <button className="p-4 bg-white/5 border border-white/10 rounded-2xl text-slate-500 hover:text-white transition-all">
                 <SlidersHorizontal size={20} />
              </button>
              <div className="flex items-center bg-white/5 border border-white/10 p-2 rounded-2xl">
                 <button className="p-2.5 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-500/20"><LayoutGrid size={18} /></button>
                 <button className="p-2.5 text-slate-500 hover:text-white"><List size={18} /></button>
              </div>
           </div>
        </div>

        {/* --- LISTING GRID --- */}
        {loading ? (
          <div className="grid grid-cols-1 gap-12">
            {[1, 2].map((n) => (
              <div key={n} className="h-80 bg-white/5 rounded-[4rem] animate-pulse border border-white/5" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-12">
            {shops.length > 0 ? (
              shops.map((shop) => (
                <ShopCard key={shop._id} shop={shop} />
              ))
            ) : (
              <div className="text-center py-40 bg-white/5 rounded-[4rem] border border-white/5 backdrop-blur-3xl">
                 <h3 className="text-2xl font-black text-slate-700 uppercase tracking-[0.2em] italic">No Nodes Detected in this Sector</h3>
                 <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-6">Try searching for Nashik or Mumbai</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopListing;
