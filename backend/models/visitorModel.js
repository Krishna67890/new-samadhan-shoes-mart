import mongoose from 'mongoose';

const visitorSchema = mongoose.Schema({
  ip: String,
  page: String,
  userAgent: String,
  visitedAt: {
    type: Date,
    default: Date.now,
  },
});

const Visitor = mongoose.model('Visitor', visitorSchema);
export default Visitor;
