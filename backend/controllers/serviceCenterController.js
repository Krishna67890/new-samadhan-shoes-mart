import ServiceCenter from '../models/serviceCenterModel.js';

const staticServiceCenters = [
  {
    _id: 'sc1',
    name: 'Samadhan Restoration Hub - Pune Node',
    address: 'S-12, Premium Tech Park, Hinjewadi',
    city: 'Pune',
    phone: '+91 7058564508',
    whatsappNumber: '917058564508',
    rating: 4.9,
    numReviews: 1240,
    services: ['Deep Clean', 'Sole Repair', 'Color Restor'],
    workingHours: '10:00 AM - 09:00 PM',
    image: 'https://images.unsplash.com/photo-1597075095400-0e76865231c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    isVerified: true
  },
  {
    _id: 'sc2',
    name: 'Luxury Sneaker Lab - Mumbai Node',
    address: 'Floor 4, High Street Phoenix, Lower Parel',
    city: 'Mumbai',
    phone: '+91 7058564508',
    whatsappNumber: '917058564508',
    rating: 4.8,
    numReviews: 850,
    services: ['Sole Swap', 'Authentication', 'Full Restore'],
    workingHours: '11:00 AM - 10:00 PM',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    isVerified: true
  },
  {
    _id: 'sc3',
    name: 'Artisan Sole Studio - Delhi Node',
    address: 'Block C, DLF Cyber City, Gurgaon',
    city: 'Delhi',
    phone: '+91 7058564508',
    whatsappNumber: '917058564508',
    rating: 4.7,
    numReviews: 620,
    services: ['Custom Paint', 'Waterproofing', 'Odor Control'],
    workingHours: '09:00 AM - 08:00 PM',
    image: 'https://images.unsplash.com/photo-1449247704656-13621df5ee70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    isVerified: true
  }
];

// @desc    Fetch all service centers
// @route   GET /api/service-centers
// @access  Public
const getServiceCenters = async (req, res) => {
  try {
    const { city, search } = req.query;
    let query = {};

    if (city) {
      query.city = { $regex: city, $options: 'i' };
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { address: { $regex: search, $options: 'i' } }
      ];
    }

    let centers = [];
    try {
      centers = await ServiceCenter.find(query);
      if (!centers || centers.length === 0) {
        centers = staticServiceCenters.filter(c =>
          (!city || c.city.toLowerCase().includes(city.toLowerCase())) &&
          (!search || c.name.toLowerCase().includes(search.toLowerCase()) || c.address.toLowerCase().includes(search.toLowerCase()))
        );
      }
    } catch (dbError) {
      console.error("DB Fetch Failed for Service Centers, using fallback:", dbError.message);
      centers = staticServiceCenters.filter(c =>
        (!city || c.city.toLowerCase().includes(city.toLowerCase())) &&
        (!search || c.name.toLowerCase().includes(search.toLowerCase()) || c.address.toLowerCase().includes(search.toLowerCase()))
      );
    }

    res.json(centers);
  } catch (error) {
    console.error("Critical Service Center Error:", error);
    res.status(500).json({ message: 'Server Error fetching service centers', error: error.message });
  }
};

// @desc    Fetch single service center
// @route   GET /api/service-centers/:id
// @access  Public
const getServiceCenterById = async (req, res) => {
  try {
    let center;
    try {
      center = await ServiceCenter.findById(req.params.id);
    } catch (e) {}

    if (!center) {
      center = staticServiceCenters.find(c => c._id === req.params.id);
    }

    if (center) {
      res.json(center);
    } else {
      res.status(404).json({ message: 'Service Center not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export { getServiceCenters, getServiceCenterById };

export { getServiceCenters, getServiceCenterById };
