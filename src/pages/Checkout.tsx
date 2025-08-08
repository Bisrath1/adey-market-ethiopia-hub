import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/stores/cartStore';
import { useAuth } from '@/contexts/AuthContext';
import { useCustomerApproval } from '@/hooks/useCustomerApproval';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, ShoppingCart, CreditCard, Loader2 } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const { items, totalItems, totalAmount, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
 const { isApproved, isLoading: approvalLoading } = useCustomerApproval();
  if (approvalLoading) {
    return (
      <div className="min-h-screen bg-ethiopian-cream/30 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-ethiopian-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Show access required message if user is not logged in or not approved
  if (!user || !isApproved) {
    return (
      <div className="min-h-screen bg-ethiopian-cream/30">
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto">
            <CardContent className="flex flex-col items-center justify-center p-8">
              <ShoppingCart className="w-16 h-16 text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Required</h2>
              <p className="text-center text-gray-600 mb-4">
                You need to be registered and approved to access your cart.
              </p>
              <Link to="/register">
                <Button>Register Now</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-ethiopian-cream/30">
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto">
            <CardContent className="flex flex-col items-center justify-center p-8">
              <ShoppingCart className="w-16 h-16 text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">No Items to Checkout</h2>
              <p className="text-center text-gray-600 mb-4">
                Your cart is empty. Add some items before proceeding to checkout.
              </p>
              <Link to="/shop">
                <Button>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const estimatedTax = totalAmount * 0.08; // 8% tax estimate
  const finalTotal = totalAmount + estimatedTax;

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      // Create order in database
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: finalTotal,
          status: 'pending',
          payment_status: 'pending'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map(item => ({
        order_id: orderData.id,
        product_id: parseInt(item.product.id),
        quantity: item.quantity,
        unit_price: item.product.price,
        total_price: item.subtotal
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update order status
      const { error: updateError } = await supabase
        .from('orders')
        .update({
          status: 'completed',
          payment_status: 'paid'
        })
        .eq('id', orderData.id);

      if (updateError) throw updateError;

      // Clear cart and redirect
      clearCart();
      navigate('/payment-success', { 
        state: { 
          orderId: orderData.id,
          total: finalTotal
        } 
      });
      
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-ethiopian-cream/30">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <Link to="/cart">
              <Button variant="outline" size="icon">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-ethiopian-brown mb-2">Checkout</h1>
              <p className="text-gray-600">Review your order and complete your purchase</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Order Review */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Review</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-ethiopian-brown">
                        {item.product.name}
                      </h4>
                      <p className="text-sm text-gray-600">{item.product.origin}</p>
                      <Badge variant="secondary" className="mt-1">
                        {item.product.category}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      <p className="font-semibold">${item.subtotal.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Payment Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Tax</span>
                    <span>${estimatedTax.toFixed(2)}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-ethiopian-brown">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="space-y-4 pt-4">
                  <Button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full bg-ethiopian-brown hover:bg-ethiopian-brown/90 h-12"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4 mr-2" />
                        Complete Payment
                      </>
                    )}
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    By completing your purchase, you agree to our Terms of Service and Privacy Policy.
                    Your payment information is secured with 256-bit SSL encryption.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  If you have questions about your order, please contact our customer service team.
                </p>
                <Link to="/contact">
                  <Button variant="outline" size="sm">
                    Contact Support
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;