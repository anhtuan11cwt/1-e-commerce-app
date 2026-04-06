# AGENTS.md - E-commerce App Development Guidelines

## Project Structure

- `frontend/`: React + Vite + Tailwind CSS v4 + React Router v7
- `backend/`: Node.js/Express API with MongoDB
- `admin/`: React admin panel (planned)

## Build/Lint/Test Commands

### Frontend

```bash
cd frontend && npm run dev      # Dev server (http://localhost:5173)
cd frontend && npm run build    # Production build
cd frontend && npm run preview  # Preview production build
cd frontend && npm run check    # Biome check (auto-fix)
cd frontend && npm run check2   # Biome check (unsafe fixes)
cd frontend && npm run lint2    # Biome lint (auto-fix)
cd frontend && npm run format  # Biome format only
cd frontend && npm run lint    # ESLint (React Hooks, refresh)
```

### Backend

```bash
cd backend && npm run server   # Dev server (nodemon, port 4000)
cd backend && npm run start    # Production server
cd backend && npm run check    # Biome check (auto-fix)
cd backend && npm run check2   # Biome check (unsafe fixes)
cd backend && npm run lint2    # Biome lint (auto-fix)
cd backend && npm run format   # Biome format only
cd backend && npm run lint     # ESLint
# cd backend && npm test       # No tests configured yet
```

### Running a Single Test

When tests are added, run with:
```bash
npm test              # Run all tests
npm test -- --testNamePattern="pattern"  # Run matching tests
```

## Code Style Guidelines

### General

- **Language:** JavaScript (ES6+), ES modules
- **Consistency:** Follow existing patterns, clean readable code
- **DRY:** Extract reusable functions/components

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Variables/Functions | camelCase | `getUserCart`, `cartItems` |
| Components | PascalCase | `ProductItem`, `Navbar` |
| Components (files) | PascalCase | `ProductItem.jsx` |
| Utilities | camelCase | `apiClient.js` |
| Constants | UPPER_SNAKE_CASE | `CURRENCY = '₫'` |
| Directories | lowercase | `src/components` |

### Imports (Grouped Order)

1. React imports
2. Third-party libraries
3. Local imports (parent to child)

```javascript
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';
export default ComponentName;
```

### Component Structure

```javascript
const ComponentName = ({ prop1, prop2 }) => {
  const [state, setState] = useState(initialValue);
  useEffect(() => { /* side effects */ }, [dependencies]);
  return (<div>{/* JSX */}</div>);
};
export default ComponentName;
```

### Backend Code Style

- **Framework:** Express.js with ES modules (import/export)
- **Database:** MongoDB with Mongoose schemas
- **Error handling:** try-catch blocks, proper HTTP status codes (200, 400, 401, 500)
- **Response format:** `{ success: true, message: "..." }` or `{ success: false, message: "..." }`
- **Authentication:** JWT tokens in `Authorization: Bearer <token>` header

### File Organization

```
frontend/src/
  pages/         # Route components (Home, Cart, Product)
  components/   # Reusable UI (Navbar, Footer, ProductItem)
  context/      # State (ShopContext.jsx)
  assets/       # Images, constants

backend/
  controllers/  # Route handlers
  models/        # Mongoose schemas
  routes/        # Express routes
  middleware/   # auth.js, adminAuth.js, multer.js
  config/       # Database, cloudinary config
```

### Routing (React Router v7)

```javascript
import { Routes, Route, useNavigate } from 'react-router-dom';
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/product/:productId" element={<Product />} />
</Routes>
const navigate = useNavigate();
```

### Styling (Tailwind CSS v4)

- **Order:** Layout → Spacing → Typography → Visual → Responsive
- **Responsive prefixes:** `sm:`, `md:`, `lg:`, `xl:`
- **Layout container:** `px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]`
- **Grid:** `grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5`
- No inline styles or custom CSS classes

### API Integration (Frontend)

- **HTTP client:** Axios with async/await
- **Base URL:** `import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'`
- **Auth headers:** `{ headers: { token } }`
- **Error handling:** try-catch → `console.error()` + `toast.error()`
- **Fallback:** Show local products when backend unavailable

### State Management (Context API)

- `ShopContextProvider` wraps `<App />` in `main.jsx`
- Expose functions (not setters): `addToCart`, `getCartCount`, `getCartAmount`
- Token stored in `localStorage`

### Error Handling

- **Frontend:** API errors → `console.error()` + `toast.error()`
- **Backend:** Return `{ success: false, message: "..." }` with proper status codes
- **Check truthiness:** `itemInfo && ...`
- **Loading states:** Show indicators during async operations
- **Graceful degradation:** Fallbacks when backend unavailable

### Forms and Validation

- **Controlled inputs:** `value` + `onChange`
- **Validation:** HTML5 attributes + custom checks
- **Submit:** `e.preventDefault()`; handle async with loading states
- **Feedback:** `react-toastify` for success/error messages

### Security

- **Frontend env:** Prefix with `VITE_` to expose to client
- **Backend env:** `.env` file (never commit)
- **Tokens:** `localStorage` + request headers
- **Passwords:** bcrypt hashing (salt rounds: 10)
- **File uploads:** Type validation, size limits via Multer

### Git and Version Control

- **Commits:** Imperative messages ("Add user auth", "Fix cart bug")
- **Branching:** Feature branches (`feature/xyz`)
- **Pre-commit:** Run `npm run check` before committing
- **Never commit:** `.env`, credentials, secrets

### Testing

Tests not yet configured. When adding:
- **Frontend:** Vitest/Jest - run with `npm test`
- **Backend:** Jest/Supertest
- **Coverage:** Aim for 80%+ on critical paths

### Tooling

| Tool | Purpose |
|------|---------|
| Biome | Formatting, import sorting, linting |
| ESLint | React Hooks (frontend), Node.js (backend) |
| Vite | React + Tailwind plugins |
| No Prettier | Biome handles all formatting |

### Cursor/Copilot Instructions

No `.cursorrules` or `.github/copilot-instructions.md` found. Follow this AGENTS.md for all guidelines.

## Getting Help

- `/help` for Kilo CLI assistance
- Report issues: https://github.com/Kilo-Org/kilocode/issues

This document will be updated as the project evolves.