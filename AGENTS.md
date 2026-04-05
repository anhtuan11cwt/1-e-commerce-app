# AGENTS.md - E-commerce App Development Guidelines

## Project Structure

- `frontend/`: React + Vite + Tailwind CSS v4
- `backend/`: Node.js/Express API (planned)
- `admin/`: React admin panel (planned)

## Build/Lint/Test Commands

### Frontend

```bash
cd frontend && npm run dev      # Dev server
cd frontend && npm run build    # Production build
cd frontend && npm run preview  # Preview
cd frontend && npm run check    # Biome check (auto-fix)
cd frontend && npm run check2   # Biome (unsafe fixes)
cd frontend && npm run format   # Biome format only
cd frontend && npm run lint     # ESLint (React Hooks, refresh)
```

**Tests:** None configured. When adding Vitest/Jest:

```bash
cd frontend && npm test                     # All tests
cd frontend && npm test -- <file>.test.jsx  # Single file
cd frontend && npm test -- -t "test name"   # Single test
```

### Backend & Admin (When Implemented)

```bash
cd backend && npm run server    # Dev server
cd backend && npm run lint      # Lint
cd backend && npm test          # All tests
cd backend && npm test -- --grep "<name>"  # Single test

cd admin && npm run dev    # Dev server
cd admin && npm run build  # Build
cd admin && npm run lint   # Lint
```

## Code Style Guidelines

### General

- **Language:** JavaScript (ES6+), ES modules
- **Consistency:** Follow existing patterns; clean, readable code
- **DRY:** Extract reusable functions/components

### Naming Conventions

- **Variables/Functions:** camelCase (`getUserCart`, `cartItems`)
- **Components:** PascalCase (`ProductItem`, `Navbar`)
- **Files:** PascalCase for components, camelCase for utilities
- **Constants:** UPPER_SNAKE_CASE (`CURRENCY = '₫'`)
- **Directories:** lowercase (`src/components`, `src/pages`)

### Component Structure

Arrow function components with hooks:

```javascript
const ComponentName = ({ prop1, prop2 }) => {
  const [state, setState] = useState(initialValue);
  useEffect(() => { /* side effects */ }, [dependencies]);
  return (<div>{/* JSX */}</div>);
};
export default ComponentName;
```

- **Props:** Destructure parameters; **State:** `useState`
- **Effects:** `useEffect` with exhaustive dependencies
- **Memoization:** `useCallback` for functions, `useMemo` for calculations
- **Context:** `useContext(ShopContext)` for global state

### Imports and Exports

**Group imports in order:**
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

### Styling (Tailwind CSS v4)

- **Order:** Layout → Spacing → Typography → Visual → Responsive
- **Responsive:** Use `sm:`, `md:`, `lg:` prefixes
- **No inline styles:** Use Tailwind utilities or `index.css`

### API Integration

- **HTTP client:** Axios with async/await
- **Base URL:** `import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'`
- **Error handling:** try-catch → `console.error()` + `toast.error()`
- **Auth:** `{ headers: { token } }`
- **Fallback data:** Local products if backend unavailable

### State Management (Context API)

- `ShopContextProvider` wraps `<App />` in `main.jsx`
- Expose functions (not setters): `addToCart`, `getCartCount`
- Token stored in `localStorage`

### File Organization

- `src/pages/` - Route components (Home, Cart, Product, etc.)
- `src/components/` - Reusable UI (Navbar, Footer, ProductItem)
- `src/context/` - State (`ShopContext.jsx`)
- `src/assets/` - Images and constants

### Routing (React Router v7)

```javascript
import { Routes, Route, useNavigate } from 'react-router-dom';
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/product/:productId" element={<Product />} />
</Routes>
const navigate = useNavigate();
navigate('/cart');
```

### Forms and Validation

- **Controlled inputs:** `value` + `onChange`
- **Validation:** HTML5 attributes + custom checks
- **Submit:** `e.preventDefault()`; handle async with loading states
- **Feedback:** `react-toastify` for success/error messages

### Error Handling

- API errors → `console.error()` + `toast.error()`
- Check truthiness for missing data (`itemInfo && ...`)
- Show loading indicators during async operations
- Graceful degradation (fallbacks when unavailable)

### Security

- **Environment:** `import.meta.env.VITE_*` prefix
- **Validation:** Client and server
- **Tokens:** `localStorage` + request headers
- **Sanitization:** Not yet implemented

### Git and Version Control

- **Commit messages:** Imperative and descriptive ("Add user auth", "Fix cart bug")
- **Branching:** Feature branches (`feature/xyz`) → PRs

### Testing (When Implemented)

- **Unit:** Test individual functions and components
- **Integration:** API endpoints and user flows
- **E2E:** Complete user journeys (checkout, auth)
- **Coverage:** Aim for 80%+ on critical paths

### Performance

- **Memoization:** `useMemo` for lists, `useCallback` for handlers
- **Lazy loading:** `lazy()` + `Suspense` for routes
- **Images:** Optimize in `assets.js`; consider WebP
- **Bundle:** Monitor with `vite build`; avoid bloat

### Best Practices

- **Code reviews** required before merging
- **Update this file** as conventions evolve
- **Accessibility:** Semantic HTML, `alt` attributes, ARIA labels
- **Mobile-first** design, responsive images
- **Run `npm run check`** before committing

### Tooling Configuration

- **Biome (`biome.json`):** Import organization, sorting, linting
- **ESLint (`eslint.config.js`):** React Hooks, Vite refresh
- **Vite (`vite.config.js`):** React + Tailwind plugins
- **No Prettier:** Biome handles formatting

## Cursor/Copilot Instructions

No `.cursorrules` or `.github/copilot-instructions.md` found. Follow this AGENTS.md for all guidelines.

## Getting Help

- `/help` for Kilo CLI assistance
- Report issues: https://github.com/Kilo-Org/kilocode/issues

This document will be updated as the project evolves.