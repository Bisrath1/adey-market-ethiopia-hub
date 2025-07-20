
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
      {/* Enhanced Hero Section with Improved Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video/Image with Enhanced Overlay */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover transform scale-105 animate-slow-zoom"
          >
            <source src="https://player.vimeo.com/external/370467553.sd.mp4?s=e90dcaba73c19b26b0d6ae0e6e6c4b6b6b8d7a3c&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
          </video>
          {/* Fallback background image */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop')] bg-cover bg-center"></div>
        </div>
        
        {/* Enhanced gradient overlay with Ethiopian patterns */}
        <div className="absolute inset-0 bg-gradient-to-r from-ethiopian-brown/85 via-ethiopian-brown/70 to-ethiopian-brown/85 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ethiopian-brown/30 z-10"></div>
        
        {/* Floating decorative elements */}
        <div className="absolute top-20 left-20 w-16 h-16 border border-ethiopian-gold/30 rounded-full animate-float-slow hidden lg:block"></div>
        <div className="absolute bottom-32 right-24 w-12 h-12 border border-ethiopian-gold/20 rounded-full animate-float-delayed hidden lg:block"></div>
        <div className="absolute top-1/3 right-20 w-8 h-8 bg-ethiopian-gold/20 rounded-full animate-pulse hidden lg:block"></div>
        
        {/* Enhanced Hero Content */}
        <div className="relative z-20 text-center text-white max-w-5xl mx-auto px-4 animate-fade-in-up">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 drop-shadow-2xl tracking-tight leading-none bg-gradient-to-r from-white via-ethiopian-cream to-white bg-clip-text">
              Adey International Market
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-ethiopian-gold to-transparent mx-auto mb-6"></div>
          </div>
          
          <p className="text-3xl md:text-4xl mb-8 text-ethiopian-gold drop-shadow-lg font-medium animate-fade-in-delayed">
            "Bringing Ethiopian Heritage to Your Home"
          </p>
          
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-gray-200 drop-shadow-sm leading-relaxed animate-fade-in-more-delayed">
            Discover authentic Ethiopian products, from aromatic coffee beans to traditional spices, 
            handwoven textiles, and artisanal household goods. Each item tells a story of Ethiopia's rich culture.
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

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Enhanced Featured Products Section */}
      <section className="py-20 bg-gradient-to-b from-white to-ethiopian-cream/20 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23D4A574" fill-opacity="0.1"%3E%3Ccircle cx="7" cy="7" r="7"/%3E%3Ccircle cx="53" cy="7" r="7"/%3E%3Ccircle cx="7" cy="53" r="7"/%3E%3Ccircle cx="53" cy="53" r="7"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>
        
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
              Discover our handpicked selection of premium Ethiopian products, 
              chosen for their exceptional quality and cultural significance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {featuredProducts.map((product, index) => (
              <div 
                key={product.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
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

      {/* Enhanced Categories Section */}
      <section className="py-20 bg-gradient-to-b from-ethiopian-cream/20 to-white relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-ethiopian-brown mb-6 tracking-tight">
              Shop by Category
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed">
              Explore our carefully curated collection of authentic Ethiopian products, 
              each category representing a unique aspect of Ethiopia's rich heritage.
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
                <div className="text-5xl mb-6 group-hover:scale-125 transition-transform duration-300 text-center">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-semibold text-ethiopian-brown mb-4 group-hover:text-ethiopian-red transition-colors text-center">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed mb-6">
                  {category.description}
                </p>
                <div className="flex justify-center">
                  <ArrowRight className="w-6 h-6 text-ethiopian-gold group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Coffee Culture Section */}
      <section className="py-20 bg-gradient-to-r from-ethiopian-brown via-ethiopian-brown/95 to-ethiopian-brown text-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 border border-ethiopian-gold/20 rounded-full animate-spin-slow"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-ethiopian-gold/10 rounded-full animate-spin-reverse"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-left">
              <Coffee className="w-20 h-20 text-ethiopian-gold mb-8 animate-pulse" />
              <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
                The Birthplace of Coffee
              </h2>
              <p className="text-xl mb-8 text-gray-200 leading-relaxed">
                Ethiopia is where coffee was first discovered. Legend tells of Kaldi, a goat herder who 
                noticed his goats becoming energetic after eating certain berries. Today, the Ethiopian 
                coffee ceremony remains a cornerstone of hospitality and community.
              </p>
              <p className="text-gray-200 mb-10 text-lg leading-relaxed">
                Experience authentic Ethiopian coffee culture with our premium single-origin beans, 
                traditional jebena coffee pots, and ceremonial accessories.
              </p>
              <Link to="/shop?category=coffee">
                <Button 
                  size="lg"
                  className="bg-ethiopian-gold hover:bg-ethiopian-gold/90 text-ethiopian-brown font-semibold px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300 shadow-2xl group"
                >
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
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-ethiopian-gold/20 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-ethiopian-gold/10 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-b from-ethiopian-brown to-ethiopian-brown/90 text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23D4A574" fill-opacity="0.1"%3E%3Cpath d="M20 20c0 11.046-8.954 20-20 20v-40c11.046 0 20 8.954 20 20z"/%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>
        
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
              <p className="text-gray-300 mb-3 text-lg">
                Your trusted partner for authentic Ethiopian imports.
              </p>
              <p className="text-gray-300 mb-8 text-lg">
                Supplying quality you can trust, service you can count on.
              </p>
              
              {/* Contact Info */}
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
                <li><Link to="/" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">Home</Link></li>
                <li><Link to="/account" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">My Account</Link></li>
                <li><Link to="/shop" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">Shop</Link></li>
                <li><Link to="/register" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">New Customer Registration</Link></li>
                <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">Contact Us</Link></li>
              </ul>
            </div>

            {/* Information */}
            <div>
              <h4 className="text-xl font-semibold mb-6 text-ethiopian-gold">Information</h4>
              <ul className="space-y-3">
                <li><Link to="/terms" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">Terms & Conditions</Link></li>
                <li><Link to="/privacy" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">Privacy Policy</Link></li>
                <li><Link to="/shipping" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">Shipping & Return</Link></li>
              </ul>
              
              <h4 className="text-xl font-semibold mb-6 mt-10 text-ethiopian-gold">Connect with Us</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-ethiopian-gold" />
                  <span className="text-gray-300">Newsletter coming soon</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Border */}
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
