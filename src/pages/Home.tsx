import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Coffee, Star, MapPin, Phone, Mail } from 'lucide-react';
import { categories } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { useFeaturedProducts } from '@/hooks/useFeaturedProducts';

const Home: React.FC = () => {
  const { featuredProducts, loading, error } = useFeaturedProducts();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover transform scale-105 animate-slow-zoom"
          >
            <source
              src="https://videos.pexels.com/video-files/3843433/3843433-uhd_2560_1440_30fps.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop')] bg-cover bg-center"></div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-ethiopian-brown/85 via-ethiopian-brown/70 to-ethiopian-brown/85 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ethiopian-brown/30 z-10"></div>

        <div className="relative z-20 text-center text-white max-w-5xl mx-auto px-4 animate-fade-in-up">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 drop-shadow-2xl tracking-tight leading-none bg-gradient-to-r from-white via-ethiopian-cream to-white bg-clip-text">
            Adey International Market
          </h1>
          <p className="text-3xl md:text-4xl mb-8 text-ethiopian-gold drop-shadow-lg font-medium animate-fade-in-delayed">
            "Bringing Ethiopian Heritage to Your Home"
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-buttons">
            <Link to="/shop">
              <Button
                size="lg"
                className="bg-ethiopian-gold hover:bg-ethiopian-gold/90 text-ethiopian-brown font-semibold px-10 py-6 text-xl transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-ethiopian-gold/25 group"
              >
                Shop Now
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/about">
              <Button
                variant="outline"
                size="lg"
                className="border-3 border-white text-white hover:bg-white hover:text-ethiopian-brown px-10 py-6 text-xl transform hover:scale-105 transition-all duration-300 shadow-2xl backdrop-blur-sm bg-white/10"
              >
                Our Story
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gradient-to-b from-white to-ethiopian-cream/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-ethiopian-gold"></div>
              <Star className="w-8 h-8 text-ethiopian-gold animate-pulse" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-ethiopian-gold"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-ethiopian-brown mb-6 tracking-tight">
              Featured Products
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed">
              Discover our handpicked selection of premium Ethiopian products, chosen for their exceptional quality and cultural significance.
            </p>
          </div>

          {loading && <p className="text-center text-lg text-gray-500">Loading products...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/shop">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-ethiopian-gold text-ethiopian-brown hover:bg-ethiopian-gold/10 px-10 py-4 text-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                View All Products
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-b from-ethiopian-cream/20 to-white relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-ethiopian-brown mb-6 tracking-tight">Shop by Category</h2>
            <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed">
              Explore our carefully curated collection of authentic Ethiopian products, each category representing a unique aspect of Ethiopia's rich heritage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                to={`/shop?category=${category.id}`}
                className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border hover:border-ethiopian-gold/50 transform hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="text-5xl mb-6 group-hover:scale-125 transition-transform duration-300 text-center">{category.icon}</div>
                <h3 className="text-2xl font-semibold text-ethiopian-brown mb-4 group-hover:text-ethiopian-red transition-colors text-center">{category.name}</h3>
                <p className="text-gray-600 text-center leading-relaxed mb-6">{category.description}</p>
                <div className="flex justify-center">
                  <ArrowRight className="w-6 h-6 text-ethiopian-gold group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Coffee Culture Section */}
      <section className="py-20 bg-gradient-to-r from-ethiopian-brown via-ethiopian-brown/95 to-ethiopian-brown text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-left">
              <Coffee className="w-20 h-20 text-ethiopian-gold mb-8 animate-pulse" />
              <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">The Birthplace of Coffee</h2>
              <p className="text-xl mb-8 text-gray-200 leading-relaxed">
                Ethiopia is where coffee was first discovered. Legend tells of Kaldi, a goat herder who noticed his goats becoming energetic after eating certain berries.
              </p>
              <p className="text-gray-200 mb-10 text-lg leading-relaxed">
                Experience authentic Ethiopian coffee culture with our premium single-origin beans, traditional jebena coffee pots, and ceremonial accessories.
              </p>
              <Link to="/shop?category=coffee">
                <Button size="lg" className="bg-ethiopian-gold hover:bg-ethiopian-gold/90 text-ethiopian-brown font-semibold px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300 shadow-2xl group">
                  Explore Coffee Collection
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            <div className="relative animate-fade-in-right">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&h=400&fit=crop"
                  alt="Ethiopian Coffee"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ethiopian-brown/50 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-ethiopian-brown to-ethiopian-brown/90 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-ethiopian-gold to-ethiopian-gold/80 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-ethiopian-brown font-bold text-xl">A</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Adey International Market</h3>
                  <p className="text-sm text-ethiopian-gold">Ethiopian Heritage</p>
                </div>
              </div>
              <p className="text-gray-300 mb-3 text-lg">Your trusted partner for authentic Ethiopian imports.</p>
              <p className="text-gray-300 mb-8 text-lg">Supplying quality you can trust, service you can count on.</p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-ethiopian-gold" />
                  <span className="text-gray-300">info@adeymarket.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-ethiopian-gold" />
                  <span className="text-gray-300">(555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-ethiopian-gold" />
                  <span className="text-gray-300">Address coming soon</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-semibold mb-6 text-ethiopian-gold">Quick Links</h4>
              <ul className="space-y-3">
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
              <h4 className="text-xl font-semibold mb-6 text-ethiopian-gold">Information</h4>
              <ul className="space-y-3">
                <li><Link to="/terms" className="text-gray-300 hover:text-white transition-colors">Terms & Conditions</Link></li>
                <li><Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/shipping" className="text-gray-300 hover:text-white transition-colors">Shipping & Return</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Adey International Market. All rights reserved. | Bringing Ethiopian Heritage to Your Home
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
