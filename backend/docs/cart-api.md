# Cart API – Tài liệu Postman

**Base URL**: `http://localhost:4000`  
**Prefix**: `/api/cart`

---

## 1. Thêm sản phẩm vào giỏ hàng

- **Method**: POST
- **URL**: `http://localhost:4000/api/cart/add`
- **Authorization**: Có (User Token)
- **Headers**:
  - `Content-Type: application/json`
  - `token: {token}`
- **Body** (raw JSON):

```json
{
  "itemId": "65abc123def456789",
  "size": "M"
}
```

- **Response**:
  - 200 (thành công):

```json
{
  "success": true,
  "message": "Đã thêm vào giỏ hàng"
}
```

  - 401 (chưa đăng nhập):

```json
{
  "message": "Không được phép, hãy đăng nhập lại",
  "success": false
}
```

  - 400 (người dùng không tồn tại):

```json
{
  "message": "Người dùng không tồn tại",
  "success": false
}
```

---

## 2. Cập nhật số lượng sản phẩm

- **Method**: POST
- **URL**: `http://localhost:4000/api/cart/update`
- **Authorization**: Có (User Token)
- **Headers**:
  - `Content-Type: application/json`
  - `token: {token}`
- **Body** (raw JSON):

```json
{
  "itemId": "65abc123def456789",
  "size": "M",
  "quantity": 3
}
```

- **Response**:
  - 200 (thành công):

```json
{
  "success": true,
  "message": "Đã cập nhật giỏ hàng"
}
```

  - 401 (chưa đăng nhập):

```json
{
  "message": "Không được phép, hãy đăng nhập lại",
  "success": false
}
```

---

## 3. Lấy dữ liệu giỏ hàng

- **Method**: GET
- **URL**: `http://localhost:4000/api/cart/get`
- **Authorization**: Có (User Token)
- **Headers**:
  - `Content-Type: application/json`
  - `token: {token}`
- **Body**: Để trống (không cần)

- **Response**:
  - 200 (thành công):

```json
{
  "success": true,
  "cartData": {
    "65abc123def456789": {
      "S": 2,
      "M": 1
    }
  }
}
```

  - 401 (chưa đăng nhập):

```json
{
  "message": "Không được phép, hãy đăng nhập lại",
  "success": false
}
```

---

## Cấu trúc dữ liệu giỏ hàng

Dữ liệu giỏ hàng được lưu theo cấu trúc:

```json
{
  "itemId": {
    "size": quantity
  }
}
```

**Ví dụ**:
- Sản phẩm ID `65abc123def456789` có 2 size M và 1 size S:
```json
{
  "65abc123def456789": {
    "M": 2,
    "S": 1
  }
}
```

---

## Ghi chú chung

- **Xác thực**: Tất cả các API đều yêu cầu token xác thực qua header `token: {token}`.
- **userId**: Được tự động trích xuất từ token trong middleware `authUser`, không cần gửi trong body.
- **Cơ sở dữ liệu**: Giỏ hàng được lưu trong trường `cartData` của User Model trong MongoDB.
