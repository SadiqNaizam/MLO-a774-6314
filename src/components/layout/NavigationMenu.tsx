import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, Menu as MenuIcon, X, Utensils, ClipboardList } from 'lucide-react'; // Added MenuIcon and X

interface NavigationMenuProps {
  appName?: string;
  // Add more props as needed, e.g., for user authentication status
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ appName = "FoodApp" }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  console.log("Rendering NavigationMenu. Mobile menu open:", isMobileMenuOpen);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/orders", label: "My Orders", icon: <ClipboardList className="mr-2 h-4 w-4 sm:hidden" /> },
    // Add more navigation links here
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-orange-600 flex items-center">
              <Utensils className="h-7 w-7 mr-2" />
              {appName}
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Icons and User Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/cart">
              <Button variant="ghost" size="icon" aria-label="Cart">
                <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-orange-600" />
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" size="icon" aria-label="User Profile">
                <User className="h-6 w-6 text-gray-700 hover:text-orange-600" />
              </Button>
            </Link>
            {/* Conditional Login/Logout Button */}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Link to="/cart" className="md:hidden mr-2">
              <Button variant="ghost" size="icon" aria-label="Cart">
                <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-orange-600" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-white shadow-lg z-40 p-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={`mobile-${link.label}`}
                to={link.href}
                className="flex items-center text-gray-700 hover:bg-orange-50 hover:text-orange-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.icon} {link.label}
              </Link>
            ))}
             <Link
                to="/profile"
                className="flex items-center text-gray-700 hover:bg-orange-50 hover:text-orange-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User className="mr-2 h-4 w-4 sm:hidden" /> Profile
              </Link>
            {/* Add other actions like Logout for mobile */}
          </div>
        </div>
      )}
    </nav>
  );
};
export default NavigationMenu;