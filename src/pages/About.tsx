
import React from 'react';
import { Heart, Globe, Users, Award } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="hero-pattern py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-ethiopian-brown mb-6">
            Our Story
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Adey International Market was born from a passion to share Ethiopia's rich cultural heritage 
            with the world, connecting communities through authentic products and timeless traditions.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-ethiopian-brown mb-6">
                Our Mission
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                We believe that authentic products tell stories – stories of generations of craftspeople, 
                farmers, and artisans who have preserved Ethiopia's cultural traditions. Our mission is 
                to bring these stories to your home while supporting the communities that create them.
              </p>
              <p className="text-gray-700 text-lg">
                Every product in our collection is carefully sourced directly from Ethiopian producers, 
                ensuring authenticity, quality, and fair compensation for their craftsmanship.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600&h=400&fit=crop"
                alt="Ethiopian landscape"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-ethiopian-green/20 rounded-lg"></div>
            </div>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-ethiopian-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-ethiopian-red" />
              </div>
              <h3 className="text-xl font-semibold text-ethiopian-brown mb-3">Authenticity</h3>
              <p className="text-gray-600">
                Every product is genuinely made in Ethiopia, preserving traditional methods and recipes.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-ethiopian-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-ethiopian-green" />
              </div>
              <h3 className="text-xl font-semibold text-ethiopian-brown mb-3">Sustainability</h3>
              <p className="text-gray-600">
                We support sustainable farming and production practices that protect Ethiopia's environment.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-ethiopian-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-ethiopian-gold" />
              </div>
              <h3 className="text-xl font-semibold text-ethiopian-brown mb-3">Community</h3>
              <p className="text-gray-600">
                We build lasting relationships with producers and contribute to their communities' growth.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-ethiopian-brown/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-ethiopian-brown" />
              </div>
              <h3 className="text-xl font-semibold text-ethiopian-brown mb-3">Quality</h3>
              <p className="text-gray-600">
                Rigorous quality standards ensure every product meets our high expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Heritage Section */}
      <section className="py-16 bg-ethiopian-cream/30 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=600&h=400&fit=crop"
                alt="Ethiopian coffee ceremony"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-ethiopian-gold/20 rounded-lg"></div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-ethiopian-brown mb-6">
                Preserving Heritage
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                Ethiopia is the birthplace of coffee, home to ancient grains like teff, and the source of 
                some of the world's finest spices. For over 3,000 years, Ethiopian culture has been shaped 
                by these remarkable products and the rituals surrounding them.
              </p>
              <p className="text-gray-700 text-lg mb-6">
                The Ethiopian coffee ceremony, for example, is more than just preparing a drink – it's a 
                sacred ritual that brings communities together, symbolizing friendship, respect, and blessing.
              </p>
              <p className="text-gray-700 text-lg">
                Through Adey International Market, we honor these traditions while making them accessible 
                to people around the world who appreciate authentic, meaningful products.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sourcing Process */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-ethiopian-brown mb-6">
              Our Sourcing Process
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto">
              We work directly with Ethiopian farmers, artisans, and cooperatives to ensure 
              fair trade practices and maintain the highest quality standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-ethiopian-gold rounded-full flex items-center justify-center mx-auto mb-4 text-ethiopian-brown font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-semibold text-ethiopian-brown mb-3">Direct Partnership</h3>
              <p className="text-gray-600">
                We establish direct relationships with producers, eliminating middlemen and ensuring 
                fair compensation for their work.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 bg-ethiopian-green rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-semibold text-ethiopian-brown mb-3">Quality Assurance</h3>
              <p className="text-gray-600">
                Every batch is carefully inspected for quality, authenticity, and adherence to 
                traditional production methods.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 bg-ethiopian-red rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-semibold text-ethiopian-brown mb-3">Global Delivery</h3>
              <p className="text-gray-600">
                Products are carefully packaged and shipped to maintain freshness and quality 
                throughout the journey to your home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-ethiopian-brown text-white px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Community
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Become part of a global community that values authentic products, cultural preservation, 
            and fair trade practices. Every purchase supports Ethiopian artisans and their communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/shop"
              className="bg-ethiopian-gold hover:bg-ethiopian-gold/90 text-ethiopian-brown font-semibold px-8 py-3 rounded-md transition-colors inline-block"
            >
              Start Shopping
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-ethiopian-brown font-semibold px-8 py-3 rounded-md transition-colors inline-block"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
