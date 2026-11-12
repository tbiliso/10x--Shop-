import { useEffect, useState, useMemo } from "react";
import useCart from "../context/useCart";
import { useLanguage } from "../context/LanguageContext";
import type { CartItem } from "../types/cart";

interface ApiProduct {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    category: string;
}

export function Products() {
    const { addToCart } = useCart();
    const { t } = useLanguage();
    const [products, setProducts] = useState<ApiProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    
    const [skip, setSkip] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const limit = 100;

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [sortBy, setSortBy] = useState<string>("none");

    useEffect(() => {
        fetch(`https://dummyjson.com/products?limit=${limit}&skip=0`, { cache: "no-store" })
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
                setTotal(data.total);
                setLoading(false);
            })
            .catch(err => {
                console.error("შეცდომა:", err);
                setLoading(false);
            });
    }, []);

    const handleLoadMore = () => {
        const nextSkip = skip + limit;
        setLoadingMore(true);

        fetch(`https://dummyjson.com/products?limit=${limit}&skip=${nextSkip}`, { cache: "no-store" })
            .then(res => res.json())
            .then(data => {
                setProducts(prev => [...prev, ...data.products]);
                setSkip(nextSkip);
                setLoadingMore(false);
            })
            .catch(err => {
                console.error("შეცდომა მეტი პროდუქტის წამოღებისას:", err);
                setLoadingMore(false);
            });
    };

    const categories = useMemo(() => {
        const unique = Array.from(new Set(products.map(p => p.category)));
        return ["all", ...unique];
    }, [products]);

    const filteredAndSortedProducts = useMemo(() => {
        let result = [...products];

        if (searchQuery.trim() !== "") {
            result = result.filter(p =>
                p.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
            );
        }

        if (selectedCategory !== "all") {
            result = result.filter(p => p.category === selectedCategory);
        }

        if (sortBy === "price-asc") {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === "price-desc") {
            result.sort((a, b) => b.price - a.price);
        } else if (sortBy === "title-asc") {
            result.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === "title-desc") {
            result.sort((a, b) => b.title.localeCompare(a.title));
        }

        return result;
    }, [products, searchQuery, selectedCategory, sortBy]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-24">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-violet-600 border-t-transparent shadow-lg"></div>
            </div>
        );
    }

    return (
        <div className="space-y-5 pb-10">
            {/* მართვის პანელი */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-md transition-colors">
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {t("home")}
                </h2>

                <div className="flex flex-wrap items-center gap-2">
                    {/* საძიებო ველი */}
                    <div className="relative flex-1 sm:flex-initial">
                        <input
                            type="text"
                            placeholder={t("search")}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full sm:w-48 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white py-1.5 px-3 pr-7 rounded-xl text-xs outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-violet-600 text-xs font-bold transition-colors"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    {/* კატეგორიების ფილტრი */}
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white py-1.5 px-2.5 rounded-xl text-xs outline-none cursor-pointer transition-all"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>
                                {cat === "all" ? t("category") : cat}
                            </option>
                        ))}
                    </select>

                    {/* სორტირება */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white py-1.5 px-2.5 rounded-xl text-xs outline-none cursor-pointer transition-all"
                    >
                        <option value="none">{t("sort")}</option>
                        <option value="price-asc">{t("priceAsc")}</option>
                        <option value="price-desc">{t("priceDesc")}</option>
                        <option value="title-asc">{t("titleAsc")}</option>
                        <option value="title-desc">{t("titleDesc")}</option>
                    </select>
                </div>
            </div>

            {/* პროდუქტების ბადე */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredAndSortedProducts.length > 0 ? (
                    filteredAndSortedProducts.map(product => (
                        <div
                            key={product.id}
                            className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3 flex flex-col justify-between shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                        >
                            <div>
                                <div className="overflow-hidden rounded-xl mb-2.5 bg-slate-50 dark:bg-slate-950 p-2 border border-slate-100 dark:border-slate-800 flex items-center justify-center">
                                    <img 
                                        src={product.thumbnail} 
                                        alt={product.title} 
                                        className="w-full h-28 object-contain group-hover:scale-105 transition-transform duration-500" 
                                    />
                                </div>
                                <span className="inline-block bg-violet-500/10 text-violet-600 dark:text-violet-400 text-[9px] uppercase font-bold px-2 py-0.5 rounded-full mb-1 tracking-wider">
                                    {product.category}
                                </span>
                                <h3 className="font-semibold text-xs text-slate-800 dark:text-slate-100 line-clamp-1">
                                    {product.title}
                                </h3>
                                <p className="text-violet-600 dark:text-violet-400 font-extrabold text-sm mt-1">
                                    ${product.price}
                                </p>
                            </div>
                            
                            <button 
                                onClick={() => {
                                    const cartItem: CartItem = {
                                        id: product.id,
                                        title: product.title,
                                        price: product.price,
                                        image: product.thumbnail,
                                        quantity: 1
                                    };
                                    addToCart(cartItem);
                                }}
                                className="mt-3 w-full bg-linear-to-r from-violet-600 to-fuchsia-600 hover:opacity-90 active:scale-[0.97] text-white text-xs py-2 rounded-xl font-semibold shadow-md transition"
                            >
                                {t("addToCart")}
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 text-slate-400 text-xs">
                        <span className="text-3xl block mb-2">🔍</span>
                        {t("noProducts")}
                    </div>
                )}
            </div>

            {/* მეტის ნახვა (Load More) ღილაკი */}
            {products.length < total && searchQuery === "" && selectedCategory === "all" && (
                <div className="flex justify-center pt-8 pb-4">
                    <button
                        onClick={handleLoadMore}
                        disabled={loadingMore}
                        className="bg-linear-to-r from-violet-600 to-fuchsia-600 hover:opacity-90 text-white px-8 py-3 rounded-2xl text-xs font-bold shadow-lg transition active:scale-95 disabled:opacity-50"
                    >
                        {loadingMore ? t("loading") : t("loadMore")}
                    </button>
                </div>
            )}
        </div>
    );
}

export default Products;