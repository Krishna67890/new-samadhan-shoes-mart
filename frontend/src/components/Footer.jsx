import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Footer = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleWhatsAppClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      navigate('/login');
      return;
    }

    // BLOCK WHATSAPP IF IDENTITY NOT VERIFIED
    if (user?.role !== 'admin' && !user?.identityVerified) {
      e.preventDefault();
      navigate('/identity');
    }
  };
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4 text-secondary">NEW SAMADHAN SHOES MART</h2>
          <p className="text-gray-400">
            Step into comfort and style. Your one-stop shop for premium quality shoes for every occasion.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
            <li><Link to="/products" className="text-gray-400 hover:text-white">Shop All</Link></li>
            <li><Link to="/service" className="text-gray-400 hover:text-white">Service Centre</Link></li>
            <li><Link to="/dashboard" className="text-gray-400 hover:text-white">My Account</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Customer Care</h3>
          <ul className="space-y-2 text-gray-400">
            <li>Support: 8080690631 (Developer)</li>
            <li>Sales 1: 9423228843 (Shopkeeper)</li>
            <li>Sales 2: 8888644021 (Shopkeeper)</li>
            <li>Email: dhanadai.krishna@gmail.com</li>
            <li>Address: Plot No 29, Santkrupa Niwas, Swami Samarth Nagar, Chha. Sambhajinagar Road, Nashik 422003</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-secondary"><Facebook /></a>
            <a href="#" className="hover:text-secondary"><Instagram /></a>
            <a href="#" className="hover:text-secondary"><Twitter /></a>
            <a href="https://wa.me/919423228843" target="_blank" rel="noopener noreferrer" onClick={handleWhatsAppClick} className="hover:text-green-500"><MessageCircle /></a>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-800 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} New Samadhan Shoes Mart. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
