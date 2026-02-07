# API Usage Guide - Product Add/Update with URL Parameters

## Overview

The product add/update endpoints now support passing parameters via URL query strings with token authentication.

---

## Endpoints

### 1. Add Product

**Endpoint:** `POST /api/admin/products/token-auth/add`

**Parameters (Query String):**

```
token=YOUR_JWT_TOKEN
title=Product Name
description=Product Description
category=Electronics
price=99.99
discountPercentage=10
rating=4.5
stock=50
brand=BrandName
sku=SKU123
weight=500
warrantyInformation=1 year warranty
shippingInformation=Free shipping
availabilityStatus=In Stock
returnPolicy=30 days
minimumOrderQuantity=1
width=10
height=20
depth=15
tags=tag1,tag2,tag3
```

**File Uploads (Form Data):**

- `thumbnail` - Product thumbnail image (single file)
- `newImages` - Product images (multiple files)
- `barcode` - Barcode image (single file)
- `qrCode` - QR code image (single file)

**Example Request (cURL):**

```bash
curl -X POST "http://localhost:10000/api/admin/products/token-auth/add?token=YOUR_TOKEN&title=Laptop&description=Gaming Laptop&category=Electronics&price=1000&stock=10&availabilityStatus=In%20Stock" \
  -F "thumbnail=@/path/to/thumbnail.jpg" \
  -F "newImages=@/path/to/image1.jpg" \
  -F "newImages=@/path/to/image2.jpg"
```

---

### 2. Update Product

**Endpoint:** `PUT /api/admin/products/token-auth/update/:id`

**URL Path Parameter:**

- `:id` - Product ID to update

**Query Parameters:** (Same as Add Product)

```
token=YOUR_JWT_TOKEN
title=Updated Name
description=Updated Description
... (other fields)
existingImages=["url1","url2"]
```

**File Uploads (Form Data):**

- `thumbnail` - New thumbnail image (optional)
- `newImages` - Additional product images (optional)
- `barcode` - New barcode image (optional)
- `qrCode` - New QR code image (optional)

**Example Request (cURL):**

```bash
curl -X PUT "http://localhost:10000/api/admin/products/token-auth/update/5?token=YOUR_TOKEN&title=Updated%20Name&price=899.99" \
  -F "newImages=@/path/to/new_image.jpg"
```

---

## React Client Implementation

### Getting Token

```javascript
const user = localStorage.getItem("user");
const token = user ? JSON.parse(user).token : "";
```

### Building URL Parameters

```javascript
const params = new URLSearchParams();
params.append("token", token);
params.append("title", "Product Name");
params.append("description", "Description");
params.append("category", "Electronics");
params.append("price", "99.99");
params.append("stock", "50");
params.append("availabilityStatus", "In Stock");
// ... add other parameters

const url = `${API_URL}/api/admin/products/token-auth/add?${params.toString()}`;
```

### Sending Request with Files

```javascript
const formData = new FormData();
formData.append("thumbnail", thumbnailFile);
formData.append("newImages", image1File);
formData.append("newImages", image2File);

await axios.post(url, formData, {
  headers: { "Content-Type": "multipart/form-data" },
});
```

---

## Response Format

### Success Response

```json
{
  "success": true,
  "message": "Product added successfully",
  "data": {
    "id": 1,
    "title": "Product Name",
    "description": "Description",
    "category": "Electronics",
    "price": 99.99,
    "stock": 50,
    ...
  }
}
```

### Error Response

```json
{
  "error": "Missing required fields: title, description, category, price, stock, availabilityStatus",
  "detail": "Error message"
}
```

---

## Required Fields

These fields must be provided for both Add and Update:

- ✅ `token` - JWT authentication token
- ✅ `title` - Product title (max 150 characters)
- ✅ `description` - Product description (max 500 characters)
- ✅ `category` - Product category
- ✅ `price` - Product price (must be > 0)
- ✅ `stock` - Stock quantity (must be >= 0)
- ✅ `availabilityStatus` - Availability status

---

## Optional Fields

- `discountPercentage` - Discount percentage (0-100)
- `rating` - Product rating (0-5)
- `brand` - Brand name (max 50 characters)
- `sku` - Stock keeping unit (max 30 characters)
- `weight` - Product weight
- `warrantyInformation` - Warranty info (max 100 characters)
- `shippingInformation` - Shipping info (max 100 characters)
- `returnPolicy` - Return policy (max 100 characters)
- `minimumOrderQuantity` - Minimum order quantity
- `width` - Product width
- `height` - Product height
- `depth` - Product depth
- `tags` - Product tags (comma-separated or JSON array string)

---

## Validation Rules

| Field                | Rule               | Example                         |
| -------------------- | ------------------ | ------------------------------- |
| `title`              | Max 150 characters | ✅ "MacBook Pro 16-inch"        |
| `description`        | Max 500 characters | ✅ "High-performance laptop..." |
| `brand`              | Max 50 characters  | ✅ "Apple"                      |
| `price`              | Must be > 0        | ✅ 1299.99                      |
| `discountPercentage` | 0-100              | ✅ 15                           |
| `rating`             | 0-5                | ✅ 4.5                          |
| `stock`              | >= 0               | ✅ 50                           |
| `sku`                | Max 30 characters  | ✅ "MBP-16-2024"                |

---

## Error Codes

| Code | Message                 | Solution                              |
| ---- | ----------------------- | ------------------------------------- |
| 400  | Missing required fields | Add all required fields in URL        |
| 401  | No token                | Include `?token=YOUR_TOKEN` in URL    |
| 403  | Invalid token           | Token expired or invalid, login again |
| 404  | Product not found       | Check product ID for update           |
| 500  | Internal server error   | Check server logs                     |

---

## Notes

1. **URL Encoding** - Special characters in URL parameters should be URL-encoded
   - Space → `%20`
   - & → `%26`
   - = → `%3D`

2. **Token Expiration** - Ensure token is valid before making requests

3. **File Size** - Maximum file sizes depend on Cloudinary configuration

4. **CORS** - Make sure CORS is enabled with correct origin

5. **Multipart Form Data** - Use `Content-Type: multipart/form-data` for file uploads
