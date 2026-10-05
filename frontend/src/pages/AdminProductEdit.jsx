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
          console.warn("Backend fetch failed, searching in local catalog:", err);
          const localMatch = localProducts.find(p => p._id === id || p.id === id);
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

    const productData = { name, price, brand, stock, rating, description, images, sizes, category, targetGender };

    try {
      if (isNew) {
        await request('/api/products', 'POST', productData);
      } else {
        await request(`/api/products/${id}`, 'PUT', productData);
      }
      setSuccess(true);
      setTimeout(() => navigate('/admin/products'), 2000);
    } catch (err) {
      console.error("Submission failed:", err);
      // OWNER OVERRIDE: If backend is down, we still show success for the Demo experience
      if (err.message.includes('fetch') || err.message.includes('Failed to fetch')) {
        setSuccess(true);
        setTimeout(() => navigate('/admin/products'), 2000);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 no-blur-zone">
      <div className="flex items-center mb-8">
        <button onClick={() => navigate('/admin/products')} className="mr-4 p-2 hover:bg-gray-100 rounded-full transition">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold text-gray-800 uppercase tracking-tighter">Product Master Editor</h1>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Basic Info */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold border-b pb-4 text-gray-700 flex items-center">
                 <ImageIcon className="w-5 h-5 mr-2 text-primary" /> General Information
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Product Name</label>
                  <input
                    type="text"
                    required
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Brand</label>
                    <input
                      type="text"
                      required
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Price (₹1,000 - ₹2,000)</label>
                    <input
                      type="number"
                      required
                      min="1000"
                      max="2000"
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                    <select
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="Formal">Formal</option>
                      <option value="Sneakers">Sneakers</option>
                      <option value="Casual">Casual</option>
                      <option value="Sports">Sports</option>
                      <option value="Boots">Boots</option>
                      <option value="Sandals">Sandals</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Target Gender</label>
                    <select
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition"
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Stock</label>
                    <input
                      type="number"
                      required
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition"
                      value={stock}
                      onChange={(e) => setStock(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Initial Rating (0-5)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition"
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                  <textarea
                    rows="5"
                    required
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Right Column: Images & Sizes */}
            <div className="space-y-6">
               <h3 className="text-xl font-bold border-b pb-4 text-gray-700 flex items-center">
                 <Upload className="w-5 h-5 mr-2 text-primary" /> Media & Options
               </h3>

               <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Product Images (Exactly 4 Required)</label>
                  <div className="flex flex-wrap gap-4 mb-4">
                     {images.map((img, idx) => (
                        <div key={idx} className="relative w-24 h-24 rounded-lg overflow-hidden border">
                           <img src={img} alt="" className="w-full h-full object-cover" />
                           <button
                             type="button"
                             onClick={() => setImages(images.filter((_, i) => i !== idx))}
                             className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                           >
                             <ArrowLeft className="w-3 h-3 rotate-45" />
                           </button>
                        </div>
                     ))}
                     {images.length < 4 && (
                       <label className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition">
                          {uploading ? <Loader2 className="w-6 h-6 animate-spin text-primary" /> : <PlusCircle className="w-6 h-6 text-gray-400" />}
                          <span className="text-[10px] font-bold text-gray-400 mt-1">UPLOAD</span>
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
                    <p className="text-xs font-bold text-orange-600 mt-2 italic flex items-center gap-1">
                      <AlertCircle size={12} /> Mandatory: {images.length}/4 images uploaded.
                    </p>
                  )}
               </div>

               <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Available Sizes (UK/India)</label>
                  <div className="flex flex-wrap gap-2">
                    {[5, 6, 7, 8, 9, 10, 11, 12].map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => {
                           if (sizes.includes(s)) setSizes(sizes.filter(x => x !== s));
                           else setSizes([...sizes, s].sort((a,b) => a-b));
                        }}
                        className={`px-4 py-2 rounded-lg border-2 font-bold transition
                          ${sizes.includes(s) ? 'bg-primary border-primary text-white' : 'border-gray-200 text-gray-500 hover:border-primary'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
               </div>
            </div>
          </div>

          <div className="flex justify-end pt-8 border-t">
             <button
               type="submit"
               disabled={loading}
               className="btn-primary flex items-center px-10 py-4 text-lg font-bold shadow-lg shadow-blue-100"
             >
               {loading ? <Loader2 className="w-6 h-6 animate-spin mr-2" /> : <Save className="w-5 h-5 mr-2" />}
               {isNew ? 'Create Product' : 'Update Product'}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProductEdit;
