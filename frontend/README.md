# Frontend - E-Commerce App

## Tổng quan

Frontend của ứng dụng thương mại điện tử được xây dựng bằng React 19 với Vite, sử dụng Tailwind CSS v4 cho styling và React Router v7 cho điều hướng. Ứng dụng cung cấp giao diện người dùng hiện đại, responsive cho việc duyệt sản phẩm, quản lý giỏ hàng và đặt hàng.

## Tính năng

- **Duyệt sản phẩm**: Hiển thị danh sách sản phẩm, bộ lọc theo danh mục, tìm kiếm realtime
- **Chi tiết sản phẩm**: Hình ảnh, mô tả, kích thước, giá
- **Giỏ hàng**: Thêm/xóa sản phẩm, cập nhật số lượng theo kích thước, tính tổng tiền
- **Xác thực**: Đăng ký, đăng nhập, quản lý tài khoản người dùng
- **Đặt hàng**: Form nhập thông tin giao hàng, thanh toán qua Stripe
- **Lịch sử đơn hàng**: Xem trạng thái và chi tiết đơn hàng
- **Responsive**: Tương thích hoàn toàn với mobile, tablet và desktop
- **Fallback**: Hiển thị sản phẩm local khi backend không khả dụng

## Công nghệ sử dụng

- **React 19**: Framework JavaScript cho UI
- **Vite**: Build tool và dev server siêu nhanh
- **Tailwind CSS v4**: Utility-first CSS framework
- **React Router v7**: Client-side routing
- **Axios**: HTTP client cho API calls
- **React Toastify**: Toast notifications
- **Lucide React**: Icon library
- **Stripe**: Payment processing
- **React Context**: State management

## Cấu trúc thư mục

```
frontend/
├── public/              # Static assets (favicon, etc.)
├── src/
│   ├── assets/          # Images, icons và data local
│   │   ├── assets.js    # Export tất cả assets
│   │   └── *.png        # Hình ảnh sản phẩm và UI
│   ├── components/      # Components tái sử dụng
│   │   ├── Navbar.jsx   # Navigation bar
│   │   ├── Footer.jsx   # Footer
│   │   ├── SearchBar.jsx # Thanh tìm kiếm
│   │   ├── ProductItem.jsx # Card sản phẩm
│   │   ├── CartTotal.jsx # Tính tổng giỏ hàng
│   │   └── ...
│   ├── context/         # React Context
│   │   └── ShopContext.jsx # Global state (cart, products, auth)
│   ├── pages/           # Route components
│   │   ├── Home.jsx     # Trang chủ
│   │   ├── Collection.jsx # Danh sách sản phẩm
│   │   ├── Product.jsx  # Chi tiết sản phẩm
│   │   ├── Cart.jsx     # Giỏ hàng
│   │   ├── Login.jsx    # Đăng nhập/đăng ký
│   │   ├── PlaceOrder.jsx # Thanh toán
│   │   ├── Orders.jsx   # Lịch sử đơn hàng
│   │   ├── About.jsx    # Giới thiệu
│   │   ├── Contact.jsx  # Liên hệ
│   │   └── Verify.jsx   # Xác nhận thanh toán
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── package.json
├── vite.config.js       # Vite configuration
├── biome.json           # Code formatting/linting
└── eslint.config.js     # ESLint configuration
```

## Cài đặt và chạy

### Yêu cầu
- Node.js v18+
- Backend server chạy trên port 4000

### Cài đặt
```bash
npm install
```

### Cấu hình môi trường
Tạo file `.env` trong thư mục `frontend/`:
```env
VITE_BACKEND_URL=http://localhost:4000
```

### Chạy development
```bash
npm run dev
```

Ứng dụng sẽ chạy trên `http://localhost:5173`

### Build production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

## Scripts

- `npm run dev` - Chạy Vite dev server với HMR
- `npm run build` - Build cho production
- `npm run preview` - Preview production build locally
- `npm run check` - Kiểm tra và format code với Biome
- `npm run check2` - Kiểm tra với unsafe fixes
- `npm run format` - Chỉ format code
- `npm run lint` - Lint code với ESLint

## Routes

Sử dụng React Router v7:

| Path | Component | Mô tả |
|------|-----------|-------|
| `/` | Home | Trang chủ |
| `/collection` | Collection | Danh sách sản phẩm |
| `/about` | About | Giới thiệu |
| `/contact` | Contact | Liên hệ |
| `/product/:productId` | Product | Chi tiết sản phẩm |
| `/cart` | Cart | Giỏ hàng |
| `/login` | Login | Đăng nhập/đăng ký |
| `/place-order` | PlaceOrder | Thanh toán |
| `/orders` | Orders | Lịch sử đơn hàng |
| `/verify` | Verify | Xác nhận thanh toán Stripe |

## State Management

### ShopContext
Quản lý toàn bộ state của ứng dụng:
- `products`: Danh sách sản phẩm từ API
- `cartItems`: Giỏ hàng local + sync với backend
- `token`: JWT token cho xác thực
- `currency`: "₫" (VND)
- `deliveryFee`: 30000 VND

### Các function chính
- `addToCart(itemId, size)`: Thêm sản phẩm vào giỏ
- `updateQuantity(itemId, size, quantity)`: Cập nhật số lượng
- `getCartCount()`: Tính tổng số lượng trong giỏ
- `getCartAmount()`: Tính tổng tiền giỏ hàng
- `getProductsData()`: Fetch sản phẩm từ backend
- `navigate(path)`: Điều hướng

## API Integration

### Axios setup
- Base URL: `import.meta.env.VITE_BACKEND_URL`
- Headers: `{ token }` cho authenticated requests
- Error handling: Console log + toast notifications

### Fallback mechanism
Khi backend không khả dụng, ứng dụng tự động hiển thị sản phẩm từ `assets.js`

## Components

### Layout Components
- **Navbar**: Logo, menu, search bar, cart icon, user menu
- **Footer**: Links, contact info
- **SearchBar**: Tìm kiếm realtime với debounce

### Product Components
- **ProductItem**: Card hiển thị sản phẩm (image, name, price)
- **Hero**: Banner trang chủ
- **LatestCollection**: Grid sản phẩm mới nhất
- **BestSeller**: Sản phẩm bán chạy

### Cart & Checkout
- **CartTotal**: Tính tổng tiền + phí ship
- **PlaceOrder**: Form thông tin giao hàng

## Styling

### Tailwind CSS v4
- Utility-first approach
- Responsive: `sm:`, `md:`, `lg:` breakpoints
- Custom colors và spacing
- No custom CSS classes

### Layout
- Container: `px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]`
- Grid: `grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5`

## Code Quality

### Biome
- Code formatting
- Import sorting
- Linting rules

### ESLint
- React hooks rules
- Vite refresh
- Import/export validation

## Triển khai

### Build process
```bash
npm run build
```
Output trong thư mục `dist/`

### Environment variables
- `VITE_BACKEND_URL`: URL của backend API
- Tất cả env vars phải có prefix `VITE_` để expose cho client

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- Lazy loading components
- Optimized images
- Minimal re-renders với React 19
- Fast HMR với Vite

## Development Notes

- Sử dụng React DevTools để debug
- Check console cho API errors
- Toast notifications cho user feedback
- Local storage cho token persistence
