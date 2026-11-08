import { Link, useNavigate } from "react-router-dom";
import useCart from "../context/useCart";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, Globe, ShoppingCart, LogIn, LogOut } from "lucide-react";

export function Header() {
    const { items } = useCart();
    const { user, logout } = useAuth();
    const { lang, toggleLang, t } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-md">
                        <span className="text-white font-black text-xs">10</span>
                    </div>
                    <span className="text-xl font-black bg-linear-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                        10x Shop
                    </span>
                </Link>
                
                <nav className="flex items-center gap-3 sm:gap-6">
                    <Link to="/" className="text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 font-semibold text-sm transition-colors">
                        {t("home")}
                    </Link>

                    <Link to="/cart" className="relative flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 font-semibold text-sm transition-colors py-1 px-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
                        <ShoppingCart className="w-4 h-4" />
                        <span>{t("cart")}</span>
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 bg-linear-to-r from-violet-600 to-fuchsia-600 text-white text-[10px] min-w-45 h-4.5 flex items-center justify-center rounded-full font-bold shadow animate-pulse">
                                {totalItems}
                            </span>
                        )}
                    </Link>

                    {/* ენის გადამრთველი */}
                    <button 
                        onClick={toggleLang}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    >
                        <Globe className="w-3.5 h-3.5 text-violet-500" />
                        {lang.toUpperCase()}
                    </button>

                    {/* თემის გადამრთველი (Dark/Light) */}
                    <button 
                        onClick={toggleTheme}
                        className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    >
                        {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
                    </button>

                    {/* ავტორიზაციის ღილაკი */}
                    {user ? (
                        <button 
                            onClick={() => { logout(); navigate("/"); }}
                            className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-red-500/10 hover:text-red-500 text-slate-700 dark:text-slate-300 text-xs font-bold px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 transition"
                        >
                            <LogOut className="w-3.5 h-3.5" />
                            <span>{t("logout")}</span>
                        </button>
                    ) : (
                        <Link 
                            to="/login" 
                            className="flex items-center gap-1.5 bg-linear-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md transition"
                        >
                            <LogIn className="w-3.5 h-3.5" />
                            <span>{t("login")}</span>
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Header;