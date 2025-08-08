import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useCustomerApproval } from '@/hooks/useCustomerApproval';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { toast } from '@/hooks/use-toast';
import { User, ShoppingCart, Clock, CheckCircle, XCircle } from 'lucide-react';

interface CustomerData {
  id: string;
  full_name: string;
  email: string;
  company_name: string;
  business_phone: string;
  mobile_phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  approval_status: string;
}

interface Order {
  id: string;
  total_amount: number;
  status: string;
  payment_status: string;
  created_at: string;
  order_items: {
    product_id: number;
    quantity: number;
    unit_price: number;
    total_price: number;
  }[];
}

const CustomerDashboard = () => {
  const { user } = useAuth();
  const { isApproved, approvalStatus, isLoading: approvalLoading } = useCustomerApproval();
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<CustomerData>>({});

  useEffect(() => {
    if (user) {
      fetchCustomerData();
      fetchOrders();
    }
  }, [user]);

  const fetchCustomerData = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      setCustomerData(data);
      setEditForm(data);
    } catch (error) {
      console.error('Error fetching customer data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrders = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            product_id,
            quantity,
            unit_price,
            total_price
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleUpdateProfile = async () => {
    if (!customerData) return;

    try {
      const { error } = await supabase
        .from('customers')
        .update(editForm)
        .eq('id', customerData.id);

      if (error) throw error;

      setCustomerData({ ...customerData, ...editForm });
      setIsEditing(false);
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  if (approvalLoading || isLoading) {
    return (
      <div className="min-h-screen bg-ethiopian-cream/30 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <div className="w-8 h-8 animate-spin border-4 border-ethiopian-gold border-t-transparent rounded-full mb-4" />
            <p className="text-center text-gray-600">Loading...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!customerData) {
    return (
      <div className="min-h-screen bg-ethiopian-cream/30 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <XCircle className="w-16 h-16 text-red-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Customer Data Found</h2>
            <p className="text-center text-gray-600">Please complete your business registration first.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusIcon = () => {
    switch (approvalStatus) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusMessage = () => {
    switch (approvalStatus) {
      case 'approved':
        return 'Your account has been approved! You now have full access to our products and pricing.';
      case 'rejected':
        return 'Your account application was not approved. Please contact support for more information.';
      default:
        return 'Your account is pending approval. You will receive an email notification once reviewed.';
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-ethiopian-cream/30">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-ethiopian-brown mb-2">Customer Dashboard</h1>
            <p className="text-gray-600">Manage your account and view order history</p>
          </div>

          {/* Account Status Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getStatusIcon()}
                Account Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Badge variant={
                    approvalStatus === 'approved' ? 'default' :
                    approvalStatus === 'rejected' ? 'destructive' : 'secondary'
                  }>
                    {approvalStatus?.toUpperCase()}
                  </Badge>
                  <p className="text-gray-600 mt-2">{getStatusMessage()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="orders">Order History</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile Information
                  </CardTitle>
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (isEditing) {
                        setEditForm(customerData);
                      }
                      setIsEditing(!isEditing);
                    }}
                  >
                    {isEditing ? 'Cancel' : 'Edit'}
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="full_name">Full Name</Label>
                      {isEditing ? (
                        <Input
                          id="full_name"
                          value={editForm.full_name || ''}
                          onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                        />
                      ) : (
                        <p className="text-gray-900">{customerData.full_name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company_name">Company Name</Label>
                      {isEditing ? (
                        <Input
                          id="company_name"
                          value={editForm.company_name || ''}
                          onChange={(e) => setEditForm({ ...editForm, company_name: e.target.value })}
                        />
                      ) : (
                        <p className="text-gray-900">{customerData.company_name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <p className="text-gray-600">{customerData.email}</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="business_phone">Business Phone</Label>
                      {isEditing ? (
                        <Input
                          id="business_phone"
                          value={editForm.business_phone || ''}
                          onChange={(e) => setEditForm({ ...editForm, business_phone: e.target.value })}
                        />
                      ) : (
                        <p className="text-gray-900">{customerData.business_phone}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mobile_phone">Mobile Phone</Label>
                      {isEditing ? (
                        <Input
                          id="mobile_phone"
                          value={editForm.mobile_phone || ''}
                          onChange={(e) => setEditForm({ ...editForm, mobile_phone: e.target.value })}
                        />
                      ) : (
                        <p className="text-gray-900">{customerData.mobile_phone || 'N/A'}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="street">Street Address</Label>
                      {isEditing ? (
                        <Input
                          id="street"
                          value={editForm.street || ''}
                          onChange={(e) => setEditForm({ ...editForm, street: e.target.value })}
                        />
                      ) : (
                        <p className="text-gray-900">{customerData.street}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        {isEditing ? (
                          <Input
                            id="city"
                            value={editForm.city || ''}
                            onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                          />
                        ) : (
                          <p className="text-gray-900">{customerData.city}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        {isEditing ? (
                          <Input
                            id="state"
                            value={editForm.state || ''}
                            onChange={(e) => setEditForm({ ...editForm, state: e.target.value })}
                          />
                        ) : (
                          <p className="text-gray-900">{customerData.state}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code</Label>
                      {isEditing ? (
                        <Input
                          id="zip"
                          value={editForm.zip || ''}
                          onChange={(e) => setEditForm({ ...editForm, zip: e.target.value })}
                        />
                      ) : (
                        <p className="text-gray-900">{customerData.zip}</p>
                      )}
                    </div>
                  </div>

                  {isEditing && (
                    <div className="mt-6 flex gap-4">
                      <Button onClick={handleUpdateProfile}>
                        Save Changes
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Order History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {orders.length === 0 ? (
                    <p className="text-gray-600 text-center py-8">No orders found.</p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Total Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Payment</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Items</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-mono text-sm">{String(order.id).slice(0, 8)}</TableCell>

                            <TableCell>${Number(order.total_amount).toFixed(2)}</TableCell>
                            <TableCell>
                              <Badge variant={order.status === 'completed' ? 'default' : 'secondary'}>
                                {order.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={order.payment_status === 'paid' ? 'default' : 'destructive'}>
                                {order.payment_status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {new Date(order.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              {order.order_items?.length || 0} items
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default CustomerDashboard;