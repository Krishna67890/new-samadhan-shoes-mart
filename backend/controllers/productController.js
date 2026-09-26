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

    if (productsFromDB && productsFromDB.length > 0) {
      return res.json(productsFromDB);
    } else {
      let mockedProducts = products.map((p, index) => ({
        ...p,
        _id: `mock_id_${index}`,
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
