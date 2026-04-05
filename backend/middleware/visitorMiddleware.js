import Visitor from '../models/visitorModel.js';

const trackVisitor = async (req, res, next) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const page = req.originalUrl;
    const userAgent = req.headers['user-agent'];

    await Visitor.create({ ip, page, userAgent });
  } catch (error) {
    console.error('Error tracking visitor:', error);
  } finally {
    next();
  }
};

export default trackVisitor;
