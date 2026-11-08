import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type Language = "geo" | "en";

interface LanguageContextType {
    lang: Language;
    toggleLang: () => void;
    t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
    geo: {
        home: "მთავარი",
        cart: "კალათა",
        login: "შესვლა",
        register: "რეგისტრაცია",
        logout: "გასვლა",
        email: "ელ-ფოსტა",
        password: "პაროლი",
        name: "სახელი",
        noAccount: "არ გაქვთ ანგარიში?",
        hasAccount: "უკვე გაქვთ ანგარიში?",
        welcome: "მოგესალმებით",
        search: "ძებნა პროდუქტებში...",
        category: "ყველა კატეგორია",
        sort: "სორტირება",
        priceAsc: "ფასი: ზრდადი",
        priceDesc: "ფასი: კლებადი",
        titleAsc: "სახელი: A-Z",
        titleDesc: "სახელი: Z-A",
        addToCart: "კალათაში დამატება",
        loadMore: "მეტის ნახვა (+30)",
        loading: "იტვირთება...",
        invalidCredentials: "არასწორია ელ-ფოსტა ან პაროლი!",
        emailRequired: "ელ-ფოსტა სავალდებულოა",
        invalidEmail: "არასწორი მეილის ფორმატი",
        passwordRequired: "პაროლი სავალდებულოა",
        passwordRules: "პაროლი უნდა იყოს მინ. 8 სიმბოლო, შეიცავდეს დიდ ასოს და სიმბოლოს",
        nameRequired: "სახელი სავალდებულოა"
    },
    en: {
        home: "Home",
        cart: "Cart",
        login: "Login",
        register: "Register",
        logout: "Logout",
        email: "Email",
        password: "Password",
        name: "Name",
        noAccount: "Don't have an account?",
        hasAccount: "Already have an account?",
        welcome: "Welcome Back",
        search: "Search products...",
        category: "All Categories",
        sort: "Sort By",
        priceAsc: "Price: Low to High",
        priceDesc: "Price: High to Low",
        titleAsc: "Name: A-Z",
        titleDesc: "Name: Z-A",
        addToCart: "Add to Cart",
        loadMore: "Load More (+30)",
        loading: "Loading...",
        invalidCredentials: "Invalid email or password!",
        emailRequired: "Email is required",
        invalidEmail: "Invalid email format",
        passwordRequired: "Password is required",
        passwordRules: "Min 8 chars, 1 uppercase letter, and 1 special symbol",
        nameRequired: "Name is required"
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLang] = useState<Language>("geo");

    const toggleLang = () => {
        setLang(prev => (prev === "geo" ? "en" : "geo"));
    };

    const t = (key: string) => {
        return translations[lang][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ lang, toggleLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useLanguage must be used within LanguageProvider");
    return context;
}