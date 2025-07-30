import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, AlertCircle, LogIn, UserPlus, Loader2 } from 'lucide-react';
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
  const { user, login, register } = useAuth();
  const { toast } = useToast();

  // Auth form data
  const [authForm, setAuthForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });

  // Registration form data
  const [formData, setFormData] = useState({
    companyName: '',
    fullName: '',
    email: '',
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

  const [activeTab, setActiveTab] = useState('auth');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [authErrors, setAuthErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get redirect message and URL from search params
  const redirectMessage = searchParams.get('message');
  const redirectUrl = searchParams.get('redirect') || '/shop';

  // Redirect authenticated users to business registration or redirect URL
  useEffect(() => {
    if (user) {
      setActiveTab('business');
    }
  }, [user]);

  const handleAuthFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuthForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (authErrors[name]) {
      setAuthErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
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

  const validateAuthForm = (isLogin = false) => {
    const newErrors: { [key: string]: string } = {};

    if (!authForm.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(authForm.email)) newErrors.email = 'Please enter a valid email';
    
    if (!authForm.password.trim()) newErrors.password = 'Password is required';
    else if (authForm.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (!isLogin) {
      if (!authForm.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!authForm.confirmPassword.trim()) newErrors.confirmPassword = 'Please confirm your password';
      else if (authForm.password !== authForm.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.businessPhone.trim()) newErrors.businessPhone = 'Business phone is required';
    if (!formData.street.trim()) newErrors.street = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    if (!formData.taxId.trim()) newErrors.taxId = 'Tax ID is required';
    if (!formData.document) newErrors.document = 'Business document upload is required';

    return newErrors;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateAuthForm(true);
    
    if (Object.keys(validationErrors).length > 0) {
      setAuthErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    const result = await login(authForm.email, authForm.password);
    setIsSubmitting(false);

    if (!result.error) {
      setActiveTab('business');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateAuthForm(false);
    
    if (Object.keys(validationErrors).length > 0) {
      setAuthErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    const result = await register(authForm.email, authForm.password, authForm.fullName);
    setIsSubmitting(false);

    if (!result.error) {
      toast({
        title: "Registration Successful!",
        description: "Please check your email to verify your account, then proceed to business registration.",
      });
      setActiveTab('business');
    }
  };

  const handleBusinessSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to submit your business registration.",
        variant: "destructive",
      });
      setActiveTab('auth');
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload document to Supabase storage if provided
      let documentUrl = null;
      if (formData.document) {
        const fileExt = formData.document.name.split('.').pop();
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('ein-documents')
          .upload(fileName, formData.document);

        if (uploadError) {
          throw new Error('Failed to upload document');
        }

        const { data: { publicUrl } } = supabase.storage
          .from('ein-documents')
          .getPublicUrl(fileName);

        documentUrl = publicUrl;
      }

      // Insert customer data
      const { error: customerError } = await supabase
        .from('customers')
        .insert({
          user_id: user.id,
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
        throw new Error('Failed to save business information');
      }

      toast({
        title: "Registration Submitted!",
        description: "We'll review your application and contact you within 1-2 business days.",
      });

      navigate('/profile');
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
            New Customer Registration
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
            <CardTitle className="text-2xl text-ethiopian-brown">Registration Process</CardTitle>
            <CardDescription>
              First create your account, then provide your business details to set up your wholesale account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="auth" className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  Account Setup
                </TabsTrigger>
                <TabsTrigger value="business" className="flex items-center gap-2" disabled={!user}>
                  <Upload className="w-4 h-4" />
                  Business Registration
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="auth" className="space-y-6 mt-6">
                <Tabs defaultValue="signin" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signin">Sign In</TabsTrigger>
                    <TabsTrigger value="signup">Create Account</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="signin">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-email">Email</Label>
                        <Input
                          id="login-email"
                          name="email"
                          type="email"
                          value={authForm.email}
                          onChange={handleAuthFormChange}
                          className={`border-ethiopian-gold/30 focus:border-ethiopian-gold ${
                            authErrors.email ? 'border-red-500' : ''
                          }`}
                          placeholder="your@email.com"
                        />
                        {authErrors.email && (
                          <p className="text-red-500 text-sm">{authErrors.email}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="login-password">Password</Label>
                        <Input
                          id="login-password"
                          name="password"
                          type="password"
                          value={authForm.password}
                          onChange={handleAuthFormChange}
                          className={`border-ethiopian-gold/30 focus:border-ethiopian-gold ${
                            authErrors.password ? 'border-red-500' : ''
                          }`}
                        />
                        {authErrors.password && (
                          <p className="text-red-500 text-sm">{authErrors.password}</p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-ethiopian-gold hover:bg-ethiopian-gold/90 text-ethiopian-brown"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Signing In...
                          </>
                        ) : (
                          <>
                            <LogIn className="w-4 h-4 mr-2" />
                            Sign In
                          </>
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="signup">
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-name">Full Name</Label>
                        <Input
                          id="signup-name"
                          name="fullName"
                          value={authForm.fullName}
                          onChange={handleAuthFormChange}
                          className={`border-ethiopian-gold/30 focus:border-ethiopian-gold ${
                            authErrors.fullName ? 'border-red-500' : ''
                          }`}
                          placeholder="Your full name"
                        />
                        {authErrors.fullName && (
                          <p className="text-red-500 text-sm">{authErrors.fullName}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <Input
                          id="signup-email"
                          name="email"
                          type="email"
                          value={authForm.email}
                          onChange={handleAuthFormChange}
                          className={`border-ethiopian-gold/30 focus:border-ethiopian-gold ${
                            authErrors.email ? 'border-red-500' : ''
                          }`}
                          placeholder="your@email.com"
                        />
                        {authErrors.email && (
                          <p className="text-red-500 text-sm">{authErrors.email}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <Input
                          id="signup-password"
                          name="password"
                          type="password"
                          value={authForm.password}
                          onChange={handleAuthFormChange}
                          className={`border-ethiopian-gold/30 focus:border-ethiopian-gold ${
                            authErrors.password ? 'border-red-500' : ''
                          }`}
                          placeholder="Minimum 6 characters"
                        />
                        {authErrors.password && (
                          <p className="text-red-500 text-sm">{authErrors.password}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-confirm">Confirm Password</Label>
                        <Input
                          id="signup-confirm"
                          name="confirmPassword"
                          type="password"
                          value={authForm.confirmPassword}
                          onChange={handleAuthFormChange}
                          className={`border-ethiopian-gold/30 focus:border-ethiopian-gold ${
                            authErrors.confirmPassword ? 'border-red-500' : ''
                          }`}
                          placeholder="Confirm your password"
                        />
                        {authErrors.confirmPassword && (
                          <p className="text-red-500 text-sm">{authErrors.confirmPassword}</p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-ethiopian-gold hover:bg-ethiopian-gold/90 text-ethiopian-brown"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Creating Account...
                          </>
                        ) : (
                          <>
                            <UserPlus className="w-4 h-4 mr-2" />
                            Create Account
                          </>
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </TabsContent>
              
              <TabsContent value="business" className="space-y-6 mt-6">
                {user && (
                  <Alert className="border-ethiopian-green/50 bg-ethiopian-green/10">
                    <AlertCircle className="h-4 w-4 text-ethiopian-green" />
                    <AlertDescription className="text-ethiopian-green font-medium">
                      Welcome! Now please complete your business registration below.
                    </AlertDescription>
                  </Alert>
                )}
                
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
                    <Label htmlFor="document">EIN or Business Tax Registration Document Upload *</Label>
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
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;