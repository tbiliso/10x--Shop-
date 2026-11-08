import { Routes, Route } from "react-router-dom";
import CartProvider from "./context/CartContext";
import Header from "./components/Header";
import { Cart } from "./components/Cart";
import { Products } from "./components/Products";

export function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="max-w-7xl mx-auto py-6 px-4">
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