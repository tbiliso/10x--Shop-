import { useContext } from "react"
import { CartContext } from "../context/CartContext"


function Header(){
    const {Cart} = useContext(CartContext)
    return (
    <header style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 2rem", background:'#f5f5f5', borderBottom: '1px solid #ddd'}}>
        <h2>ჩემი მაღაზია</h2>
        <div>
            🛒კალათა: {Cart.length} ნივთი
        </div>
    </header>
)
}

export default Header