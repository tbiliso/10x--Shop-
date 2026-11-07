# 10X Shop — Project Plan (PLAN.md)

## 1. Goal and Scope Definition
- **Project Name:** 10X Shop — E-commerce Web Application
- **Scope Level:** CORE (Targeting all CORE requirements across all modules)
- **Primary Goal:** Build a responsive, accessible, and fully functional single-page e-commerce application using modern Web technologies (Vite, React 19, TypeScript, Tailwind CSS v4, React Router) with DummyJSON as the backend data source.

### Module Scope:
- **Auth (P1):** Local controlled login form with AuthContext state (guest vs authenticated user).
- **Catalog (P2):** Dynamic product catalog fetched from DummyJSON API, displayed using typed `ProductCard` components with responsive layout.
- **Product Details (P3):** Detailed view for individual products using React Router dynamic parameters (`/products/:id`).
- **Cart (P4):** State-driven shopping cart powered by `CartContext` supporting item addition, quantity modification, and item removal.
- **Checkout (P5):** Controlled form with standard input validation and simulated order placement clearing the active cart.
- **Routing & P0:** Unified Layout (Header + Footer), responsive design (375px mobile ready), custom 404 page, and routing safety guards.

---

## 2. Work Breakdown Structure (WBS)

### Epic 1: Repository & Architecture Setup (Week 1)
- Task 1.1: Initialize Vite + React 19 + TypeScript strict setup.
- Task 1.2: Integrate Tailwind CSS v4 and set up layout structure (`Header`, `Footer`, `Outlet`).
- Task 1.3: Define domain TypeScript interfaces (`types/product.ts`, `types/cart.ts`, `types/user.ts`).

### Epic 2: State Management & Navigation (Week 1 - Week 2)
- Task 2.1: Implement `AuthContext` for simple local session management.
- Task 2.2: Implement `CartContext` and custom hook `useCart` with null-guards.
- Task 2.3: Set up React Router configuration (`AppRoutes.tsx`, Protected checkout redirect).

### Epic 3: Core Features & Page Implementation (Week 2)
- Task 3.1: Build Catalog page (`GET /products`), product grid, and responsive `ProductCard`.
- Task 3.2: Build Product Details page (`/products/:id`) with stock indicators.
- Task 3.3: Build Shopping Cart page (`/cart`) with empty state and item map rendering.
- Task 3.4: Build Login (`/login`) & Checkout (`/checkout`) controlled forms with validation.

### Epic 4: Quality, Debugging, and Deployment (Week 3)
- Task 4.1: Ensure 0 errors on `npm run typecheck` (`tsc --noEmit`).
- Task 4.2: Implement Error Boundary and responsive mobile design audit (375px+).
- Task 4.3: Create comprehensive README and deployment on Vercel/Netlify.

---

## 3. Risk Management Matrix

| Risk Identified | Impact | Severity | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| **DummyJSON API Down/Slow** | API calls fail, rendering blank pages. | High | Implement loading/error states in React components; provide local fallback mock data if necessary. |
| **TypeScript Strictness Errors** | Build failure during `tsc --noEmit`. | Medium | Strongly type all interfaces up front; avoid `any` cast; use proper null check guards in custom hooks. |
| **Routing / State Reset on Refresh** | Loss of state or broken routes on SPA deploy. | High | Configure static web server rewrite rules (`_redirects` / `vercel.json`) for single-page applications. |

---

## 4. Definition of Done (DoD)
- Code builds without any TypeScript or ESLint errors (`npm run typecheck` passes with 0 errors).
- All CORE Happy Path user stories (Catalog -> Product -> Cart -> Login -> Checkout) execute cleanly.
- Responsive across Mobile (375px), Tablet, and Desktop without horizontal scroll.
- Project deployed on live environment with functional public URL.