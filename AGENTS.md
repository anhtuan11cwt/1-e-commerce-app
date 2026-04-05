# AGENTS.md - E-commerce App Development Guidelines

This document provides guidelines for software engineering agents working on the full-stack e-commerce application. It includes build/lint/test commands, code style guidelines, and best practices to ensure consistency across the codebase.

## Project Structure

The project consists of three main parts:
- `frontend/`: React application (Vite + Tailwind CSS)
- `backend/`: Node.js/Express API (planned)
- `admin/`: React admin panel (planned)

## Build/Lint/Test Commands

### Frontend (React + Vite)

**Development Server:**
```bash
cd frontend && npm run dev
```

**Build for Production:**
```bash
cd frontend && npm run build
```

**Linting:**
```bash
cd frontend && npm run lint
```

**Preview Built App:**
```bash
cd frontend && npm run preview
```

**Running Tests:**
No test framework configured yet. When added, use:
```bash
cd frontend && npm test
```
For running a single test file (when Jest/Vitest is set up):
```bash
cd frontend && npm test -- <test-file>.test.js
```

### Backend (Node.js + Express) - When Implemented

**Development Server:**
```bash
cd backend && npm run server
```

**Linting:**
```bash
cd backend && npm run lint
```

**Running Tests:**
```bash
cd backend && npm test
```
For running a single test:
```bash
cd backend && npm test -- --grep "<test-name>"
```

### Admin Panel (React) - When Implemented

**Development Server:**
```bash
cd admin && npm run dev
```

**Build:**
```bash
cd admin && npm run build
```

**Linting:**
```bash
cd admin && npm run lint
```

## Code Style Guidelines

### General Principles

- **Language:** JavaScript (ES6+), no TypeScript unless explicitly added
- **Consistency:** Follow existing patterns in the codebase
- **Readability:** Prioritize clean, readable code over clever optimizations
- **DRY Principle:** Avoid code duplication, extract reusable functions/components

### Naming Conventions

- **Variables/Functions:** camelCase (e.g., `getUserCart`, `cartItems`)
- **Components:** PascalCase (e.g., `ProductItem`, `Navbar`)
- **Files:** PascalCase for components (e.g., `ProductItem.jsx`), camelCase for utilities (e.g., `apiUtils.js`)
- **Constants:** UPPER_SNAKE_CASE for global constants (e.g., `CURRENCY = '$'`)
- **Directories:** lowercase with hyphens if needed (e.g., `src/components`, `src/pages`)

### Component Structure

- Use arrow function components with `rafc` snippet:
```javascript
const ComponentName = () => {
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

export default ComponentName;
```

- **Props:** Destructure props in function parameters:
```javascript
const ProductItem = ({ id, image, name, price }) => {
  // component logic
};
```

- **State:** Use `useState` hook:
```javascript
const [state, setState] = useState(initialValue);
```

- **Effects:** Use `useEffect` for side effects:
```javascript
useEffect(() => {
  // effect logic
}, [dependencies]);
```

### Imports and Exports

- **Default Imports:** Use for components and main exports:
```javascript
import React from 'react';
import ComponentName from './ComponentName';
```

- **Named Imports:** Use for utilities and multiple exports:
```javascript
import { useState, useEffect } from 'react';
import { getProductsData } from '../context/ShopContext';
```

- **Group Imports:** Group related imports together:
```javascript
// React imports
import React, { useState } from 'react';

// Third-party libraries
import axios from 'axios';

// Local imports
import { assets } from '../assets/assets';
import ProductItem from './ProductItem';
```

- **Export:** Use default export for components:
```javascript
export default ComponentName;
```

### Styling (Tailwind CSS)

- **Class Ordering:** Group related classes logically:
  - Layout (display, position, flex/grid)
  - Spacing (margin, padding)
  - Typography (font, text)
  - Visual (colors, borders, shadows)
  - Responsive (sm:, md:, lg:)

- **Responsive Design:** Use Tailwind responsive prefixes:
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

- **Custom Classes:** Avoid inline styles, use Tailwind utilities or custom CSS in `index.css`

### API Integration

- **HTTP Client:** Use Axios for API calls:
```javascript
import axios from 'axios';

const response = await axios.get(`${backendURL}/api/products`);
```

- **Error Handling:** Use try-catch blocks and toast notifications:
```javascript
try {
  const response = await axios.post('/api/login', data);
  // success handling
} catch (error) {
  console.error('Login error:', error);
  toast.error(error.response?.data?.message || 'Login failed');
}
```

- **Headers:** Include auth tokens when required:
```javascript
const headers = { token };
const response = await axios.post('/api/cart/add', data, { headers });
```

### State Management (Context API)

- **Context Structure:** Use `ShopContext` for global state:
```javascript
// Provider setup
<ShopContextProvider>
  <App />
</ShopContextProvider>

// Consumer usage
const { products, cartItems, addToCart } = useContext(ShopContext);
```

- **Context Functions:** Follow naming patterns like `addToCart`, `getCartCount`

### File Organization

- **Pages:** `src/pages/` - Route components (Home, Collection, etc.)
- **Components:** `src/components/` - Reusable UI components (Navbar, Footer, etc.)
- **Context:** `src/context/` - State management (ShopContext)
- **Assets:** `src/assets/` - Images, icons, constants

### Routing

- **React Router:** Use `react-router-dom`:
```javascript
import { Routes, Route } from 'react-router-dom';

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/product/:productId" element={<Product />} />
</Routes>
```

- **Navigation:** Use `useNavigate` hook:
```javascript
const navigate = useNavigate();
navigate('/cart');
```

### Forms and Validation

- **Controlled Inputs:** Use state for form values:
```javascript
const [email, setEmail] = useState('');

<input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
/>
```

- **Form Submission:** Prevent default and handle async:
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  // form logic
};
```

### Error Handling

- **API Errors:** Display user-friendly messages via toast
- **Validation Errors:** Use HTML5 validation + custom checks
- **Loading States:** Show loading indicators during async operations

### Performance

- **Memoization:** Use `useMemo` for expensive calculations:
```javascript
const filteredProducts = useMemo(() => {
  return products.filter(/* logic */);
}, [products, searchTerm]);
```

- **Lazy Loading:** Implement for routes if app grows large

### Security

- **Environment Variables:** Store sensitive data in `.env` files
- **Input Validation:** Validate all user inputs on both client and server
- **Auth Tokens:** Store in localStorage, include in API requests

### Git and Version Control

- **Commit Messages:** Use descriptive, imperative mood:
  - "Add user authentication"
  - "Fix cart calculation bug"
  - "Update product display component"

- **Branching:** Use feature branches for new functionality

### Testing (When Implemented)

- **Unit Tests:** Test individual functions and components
- **Integration Tests:** Test API endpoints and user flows
- **E2E Tests:** Test complete user journeys

### Deployment

- **Frontend:** Vercel (configured via `vercel.json`)
- **Backend:** Vercel serverless functions
- **Admin:** Vercel static site

### Best Practices

- **Code Reviews:** Always review code changes
- **Documentation:** Update this file as conventions evolve
- **Accessibility:** Use semantic HTML, alt text for images
- **Mobile-First:** Design for mobile, enhance for desktop
- **Performance:** Optimize images, minimize bundle size

## Getting Help

- Use `/help` for Kilo CLI assistance
- Report issues at https://github.com/Kilo-Org/kilocode/issues
- For feedback, contact the development team

This document will be updated as the project evolves and new tools/frameworks are added.