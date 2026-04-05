import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useFetch from '../hooks/useFetch';
import {
  Users,
  Package,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  PlusCircle,
  List,
  Truck,
  Loader2
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { loading, error, request } = useFetch();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    revenue: 0,
    activeVisitors: 0
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }

    const fetchStats = async () => {
      try {
        const data = await request('/api/orders/analytics');
        setStats(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, [user, navigate, request]);

  if (!user || user.role !== 'admin') return null;

  const statCards = [
    { title: 'Total Revenue', value: `₹${stats.revenue}`, icon: <DollarSign className="w-8 h-8 text-green-600" />, bg: 'bg-green-50' },
    { title: 'Total Orders', value: stats.totalOrders, icon: <ShoppingBag className="w-8 h-8 text-blue-600" />, bg: 'bg-blue-50' },
    { title: 'Total Users', value: stats.totalUsers, icon: <Users className="w-8 h-8 text-purple-600" />, bg: 'bg-purple-50' },
    { title: 'Active Visitors', value: stats.activeVisitors, icon: <TrendingUp className="w-8 h-8 text-orange-600" />, bg: 'bg-orange-50' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h1 className="text-5xl font-black text-slate-950 tracking-tighter uppercase leading-none mb-4">Store Command</h1>
          <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px]">Administrative Access Level • Samadhan Shoes Mart</p>
        </div>
        <div className="flex space-x-4">
          <Link to="/admin/product/new" className="bg-slate-950 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 transition-all flex items-center shadow-xl shadow-slate-200">
            <PlusCircle className="w-4 h-4 mr-2" /> Add Product
          </Link>
          <Link to="/admin/orders" className="bg-white text-slate-950 px-8 py-4 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all flex items-center font-black uppercase tracking-widest text-[10px] shadow-sm">
            <Truck className="w-4 h-4 mr-2" /> All Shipments
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {statCards.map((card, index) => (
              <div key={index} className={`p-8 rounded-[2.5rem] border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:-translate-y-2 duration-500 bg-white`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{card.title}</p>
                    <h3 className="text-3xl font-black text-slate-950 tracking-tighter">{card.value}</h3>
                  </div>
                  <div className={`p-4 rounded-2xl shadow-sm ${card.bg}`}>
                    {card.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm">
               <h3 className="text-2xl font-black text-slate-950 mb-8 tracking-tighter uppercase flex items-center gap-4">
                  <Package className="w-8 h-8 text-blue-600" /> Catalog Control
               </h3>
               <div className="space-y-6">
                  <p className="text-slate-500 font-medium leading-relaxed italic uppercase text-[11px] tracking-widest">
                    Manage elite inventory, adjust valuations, and introduce new masterworks to the vault.
                  </p>
                  <Link to="/admin/products" className="inline-flex items-center text-blue-600 font-black uppercase tracking-widest text-[10px] hover:gap-4 transition-all">
                     Open Product Matrix <List className="ml-2 w-4 h-4" />
                  </Link>
               </div>
            </div>

            <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm">
               <h3 className="text-2xl font-black text-slate-950 mb-8 tracking-tighter uppercase flex items-center gap-4">
                  <ShoppingBag className="w-8 h-8 text-emerald-500" /> Logistics Hub
               </h3>
               <div className="space-y-6">
                  <p className="text-slate-500 font-medium leading-relaxed italic uppercase text-[11px] tracking-widest">
                    Monitor user orders, synchronize delivery vectors, and finalize transaction records.
                  </p>
                  <Link to="/admin/orders" className="inline-flex items-center text-blue-600 font-black uppercase tracking-widest text-[10px] hover:gap-4 transition-all">
                     Launch Order Stream <List className="ml-2 w-4 h-4" />
                  </Link>
               </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
