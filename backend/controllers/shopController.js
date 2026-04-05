import Shop from '../models/shopModel.js';

// @desc    Get all shops (with search and city filter)
export const getShops = async (req, res) => {
  try {
    const { search, city } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    if (city) {
      query.city = { $regex: city, $options: 'i' };
    }

    const shops = await Shop.find(query).sort({ rating: -1 });
    res.json(shops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get shop by ID
export const getShopById = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id).populate('reviews.user', 'name');
    if (shop) {
      res.json(shop);
    } else {
      res.status(404).json({ message: 'Shop not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new shop (Admin Only)
export const createShop = async (req, res) => {
  try {
    const { name, address, city, phone, whatsappNumber, description, images } = req.body;
    const shop = new Shop({
      name, address, city, phone, whatsappNumber, description, images,
      isVerified: true
    });
    const createdShop = await shop.save();
    res.status(201).json(createdShop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a shop
export const updateShop = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (shop) {
      Object.assign(shop, req.body);
      const updatedShop = await shop.save();
      res.json(updatedShop);
    } else {
      res.status(404).json({ message: 'Shop not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a shop
export const deleteShop = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (shop) {
      await shop.deleteOne();
      res.json({ message: 'Shop removed' });
    } else {
      res.status(404).json({ message: 'Shop not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
