import { Routes, Route } from "react-router-dom";
import CartProvider from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header";
import { Cart } from "./components/Cart";
import { Products } from "./components/Products";
import { Login } from "./components/Login";
import { Register } from "./components/Register";

export function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
              <Header />
              <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <Routes>
                  <Route path="/" element={<Products />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Routes>
              </main>
            </div>
          </CartProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;