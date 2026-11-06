import { useState, createContext } from "react";
import type { CartItem, CartContextType  } from "../types/cart";


export const CartContext = createContext<CartContextType | null>(null)

function CartProvider({ children }: { children: React.ReactNode }){
    const [items, setItems]=useState<CartItem[]>([])
    const addToCart = (product: CartItem) => {
        setItems([...items, product])
    }
    return (<CartContext.Provider value={{ items, addToCart }}>
            {children}
        </CartContext.Provider>)
}

export default CartProvider