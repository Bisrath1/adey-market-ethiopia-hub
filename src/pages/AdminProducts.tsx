import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, XCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { supabase } from '@/integrations/supabase/client';
import { categories } from '@/data/products';
import { v4 as uuidv4 } from 'uuid';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  origin: string;
  featured: boolean;
}

const AdminProducts: React.FC = () => {
  const { user } = useAuth();
  const { isAdmin, isLoading: roleLoading } = useUserRole();

  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    category: '',
    price: 0,
    description: '',
    image: '',
    origin: '',
    featured: false,
  });

  // Fetch products from Supabase
  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('products').select('*');
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else if (data) {
      setProducts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) fetchProducts();
  }, [isAdmin]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.category || !formData.price || !formData.description) {
      toast({ title: 'Error', description: 'Fill all required fields', variant: 'destructive' });
      return;
    }

    const productPayload = {
      ...formData,
      price: Number(formData.price),
      image: formData.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
      origin: formData.origin || 'Ethiopia',
    };

    setLoading(true);

    if (editingProduct) {
      // Update existing product
      const { error } = await supabase
        .from('products')
        .update(productPayload)
        .eq('id', editingProduct.id);

      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Success', description: 'Product updated' });
        fetchProducts();
      }
    } else {
      // Add new product with generated UUID
      const { error } = await supabase
        .from('products')
        .insert([{ id: uuidv4(), ...productPayload }]);

      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Success', description: 'Product added' });
        fetchProducts();
      }
    }

    setFormData({
      name: '',
      category: '',
      price: 0,
      description: '',
      image: '',
      origin: '',
      featured: false,
    });
    setEditingProduct(null);
    setShowForm(false);
    setLoading(false);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({ ...product });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Deleted', description: 'Product removed' });
      fetchProducts();
    }
  };

  if (roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-12 h-12 border-4 border-ethiopian-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Card className="p-8">
          <CardContent className="text-center">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold">Access Denied</h2>
            <p className="text-gray-600">You do not have permission to access this page.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-ethiopian-brown">Product Management</h1>
            <Button onClick={() => setShowForm(true)} className="bg-ethiopian-gold hover:bg-ethiopian-gold/90">
              <Plus className="w-4 h-4 mr-2" /> Add Product
            </Button>
          </div>

          {showForm && (
            <Card className="mb-6 p-6 bg-white shadow-lg rounded-xl">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input name="name" value={formData.name} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={handleCategoryChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="price">Price *</Label>
                    <Input name="price" type="number" value={formData.price} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label htmlFor="origin">Origin</Label>
                    <Input name="origin" value={formData.origin} onChange={handleInputChange} placeholder="e.g., Yirgacheffe" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea name="description" value={formData.description} onChange={handleInputChange} required />
                </div>

                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input name="image" value={formData.image} onChange={handleInputChange} />
                </div>

                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" name="featured" checked={formData.featured} onChange={handleInputChange} />
                    <span>Featured Product</span>
                  </label>
                  <div className="flex gap-2">
                    <Button type="submit" className="bg-ethiopian-gold hover:bg-ethiopian-gold/90">{editingProduct ? 'Update' : 'Add'}</Button>
                    <Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditingProduct(null); }}>Cancel</Button>
                  </div>
                </div>
              </form>
            </Card>
          )}

          <Card className="shadow-lg rounded-xl overflow-hidden">
            <CardHeader>
              <CardTitle>All Products</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Origin</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map(product => (
                    <TableRow key={product.id}>
                      <TableCell><img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover" /></TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{categories.find(c => c.id === product.category)?.name || product.category}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>{product.origin}</TableCell>
                      <TableCell>{product.featured && <Badge className="bg-ethiopian-gold text-ethiopian-brown">Featured</Badge>}</TableCell>
                      <TableCell className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(product)}><Edit className="w-4 h-4" /></Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(product.id)}><Trash2 className="w-4 h-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {products.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-gray-500">No products available</TableCell>
                    </TableRow>
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

export default AdminProducts;
