# Ecommerce Integration Application

Ứng dụng thương mại điện tử hoàn chỉnh với chức năng quản lý sản phẩm, đơn hàng, giỏ hàng, người dùng và báo cáo.

## Cấu trúc Dự án

```
ecommerce-integration/
├── server/                      # Backend Express.js
│   ├── index.js                # Server chính
│   ├── package.json            # Dependencies
│   ├── .env                    # Biến môi trường
│   ├── controllers/            # Xử lý logic các request
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── orderController.js
│   │   ├── cartController.js
│   │   ├── userController.js
│   │   └── reportController.js
│   ├── routes/                 # Định nghĩa API routes
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── cartRoutes.js
│   │   └── ...
│   ├── services/               # Business logic
│   │   ├── authService.js
│   │   ├── productService.js
│   │   ├── orderService.js
│   │   └── ...
│   ├── middlewares/            # Authentication, upload
│   │   ├── authMiddleware.js
│   │   ├── upload.js
│   │   └── cloudinary.js
│   ├── strategies/             # OAuth strategies
│   │   ├── googlee.js
│   │   └── facebook.js
│   └── prisma/                 # Database schema & migrations
│       ├── schema.prisma
│       └── migrations/
│
├── client/                      # Frontend React + Vite
│   ├── src/
│   │   ├── main.jsx           # Entry point
│   │   ├── App.jsx            # Component chính
│   │   ├── App.css            # Styles chính
│   │   ├── index.css          # Global styles
│   │   ├── components/        # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Product.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── User.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Report.jsx
│   │   │   └── ui/            # UI components
│   │   ├── home/              # Trang chủ
│   │   ├── auth/              # Trang đăng nhập/đăng ký
│   │   ├── checkout/          # Trang thanh toán
│   │   ├── profile/           # Thông tin cá nhân
│   │   ├── order/             # Đơn hàng
│   │   ├── admin/             # Bảng điều khiển admin
│   │   ├── aboutus/           # Trang về chúng tôi
│   │   └── assets/            # Hình ảnh, icon
│   ├── public/                # Static files
│   ├── package.json           # Dependencies
│   ├── vite.config.js         # Cấu hình Vite
│   └── index.html             # HTML template
```

## Cơ Sở Dữ Liệu

Ứng dụng sử dụng **PostgreSQL** hoặc **MySQL** với Prisma ORM.

Các bảng chính:

- **Users**: Quản lý người dùng (email, password, role, avatar)
- **Products**: Danh sách sản phẩm (tên, giá, mô tả, hình ảnh)
- **Cart**: Giỏ hàng người dùng
- **Orders**: Đơn hàng (status, total, items)
- **Reports**: Báo cáo vấn đề từ người dùng

Cài đặt kết nối database trong `.env`:

```
DATABASE_URL="postgresql://user:password@localhost:5432/ecommerce"
```

## Cài Đặt

### 1. Cài Dependencies cho Server

```bash
cd server
npm install
```

### 2. Cấu hình Environment Variables

Tạo file `.env` trong thư mục `server`:

```
DATABASE_URL="postgresql://user:password@localhost:5432/ecommerce"
JWT_SECRET="your_jwt_secret_key"
CLOUDINARY_CLOUD_NAME="your_cloudinary_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
EMAIL_USER="your_email@gmail.com"
EMAIL_PASS="your_email_password"
```

### 3. Cài Dependencies cho Client

```bash
cd client
npm install
```

### 4. Cấu hình Client Environment

Tạo file `.env` trong thư mục `client`:

```
VITE_API_URL="http://localhost:5000/api"
```

### 5. Setup Database

```bash
cd server
npx prisma generate
npx prisma db push
```

## Chạy Ứng Dụng

### Cách 1: Chạy riêng rẽ trong 2 Terminal

**Terminal 1 - Backend Server:**

```bash
cd server
npm run dev
```

Server sẽ chạy trên `http://localhost:5000`

**Terminal 2 - Frontend Development Server:**

```bash
cd client
npm run dev
```

Client sẽ chạy trên `http://localhost:5173`

### Cách 2: Chạy trong VS Code

- Mở Terminal tích hợp (Ctrl + `)
- Chia Terminal thành 2 cửa sổ (Ctrl + \)
- Terminal 1: `cd server && npm run dev`
- Terminal 2: `cd client && npm run dev`

## API Endpoints

Server cung cấp các endpoints sau:

### Authentication (Xác thực)

```
POST /api/auth/register         # Đăng ký tài khoản
POST /api/auth/login            # Đăng nhập
POST /api/auth/logout           # Đăng xuất
POST /api/auth/refresh          # Refresh token
```

### Products (Sản phẩm)

```
GET /api/products               # Lấy danh sách sản phẩm
GET /api/products/:id           # Chi tiết sản phẩm
POST /api/products              # Tạo sản phẩm (Admin)
PUT /api/products/:id           # Cập nhật sản phẩm (Admin)
DELETE /api/products/:id        # Xóa sản phẩm (Admin)
```

### Cart (Giỏ hàng)

```
GET /api/cart                   # Lấy giỏ hàng của user
POST /api/cart/add              # Thêm sản phẩm vào giỏ
PUT /api/cart/:itemId           # Cập nhật quantity
DELETE /api/cart/:itemId        # Xóa khỏi giỏ
```

### Orders (Đơn hàng)

```
GET /api/orders                 # Lấy danh sách đơn hàng của user
GET /api/orders/:id             # Chi tiết đơn hàng
POST /api/orders                # Tạo đơn hàng mới
PUT /api/orders/:id/status      # Cập nhật trạng thái (Admin)
```

### Users (Người dùng)

```
GET /api/users/profile          # Thông tin cá nhân
PUT /api/users/profile          # Cập nhật hồ sơ
GET /api/users                  # Danh sách user (Admin)
```

### Reports (Báo cáo)

```
POST /api/reports               # Gửi báo cáo vấn đề
GET /api/reports                # Lấy danh sách báo cáo (Admin)
PUT /api/reports/:id/status     # Cập nhật trạng thái (Admin)
```

### Health Check

```
GET /api/health                 # Kiểm tra trạng thái server
```

## Tính Năng

- ✅ Đăng ký/Đăng nhập với email hoặc OAuth (Google, Facebook)
- ✅ Quản lý sản phẩm (CRUD)
- ✅ Giỏ hàng (thêm, cập nhật, xóa)
- ✅ Đặt hàng và theo dõi đơn hàng
- ✅ Quản lý hồ sơ người dùng
- ✅ Hệ thống báo cáo vấn đề (Issues)
- ✅ Bảng điều khiển Admin
- ✅ Upload hình ảnh sản phẩm (Cloudinary)
- ✅ Phân quyền người dùng (User, Admin)
- ✅ Responsive design (mobile-friendly)
- ✅ Xử lý lỗi toàn bộ ứng dụng

## Lưu Ý

- Cấu hình biến môi trường trong `.env` trước khi chạy
- Sử dụng Cloudinary để lưu trữ hình ảnh sản phẩm
- Token JWT hết hạn sau 24 giờ, sử dụng refresh token để gia hạn
- Chỉ Admin có quyền CRUD sản phẩm và xem báo cáo
- Database migrations tự động chạy khi cài dependencies
- Hỗ trợ OAuth login (Google, Facebook)
- Giá trị NULL được xử lý đặc biệt trong database

## Khắc Phục Sự Cố

### Lỗi kết nối Database

- Kiểm tra DATABASE_URL trong `.env` chính xác
- Đảm bảo database đang chạy
- Chạy `npx prisma generate` và `npx prisma db push`

### Lỗi OAuth (Google, Facebook)

- Xác nhận CLIENT_ID và CLIENT_SECRET trong `.env`
- Kiểm tra callback URL trong Google/Facebook console
- Xóa cache và cookies của browser

### Lỗi Upload Hình Ảnh

- Kiểm tra Cloudinary credentials trong `.env`
- Đảm bảo tài khoản Cloudinary còn quota
- Kiểm tra tương thích định dạng hình ảnh (JPG, PNG, WebP)

### CORS Error

- Đảm bảo backend đang chạy trên port 5000
- Kiểm tra API_URL trong `.env` (client)
- Thêm cors middleware trong Express nếu cần

### Token Expired

- Xóa JWT token từ localStorage
- Đăng nhập lại tài khoản
- Hoặc sử dụng refresh token endpoint

## Công Nghệ Sử Dụng

- **Backend**: Node.js, Express.js, Prisma ORM
- **Frontend**: React 19, Vite, Axios
- **Database**: PostgreSQL/MySQL
- **Authentication**: JWT, OAuth 2.0 (Google, Facebook)
- **File Storage**: Cloudinary
- **Styling**: CSS3, Responsive Design
- **DevTools**: Git, npm, Prisma CLI

## Tác Giả

Ecommerce Integration Application - 2025-2026
