import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface AuthContextType {
    user: { name: string; email: string } | null;
    login: (email: string, pass: string) => boolean;
    register: (name: string, email: string, pass: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<{ name: string; email: string } | null>(() => {
        const saved = localStorage.getItem("activeUser");
        return saved ? JSON.parse(saved) : null;
    });

    const register = (name: string, email: string, pass: string) => {
        const userData = { name, email, pass };
        localStorage.setItem(`user_${email}`, JSON.stringify(userData));
        localStorage.setItem("activeUser", JSON.stringify({ name, email }));
        setUser({ name, email });
    };

    const login = (email: string, pass: string): boolean => {
        const stored = localStorage.getItem(`user_${email}`);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed.pass === pass) {
                const active = { name: parsed.name, email: parsed.email };
                localStorage.setItem("activeUser", JSON.stringify(active));
                setUser(active);
                return true;
            }
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem("activeUser");
        localStorage.removeItem("shop_cart");  // cleac cart whlie logout
        localStorage.removeItem("shop_promo"); // clear promo code
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
}