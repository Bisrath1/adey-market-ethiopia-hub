import { create } from 'zustand'
import { supabase } from '@/integrations/supabase/client'
import { Product } from '@/data/products'
import { v4 as uuidv4 } from 'uuid';
interface ProductStore {
  products: Product[]
  fetchProducts: () => Promise<void>
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>
  deleteProduct: (id: string) => Promise<void>
  getProduct: (id: string) => Product | undefined
  getFeaturedProducts: () => Product[]
  getProductsByCategory: (category: string) => Product[]
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],

  // Load products from Supabase
  fetchProducts: async () => {
    const { data, error } = await supabase.from('products').select('*')
    if (error) {
      console.error('Error fetching products:', error.message)
      return
    }
    set({ products: data as Product[] })
  },

addProduct: async (productData) => {
  const newProduct = { ...productData, id: uuidv4() }

  const { data, error } = await supabase
    .from('products')
    .insert([newProduct])
    .select()

  if (error) throw error

  set((state) => ({
    products: [...state.products, data![0] as Product],
  }))
},

  updateProduct: async (id, updates) => {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()

    if (error) {
      console.error('Error updating product:', error.message)
      throw error
    }

    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? (data![0] as Product) : p
      ),
    }))
  },

  deleteProduct: async (id) => {
    const { error } = await supabase.from('products').delete().eq('id', id)

    if (error) {
      console.error('Error deleting product:', error.message)
      throw error
    }

    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    }))
  },

  getProduct: (id) => {
    return get().products.find((p) => p.id === id)
  },

  getFeaturedProducts: () => {
    return get().products.filter((p) => p.featured)
  },

  getProductsByCategory: (category) => {
    return get().products.filter((p) => p.category === category)
  },
}))
