import { create } from 'zustand';
import { products as initialProducts, Product } from '@/data/products';

interface ProductStore {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
  getFeaturedProducts: () => Product[];
  getProductsByCategory: (category: string) => Product[];
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: initialProducts,
  
  addProduct: (productData) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
    };
    set((state) => ({
      products: [...state.products, newProduct],
    }));
  },
  
  updateProduct: (id, updates) => {
    set((state) => ({
      products: state.products.map(product =>
        product.id === id ? { ...product, ...updates } : product
      ),
    }));
  },
  
  deleteProduct: (id) => {
    set((state) => ({
      products: state.products.filter(product => product.id !== id),
    }));
  },
  
  getProduct: (id) => {
    return get().products.find(product => product.id === id);
  },
  
  getFeaturedProducts: () => {
    return get().products.filter(product => product.featured);
  },
  
  getProductsByCategory: (category) => {
    return get().products.filter(product => product.category === category);
  },
}));