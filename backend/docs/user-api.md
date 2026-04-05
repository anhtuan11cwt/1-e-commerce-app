# User API – Tài liệu Postman

**Base URL**: `http://localhost:4000`  
**Prefix**: `/api/user`

---

## 1. Đăng ký tài khoản

- **Method**: POST
- **URL**: `http://localhost:4000/api/user/register`
- **Authorization**: Không
- **Headers**:
  - `Content-Type: application/json`
- **Body** (raw JSON):

```json
{
  "name": "Nguyễn Văn A",
  "email": "user@example.com",
  "password": "12345678"
}
```

- **Response**:
  - 200 (thành công):

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

  - 400 (thiếu trường):

```json
{
  "message": "Thiếu thông tin",
  "success": false
}
```

  - 400 (email không hợp lệ):

```json
{
  "message": "Email không hợp lệ",
  "success": false
}
```

  - 400 (mật khẩu < 8 ký tự):

```json
{
  "message": "Mật khẩu phải có ít nhất 8 ký tự",
  "success": false
}
```

  - 400 (email đã tồn tại):

```json
{
  "message": "Người dùng đã tồn tại",
  "success": false
}
```

---

## 2. Đăng nhập người dùng

- **Method**: POST
- **URL**: `http://localhost:4000/api/user/login`
- **Authorization**: Không
- **Headers**:
  - `Content-Type: application/json`
- **Body** (raw JSON):

```json
{
  "email": "user@example.com",
  "password": "12345678"
}
```

- **Response**:
  - 200 (thành công):

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

  - 400 (thiếu trường):

```json
{
  "message": "Người dùng không tồn tại",
  "success": false
}
```

  - 400 (sai email hoặc mật khẩu):

```json
{
  "message": "Thông tin đăng nhập không hợp lệ",
  "success": false
}
```

---

## 3. Đăng nhập Admin

- **Method**: POST
- **URL**: `http://localhost:4000/api/user/admin`
- **Authorization**: Không
- **Headers**:
  - `Content-Type: application/json`
- **Body** (raw JSON):

```json
{
  "email": "admin@forever.com",
  "password": "admin123"
}
```

- **Response**:
  - 200 (thành công):

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

  - 400 (thông tin admin không đúng):

```json
{
  "message": "Thông tin đăng nhập admin không hợp lệ",
  "success": false
}
```

---

## Ghi chú chung

- **JWT Token**: Trả về `token` trong body response khi đăng ký hoặc đăng nhập thành công. Token hết hạn sau 7 ngày.
- **Xác thực**: Gửi token qua header `Authorization: Bearer {token}` cho các API cần xác thực.
- **Role mặc định**: `user` (người dùng thông thường), `admin` (quản trị viên).
- **Admin credentials**: Được lấy từ biến môi trường `ADMIN_EMAIL` và `ADMIN_PASSWORD` trong file `.env`.