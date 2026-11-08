import { useEffect, useState, useMemo } from "react";
import useCart from "../context/useCart";
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
    const [products, setProducts] = useState<ApiProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    
    const [skip, setSkip] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const limit = 30;

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
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-600 border-t-transparent shadow-lg"></div>
            </div>
        );
    }

    return (
        <div className="space-y-5 pb-10">
            {/* მართვის პანელი - ფერადი გრადიენტით და შრუქ (Glassmorphism) ეფექტით */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 bg-gradient-to-r from-indigo-50/80 via-purple-50/50 to-pink-50/80 backdrop-blur-md p-4 rounded-2xl border border-indigo-100/50 shadow-md transition-all duration-300">
                <h2 className="text-xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                    პროდუქტები
                </h2>

                <div className="flex flex-wrap items-center gap-2">
                    {/* საძიებო ველი */}
                    <div className="relative flex-1 sm:flex-initial">
                        <input
                            type="text"
                            placeholder="ძებნა..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full sm:w-48 bg-white/90 border border-indigo-100 text-gray-700 py-1.5 px-3 pr-7 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 shadow-sm transition-all duration-200"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 text-xs font-bold transition-colors"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    {/* კატეგორიების ფილტრი */}
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="bg-white/90 border border-indigo-100 text-gray-700 py-1.5 px-2.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 shadow-sm transition-all duration-200 cursor-pointer"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>
                                {cat === "all" ? "ყველა კატეგორია" : cat}
                            </option>
                        ))}
                    </select>

                    {/* სორტირება */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-white/90 border border-indigo-100 text-gray-700 py-1.5 px-2.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 shadow-sm transition-all duration-200 cursor-pointer"
                    >
                        <option value="none">სორტირება</option>
                        <option value="price-asc">ფასი: ზრდადი</option>
                        <option value="price-desc">ფასი: კლებადი</option>
                        <option value="title-asc">სახელი: A-Z</option>
                        <option value="title-desc">სახელი: Z-A</option>
                    </select>
                </div>
            </div>

            {/* პროდუქტების ბადე — ზუსტად 4 ქარდი ჰორიზონტალურად */}
            <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-4">
                {filteredAndSortedProducts.length > 0 ? (
                    filteredAndSortedProducts.map(product => (
                        <div
                            key={product.id}
                            className="group bg-white rounded-2xl border border-gray-100/80 p-3 flex flex-col justify-between shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden"
                        >
                            {/* დეკორატიული ფერადი ზოლი ქარდის თავში */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            <div>
                                <div className="overflow-hidden rounded-xl mb-2.5 bg-gradient-to-br from-gray-50 to-indigo-50/30 p-2">
                                    <img 
                                        src={product.thumbnail} 
                                        alt={product.title} 
                                        className="w-full h-28 object-contain group-hover:scale-110 transition-transform duration-500 ease-out" 
                                    />
                                </div>
                                <span className="inline-block bg-indigo-50 text-indigo-600 text-[9px] uppercase font-bold px-2 py-0.5 rounded-full mb-1 tracking-wider">
                                    {product.category}
                                </span>
                                <h3 className="font-semibold text-xs text-gray-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                                    {product.title}
                                </h3>
                                <p className="text-indigo-600 font-extrabold text-sm mt-1">
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
                                className="mt-3 w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 active:scale-[0.97] text-white text-xs py-2 rounded-xl font-semibold shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300 transition-all duration-200"
                            >
                                კალათაში დამატება
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-16 bg-white rounded-2xl border border-dashed border-indigo-200 text-gray-400 text-xs shadow-inner">
                        <span className="text-3xl block mb-2">🔍</span>
                        პროდუქტი ვერ მოიძებნა
                    </div>
                )}
            </div>

            {/* მეტის ნახვა (Load More) ღილაკი */}
            {products.length < total && searchQuery === "" && selectedCategory === "all" && (
                <div className="flex justify-center pt-8 pb-4">
                    <button
                        onClick={handleLoadMore}
                        disabled={loadingMore}
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-2xl text-xs font-bold shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 transition-all duration-300 active:scale-95 disabled:opacity-50"
                    >
                        {loadingMore ? "იტვირთება..." : "მეტის ნახვა (+30)"}
                    </button>
                </div>
            )}
        </div>
    );
}

export default Products;