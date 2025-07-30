import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  User, 
  Mail, 
  Building2, 
  Phone, 
  Smartphone, 
  MapPin, 
  Hash,
  Edit,
  Shield
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProfileData {
  full_name: string | null;
  email: string;
  avatar_url: string | null;
}

interface CustomerData {
  company_name: string | null;
  business_phone: string | null;
  mobile_phone: string | null;
  street: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  country: string | null;
  tax_id: string | null;
}

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.id) return;

      try {
        setIsLoading(true);

        // Fetch profile data
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('full_name, email, avatar_url')
          .eq('user_id', user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Profile fetch error:', profileError);
        } else {
          setProfileData(profile);
        }

        // Fetch customer data
        const { data: customer, error: customerError } = await supabase
          .from('customers')
          .select(`
            company_name,
            business_phone,
            mobile_phone,
            street,
            city,
            state,
            zip,
            country,
            tax_id
          `)
          .eq('user_id', user.id)
          .single();

        if (customerError && customerError.code !== 'PGRST116') {
          console.error('Customer fetch error:', customerError);
        } else {
          setCustomerData(customer);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast({
          title: "Error",
          description: "Failed to load profile data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user?.id, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-ethiopian-cream/30 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>
          <Card className="shadow-lg">
            <CardHeader>
              <Skeleton className="h-8 w-48" />
            </CardHeader>
            <CardContent className="space-y-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const InfoCard: React.FC<{ 
    icon: React.ReactNode; 
    label: string; 
    value: string | null | undefined; 
    fallback?: string;
  }> = ({ icon, label, value, fallback = "Not provided" }) => (
    <div className="flex items-start space-x-3 p-4 rounded-lg border bg-white/50 backdrop-blur-sm">
      <div className="flex-shrink-0 w-10 h-10 bg-ethiopian-gold/10 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-ethiopian-brown">{label}</p>
        <p className="text-gray-900 font-medium">{value || fallback}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-ethiopian-cream/30 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-ethiopian-brown mb-4">
            Personal Profile
          </h1>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Manage your personal information and business details.
          </p>
        </div>

        {/* Profile Card */}
        <Card className="shadow-lg mb-8">
          <CardHeader className="bg-gradient-to-r from-ethiopian-gold/10 to-ethiopian-cream/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-ethiopian-gold/20 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-ethiopian-brown" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-ethiopian-brown">
                    {profileData?.full_name || user?.user_metadata?.full_name || 'User Profile'}
                  </CardTitle>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="secondary" className="bg-ethiopian-green/10 text-ethiopian-green">
                      <Shield className="w-3 h-3 mr-1" />
                      Verified Account
                    </Badge>
                  </div>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="border-ethiopian-gold text-ethiopian-brown hover:bg-ethiopian-gold/10"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-ethiopian-brown mb-4 border-b border-ethiopian-gold/30 pb-2">
                  Personal Information
                </h3>
                
                <InfoCard
                  icon={<User className="w-5 h-5 text-ethiopian-brown" />}
                  label="Full Name"
                  value={profileData?.full_name || user?.user_metadata?.full_name}
                />
                
                <InfoCard
                  icon={<Mail className="w-5 h-5 text-ethiopian-brown" />}
                  label="Email"
                  value={profileData?.email || user?.email}
                />
                
                <InfoCard
                  icon={<Building2 className="w-5 h-5 text-ethiopian-brown" />}
                  label="Company Name"
                  value={customerData?.company_name}
                />
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-ethiopian-brown mb-4 border-b border-ethiopian-gold/30 pb-2">
                  Contact Information
                </h3>
                
                <InfoCard
                  icon={<Phone className="w-5 h-5 text-ethiopian-brown" />}
                  label="Business Phone"
                  value={customerData?.business_phone}
                />
                
                <InfoCard
                  icon={<Smartphone className="w-5 h-5 text-ethiopian-brown" />}
                  label="Mobile Phone"
                  value={customerData?.mobile_phone}
                />
                
                <InfoCard
                  icon={<Hash className="w-5 h-5 text-ethiopian-brown" />}
                  label="Tax ID Number"
                  value={customerData?.tax_id}
                />
              </div>

              {/* Address Information */}
              <div className="space-y-4 md:col-span-2">
                <h3 className="text-lg font-semibold text-ethiopian-brown mb-4 border-b border-ethiopian-gold/30 pb-2">
                  Business Address
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoCard
                    icon={<MapPin className="w-5 h-5 text-ethiopian-brown" />}
                    label="Street Address"
                    value={customerData?.street}
                  />
                  
                  <InfoCard
                    icon={<MapPin className="w-5 h-5 text-ethiopian-brown" />}
                    label="City"
                    value={customerData?.city}
                  />
                  
                  <InfoCard
                    icon={<MapPin className="w-5 h-5 text-ethiopian-brown" />}
                    label="State"
                    value={customerData?.state}
                  />
                  
                  <InfoCard
                    icon={<MapPin className="w-5 h-5 text-ethiopian-brown" />}
                    label="ZIP Code"
                    value={customerData?.zip}
                  />
                  
                  <InfoCard
                    icon={<MapPin className="w-5 h-5 text-ethiopian-brown" />}
                    label="Country"
                    value={customerData?.country}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
              <Button 
                className="bg-ethiopian-gold hover:bg-ethiopian-gold/90 text-ethiopian-brown font-semibold"
                size="lg"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile Information
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-ethiopian-gold text-ethiopian-brown hover:bg-ethiopian-gold/10"
              >
                Update Business Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;