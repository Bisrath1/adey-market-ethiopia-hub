import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { useCartStore } from '@/stores/cartStore';
import { Menu, User, LogOut, ShoppingCart, Shield, Search, X } from 'lucide-react';
import { AuthModal } from './AuthModal';
import logo from './assets/logo.jpg';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { isAdmin } = useUserRole();
  const { totalItems } = useCartStore();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Register', path: '/register' },
  ];

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

            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10 border-ethiopian-gold/30 focus:border-ethiopian-gold"
                />
                <Button type="submit" size="sm" variant="ghost" className="absolute right-0 top-0 h-full px-3">
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
                    isActive(link.path) ? 'text-ethiopian-gold' : 'text-gray-700 hover:text-ethiopian-gold'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {/* {user && (
                <Link to="/customer-dashboard" className={`text-sm font-medium transition-colors ${
                  isActive('/customer-dashboard') ? 'text-ethiopian-gold' : 'text-gray-700 hover:text-ethiopian-gold'
                }`}>
                  Dashboard
                </Link>
              )} */}
              {isAdmin && (
                <Link to="/admin-dashboard" className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                  isActive('/admin-dashboard') ? 'text-ethiopian-gold' : 'text-gray-700 hover:text-ethiopian-gold'
                }`}>
                  <Shield className="w-4 h-4" />
                  Admin
                </Link>
              )}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {user && (
                <Link to="/cart" className="relative">
                  <Button variant="ghost" size="sm">
                    <ShoppingCart className="w-5 h-5" />
                    {totalItems > 0 && (
                      <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs p-0">
                        {totalItems}
                      </Badge>
                    )}
                  </Button>
                </Link>
              )}
              {user ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">Hi, {user.email?.split('@')[0]}</span>
                  <Button onClick={logout} variant="outline" size="sm">
                    <LogOut className="w-4 h-4 mr-1" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Button onClick={() => setIsAuthModalOpen(true)} size="sm" className="bg-ethiopian-gold hover:bg-ethiopian-gold/90">
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-3">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
              <Button type="submit" size="sm" variant="ghost" className="absolute right-0 top-0 h-full px-3">
                <Search className="w-4 h-4" />
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
                  className={`block text-sm font-medium ${isActive(link.path) ? 'text-ethiopian-gold' : 'text-gray-700'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {user && (
                <>
                  <Link to="/customer-dashboard" className="block text-sm font-medium text-gray-700" onClick={() => setIsMenuOpen(false)}>
                    Dashboard
                  </Link>
                  <Link to="/cart" className="block text-sm font-medium text-gray-700 flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                    <ShoppingCart className="w-4 h-4" />
                    Cart {totalItems > 0 && `(${totalItems})`}
                  </Link>
                </>
              )}
              {isAdmin && (
                <Link to="/admin-dashboard" className="block text-sm font-medium text-gray-700 flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                  <Shield className="w-4 h-4" />
                  Admin Dashboard
                </Link>
              )}
              <div className="pt-3 border-t">
                {user ? (
                  <Button onClick={() => { logout(); setIsMenuOpen(false); }} variant="outline" size="sm" className="w-full">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                ) : (
                  <Button onClick={() => { setIsAuthModalOpen(true); setIsMenuOpen(false); }} size="sm" className="w-full">
                    <User className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};