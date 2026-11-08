import { Link, useNavigate } from "react-router-dom";
import useCart from "../context/useCart";
import { useAuth } from "../context/AuthContext";

export function Header() {
    const { items } = useCart();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 shadow-lg shadow-violet-500/5 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 group transition-transform duration-200 active:scale-95">
                    <div className="w-8 h-8 rounded-xl bg-linear-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-md shadow-violet-500/30">
                        <span className="text-white font-black text-xs">10</span>
                    </div>
                    <span className="text-xl font-black bg-linear-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent tracking-tight">
                        10x Shop
                    </span>
                </Link>
                
                <nav className="flex items-center gap-4 sm:gap-6">
                    <Link to="/" className="text-slate-300 hover:text-violet-400 font-semibold text-xs sm:text-sm transition-colors">
                        მთავარი
                    </Link>

                    <Link to="/cart" className="relative flex items-center gap-1.5 text-slate-300 hover:text-violet-400 font-semibold text-xs sm:text-sm transition-colors py-1 px-3 rounded-xl hover:bg-slate-800/50">
                        <span>კალათა</span>
                        {totalItems > 0 && (
                            <span className="absolute -top-1.5 -right-2 bg-linear-to-r from-violet-600 to-fuchsia-600 text-white text-[11px] min-w-5 h-5 px-1 flex items-center justify-center rounded-full font-black shadow-md shadow-violet-500/30 animate-pulse">
                                {totalItems}
                            </span>
                        )}
                    </Link>

                    {/* თუ დალოგინებულია, ვუჩვენებთ "გასვლა"-ს, თუ არა - "შესვლა"-ს */}
                    {user ? (
                        <button 
                            onClick={handleLogout}
                            className="bg-slate-800 hover:bg-red-500/20 hover:text-red-400 text-slate-300 text-xs sm:text-sm font-bold px-4 py-2 rounded-xl border border-slate-700 transition-all duration-200 active:scale-95"
                        >
                            გასვლა
                        </button>
                    ) : (
                        <Link 
                            to="/login" 
                            className="bg-linear-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-xl shadow-md shadow-violet-600/30 transition-all duration-200 active:scale-95"
                        >
                            შესვლა
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Header;