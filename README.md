# E-Commerce App

Một ứng dụng thương mại điện tử đầy đủ chức năng được xây dựng bằng React, Node.js, Express và MongoDB. Ứng dụng cho phép người dùng duyệt sản phẩm, thêm vào giỏ hàng, thanh toán và quản lý đơn hàng.

## Tính năng

### Frontend (React + Vite)
- **Giao diện người dùng hiện đại**: Thiết kế responsive với Tailwind CSS v4
- **Duyệt sản phẩm**: Danh sách sản phẩm, bộ lọc theo danh mục, tìm kiếm
- **Giỏ hàng**: Thêm/xóa sản phẩm, cập nhật số lượng theo kích thước
- **Xác thực người dùng**: Đăng ký, đăng nhập, quản lý tài khoản
- **Thanh toán**: Tích hợp Stripe
- **Đơn hàng**: Xem lịch sử đơn hàng và trạng thái
- **Responsive**: Tương thích với mobile và desktop

### Admin Panel (React + Vite)
- **Quản lý sản phẩm**: Thêm, xóa, cập nhật sản phẩm
- **Quản lý đơn hàng**: Xem và cập nhật trạng thái đơn hàng
- **Dashboard**: Tổng quan về hoạt động

### Backend (Node.js + Express)
- **API RESTful**: Endpoints cho sản phẩm, người dùng, giỏ hàng và đơn hàng
- **Xác thực JWT**: Bảo mật API với JSON Web Tokens
- **Quản lý cơ sở dữ liệu**: MongoDB với Mongoose
- **Upload hình ảnh**: Tích hợp Cloudinary cho lưu trữ hình ảnh
- **Thanh toán**: Xử lý thanh toán với Stripe

## Công nghệ sử dụng

### Frontend & Admin
- **React 19**: Framework JavaScript cho giao diện người dùng
- **Vite**: Build tool và dev server nhanh
- **Tailwind CSS v4**: Framework CSS utility-first
- **React Router v7**: Điều hướng client-side
- **Axios**: HTTP client cho API calls
- **React Toastify**: Thông báo người dùng
- **Lucide React**: Bộ icon

### Backend
- **Node.js**: Runtime JavaScript
- **Express.js**: Framework web
- **MongoDB**: Cơ sở dữ liệu NoSQL
- **Mongoose**: ODM cho MongoDB
- **JWT**: Xác thực token
- **bcrypt**: Hash mật khẩu
- **Cloudinary**: Lưu trữ và quản lý hình ảnh
- **Stripe**: Cổng thanh toán
- **Multer**: Xử lý upload file
- **Validator**: Validation dữ liệu

## Cấu trúc dự án

```
e-commerce-app/
├── frontend/          # Ứng dụng React (client)
│   ├── src/
│   │   ├── assets/    # Hình ảnh và dữ liệu local
│   │   ├── components/# Components tái sử dụng
│   │   ├── context/   # React Context cho state management
│   │   ├── pages/     # Các trang của ứng dụng
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
├── admin/             # Admin Panel (React)
│   ├── src/
│   │   ├── assets/    # Assets
│   │   ├── components/# Components (Navbar, Sidebar, Login)
│   │   └── pages/     # Trang (Orders, Add, List)
│   ├── package.json
│   └── vite.config.js
├── backend/           # API server (Node.js + Express)
│   ├── config/        # Cấu hình database và cloudinary
│   ├── controllers/   # Logic xử lý API
│   ├── middleware/    # Middleware tùy chỉnh
│   ├── models/        # Mongoose schemas
│   ├── routes/        # Express routes
│   ├── docs/          # Tài liệu API
│   ├── server.js      # Entry point
│   └── package.json
├── AGENTS.md          # Hướng dẫn phát triển
└── README.md          # Tài liệu này
```

## Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js v18+
- MongoDB
- Tài khoản Cloudinary, Stripe (tùy chọn)

### Backend Setup
```bash
cd backend
npm install
```

Tạo file `.env` trong thư mục `backend/`:
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET_KEY=your_secret_key
STRIPE_SECRET_KEY=your_stripe_key
```

Chạy backend:
```bash
npm run server
```

### Frontend Setup
```bash
cd frontend
npm install
```

Tạo file `.env` trong thư mục `frontend/`:
```env
VITE_BACKEND_URL=http://localhost:4000
```

Chạy frontend:
```bash
npm run dev
```

### Admin Setup
```bash
cd admin
npm install
```

Tạo file `.env` trong thư mục `admin/`:
```env
VITE_BACKEND_URL=http://localhost:4000
```

Chạy admin:
```bash
npm run dev
```

Admin panel chạy trên `http://localhost:5174`

## API Endpoints

### User Routes (`/api/user`)
- `POST /register` - Đăng ký người dùng
- `POST /login` - Đăng nhập
- `GET /profile` - Lấy thông tin profile
- `POST /logout` - Đăng xuất

### Product Routes (`/api/product`)
- `GET /list` - Lấy danh sách sản phẩm
- `POST /add` - Thêm sản phẩm mới (admin)
- `POST /remove` - Xóa sản phẩm (admin)
- `POST /single` - Lấy chi tiết sản phẩm

### Cart Routes (`/api/cart`)
- `POST /add` - Thêm sản phẩm vào giỏ hàng
- `POST /update` - Cập nhật số lượng
- `POST /get` - Lấy giỏ hàng người dùng

### Order Routes (`/api/order`)
- `POST /place` - Đặt hàng
- `POST /verify` - Xác nhận thanh toán
- `POST /userorders` - Lấy đơn hàng của người dùng
- `GET /list` - Lấy tất cả đơn hàng (admin)
- `POST /status` - Cập nhật trạng thái đơn hàng (admin)

## Cơ sở dữ liệu

### Product Schema
- `name`: Tên sản phẩm
- `description`: Mô tả
- `price`: Giá (VND)
- `image`: Mảng URL hình ảnh
- `category`: Danh mục (Nam, Nữ, Trẻ Em)
- `subCategory`: Danh mục con
- `sizes`: Mảng kích thước có sẵn
- `bestseller`: Có phải sản phẩm bán chạy
- `date`: Timestamp

### User Schema
- `name`: Tên người dùng
- `email`: Email (unique)
- `password`: Mật khẩu (hashed)
- `cartData`: Dữ liệu giỏ hàng

### Order Schema
- `userId`: ID người dùng
- `items`: Mảng sản phẩm đã đặt
- `amount`: Tổng tiền
- `address`: Thông tin giao hàng
- `payment`: Trạng thái thanh toán
- `paymentMethod`: Phương thức thanh toán
- `status`: Trạng thái đơn hàng
- `date`: Timestamp

## Scripts

### Frontend
- `npm run dev` - Chạy dev server (http://localhost:5173)
- `npm run build` - Build production
- `npm run preview` - Preview production build
- `npm run check` - Kiểm tra code với Biome
- `npm run lint` - Lint với ESLint

### Admin
- `npm run dev` - Chạy dev server (http://localhost:5174)
- `npm run build` - Build production
- `npm run preview` - Preview production build
- `npm run check` - Kiểm tra code với Biome
- `npm run lint` - Lint với ESLint

### Backend
- `npm run server` - Chạy dev server với nodemon (port 4000)
- `npm run start` - Chạy production server
- `npm run check` - Kiểm tra code với Biome
- `npm run lint` - Lint với ESLint

## Quy tắc code

- **Ngôn ngữ**: JavaScript ES6+
- **Định dạng**: Biome (import sorting, formatting)
- **Linting**: ESLint (React hooks, refresh)
- **Commits**: Imperative messages (vd: "Add user auth", "Fix cart bug")
- **Naming**: camelCase cho functions/variables, PascalCase cho components

## Triển khai

### Production Build
```bash
# Frontend
cd frontend && npm run build

# Admin
cd admin && npm run build

# Backend
cd backend && npm run start
```

### Environment Variables
Đảm bảo thiết lập các biến môi trường cần thiết cho production:
- Database connection string
- JWT secret
- Payment gateway keys
- Cloudinary credentials

## Đóng góp

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## Giấy phép

Dự án này sử dụng giấy phép ISC.

## Tác giả

**Trần Anh Tuấn** - *Backend Developer*

---

*Ứng dụng được phát triển như một dự án học tập full-stack e-commerce.*
