# AGENTS.md - E-commerce App Development Guidelines

## Project Structure

- `frontend/`: React + Vite + Tailwind CSS v4
- `backend/`: Node.js/Express API with MongoDB
- `admin/`: React admin panel (planned)

## Build/Lint/Test Commands

### Frontend

```bash
cd frontend && npm run dev      # Dev server
cd frontend && npm run build    # Production build
cd frontend && npm run preview  # Preview production build
cd frontend && npm run check    # Biome check (auto-fix)
cd frontend && npm run check2   # Biome (unsafe fixes)
cd frontend && npm run format   # Biome format only
cd frontend && npm run lint     # ESLint (React Hooks, refresh)
```

### Backend

```bash
cd backend && npm run server    # Dev server (nodemon)
cd backend && npm run start     # Production server
cd backend && npm run check     # Biome check (auto-fix)
cd backend && npm run check2    # Biome (unsafe fixes)
cd backend && npm run format    # Biome format only
cd backend && npm run lint      # ESLint
cd backend && npm test          # Tests (when implemented)
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

### Component Structure (Frontend)

Arrow function components with hooks:

```javascript
const ComponentName = ({ prop1, prop2 }) => {
  const [state, setState] = useState(initialValue);
  useEffect(() => { /* side effects */ }, [dependencies]);
  return (<div>{/* JSX */}</div>);
};
export default ComponentName;
```

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
- **No inline styles:** Use Tailwind utilities

### API Integration (Frontend)

- **HTTP client:** Axios with async/await
- **Base URL:** `import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'`
- **Error handling:** try-catch → `console.error()` + `toast.error()`
- **Auth:** `{ headers: { token } }`
- **Fallback data:** Local products when backend unavailable

### State Management (Context API)

- `ShopContextProvider` wraps `<App />` in `main.jsx`
- Expose functions (not setters): `addToCart`, `getCartCount`
- Token stored in `localStorage`

### Backend Code Style

- **Framework:** Express.js with ES modules
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT tokens
- **File uploads:** Multer + Cloudinary
- **Error handling:** try-catch blocks, proper HTTP status codes
- **Middleware:** CORS, authentication, file upload validation

### File Organization

#### Frontend
- `src/pages/` - Route components (Home, Cart, Product, etc.)
- `src/components/` - Reusable UI (Navbar, Footer, ProductItem)
- `src/context/` - State (`ShopContext.jsx`)
- `src/assets/` - Images and constants

#### Backend
- `controllers/` - Route handlers
- `models/` - Mongoose schemas
- `routes/` - Express routes
- `middleware/` - Custom middleware
- `config/` - Database, cloudinary, etc.
- `docs/` - API documentation

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

- **Frontend:** API errors → `console.error()` + `toast.error()`
- **Backend:** Proper HTTP status codes, error messages
- **Check truthiness:** `itemInfo && ...`
- **Loading states:** Show indicators during async operations
- **Graceful degradation:** Fallbacks when backend unavailable

### Security

- **Environment:** `VITE_*` (frontend), `.env` (backend)
- **Validation:** Client and server-side
- **Tokens:** `localStorage` + request headers
- **Passwords:** bcrypt hashing
- **File uploads:** Type validation, size limits

### Git and Version Control

- **Commit messages:** Imperative and descriptive ("Add user auth", "Fix cart bug")
- **Branching:** Feature branches (`feature/xyz`) → PRs
- **Pre-commit:** Run `npm run check` before committing

### Testing

- **Frontend:** Vitest/Jest (when implemented)
- **Backend:** Jest/Supertest (when implemented)
- **Coverage:** Aim for 80%+ on critical paths

### Tooling Configuration

- **Biome:** Import organization, sorting, linting (both frontend/backend)
- **ESLint:** React Hooks, Vite refresh (frontend); Node.js (backend)
- **Vite:** React + Tailwind plugins
- **No Prettier:** Biome handles formatting

## Cursor/Copilot Instructions

No `.cursorrules` or `.github/copilot-instructions.md` found. Follow this AGENTS.md for all guidelines.

## Getting Help

- `/help` for Kilo CLI assistance
- Report issues: https://github.com/Kilo-Org/kilocode/issues

This document will be updated as the project evolves.</content>
<parameter name="filePath">E:\GreatStack\1-e-commerce-app\AGENTS.md