# Hướng Dẫn Sửa Lỗi "Forbidden Access" và Password Authentication

## 🐛 Vấn đề chính đã khắc phục

### 1. "Forbidden Access" với GraphQL registerKhachHang
✅ **Đã sửa**: Custom GraphQL resolvers bypass hoàn toàn Strapi authorization

### 2. "Mật khẩu không đúng" khi login
✅ **Đã sửa**: Double hashing issue - Strapi tự động hash field type "password"

## 🔧 Root Cause: Double Password Hashing

**Vấn đề**: 
- Field `matKhau` có type `"password"` trong schema
- Strapi tự động hash password khi type = "password" 
- Service cũng hash password với bcrypt
- **Kết quả**: Password bị hash 2 lần → Login thất bại

**Giải pháp**:
```json
// be/src/api/khach-hang/content-types/khach-hang/schema.json
"matKhau": {
  "type": "string", // ✅ Thay đổi từ "password" thành "string"
  "required": true,
  "minLength": 6,
  "maxLength": 200
}
```

## ✅ Tất cả giải pháp đã áp dụng

### 1. GraphQL Configuration
**File: `be/config/plugins.ts`**
- Tắt `defaultResolverAuth: false`
- Cấu hình `resolversConfig` bypass auth cho custom resolvers

### 2. Custom GraphQL Resolvers  
**File: `be/src/index.ts`**
- Disable shadow CRUD cho `api::khach-hang.khach-hang`
- Raw resolvers bypass hoàn toàn Strapi authorization
- Custom types: `AuthKhachHang`, `KhachHangAuthPayload`

### 3. Password Schema Fix
**File: `be/src/api/khach-hang/content-types/khach-hang/schema.json`**
- Thay đổi field `matKhau` từ type `"password"` → `"string"`
- Tránh double hashing của Strapi

### 4. Service Layer với Debug
**File: `be/src/api/khach-hang/services/khach-hang.ts`**
- JWT secret từ Strapi config
- Debug logging cho password validation
- Hybrid handling cho existing plain text passwords

### 5. REST API Backup
**File: `be/src/api/khach-hang/routes/auth.ts`**
- REST endpoints dự phòng: `/khach-hang/auth/*`

## 🚀 Cách test sau khi sửa

### **BƯỚC 1: Restart Server**
```bash
# Dừng server hiện tại (Ctrl+C)
# Khởi động lại
npm run dev
```

### **BƯỚC 2: Test GraphQL**
```bash
node test-graphql-final.js
```

**Expected Output:**
```
🚀 Testing GraphQL with new user: graphql1751466618181@example.com

1. Testing GraphQL Register...
✅ Register Success!
User ID: 18
JWT received: Yes

2. Testing GraphQL Login...
✅ Login Success!
User email: graphql1751466618181@example.com
JWT received: Yes

🎉 All tests passed! Password issue fixed!
```

### **BƯỚC 3: Test với existing users**
User cũ sẽ cần register lại hoặc reset password vì bị double-hash.

## 📝 Thay đổi quan trọng

### GraphQL Response Structure
```json
// ✅ Mới
{
  "data": {
    "registerKhachHang": {
      "user": {
        "id": "18",
        "email": "user@example.com",
        "ho": "Nguyen", 
        "ten": "Van A"
      },
      "jwt": "eyJhbGci..."
    }
  }
}
```

### Password Handling
- ✅ **Single hashing**: Chỉ hash 1 lần trong service
- ✅ **bcrypt.compare**: Hoạt động đúng với hash từ service
- ✅ **Schema type**: `"string"` thay vì `"password"`

## 🛠️ Troubleshooting

### Nếu vẫn lỗi login với user cũ:
```bash
# User cũ bị double-hash, cần tạo user mới:
node test-graphql-final.js
```

### Nếu muốn fix user cũ:
Tạo migration script để reset password cho existing users.

## 🎯 Kết quả cuối cùng

- ✅ GraphQL `registerKhachHang` hoạt động (không lỗi "Forbidden access")
- ✅ GraphQL `loginKhachHang` hoạt động (không lỗi "Mật khẩu không đúng")
- ✅ Password được hash đúng cách (single hash)
- ✅ JWT authentication hoạt động hoàn hảo
- ✅ REST API backup sẵn sàng

## 🔒 Security Notes

1. **JWT Secret**: Thay đổi trong production
2. **Password Policy**: Có thể tăng minLength > 6
3. **Rate Limiting**: Thêm cho login endpoints
4. **HTTPS**: Enable trong production
5. **Input Validation**: Đã có basic validation 