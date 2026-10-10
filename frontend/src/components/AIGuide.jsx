import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MessageSquare, Volume2, X, Zap, User, UserCheck, Heart, ShieldCheck, Sparkles, Mic, MicOff, Send, Footprints, Search, Info } from 'lucide-react';
import { resolveImageUrl } from '../utils/urlConfig';
import { getMergedProducts } from '../utils/productUtils';
import useFetch from '../hooks/useFetch';
import { gsap } from 'gsap';

const AIGuide = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceType, setVoiceType] = useState('male');
  const [activeTab, setActiveTab] = useState('chat'); // 'chat', 'voice', or 'fit'
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Namaste! I am your Heritage Product Expert. I can help you with sizing, style advice, and finding the perfect pair from our latest collection. How can I assist you today?', type: 'text' }
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

    if (path === '/') return `Product Expert Online. Namaste ${userName}. I am your Heritage Guide. How may I assist you today?`;
    if (path.includes('/product/')) return `A masterpiece of comfort. This build features orthotic-grade support. Shall I explain the technical sole construction?`;
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
    setMessages(prev => [...prev, { role, text, type, data }]);
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
      addMessage('ai', `Namaste ${userName}! It's a pleasure to assist you. Are you looking for something specific, like our handcrafted Formal shoes for an office meeting, or perhaps our new Sneakers collection?`);
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
      { keys: ['police', 'army', 'defense', 'safety', 'industrial'], category: 'Men', purpose: 'Industrial Safety', label: 'Professional Grade Footwear' }
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

  return (
    <>
      {/* Floating Trigger */}
      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:left-8 z-[200] flex flex-col items-center gap-2">
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
          className="w-16 h-16 sm:w-20 sm:h-20 bg-[#111111] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all group relative overflow-hidden border-4 border-white"
        >
          <img
            src={expertAvatar}
            alt="Expert"
            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
            onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Expert&background=111&color=fff'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div className="absolute top-2 right-2 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white z-20"></div>
          <MessageSquare className="relative z-10 group-hover:scale-110 transition-transform" size={24} />
        </button>
        <span className="text-[9px] font-black uppercase tracking-[0.1em] text-[#8B0000] bg-white px-3 py-1 rounded-full shadow-md border border-slate-100">Product Expert</span>
      </div>

      {/* Advanced AI Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6 no-blur-zone">
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>

          <div className="bg-white w-full max-w-4xl h-[80vh] rounded-[2.5rem] overflow-hidden relative z-10 shadow-2xl border border-slate-100 flex flex-col md:flex-row">

            {/* Left Sidebar - AI Profile */}
            <div className="w-full md:w-1/3 bg-slate-50 border-r border-slate-100 p-8 flex flex-col items-center justify-center text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl mb-6 relative">
                <img src={expertAvatar} alt="Expert" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <h2 className="text-xl font-black text-[#111111] uppercase tracking-tighter mb-2">Heritage Expert</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 italic">34 Years of Craftsmanship</p>

              <div className="space-y-3 w-full">
                <div className="p-4 bg-white rounded-2xl border border-slate-100 flex items-center gap-3">
                  <ShieldCheck className="text-emerald-500" size={18} />
                  <div className="text-left">
                    <p className="text-[9px] font-black text-slate-800 uppercase">Status</p>
                    <p className="text-[10px] font-bold text-emerald-600 uppercase">Online Now</p>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-slate-100 flex items-center gap-3">
                  <Footprints className="text-[#8B0000]" size={18} />
                  <div className="text-left">
                    <p className="text-[9px] font-black text-slate-800 uppercase">Inventory Aware</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase">{products.length} Masterpieces</p>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-8 flex gap-2">
                 <button onClick={() => setVoiceType('female')} className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase transition-all ${voiceType === 'female' ? 'bg-black text-white' : 'bg-slate-200 text-slate-500'}`}>Female AI</button>
                 <button onClick={() => setVoiceType('male')} className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase transition-all ${voiceType === 'male' ? 'bg-black text-white' : 'bg-slate-200 text-slate-500'}`}>Male AI</button>
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

              {/* Chat Tabs */}
              <div className="flex border-b border-slate-50 px-8 pt-6">
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`pb-4 px-6 text-[10px] font-black uppercase tracking-widest transition-all border-b-2 ${activeTab === 'chat' ? 'border-[#8B0000] text-[#111111]' : 'border-transparent text-slate-400'}`}
                >
                  Expert Chat
                </button>
                <button
                  onClick={() => setActiveTab('voice')}
                  className={`pb-4 px-6 text-[10px] font-black uppercase tracking-widest transition-all border-b-2 ${activeTab === 'voice' ? 'border-[#8B0000] text-[#111111]' : 'border-transparent text-slate-400'}`}
                >
                  Voice Recognition
                </button>
                <button
                  onClick={() => setActiveTab('fit')}
                  className={`pb-4 px-6 text-[10px] font-black uppercase tracking-widest transition-all border-b-2 ${activeTab === 'fit' ? 'border-[#8B0000] text-[#111111]' : 'border-transparent text-slate-400'}`}
                >
                  Fit & Color Guide
                </button>
              </div>

              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                {activeTab === 'fit' ? (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                      <h3 className="text-xs font-black uppercase tracking-widest text-[#8B0000] mb-4 flex items-center gap-2">
                        <Footprints size={14} /> Proper Foot Sizing
                      </h3>
                      <p className="text-xs font-bold text-slate-600 leading-relaxed mb-4">
                        Measure your foot from heel to longest toe in centimeters for the best accuracy. Our heritage builds usually follow UK/India sizing.
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { size: 'UK 6', cm: '25.1 cm' },
                          { size: 'UK 7', cm: '25.9 cm' },
                          { size: 'UK 8', cm: '26.7 cm' },
                          { size: 'UK 9', cm: '27.6 cm' },
                          { size: 'UK 10', cm: '28.4 cm' }
                        ].map(s => (
                          <div key={s.size} className="bg-white p-3 rounded-xl border border-slate-200 flex justify-between items-center">
                            <span className="text-[10px] font-black">{s.size}</span>
                            <span className="text-[9px] font-bold text-slate-400">{s.cm}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                      <h3 className="text-xs font-black uppercase tracking-widest text-slate-800 mb-4 flex items-center gap-2">
                        <Sparkles size={14} className="text-yellow-500" /> Color Selection
                      </h3>
                      <div className="space-y-3">
                         <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-[#3B2F2F] shadow-inner"></div>
                           <div>
                             <p className="text-[10px] font-black uppercase">Heritage Tan</p>
                             <p className="text-[8px] font-bold text-slate-400 uppercase">Best for Navy & Grey Suits</p>
                           </div>
                         </div>
                         <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-[#000000] shadow-inner"></div>
                           <div>
                             <p className="text-[10px] font-black uppercase">Classic Black</p>
                             <p className="text-[8px] font-bold text-slate-400 uppercase">Essential for Formal Wear</p>
                           </div>
                         </div>
                         <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-[#1A1A2E] shadow-inner"></div>
                           <div>
                             <p className="text-[10px] font-black uppercase">Midnight Blue</p>
                             <p className="text-[8px] font-bold text-slate-400 uppercase">Modern Street Style</p>
                           </div>
                         </div>
                      </div>
                    </div>
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

