import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { CartItem } from "../types/cart";

export interface Order {
    id: string;
    date: string;
    items: CartItem[];
    total: number;
    shippingDetails: {
        name: string;
        address: string;
        cardMasked: string;
    };
}

interface OrderContextType {
    orders: Order[];
    addOrder: (items: CartItem[], total: number, shippingDetails: any) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
    const [orders, setOrders] = useState<Order[]>(() => {
        const saved = localStorage.getItem("shop_orders");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("shop_orders", JSON.stringify(orders));
    }, [orders]);

    const addOrder = (items: CartItem[], total: number, shippingDetails: any) => {
        const newOrder: Order = {
            id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
            date: new Date().toLocaleString(),
            items,
            total,
            shippingDetails,
        };
        setOrders(prev => [newOrder, ...prev]);
    };

    return (
        <OrderContext.Provider value={{ orders, addOrder }}>
            {children}
        </OrderContext.Provider>
    );
}

export function useOrders() {
    const context = useContext(OrderContext);
    if (!context) throw new Error("useOrders must be used within OrderProvider");
    return context;
}