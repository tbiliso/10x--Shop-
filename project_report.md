# 10X Shop — Final Project Report (REPORT.md)

## 1. Planned vs Delivered

| Feature / Module | Scope Level | Status | Notes |
| :--- | :--- | :--- | :--- |
| **Global Routing & Layout** | CORE | Delivered | Header, Footer, dynamic outlet, responsive nav, 404 handling. |
| **Simple Auth (`/login`)** | CORE | Delivered | Controlled React form with state-driven login/logout via `AuthContext`. |
| **Catalog Page (`/`)** | CORE | Delivered | Fetches products from DummyJSON API, rendered via `ProductCard` grid. |
| **Product Details (`/products/:id`)** | CORE | Delivered | Dynamic route fetching product info by ID, displaying price and stock. |
| **Shopping Cart (`/cart`)** | CORE | Delivered | Integrated `CartContext` handling item mapping, quantity updates, and deletion. |
| **Checkout Flow (`/checkout`)** | CORE | Delivered | Validation for user inputs, order completion summary, cart reset. |
| **TypeScript Strictness** | CORE | Delivered | Clean compilation (`npm run typecheck` passing with 0 errors). |

---

## 2. Project Metrics Summary

- **TypeScript Compilation Status:** 0 Errors (`tsc --noEmit` verified).
- **Core User Flow:** 100% Functional Happy Path (Catalog -> Product -> Cart -> Checkout).
- **Responsive Layout:** Tested across Mobile (375px), Tablet, and Desktop resolutions without horizontal scroll.

---

## 3. Key Challenges & Technical Solutions

### Problem 1: TypeScript Null Safety with Custom Hooks (`useCart`)
- **Issue:** TypeScript threw an error `Property 'items' does not exist on type 'CartContextType | null'` when attempting to consume the cart state.
- **Solution:** Implemented explicit null checks inside the `useCart` hook that throw an Error if the hook is called outside a `CartProvider`, guaranteeing safe types for all consuming components.

### Problem 2: JSX Syntax Restrictions with Conditional Rendering
- **Issue:** Attempting to place standard `if/else` statements directly inside JSX return blocks caused syntax errors.
- **Solution:** Converted conditional renders to clean JavaScript ternary operators (`condition ? expression : expression`) to correctly render empty cart messages vs populated item arrays.

---

## 4. AI Collaboration Summary

During the development of 10X Shop, AI was utilized as a collaborative coding coach and diagnostic partner. 

- **What was delegated:** Syntax verification, TypeScript error explanation, step-by-step guidance for custom hook structure, and boilerplate documentation generation.
- **What was rejected / refined:** Direct automatic code generation without manual review. Every code block (such as state hooks and ternary operators) was analyzed, manually written, and tested to ensure deep theoretical understanding.