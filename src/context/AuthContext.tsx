import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface AuthContextType {
    user: string | null;
    login: (email: string) => boolean;
    register: (name: string, email: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<string | null>(null);

    useEffect(() => {
        const activeUser = localStorage.getItem("activeUser");
        if (activeUser) {
            setUser(activeUser);
        }
    }, []);

    const register = (name: string, email: string) => {
        localStorage.setItem(`user_${email}`, JSON.stringify({ name, email }));
        localStorage.setItem("activeUser", email);
        setUser(email);
    };

    const login = (email: string): boolean => {
        const storedUser = localStorage.getItem(`user_${email}`);
        if (storedUser) {
            localStorage.setItem("activeUser", email);
            setUser(email);
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem("activeUser");
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
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export default AuthContext;