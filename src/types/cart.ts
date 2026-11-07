
export type CartItem ={
    id: number;
    title: string;
    price: number;
    image: string
    quantity: number;
}

export type CartState ={
    items: CartItem[];
    }



export type CartContextType={
    items: CartItem[];
    addToCart: (product: CartItem) => void;
    updateQuantity: (id: number, quantity: number) => void;
    removeItem: (id: number) => void;
}