
import React from 'react';
import { Truck, Clock, MapPin, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const Shipping: React.FC = () => {
  return (
    <div className="min-h-screen bg-ethiopian-cream/30 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-ethiopian-brown mb-4">
            🚚 Shipping & Return Policy
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Clear and transparent shipping information to help you plan your orders
          </p>
        </div>

        <div className="space-y-8">
          {/* Free Shipping */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-ethiopian-brown flex items-center">
                <Truck className="w-8 h-8 mr-3 text-ethiopian-gold" />
                Free Shipping
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 font-medium">
                  All orders over $3000 qualify for free delivery.
                </p>
              </div>
              <p className="text-gray-700">
                Orders below $3000 will be charged up to $130 or the exact shipping cost, depending on your location.
              </p>
            </CardContent>
          </Card>

          {/* Processing & Delivery Time */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-ethiopian-brown flex items-center">
                <Clock className="w-8 h-8 mr-3 text-ethiopian-gold" />
                Processing & Delivery Time
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-ethiopian-brown mb-2">Processing Schedule</h4>
                  <p className="text-gray-700">
                    We process and ship orders Monday through Friday.
                  </p>
                  <p className="text-gray-700">
                    All orders leave our facility within 1–3 business days.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-ethiopian-brown mb-2">Delivery Timeframe</h4>
                  <p className="text-gray-700">
                    Shipping carriers usually deliver within 1–5 business days, depending on your location.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tracking */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-ethiopian-brown flex items-center">
                <MapPin className="w-8 h-8 mr-3 text-ethiopian-gold" />
                Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                You will receive a shipping notification email with your tracking number once your order is dispatched.
              </p>
            </CardContent>
          </Card>

          {/* Delivery Carriers */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-ethiopian-brown flex items-center">
                <Star className="w-8 h-8 mr-3 text-ethiopian-gold" />
                Delivery Carriers
              </CardTitle>
              <CardDescription>
                We work with selected freight carriers based on their:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-ethiopian-gold rounded-full"></div>
                    <span className="text-gray-700">Service quality</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-ethiopian-gold rounded-full"></div>
                    <span className="text-gray-700">On-time delivery performance</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-ethiopian-gold rounded-full"></div>
                    <span className="text-gray-700">Competitive pricing</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-ethiopian-gold rounded-full"></div>
                    <span className="text-gray-700">Overall reliability</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
