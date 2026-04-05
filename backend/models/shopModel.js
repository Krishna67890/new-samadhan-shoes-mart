import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const shopSchema = mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  phone: { type: String, required: true },
  whatsappNumber: { type: String, required: true, default: '918080690631' },
  description: { type: String },
  category: { type: String, default: 'Shoe Dealer' },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  images: [{ type: String }],
  isVerified: { type: Boolean, default: false },
  offers: { type: String, default: 'Up to 20% Off on First Visit' },
  reviews: [reviewSchema],
}, { timestamps: true });

const Shop = mongoose.model('Shop', shopSchema);
export default Shop;
