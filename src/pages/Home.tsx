import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Coffee, Star, MapPin, Phone, Mail } from 'lucide-react';
import { products, categories } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';

export const Home: React.FC = () => {
  const featuredProducts = products.filter(product => product.featured);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background Placeholder - Will be replaced with actual video */}
        <div className="absolute inset-0 bg-gradient-to-r from-ethiopian-brown/80 via-ethiopian-brown/60 to-ethiopian-brown/80 z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-40"></div>
        
        {/* Hero Content */}
        <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
            Adey International Market
          </h1>
          <p className="text-2xl md:text-3xl mb-8 text-ethiopian-gold drop-shadow-md">
            "Bringing Ethiopian Heritage to Your Home"
          </p>
          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto text-gray-200 drop-shadow-sm">
            Discover authentic Ethiopian products, from aromatic coffee beans to traditional spices, 
            handwoven textiles, and artisanal household goods. Each item tells a story of Ethiopia's rich culture.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop">
              <Button 
                size="lg"
                className="bg-ethiopian-gold hover:bg-ethiopian-gold/90 text-ethiopian-brown font-semibold px-8 py-4 text-lg"
              >
                Shop Now
                <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
            </Link>
            <Link to="/about">
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-ethiopian-brown px-8 py-4 text-lg"
              >
                Our Story
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-ethiopian-brown mb-4">
              Featured Products
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Discover our handpicked selection of premium Ethiopian products, 
              chosen for their exceptional quality and cultural significance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/shop">
              <Button 
                size="lg"
                variant="outline"
                className="border-ethiopian-gold text-ethiopian-brown hover:bg-ethiopian-gold/10 px-8 py-3"
              >
                View All Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-ethiopian-cream/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-ethiopian-brown mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Explore our carefully curated collection of authentic Ethiopian products, 
              each category representing a unique aspect of Ethiopia's rich heritage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/shop?category=${category.id}`}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-all duration-300 border hover:border-ethiopian-gold/50 group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-ethiopian-brown mb-2 group-hover:text-ethiopian-red transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {category.description}
                </p>
                <ArrowRight className="w-5 h-5 text-ethiopian-gold mt-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Coffee Culture Section */}
      <section className="py-16 bg-gradient-to-r from-ethiopian-brown to-ethiopian-brown/90 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Coffee className="w-16 h-16 text-ethiopian-gold mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                The Birthplace of Coffee
              </h2>
              <p className="text-lg mb-6 text-gray-200">
                Ethiopia is where coffee was first discovered. Legend tells of Kaldi, a goat herder who 
                noticed his goats becoming energetic after eating certain berries. Today, the Ethiopian 
                coffee ceremony remains a cornerstone of hospitality and community.
              </p>
              <p className="text-gray-200 mb-8">
                Experience authentic Ethiopian coffee culture with our premium single-origin beans, 
                traditional jebena coffee pots, and ceremonial accessories.
              </p>
              <Link to="/shop?category=coffee">
                <Button 
                  size="lg"
                  className="bg-ethiopian-gold hover:bg-ethiopian-gold/90 text-ethiopian-brown font-semibold"
                >
                  Explore Coffee Collection
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&h=400&fit=crop"
                alt="Ethiopian Coffee"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-ethiopian-gold/20 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ethiopian-brown text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-ethiopian-gold rounded-full flex items-center justify-center">
                  <span className="text-ethiopian-brown font-bold">A</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Adey International Market</h3>
                  <p className="text-sm text-gray-300">Ethiopian Heritage</p>
                </div>
              </div>
              <p className="text-gray-300 mb-2">
                Your trusted partner for authentic Ethiopian imports.
              </p>
              <p className="text-gray-300 mb-6">
                Supplying quality you can trust, service you can count on.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-ethiopian-gold" />
                  <span className="text-sm text-gray-300">info@adeymarket.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-ethiopian-gold" />
                  <span className="text-sm text-gray-300">(555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-ethiopian-gold" />
                  <span className="text-sm text-gray-300">Address coming soon</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-ethiopian-gold">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/account" className="text-gray-300 hover:text-white transition-colors">My Account</Link></li>
                <li><Link to="/shop" className="text-gray-300 hover:text-white transition-colors">Shop</Link></li>
                <li><Link to="/register" className="text-gray-300 hover:text-white transition-colors">New Customer Registration</Link></li>
                <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>

            {/* Information */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-ethiopian-gold">Information</h4>
              <ul className="space-y-2">
                <li><Link to="/terms" className="text-gray-300 hover:text-white transition-colors">Terms & Conditions</Link></li>
                <li><Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
              
              <h4 className="text-lg font-semibold mb-4 mt-8 text-ethiopian-gold">Connect with Us</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-ethiopian-gold" />
                  <span className="text-sm text-gray-300">Newsletter coming soon</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Border */}
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 Adey International Market. All rights reserved. | Bringing Ethiopian Heritage to Your Home
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
