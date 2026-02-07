# Product Add/Update with URL Parameters and Token Authentication

## Summary of Changes

Modified the product add/update functionality to accept parameters via URL query strings and use token authentication from the URL instead of middleware.

---

## Server-Side Changes

### 1. **Authentication Middleware** (`server/middlewares/authMiddleware.js`)

- Added new middleware function `authMiddlewareFromUrl`
- This middleware checks for token in both query parameters (`?token=...`) and cookies
- Falls back to cookies if token is not in URL
- Validates token using JWT

### 2. **Product Routes** (`server/routes/productRoutes.js`)

- Added new routes with token authentication:
  - `POST /api/admin/products/token-auth/add` - Add product with token from URL
  - `PUT /api/admin/products/token-auth/update/:id` - Update product with token from URL
- Both new routes use `authMiddlewareFromUrl` and `requireRole("ADMIN")`
- Support multipart file uploads (thumbnail, images, barcode, QR code)

### 3. **Product Controller** (`server/controllers/productController.js`)

- Added helper function `buildProductDataFromParams()` - Converts URL params to product data
- Added helper function `handleFileUploads()` - Handles file uploads from request
- Added new controller functions:
  - `addProductWithUrlParams` - Creates product from URL query parameters
  - `updateProductWithUrlParams` - Updates product from URL query parameters
- Both functions accept product data from either query params or request body
- Support all product fields via URL parameters

---

## Client-Side Changes

### **Product Component** (`client/src/components/Product.jsx`)

Modified the `onSubmit` function to:

1. Extract token from localStorage (stores `user` object with token)
2. Build URL parameters containing all product data:
   - title, description, category, price, discount
   - rating, stock, brand, sku, weight
   - warranty info, shipping info, availability status
   - return policy, minimum order quantity
   - dimensions (width, height, depth)
   - tags, existing images
3. Construct URL with all parameters and token
4. Use new endpoints:
   - `POST /api/admin/products/token-auth/add` for new products
   - `PUT /api/admin/products/token-auth/update/:id` for updates
5. Still support file uploads (multipart/form-data)

---

## URL Format Examples

### Add Product

```
POST /api/admin/products/token-auth/add?token=YOUR_TOKEN&title=Product&description=Desc&category=Electronics&price=99.99&stock=10&availabilityStatus=In%20Stock...
```

### Update Product

```
PUT /api/admin/products/token-auth/update/123?token=YOUR_TOKEN&title=Updated&price=79.99...
```

---

## How It Works

1. **Client sends request** with:
   - Token in URL query parameter (`?token=...`)
   - Product data as URL query parameters
   - File uploads as multipart/form-data body

2. **Server receives request** and:
   - Validates token from URL using `authMiddlewareFromUrl`
   - Verifies user has ADMIN role
   - Extracts product data from URL parameters
   - Processes file uploads
   - Creates or updates product in database
   - Returns success response

---

## Key Features

✅ **Token in URL** - No need for middleware authentication on protected routes
✅ **URL Parameters** - All product fields can be passed as query parameters
✅ **File Uploads** - Still supports multipart/form-data for image uploads
✅ **Validation** - Required fields are validated server-side
✅ **Backward Compatible** - Original middleware-based routes still work

---

## Required Fields (Validated)

- `title` - Product title
- `description` - Product description
- `category` - Product category
- `price` - Product price (must be > 0)
- `stock` - Stock quantity
- `availabilityStatus` - Availability status

---

## Notes

- Token is retrieved from `localStorage.getItem("user")` which stores a JSON object
- Token must be included in the URL as query parameter for the new endpoints
- Old endpoints (`/api/admin/products`) still work with middleware authentication
- File upload size limits remain the same (Cloudinary upload)
