import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/data/products';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  subtotal: number;
}

interface CartStore {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItem: (productId: string) => CartItem | undefined;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => {
      // Utility function to calculate totals, to avoid repeating code
      const calculateTotals = (items: CartItem[]) => ({
        totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
        totalAmount: items.reduce((sum, item) => sum + item.subtotal, 0),
      });

      return {
        items: [],
        totalItems: 0,
        totalAmount: 0,

        addItem: (product: Product, quantity = 1) => {
          const items = get().items;
          const existingItem = items.find(item => item.id === product.id);

          let updatedItems: CartItem[];
          if (existingItem) {
            updatedItems = items.map(item =>
              item.id === product.id
                ? {
                    ...item,
                    quantity: item.quantity + quantity,
                    subtotal: (item.quantity + quantity) * product.price,
                  }
                : item
            );
          } else {
            const newItem: CartItem = {
              id: product.id,
              product,
              quantity,
              subtotal: quantity * product.price,
            };
            updatedItems = [...items, newItem];
          }

          const totals = calculateTotals(updatedItems);
          set({ items: updatedItems, ...totals });
        },

        removeItem: (productId: string) => {
          const items = get().items.filter(item => item.id !== productId);
          const totals = calculateTotals(items);
          set({ items, ...totals });
        },

        updateQuantity: (productId: string, quantity: number) => {
          if (quantity <= 0) {
            get().removeItem(productId);
            return;
          }
          const updatedItems = get().items.map(item =>
            item.id === productId
              ? {
                  ...item,
                  quantity,
                  subtotal: quantity * item.product.price,
                }
              : item
          );
          const totals = calculateTotals(updatedItems);
          set({ items: updatedItems, ...totals });
        },

        clearCart: () => {
          set({
            items: [],
            totalItems: 0,
            totalAmount: 0,
          });
        },

        getItem: (productId: string) => {
          return get().items.find(item => item.id === productId);
        },
      };
    },
    {
      name: 'cart-storage',
    }
  )
);
