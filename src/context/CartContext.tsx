import { useState, createContext } from "react";
import type { CartItem, CartContextType } from "../types/cart";

export const CartContext = createContext<CartContextType | null>(null);

function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    const addToCart = (product: CartItem) => {
        setItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => 
                    item.id === product.id 
                        ? { ...item, quantity: item.quantity + product.quantity }
                        : item
                );
            }
            return [...prev, product];
        });
    };

    // რაოდენობის შეცვლის ფუნქცია (+ / -)
    const updateQuantity = (productId: number, quantity: number) => {
        if (quantity <= 0) {
            removeItem(productId);
            return;
        }
        setItems(prev => prev.map(item => 
            item.id === productId ? { ...item, quantity } : item
        ));
    };

    // ნივთის წაშლის ფუნქცია
    const removeItem = (productId: number) => {
        setItems(prev => prev.filter(item => item.id !== productId));
    };

    return (
        <CartContext.Provider value={{ items, addToCart, updateQuantity, removeItem }}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;