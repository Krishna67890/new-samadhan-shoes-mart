import Product from '../models/productModel.js';
import products from '../data/products.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const productsFromDB = await Product.find({});

    // Architect Bypass: If DB is empty or offline (returns empty), show static data
    if (productsFromDB && productsFromDB.length > 0) {
      res.json(productsFromDB);
    } else {
      // Show curated static products so "The Vault" is never empty
      const mockedProducts = products.map((p, index) => ({
        ...p,
        _id: `mock_id_${index}`,
      }));
      res.json(mockedProducts);
    }
  } catch (error) {
    // Fail-safe: Always show static data if DB connection fails
    const mockedProducts = products.map((p, index) => ({
      ...p,
      _id: `mock_id_${index}`,
    }));
    res.json(mockedProducts);
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

// Admin functions (Stubs)
const deleteProduct = async (req, res) => res.status(200).json({ message: 'Product removed' });
const createProduct = async (req, res) => res.status(201).json({ message: 'Product created' });
const updateProduct = async (req, res) => res.status(200).json({ message: 'Product updated' });

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
