import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';

const PaymentSuccess = () => {
  const location = useLocation();
  const { orderId, total } = location.state || {};

  useEffect(() => {
    // Optional: Track successful payment
    if (orderId) {
      console.log('Payment successful for order:', orderId);
    }
  }, [orderId]);

  return (
    <div className="min-h-screen bg-ethiopian-cream/30">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-ethiopian-brown">Payment Successful!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <p className="text-gray-600">
                  Thank you for your order! Your payment has been processed successfully.
                </p>
                {orderId && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Order ID</p>
                    <p className="font-mono text-sm font-semibold">
                      {String(orderId).slice(0, 8).toUpperCase()}
                    </p>
                    {total && (
                      <>
                        <p className="text-sm text-gray-600 mt-2">Total Amount</p>
                        <p className="text-lg font-bold text-ethiopian-brown">${total.toFixed(2)}</p>
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                  <Package className="w-5 h-5 text-blue-600" />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-blue-900">What's Next?</p>
                    <p className="text-xs text-blue-700">
                      You'll receive an email confirmation shortly with your order details.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link to="/customer-dashboard" className="w-full">
                    <Button className="w-full bg-ethiopian-brown hover:bg-ethiopian-brown/90">
                      View Order History
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  
                  <Link to="/shop" className="w-full">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="text-xs text-gray-500 border-t pt-4">
                <p>
                  If you have any questions about your order, please{' '}
                  <Link to="/contact" className="text-ethiopian-brown hover:underline">
                    contact our support team
                  </Link>
                  .
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
