import { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";

function Products(){
    const [products, setProducts] = useState<any[]>([]);
    const { addToCart } = useContext(CartContext)

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => setProducts(data));
    }, [],);
    return (
    <div>
        <h2>Products</h2>
        {products.map((product) =>(
            <div key={product.id}>
                <h3>{product.title}</h3>
                <p>{product.price}</p>
                <button onClick={()=>addToCart(product)}>Add To Cart</button>
                </div>
        ))}
    </div>
);
}

export default Products