import { Link } from "react-router-dom";
import useCart from "../context/useCart";

export function Header() {
    const { items } = useCart();
    
    // გამოვთვალოთ კალათაში არსებული ნივთების საერთო რაოდენობა
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-indigo-100/60 shadow-sm transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* ლოგო / მთავარი გვერდის ლინკი გრადიენტით */}
                <Link to="/" className="flex items-center gap-2 group transition-transform duration-200 active:scale-95">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:shadow-lg transition-all duration-300">
                        <span className="text-white font-black text-xs">10</span>
                    </div>
                    <span className="text-xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight">
                        10x Shop
                    </span>
                </Link>
                
                {/* ნავიგაცია */}
                <nav className="flex items-center gap-6">
                    <Link to="/" className="text-gray-600 hover:text-indigo-600 font-semibold text-sm transition-colors">
                        მთავარი
                    </Link>

                    {/* კალათის ღილაკი აიქონით და რაოდენობის ბეიჯით */}
                    <Link to="/cart" className="relative flex items-center gap-1.5 text-gray-600 hover:text-indigo-600 font-semibold text-sm transition-colors py-1 px-3 rounded-xl hover:bg-indigo-50/50">
                        <span>კალათა</span>
                        {totalItems > 0 && (
                            <span className="absolute -top-1.5 -right-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[11px] min-w-[20px] h-5 px-1 flex items-center justify-center rounded-full font-black shadow-md shadow-indigo-500/30 animate-pulse">
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