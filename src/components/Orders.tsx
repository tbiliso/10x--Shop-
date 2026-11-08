import { useEffect } from "react";
import { useOrders } from "../context/OrderContext";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Package, Clock } from "lucide-react";

export function Orders() {
    const { orders } = useOrders();
    const { t } = useLanguage();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    if (!user) return null;

    if (orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-center px-4">
                <div className="w-16 h-16 bg-violet-500/10 text-violet-600 rounded-3xl flex items-center justify-center mb-4">
                    <Package className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2">
                    {t("lang") === "geo" ? "შეკვეთების ისტორია ცარიელია" : "No purchase history"}
                </h2>
                <p className="text-slate-500 text-xs mb-6">
                    {t("lang") === "geo" ? "თქვენ ჯერ არ გაქვთ გაფორმებული შეკვეთები" : "You haven't placed any orders yet"}
                </p>
                <Link
                    to="/"
                    className="bg-linear-to-r from-violet-600 to-fuchsia-600 text-white font-bold px-6 py-3 rounded-2xl text-xs shadow-lg transition"
                >
                    {t("home")}
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-16 px-4">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                {t("lang") === "geo" ? "ჩემი შეკვეთები (Purchase History)" : "Purchase History"}
            </h2>

            <div className="space-y-4">
                {orders.map(order => (
                    <div
                        key={order.id}
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-md space-y-4"
                    >
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                            <div>
                                <span className="font-mono font-bold text-violet-600 dark:text-violet-400 text-xs bg-violet-500/10 px-3 py-1 rounded-xl">
                                    {order.id}
                                </span>
                                <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-2">
                                    <Clock className="w-3 h-3" />
                                    <span>{order.date}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] text-slate-400">Total Paid:</p>
                                <p className="text-lg font-black text-slate-900 dark:text-white">${order.total.toFixed(2)}</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                {t("lang") === "geo" ? "შეძენილი ნივთები:" : "Purchased Items:"}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
                                        <img src={item.image} alt={item.title} className="w-12 h-12 object-contain" />
                                        <div className="overflow-hidden">
                                            <h4 className="font-semibold text-xs text-slate-800 dark:text-slate-100 line-clamp-1">{item.title}</h4>
                                            <p className="text-[10px] text-slate-500">Qty: {item.quantity} × ${item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between">
                            <span>Recipient: <strong className="text-slate-800 dark:text-slate-200">{order.shippingDetails.name}</strong> ({order.shippingDetails.address})</span>
                            <span>Card: <strong className="font-mono text-slate-800 dark:text-slate-200">{order.shippingDetails.cardMasked}</strong></span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Orders;