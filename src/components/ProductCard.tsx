
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Eye, Heart, ShoppingCart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCustomerApproval } from '@/hooks/useCustomerApproval';
import { useCartStore } from '@/stores/cartStore';
import { toast } from '@/hooks/use-toast';
import { AuthModal } from '@/components/AuthModal';
import { Button } from '@/components/ui/button';

import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { user } = useAuth();
  const { isApproved } = useCustomerApproval();
  const { addItem } = useCartStore();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleAddToCart = () => {
    if (!user || !isApproved) {
      setIsAuthModalOpen(true);
      return;
    }
    
    addItem(product, 1);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-ethiopian-gold/30 transform hover:-translate-y-2 hover:scale-[1.02]">
      {/* Image Container with Overlay */}
      <div className="relative overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay with actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <Link to={`/product/${product.id}`}>
              <Button
                size="sm"
                className="bg-white/90 text-ethiopian-brown hover:bg-white transition-all duration-300 shadow-lg backdrop-blur-sm"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </Link>
            
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:text-ethiopian-gold hover:bg-white/20 transition-all duration-300"
            >
              <Heart className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Featured badge */}
        {product.featured && (
          <div className="absolute top-4 right-4">
            <div className="bg-gradient-to-r from-ethiopian-gold to-ethiopian-gold/80 text-ethiopian-brown px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
              Featured
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-600 mb-3 group-hover:text-ethiopian-brown transition-colors">
          <MapPin className="w-4 h-4 mr-1 text-ethiopian-green" />
          <span className="font-medium">{product.origin}</span>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-ethiopian-brown transition-colors line-clamp-2">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Price and Action */}
        <div className="flex items-center justify-between gap-3 mb-3">
          {user && isApproved ? (
            <div className="text-2xl font-bold text-ethiopian-brown">
              ${product.price.toFixed(2)}
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="border-ethiopian-gold text-ethiopian-brown hover:bg-ethiopian-brown hover:text-white transition-all duration-300"
              onClick={() => setIsAuthModalOpen(true)}
            >
              {!user ? 'Sign In for Price' : 'Approval Required'}
            </Button>
          )}

          <div className="flex gap-2">
            {user && isApproved && (
              <Button
                size="sm"
                onClick={handleAddToCart}
                className="bg-ethiopian-brown hover:bg-ethiopian-brown/90"
              >
                <ShoppingCart className="w-4 h-4 mr-1" />
                Add
              </Button>
            )}
            <Link to={`/product/${product.id}`}>
              <Button
                variant="outline"
                size="sm"
                className="border-ethiopian-gold text-ethiopian-brown hover:bg-ethiopian-brown hover:text-white transition-all duration-300"
              >
                <Eye className="w-4 h-4 mr-1" />
                View
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="h-1 bg-gradient-to-r from-ethiopian-gold via-ethiopian-green to-ethiopian-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};
