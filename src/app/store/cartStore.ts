import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Product = {
  id?: string;
  name?: string;
  price?: number;
  quantity: number;
  imageUrl?: string;
  description?: string;
  categoryName?: string;
};

type CartState = {
  cart: Product[];
  addToCart: (product: Product) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getTotalItems: () => number; // Hàm tính tổng số lượng sản phẩm
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product) =>
        set((state) => {
          const exists = state.cart.find((p) => p.id === product.id);
          if (exists) {
            return {
              cart: state.cart.map((p) =>
                p.id === product.id
                  ? { ...p, quantity: p.quantity + product.quantity }
                  : p
              ),
            };
          }
          return { cart: [...state.cart, product] };
        }),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          cart: state.cart.map((p) => (p.id === id ? { ...p, quantity } : p)),
        })),
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((p) => p.id !== id),
        })),
      clearCart: () => set({ cart: [] }),
      getTotalItems: () =>
        get().cart.reduce((total, product) => total + product.quantity, 0),
    }),
    {
      name: "cart-storage",
    }
  )
);
