
import { CartContext } from "../context/CartContext"
import { useContext } from "react"

function Header(){
    const cart = useContext(CartContext);
    if (!cart) {
    throw new Error("Header must be used within CartProvider");
    
}
const { items } = cart;
    return (
    <header style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 2rem", background:'#f5f5f5', borderBottom: '1px solid #ddd'}}>
        <h2>ჩემი მაღაზია</h2>
        <div>
            🛒კალათა: {items.length} ნივთი
        </div>
    </header>
)
}

export default Header