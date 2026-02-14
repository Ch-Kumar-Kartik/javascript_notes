# ChaiCode Cafe — Feature Implementation Checklist

> Track your daily progress. Pick a task, implement it, check it off.

---

## Phase 1 — TypeScript Foundations (`src/types/`, `src/models/`, `src/utils/`)

- [ ] **Enums** — `types/enums.ts` — ChaiSize, OrderStatus, PaymentMethod, ChaiCategory
- [ ] **Interfaces** — `types/interfaces.ts` — Ingredient, ChaiRecipe, Customer, ChaiOrder, OrderSummary
- [ ] **Type Aliases** — `types/aliases.ts`
- [ ] **Type Guards** — `utils/typeGuards.ts`
- [ ] **Abstract Beverage Class** — `models/Beverage.ts`
- [ ] **Chai Class** (extends Beverage) — `models/Chai.ts`
- [ ] **Generic Repository** — `models/Repository.ts`
- [ ] **OrderManager** (composition + DI) — `models/OrderManager.ts`

---

## Phase 2 — Services (`src/services/`)

- [ ] **MenuService** — `services/MenuService.ts` — menu filtering, search, pricing
- [ ] **DataService** — `services/DataService.ts` — async simulated API, type assertions, error handling

---

## Phase 3 — Authentication (`src/auth/`)

- [ ] **Auth Types** — `auth/auth.types.ts` — User, AuthCredentials, AuthToken, AuthResponse, AuthError, AuthState
- [ ] **Auth Constants** — `auth/auth.constants.ts` — storage keys, token config, error messages, endpoints
- [ ] **Token Utilities** — `auth/token.utils.ts` — generate, decode, verify, localStorage persistence
- [ ] **Auth Guards** — `auth/auth.guards.ts` — isUser, isValidEmail, isValidPassword, assertAuthenticated
- [ ] **Auth Store** — `auth/auth.store.ts` — state management, listener subscriptions, session restore
- [ ] **Auth Service** — `auth/auth.service.ts` — signup, signin, signout, token refresh
- [ ] **Barrel Exports** — `auth/index.ts` — uncomment re-exports as files are implemented

---

## Phase 4 — DOM & UI Wiring (`src/main.ts`, `src/app.ts`)

- [ ] **Auth Flow** — wire signin/signup forms → AuthService → show/hide `#auth-page` / `#app`
- [ ] **Menu Page** — render chai cards in `#menu-grid`, filter chips, "Add Chai" modal
- [ ] **Orders Page** — create orders via `#create-order-btn`, render in `#order-list`, status filters
- [ ] **Customers Page** — add/list customers, `#add-customer-form`, customer cards
- [ ] **Inventory Page** — populate `#inventory-tbody`, stock alerts, low-stock badges
- [ ] **Global Search** — wire `#global-search` to filter across pages
- [ ] **Modal System** — reusable modal open/close with `#modal-overlay`
- [ ] **Toast Notifications** — success/error/warning toasts in `#toast-container`
- [ ] **App Entry Point** — `app.ts` — initialize services, demo TypeScript concepts

---

## Phase 5 — Polish & UX

- [ ] Form validation with real-time error messages
- [ ] Loading states & skeleton UI
- [ ] Responsive design testing (mobile sidebar toggle)
- [ ] Keyboard accessibility & focus management
- [ ] Error boundaries & graceful fallbacks

---

## 🔮 Future Scope

> These features require backend infrastructure. Implement after the frontend is solid.

### Server & API (Express / Hono / Bun.serve)
- [ ] Set up a TypeScript server (Express or Bun-native)
- [ ] REST API routes: `/api/auth/*`, `/api/menu/*`, `/api/orders/*`, `/api/customers/*`
- [ ] Request validation middleware
- [ ] Error handling middleware
- [ ] CORS & security headers

### Database
- [ ] Choose DB (PostgreSQL / SQLite / MongoDB)
- [ ] Schema design — users, menu_items, orders, customers, inventory
- [ ] ORM/query builder setup (Drizzle / Prisma / Kysely)
- [ ] Migrations & seed data
- [ ] Replace in-memory data with real DB queries

### JWT Authentication (production-grade)
- [ ] Server-side JWT signing with proper secrets (RS256 or HS256)
- [ ] Access token + refresh token flow with httpOnly cookies
- [ ] Token rotation & revocation
- [ ] Auth middleware for protected API routes
- [ ] Password hashing with bcrypt/argon2
- [ ] Rate limiting on auth endpoints

### OAuth & Social Login
- [ ] Google OAuth 2.0 integration
- [ ] Twitter/GitHub OAuth (optional)
- [ ] Account linking (social + email/password)
