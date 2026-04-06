# Admin Panel - E-Commerce App

## Tổng quan

Admin Panel là ứng dụng quản trị cho hệ thống thương mại điện tử, được xây dựng bằng React 19 với Vite và Tailwind CSS v4. Cho phép quản lý sản phẩm, đơn hàng và theo dõi hoạt động của cửa hàng.

## Tính năng

- **Quản lý sản phẩm**: Thêm mới, chỉnh sửa, xóa sản phẩm
- **Quản lý đơn hàng**: Xem danh sách, cập nhật trạng thái đơn hàng
- **Xác thực admin**: Đăng nhập an toàn với JWT
- **Dashboard**: Tổng quan về đơn hàng và sản phẩm
- **Upload hình ảnh**: Tích hợp Cloudinary cho lưu trữ hình ảnh sản phẩm
- **Responsive**: Tương thích với mọi thiết bị

## Công nghệ sử dụng

- **React 19**: Framework JavaScript cho UI
- **Vite**: Build tool và dev server siêu nhanh
- **Tailwind CSS v4**: Utility-first CSS framework
- **React Router v7**: Client-side routing
- **Axios**: HTTP client cho API calls
- **React Toastify**: Toast notifications
- **Lucide React**: Icon library

## Cấu trúc thư mục

```
admin/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, icons
│   │   ├── logo.png
│   │   ├── add_icon.png
│   │   ├── cross_icon.png
│   │   ├── upload_area.png
│   │   ├── order_icon.png
│   │   └── parcel_icon.svg
│   ├── components/     # Components tái sử dụng
│   │   ├── Login.jsx   # Trang đăng nhập admin
│   │   ├── Navbar.jsx  # Thanh điều hướng
│   │   └── Sidebar.jsx # Menu sidebar
│   ├── pages/          # Trang quản trị
│   │   ├── Add.jsx     # Thêm/sửa sản phẩm
│   │   ├── List.jsx    # Danh sách sản phẩm
│   │   └── Orders.jsx  # Quản lý đơn hàng
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── package.json
├── vite.config.js      # Vite configuration (port: 5174)
├── biome.json          # Code formatting/linting
└── eslint.config.js   # ESLint configuration
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
Tạo file `.env` trong thư mục `admin/`:
```env
VITE_BACKEND_URL=http://localhost:4000
```

### Chạy development
```bash
npm run dev
```

Admin panel sẽ chạy trên `http://localhost:5174`

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

## Trang quản trị

### Login (`/login`)
- Trang đăng nhập admin
- Xác thực với backend API
- Token lưu trong localStorage

### Add Product (`/add`)
- Form thêm sản phẩm mới
- Upload hình ảnh lên Cloudinary
- Các trường: tên, mô tả, giá, danh mục, kích thước, bestseller

### Product List (`/list`)
- Danh sách tất cả sản phẩm
- Chức năng xóa sản phẩm
- Hiển thị: hình ảnh, tên, giá, danh mục

### Orders (`/orders`)
- Danh sách tất cả đơn hàng
- Cập nhật trạng thái đơn hàng
- Hiển thị: mã đơn, khách hàng, tổng tiền, trạng thái, ngày đặt

## API Integration

### Endpoints
- `POST /api/product/add` - Thêm sản phẩm (admin)
- `POST /api/product/remove` - Xóa sản phẩm (admin)
- `GET /api/product/list` - Lấy danh sách sản phẩm
- `GET /api/order/list` - Lấy tất cả đơn hàng (admin)
- `POST /api/order/status` - Cập nhật trạng thái (admin)

### Axios setup
- Base URL: `import.meta.env.VITE_BACKEND_URL`
- Headers: `{ token }` cho authenticated requests
- Admin token validation

## Xác thực

- JWT token từ đăng nhập admin
- Token lưu trong localStorage
- Header: `Authorization: Bearer <token>`
- Kiểm tra quyền admin ở mỗi request

## Upload hình ảnh

- Sử dụng Multer ở backend
- Lưu trữ Cloudinary
- Hỗ trợ nhiều hình ảnh cho mỗi sản phẩm
- Preview hình ảnh trước khi upload

## Styling

### Tailwind CSS v4
- Utility-first approach
- Responsive: `sm:`, `md:`, `lg:` breakpoints
- Custom colors và spacing

### Layout
- Sidebar cố định bên trái
- Content area với scroll
- Header với các action buttons

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

## Development Notes

- Backend admin credentials cần được setup trước
- Kiểm tra network tab cho API calls
- Toast notifications cho feedback
- Sidebar navigation cho di chuyển giữa các trang
