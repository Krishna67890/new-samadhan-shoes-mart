import React, { useState, useEffect, useRef } from 'react';
import { Star, ShieldCheck, ThumbsUp, Trash2, Send, User } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  getReviewsByProduct,
  saveReview,
  deleteReview,
  calculateProductStats,
  voteHelpful
} from '../utils/reviewService';

gsap.registerPlugin(ScrollTrigger);

const Reviews = ({ productId, isAdmin = false }) => {
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({ average: 0, total: 0, breakdown: {} });
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('recent');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    review: '',
    style: 'classic'
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const listRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    loadData();
  }, [productId]);

  const loadData = () => {
    const data = getReviewsByProduct(productId);
    setReviews(data);
    setStats(calculateProductStats(productId));
    setLoading(false);
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'recent') return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === 'highest') return b.rating - a.rating;
    if (sortBy === 'lowest') return a.rating - b.rating;
    if (sortBy === 'helpful') return (b.helpful || 0) - (a.helpful || 0);
    return 0;
  });

  const handleRatingClick = (val) => setFormData({ ...formData, rating: val });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.review) return alert("Please fill all fields");

    setIsSubmitting(true);

    const initials = formData.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);

    const newReview = saveReview({
      productId,
      name: formData.name,
      rating: formData.rating,
      review: formData.review,
      avatar: initials,
      style: formData.style
    });

    setTimeout(() => {
      setReviews(prev => [newReview, ...prev]);
      setStats(calculateProductStats(productId));
      setFormData({ name: '', rating: 5, review: '', style: 'classic' });
      setIsSubmitting(false);
      setShowSuccess(true);

      // Animate new review
      setTimeout(() => {
         const firstReview = listRef.current?.firstChild;
         if (firstReview) {
            gsap.from(firstReview, {
              y: 40,
              opacity: 0,
              scale: 0.95,
              duration: 0.6,
              ease: "power3.out"
            });
         }
         setShowSuccess(false);
      }, 100);
    }, 800);
  };

  const handleDelete = (id) => {
    if (window.confirm("Remove this review? This action cannot be undone.")) {
      const el = document.getElementById(`review-${id}`);
      gsap.to(el, {
        opacity: 0,
        x: 80,
        height: 0,
        duration: 0.4,
        onComplete: () => {
          deleteReview(id);
          loadData();
        }
      });
    }
  };

  const handleHelpful = (id) => {
    if (voteHelpful(id)) {
      loadData();
    }
  };

  if (loading) return null;

  return (
    <div className="w-full mt-32 border-t border-[#111]/5 pt-32">
      <div className="grid lg:grid-cols-3 gap-24">

        {/* LEFT: RATINGS SUMMARY */}
        <div className="lg:col-span-1 space-y-10">
          <div>
            <span className="text-[#8B0000] font-black uppercase tracking-[0.4em] text-[10px] block mb-6">// SATISFACTION INDEX</span>
            <h2 className="text-6xl font-editorial font-black uppercase tracking-tighter text-[#111]">Customer <br /> Ratings</h2>
          </div>

          <div className="bg-white p-12 rounded-[3rem] border border-[#111]/5 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B0000]/5 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>

            <div className="relative z-10">
              <div className="flex items-baseline gap-4 mb-4">
                <span className="text-8xl font-black text-[#111] tracking-tighter tabular-nums">{stats.average || '0.0'}</span>
                <span className="text-xl font-bold text-[#6B6B6B] uppercase tracking-widest">/ 5.0</span>
              </div>

              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={24}
                    className={`${i < Math.floor(stats.average) ? 'fill-[#8B0000] text-[#8B0000]' : 'text-[#111]/10'}`}
                  />
                ))}
              </div>

              <p className="text-[10px] font-black text-[#6B6B6B] uppercase tracking-[0.2em] mb-12">
                Based on {stats.total} {stats.total === 1 ? 'Customer Experience' : 'Global Reviews'}
              </p>

              <div className="space-y-5">
                {[5, 4, 3, 2, 1].map(num => (
                  <div key={num} className="flex items-center gap-6">
                    <span className="text-[10px] font-bold w-4 text-[#111]">{num}★</span>
                    <div className="flex-1 h-1.5 bg-[#F7F5F0] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#8B0000] transition-all duration-1000"
                        style={{ width: `${stats.breakdown[num] || 0}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-[#6B6B6B] w-8 text-right">{stats.breakdown[num] || 0}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {stats.total === 0 && (
            <div className="p-8 border border-dashed border-[#8B0000]/30 rounded-[2rem] bg-[#8B0000]/5 text-center">
              <Star size={32} className="mx-auto text-[#8B0000] mb-4 opacity-40" />
              <h4 className="font-bold uppercase text-xs tracking-widest mb-2">Be the First</h4>
              <p className="text-[10px] text-[#6B6B6B] leading-relaxed uppercase font-medium">Your experience can help the next customer make the right choice.</p>
            </div>
          )}
        </div>

        {/* RIGHT: SUBMISSION FORM */}
        <div className="lg:col-span-2">
          <div className="bg-white p-12 md:p-16 rounded-[4rem] border border-[#111]/5 shadow-2xl relative">
            <h3 className="text-4xl font-editorial font-black uppercase tracking-tighter mb-10 text-[#111]">Share Your Experience</h3>

            <form onSubmit={handleSubmit} className="space-y-10" ref={formRef}>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#6B6B6B]">How would you rate this product?</label>
                <div className="flex gap-4">
                  {[1, 2, 3, 4, 5].map(num => (
                    <button
                      key={num}
                      type="button"
                      onMouseEnter={() => setHoverRating(num)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => handleRatingClick(num)}
                      className="transition-transform hover:scale-125"
                    >
                      <Star
                        size={32}
                        className={`${(hoverRating || formData.rating) >= num ? 'fill-[#8B0000] text-[#8B0000]' : 'text-[#111]/10'} transition-colors`}
                      />
                    </button>
                  ))}
                  <span className="ml-4 text-2xl font-black text-[#111]">{formData.rating} / 5</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#6B6B6B]">Your Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    required
                    className="w-full bg-[#F7F5F0] border-0 rounded-2xl p-6 text-sm font-bold focus:ring-2 focus:ring-[#8B0000] transition-all outline-none"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#6B6B6B]">Review Style</label>
                  <div className="flex gap-3">
                    {['classic', 'minimal', 'elegant'].map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setFormData({ ...formData, style: s })}
                        className={`flex-1 py-3 px-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${formData.style === s ? 'bg-[#111] text-white border-[#111]' : 'bg-transparent text-[#6B6B6B] border-[#111]/10'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#6B6B6B]">Your Review</label>
                  <span className="text-[9px] font-bold text-[#6B6B6B]">{formData.review.length} / 500</span>
                </div>
                <textarea
                  value={formData.review}
                  onChange={(e) => setFormData({ ...formData, review: e.target.value.substring(0, 500) })}
                  placeholder="Tell other customers about your experience..."
                  required
                  rows="4"
                  className="w-full bg-[#F7F5F0] border-0 rounded-[2rem] p-8 text-sm font-medium leading-relaxed focus:ring-2 focus:ring-[#8B0000] transition-all outline-none resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-8 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-4 shadow-xl ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#111] text-white hover:bg-[#8B0000]'}`}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>POST REVIEW <Send size={16} /></>
                )}
              </button>

              {showSuccess && (
                <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-[4rem] flex flex-col items-center justify-center text-center p-12 z-20 animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                    <ShieldCheck size={40} />
                  </div>
                  <h4 className="text-3xl font-editorial font-black uppercase mb-4 text-[#111]">Thank You!</h4>
                  <p className="text-[#6B6B6B] font-bold uppercase tracking-widest text-xs">Your review has been published.</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* REVIEWS LIST */}
      <div className="mt-40 max-w-5xl mx-auto space-y-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-[#111]/5 pb-12">
          <h4 className="text-2xl font-editorial font-black uppercase tracking-tight">Recent Feedback ({reviews.length})</h4>

          <div className="flex items-center gap-6">
            <span className="text-[10px] font-black text-[#6B6B6B] uppercase tracking-widest">Sort By</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer border-b-2 border-[#8B0000] pb-1"
            >
              <option value="recent">Most Recent</option>
              <option value="highest">Highest Rated</option>
              <option value="lowest">Lowest Rated</option>
              <option value="helpful">Most Helpful</option>
            </select>
          </div>
        </div>

        <div className="space-y-12" ref={listRef}>
          {sortedReviews.length > 0 ? (
            sortedReviews.map((rev) => (
              <div
                key={rev.id}
                id={`review-${rev.id}`}
                className={`group p-12 md:p-16 rounded-[4rem] border border-[#111]/5 transition-all hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden bg-white ${
                  rev.style === 'elegant' ? 'border-l-8 border-l-[#8B0000]' :
                  rev.style === 'minimal' ? 'border-0 bg-[#F7F5F0]' : ''
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-10">
                  <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center text-xl font-black transition-transform group-hover:scale-110 shrink-0 ${
                    rev.style === 'minimal' ? 'bg-[#111] text-white' : 'bg-[#8B0000] text-white'
                  }`}>
                    {rev.avatar || <User size={24} />}
                  </div>

                  <div className="flex-1 space-y-6">
                    <div className="flex flex-wrap justify-between items-start gap-4">
                      <div>
                        <h5 className="text-xl font-editorial font-black uppercase tracking-tight text-[#111]">{rev.name}</h5>
                        <div className="flex gap-1 mt-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={`${i < rev.rating ? 'fill-[#8B0000] text-[#8B0000]' : 'text-[#111]/10'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-widest opacity-60">
                        {new Date(rev.createdAt).toLocaleDateString('en-US', {
                          month: 'long', day: 'numeric', year: 'numeric'
                        })}
                      </span>
                    </div>

                    <p className={`text-lg leading-relaxed text-[#111] ${rev.style === 'elegant' ? 'italic font-serif' : 'font-medium'}`}>
                      "{rev.review}"
                    </p>

                    <div className="flex flex-wrap items-center gap-10 pt-6 border-t border-[#111]/5">
                      <button
                        onClick={() => handleHelpful(rev.id)}
                        className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-[#6B6B6B] hover:text-[#8B0000] transition-colors"
                      >
                        <ThumbsUp size={14} /> Helpful {rev.helpful > 0 && <span>({rev.helpful})</span>}
                      </button>

                      <div className="flex items-center gap-2 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                        <ShieldCheck size={14} /> Verified Purchase
                      </div>

                      {isAdmin && (
                        <button
                          onClick={() => handleDelete(rev.id)}
                          className="ml-auto text-[#8B0000] flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:bg-[#8B0000] hover:text-white px-4 py-2 rounded-xl transition-all"
                        >
                          <Trash2 size={14} /> Remove Review
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-32 text-center bg-gray-50 rounded-[4rem] border border-dashed border-gray-200">
              <Star size={64} className="mx-auto text-gray-200 mb-8" />
              <h5 className="text-2xl font-editorial font-black uppercase text-gray-300">No testimonials yet.</h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
