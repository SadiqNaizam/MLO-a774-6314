import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  console.log("Rendering Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <Link to="/" className="flex items-center mb-4 text-xl font-bold text-orange-600">
              <Utensils className="h-6 w-6 mr-2" />
              FoodApp
            </Link>
            <p className="text-sm text-gray-600">
              Your favorite meals, delivered fast and fresh to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-gray-600 hover:text-orange-600">About Us</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-600 hover:text-orange-600">Contact</Link></li>
              <li><Link to="/faq" className="text-sm text-gray-600 hover:text-orange-600">FAQ</Link></li>
              <li><Link to="/terms" className="text-sm text-gray-600 hover:text-orange-600">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-500"><span className="sr-only">Facebook</span><Facebook className="h-6 w-6" /></a>
              <a href="#" className="text-gray-400 hover:text-orange-500"><span className="sr-only">Twitter</span><Twitter className="h-6 w-6" /></a>
              <a href="#" className="text-gray-400 hover:text-orange-500"><span className="sr-only">Instagram</span><Instagram className="h-6 w-6" /></a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} FoodApp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;