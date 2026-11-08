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

    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [sortBy, setSortBy] = useState<string>("none");

    useEffect(() => {
        fetch("https://dummyjson.com/products?limit=20", { cache: "no-store" })
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
                setLoading(false);
            })
            .catch(err => {
                console.error("შეცდომა:", err);
                setLoading(false);
            });
    }, []);

    const categories = useMemo(() => {
        const unique = Array.from(new Set(products.map(p => p.category)));
        return ["all", ...unique];
    }, [products]);

    const filteredAndSortedProducts = useMemo(() => {
        let result = [...products];

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
    }, [products, selectedCategory, sortBy]);

    if (loading) {
        return <div className="text-center py-10 text-gray-600 text-sm">იტვირთება...</div>;
    }

    return (
        <div>
            {/* სათაური და პატარა ფილტრები ერთ ხაზზე */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                <h2 className="text-xl font-bold text-gray-800">პროდუქტები</h2>

                <div className="flex items-center gap-2">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="bg-white border border-gray-300 text-gray-700 py-1 px-2 rounded text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>
                                {cat === "all" ? "ყველა კატეგორია" : cat}
                            </option>
                        ))}
                    </select>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-white border border-gray-300 text-gray-700 py-1 px-2 rounded text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                        <option value="none">სორტირება</option>
                        <option value="price-asc">ფასი: ზრდადი</option>
                        <option value="price-desc">ფასი: კლებადი</option>
                        <option value="title-asc">სახელი: A-Z</option>
                        <option value="title-desc">სახელი: Z-A</option>
                    </select>
                </div>
            </div>

            {/* ზუსტად 4 ქარდი ჰორიზონტალურად დიდ ეკრანზე */}
            <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-3">
                {filteredAndSortedProducts.map(product => (
                    <div key={product.id} className="bg-white rounded border p-2.5 flex flex-col justify-between shadow-sm hover:shadow transition">
                        <div>
                            <img 
                                src={product.thumbnail} 
                                alt={product.title} 
                                className="w-full h-28 object-cover rounded mb-1.5 bg-gray-100" 
                            />
                            <span className="text-[9px] text-gray-400 uppercase font-semibold block">{product.category}</span>
                            <h3 className="font-medium text-xs text-gray-800 truncate">{product.title}</h3>
                            <p className="text-indigo-600 font-bold text-xs mt-0.5">${product.price}</p>
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
                            className="mt-2.5 w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs py-1 rounded font-medium transition"
                        >
                            კალათაში დამატება
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;