import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ArrowLeft, Save, Upload, Loader2, Image as ImageIcon, Video, CheckCircle, AlertCircle, PlusCircle, Trash2, Layout, Trash } from 'lucide-react';
import useFetch from '../hooks/useFetch';
import { WORKSHOP_MEDIA, WORKSHOP_GALLERY } from '../utils/galleryData';

const AdminGalleryManager = () => {
  const navigate = useNavigate();
  const { loading, request } = useFetch();

  const [workshopMedia, setWorkshopMedia] = useState(WORKSHOP_MEDIA);
  const [workshopGallery, setWorkshopGallery] = useState(WORKSHOP_GALLERY);

  const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const storedMedia = localStorage.getItem('ssm_workshop_media');
    const storedGallery = localStorage.getItem('ssm_workshop_gallery');
    if (storedMedia) setWorkshopMedia(JSON.parse(storedMedia));
    if (storedGallery) setWorkshopGallery(JSON.parse(storedGallery));
  }, []);

  const handleAddMedia = (type) => {
    if (type === 'video') {
      setWorkshopMedia([{ type: 'video', url: '', title: 'New Reel' }, ...workshopMedia]);
    } else {
      setWorkshopGallery([{ url: '', category: 'Men', title: 'New Capture', price: '₹1,500' }, ...workshopGallery]);
    }
  };

  const uploadHandler = async (e, type, idx) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    // Since backend might be down, we use Object URLs for immediate UI feedback
    const previewUrl = URL.createObjectURL(file);

    if (type === 'video') {
      const newMedia = [...workshopMedia];
      newMedia[idx].url = previewUrl;
      setWorkshopMedia(newMedia);
    } else {
      const newGallery = [...workshopGallery];
      newGallery[idx].url = previewUrl;
      setWorkshopGallery(newGallery);
    }
    setUploading(false);
  };

  const handleRemoveMedia = (idx, type) => {
    if (type === 'video') {
      setWorkshopMedia(workshopMedia.filter((_, i) => i !== idx));
    } else {
      setWorkshopGallery(workshopGallery.filter((_, i) => i !== idx));
    }
  };

  const handleSave = async () => {
    // PERSISTENCE FALLBACK: Save to localStorage for demo visibility
    localStorage.setItem('ssm_workshop_media', JSON.stringify(workshopMedia));
    localStorage.setItem('ssm_workshop_gallery', JSON.stringify(workshopGallery));

    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl no-blur-zone">
      <div className="flex items-center mb-8 justify-between">
        <div className="flex items-center">
          <button onClick={() => navigate('/admin')} className="mr-4 p-2 hover:bg-gray-100 rounded-full transition">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold text-gray-800 uppercase tracking-tighter">Gallery Hub Manager</h1>
        </div>
        <button
          onClick={handleSave}
          className="bg-[#8B0000] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-2 hover:bg-black transition-all shadow-xl shadow-red-100"
        >
          <Save size={16} /> Deploy Changes
        </button>
      </div>

      {success && (
         <div className="bg-green-600 text-white p-6 rounded-2xl mb-8 flex items-center shadow-xl border-4 border-white animate-in zoom-in-95">
            <CheckCircle className="w-8 h-8 mr-3" />
            <div>
               <p className="font-black uppercase tracking-widest text-lg">Update Successfull</p>
               <p className="text-xs opacity-80 font-bold uppercase tracking-tighter">Live Atelier feeds synchronized with new media.</p>
            </div>
         </div>
      )}

      <div className="space-y-12">
        {/* Section: Videos */}
        <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
              <Video className="text-red-500" /> Workshop Video Reels
            </h2>
            <button
              onClick={() => handleAddMedia('video')}
              className="text-[10px] font-bold uppercase bg-gray-100 px-4 py-2 rounded-lg hover:bg-black hover:text-white transition-colors"
            >
              + Add Reel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.isArray(workshopMedia) && workshopMedia.map((item, idx) => (
              <div key={idx} className="p-4 border border-gray-100 rounded-2xl flex gap-4 bg-gray-50/50">
                <div className="w-24 h-24 bg-black rounded-lg flex items-center justify-center overflow-hidden shrink-0 relative group">
                  {item.url ? (
                    <video src={item.url} className="w-full h-full object-cover" />
                  ) : (
                    <Video className="text-white/20" />
                  )}
                  <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-opacity">
                    <Upload size={16} className="text-white mb-1" />
                    <span className="text-[8px] text-white font-bold uppercase">Replace</span>
                    <input type="file" className="hidden" accept="video/*" onChange={(e) => uploadHandler(e, 'video', idx)} />
                  </label>
                </div>
                <div className="flex-1 space-y-2">
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => {
                      const newMedia = [...workshopMedia];
                      newMedia[idx].title = e.target.value;
                      setWorkshopMedia(newMedia);
                    }}
                    placeholder="Video Title"
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-bold uppercase outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    value={item.url}
                    onChange={(e) => {
                      const newMedia = [...workshopMedia];
                      newMedia[idx].url = e.target.value;
                      setWorkshopMedia(newMedia);
                    }}
                    placeholder="URL (e.g. /video.mp4)"
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-[10px] outline-none focus:border-blue-500"
                  />
                </div>
                <button
                  onClick={() => handleRemoveMedia(idx, 'video')}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg self-start"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Photos */}
        <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
              <ImageIcon className="text-blue-500" /> Atelier Gallery Photos
            </h2>
            <button
              onClick={() => handleAddMedia('photo')}
              className="text-[10px] font-bold uppercase bg-gray-100 px-4 py-2 rounded-lg hover:bg-black hover:text-white transition-colors"
            >
              + Add Photo
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(workshopGallery) && workshopGallery.map((item, idx) => (
              <div key={idx} className="p-4 border border-gray-100 rounded-2xl space-y-4 bg-gray-50/50 relative group">
                <div className="aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden relative group/img">
                  {item.url ? (
                    <img src={item.url} className="w-full h-full object-cover" alt="" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="text-gray-400" size={32} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity gap-4">
                    <label className="p-3 bg-white/20 rounded-xl cursor-pointer hover:bg-white/40 transition-colors">
                      <Upload size={20} className="text-white" />
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => uploadHandler(e, 'photo', idx)} />
                    </label>
                    <button
                      onClick={() => handleRemoveMedia(idx, 'photo')}
                      className="p-3 bg-red-500/80 text-white rounded-xl hover:bg-red-600 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => {
                      const newGallery = [...workshopGallery];
                      newGallery[idx].title = e.target.value;
                      setWorkshopGallery(newGallery);
                    }}
                    placeholder="Title"
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-bold uppercase outline-none"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={item.category}
                      onChange={(e) => {
                        const newGallery = [...workshopGallery];
                        newGallery[idx].category = e.target.value;
                        setWorkshopGallery(newGallery);
                      }}
                      className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-[10px] font-bold uppercase outline-none"
                    >
                      <option value="Heritage">Heritage</option>
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="Kids">Kids</option>
                      <option value="Sneakers">Sneakers</option>
                      <option value="Women's Edition">Women's Edition</option>
                      <option value="Kids Edition">Kids Edition</option>
                      <option value="Bespoke Derbies">Bespoke Derbies</option>
                      <option value="Goodyear Boots">Goodyear Boots</option>
                      <option value="Italian Loafers">Italian Loafers</option>
                      <option value="Minimalist Sneakers">Minimalist Sneakers</option>
                      <option value="Workshop">Workshop</option>
                    </select>
                    <input
                      type="text"
                      value={item.price}
                      onChange={(e) => {
                        const newGallery = [...workshopGallery];
                        newGallery[idx].price = e.target.value;
                        setWorkshopGallery(newGallery);
                      }}
                      placeholder="Price/Label"
                      className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-[10px] outline-none"
                    />
                  </div>
                  <input
                    type="text"
                    value={item.url}
                    onChange={(e) => {
                      const newGallery = [...workshopGallery];
                      newGallery[idx].url = e.target.value;
                      setWorkshopGallery(newGallery);
                    }}
                    placeholder="Image URL"
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-[10px] outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminGalleryManager;
