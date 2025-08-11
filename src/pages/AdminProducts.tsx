import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { toast } from '@/hooks/use-toast';
import { Upload, Plus, Edit, Trash2, Package, XCircle } from 'lucide-react';

// Mock products data - in real app this would come from backend
const mockProducts = [
  {
    id: '1',
    name: 'Premium Ethiopian Coffee Beans',
    category: 'coffee',
    price: 24.99,
    description: 'Premium single-origin coffee beans from Yirgacheffe region',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop',
    origin: 'Yirgacheffe, Ethiopia',
    featured: true,
    inStock: true
  },
  {
    id: '2',
    name: 'Traditional Berbere Spice Blend',
    category: 'spices',
    price: 18.50,
    description: 'Authentic Ethiopian spice blend perfect for traditional dishes',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop',
    origin: 'Addis Ababa, Ethiopia',
    featured: false,
    inStock: true
  }
];

const categories = [
  { id: 'coffee', name: 'Coffee' },
  { id: 'spices', name: 'Spices & Seasonings' },
  { id: 'textiles', name: 'Textiles' },
  { id: 'crafts', name: 'Handicrafts' },
  { id: 'food', name: 'Food Products' },
  { id: 'household', name: 'Household Items' }
];

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  origin: string;
  featured: boolean;
  inStock: boolean;
}

const AdminProducts = () => {
  const { user } = useAuth();
  const { isAdmin, isLoading: roleLoading } = useUserRole();
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    image: '',
    origin: '',
    featured: false,
    inStock: true
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || !formData.price || !formData.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newProduct: Product = {
      id: editingProduct?.id || Date.now().toString(),
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      description: formData.description,
      image: formData.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
      origin: formData.origin || 'Ethiopia',
      featured: formData.featured,
      inStock: formData.inStock
    };

    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? newProduct : p));
      toast({
        title: "Success",
        description: "Product updated successfully",
      });
    } else {
      setProducts(prev => [...prev, newProduct]);
      toast({
        title: "Success",
        description: "Product added successfully",
      });
    }

    // Reset form
    setFormData({
      name: '',
      category: '',
      price: '',
      description: '',
      image: '',
      origin: '',
      featured: false,
      inStock: true
    });
    setShowAddForm(false);
    setEditingProduct(null);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      description: product.description,
      image: product.image,
      origin: product.origin,
      featured: product.featured,
      inStock: product.inStock
    });
    setShowAddForm(true);
  };

  const handleDelete = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    toast({
      title: "Success",
      description: "Product deleted successfully",
    });
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      category: '',
      price: '',
      description: '',
      image: '',
      origin: '',
      featured: false,
      inStock: true
    });
    setShowAddForm(false);
    setEditingProduct(null);
  };

  if (roleLoading) {
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

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-ethiopian-cream/30">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-ethiopian-brown mb-2">Product Management</h1>
            <p className="text-gray-600">Add, edit, and manage your products</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{products.length}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Featured Products</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{products.filter(p => p.featured).length}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">In Stock</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{products.filter(p => p.inStock).length}</div>
              </CardContent>
            </Card>
          </div>

          {/* Add Product Button */}
          <div className="mb-6">
            <Button onClick={() => setShowAddForm(true)} className="bg-ethiopian-gold hover:bg-ethiopian-gold/90">
              <Plus className="w-4 h-4 mr-2" />
              Add New Product
            </Button>
          </div>

          {/* Add/Edit Product Form */}
          {showAddForm && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Product Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select value={formData.category} onValueChange={handleCategoryChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="price">Price *</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="origin">Origin</Label>
                      <Input
                        id="origin"
                        name="origin"
                        value={formData.origin}
                        onChange={handleInputChange}
                        placeholder="e.g., Yirgacheffe, Ethiopia"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleInputChange}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm font-medium">Featured Product</span>
                    </label>
                    
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="inStock"
                        checked={formData.inStock}
                        onChange={handleInputChange}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm font-medium">In Stock</span>
                    </label>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button type="submit" className="bg-ethiopian-gold hover:bg-ethiopian-gold/90">
                      {editingProduct ? 'Update Product' : 'Add Product'}
                    </Button>
                    <Button type="button" variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Products Table */}
          <Card>
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
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-gray-500">
                        No products added yet
                      </TableCell>
                    </TableRow>
                  ) : (
                    products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        </TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>
                          {categories.find(c => c.id === product.category)?.name || product.category}
                        </TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell>{product.origin}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {product.featured && (
                              <Badge variant="default" className="bg-ethiopian-gold text-ethiopian-brown">
                                Featured
                              </Badge>
                            )}
                            <Badge variant={product.inStock ? 'default' : 'secondary'}>
                              {product.inStock ? 'In Stock' : 'Out of Stock'}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(product)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(product.id)}
                            >
                              <Trash2 className="w-4 h-4" />
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
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminProducts;