
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search, UserCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from './AuthModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import logo from '../components/assets/logo.jpg'; // adjust path as needed


export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'New Customer Registration', path: '/register' },
    { name: 'About Us', path: '/about' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to shop with search query
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const handleProfileClick = () => {
    if (user) {
      navigate('/profile');
    } else {
      navigate('/register?message=' + encodeURIComponent('You need to register or sign in to access this section.'));
    }
  };

  return (
    <>
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
                <img
                  src={logo}
                  alt="Adey Market Logo"
                  className="w-10 h-10 rounded-full object-cover border border-ethiopian-gold"
                />
                <div>
                  <h1 className="text-xl font-bold text-ethiopian-brown">Adey Market</h1>
                  <p className="text-xs text-gray-600 -mt-1">Ethiopian Heritage</p>
                </div>
              </Link>


            {/* Desktop Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10 border-ethiopian-gold/30 focus:border-ethiopian-gold"
                />
                <Button
                  type="submit"
                  size="sm"
                  variant="ghost"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                >
                  <Search className="w-4 h-4 text-ethiopian-brown" />
                </Button>
              </form>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive(link.path)
                      ? 'text-ethiopian-red border-b-2 border-ethiopian-red'
                      : 'text-gray-700 hover:text-ethiopian-red'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 bg-ethiopian-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </Button>

              {/* Profile Icon */}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleProfileClick}
                className={`${user ? 'text-ethiopian-green' : 'text-gray-600'} hover:text-ethiopian-gold`}
              >
                <UserCircle className="w-5 h-5" />
              </Button>

              {user ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">Hi, {user.user_metadata?.full_name || user.email?.split('@')[0]}</span>
                  <Button
                    onClick={logout}
                    variant="outline"
                    size="sm"
                    className="border-ethiopian-gold text-ethiopian-brown hover:bg-ethiopian-gold/10"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-ethiopian-gold hover:bg-ethiopian-gold/90 text-ethiopian-brown"
                  size="sm"
                >
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden pb-3">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 border-ethiopian-gold/30 focus:border-ethiopian-gold"
              />
              <Button
                type="submit"
                size="sm"
                variant="ghost"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
              >
                <Search className="w-4 h-4 text-ethiopian-brown" />
              </Button>
            </form>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-3 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-ethiopian-red'
                      : 'text-gray-700 hover:text-ethiopian-red'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="pt-3 border-t">
                {user ? (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-700">Hi, {user.user_metadata?.full_name || user.email?.split('@')[0]}</p>
                    <Button
                      onClick={() => {
                        handleProfileClick();
                        setIsMenuOpen(false);
                      }}
                      variant="outline"
                      size="sm"
                      className="w-full border-ethiopian-gold text-ethiopian-brown mb-2"
                    >
                      <UserCircle className="w-4 h-4 mr-2" />
                      Profile
                    </Button>
                    <Button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      variant="outline"
                      size="sm"
                      className="w-full border-ethiopian-gold text-ethiopian-brown"
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button
                      onClick={() => {
                        handleProfileClick();
                        setIsMenuOpen(false);
                      }}
                      variant="outline"
                      size="sm"
                      className="w-full border-ethiopian-gold text-ethiopian-brown mb-2"
                    >
                      <UserCircle className="w-4 h-4 mr-2" />
                      Profile
                    </Button>
                    <Button
                      onClick={() => {
                        setIsAuthModalOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="w-full bg-ethiopian-gold hover:bg-ethiopian-gold/90 text-ethiopian-brown"
                      size="sm"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Sign In
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};
