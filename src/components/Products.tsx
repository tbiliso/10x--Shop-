import { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";
import type { Product } from "../types/product";

function Products(){
    const [products, setProducts] = useState<Product[]>([]);
    const cart = useContext(CartContext);
    if (!cart) {
    throw new Error("Products must be used within CartProvider");
}
const { addToCart } = cart;

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => setProducts(data));
    }, []);
    return (
    <div>
        <h2>Products</h2>
        {products.map((product) =>(
            <div key={product.id}>
                <h3>{product.title}</h3>
                <p>{product.price}</p>
                <img src={product.image} alt={product.title} />
                <button onClick={() => addToCart({ ...product, quantity: 1 })}>Add To Cart</button>
                </div>
        ))}
    </div>
);
}

export default Products