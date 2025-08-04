import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, profile } = useAuth();
  const { toast } = useToast();

  // Registration form data
  const [formData, setFormData] = useState({
    companyName: '',
    fullName: profile?.full_name || '',
    email: user?.email || '',
    password: '',
    businessPhone: '',
    mobilePhone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    taxId: '',
    document: null as File | null
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get redirect message and URL from search params
  const redirectMessage = searchParams.get('message');
  const redirectUrl = searchParams.get('redirect') || '/shop';

  // Check if authenticated and prefill form
  useEffect(() => {
    if (user && profile) {
      setFormData(prev => ({
        ...prev,
        email: user.email || '',
        fullName: profile?.full_name || ''
      }));
    }
  }, [user, profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleStateChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      state: value
    }));
    
    if (errors.state) {
      setErrors(prev => ({
        ...prev,
        state: ''
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        document: file
      }));
      
      if (errors.document) {
        setErrors(prev => ({
          ...prev,
          document: ''
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.businessPhone.trim()) newErrors.businessPhone = 'Business phone is required';
    if (!formData.street.trim()) newErrors.street = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    if (!formData.taxId.trim()) newErrors.taxId = 'Tax ID is required';

    return newErrors;
  };

const handleBusinessSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  const validationErrors = validateForm();
  
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  setIsSubmitting(true);

  try {
    // Create user account first if not already authenticated
    let currentUser = user;
    
    if (!currentUser) {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: formData.fullName
          }
        }
      });

      if (authError) {
        throw new Error(authError.message || 'Failed to create user account');
      }

      currentUser = authData.user;
      
      if (!currentUser) {
        throw new Error('Failed to create user account');
      }
    }
    let documentUrl = null;
    
    // Only attempt upload if document exists
    if (formData.document) {
      const fileExt = formData.document.name.split('.').pop();
      const fileName = `${currentUser.id}-${Date.now()}.${fileExt}`;
      
      // First check file size (limit to 10MB)
      if (formData.document.size > 10 * 1024 * 1024) {
        throw new Error('File size exceeds 10MB limit');
      }

      // Check file type
      const allowedTypes = ['application/pdf', 'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(formData.document.type)) {
        throw new Error('Invalid file type. Please upload PDF, DOC, DOCX, JPG, JPEG, or PNG');
      }

      // Upload with error handling
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('ein-documents')
        .upload(fileName, formData.document, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw new Error(uploadError.message || 'Failed to upload document');
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('ein-documents')
        .getPublicUrl(fileName);

      if (!publicUrl) {
        throw new Error('Failed to generate document URL');
      }

      documentUrl = publicUrl;
    }

    // Insert customer data
    const { error: customerError } = await supabase
      .from('customers')
      .insert({
        user_id: currentUser.id,
        company_name: formData.companyName,
        full_name: formData.fullName,
        email: formData.email,
        business_phone: formData.businessPhone,
        mobile_phone: formData.mobilePhone || null,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zip: formData.zipCode,
        country: formData.country,
        tax_id: formData.taxId,
        ein_document_url: documentUrl
      });

    if (customerError) {
      throw new Error(customerError.message || 'Failed to save business information');
    }

    toast({
      title: "Registration Submitted!",
      description: "We'll review your application and contact you within 1-2 business days.",
    });

    navigate('/shop');
  } catch (error) {
    console.error('Business registration error:', error);
    toast({
      title: "Registration Failed",
      description: error instanceof Error ? error.message : 'An unexpected error occurred',
      variant: "destructive",
    });
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div className="min-h-screen bg-ethiopian-cream/30 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-ethiopian-brown mb-4">
            Business Registration
          </h1>
          
          {redirectMessage && (
            <Alert className="mb-6 max-w-3xl mx-auto border-ethiopian-gold/50 bg-ethiopian-gold/10">
              <AlertCircle className="h-4 w-4 text-ethiopian-brown" />
              <AlertDescription className="text-ethiopian-brown font-medium">
                {redirectMessage}
              </AlertDescription>
            </Alert>
          )}

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 max-w-3xl mx-auto">
            <p className="text-yellow-800 font-medium">
              ⚠️ Please note that we ONLY approve customers with existing and active businesses in the United States of America.
            </p>
          </div>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-ethiopian-brown">Complete Your Business Profile</CardTitle>
            <CardDescription>
              Please provide your business details to set up your wholesale account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleBusinessSubmit} className="space-y-6">
              {/* Company Name */}
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className={`border-ethiopian-gold/30 focus:border-ethiopian-gold ${
                    errors.companyName ? 'border-red-500' : ''
                  }`}
                />
                {errors.companyName && (
                  <p className="text-red-500 text-sm">{errors.companyName}</p>
                )}
              </div>

              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`border-ethiopian-gold/30 focus:border-ethiopian-gold ${
                    errors.fullName ? 'border-red-500' : ''
                  }`}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Your Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`border-ethiopian-gold/30 focus:border-ethiopian-gold ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`border-ethiopian-gold/30 focus:border-ethiopian-gold ${
                    errors.password ? 'border-red-500' : ''
                  }`}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              {/* Phone Numbers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="businessPhone">Business Phone Number *</Label>
                  <Input
                    id="businessPhone"
                    name="businessPhone"
                    type="tel"
                    value={formData.businessPhone}
                    onChange={handleInputChange}
                    className={`border-ethiopian-gold/30 focus:border-ethiopian-gold ${
                      errors.businessPhone ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.businessPhone && (
                    <p className="text-red-500 text-sm">{errors.businessPhone}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobilePhone">Mobile Phone</Label>
                  <Input
                    id="mobilePhone"
                    name="mobilePhone"
                    type="tel"
                    value={formData.mobilePhone}
                    onChange={handleInputChange}
                    className="border-ethiopian-gold/30 focus:border-ethiopian-gold"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="street">Street *</Label>
                <Input
                  id="street"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  className={`border-ethiopian-gold/30 focus:border-ethiopian-gold ${
                    errors.street ? 'border-red-500' : ''
                  }`}
                />
                {errors.street && (
                  <p className="text-red-500 text-sm">{errors.street}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`border-ethiopian-gold/30 focus:border-ethiopian-gold ${
                      errors.city ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm">{errors.city}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Select value={formData.state} onValueChange={handleStateChange}>
                    <SelectTrigger className={`border-ethiopian-gold/30 focus:border-ethiopian-gold ${
                      errors.state ? 'border-red-500' : ''
                    }`}>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {US_STATES.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.state && (
                    <p className="text-red-500 text-sm">{errors.state}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip *</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className={`border-ethiopian-gold/30 focus:border-ethiopian-gold ${
                      errors.zipCode ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.zipCode && (
                    <p className="text-red-500 text-sm">{errors.zipCode}</p>
                  )}
                </div>
              </div>

              {/* Country */}
              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Input
                  id="country"
                  name="country"
                  value={formData.country}
                  readOnly
                  className="border-ethiopian-gold/30 bg-gray-50"
                />
              </div>

              {/* Tax ID */}
              <div className="space-y-2">
                <Label htmlFor="taxId">Tax ID Number *</Label>
                <Input
                  id="taxId"
                  name="taxId"
                  value={formData.taxId}
                  onChange={handleInputChange}
                  className={`border-ethiopian-gold/30 focus:border-ethiopian-gold ${
                    errors.taxId ? 'border-red-500' : ''
                  }`}
                />
                {errors.taxId && (
                  <p className="text-red-500 text-sm">{errors.taxId}</p>
                )}
              </div>

              {/* Document Upload */}
              <div className="space-y-2">
                <Label htmlFor="document">EIN or Business Tax Registration Document Upload (Optional)</Label>
                <div className="border-2 border-dashed border-ethiopian-gold/30 rounded-lg p-6">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <label htmlFor="document" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-gray-900">
                          {formData.document ? formData.document.name : 'Upload business document'}
                        </span>
                        <input
                          id="document"
                          name="document"
                          type="file"
                          className="sr-only"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PDF, DOC, DOCX, JPG, JPEG, PNG up to 10MB</p>
                  </div>
                </div>
                {errors.document && (
                  <p className="text-red-500 text-sm">{errors.document}</p>
                )}
              </div>

              <div className="pt-6">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-ethiopian-gold hover:bg-ethiopian-gold/90 text-ethiopian-brown font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting Registration...
                    </>
                  ) : (
                    'Submit Registration'
                  )}
                </Button>
                <p className="text-sm text-gray-600 mt-4 text-center">
                  * Required fields. We'll review your application and contact you within 1-2 business days.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;