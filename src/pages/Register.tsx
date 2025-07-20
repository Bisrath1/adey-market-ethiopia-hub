
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload } from 'lucide-react';

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

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log('Registration form submitted:', formData);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="min-h-screen bg-ethiopian-cream/30 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-ethiopian-brown mb-4">
            New Customer Registration
          </h1>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 max-w-3xl mx-auto">
            <p className="text-yellow-800 font-medium">
              ⚠️ Please note that we ONLY approve customers with existing and active businesses in the United States of America.
            </p>
          </div>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-ethiopian-brown">Business Registration</CardTitle>
            <CardDescription>
              Please provide your business details to set up your wholesale account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                >
                  Submit Registration
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
