import { Link } from "react-router-dom";
import useCart from "../context/useCart";

export function Header() {
    const { items } = useCart();
    
    // გამოვთვალოთ კალათაში არსებული ნივთების საერთო რაოდენობა
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* ლოგო / მთავარი გვერდის ლინკი */}
                <Link to="/" className="text-2xl font-bold text-indigo-600">
                    MyShop
                </Link>
                
                {/* ნავიგაცია */}
                <nav className="flex items-center gap-6">
                    <Link to="/" className="text-gray-600 hover:text-indigo-600 font-medium transition">
                        მთავარი
                    </Link>

                    {/* კალათის ღილაკი აიქონით და რაოდენობის ბეიჯით */}
                    <Link to="/cart" className="relative flex items-center gap-1 text-gray-600 hover:text-indigo-600 font-medium transition">
                        <span>კალათა</span>
                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-3 bg-indigo-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-sm">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;