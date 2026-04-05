import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import useFetch from '../hooks/useFetch';
import { Edit, Trash2, Plus, ArrowLeft, Search, Loader2, AlertCircle, Package } from 'lucide-react';

const AdminProductList = () => {
  const { loading, error, request } = useFetch();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const listRef = useRef(null);

  const fetchProducts = async () => {
    try {
      const data = await request('/api/products');
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [request]);

  useEffect(() => {
    if (!loading && products.length > 0) {
      gsap.from('.product-row', {
        x: -20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power2.out'
      });
    }
  }, [loading, products]);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await request(`/api/products/${id}`, 'DELETE');
        fetchProducts(); // Refresh list
      } catch (err) {
        console.error(err);
      }
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <button onClick={() => navigate('/admin')} className="mr-4 p-2 hover:bg-gray-100 rounded-full transition">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Manage Products</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary outline-none transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link to="/admin/product/new" className="btn-primary flex items-center w-full md:w-auto justify-center">
            <Plus className="w-5 h-5 mr-2" /> Add New Product
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="p-10 text-center text-red-600 bg-red-50 flex flex-col items-center">
             <AlertCircle className="w-12 h-12 mb-2" />
             <p>{error}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-bold tracking-wider">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">NAME</th>
                  <th className="px-6 py-4">BRAND</th>
                  <th className="px-6 py-4">PRICE</th>
                  <th className="px-6 py-4">STOCK</th>
                  <th className="px-6 py-4">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100" ref={listRef}>
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="product-row hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-mono text-xs text-gray-400">{product._id.substring(10)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img src={product.images[0]} alt="" className="w-10 h-10 object-cover rounded mr-3 border" />
                        <span className="font-bold text-gray-800">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{product.brand}</td>
                    <td className="px-6 py-4 font-bold">₹{product.price}</td>
                    <td className="px-6 py-4">
                       <span className={`px-2 py-1 rounded-full text-xs font-bold ${product.stock > 10 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                         {product.stock} in stock
                       </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-3">
                        <Link
                          to={`/admin/product/${product._id}/edit`}
                          className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                          title="Edit"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>
                        <button
                          onClick={() => deleteHandler(product._id)}
                          className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-10 text-center text-gray-500">No products found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProductList;
