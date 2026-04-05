import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { Truck, ArrowLeft, CheckCircle, Clock, ExternalLink, Loader2 } from 'lucide-react';

const AdminOrders = () => {
  const { loading, error, request } = useFetch();
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const data = await request('/api/orders');
      setOrders(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [request]);

  const deliverHandler = async (id) => {
    try {
      await request(`/api/orders/${id}/deliver`, 'PUT');
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <button onClick={() => navigate('/admin')} className="mr-4 p-2 hover:bg-gray-100 rounded-full transition">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Customer Orders</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="p-10 text-center text-red-600 bg-red-50">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-bold tracking-wider">
                <tr>
                  <th className="px-6 py-4">ORDER ID</th>
                  <th className="px-6 py-4">USER</th>
                  <th className="px-6 py-4">DATE</th>
                  <th className="px-6 py-4">TOTAL</th>
                  <th className="px-6 py-4">PAID</th>
                  <th className="px-6 py-4">DELIVERED</th>
                  <th className="px-6 py-4">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-mono text-xs text-gray-400">{order._id.substring(10).toUpperCase()}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className="font-bold text-gray-800">{order.user && order.user.name}</p>
                        <p className="text-gray-400 text-xs">{order.user && order.user.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900">₹{order.totalPrice}</td>
                    <td className="px-6 py-4">
                      {order.isPaid ? (
                        <div className="flex items-center text-green-600 font-medium text-sm">
                           <CheckCircle className="w-4 h-4 mr-1" /> {new Date(order.paidAt).toLocaleDateString()}
                        </div>
                      ) : (
                        <div className="flex items-center text-red-500 font-medium text-sm">
                           <Clock className="w-4 h-4 mr-1" /> Pending
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {order.isDelivered ? (
                        <div className="flex items-center text-green-600 font-medium text-sm">
                           <CheckCircle className="w-4 h-4 mr-1" /> {new Date(order.deliveredAt).toLocaleDateString()}
                        </div>
                      ) : (
                        <div className="flex items-center text-orange-500 font-medium text-sm">
                           <Truck className="w-4 h-4 mr-1" /> In Transit
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        {!order.isDelivered && order.isPaid && (
                          <button
                            onClick={() => deliverHandler(order._id)}
                            className="bg-primary text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-800 transition"
                          >
                            Mark Delivered
                          </button>
                        )}
                        <button className="p-2 text-gray-400 hover:text-primary transition" title="View Details">
                           <ExternalLink className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan="7" className="px-6 py-10 text-center text-gray-500">No orders found.</td>
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

export default AdminOrders;
