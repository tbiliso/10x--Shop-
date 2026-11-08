import { useState } from "react";
import useCart from "../context/useCart";
import { useOrders } from "../context/OrderContext";
import { useLanguage } from "../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { CreditCard, ShieldCheck, CheckCircle2 } from "lucide-react";

export function Checkout() {
    const { items, removeItem } = useCart();
    const { addOrder } = useOrders();
    const { t } = useLanguage();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [cardNumber] = useState("4532 •••• •••• 1111");
    const [expiry, setExpiry] = useState("12/28");
    const [cvv, setCvv] = useState("123");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (items.length === 0) return;

        // შეკვეთის დამატება ისტორიაში
        addOrder(items, totalPrice, {
            name,
            address,
            cardMasked: cardNumber,
        });

        // კალათის გასუფთავება
        items.forEach(item => removeItem(item.id));
        setIsSubmitted(true);

        setTimeout(() => {
            navigate("/orders");
        }, 2000);
    };

    if (isSubmitted) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-center">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4 animate-bounce" />
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                    {t("lang") === "geo" ? "შეკვეთა წარმატებით გაფორმდა!" : "Order placed successfully!"}
                </h2>
                <p className="text-slate-500 text-xs">
                    {t("lang") === "geo" ? "გადამისამართდებით შეკვეთების ისტორიაში..." : "Redirecting to purchase history..."}
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl mt-6">
            <h2 className="text-2xl font-black mb-6 text-slate-900 dark:text-white">
                {t("lang") === "geo" ? "გადახდა და მიწოდება" : "Checkout & Shipping"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        {t("lang") === "geo" ? "სახელი და გვარი" : "Full Name"}
                    </label>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Vakho Javakhishvili"
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white outline-none"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        {t("lang") === "geo" ? "მიწოდების მისამართი" : "Shipping Address"}
                    </label>
                    <input
                        type="text"
                        required
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        placeholder="Tbilisi, Georgia"
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white outline-none"
                    />
                </div>

                <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
                    <div className="flex items-center gap-2 mb-3">
                        <CreditCard className="w-4 h-4 text-violet-600" />
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                            {t("lang") === "geo" ? "საბანკო ბარათი (უსაფრთხო რეჟიმი)" : "Secure Card Details"}
                        </span>
                    </div>

                    <div className="space-y-3">
                        <div>
                            <label className="block text-[10px] text-slate-400 mb-1">Card Number (Ends with 1111)</label>
                            <input
                                type="text"
                                disabled
                                value={cardNumber}
                                className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-xs font-mono text-violet-600 dark:text-violet-400 cursor-not-allowed"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] text-slate-400 mb-1">Expiry Date</label>
                                <input
                                    type="text"
                                    value={expiry}
                                    onChange={e => setExpiry(e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white outline-none font-mono"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] text-slate-400 mb-1">CVV</label>
                                <input
                                    type="password"
                                    maxLength={3}
                                    value={cvv}
                                    onChange={e => setCvv(e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white outline-none font-mono"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 p-2.5 rounded-xl">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>{t("lang") === "geo" ? "უსაფრთხოების მიზნით ბარათის ბოლო ციფრები დაცულია (1111)." : "For security, final digits are masked (1111)."}</span>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
                    <div>
                        <p className="text-[10px] text-slate-400">Total to pay:</p>
                        <p className="text-xl font-black text-slate-900 dark:text-white">${totalPrice.toFixed(2)}</p>
                    </div>
                    <button
                        type="submit"
                        className="bg-linear-to-r from-violet-600 to-fuchsia-600 hover:opacity-95 text-white font-bold px-8 py-3 rounded-2xl text-xs shadow-lg transition active:scale-95"
                    >
                        {t("lang") === "geo" ? "გადახდა" : "Pay Now"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Checkout;