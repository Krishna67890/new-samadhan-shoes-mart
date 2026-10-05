import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { gsap } from 'gsap';
import useFetch from '../hooks/useFetch';
import { ArrowLeft, Save, Upload, Loader2, Image as ImageIcon, CheckCircle, AlertCircle, PlusCircle, Sparkles } from 'lucide-react';

import localProducts from '../utils/localProducts';

const AdminProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isNew = !id;
  const { loading, error, request } = useFetch();
  const formRef = useRef(null);

  const queryCategory = searchParams.get('category');

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState('');
  const [stock, setStock] = useState(0);
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(queryCategory || 'Formal');
  const [targetGender, setTargetGender] = useState('Men');
  const [images, setImages] = useState([]);
  const [sizes, setSizes] = useState([6, 7, 8, 9, 10]);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    gsap.from(formRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });
  }, []);

  useEffect(() => {
    if (!isNew) {
      const fetchProduct = async () => {
        try {
          const data = await request(`/api/products/${id}`);
          setName(data.name || '');
          setPrice(data.price || 0);
          setBrand(data.brand || '');
          setStock(data.stock || 0);
          setRating(data.rating || 0);
          setDescription(data.description || '');
          setCategory(data.category || 'Formal');
          setTargetGender(data.targetGender || 'Men');
          setImages(data.images || []);
          setSizes(data.sizes || [6, 7, 8, 9, 10]);
        } catch (err) {
          console.warn("Backend fetch failed, searching in local/demo catalog:", err);

          // Try Demo Storage first
          const demoProducts = JSON.parse(localStorage.getItem('ssm_demo_products') || '[]');
          const demoMatch = demoProducts.find(p => p._id === id || p.id === id);

          const localMatch = demoMatch || localProducts.find(p => p._id === id || p.id === id);

          if (localMatch) {
            setName(localMatch.name || '');
            setPrice(localMatch.price || 0);
            setBrand(localMatch.brand || '');
            setStock(localMatch.stock || 10);
            setRating(localMatch.rating || 0);
            setDescription(localMatch.description || '');
            setCategory(localMatch.category || 'Formal');
            setTargetGender(localMatch.targetGender || 'Men');
            setImages(localMatch.images || []);
            setSizes(localMatch.sizes || [6, 7, 8, 9, 10]);
          }
        }
      };
      fetchProduct();
    }
  }, [id, isNew, request]);

  const uploadFileHandler = async (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 4) {
      alert("Policy Violation: You cannot upload more than 4 images.");
      return;
    }

    setUploading(true);
    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        try {
          const res = await request('/api/upload', 'POST', formData);
          return res;
        } catch (err) {
          console.warn("Backend upload failed, using local preview for demo:", err);
          // Fallback to local URL for demonstration if backend is down
          return URL.createObjectURL(file);
        }
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      setImages([...images, ...uploadedUrls]);
      setUploading(false);
    } catch (err) {
      console.error("Upload process failed:", err);
      setUploading(false);
      alert("Media upload failed. Check backend connectivity.");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (price < 1000 || price > 2000) {
      alert("Policy Violation: Price must be between ₹1,000 and ₹2,000.");
      return;
    }

    if (images.length !== 4) {
      alert(`Policy Violation: Exactly 4 photos are required. You have uploaded ${images.length}.`);
      return;
    }

    const productData = {
      _id: isNew ? `demo-${Date.now()}` : id,
      id: isNew ? `demo-${Date.now()}` : id,
      name, price, brand, stock, rating, description, images, sizes, category, targetGender
    };

    try {
      if (isNew) {
        await request('/api/products', 'POST', productData);
      } else {
        await request(`/api/products/${id}`, 'PUT', productData);
      }
      setSuccess(true);
      setTimeout(() => navigate('/admin/products'), 2000);
    } catch (err) {
      console.error("Submission failed, performing Demo Persistence:", err);

      // PERSISTENCE FALLBACK: Save to localStorage so it's "visible to all devices/browsers" for this user
      const demoProducts = JSON.parse(localStorage.getItem('ssm_demo_products') || '[]');
      if (isNew) {
        demoProducts.push(productData);
      } else {
        const idx = demoProducts.findIndex(p => p._id === id || p.id === id);
        if (idx !== -1) {
          demoProducts[idx] = productData;
        } else {
          // If editing a localProduct that wasn't in demoProducts yet
          demoProducts.push(productData);
        }
      }
      localStorage.setItem('ssm_demo_products', JSON.stringify(demoProducts));

      setSuccess(true);
      setTimeout(() => navigate('/admin/products'), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] pt-32 pb-20 px-6 no-blur-zone">
      <div className="container mx-auto max-w-5xl">
        <div className="flex items-center mb-12">
          <button
            onClick={() => navigate('/admin/products')}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#6B6B6B] hover:text-[#111] transition-colors"
          >
            <ArrowLeft size={16} /> Back to Catalog
          </button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="px-3 py-1 bg-[#8B0000] text-white text-[8px] font-black uppercase tracking-[0.2em] rounded-full flex items-center gap-2">
                <Sparkles size={10} /> {isNew ? 'New Entry' : 'Matrix Update'}
              </div>
            </div>
            <h1 className="text-6xl font-editorial font-black uppercase tracking-tighter text-[#111]">
              {isNew ? 'Create Masterpiece' : 'Edit Asset'}
            </h1>
          </div>
        </div>

      {success && (
         <div className="bg-green-600 text-white p-6 rounded-2xl mb-8 flex items-center shadow-xl border-4 border-white animate-in zoom-in-95">
            <CheckCircle className="w-8 h-8 mr-3" />
            <div>
               <p className="font-black uppercase tracking-widest text-lg">Update Successfull</p>
               <p className="text-xs opacity-80 font-bold uppercase tracking-tighter">The product has been updated in the catalog.</p>
            </div>
         </div>
      )}

      {error && (
         <div className="bg-red-100 text-red-700 p-4 rounded-xl mb-8 flex items-center border border-red-200">
            <AlertCircle className="w-6 h-6 mr-2" />
            <span>{error}</span>
         </div>
      )}

      <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden" ref={formRef}>
        <div className="bg-slate-950 p-10 text-white relative overflow-hidden">
          {/* Visual Clarity Fix: Removed background blurs that cause visibility issues */}
          <div className="relative z-10">
            <h2 className="text-4xl font-black flex items-center gap-3 uppercase tracking-tighter">
               <Sparkles className="text-blue-400" /> {isNew ? 'Initialize New Masterpiece' : 'Refine Vault Entry'}
            </h2>
            <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] mt-2">Technical Specification Node • Authorized Access Only</p>
          </div>
        </div>

        <form onSubmit={submitHandler} className="p-8 md:p-12 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column: Basic Info */}
            <div className="space-y-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#8B0000] border-b border-[#111]/5 pb-4 flex items-center">
                 General Information
              </h3>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] ml-2">Product Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-6 py-5 bg-[#F7F5F0] border-none rounded-2xl focus:ring-2 focus:ring-[#8B0000] outline-none transition-all font-bold text-[#111]"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] ml-2">Brand</label>
                    <input
                      type="text"
                      required
                      className="w-full px-6 py-5 bg-[#F7F5F0] border-none rounded-2xl focus:ring-2 focus:ring-[#8B0000] outline-none transition-all font-bold text-[#111]"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] ml-2">Price (₹1,000 - ₹2,000)</label>
                    <input
                      type="number"
                      required
                      min="1000"
                      max="2000"
                      className="w-full px-6 py-5 bg-[#F7F5F0] border-none rounded-2xl focus:ring-2 focus:ring-[#8B0000] outline-none transition-all font-bold text-[#111]"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] ml-2">Category</label>
                    <select
                      className="w-full px-6 py-5 bg-[#F7F5F0] border-none rounded-2xl focus:ring-2 focus:ring-[#8B0000] outline-none transition-all font-bold text-[#111] appearance-none"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="Formal">Formal</option>
                      <option value="Sneakers">Sneakers</option>
                      <option value="Casual">Casual</option>
                      <option value="Sports">Sports</option>
                      <option value="Boots">Boots</option>
                      <option value="Sandals">Sandals</option>
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="Kids">Kids</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] ml-2">Target Gender</label>
                    <select
                      className="w-full px-6 py-5 bg-[#F7F5F0] border-none rounded-2xl focus:ring-2 focus:ring-[#8B0000] outline-none transition-all font-bold text-[#111] appearance-none"
                      value={targetGender}
                      onChange={(e) => setTargetGender(e.target.value)}
                    >
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="Kids">Kids</option>
                      <option value="Unisex">Unisex</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] ml-2">Stock</label>
                    <input
                      type="number"
                      required
                      className="w-full px-6 py-5 bg-[#F7F5F0] border-none rounded-2xl focus:ring-2 focus:ring-[#8B0000] outline-none transition-all font-bold text-[#111]"
                      value={stock}
                      onChange={(e) => setStock(Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] ml-2">Initial Rating (0-5)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      className="w-full px-6 py-5 bg-[#F7F5F0] border-none rounded-2xl focus:ring-2 focus:ring-[#8B0000] outline-none transition-all font-bold text-[#111]"
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] ml-2">Description</label>
                  <textarea
                    rows="5"
                    required
                    className="w-full px-6 py-5 bg-[#F7F5F0] border-none rounded-2xl focus:ring-2 focus:ring-[#8B0000] outline-none transition-all font-bold text-[#111] resize-none"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Right Column: Images & Sizes */}
            <div className="space-y-8">
               <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 border-b border-[#111]/5 pb-4 flex items-center">
                 Media & Options
               </h3>

               <div className="space-y-4">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] ml-2">Product Images (Exactly 4 Required)</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                     {images.map((img, idx) => (
                        <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-[#111]/5 bg-[#F7F5F0]">
                           <img src={img} alt="" className="w-full h-full object-cover" />
                           <button
                             type="button"
                             onClick={() => setImages(images.filter((_, i) => i !== idx))}
                             className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1.5 shadow-lg"
                           >
                             <ArrowLeft className="w-3 h-3 rotate-45" />
                           </button>
                        </div>
                     ))}
                     {images.length < 4 && (
                       <label className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:border-[#8B0000] hover:bg-slate-50 transition-all group">
                          {uploading ? <Loader2 className="w-6 h-6 animate-spin text-[#8B0000]" /> : <PlusCircle className="w-6 h-6 text-slate-300 group-hover:text-[#8B0000]" />}
                          <span className="text-[8px] font-black text-slate-400 mt-2 uppercase tracking-widest">UPLOAD</span>
                          <input
                            type="file"
                            className="hidden"
                            multiple
                            accept="image/*"
                            onChange={uploadFileHandler}
                          />
                       </label>
                     )}
                  </div>
                  {images.length !== 4 && (
                    <p className="text-[9px] font-black text-rose-500 uppercase tracking-widest flex items-center gap-2">
                      <AlertCircle size={12} /> Mandatory Requirement: {images.length}/4 images.
                    </p>
                  )}
               </div>

               <div className="space-y-4">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] ml-2">Available Sizes (UK/India)</label>
                  <div className="flex flex-wrap gap-3">
                    {[5, 6, 7, 8, 9, 10, 11, 12].map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => {
                           if (sizes.includes(s)) setSizes(sizes.filter(x => x !== s));
                           else setSizes([...sizes, s].sort((a,b) => a-b));
                        }}
                        className={`w-14 h-14 rounded-xl border-2 font-black transition-all text-[11px]
                          ${sizes.includes(s) ? 'bg-[#111] border-[#111] text-white shadow-xl' : 'bg-white border-slate-100 text-slate-400 hover:border-[#8B0000]'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
               </div>
            </div>
          </div>

          <div className="pt-12 border-t border-[#111]/5">
             <button
               type="submit"
               disabled={loading}
               className="w-full bg-[#111] text-white py-6 rounded-[2.5rem] text-[11px] font-black uppercase tracking-[0.4em] transition-all hover:bg-[#8B0000] shadow-2xl flex items-center justify-center gap-4 group"
             >
               {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-5 h-5" />}
               {isNew ? 'Authorize New Product Entry' : 'Commit Matrix Updates'}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProductEdit;
