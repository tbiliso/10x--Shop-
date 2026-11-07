# 10X Shop — Front-End E-Commerce Application

10X Shop is a modern, responsive, single-page e-commerce web application built as part of the Front-end Diploma Project. The application provides a seamless online shopping experience—from browsing products and checking detailed specifications to managing a shopping cart and placing simulated orders.

---

## 🚀 Features (CORE Level)

- **Product Catalog (`/`):** Fetches dynamic catalog items from the DummyJSON API, featuring product titles, pricing, ratings, and stock badges.
- **Product Details (`/products/:id`):** Dynamic routing displaying individual product imagery, full descriptions, and stock statuses.
- **State-Managed Cart (`/cart`):** Centralized `CartContext` allowing users to add items, modify quantities, remove items, and view total costs in real-time.
- **Controlled Authentication (`/login`):** React controlled form managing local user login/logout states without hard reloading.
- **Simulated Checkout (`/checkout`):** Protected route (redirects unauthenticated users) featuring form validation for shipping details and order confirmation.
- **Global Layout & Navigation:** Shared persistent Header with dynamic Cart badges and seamless navigation. Includes custom 404 handling.

---

## 🛠️ Tech Stack

- **Framework:** React 19 (Vite)
- **Language:** TypeScript (`strict: true`)
- **Styling:** Tailwind CSS v4
- **Routing:** React Router v6 / v7
- **API Source:** [DummyJSON API](https://dummyjson.com/)

---

## 📁 Architecture & Data Flow

The project follows a modular, feature-based directory architecture separating UI components, state contexts, API interactions, and domain types:

```text
src/
├── api/          # API interaction modules (fetch helper functions)
├── components/   # Reusable UI components (ProductCard, Layout, Header, etc.)
├── context/      # React Context providers & hooks (AuthContext, CartContext, useCart)
├── pages/        # Route page components (CatalogPage, ProductPage, CartPage, etc.)
├── routes/       # React Router configurations & Protected routes
├── types/        # TypeScript interfaces and data models (product.ts, cart.ts, etc.)
└── utils/        # Helper functions (formatting, calculations)
```

**Data Flow:** User Action → Event Handler → Context/State Setter → Immutable State Update → Component Re-render.

---

## 🔧 How to Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/tbiliso/10x--Shop-.git
   cd 10x--Shop-
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Run TypeScript typecheck:**
   ```bash
   npm run typecheck
   ```

---

## 📜 Available Scripts

- `npm run dev` — Launches Vite development server.
- `npm run build` — Builds the application for production.
- `npm run preview` — Locally previews production build.
- `npm run typecheck` — Runs TypeScript compiler check (`tsc --noEmit`).
- `npm run lint` — Runs ESLint checks across project files.

---

## 🌐 Live Demo & Credentials

- **Live URL:** [Insert Vercel / Netlify Link Here]
- **Test User:** You can log in using any non-empty username (e.g., `emilys`) and password (min 6 characters).