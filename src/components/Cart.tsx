import useCart from "../context/useCart";



export function Cart(){
        const {items} = useCart()
        return (
        <div>
            {items.length === 0 ? (
                <p>კალათა ცარიელია</p>
            ) : (
                items.map(item => (
                    <div key={item.id}>
                    <p>{item.title}</p>
                    <p>{item.price}</p>
                    </div>
                ))
            )}
        </div>
    );
    
}

export default Cart