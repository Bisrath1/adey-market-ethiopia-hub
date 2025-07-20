
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, Coffee } from 'lucide-react';
import { products, categories } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';

export const Home: React.FC = () => {
  const featuredProducts = products.filter(product => product.featured);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-pattern bg-gradient-to-r from-ethiopian-cream to-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-ethiopian-brown mb-6">
            Adey International Market
          </h1>
          <p className="text-xl md:text-2xl text-ethiopian-green mb-8 max-w-3xl mx-auto">
            "Bringing Ethiopian Heritage to Your Home"
          </p>
          <p className="text-gray-700 mb-10 max-w-2xl mx-auto text-lg">
            Discover authentic Ethiopian products, from aromatic coffee beans to traditional spices, 
            handwoven textiles, and artisanal household goods. Each item tells a story of Ethiopia's rich culture.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop">
              <Button 
                size="lg"
                className="bg-ethiopian-gold hover:bg-ethiopian-gold/90 text-ethiopian-brown font-semibold px-8 py-3"
              >
                Shop Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/about">
              <Button 
                variant="outline"
                size="lg"
                className="border-ethiopian-brown text-ethiopian-brown hover:bg-ethiopian-brown/10 px-8 py-3"
              >
                Our Story
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-ethiopian-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-ethiopian-gold" />
              </div>
              <h3 className="text-xl font-semibold text-ethiopian-brown mb-2">Authentic Products</h3>
              <p className="text-gray-600">
                Sourced directly from Ethiopian artisans and farmers, ensuring authenticity and quality.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-ethiopian-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-ethiopian-green" />
              </div>
              <h3 className="text-xl font-semibold text-ethiopian-brown mb-2">Fast Shipping</h3>
              <p className="text-gray-600">
                Quick and secure delivery to bring Ethiopian heritage directly to your doorstep.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-ethiopian-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-ethiopian-red" />
              </div>
              <h3 className="text-xl font-semibold text-ethiopian-brown mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">
                Every product is carefully selected and tested to meet our high standards.
              </p>
            </div>
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
    </div>
  );
};

export default Home;
