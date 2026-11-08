import { Routes, Route } from "react-router-dom";
import CartProvider from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import { Cart } from "./components/Cart";
import { Products } from "./components/Products";
import { Login } from "./components/Login";
import { Register } from "./components/Register";

export function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-slate-950 text-slate-100">
          <Header />
          <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/product" element={<Products />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;