import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import useFetch from '../hooks/useFetch';
import {
  Star,
  ChevronLeft,
  ShoppingBag,
  MessageCircle,
  Truck,
  ShieldCheck,
  RefreshCw,
  Info,
  Check
} from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(AuthContext);
  const { addToCart } = useCart();
  const { loading, error, request } = useFetch();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await request(`/api/products/${id}`);
        setProduct(data);
        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0]);
        }

        // Entrance Animation
        if (document.querySelector('.product-reveal')) {
          gsap.from('.product-reveal', {
             y: 30,
             opacity: 0,
             duration: 1,
             stagger: 0.1,
             ease: 'power3.out'
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [id, request]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Force guest to identity page if not verified
    if (user?.isGuest && !user?.identityVerified) {
      navigate('/identity');
      return;
    }

    if (!selectedSize) {
      alert("Please select a size first!");
      return;
    }

    addToCart(product, quantity, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWhatsAppOrder = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (user?.role !== 'admin' && !user?.identityVerified) {
      navigate('/identity');
      return;
    }

    const total = product.price * quantity;

    // --- LOGGING TO ORDER HISTORY ---
    try {
      await request('/api/orders', 'POST', {
        orderItems: [{
          name: product.name,
          qty: quantity,
          image: product.images[0],
          price: product.price,
          product: product._id,
          size: selectedSize
        }],
        shippingAddress: {
          address: user.address,
          city: user.city,
          postalCode: user.pincode,
          country: 'India'
        },
        paymentMethod: 'WhatsApp (Pending)',
        totalPrice: total,
        phone: user.phone
      });
    } catch (err) {
      console.error("Failed to log WhatsApp order to history:", err);
    }

    const text = `Hello Samadhan Shoes Mart! 👟\n\nI want to buy the following elite pair:\n\n*Product:* ${product.name}\n*Quantity:* ${quantity}\n*Size:* ${selectedSize}\n*Price:* ₹${product.price.toLocaleString()}\n*Total Amount:* ₹${total.toLocaleString()}\n\n*--- CUSTOMER IDENTITY ---*\n*Name:* ${user.name}\n*Persona:* ${user.gender === 'boy' ? 'Collector Boy' : 'Collector Girl'}\n*Contact:* ${user.phone}\n*Address:* ${user.address}\n*City:* ${user.city}\n*Pincode:* ${user.pincode}\n\n*--- SYSTEM METADATA ---*\n*Developer ID:* KRISHNA-DEV-001\n*Order Ref:* #${Math.floor(100000 + Math.random() * 900000)}\n\nPlease confirm payment details and availability.`;

    const whatsappUrl = `https://wa.me/917058564508?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');

    // Secondary line for Developer (CC)
    const devText = `*DEV-LOG:* Order Ref #${Math.floor(100000 + Math.random() * 900000)} initiated by ${user.name} (${user.phone}).`;
    console.log("Developer Notification Sync:", devText);
    // In a real dual-number scenario, you might trigger a second window or a backend webhook.
    // For this implementation, we ensure the Developer ID is in the main message for the shopkeeper to see.
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950">
       <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-8"></div>
       <p className="text-slate-400 font-black tracking-[0.5em] uppercase text-[10px]">Accessing Vault Data...</p>
    </div>
  );

  if (!product) return null;

  return (
    <div className="bg-white min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-7xl">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-4 text-slate-400 hover:text-slate-950 transition-colors font-black uppercase text-[10px] tracking-widest mb-12 group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-2 transition-transform" /> Back to Catalog
        </button>

        <div className="grid lg:grid-cols-2 gap-20 items-start">

          {/* LEFT: VISUALS */}
          <div className="space-y-6 product-reveal">
             <div className="aspect-square bg-slate-50 rounded-[4rem] overflow-hidden border border-slate-100 shadow-sm relative group">
                <img
                   src={product.images[activeImage]}
                   alt={product.name}
                   className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute top-10 left-10">
                   <span className="bg-blue-600 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl">
                      {product.brand}
                   </span>
                </div>
             </div>

             <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, i) => (
                   <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`aspect-square rounded-3xl overflow-hidden border-2 transition-all ${activeImage === i ? 'border-blue-600 shadow-xl' : 'border-transparent opacity-50 hover:opacity-100'}`}
                   >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                   </button>
                ))}
             </div>
          </div>

          {/* RIGHT: INFO & ACTION */}
          <div className="space-y-10 product-reveal">
             <div>
                <div className="flex items-center gap-1 mb-6">
                   {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className={`${i < product.rating ? 'fill-blue-600 text-blue-600' : 'text-slate-200'}`} />
                   ))}
                   <span className="text-slate-400 font-bold text-xs ml-4 uppercase tracking-widest">({product.rating}.0 Verified)</span>
                </div>
                <h1 className="text-6xl font-black text-slate-950 mb-6 tracking-tighter uppercase leading-none">{product.name}</h1>
                <p className="text-slate-500 font-medium leading-relaxed text-lg italic">"{product.description}"</p>
             </div>

             <div className="flex flex-col gap-6 border-y border-slate-50 py-10">
                <div className="flex flex-wrap items-end gap-10">
                   <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Elite Valuation</span>
                      <span className="text-5xl font-black text-slate-950 tracking-tighter">₹{(product.price * quantity).toLocaleString()}</span>
                   </div>
                   <div className="flex flex-col">
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Quantity</span>
                       <div className="flex items-center border-2 border-slate-100 rounded-2xl overflow-hidden bg-white">
                          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-5 py-3 hover:bg-slate-50 font-black text-xl">-</button>
                          <span className="px-5 py-3 font-black text-xl border-x-2 border-slate-100 min-w-[60px] text-center">{quantity}</span>
                          <button onClick={() => setQuantity(quantity + 1)} className="px-5 py-3 hover:bg-slate-50 font-black text-xl">+</button>
                       </div>
                   </div>
                </div>

                <div className="flex flex-col gap-4">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Size</span>
                   <div className="flex flex-wrap gap-3">
                      {product.sizes.map((size) => (
                         <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`w-14 h-14 rounded-2xl font-black text-sm border-2 transition-all ${selectedSize === size ? 'bg-slate-950 text-white border-slate-950 shadow-xl scale-110' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'}`}
                         >
                            {size}
                         </button>
                      ))}
                   </div>
                </div>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={handleAddToCart}
                  className={`py-6 rounded-3xl text-xs font-black uppercase tracking-[0.2em] transition-all shadow-2xl flex items-center justify-center gap-4 group ${added ? 'bg-emerald-500 text-white' : 'bg-slate-950 text-white hover:bg-blue-600 shadow-slate-200'}`}
                >
                   {added ? <Check size={20} /> : <ShoppingBag size={20} />} {added ? 'Collected' : 'Add to Collection'}
                </button>
                <button
                  onClick={handleWhatsAppOrder}
                  className="bg-emerald-500 text-white py-6 rounded-3xl text-xs font-black uppercase tracking-[0.2em] hover:bg-emerald-600 transition-all shadow-2xl shadow-emerald-200 flex items-center justify-center gap-4 group"
                >
                   <MessageCircle size={20} /> Pay via WhatsApp
                </button>
             </div>

             {/* STEP-BY-STEP WHATSAPP GUIDE */}
             <div className="bg-blue-50/50 rounded-[3rem] p-10 border border-blue-100/50 relative overflow-hidden">
                <div className="absolute top-10 right-10 text-blue-200 opacity-20">
                   <Info size={100} />
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-8">Elite WhatsApp Flow</h4>
                <div className="space-y-6 relative z-10">
                   <div className="flex gap-4 items-center">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-black text-xs">1</div>
                      <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Click the "Pay via WhatsApp" button above.</p>
                   </div>
                   <div className="flex gap-4 items-center">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-black text-xs">2</div>
                      <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Send the auto-generated order message.</p>
                   </div>
                   <div className="flex gap-4 items-center">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-black text-xs">3</div>
                      <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Our curator will confirm stock & provide UPI QR.</p>
                   </div>
                   <div className="flex gap-4 items-center">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-black text-xs">4</div>
                      <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Confirm payment and receive your tracking ID.</p>
                   </div>
                </div>
             </div>

             {/* TRUST BADGES */}
             <div className="grid grid-cols-3 gap-8 pt-10">
                <div className="flex flex-col items-center text-center gap-3">
                   <ShieldCheck className="text-slate-300" size={24} />
                   <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Authentic Seal</span>
                </div>
                <div className="flex flex-col items-center text-center gap-3">
                   <Truck className="text-slate-300" size={24} />
                   <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Lightning Ship</span>
                </div>
                <div className="flex flex-col items-center text-center gap-3">
                   <RefreshCw className="text-slate-300" size={24} />
                   <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Easy Exchange</span>
                </div>
             </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
