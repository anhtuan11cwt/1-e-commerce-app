# Product API – Tài liệu Postman

**Base URL**: `http://localhost:4000`  
**Prefix**: `/api/product`

---

## 1. Thêm sản phẩm

- **Method**: POST
- **URL**: `http://localhost:4000/api/product/add`
- **Authorization**: Có (Admin)
- **Headers**:
  - `Content-Type: multipart/form-data`
  - `token: {token}`
- **Body** (multipart/form-data):

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | String | ✓ | Tên sản phẩm |
| description | String | ✓ | Mô tả sản phẩm |
| price | Number | ✓ | Giá sản phẩm |
| category | String | ✓ | Danh mục |
| subCategory | String | ✓ | Danh mục con |
| sizes | String (JSON Array) | ✓ | Mảng kích thước, ví dụ: `["S","M","L","XL"]` |
| bestseller | Boolean (String) | ✓ | Sản phẩm bestseller: `"true"` hoặc `"false"` |
| image1 | File | | Hình ảnh 1 |
| image2 | File | | Hình ảnh 2 |
| image3 | File | | Hình ảnh 3 |
| image4 | File | | Hình ảnh 4 |

- **Response**:
  - 200 (thành công):

```json
{
  "message": "Đã thêm sản phẩm",
  "success": true
}
```

  - 401 (chưa đăng nhập):

```json
{
  "message": "Không được phép, hãy đăng nhập lại",
  "success": false
}
```

  - 401 (không phải admin):

```json
{
  "message": "Không được phép, hãy đăng nhập lại",
  "success": false
}
```

---

## 2. Lấy danh sách sản phẩm

- **Method**: GET
- **URL**: `http://localhost:4000/api/product/list`
- **Authorization**: Không
- **Headers**: Không
- **Body**: Không cần

- **Response**:
  - 200 (thành công):

```json
{
  "products": [
    {
      "_id": "...",
      "name": "Áo Thun",
      "description": "Áo thun cotton",
      "price": 250000,
      "category": "topwear",
      "subCategory": "tshirts",
      "sizes": ["S", "M", "L", "XL"],
      "bestseller": false,
      "image": ["https://..."],
      "date": 1712...
    }
  ],
  "success": true
}
```

  - 500 (lỗi server):

```json
{
  "message": "Error message",
  "success": false
}
```

---

## 3. Xóa sản phẩm

- **Method**: POST
- **URL**: `http://localhost:4000/api/product/remove`
- **Authorization**: Có (Admin)
- **Headers**:
  - `Content-Type: application/json`
  - `token: {token}`
- **Body** (raw JSON):

```json
{
  "id": "651234567890123456789012"
}
```

- **Response**:
  - 200 (thành công):

```json
{
  "message": "Đã xóa sản phẩm",
  "success": true
}
```

  - 401 (chưa đăng nhập hoặc không phải admin):

```json
{
  "message": "Không được phép, hãy đăng nhập lại",
  "success": false
}
```

  - 500 (lỗi server):

```json
{
  "message": "Error message",
  "success": false
}
```

---

## 4. Lấy thông tin một sản phẩm

- **Method**: POST
- **URL**: `http://localhost:4000/api/product/single`
- **Authorization**: Không
- **Headers**:
  - `Content-Type: application/json`
- **Body** (raw JSON):

```json
{
  "productId": "651234567890123456789012"
}
```

- **Response**:
  - 200 (thành công):

```json
{
  "product": {
    "_id": "651234567890123456789012",
    "name": "Áo Thun",
    "description": "Áo thun cotton",
    "price": 250000,
    "category": "topwear",
    "subCategory": "tshirts",
    "sizes": ["S", "M", "L", "XL"],
    "bestseller": false,
    "image": ["https://..."],
    "date": 1712...
  },
  "success": true
}
```

  - 500 (lỗi server):

```json
{
  "message": "Error message",
  "success": false
}
```

---

## Ghi chú chung

- **Upload ảnh**: Sử dụng `multer` để xử lý upload file, tối đa 4 ảnh (image1-image4).
- **Cloudinary**: Ảnh được upload lên Cloudinary, lưu trữ `secure_url` vào database.
- **Xác thực Admin**: API `/add` và `/remove` yêu cầu token admin. Gửi token qua header `token: {token}`.
- **Sizes**: Gửi dưới dạng JSON string, VD: `["S","M","L","XL"]`, controller sẽ parse thành array.
- **Bestseller**: Gửi dưới dạng string `"true"` hoặc `"false"`, controller tự chuyển sang boolean.
