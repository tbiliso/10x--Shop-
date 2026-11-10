import { useState, createContext, useEffect } from "react";
import type { CartItem, CartContextType } from "../types/cart";

export const CartContext = createContext<CartContextType | null>(null);

function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>(() => {
        const saved = localStorage.getItem("shop_cart");
        return saved ? JSON.parse(saved) : [];
    });

    // Promo code State (save on localStorage)
    const [promoCode, setPromoCode] = useState<string | null>(() => {
        return localStorage.getItem("shop_promo") || null;
    });

    const [discountPercent, setDiscountPercent] = useState<number>(() => {
        return localStorage.getItem("shop_promo") === "10X10" ? 10 : 0;
    });

    useEffect(() => {
        localStorage.setItem("shop_cart", JSON.stringify(items));
    }, [items]);

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

    // change quantity (+ / -)
    const updateQuantity = (productId: number, quantity: number) => {
        if (quantity <= 0) {
            removeItem(productId);
            return;
        }
        setItems(prev => prev.map(item => 
            item.id === productId ? { ...item, quantity } : item
        ));
    };

    // delete item
    const removeItem = (productId: number) => {
        setItems(prev => prev.filter(item => item.id !== productId));
    };

    // check promo code
    const applyPromoCode = (code: string) => {
        // trim code and write lowewrcase
        const formatted = code.trim().toLowerCase();

        // check strarts or not code name with "promo"
        const match = formatted.match(/^promo(\d+)$/);

        if (match) {
            const discountValue = parseInt(match[1], 10);

            // check is discount amount between 10 and 50 and step is 5
            if (discountValue >= 10 && discountValue <= 50 && discountValue % 5 === 0) {
                setPromoCode(formatted.toUpperCase()); // მაგ: PROMO25
                setDiscountPercent(discountValue);
                localStorage.setItem("shop_promo", formatted.toUpperCase());
                return { success: true, message: `Promo code applied successfully (-${discountValue}%)!` };
            }
        }

        return { success: false, message: "Invalid promo code (use promo10 to promo50 with step 5)" };
    };

    // delete/disable promo code
    const removePromoCode = () => {
        setPromoCode(null);
        setDiscountPercent(0);
        localStorage.removeItem("shop_promo");
    };

    // sum ammount
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountAmount = (subtotal * discountPercent) / 100;
    const total = Math.max(0, subtotal - discountAmount);

    return (
        <CartContext.Provider 
            value={{ 
                items, 
                addToCart, 
                updateQuantity, 
                removeItem,
                promoCode,
                discountPercent,
                applyPromoCode,
                removePromoCode,
                subtotal,
                discountAmount,
                total
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;