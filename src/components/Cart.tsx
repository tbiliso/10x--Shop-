import useCart from "../context/useCart";

export function Cart() {
    const { items, updateQuantity, removeItem } = useCart();

    // გამოვთვალოთ საერთო ჯამი
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">შენი კალათა</h2>

            {items.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    <p className="text-lg">კალათა ცარიელია</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {items.map(item => (
                        <div 
                            key={item.id} 
                            className="flex items-center justify-between border-b pb-4 gap-4"
                        >
                            {/* პროდუქტის სურათი და აღწერა */}
                            <div className="flex items-center gap-4">
                                <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    className="w-20 h-20 object-cover rounded-md border" 
                                />
                                <div>
                                    <h3 className="font-semibold text-gray-800">{item.title}</h3>
                                    <p className="text-gray-600">${item.price}</p>
                                </div>
                            </div>

                            {/* stepper */}
                            <div className="flex items-center gap-6">
                                <div className="flex items-center border rounded-md overflow-hidden bg-gray-50">
                                    <button 
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 transition text-gray-700 font-bold"
                                    >
                                        -
                                    </button>
                                    <span className="px-4 py-1 text-gray-800 font-medium">{item.quantity}</span>
                                    <button 
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 transition text-gray-700 font-bold"
                                    >
                                        +
                                    </button>
                                </div>

                                <span className="font-bold text-gray-900 w-20 text-right">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </span>

                                {/* წაშლის ღილაკი */}
                                <button 
                                    onClick={() => removeItem(item.id)}
                                    className="text-red-500 hover:text-red-700 font-medium transition"
                                >
                                    წაშლა
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* სავაჭრო კალათის ბოლო: საერთო თანხა და შეკვეთის ღილაკი */}
                    <div className="mt-8 flex justify-between items-center pt-4 border-t">
                        <div className="text-xl font-bold text-gray-800">
                            სულ ჯამი: <span className="text-indigo-600">${totalPrice.toFixed(2)}</span>
                        </div>
                        <button 
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium transition shadow-sm"
                            onClick={() => alert("შეკვეთა მზად არის!")}
                        >
                            შეკვეთის გაფორმება
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;