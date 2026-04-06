# Backend - E-Commerce App

## Tổng quan

Backend API cho ứng dụng thương mại điện tử được xây dựng bằng Node.js và Express.js, sử dụng MongoDB làm cơ sở dữ liệu và tích hợp các dịch vụ bên thứ ba cho thanh toán và lưu trữ hình ảnh.

## Tính năng

- **RESTful API**: Endpoints cho quản lý sản phẩm, người dùng, giỏ hàng và đơn hàng
- **Xác thực JWT**: Bảo mật API với JSON Web Tokens
- **Quản lý sản phẩm**: CRUD operations cho sản phẩm
- **Giỏ hàng**: Sync giỏ hàng giữa client và server
- **Đặt hàng**: Xử lý đơn hàng với nhiều phương thức thanh toán
- **Upload hình ảnh**: Tích hợp Cloudinary cho lưu trữ hình ảnh sản phẩm
- **Thanh toán**: Hỗ trợ Stripe
- **Admin API**: Endpoints riêng cho quản trị viên
- **Middleware**: CORS, authentication, file upload validation
- **Error handling**: Comprehensive error responses

## Công nghệ sử dụng

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: ODM cho MongoDB
- **JWT**: JSON Web Tokens cho authentication
- **bcrypt**: Password hashing
- **Cloudinary**: Image storage và optimization
- **Stripe**: Payment processing
- **Multer**: File upload handling
- **Validator**: Input validation
- **CORS**: Cross-origin resource sharing
- **nodemon**: Auto-restart development server

## Cấu trúc thư mục

```
backend/
├── config/              # Cấu hình database và services
│   ├── mongodb.js       # Kết nối MongoDB
│   └── cloudinary.js    # Cấu hình Cloudinary
├── controllers/         # Logic xử lý API
│   ├── userController.js    # Xử lý user operations
│   ├── productController.js # CRUD sản phẩm
│   ├── cartController.js    # Quản lý giỏ hàng
│   └── orderController.js   # Xử lý đơn hàng
├── middleware/          # Custom middleware
│   ├── auth.js          # JWT authentication
│   ├── multer.js        # File upload config
│   └── adminAuth.js     # Admin authorization
├── models/              # Mongoose schemas
│   ├── userModel.js     # User schema
│   ├── productModel.js  # Product schema
│   └── orderModel.js    # Order schema
├── routes/              # Express routes
│   ├── userRoute.js     # User endpoints
│   ├── productRoute.js  # Product endpoints
│   ├── cartRoute.js     # Cart endpoints
│   └── orderRoute.js    # Order endpoints
├── docs/                # API documentation
├── server.js            # Entry point
├── package.json
├── biome.json           # Code quality
└── eslint.config.mjs    # Linting
```

## Cài đặt và chạy

### Yêu cầu
- Node.js v18+
- MongoDB (local hoặc cloud)
- Tài khoản Cloudinary, Stripe

### Cài đặt
```bash
npm install
```

### Cấu hình môi trường
Tạo file `.env` trong thư mục `backend/`:
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_super_secret_jwt_key_here

# Cloudinary (cho upload hình ảnh)
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key

# Stripe (thanh toán quốc tế)
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### Chạy development
```bash
npm run server
```

Server sẽ chạy trên `http://localhost:4000`

### Chạy production
```bash
npm run start
```

## Scripts

- `npm run server` - Chạy với nodemon (auto-restart)
- `npm run start` - Chạy production server
- `npm run check` - Kiểm tra và format với Biome
- `npm run check2` - Unsafe fixes
- `npm run format` - Chỉ format code
- `npm run lint` - Lint với ESLint

## API Endpoints

### User Routes (`/api/user`)
```javascript
POST   /register     // Đăng ký user mới
POST   /login        // Đăng nhập
GET    /profile      // Lấy thông tin user
POST   /logout       // Đăng xuất (client-side)
```

### Product Routes (`/api/product`)
```javascript
GET    /list         // Lấy tất cả sản phẩm
POST   /add          // Thêm sản phẩm mới (admin)
POST   /remove       // Xóa sản phẩm (admin)
POST   /single       // Lấy chi tiết 1 sản phẩm
```

### Cart Routes (`/api/cart`)
```javascript
POST   /get          // Lấy giỏ hàng user
POST   /add          // Thêm sản phẩm vào giỏ
POST   /update       // Cập nhật số lượng
```

### Order Routes (`/api/order`)
```javascript
POST   /place        // Đặt hàng
POST   /verify       // Xác nhận thanh toán
POST   /userorders   // Lấy đơn hàng của user
GET    /list         // Lấy tất cả đơn hàng (admin)
POST   /status       // Cập nhật trạng thái đơn hàng (admin)
```

## Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique, lowercase),
  password: String (hashed),
  cartData: Object (default: {})
}
```

### Product Model
```javascript
{
  name: String,
  description: String,
  price: Number,
  image: [String],        // Array of image URLs
  category: String,       // "Nam", "Nữ", "Trẻ Em"
  subCategory: String,    // "Áo", "Quần", etc.
  sizes: [String],        // ["S", "M", "L", "XL"]
  bestseller: Boolean,
  date: Number
}
```

### Order Model
```javascript
{
  userId: String,
  items: Array,           // Ordered items
  amount: Number,         // Total amount
  address: Object,        // Shipping address
  payment: Boolean,       // Payment status
  paymentMethod: String,  // "Stripe", "COD"
  status: String,         // Order status
  date: Number
}
```

## Authentication

### JWT Token
- Generated khi login/register
- Stored trong localStorage (client)
- Sent trong header: `Authorization: Bearer <token>`
- Expires: Không set (manual logout)

### Password Security
- Hashed với bcrypt (salt rounds: 10)
- Không store plain text

## File Upload

### Multer + Cloudinary
- Accept: images only
- Max size: Configured in multer.js
- Storage: Cloudinary CDN
- URL returned cho database storage

## Payment Integration

### Stripe
- Webhook verification
- Secure payment processing
- International payments

## Middleware

### Authentication (`auth.js`)
- Verify JWT token
- Attach user info to req.body
- Return 401 nếu invalid

### Admin Auth (`adminAuth.js`)
- Additional check cho admin operations
- Verify admin privileges

### File Upload (`multer.js`)
- Validate file type và size
- Process upload to Cloudinary

### CORS
- Configure allowed origins
- Handle preflight requests

## Error Handling

### Global Error Handler
- Catch unhandled errors
- Return consistent error format
- Log errors for debugging

### Response Format
```javascript
// Success
{ success: true, message: "Success message", data: {...} }

// Error
{ success: false, message: "Error message" }
```

## Security

- **Input Validation**: Sử dụng validator library
- **CORS**: Configured cho frontend origin
- **Rate Limiting**: Implement nếu cần
- **SQL Injection**: Prevented với Mongoose
- **XSS**: Sanitized input

## Performance

- **Database Indexing**: Trên email, userId
- **Image Optimization**: Cloudinary transformations
- **Caching**: Consider Redis cho session
- **Compression**: Express compression middleware

## Testing

Framework chưa implement, nhưng structure sẵn sàng cho:
- **Unit Tests**: Controllers và middleware
- **Integration Tests**: API endpoints
- **Database Tests**: Models và queries

## Deployment

### Environment Setup
- Set production environment variables
- Configure MongoDB Atlas
- Setup Cloudinary production account
- Configure payment gateways

### Process Management
- PM2 cho process management
- Load balancer nếu scale
- SSL certificate (HTTPS)

### Monitoring
- Error logging (Winston)
- Performance monitoring
- Database monitoring

## Development Notes

- Sử dụng Postman để test API
- Check MongoDB Compass cho database
- Environment variables required
- Cloudinary account cho image uploads
- Payment keys cho full functionality
- Frontend chạy trên port 5173
- Admin panel chạy trên port 5174

## API Documentation

Chi tiết API docs trong thư mục `docs/`
- Endpoint specifications
- Request/response examples
- Error codes

## Contributing

1. Follow existing code style
2. Add proper error handling
3. Test endpoints thoroughly
4. Update documentation
5. Use meaningful commit messages
