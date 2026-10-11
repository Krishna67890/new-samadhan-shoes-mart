import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MessageSquare, Volume2, X, Zap, User, UserCheck, Heart, ShieldCheck, Sparkles, Mic, MicOff, Send, Footprints, Search, Info, Bot, Award, Loader2 } from 'lucide-react';
import { resolveImageUrl } from '../utils/urlConfig';
import { getMergedProducts } from '../utils/productUtils';
import useFetch from '../hooks/useFetch';
import { gsap } from 'gsap';

const AIGuide = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceType, setVoiceType] = useState('male');
  const [activeTab, setActiveTab] = useState('chat'); // 'chat', 'voice', 'heritage', 'products'
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Namaste! I am your Heritage AI Agent. I represent 34 years of craftsmanship from the heart of Nashik. I can guide you through our archives, help with precision sizing, or find the perfect build for your lifestyle. How may I serve you today?', type: 'text' }
  ]);
  const [products, setProducts] = useState([]);
  const { request } = useFetch();

  const location = useLocation();
  const navigate = useNavigate();
  const recognitionRef = useRef(null);
  const chatEndRef = useRef(null);

  const expertAvatar = resolveImageUrl('/New-Samadhan-Shoe-Mart/Satkar 1.jpg');

  // Fetch latest products to keep AI "Knowledgeable"
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await request('/api/products');
        setProducts(getMergedProducts(data));
      } catch (err) {
        setProducts(getMergedProducts([]));
      }
    };
    loadProducts();
  }, [request]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getScript = useCallback(() => {
    const path = location.pathname;
    const userData = JSON.parse(localStorage.getItem('ssm_user_identity') || '{}');
    const userName = userData.name || 'my friend';
    const heritageLine = "Finding the perfect fit for your lifestyle and comfort is our heritage.";

    if (path === '/') return `Heritage AI Agent Online. Namaste ${userName}. I am your guide to 26+ years of footwear excellence. How may I assist your discovery today?`;
    if (path.includes('/product/')) return `You are viewing a master-crafted silhouette. This build features our signature orthotic-grade support. Shall I explain the technical heritage behind this sole?`;
    if (path.includes('/cart')) return `Reviewing your selection? I can help ensure you've selected the perfect size based on our anatomical heritage standards.`;
    return `Hello ${userName}. What can I help you discover today?`;
  }, [location]);

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      let selectedVoice = voices.find(v => v.lang.includes('en-IN') && v.name.toLowerCase().includes(voiceType)) || voices[0];
      if (selectedVoice) utterance.voice = selectedVoice;
      utterance.rate = 1.05;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const addMessage = (role, text, type = 'text', data = null) => {
    // Add Concierge phone only to specific AI help messages or greetings to avoid clutter
    const needsPhone = role === 'ai' && (text.includes('Concierge') || text.includes('assist') || text.includes('Namaste') || type === 'recommendation');
    const displayChatText = needsPhone ? `${text}\n\n📞 Concierge: 94232 28843` : text;

    setMessages(prev => [...prev, { role, text: displayChatText, type, data }]);
    if (role === 'ai') speak(text);
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userInput = chatInput;
    setChatInput('');
    addMessage('user', userInput);
    processQuery(userInput.toLowerCase());
  };

  const processQuery = (text) => {
    const userData = JSON.parse(localStorage.getItem('ssm_user_identity') || '{}');
    const userName = userData.name || 'my friend';
    const query = text.toLowerCase().trim();

    // 1. Discovery / Greeting logic
    if (query === 'hi' || query === 'hello' || query === 'namaste') {
      addMessage('ai', `Namaste ${userName}! It's a privilege to assist you. I am the Heritage Agent for New Samadhan Shoes. Are you looking for our handcrafted Formal classics, or our modern High-Performance Sneakers?`);
      return;
    }

    if (query.includes('heritage') || query.includes('history') || query.includes('since') || query.includes('about the shop')) {
      addMessage('ai', `Our heritage began in 1998 in Nashik. For over 26 years, we have specialized in ergonomic footwear that blends traditional craftsmanship with modern comfort. Every pair is a testament to our commitment to quality and 'Anatomical Arch Balance'.`);
      return;
    }

    if (query.includes('tell me products') || query.includes('show products') || query.includes('what do you have') || query.includes('latest')) {
      const latest = products.slice(0, 3);
      addMessage('ai', `Certainly, ${userName}. We've recently updated our collection with some remarkable pieces. Here are a few of our latest heritage drops:`, 'recommendation', latest);
      return;
    }

    // 2. Logic for Foot Size & Color
    if (query.includes('size') || query.includes('fit') || query.includes('measure')) {
      addMessage('ai', "A perfect fit is the foundation of comfort. We use UK standards. I recommend measuring your foot in centimeters—you can find our detailed conversion chart in the 'Fit & Color Guide' tab. Should I show you our best-fitting orthopedic options?");
      return;
    }

    if (query.includes('arch') || query.includes('comfort') || query.includes('orthopedic') || query.includes('medical')) {
      addMessage('ai', "Precision engineering for comfort is our signature. Our 'Balance-Tech' soles provide superior arch support, reducing fatigue for those standing long hours. Shall I show you our most comfortable ergonomic builds?");
      return;
    }
    if (query.includes('color') || query.includes('colour') || query.includes('shade')) {
      addMessage('ai', "We take great pride in our leather finishes. Our 'Heritage Tan' is a favorite for versatility, while 'Classic Black' remains the gold standard for formals. Which palette are you leaning towards today?");
      return;
    }

    // 3. Mapping for Occasions and Categories (Robust matching)
    const mappings = [
      { keys: ['wedding', 'marriage', 'shaadi', 'party', 'function', 'event', 'wdding', 'weding'], category: 'Formal', purpose: 'Party', label: 'Wedding & Celebrations' },
      { keys: ['office', 'work', 'corporate', 'meeting', 'business', 'office where', 'offce'], category: 'Formal', purpose: 'Office', label: 'Professional Office Wear' },
      { keys: ['daily', 'everyday', 'casual', 'walk', 'comfort'], purpose: 'Daily Wear', label: 'Daily Comfort' },
      { keys: ['sport', 'run', 'gym', 'training', 'workout', 'athletic'], category: 'Sneakers', purpose: 'Sports', label: 'Athletic Performance' },
      { keys: ['college', 'university', 'student', 'campus'], purpose: 'College', label: 'Campus Style' },
      { keys: ['sneaker', 'kicks', 'street'], category: 'Sneakers', label: 'Premium Sneakers' },
      { keys: ['formal', 'dress', 'leather shoe', 'oxford', 'derby'], category: 'Formal', label: 'Heritage Formals' },
      { keys: ['sandal', 'chappal', 'floaters'], category: 'Sandals', label: 'Comfort Sandals' },
      { keys: ['slipper', 'flip flop', 'slide'], category: 'Slippers', label: 'Relaxed Slippers' },
      { keys: ['heel', 'stiletto', 'pump'], category: 'Women', label: 'Elegant Heels' },
      { keys: ['boot', 'trek', 'hike'], category: 'Boots', label: 'Rugged Boots' },
      { keys: ['police', 'army', 'defense', 'safety', 'industrial'], category: 'Men', purpose: 'Industrial Safety', label: 'Professional Grade Footwear' },
      { keys: ['kids', 'junior', 'school', 'children'], category: 'Kids', label: 'Junior Heritage' }
    ];

    let match = mappings.find(m => m.keys.some(k => query.includes(k)));

    // 4. Dynamic Inventory Search
    let recommendations = [];
    if (match) {
      recommendations = products.filter(p => {
        const nameMatch = p.name.toLowerCase().includes(query);
        const catMatch = match.category ? p.category === match.category : false;
        // Check both purpose field and description
        const purpMatch = match.purpose ? (
          (p.purpose && p.purpose.toLowerCase().includes(match.purpose.toLowerCase())) ||
          (p.description && p.description.toLowerCase().includes(match.purpose.toLowerCase()))
        ) : false;
        return nameMatch || catMatch || purpMatch;
      }).slice(0, 3);
    } else {
      // Fallback search across all fields
      recommendations = products.filter(p =>
        p.name.toLowerCase().includes(query) ||
        (p.category && p.category.toLowerCase().includes(query)) ||
        (p.description && p.description.toLowerCase().includes(query))
      ).slice(0, 3);
    }

    if (recommendations.length > 0) {
      const label = match ? match.label : 'Heritage';
      const humanResponses = [
        `Excellent choice, ${userName}. Based on our current inventory, these ${label} pairs are highly recommended for their craftsmanship.`,
        `I've looked through our latest arrivals for you. These ${label} masterpieces really stand out.`,
        `For ${label}, our master craftsmen suggest these specific builds. They offer the perfect blend of style and orthotic support.`,
        `I've curated a few ${label} options from our archive that I think you'll appreciate.`
      ];
      const selectedResponse = humanResponses[Math.floor(Math.random() * humanResponses.length)];
      addMessage('ai', selectedResponse, 'recommendation', recommendations);
    } else if (match) {
      const label = match.label;
      addMessage('ai', `I understand you're looking for ${label}. I don't have a direct preview ready here, but I can certainly take you to our full gallery for more options.`);
      setTimeout(() => {
        const params = new URLSearchParams();
        if (match.category) params.append('category', match.category);
        if (match.purpose) params.append('purpose', match.purpose);
        navigate(`/products?${params.toString()}`);
        setIsOpen(false);
      }, 2500);
    } else {
      addMessage('ai', `I apologize, ${userName}, I couldn't find a precise match for that in our current drops. However, we specialize in high-quality Formals, Sneakers, and specialized footwear like Police boots. Are you looking for something for a specific occasion?`);
    }
  };

  const startVoiceCommand = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition not supported.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      addMessage('user', transcript);
      processQuery(transcript.toLowerCase());
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const handleGuideOpen = () => {
    setIsOpen(true);
    if (messages.length === 1) {
      speak(getScript());
    }
  };

  const handleTabClick = (tab, e) => {
    setActiveTab(tab);
    e.currentTarget.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  };

  return (
    <>
      {/* Floating Trigger - Centered on Mobile for visibility */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 sm:left-8 sm:right-auto sm:translate-x-0 sm:bottom-8 z-[200] flex flex-col items-center gap-2">
        {isSpeaking && (
          <div className="bg-white px-4 py-2 rounded-2xl shadow-xl border border-slate-100 animate-bounce mb-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-1.5 h-4 bg-[#8B0000] rounded-full animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
              ))}
            </div>
          </div>
        )}
        <button
          onClick={handleGuideOpen}
          className="w-16 h-16 sm:w-20 sm:h-20 bg-[#111111] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all group relative overflow-hidden border-4 border-[#d4af37]"
        >
          <img
            src={expertAvatar}
            alt="Expert"
            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
            onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Heritage+Agent&background=111&color=d4af37'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute top-2 right-2 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white z-20 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
          <Bot className="relative z-10 group-hover:scale-110 transition-transform text-[#d4af37]" size={28} />
        </button>
        <span className="text-[9px] font-black uppercase tracking-[0.15em] text-white bg-[#111111] border border-[#d4af37]/50 px-3 py-1 rounded-full shadow-lg">Heritage Agent</span>
      </div>

      {/* Advanced AI Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6 no-blur-zone">
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>

          <div className="bg-white w-full max-w-4xl h-[80vh] rounded-[2.5rem] overflow-hidden relative z-10 shadow-2xl border border-slate-100 flex flex-col md:flex-row">

            {/* Left Sidebar - AI Profile */}
            <div className="w-full md:w-1/3 bg-[#111111] border-b md:border-b-0 md:border-r border-[#d4af37]/20 p-4 md:p-8 flex flex-row md:flex-col items-center justify-between md:justify-center text-center text-white shrink-0">
              <div className="flex flex-row md:flex-col items-center gap-4 md:gap-0">
                <div className="w-12 h-12 md:w-32 md:h-32 rounded-full overflow-hidden border-2 md:border-4 border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.3)] md:mb-6 relative shrink-0">
                  <img src={expertAvatar} alt="Heritage Agent" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
                <div className="text-left md:text-center">
                  <h2 className="text-sm md:text-xl font-black text-[#d4af37] uppercase tracking-tighter md:mb-2">Heritage AI</h2>
                  <p className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">26+ Years of Heritage</p>
                </div>
              </div>

              <div className="hidden md:block space-y-3 w-full mt-8">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3">
                  <ShieldCheck className="text-[#d4af37]" size={18} />
                  <div className="text-left">
                    <p className="text-[9px] font-black text-slate-400 uppercase">Operational Status</p>
                    <p className="text-[10px] font-bold text-emerald-400 uppercase">Active Concierge</p>
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3">
                  <Award className="text-[#d4af37]" size={18} />
                  <div className="text-left">
                    <p className="text-[9px] font-black text-slate-400 uppercase">Knowledge Base</p>
                    <p className="text-[10px] font-bold text-slate-300 uppercase">Heritage & Fit Expert</p>
                  </div>
                </div>
              </div>

              <div className="md:mt-auto flex gap-2">
                 <button onClick={() => setVoiceType('female')} className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl text-[8px] md:text-[9px] font-black uppercase transition-all ${voiceType === 'female' ? 'bg-[#d4af37] text-black' : 'bg-white/10 text-slate-400'}`}>F</button>
                 <button onClick={() => setVoiceType('male')} className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl text-[8px] md:text-[9px] font-black uppercase transition-all ${voiceType === 'male' ? 'bg-[#d4af37] text-black' : 'bg-white/10 text-slate-400'}`}>M</button>
              </div>
            </div>

            {/* Right Side - Chat Interface */}
            <div className="flex-1 flex flex-col bg-white relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 text-slate-300 hover:text-black z-20"
              >
                <X size={24} />
              </button>

              {/* Chat Tabs - Enhanced Horizontal Scroll for Mobile Visibility */}
              <div className="flex border-b border-slate-50 px-2 sm:px-8 pt-6 overflow-x-auto agent-scrollbar whitespace-nowrap bg-white sticky top-0 z-20 pb-2 w-full">
                <button
                  onClick={(e) => handleTabClick('chat', e)}
                  className={`pb-4 px-4 sm:px-6 text-[10px] font-black uppercase tracking-widest transition-all border-b-2 flex-shrink-0 ${activeTab === 'chat' ? 'border-[#d4af37] text-[#111111]' : 'border-transparent text-slate-400'}`}
                >
                  Agent Chat
                </button>
                <button
                  onClick={(e) => handleTabClick('products', e)}
                  className={`pb-4 px-4 sm:px-6 text-[10px] font-black uppercase tracking-widest transition-all border-b-2 flex-shrink-0 ${activeTab === 'products' ? 'border-[#d4af37] text-[#111111]' : 'border-transparent text-slate-400'}`}
                >
                  Product AI
                </button>
                <button
                  onClick={(e) => handleTabClick('heritage', e)}
                  className={`pb-4 px-4 sm:px-6 text-[10px] font-black uppercase tracking-widest transition-all border-b-2 flex-shrink-0 ${activeTab === 'heritage' ? 'border-[#d4af37] text-[#111111]' : 'border-transparent text-slate-400'}`}
                >
                  Heritage Vault
                </button>
                <button
                  onClick={(e) => handleTabClick('voice', e)}
                  className={`pb-4 px-4 sm:px-6 text-[10px] font-black uppercase tracking-widest transition-all border-b-2 flex-shrink-0 ${activeTab === 'voice' ? 'border-[#d4af37] text-[#111111]' : 'border-transparent text-slate-400'}`}
                >
                  Voice Direct
                </button>
              </div>

              {/* Chat Area - Scrollable with custom scrollbar */}
              <div className="flex-1 overflow-y-auto p-8 space-y-6 agent-scrollbar bg-slate-50/30 scroll-smooth">
                {activeTab === 'heritage' ? (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto flex flex-col items-center">
                    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 w-full">
                      <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#8B0000] mb-6 flex items-center justify-center gap-3">
                        <Footprints size={18} /> Anatomical Heritage Sizing
                      </h3>
                      <p className="text-xs font-bold text-slate-500 leading-relaxed mb-6 text-center">
                        For 26 years, we've mastered the 'Nashik Arch'. Measure your foot from heel to longest toe. Our builds typically follow standard UK/Indian sizing with extra width for comfort.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { size: 'UK 6', cm: '25.1 cm', label: 'Classic' },
                          { size: 'UK 7', cm: '25.9 cm', label: 'Executive' },
                          { size: 'UK 8', cm: '26.7 cm', label: 'Standard' },
                          { size: 'UK 9', cm: '27.6 cm', label: 'Professional' },
                          { size: 'UK 10', cm: '28.4 cm', label: 'Grand' }
                        ].map(s => (
                          <div key={s.size} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex justify-between items-center group hover:bg-[#111] hover:text-[#d4af37] transition-all">
                            <div>
                                <span className="text-[11px] font-black block">{s.size}</span>
                                <span className="text-[8px] font-bold text-slate-400 uppercase group-hover:text-[#d4af37]/60">{s.label}</span>
                            </div>
                            <span className="text-[10px] font-bold opacity-60">{s.cm}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 w-full">
                      <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-800 mb-6 flex items-center justify-center gap-3">
                        <Sparkles size={18} className="text-yellow-500" /> Premium Shade Selection
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
                         <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-50 hover:bg-slate-50 transition-colors">
                           <div className="w-12 h-12 rounded-2xl bg-[#3B2F2F] shadow-lg border-2 border-white"></div>
                           <div>
                             <p className="text-[11px] font-black uppercase tracking-wider">Heritage Tan</p>
                             <p className="text-[9px] font-bold text-slate-400 uppercase">Natural Bark Extract Tanning</p>
                           </div>
                         </div>
                         <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-50 hover:bg-slate-50 transition-colors">
                           <div className="w-12 h-12 rounded-2xl bg-[#000000] shadow-lg border-2 border-white"></div>
                           <div>
                             <p className="text-[11px] font-black uppercase tracking-wider">Coal Black</p>
                             <p className="text-[9px] font-bold text-slate-400 uppercase">High-Shine Formal Finish</p>
                           </div>
                         </div>
                      </div>
                    </div>

                    <div className="bg-black/5 p-8 rounded-[2rem] border border-black/5 text-center w-full">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-2">Heritage Promise</h4>
                        <p className="text-[9px] font-bold text-slate-400 uppercase leading-loose">
                           Each pair is inspected by our senior craftsmen in Nashik.<br/>
                           Quality is not an act, it is a habit since 1998.
                        </p>
                    </div>
                  </div>
                ) : activeTab === 'products' ? (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto">
                     <div className="flex items-center justify-between mb-4 px-2">
                        <h3 className="text-xs font-black uppercase tracking-widest text-[#111111]">Intelligent Product Discovery</h3>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                            <span className="text-[9px] font-black uppercase text-slate-400">Live Inventory</span>
                        </div>
                     </div>

                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {products.length > 0 ? products.slice(0, 8).map(prod => (
                           <div
                             key={prod._id || prod.id}
                             onClick={() => { navigate(`/product/${prod._id || prod.id}`); setIsOpen(false); }}
                             className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer group"
                           >
                              <div className="w-full aspect-square bg-slate-50 rounded-3xl mb-5 overflow-hidden p-6 relative">
                                 <img src={resolveImageUrl(prod.images?.[0])} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" />
                                 <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-100">
                                    <span className="text-[8px] font-black uppercase text-slate-900">{prod.category}</span>
                                 </div>
                              </div>
                              <h4 className="text-[11px] font-black uppercase tracking-tight text-slate-900 line-clamp-1 mb-1">{prod.name}</h4>
                              <p className="text-[9px] font-bold text-slate-400 uppercase mb-3 line-clamp-1">{prod.purpose || 'Heritage Collection'}</p>
                              <div className="flex items-center justify-between mt-auto">
                                 <p className="text-[12px] font-black text-[#d4af37]">₹{prod.price?.toLocaleString()}</p>
                                 <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center group-hover:bg-[#d4af37] group-hover:text-black transition-colors">
                                    <Zap size={14} />
                                 </div>
                              </div>
                           </div>
                        )) : (
                          <div className="col-span-full py-32 text-center">
                              <Loader2 className="w-10 h-10 animate-spin mx-auto text-[#d4af37] mb-6" />
                              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Synchronizing Vault Assets...</p>
                          </div>
                        )}
                     </div>

                     <button
                        onClick={() => { navigate('/products'); setIsOpen(false); }}
                        className="w-full py-6 rounded-3xl bg-[#111] text-[#d4af37] text-[11px] font-black uppercase tracking-[0.3em] hover:bg-[#d4af37] hover:text-black transition-all shadow-xl hover:shadow-[#d4af37]/20"
                     >
                        Enter Full Product Archives
                     </button>
                  </div>
                ) : (
                  <>
                    {messages.map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] ${msg.role === 'user' ? 'bg-slate-900 text-white rounded-[1.5rem_1.5rem_0_1.5rem]' : 'bg-slate-50 text-slate-800 rounded-[1.5rem_1.5rem_1.5rem_0]'} p-5 shadow-sm`}>
                          <p className="text-sm font-bold leading-relaxed">{msg.text}</p>

                          {/* Recommendation UI */}
                          {msg.type === 'recommendation' && msg.data && (
                            <div className="mt-4 grid grid-cols-1 gap-3">
                              {msg.data.map(prod => (
                                <div
                                  key={prod._id || prod.id}
                                  onClick={() => { navigate(`/product/${prod._id || prod.id}`); setIsOpen(false); }}
                                  className="bg-white p-3 rounded-xl flex items-center gap-3 border border-slate-200 hover:border-[#8B0000] cursor-pointer group transition-all"
                                >
                                  <div className="w-12 h-12 bg-slate-50 rounded-lg overflow-hidden flex-shrink-0">
                                    <img src={resolveImageUrl(prod.images?.[0] || '/Shoes.png')} className="w-full h-full object-contain" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-[10px] font-black text-slate-900 uppercase line-clamp-1">{prod.name}</p>
                                    <p className="text-[9px] font-bold text-[#8B0000]">₹{prod.price?.toLocaleString()}</p>
                                  </div>
                                  <Zap size={12} className="text-slate-300 group-hover:text-yellow-500" />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-8 border-t border-slate-50">
                {activeTab === 'chat' ? (
                  <form onSubmit={handleChatSubmit} className="flex gap-3">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.stopPropagation()}
                      placeholder="Ask about foot size, sneakers, or latest arrivals..."
                      className="flex-1 bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-[#8B0000]/20"
                    />
                    <button
                      type="button"
                      onClick={startVoiceCommand}
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isListening ? 'bg-red-600 text-white animate-pulse' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    >
                      {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                    </button>
                    <button
                      type="submit"
                      className="w-14 h-14 bg-[#111111] text-white rounded-2xl flex items-center justify-center hover:bg-[#8B0000] transition-all"
                    >
                      <Send size={20} />
                    </button>
                  </form>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <button
                      onClick={startVoiceCommand}
                      className={`w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-xl ${isListening ? 'bg-red-600 text-white animate-pulse' : 'bg-black text-white hover:scale-105'}`}
                    >
                      {isListening ? <MicOff size={32} /> : <Mic size={32} />}
                    </button>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                      {isListening ? "Listening to your request..." : "Tap to Speak to Expert"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIGuide;

