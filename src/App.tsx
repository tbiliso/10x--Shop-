import { Routes, Route } from "react-router-dom";
import CartProvider from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import { OrderProvider } from "./context/OrderContext";
import Header from "./components/Header";
import { Cart } from "./components/Cart";
import { Products } from "./components/Products";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Checkout } from "./components/Checkout";
import { Orders } from "./components/Orders";
import { ProfilePage } from "./components/ProfilePage";
// import { ProtectedRoute } from "./routes/ProtectedRoute"; // <-- თუ დაცული მარშრუტი გაქვს

export function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <CartProvider>
            <OrderProvider>
              <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
                <Header />
                <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                  <Routes>
                    <Route path="/" element={<Products />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/orders" element={<Orders />} />
                    
                    {/* 2. დაამატე /profile მარშრუტი */}
                    <Route path="/profile" element={<ProfilePage />} />
                    
                    {/* ან თუ ProtectedRoute გაქვს:
                    <Route 
                      path="/profile" 
                      element={
                        <ProtectedRoute>
                          <ProfilePage />
                        </ProtectedRoute>
                      } 
                    /> */}

                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                  </Routes>
                </main>
              </div>
            </OrderProvider>
          </CartProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;