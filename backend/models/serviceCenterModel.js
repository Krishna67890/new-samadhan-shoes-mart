import mongoose from 'mongoose';

const serviceCenterSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String, required: true },
    whatsappNumber: { type: String, required: true },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    services: [{ type: String }],
    workingHours: { type: String, required: true },
    image: { type: String, default: '/uploads/service-center-default.png' },
    isVerified: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const ServiceCenter = mongoose.model('ServiceCenter', serviceCenterSchema);
export default ServiceCenter;
