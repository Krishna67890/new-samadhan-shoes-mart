import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles, X, ChevronRight, Eye, ShieldCheck,
  Award, ArrowRight, Layers, ZoomIn, Check, MessageSquare
} from 'lucide-react';

const GALLERY_ITEMS = [
  {
    id: 'g1',
    title: 'Imperial Wingtip Derby',
    category: 'Bespoke Derbies',
    image: '/New-Samadhan-Shoe-Mart/IMG-20260928-WA0006.jpg',
    thumbnail: '/New-Samadhan-Shoe-Mart/IMG-20260928-WA0006.jpg',
    leather: 'Tuscan Full-Grain Calfskin',
    construction: '360° Goodyear Welted',
    sole: 'Oak-Bark Tanned Leather Sole',
    hours: '42 Handcraft Hours',
    price: '₹5,499',
    description: 'Precision brogued with intricate medallion toe perforations. Hand-dyed in Nashik with natural walnut stain and carnauba wax polish.',
  },
  {
    id: 'g2',
    title: 'Monarch Cap-Toe Oxford',
    category: 'Bespoke Derbies',
    image: '/New-Samadhan-Shoe-Mart/IMG-20260928-WA0010.jpg',
    thumbnail: '/New-Samadhan-Shoe-Mart/IMG-20260928-WA0010.jpg',
    leather: 'French Boxcalf Navy Patina',
    construction: 'Hand-Welted Closed Channel',
    sole: 'Beveled Waist Leather Sole',
    hours: '38 Handcraft Hours',
    price: '₹5,999',
    description: 'Classic formal elegance. Closed lacing system with 6 brass eyelets, cushioned orthopedic footbed, and mirror gloss toe burnish.',
  },
  {
    id: 'g3',
    title: 'Sahyadri Expedition Boot',
    category: 'Goodyear Boots',
    image: '/New-Samadhan-Shoe-Mart/IMG-20260928-WA0025.jpg',
    thumbnail: '/New-Samadhan-Shoe-Mart/IMG-20260928-WA0025.jpg',
    leather: 'Oiled Pull-Up Bison Leather',
    construction: 'Storm Welted Waterproof',
    sole: 'Vibram Commando Lug Sole',
    hours: '48 Handcraft Hours',
    price: '₹6,499',
    description: 'Engineered for rugged terrain while preserving refined boardroom lines. Triple-stitched stress zones with gusseted leather tongue.',
  },
  {
    id: 'g4',
    title: 'Venetian Tassel Loafer',
    category: 'Italian Loafers',
    image: '/New-Samadhan-Shoe-Mart/IMG-20260928-WA0040.jpg',
    thumbnail: '/New-Samadhan-Shoe-Mart/IMG-20260928-WA0040.jpg',
    leather: 'Chocolate Suede & Calf Trim',
    construction: 'Blake-Rapid Flexible Stitch',
    sole: 'Half-Rubber Inset Leather',
    hours: '28 Handcraft Hours',
    price: '₹4,499',
    description: 'Unlined forefoot for effortless summer breathability. Hand-knotted leather tassels and reinforced heel counters.',
  },
  {
    id: 'g5',
    title: 'Aero Minimalist Sneaker',
    category: 'Minimalist Sneakers',
    image: '/New-Samadhan-Shoe-Mart/IMG-20260928-WA0050.jpg',
    thumbnail: '/New-Samadhan-Shoe-Mart/IMG-20260928-WA0050.jpg',
    leather: 'Nappa White Glove Leather',
    construction: 'Margom Side-Stitched Cupsole',
    sole: 'Vulcanized Natural Rubber',
    hours: '24 Handcraft Hours',
    price: '₹3,899',
    description: 'Stripped of all logos. 100% full leather lining with zero synthetic foam. Removable memory arch support insole.',
  },
  {
    id: 'g6',
    title: 'Chelsea Noir Classic',
    category: 'Goodyear Boots',
    image: '/New-Samadhan-Shoe-Mart/IMG-20260928-WA0030.jpg',
    thumbnail: '/New-Samadhan-Shoe-Mart/IMG-20260928-WA0030.jpg',
    leather: 'Aniline Black Calfskin',
    construction: 'Goodyear Welt with Cork Bed',
    sole: 'Dainite Studded Rubber',
    hours: '36 Handcraft Hours',
    price: '₹5,899',
    description: 'Clean single-piece vamp cut without side seams. Heavy-duty Italian woven side elastics and pull loops for a sleek silhouette.',
  },
  {
    id: 'g7',
    title: 'The Master Lasting Process',
    category: 'Workshop Action',
    image: '/New-Samadhan-Shoe-Mart/IMG-20260928-WA0100.jpg',
    thumbnail: '/New-Samadhan-Shoe-Mart/IMG-20260928-WA0100.jpg',
    leather: 'Hardwood Hornbeam Lasts',
    construction: 'Hand Pliers & Brass Tack Tension',
    sole: 'Anatomical Sculpting',
    hours: 'Active Atelier Stage',
    price: 'Bespoke Order',
    description: 'Artisan pulling the wet leather upper over the wooden last with lasting pliers, securing tension millimeter by millimeter.',
  },
  {
    id: 'g8',
    title: 'Goodyear Welt Channel Stitching',
    category: 'Workshop Action',
    image: '/New-Samadhan-Shoe-Mart/IMG-20260928-WA0110.jpg',
    thumbnail: '/New-Samadhan-Shoe-Mart/IMG-20260928-WA0110.jpg',
    leather: 'Natural Portuguese Cork Fill',
    construction: 'Chain-Stitch Welt Binding',
    sole: 'Goodyear Machine Calibration',
    hours: 'Active Atelier Stage',
    price: 'Bespoke Order',
    description: 'Lockstitching the welt strip into the curved rib of the insole before packing the bottom cavity with natural thermal cork.',
  },
  {
    id: 'g9',
    title: 'Cognac Penny Loafer',
    category: 'Italian Loafers',
    image: '/New-Samadhan-Shoe-Mart/IMG-20260928-WA0045.jpg',
    thumbnail: '/New-Samadhan-Shoe-Mart/IMG-20260928-WA0045.jpg',
    leather: 'French Cognac Box Calf',
    construction: 'Hand-Sewn Moccasin Apron',
    sole: 'Flex Leather Sole with Rubber Inset',
    hours: '30 Handcraft Hours',
    price: '₹4,799',
    description: 'Features traditional hand-pinched apron stitching. Subtle burnishing along the strap slot and penny saddle.',
  },
  {
    id: 'g10',
    title: 'Milan Velvet Stiletto Heel',
    category: "Women's Edition",
    image: '/New-Samadhan-Shoe-Mart/IMG-20260928-WA0200.jpg',
    thumbnail: '/New-Samadhan-Shoe-Mart/IMG-20260928-WA0200.jpg',
    leather: 'Italian Suede & Rose Gold Accents',
    construction: 'Ergonomic Cushion Stiletto Arch',
    sole: 'Non-Slip Micro-Ribbed Heel Sole',
    hours: '32 Handcraft Hours',
    price: '₹6,499',
    description: 'Elegantly proportioned women’s stiletto with dual-density memory arch support designed for pain-free galas.',
  },
  {
    id: 'g11',
    title: 'Parisian Quilted Ballet Flat',
    category: "Women's Edition",
    image: '/New-Samadhan-Shoe-Mart/IMG-20260928-WA0210.jpg',
    thumbnail: '/New-Samadhan-Shoe-Mart/IMG-20260928-WA0210.jpg',
    leather: 'Full-Grain Tuscan Lambskin',
    construction: 'Hand-Pleated Glove Fit Sacchetto',
    sole: 'Supple Split Vegetable Leather Sole',
    hours: '26 Handcraft Hours',
    price: '₹3,999',
    description: 'Featherweight glove construction that rolls effortlessly with your foot. Finished with a discreet grosgrain bow.',
  },
  {
    id: 'g12',
    title: 'Verona Artisan Chelsea Boot',
    category: "Women's Edition",
    image: '/New-Samadhan-Shoe-Mart/IMG-20260928-WA0220.jpg',
    thumbnail: '/New-Samadhan-Shoe-Mart/IMG-20260928-WA0220.jpg',
    leather: 'Burnished Tuscan Tan Calfskin',
    construction: 'Storm Welted Waterproof Last',
    sole: 'Dainite Anti-Slip Low Profile Rubber',
    hours: '40 Handcraft Hours',
    price: '₹6,899',
    description: 'Women’s equestrian-inspired silhouette with contoured heel grip and breathable organic calf lining.',
  },
  {
    id: 'g13',
    title: 'Nashik Academy School Derby',
    category: 'Kids Edition',
    image: '/New-Samadhan-Shoe-Mart/IMG-20260928-WA0300.jpg',
    thumbnail: '/New-Samadhan-Shoe-Mart/IMG-20260928-WA0300.jpg',
    leather: 'Indestructible Full-Grain Leather',
    construction: 'Heavy-Duty Reinforced Lockstitch',
    sole: 'Shock-Absorbing Natural Rubber',
    hours: '20 Handcraft Hours',
    price: '₹2,199',
    description: 'Engineered to withstand rigorous school playgrounds with double-stitched eyelet stays and scuff guards.',
  },
  {
    id: 'g14',
    title: 'Junior Courier Retro Runner',
    category: 'Kids Edition',
    image: '/New-Samadhan-Shoe-Mart/IMG-20260928-WA0310.jpg',
    thumbnail: '/New-Samadhan-Shoe-Mart/IMG-20260928-WA0310.jpg',
    leather: 'Breathable Leather & Suede Mesh',
    construction: 'Flexible Strobel Contoured Construction',
    sole: 'Non-Marking Natural Gum Rubber',
    hours: '18 Handcraft Hours',
    price: '₹2,499',
    description: 'Contoured natural toe-box allowing growing children toes to spread naturally with zero pinched nerves.',
  },
  {
    id: 'g15',
    title: 'Little Artisan Heritage Oxford',
    category: 'Kids Edition',
    image: '/New-Samadhan-Shoe-Mart/IMG-20260928-WA0320.jpg',
    thumbnail: '/New-Samadhan-Shoe-Mart/IMG-20260928-WA0320.jpg',
    leather: 'Chestnut Smooth Calfskin',
    construction: 'Goodyear Welt Junior Contoured Last',
    sole: 'Soft Leather with Rubber Traction Cap',
    hours: '24 Handcraft Hours',
    price: '₹2,899',
    description: 'A miniature generational heirloom for celebrations and ceremonies, made with genuine cobbler welt technique.',
  },
];

const CATEGORIES = [
  'All',
  "Women's Edition",
  'Kids Edition',
  'Bespoke Derbies',
  'Goodyear Boots',
  'Italian Loafers',
  'Minimalist Sneakers',
  'Workshop Action',
];

const PATINA_STAGES = [
  {
    stage: 'Day 1: Unboxing',
    desc: 'Crisp factory luster, rich uniform pigment, firm structural hold ready to mold to your walking anatomy.',
    characteristics: 'High mirror shine, pristine surface, structured arch',
  },
  {
    stage: 'Year 1: The Mold',
    desc: 'Micro-flex creasing develops harmoniously along foot break lines. Cork footbed conforms 100% to foot shape.',
    characteristics: 'Individual character creases, deeper honey/amber tones, custom arch comfort',
  },
  {
    stage: 'Year 5+: True Vintage Patina',
    desc: 'Full-grain leather absorbs organic oils and conditioning waxes, developing an irreplaceable heirloom luster.',
    characteristics: 'Irreplaceable tonal depth, ultra-supple fit, resoled 1-2 times with full integrity',
  },
];

const GalleryPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <div className="bg-[#F7F5F0] text-[#111111] min-h-screen pt-28 pb-20 font-sans selection:bg-[#8B0000] selection:text-white">

      {/* Hero Section */}
      <section className="px-6 md:px-12 lg:px-24 max-w-[1440px] mx-auto py-12 md:py-16">
        <div className="flex flex-col gap-6 max-w-4xl">
          <div className="inline-flex items-center gap-3">
            <span className="w-8 h-[2px] bg-[#8B0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#8B0000]">
              Visual Atelier Archive · Nashik
            </span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.92]">
            The Curated <br />
            <span className="italic font-light text-[#8B0000]">Gallery of Form.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#6B6B6B] max-w-2xl leading-relaxed">
            Explore our visual archive of custom bespoke commissions, Goodyear welted silhouettes, and candid workshop glimpses captured inside our Nashik atelier.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto py-6 mt-8 border-b border-[#111111]/10 no-scrollbar">
          {CATEGORIES.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${
                activeCategory === cat
                  ? 'bg-[#111111] text-white border-[#111111] shadow-md'
                  : 'bg-white hover:bg-[#111111]/5 text-[#6B6B6B] hover:text-[#111111] border-[#111111]/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Main Gallery Grid */}
      <section className="px-6 md:px-12 lg:px-24 max-w-[1440px] mx-auto py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-[#111111]/10 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#111111]">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => { e.target.src = '/Shoes.png'; }}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#111111] shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    <ZoomIn size={20} />
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-widest border border-white/20">
                    {item.category}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4">
                  <span className="px-3 py-1 rounded-full bg-[#8B0000] text-white text-[10px] font-bold tracking-wider shadow-md">
                    {item.price}
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#8B0000] block mb-1">
                  {item.hours}
                </span>
                <h3 className="font-editorial text-xl font-bold uppercase text-[#111111] group-hover:text-[#8B0000] transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-[#6B6B6B] line-clamp-2 leading-relaxed mb-4">
                  {item.description}
                </p>

                <div className="pt-4 border-t border-[#111111]/5 flex items-center justify-between text-xs font-semibold text-[#111111]">
                  <span className="text-[11px] text-[#6B6B6B] truncate max-w-[200px]">
                    {item.leather}
                  </span>
                  <span className="text-[#8B0000] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider">
                    Inspect <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Patina Aging Over Time Feature */}
      <section className="px-6 md:px-12 lg:px-24 max-w-[1440px] mx-auto py-16">
        <div className="bg-[#111111] text-white rounded-3xl p-8 sm:p-14 border border-white/10 shadow-2xl">
          <div className="max-w-2xl mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#ff4d4d] block mb-2">
              Heirloom Longevity
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-black uppercase tracking-tight">
              The Evolution of Full-Grain Patina
            </h2>
            <p className="text-sm text-white/70 mt-4 leading-relaxed">
              Synthetic shoes degrade and crumble after 6 months. Authentic New Samadhan shoes are born with lifetime integrity — growing richer and more lustrous with every step you take.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PATINA_STAGES.map((st, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-[#ff4d4d] block mb-2">
                    Phase {i + 1}
                  </span>
                  <h3 className="font-editorial text-xl font-bold uppercase text-white mb-3">
                    {st.stage}
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed mb-6">
                    {st.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <span className="text-[9px] uppercase tracking-wider text-white/40 block mb-1">
                    Visual Hallmarks:
                  </span>
                  <p className="text-[11px] font-medium text-emerald-400">
                    {st.characteristics}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bespoke Inquiry CTA Banner */}
      <section className="px-6 md:px-12 lg:px-24 max-w-[1440px] mx-auto py-12">
        <div className="bg-white rounded-3xl border border-[#111111]/10 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="max-w-xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8B0000] block mb-2">
              Custom Commissions
            </span>
            <h3 className="font-editorial text-2xl sm:text-4xl font-black uppercase text-[#111111]">
              Have a Dream Silhouette in Mind?
            </h3>
            <p className="text-xs sm:text-sm text-[#6B6B6B] mt-2 leading-relaxed">
              Share your reference photograph or sketch with our Nashik atelier cobblers. We can customize leather shade, welt width, and sole configuration to your exact preference.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <Link
              to="/workshop#booking"
              className="bg-[#111111] text-white px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#8B0000] transition-colors shadow-lg"
            >
              Consult an Artisan
            </Link>
            <button
              onClick={() => {
                const message = "Hello New Samadhan Shoe Mart, I am interested in a bespoke shoe order";
                const targetNum = Math.random() > 0.5 ? '9423228843' : '8888644021';
                window.open(`https://wa.me/91${targetNum}?text=${encodeURIComponent(message)}`, '_blank');
              }}
              className="bg-[#25D366] text-white px-6 py-4 rounded-xl text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#1EBE5D] transition-colors inline-flex items-center gap-2 shadow-lg"
            >
              <MessageSquare size={16} /> WhatsApp Us
            </button>
          </div>
        </div>
      </section>

      {/* Lightbox / Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-[10001] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-white/20 shadow-2xl relative grid grid-cols-1 md:grid-cols-12">
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-black/60 text-white hover:bg-black flex items-center justify-center transition-colors"
              aria-label="Close Modal"
            >
              <X size={20} />
            </button>

            {/* Modal Image */}
            <div className="md:col-span-7 bg-[#111111] relative min-h-[340px] md:min-h-full flex items-center justify-center p-4">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-full object-contain max-h-[500px]"
                onError={(e) => { e.target.src = '/Shoes.png'; }}
              />
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 rounded-full bg-black/80 text-white text-[9px] font-bold uppercase tracking-widest border border-white/20">
                  {selectedItem.category}
                </span>
              </div>
            </div>

            {/* Modal Details */}
            <div className="md:col-span-5 p-8 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#8B0000] block mb-1">
                  {selectedItem.hours}
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl font-black uppercase text-[#111111] mb-2 leading-tight">
                  {selectedItem.title}
                </h3>
                <span className="text-xl font-bold text-[#8B0000] block mb-4">
                  {selectedItem.price}
                </span>
                <p className="text-xs text-[#6B6B6B] leading-relaxed mb-6">
                  {selectedItem.description}
                </p>

                <div className="space-y-3 mb-8">
                  <div className="p-3 rounded-xl bg-[#F7F5F0] border border-[#111111]/5">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#6B6B6B] block">Leather Tannery:</span>
                    <span className="text-xs font-bold text-[#111111]">{selectedItem.leather}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F7F5F0] border border-[#111111]/5">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#6B6B6B] block">Welt Construction:</span>
                    <span className="text-xs font-bold text-[#111111]">{selectedItem.construction}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F7F5F0] border border-[#111111]/5">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#6B6B6B] block">Sole Architecture:</span>
                    <span className="text-xs font-bold text-[#111111]">{selectedItem.sole}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#111111]/10 flex flex-col gap-3">
                <Link
                  to={
                    selectedItem.category === "Women's Edition"
                      ? "/products?category=Women"
                      : selectedItem.category === "Kids Edition"
                      ? "/products?category=Kids"
                      : "/products"
                  }
                  onClick={() => setSelectedItem(null)}
                  className="w-full bg-[#111111] text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#8B0000] transition-colors text-center"
                >
                  Explore in Catalog
                </Link>
                <button
                  onClick={() => {
                    const message = `Hello New Samadhan, I am inquiring about the ${selectedItem.title} from your Gallery`;
                    const targetNum = Math.random() > 0.5 ? '9423228843' : '8888644021';
                    window.open(`https://wa.me/91${targetNum}?text=${encodeURIComponent(message)}`, '_blank');
                  }}
                  className="w-full bg-emerald-600 text-white py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-emerald-700 transition-colors text-center inline-flex items-center justify-center gap-2"
                >
                  <MessageSquare size={14} /> Inquire On WhatsApp
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default GalleryPage;
