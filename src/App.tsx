import { Routes, Route } from "react-router-dom";
import CartProvider from "./context/CartContext";
import Header from "./components/Header";
import { Cart } from "./components/Cart";
import { Products } from "./components/Products";

export function App() {
  return (
    <CartProvider>
      {/* მთლიანი გვერდის რბილი, ელეგანტური გრადიენტული ფონი */}
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50/40 to-purple-50/50 text-gray-800">
        <Header />
        <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
      </div>
    </CartProvider>
  );
}

export default App;