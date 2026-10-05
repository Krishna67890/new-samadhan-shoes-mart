import Product from '../models/productModel.js';
import products from '../data/products.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};
    if (category && category !== 'All') {
      if (category === 'Men') {
        query = { $or: [{ category: 'Men' }, { targetGender: 'Men' }, { category: 'Formal' }] };
      } else if (category === 'Women') {
        query = { $or: [{ category: 'Women' }, { targetGender: 'Women' }] };
      } else if (category === 'Kids') {
        query = { $or: [{ category: 'Kids' }, { targetGender: 'Kids' }] };
      } else {
        query = { category };
      }
    }

    const productsFromDB = await Product.find(query);

    // If owner has added ANY product, only show DB products to ensure sync across devices
    if (productsFromDB && productsFromDB.length > 0) {
      return res.json(productsFromDB);
    } else {
      // Only show mock products if the DB is completely empty (initial state)
      const mockedProducts = products.map((p, index) => ({
        ...p,
        _id: `mock_id_${index}`,
        isMock: true
      }));
      if (category && category !== 'All') {
        mockedProducts = mockedProducts.filter(p => {
          if (category === 'Men') return p.category === 'Men' || p.targetGender === 'Men' || p.category === 'Formal';
          if (category === 'Women') return p.category === 'Women' || p.targetGender === 'Women';
          if (category === 'Kids') return p.category === 'Kids' || p.targetGender === 'Kids';
          return p.category?.toLowerCase() === category.toLowerCase();
        });
      }
      return res.json(mockedProducts);
    }
  } catch (error) {
    let mockedProducts = products.map((p, index) => ({
      ...p,
      _id: `mock_id_${index}`,
    }));
    const { category } = req.query;
    if (category && category !== 'All') {
      mockedProducts = mockedProducts.filter(p => {
        if (category === 'Men') return p.category === 'Men' || p.targetGender === 'Men' || p.category === 'Formal';
        if (category === 'Women') return p.category === 'Women' || p.targetGender === 'Women';
        if (category === 'Kids') return p.category === 'Kids' || p.targetGender === 'Kids';
        return p.category?.toLowerCase() === category.toLowerCase();
      });
    }
    return res.json(mockedProducts);
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    // Try DB first
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      const product = await Product.findById(req.params.id);
      if (product) return res.json(product);
    }

    // Try Static Fallback
    const staticProduct = products.find((p, index) => `mock_id_${index}` === req.params.id);
    if (staticProduct) {
      res.json({ ...staticProduct, _id: req.params.id });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    // 1. Try deleting by DB ID
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      const product = await Product.findById(req.params.id);
      if (product) {
        await Product.deleteOne({ _id: product._id });
        return res.json({ message: 'Product removed from Global Vault' });
      }
    }

    // 2. Handle Mock/Fallback Deletion
    res.status(404).json({
      message: 'Product not found in Global Database. If this was a Demo product, it has been removed from your local view.',
      isDemo: true
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const { name, price, description, images, brand, sizes, stock, category, targetGender } = req.body;

    // Validation: Ensure no blob URLs are being saved to the permanent database
    if (images && images.some(img => img.startsWith('blob:'))) {
      return res.status(400).json({ message: 'Critical Error: One or more images failed to upload to the server. Products with "blob:" links cannot be saved globally.' });
    }

    const product = new Product({
      name,
      price,
      user: req.user._id,
      images: images || ['/images/sample.jpg'],
      brand,
      category: category || 'Formal',
      targetGender: targetGender || 'Men',
      sizes: sizes || [6, 7, 8, 9, 10],
      stock,
      numReviews: 0,
      description,
    });

    const createdProduct = await product.save();
    console.log(`✅ [Database] Product Created: ${createdProduct.name} by ${req.user.name}`);
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error('❌ [Database] Create Error:', error.message);
    res.status(500).json({ message: `Database Save Failed: ${error.message}. Ensure your MongoDB Atlas connection is active.` });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const { name, price, description, images, brand, sizes, stock, category, targetGender } = req.body;

    // Only attempt DB lookups for valid ObjectIds to prevent crashes
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid Product ID format. This is likely a local demo product that cannot be updated globally yet.' });
    }

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.images = images || product.images;
      product.brand = brand || product.brand;
      product.category = category || product.category;
      product.targetGender = targetGender || product.targetGender;
      product.sizes = sizes || product.sizes;
      product.stock = stock || product.stock;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found in Global Vault' });
    }
  } catch (error) {
    console.error('❌ [Database] Update Error:', error.message);
    res.status(500).json({ message: `Database Update Failed: ${error.message}` });
  }
};

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
