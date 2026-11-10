import { useState } from "react";
import useCart from "../context/useCart";
import { useLanguage } from "../context/LanguageContext";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, ShoppingBag, Tag, Check, X } from "lucide-react";

export function Cart() {
    const { 
        items, 
        updateQuantity, 
        removeItem, 
        subtotal, 
        discountAmount, 
        total, 
        promoCode, 
        discountPercent, 
        applyPromoCode, 
        removePromoCode 
    } = useCart() as any; // უზრუნველყოფს ტიპების თავსებადობას

    const { t } = useLanguage();
    const navigate = useNavigate();

    const [inputCode, setInputCode] = useState("");
    const [promoError, setPromoError] = useState("");

    const handleApplyPromo = (e: React.FormEvent) => {
        e.preventDefault();
        setPromoError("");
        const res = applyPromoCode(inputCode);
        if (!res.success) {
            setPromoError(res.message);
        } else {
            setInputCode("");
        }
    };

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
                <div className="w-16 h-16 bg-violet-500/10 text-violet-600 dark:text-violet-400 rounded-3xl flex items-center justify-center mb-4">
                    <ShoppingBag className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2">
                    {t("cartEmpty")}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-xs mb-6">
                    {t("cartEmptyDesc")}
                </p>
                <Link
                    to="/"
                    className="bg-linear-to-r from-violet-600 to-fuchsia-600 text-white font-bold px-6 py-3 rounded-2xl text-xs shadow-lg hover:opacity-90 transition"
                >
                    {t("home")}
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl mt-6 transition-colors">
            <h2 className="text-2xl font-black mb-6 text-slate-900 dark:text-white tracking-tight">
                {t("cart")}
            </h2>

            <div className="space-y-4">
                {items.map((item: any) => (
                    <div 
                        key={item.id} 
                        className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 gap-4"
                    >
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                            <img 
                                src={item.image} 
                                alt={item.title} 
                                className="w-20 h-20 object-contain rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2" 
                            />
                            <div>
                                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 line-clamp-1">{item.title}</h3>
                                <p className="text-violet-600 dark:text-violet-400 font-extrabold text-sm mt-1">${item.price}</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                            <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-800">
                                <button 
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="px-3 py-1 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition text-slate-700 dark:text-slate-200 font-bold text-xs"
                                >
                                    -
                                </button>
                                <span className="px-4 py-1 text-slate-900 dark:text-white font-bold text-xs">{item.quantity}</span>
                                <button 
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="px-3 py-1 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition text-slate-700 dark:text-slate-200 font-bold text-xs"
                                >
                                    +
                                </button>
                            </div>

                            <span className="font-black text-slate-900 dark:text-white w-20 text-right text-sm">
                                ${(item.price * item.quantity).toFixed(2)}
                            </span>

                            <button 
                                onClick={() => removeItem(item.id)}
                                className="text-slate-400 hover:text-red-500 p-2 rounded-xl hover:bg-red-500/10 transition"
                                title="Remove"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}

                {/* Promo Code Section */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    {!promoCode ? (
                        <form onSubmit={handleApplyPromo} className="flex flex-col sm:flex-row gap-2 max-w-md">
                            <div className="relative flex-1">
                                <Tag className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Promo code (e.g. 10X10)"
                                    value={inputCode}
                                    onChange={(e) => setInputCode(e.target.value)}
                                    className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-slate-900 dark:bg-slate-800 hover:bg-violet-600 dark:hover:bg-violet-600 text-white px-5 py-2 rounded-xl text-xs font-bold transition shadow-sm"
                            >
                                Apply
                            </button>
                        </form>
                    ) : (
                        <div className="flex items-center justify-between max-w-md p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                                <Check className="w-4 h-4" />
                                <span>Promo "{promoCode}" applied (-{discountPercent}%)</span>
                            </div>
                            <button
                                onClick={removePromoCode}
                                className="text-slate-400 hover:text-red-500 transition p-1"
                                title="Remove promo"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                    {promoError && <p className="text-red-500 text-[11px] mt-1.5 font-medium">{promoError}</p>}
                </div>

                {/* Summary / Totals */}
                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
                        <span>Subtotal</span>
                        <span>${subtotal?.toFixed(2) ?? "0.00"}</span>
                    </div>

                    {promoCode && (
                        <div className="flex justify-between text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                            <span>Discount ({promoCode})</span>
                            <span>-${discountAmount?.toFixed(2) ?? "0.00"}</span>
                        </div>
                    )}

                    <div className="flex justify-between items-center pt-2">
                        <div className="text-lg font-black text-slate-900 dark:text-white">
                            {t("total")} <span className="text-violet-600 dark:text-violet-400">${total?.toFixed(2) ?? "0.00"}</span>
                        </div>
                        <button 
                            className="w-full sm:w-auto bg-linear-to-r from-violet-600 to-fuchsia-600 hover:opacity-95 text-white px-8 py-3 rounded-2xl font-bold text-xs transition shadow-lg active:scale-95"
                            onClick={() => navigate("/checkout")}
                        >
                            {t("checkout")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;