
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, ShoppingCart, Heart, Share2, Info } from 'lucide-react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { useAuth } from '@/contexts/AuthContext';
import { useAuthModal } from '@/contexts/AuthModalContext';
import { Button } from '@/components/ui/button';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { openAuthModal } = useAuthModal();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === id);
  const relatedProducts = products
    .filter(p => p.category === product?.category && p.id !== id)
    .slice(0, 4);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <Link to="/shop">
            <Button className="bg-ethiopian-gold hover:bg-ethiopian-gold/90 text-ethiopian-brown">
              Back to Shop
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!user) {
      openAuthModal();
      return;
    }
    // Add to cart logic would go here
    console.log(`Added ${quantity} of ${product.name} to cart`);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <Link 
              to="/shop"
              className="inline-flex items-center text-ethiopian-brown hover:text-ethiopian-red transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shop
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-white shadow-sm">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-ethiopian-brown mb-4">
                  {product.name}
                </h1>
                
                <div className="flex items-center text-gray-600 mb-6">
                  <MapPin className="w-5 h-5 mr-2 text-ethiopian-green" />
                  <span className="text-lg">Origin: {product.origin}</span>
                </div>

                {user ? (
                  <div className="text-3xl font-bold text-ethiopian-brown mb-6">
                    ${product.price.toFixed(2)}
                  </div>
                ) : (
                  <div className="mb-6">
                    <Button
                      onClick={openAuthModal}
                      className="bg-ethiopian-gold hover:bg-ethiopian-gold/90 text-ethiopian-brown text-lg px-6 py-3"
                    >
                      Login to see price
                    </Button>
                  </div>
                )}
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  {product.description}
                </p>

                {product.culturalNotes && (
                  <div className="bg-ethiopian-cream/50 rounded-lg p-4 mt-6">
                    <div className="flex items-start">
                      <Info className="w-5 h-5 text-ethiopian-brown mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-ethiopian-brown mb-2">Cultural Notes</h4>
                        <p className="text-gray-700">{product.culturalNotes}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {user && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <label className="font-medium text-gray-700">Quantity:</label>
                    <div className="flex items-center border rounded-md">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3"
                      >
                        -
                      </Button>
                      <span className="px-4 py-2 border-x">{quantity}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3"
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={handleAddToCart}
                      size="lg"
                      className="flex-1 bg-ethiopian-red hover:bg-ethiopian-red/90 text-white"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Add to Cart
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-ethiopian-brown text-ethiopian-brown hover:bg-ethiopian-brown/10"
                    >
                      <Heart className="w-5 h-5 mr-2" />
                      Save
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-ethiopian-brown mb-8">
                Related Products
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AuthModal is now handled globally */}
    </>
  );
};

export default ProductDetail;
