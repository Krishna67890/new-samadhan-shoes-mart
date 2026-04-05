import React, { useState, useEffect } from 'react';
import ShopCard from '../components/Shop/ShopCard';
import { Search, MapPin, SlidersHorizontal, ArrowRight, LayoutGrid, List } from 'lucide-react';

const ShopListing = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    fetchShops();
  }, [search, city]);

  const fetchShops = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/shops?search=${search}&city=${city}`);
      const data = await response.json();
      setShops(data);
    } catch (error) {
      console.error('Error fetching shops:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">

      {/* --- ELITE SEARCH HEADER --- */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40 bg-white">
        <div className="container mx-auto px-6 py-8">
           <div className="flex flex-col md:flex-row items-center gap-6 max-w-6xl mx-auto bg-white p-4 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100">

             {/* Search Input */}
             <div className="flex-1 flex items-center gap-4 px-6 py-3 bg-slate-50 rounded-[2rem] border-2 border-transparent hover:border-blue-200 transition-all group">
                <Search size={18} className="text-blue-500 group-hover:scale-110 transition-transform" />
                <input
                  type="text"
                  placeholder="Search Shoe Dealers, Brands, Marts..."
                  className="bg-transparent border-none outline-none w-full text-xs font-black uppercase tracking-widest text-slate-900 placeholder:text-slate-400"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
             </div>

             {/* Location Input */}
             <div className="flex-1 flex items-center gap-4 px-6 py-3 bg-slate-50 rounded-[2rem] border-2 border-transparent hover:border-blue-200 transition-all group">
                <MapPin size={18} className="text-rose-500 group-hover:scale-110 transition-transform" />
                <input
                  type="text"
                  placeholder="City (e.g., Mumbai, Pune)"
                  className="bg-transparent border-none outline-none w-full text-xs font-black uppercase tracking-widest text-slate-900 placeholder:text-slate-400"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
             </div>

             {/* Action Button */}
             <button className="bg-slate-950 text-white px-10 py-4 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-blue-600 transition-all shadow-xl shadow-slate-200">
                Search <ArrowRight size={14} />
             </button>
           </div>
        </div>
      </div>

      {/* --- DIRECTORY CONTENT --- */}
      <div className="container mx-auto px-6 mt-12 max-w-6xl">
        <div className="flex justify-between items-end mb-12">
           <div>
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-2">Verified Elite Dealers</p>
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">
                {city ? `Shoe Marts in ${city}` : 'Top Shoe Dealers Near You'}
              </h1>
           </div>

           <div className="hidden md:flex gap-4">
              <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-blue-600 transition-all shadow-sm">
                 <SlidersHorizontal size={20} />
              </button>
              <div className="flex items-center bg-white border border-slate-200 p-1.5 rounded-2xl shadow-sm">
                 <button className="p-2.5 bg-slate-950 text-white rounded-xl"><LayoutGrid size={18} /></button>
                 <button className="p-2.5 text-slate-400"><List size={18} /></button>
              </div>
           </div>
        </div>

        {/* --- LISTING GRID --- */}
        {loading ? (
          <div className="space-y-8 animate-pulse">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-64 bg-slate-200 rounded-[2rem] w-full" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-12">
            {shops.length > 0 ? (
              shops.map((shop) => (
                <ShopCard key={shop._id} shop={shop} />
              ))
            ) : (
              <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
                 <h3 className="text-2xl font-black text-slate-300 uppercase tracking-widest">No Dealers Found in this Node</h3>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};

export default ShopListing;
