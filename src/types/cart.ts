import { useState } from "react";
export type CartItem ={
    id: number;
    title: string;
    thumbnail: string;
    price: number;
    discountPercentage: number;
    stock: number;
    quantity: number;
}

export type CartState ={
    items: CartItem[];
    }


