
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
    addToCart: (product: CartItem) => void
}