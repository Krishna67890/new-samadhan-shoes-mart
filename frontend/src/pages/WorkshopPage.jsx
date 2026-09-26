import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass, Hammer, Scissors, Sparkles, CheckCircle2,
  Calendar, Clock, ShieldCheck, ArrowRight, UserCheck,
  ChevronRight, Award, Footprints, Layers, Zap, Info, Wrench, MapPin, Loader2, Phone
} from 'lucide-react';

const WORKSHOP_STATIONS = [
  {
    step: '01',
    title: 'The Anatomical Lasting Suite',
    subtitle: 'Digitized Ergonomics & Hand-Carved Hardwood',
    desc: 'Every master silhouette starts with a solid hornbeam wood last, carved and proportioned to human foot kinetics. Over 32 anatomical points are measured to eliminate pressure points and ensure immediate glove-like fit.',
    specs: ['Hornbeam Hardwood', '32 Measure Points', 'Zero-Pressure Arch'],
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80',
    leadArtisan: 'Master Vitthal (28 yrs experience)',
  },
  {
    step: '02',
    title: 'The Tuscan Leather Archive',
    subtitle: 'Grade-A Full Grain & Vegetable Tanning',
    desc: 'We store hand-curated hides from Florence and Maharashtra tanneries. Only top-grain skins with intact epidermal layers pass our tactile inspection. No synthetic coatings, allowing the leather to breathe and patina gracefully.',
    specs: ['Tuscan Full Grain', 'Natural Mimosa Extract', '1.8mm – 2.2mm Gauge'],
    image: 'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=1000&q=80',
    leadArtisan: 'Master Ramesh (22 yrs experience)',
  },
  {
    step: '03',
    title: 'The Clicking & Skiving Bench',
    subtitle: 'Artisanal Blade Work & Edge Tapering',
    desc: 'Using traditional clicker blades, patterns are hand-cut strictly parallel to the natural stretch grain of the leather. Edges are skived down to 0.4mm before assembly to produce seamless, blister-free junctions.',
    specs: ['Hand Clicker Blades', '0.4mm Edge Feathering', 'Grain-Aligned Cutting'],
    image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=1000&q=80',
    leadArtisan: 'Artisan Anand (19 yrs experience)',
  },
  {
    step: '04',
    title: 'The Goodyear Welt Cobbler Bay',
    subtitle: '200+ Operations for True Lifetime Resoleability',
    desc: 'The gold standard of bootmaking. A sturdy leather welt is lockstitched directly through the upper and insole rib. The hollow cavity is packed with granulated Portuguese cork that slowly compresses to your personal foot imprint.',
    specs: ['Chain Lockstitch', 'Portuguese Granular Cork', 'Infinite Resoleability'],
    image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1000&q=80',
    leadArtisan: 'Master Vitthal & Guild',
  },
  {
    step: '05',
    title: 'Sole Compression & Heel Stacking',
    subtitle: 'Dual-Density Ortho Cushions & Vibram Grips',
    desc: 'Outsoles are placed under 80-bar pneumatic pressure with thermo-reactive eco adhesives, then channel-stitched. Natural leather heels are stacked layer upon layer, beveled with vintage glass scrapers and brass pegged.',
    specs: ['Vibram Arctic Soles', 'Solid Brass Pegging', '80-Bar Fusion'],
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80',
    leadArtisan: 'Artisan Ganesh (16 yrs experience)',
  },
  {
    step: '06',
    title: 'The Patina & Glazing Chamber',
    subtitle: 'Beeswax, Carnauba Glaze & Bone-Burnishing',
    desc: 'The finale of our craft. Raw leather is hand-rubbed with natural pigments, carnauba creams, and genuine deer bone to close the leather pores. A 24-hour buffing process yields a museum-worthy mirror gloss with multidimensional depth.',
    specs: ['Organic Carnauba', 'Deer Bone Polishing', '24-Hour Hand Buff'],
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
    leadArtisan: 'Patina Master Dnyanesh (14 yrs experience)',
  },
];

const MASTER_COBBLERS = [
  {
    name: 'Vitthalrao Shinde',
    role: 'Guild Master & Chief Lastmaker',
    exp: '32 Years of Service',
    bio: 'Founder disciple of our original 1990 Nashik workshop. Vitthal has personally carved over 12,000 bespoke lasts and oversees every Goodyear welted pair.',
    specialty: 'Orthopedic balance, Goodyear welting, Bespoke last sculpting',
  },
  {
    name: 'Ramesh Kulkarni',
    role: 'Master Hide Assayer & Leather Tanner',
    exp: '24 Years of Service',
    bio: 'Renowned throughout western India for his sensory inspection of hides. Ramesh can detect microscopic tensile anomalies simply by gliding his fingertips.',
    specialty: 'Grain orientation, veg-tan formulation, tactile selection',
  },
  {
    name: 'Anand Gaikwad',
    role: 'Lead Clicker & Upper Engineer',
    exp: '19 Years of Service',
    bio: 'Trained in classical English and Italian bench techniques. Anand is famous for his laser-accurate freehand blade cutting with zero waste.',
    specialty: 'Hand skiving, 14-SPI twin needle lockstitch, curved broguing',
  },
];

const WorkshopPage = () => {
  const navigate = useNavigate();
  const [selectedStation, setSelectedStation] = useState(0);
  const [bookingStatus, setBookingStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Bespoke Foot Fitting',
    preferredDate: '',
    preferredTime: '11:00 AM',
    notes: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    setBookingStatus('submitting');

    // WhatsApp Integration
    const phoneNumber = "918888644021";
    const message = `*Workshop Appointment Request*
--------------------------
*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Email:* ${formData.email || 'N/A'}
*Service:* ${formData.service}
*Date:* ${formData.preferredDate}
*Time:* ${formData.preferredTime}
*Notes:* ${formData.notes || 'None'}
--------------------------
Requested via New Samadhan Shoes Website`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // Direct redirection to avoid popup blockers
    window.location.href = whatsappUrl;
    setBookingStatus('confirmed');
  };

  return (
    <div className="bg-[#F7F5F0] text-[#111111] min-h-screen pt-28 pb-20 font-sans selection:bg-[#8B0000] selection:text-white">

      {/* Hero Section */}
      <section className="relative px-6 md:px-12 lg:px-24 max-w-[1440px] mx-auto py-12 md:py-20">
        <div className="flex flex-col gap-6 max-w-4xl">
          <div className="inline-flex items-center gap-3">
            <span className="w-8 h-[2px] bg-[#8B0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#8B0000]">
              The Artisanal Atelier · Nashik
            </span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.92]">
            Where Heritage Meets <br />
            <span className="italic font-light text-[#8B0000]">Living Mastery.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#6B6B6B] max-w-2xl leading-relaxed">
            Welcome inside the heart of New Samadhan Shoe Mart. Since 1990, every pair has been brought to life right here in Nashik through 200+ distinct handcrafting steps — marrying time-tested cobbler tradition with modern ergonomic longevity.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="#booking"
              className="bg-[#111111] text-white px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-[0.25em] hover:bg-[#8B0000] transition-colors inline-flex items-center gap-3 shadow-lg"
            >
              Book Atelier Visit <Calendar size={16} />
            </a>
            <Link
              to="/gallery"
              className="bg-white border border-[#111111]/15 text-[#111111] px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-[0.25em] hover:border-[#111111] transition-colors inline-flex items-center gap-3"
            >
              View Finished Gallery <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Floating Hero Image - Shoes.png */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-full max-w-2xl opacity-10 pointer-events-none hidden lg:block select-none">
           <img
            src="/Shoes.png"
            alt="New Samadhan Shoes"
            className="w-full h-auto object-contain transform rotate-[-12deg] scale-125 translate-x-1/4"
           />
        </div>

        {/* Live Workshop Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-10 border-t border-[#111111]/10">
          {[
            { value: '34+', label: 'Years in Nashik', sub: 'Generational Guild' },
            { value: '200+', label: 'Handmade Steps', sub: 'Per Individual Pair' },
            { value: '100%', label: 'Goodyear Resoleable', sub: 'Zero Fast-Fashion' },
            { value: '12', label: 'Master Cobblers', sub: 'Over 280 Yrs Combined' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-[#111111]/5 shadow-sm">
              <span className="font-editorial text-3xl sm:text-4xl font-black text-[#8B0000] block mb-1">
                {stat.value}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#111111] block">
                {stat.label}
              </span>
              <span className="text-[10px] text-[#6B6B6B] block mt-0.5">
                {stat.sub}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Workshop Blueprint & Stages */}
      <section className="px-6 md:px-12 lg:px-24 max-w-[1440px] mx-auto py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8B0000] block mb-2">
              Interactive Atelier Walkthrough
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-black uppercase tracking-tight">
              The 6 Crafting Stations
            </h2>
          </div>
          <p className="text-sm text-[#6B6B6B] max-w-md">
            Click any station below to inspect the specialized tools, raw materials, and precision secrets applied by our artisans.
          </p>
        </div>

        {/* Station Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
          {WORKSHOP_STATIONS.map((st, i) => (
            <button
              key={i}
              onClick={() => setSelectedStation(i)}
              className={`p-4 rounded-xl text-left transition-all border ${
                selectedStation === i
                  ? 'bg-[#111111] text-white border-[#111111] shadow-md scale-[1.02]'
                  : 'bg-white hover:bg-[#111111]/5 text-[#111111] border-[#111111]/10'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-mono font-bold ${selectedStation === i ? 'text-[#8B0000]' : 'text-[#8B0000]'}`}>
                  {st.step}
                </span>
                <span className={`text-[9px] uppercase tracking-widest ${selectedStation === i ? 'text-white/60' : 'text-[#6B6B6B]'}`}>
                  Phase
                </span>
              </div>
              <p className="text-xs font-bold uppercase tracking-tight line-clamp-1">
                {st.title.split('The ')[1] || st.title}
              </p>
            </button>
          ))}
        </div>

        {/* Active Station In-Depth Card */}
        {WORKSHOP_STATIONS[selectedStation] && (
          <div className="bg-white rounded-3xl border border-[#111111]/10 overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12 animate-in fade-in duration-300">
            {/* Visual Column */}
            <div className="lg:col-span-7 relative min-h-[360px] lg:min-h-[500px] overflow-hidden bg-[#111111]">
              <img
                src={WORKSHOP_STATIONS[selectedStation].image}
                alt={WORKSHOP_STATIONS[selectedStation].title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
                <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#ff4d4d] mb-1">
                  Active Station #{WORKSHOP_STATIONS[selectedStation].step}
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl font-black uppercase">
                  {WORKSHOP_STATIONS[selectedStation].title}
                </h3>
                <p className="text-xs text-white/80 mt-1 italic">
                  Supervised by: {WORKSHOP_STATIONS[selectedStation].leadArtisan}
                </p>
              </div>
            </div>

            {/* Narrative & Details Column */}
            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8B0000] block mb-2">
                  Station Specifications
                </span>
                <h4 className="text-lg font-black uppercase text-[#111111] tracking-tight mb-4">
                  {WORKSHOP_STATIONS[selectedStation].subtitle}
                </h4>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-8">
                  {WORKSHOP_STATIONS[selectedStation].desc}
                </p>

                {/* Key Spec Badges */}
                <div className="space-y-3 mb-8">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#111111] block">
                    Key Technical Hallmarks:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {WORKSHOP_STATIONS[selectedStation].specs.map((sp, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F7F5F0] text-[#111111] border border-[#111111]/10 text-xs font-semibold"
                      >
                        <CheckCircle2 size={13} className="text-[#8B0000]" />
                        {sp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#111111]/10 flex items-center justify-between">
                <button
                  onClick={() => setSelectedStation((prev) => (prev > 0 ? prev - 1 : WORKSHOP_STATIONS.length - 1))}
                  className="text-xs font-bold uppercase tracking-widest text-[#6B6B6B] hover:text-[#111111] transition-colors"
                >
                  ← Previous
                </button>
                <span className="text-xs font-mono font-bold text-[#8B0000]">
                  {selectedStation + 1} / {WORKSHOP_STATIONS.length}
                </span>
                <button
                  onClick={() => setSelectedStation((prev) => (prev < WORKSHOP_STATIONS.length - 1 ? prev + 1 : 0))}
                  className="text-xs font-bold uppercase tracking-widest text-[#8B0000] hover:text-[#111111] transition-colors"
                >
                  Next Station →
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* The Master Cobblers of New Samadhan */}
      <section className="px-6 md:px-12 lg:px-24 max-w-[1440px] mx-auto py-16">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#8B0000] block mb-3">
            The Living Hands
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl font-black uppercase tracking-tight">
            Meet the Master Guild
          </h2>
          <p className="text-sm text-[#6B6B6B] mt-4 leading-relaxed">
            Behind every stitch, curve, and mirror-buffed toe cap are masters who have dedicated their lives to the perfection of foot mechanics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MASTER_COBBLERS.map((cobbler, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-8 border border-[#111111]/10 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between relative group"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#8B0000]/10 text-[#8B0000] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Award size={28} />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8B0000] block mb-1">
                  {cobbler.exp}
                </span>
                <h3 className="font-editorial text-2xl font-bold uppercase text-[#111111] mb-2">
                  {cobbler.name}
                </h3>
                <span className="text-xs font-bold uppercase tracking-wider text-[#6B6B6B] block mb-4">
                  {cobbler.role}
                </span>
                <p className="text-xs text-[#6B6B6B] leading-relaxed mb-6">
                  {cobbler.bio}
                </p>
              </div>

              <div className="pt-4 border-t border-[#111111]/5">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#111111] block mb-1">
                  Signature Specialty:
                </span>
                <p className="text-[11px] text-[#8B0000] font-medium italic">
                  {cobbler.specialty}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The 120-Step Handcraft Standard Banner */}
      <section className="px-6 md:px-12 lg:px-24 max-w-[1440px] mx-auto py-12">
        <div className="bg-[#111111] text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-2xl">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-12 translate-y-12">
            <Footprints size={340} />
          </div>

          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#8B0000]/20 border border-[#8B0000]/40 px-3.5 py-1.5 rounded-full mb-6">
              <Sparkles size={14} className="text-[#ff4d4d]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff7373]">
                Zero Compromise Standard
              </span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-5xl font-black uppercase tracking-tight leading-tight mb-6">
              120 Rigorous Steps. <br />
              <span className="italic font-light text-[#ff7373]">Zero Shortcuts.</span>
            </h2>

            <p className="text-sm text-white/70 leading-relaxed mb-8">
              Fast fashion glues synthetic uppers to molded plastic in 4 minutes. A genuine pair from New Samadhan takes a full 3 weeks of natural rest, wood-curing, hand-lasting, and triple inspection before leaving our atelier.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/10">
              <div>
                <span className="text-2xl font-bold font-editorial text-[#ff4d4d] block">3 Weeks</span>
                <span className="text-xs text-white/60">Minimum Lasting & Curing</span>
              </div>
              <div>
                <span className="text-2xl font-bold font-editorial text-[#ff4d4d] block">3x Audit</span>
                <span className="text-xs text-white/60">Guild Master Verification</span>
              </div>
              <div>
                <span className="text-2xl font-bold font-editorial text-[#ff4d4d] block">Lifetime</span>
                <span className="text-xs text-white/60">Free Minor Stitch Servicing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Service & Restoration Hub */}
      <section className="px-6 md:px-12 lg:px-24 max-w-[1440px] mx-auto py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#8B0000]/5 border border-[#8B0000]/10 px-4 py-2 rounded-full mb-6">
            <Wrench size={14} className="text-[#8B0000]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8B0000]">Elite Maintenance Hub</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-6xl font-black uppercase tracking-tight mb-6">
            Restoration <span className="italic font-light text-[#8B0000]">Protocols.</span>
          </h2>
          <p className="text-sm text-[#6B6B6B] leading-relaxed italic">
            "Your grails deserve a lifetime. Beyond creation, we offer molecular-level restoration and anatomical optimization for every pair in your collection."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Diamond Restoration',
              desc: 'Deep rejuvenation for premium leathers. Molecular cleaning & pigment re-balancing.',
              icon: <Sparkles className="text-[#8B0000]" />,
              features: ['PH-Neutral Cleansing', 'Hand-Rubbed Patina', 'Texture Recovery']
            },
            {
              title: 'Sole Reconstruction',
              desc: 'Full welt-to-sole replacement using high-durability performance polymers.',
              icon: <Hammer className="text-[#111111]" />,
              features: ['Goodyear Welt Sync', 'Portuguese Cork Fill', 'Vibram Outsole Options']
            },
            {
              title: 'Anatomical Re-Fit',
              desc: 'Modifying the internal volume for perfect ergonomic alignment with your stride.',
              icon: <Footprints className="text-[#111111]" />,
              features: ['Last Re-shaping', 'Arch Reinforcement', 'Insole Customization']
            }
          ].map((service, idx) => (
            <div key={idx} className="group bg-white p-10 rounded-[3rem] border border-[#111111]/5 hover:border-[#8B0000]/20 transition-all duration-500 shadow-sm hover:shadow-2xl">
              <div className="w-16 h-16 bg-[#F7F5F0] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#8B0000] group-hover:text-white transition-all duration-500">
                {React.cloneElement(service.icon, { size: 28 })}
              </div>
              <h3 className="text-2xl font-editorial font-bold uppercase mb-4 tracking-tight">{service.title}</h3>
              <p className="text-xs text-[#6B6B6B] leading-relaxed mb-8 italic">"{service.desc}"</p>
              <ul className="space-y-3">
                {service.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-[#111111]/60">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#8B0000]"></div>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Advanced Service Center & Restoration Laboratories */}
      <section className="px-6 md:px-12 lg:px-24 max-w-[1440px] mx-auto py-20 bg-[#111111] text-white rounded-[4rem] my-16 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
           <div className="grid grid-cols-8 h-full">
              {[...Array(64)].map((_, i) => (
                <div key={i} className="border border-white/20"></div>
              ))}
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#8B0000]/20 border border-[#8B0000]/40 px-4 py-2 rounded-full mb-6">
              <div className="w-2 h-2 rounded-full bg-[#ff4d4d] animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ff7373]">Advanced Restoration Node</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-6xl font-black uppercase tracking-tight mb-6 leading-[0.95]">
              Elite Service <br />
              <span className="italic font-light text-[#8B0000]">Center.</span>
            </h2>
            <p className="text-sm text-white/60 leading-relaxed italic mb-8 max-w-xl">
              "Equipped with advanced multi-tier diagnostic tools, natural oil injection baths, and premium welt restoration jigs. We don't just repair; we stabilize material integrity at a molecular level."
            </p>
            <div className="grid grid-cols-2 gap-8">
              {[
                { label: 'Sole Engineering', value: 'Vibram & Dainite Certified', desc: 'Authorized Resole Center' },
                { label: 'Leather Science', value: 'Molecular Tissue Revival', desc: 'PH-Balanced Rejuvenation' },
                { label: 'Anatomy Sync', value: '3D Ergonomic Fitting', desc: 'Personalized Last Mapping' },
                { label: 'Stitch Integrity', value: '100% Goodyear Protocol', desc: 'Manual Welt Lockstitching' }
              ].map((item, idx) => (
                <div key={idx} className="border-l border-[#8B0000] pl-6">
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#8B0000] block mb-1">{item.label}</span>
                  <span className="text-xs font-bold uppercase tracking-tight text-white block">{item.value}</span>
                  <span className="text-[9px] text-white/40 uppercase mt-1 block">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl p-10 rounded-[3rem] border border-white/10 relative overflow-hidden">
            <h3 className="text-2xl font-editorial font-black uppercase mb-8 tracking-tight text-white">Active Maintenance Tiers</h3>
            <div className="space-y-6">
              {[
                { name: 'Elite Leather Rejuvenation', time: '48 Hours', price: '₹1,500', detail: 'Deep cleaning + Saphir MDO treatment' },
                { name: 'Full Sole Reconstruction', time: '7-10 Days', price: '₹4,500', detail: 'Complete welt-down replacement' },
                { name: 'Anatomical Comfort Optimization', time: '3-5 Days', price: '₹2,500', detail: 'Internal volume & arch adjustment' }
              ].map((tier, idx) => (
                <div key={idx} className="flex justify-between items-start border-b border-white/10 pb-5 group hover:border-[#8B0000] transition-colors">
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-white group-hover:text-[#8B0000] transition-colors">{tier.name}</h4>
                    <p className="text-[10px] text-white/40 italic mt-1">{tier.detail}</p>
                    <p className="text-[9px] font-bold text-[#8B0000] uppercase mt-2 tracking-widest">Protocol Timeline: {tier.time}</p>
                  </div>
                  <span className="text-lg font-editorial font-black text-white tracking-tight">{tier.price}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => document.getElementById('booking').scrollIntoView({ behavior: 'smooth' })}
              className="w-full bg-[#8B0000] text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-[#111111] transition-all mt-10 shadow-xl shadow-red-900/20"
            >
              Initiate Diagnostic Order
            </button>
          </div>
        </div>
      </section>

      {/* Atelier Appointment & Custom Consultation Form */}
      <section id="booking" className="px-6 md:px-12 lg:px-24 max-w-[1440px] mx-auto py-16 scroll-mt-24">
        <div className="bg-[#111111] rounded-[4rem] p-8 sm:p-20 shadow-2xl relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#8B0000]/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
            
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-[#8B0000] text-[10px] font-black uppercase tracking-[0.4em] mb-6">
                  <Zap size={16} /> Direct Node Access
                </div>
                <h2 className="font-editorial text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-8 leading-[0.9]">
                  Bespoke <br />
                  <span className="italic font-light text-[#8B0000]">Experience.</span>
                </h2>
                <p className="text-sm text-white/50 leading-relaxed mb-10 italic">
                  "Book your consultation for a bespoke creation or elite restoration. Your request will be transmitted directly to our Master Cobbler via secured WhatsApp protocol."
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <MapPin size={24} className="text-[#8B0000] shrink-0 mt-1" />
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-white block mb-1">
                        Atelier Coordinates
                      </span>
                      <span className="text-xs text-white/60 leading-relaxed">
                        Plot No 29, Santkrupa Niwas, Nashik 422003. Maharashtra, India.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <ShieldCheck size={24} className="text-[#8B0000] shrink-0 mt-1" />
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-white block mb-1">
                        Verified Craftsmanship
                      </span>
                      <span className="text-xs text-white/60 leading-relaxed">
                        Authorized Goodyear Welt Service Center & Bespoke Tailoring.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-12 mt-12 border-t border-white/10">
                <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/30 block mb-4 italic">Direct Appointment Hotline</span>
                <div className="flex items-center gap-6">
                   <div className="w-12 h-12 rounded-2xl bg-[#8B0000]/20 flex items-center justify-center text-[#8B0000]">
                      <Phone size={24} />
                   </div>
                   <span className="text-2xl font-editorial font-black text-white tracking-widest">+91 8888644021</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-14 rounded-[3rem] shadow-2xl">
              {bookingStatus === 'confirmed' ? (
                <div className="py-20 text-center flex flex-col items-center justify-center animate-in zoom-in-95 duration-500">
                  <div className="w-24 h-24 rounded-[2rem] bg-emerald-50 text-emerald-600 flex items-center justify-center mb-8 border border-emerald-100 shadow-xl shadow-emerald-500/10">
                    <CheckCircle2 size={48} strokeWidth={2.5} />
                  </div>
                  <h3 className="font-editorial text-4xl font-black uppercase text-[#111111] mb-4 tracking-tight">
                    Transmission Success
                  </h3>
                  <p className="text-sm text-[#6B6B6B] max-w-md mb-10 leading-relaxed italic">
                    "Thank you, <strong className="text-[#111111]">{formData.name}</strong>. Your appointment request for <strong className="text-[#8B0000]">{formData.service}</strong> is now in our master queue. Our concierge will reach you shortly."
                  </p>
                  <button
                    onClick={() => {
                      setBookingStatus(null);
                      setFormData({
                        name: '', phone: '', email: '',
                        service: 'Bespoke Foot Fitting',
                        preferredDate: '', preferredTime: '11:00 AM', notes: ''
                      });
                    }}
                    className="bg-[#111111] text-white px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#8B0000] transition-all shadow-xl"
                  >
                    Initiate New Protocol
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitBooking} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-[0.3em] text-[#6B6B6B] ml-4">
                        Full Designation
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. KRISHNA RAJPUT"
                        className="w-full bg-[#F7F5F0] px-6 py-5 rounded-2xl border border-transparent focus:bg-white focus:border-[#8B0000]/30 text-xs font-bold uppercase tracking-widest outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-[0.3em] text-[#6B6B6B] ml-4">
                        WhatsApp Contact
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full bg-[#F7F5F0] px-6 py-5 rounded-2xl border border-transparent focus:bg-white focus:border-[#8B0000]/30 text-xs font-bold uppercase tracking-widest outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-[0.3em] text-[#6B6B6B] ml-4">
                        Encryption Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="CLIENT@SAMADHAN.COM"
                        className="w-full bg-[#F7F5F0] px-6 py-5 rounded-2xl border border-transparent focus:bg-white focus:border-[#8B0000]/30 text-xs font-bold uppercase tracking-widest outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-[0.3em] text-[#6B6B6B] ml-4">
                        Selected Protocol
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full bg-[#F7F5F0] px-6 py-5 rounded-2xl border border-transparent focus:bg-white focus:border-[#8B0000]/30 text-xs font-bold uppercase tracking-widest outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option value="Bespoke Foot Fitting">Bespoke Fitting & Measurement</option>
                        <option value="Diamond Restoration">Diamond Restoration Service</option>
                        <option value="Sole Reconstruction">Full Sole Reconstruction</option>
                        <option value="Anatomical Re-Fit">Ergonomic Anatomical Re-Fit</option>
                        <option value="Wedding / Groom Consultation">Wedding Curation</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-[0.3em] text-[#6B6B6B] ml-4">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        name="preferredDate"
                        required
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                        className="w-full bg-[#F7F5F0] px-6 py-5 rounded-2xl border border-transparent focus:bg-white focus:border-[#8B0000]/30 text-xs font-bold uppercase tracking-widest outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-[0.3em] text-[#6B6B6B] ml-4">
                        Time Slot
                      </label>
                      <select
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleInputChange}
                        className="w-full bg-[#F7F5F0] px-6 py-5 rounded-2xl border border-transparent focus:bg-white focus:border-[#8B0000]/30 text-xs font-bold uppercase tracking-widest outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option value="11:00 AM">Morning (11:00 AM)</option>
                        <option value="02:30 PM">Afternoon (02:30 PM)</option>
                        <option value="05:30 PM">Evening (05:30 PM)</option>
                        <option value="07:30 PM">Late Evening (07:30 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.3em] text-[#6B6B6B] ml-4">
                      Protocol Notes (Optional)
                    </label>
                    <textarea
                      name="notes"
                      rows={3}
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="SPECIFY FOOT REQUIREMENTS, BRANDS, OR RESTORATION NEEDS..."
                      className="w-full bg-[#F7F5F0] p-6 rounded-2xl border border-transparent focus:bg-white focus:border-[#8B0000]/30 text-xs font-bold uppercase tracking-widest outline-none transition-all resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={bookingStatus === 'submitting'}
                    className="w-full bg-[#8B0000] text-white py-6 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-[#111111] transition-all flex items-center justify-center gap-4 shadow-xl shadow-red-900/10 group"
                  >
                    {bookingStatus === 'submitting' ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <>Commit Appointment Request <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" /></>
                    )}
                  </button>
                  <p className="text-[8px] font-bold text-center text-[#6B6B6B] uppercase tracking-[0.2em] mt-4">
                    Secured via WhatsApp Protocol · End-to-End Encrypted
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default WorkshopPage;
