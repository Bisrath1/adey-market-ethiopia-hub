import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { toast } from '@/hooks/use-toast';
import { Users, CheckCircle, XCircle } from 'lucide-react';

interface Customer {
  id: string;
  full_name: string;
  email: string;
  company_name: string;
  business_phone: string;
  mobile_phone?: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  tax_id: string;
  ein_document_url?: string;
  approval_status: string;
}

const AdminDashboard = () => {
  const { user } = useAuth();
  const { isAdmin, isLoading: roleLoading } = useUserRole();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user && isAdmin) {
      fetchData();
    }
  }, [user, isAdmin]);

const fetchData = async () => {
  try {
    // Fetch all customers
    const { data: customersData, error: customersError } = await supabase
      .from('customers')
      .select('*');

    if (customersError) throw customersError;

    // Fetch all admin user_ids
    const { data: adminsData, error: adminsError } = await supabase
      .from('user_roles')
      .select('user_id')
      .eq('role', 'admin');

    if (adminsError) throw adminsError;

    // Get list of admin user IDs
    const adminUserIds = new Set(adminsData.map((admin) => admin.user_id));

    // Filter out customers whose id is in adminUserIds
    const filteredCustomers = customersData.filter(
      (customer) => !adminUserIds.has(customer.id)
    );

    setCustomers(filteredCustomers);
  } catch (error) {
    console.error('Error fetching data:', error);
    toast({
      title: 'Error',
      description: 'Failed to fetch customers',
      variant: 'destructive',
    });
  } finally {
    setIsLoading(false);
  }
};


const handleApproval = async (customerId: string, status: 'approved' | 'rejected') => {
  try {
    const { data, error } = await supabase
      .from('customers')
      .update({ approval_status: status })
      .eq('id', customerId)
      .select()
      .single();

    if (error) throw error;

    // ✅ If approved, send email
    if (status === "approved" && data?.email) {
      await fetch("http://localhost:4242/email-veri", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          full_name: data.full_name,
        }),
      });
    }

    toast({
      title: "Success",
      description: `Customer ${status} successfully`,
    });

    fetchData();
  } catch (error) {
    console.error("Error updating approval status:", error);
    toast({
      title: "Error",
      description: "Failed to update customer status",
      variant: "destructive",
    });
  }
};




  if (roleLoading || isLoading) {
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

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-ethiopian-cream/30 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <XCircle className="w-16 h-16 text-red-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-center text-gray-600">You don't have permission to access this page.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const pendingCustomers = customers.filter(
    (c) => c.approval_status?.toLowerCase().trim() === 'pending'
  );
  const approvedCustomers = customers.filter(
    (c) => c.approval_status?.toLowerCase().trim() === 'approved'
  );

  console.log('Pending customers:', pendingCustomers);
  console.log('Approved customers:', approvedCustomers);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-ethiopian-cream/30">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-ethiopian-brown mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage customers</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Customers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingCustomers.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Approved Customers</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{approvedCustomers.length}</div>
              </CardContent>
            </Card>
          </div>

          {/* Customer Approvals Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Customer Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Tax ID</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingCustomers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-gray-500">
                        No pending customers for approval
                      </TableCell>
                    </TableRow>
                  ) : (
                    pendingCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell className="font-medium">{customer.full_name}</TableCell>
                        <TableCell>{customer.company_name}</TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>{customer.business_phone}</TableCell>
                        <TableCell>{customer.tax_id}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {customer.street}<br />
                            {customer.city}, {customer.state} {customer.zip}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{customer.approval_status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => handleApproval(customer.id, 'approved')}>
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleApproval(customer.id, 'rejected')}
                            >
                              Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Approved Customers Section */}
          <Card>
            <CardHeader>
              <CardTitle>Approved Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Tax ID</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {approvedCustomers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-gray-500">
                        No approved customers
                      </TableCell>
                    </TableRow>
                  ) : (
                    approvedCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell className="font-medium">{customer.full_name}</TableCell>
                        <TableCell>{customer.company_name}</TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>{customer.business_phone}</TableCell>
                        <TableCell>{customer.tax_id}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {customer.street}<br />
                            {customer.city}, {customer.state} {customer.zip}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            {customer.approval_status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              // Mock customer detail view
                              toast({
                                title: "Customer Details",
                                description: `${customer.full_name} - ${customer.company_name}`,
                              });
                            }}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboard;
