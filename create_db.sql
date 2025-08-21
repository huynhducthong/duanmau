-- Tạo cơ sở dữ liệu mới nếu nó chưa tồn tại
-- Đặt tên cơ sở dữ liệu là tech_store_db
CREATE DATABASE IF NOT EXISTS tech_store_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Chọn cơ sở dữ liệu tech_store_db để sử dụng cho các câu lệnh tiếp theo
USE tech_store_db;

-- Tạo bảng 'users' để lưu trữ thông tin người dùng
-- IF NOT EXISTS đảm bảo bảng sẽ không được tạo lại nếu đã tồn tại
CREATE TABLE IF NOT EXISTS users (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, -- ID duy nhất cho mỗi người dùng, tự động tăng và là khóa chính
    name VARCHAR(255) NOT NULL,                    -- Tên của người dùng
    email VARCHAR(255) NOT NULL UNIQUE,            -- Email của người dùng, phải là duy nhất
    password VARCHAR(255) NOT NULL,                -- Mật khẩu đã được hash (độ dài 255 đủ cho các thuật toán hash)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Thời gian người dùng đăng ký, tự động điền
);
