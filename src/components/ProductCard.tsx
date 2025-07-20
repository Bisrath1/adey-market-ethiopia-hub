
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Lock } from 'lucide-react';
import { Product } from '@/data/products';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from './AuthModal';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handlePriceClick = () => {
    if (!user) {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border hover:shadow-lg transition-all duration-300 overflow-hidden group">
        <Link to={`/product/${product.id}`} className="block">
          <div className="aspect-square overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>

        <div className="p-4">
          <Link to={`/product/${product.id}`}>
            <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-ethiopian-red transition-colors">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center text-sm text-gray-600 mb-3">
            <MapPin className="w-4 h-4 mr-1 text-ethiopian-green" />
            <span>{product.origin}</span>
          </div>

          <div className="flex items-center justify-between">
            {user ? (
              <span className="text-lg font-bold text-ethiopian-brown">
                ${product.price.toFixed(2)}
              </span>
            ) : (
              <Button
                onClick={handlePriceClick}
                variant="outline"
                size="sm"
                className="border-ethiopian-gold text-ethiopian-brown hover:bg-ethiopian-gold/10 transition-all duration-200"
              >
                <Lock className="w-4 h-4 mr-2" />
                Login to see price
              </Button>
            )}

            {user && (
              <Link to={`/product/${product.id}`}>
                <Button
                  size="sm"
                  className="bg-ethiopian-red hover:bg-ethiopian-red/90 text-white"
                >
                  View Details
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};
