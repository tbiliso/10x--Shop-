import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const ProfilePage: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  // ვკითხულობთ რეგისტრაციისას შენახულ რეალურ მონაცემებს localStorage-დან ან AuthContext-იდან
  const [userData, setUserData] = useState<{ name: string; email: string }>({
    name: "Guest",
    email: "guest@10xshop.ge",
  });

  useEffect(() => {
    // ვცდილობთ ამოვიღოთ რეგისტრაციის მონაცემები შენახული ობიექტიდან
    const savedUser = localStorage.getItem("shop_user"); // ან შესაბამისი გასაღები, რომლითაც რეგისტრაციაში ინახავ
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUserData({
          name: parsed.name || parsed.username || "User",
          email: parsed.email || "user@10xshop.ge",
        });
      } catch (e) {
        console.error("Failed to parse user data", e);
      }
    } else if (auth && "user" in auth && auth.user) {
      // ალტერნატივა თუ AuthContext-ში ინახება
      const u = auth.user as { name?: string; username?: string; email?: string };
      setUserData({
        name: u.name || u.username || "User",
        email: u.email || "user@10xshop.ge",
      });
    }
  }, [auth]);

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      // ვასუფთავებთ ყველა ლოკალურ მონაცემს და ვასრულებთ ლოგაუტს
      localStorage.removeItem("shop_cart");
      localStorage.removeItem("shop_orders");
      localStorage.removeItem("shop_promo");
      localStorage.removeItem("shop_user");

      if (auth && "logout" in auth && typeof auth.logout === "function") {
        auth.logout();
      }

      alert("Your account has been deleted.");
      navigate("/register");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">User Profile</h1>

      {/* Account Details (Read-only, matching Registration) */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Account Details</h2>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Name
          </label>
          <input
            type="text"
            value={userData.name}
            disabled
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-200/50 dark:bg-slate-900/50 text-gray-600 dark:text-gray-300 cursor-not-allowed select-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Email Address
          </label>
          <input
            type="email"
            value={userData.email}
            disabled
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-200/50 dark:bg-slate-900/50 text-gray-600 dark:text-gray-300 cursor-not-allowed select-none"
          />
        </div>
      </div>

      {/* Danger Zone / Delete Account */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-red-500/20 space-y-4">
        <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">Danger Zone</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Once you delete your account, there is no going back. All local data and sessions will be permanently removed.
        </p>

        <button
          type="button"
          onClick={handleDeleteAccount}
          className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-sm font-medium transition shadow-sm"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};