# Order API – Tài liệu Postman

**Base URL**: `http://localhost:4000`  
**Prefix**: `/api/order`

---

## 1. Đặt hàng (COD)

- **Method**: POST
- **URL**: `http://localhost:4000/api/order/place`
- **Authorization**: Có (Bearer Token)
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer {token}`
- **Body** (raw JSON):

```json
{
  "items": [
    {
      "itemId": "65abc123def456789",
      "name": "Áo Thun Nam",
      "price": 250000,
      "quantity": 2,
      "size": "M"
    }
  ],
  "amount": 500000,
  "address": {
    "firstName": "Nguyễn",
    "lastName": "Văn A",
    "email": "nguyenvana@email.com",
    "street": "123 Đường Nguyễn Trãi",
    "city": "Hà Nội",
    "state": "Hà Nội",
    "zipcode": "10000",
    "country": "Việt Nam",
    "phone": "0912345678"
  }
}
```

- **Response**:
  - 200 (thành công):

```json
{
  "success": true,
  "message": "Đặt hàng thành công"
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

## 2. Đặt hàng qua Stripe

- **Method**: POST
- **URL**: `http://localhost:4000/api/order/stripe`
- **Authorization**: Có (Bearer Token)
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer {token}`
- **Body** (raw JSON):

```json
{
  "items": [
    {
      "itemId": "65abc123def456789",
      "name": "Áo Thun Nam",
      "price": 250000,
      "quantity": 2,
      "size": "M"
    }
  ],
  "amount": 500000,
  "address": {
    "firstName": "Nguyễn",
    "lastName": "Văn A",
    "email": "nguyenvana@email.com",
    "street": "123 Đường Nguyễn Trãi",
    "city": "Hà Nội",
    "state": "Hà Nội",
    "zipcode": "10000",
    "country": "Việt Nam",
    "phone": "0912345678"
  }
}
```

- **Response**:
  - 200 (thành công):

```json
{
  "success": true,
  "session_url": "https://checkout.stripe.com/pay/cs_test_..."
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

## 3. Xác thực thanh toán Stripe

- **Method**: POST
- **URL**: `http://localhost:4000/api/order/verifyStripe`
- **Authorization**: Có (Bearer Token)
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer {token}`
- **Body** (raw JSON):

```json
{
  "success": "true",
  "orderId": "65abc123def456789"
}
```

- **Response**:
  - 200 (thành công):

```json
{
  "success": true,
  "message": "Thanh toán thành công"
}
```

  - 200 (thất bại):

```json
{
  "success": false,
  "message": "Thanh toán thất bại"
}
```

---

## 4. Lấy danh sách đơn hàng của người dùng

- **Method**: POST
- **URL**: `http://localhost:4000/api/order/userorders`
- **Authorization**: Có (Bearer Token)
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer {token}`
- **Body**: Để trống (không cần)

- **Response**:
  - 200 (thành công):

```json
{
  "success": true,
  "orders": [
    {
      "_id": "65abc123def456789",
      "userId": "65abc123def456789",
      "items": [...],
      "amount": 500000,
      "address": {...},
      "paymentMethod": "COD",
      "payment": true,
      "status": "Đơn hàng đã đặt",
      "date": 1704067200000
    }
  ]
}
```

---

## 5. Lấy tất cả đơn hàng (Admin)

- **Method**: POST
- **URL**: `http://localhost:4000/api/order/list`
- **Authorization**: Có (Admin Bearer Token)
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer {admin_token}`
- **Body**: Để trống (không cần)

- **Response**:
  - 200 (thành công):

```json
{
  "success": true,
  "orders": [...]
}
```

---

## 6. Cập nhật trạng thái đơn hàng (Admin)

- **Method**: POST
- **URL**: `http://localhost:4000/api/order/status`
- **Authorization**: Có (Admin Bearer Token)
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer {admin_token}`
- **Body** (raw JSON):

```json
{
  "orderId": "65abc123def456789",
  "status": "Đang giao hàng"
}
```

- **Response**:
  - 200 (thành công):

```json
{
  "success": true,
  "message": "Cập nhật trạng thái thành công"
}
```

---

## Các trạng thái đơn hàng

| Tiếng Việt | Mô tả |
|------------|-------|
| Đơn hàng đã đặt | Đơn hàng mới được tạo |
| Đang chờ | Chờ thanh toán (Stripe) |
| Đang xử lý | Đang chuẩn bị hàng |
| Đang giao hàng | Đã giao cho đơn vị vận chuyển |
| Đã giao hàng | Giao hàng thành công |

---

## Ghi chú chung

- **Xác thực**: 
  - User APIs yêu cầu token thường qua `Authorization: Bearer {token}`
  - Admin APIs yêu cầu admin token qua `Authorization: Bearer {admin_token}`
- **userId**: Được tự động trích xuất từ token trong middleware, không cần gửi trong body
- **Cơ sở dữ liệu**: Đơn hàng được lưu trong Order Model trong MongoDB
- **Thanh toán**: 
  - `payment: false` - chưa thanh toán
  - `payment: true` - đã thanh toán
