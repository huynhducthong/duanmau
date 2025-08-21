<?php
// db_config.php

// Bật hiển thị lỗi để dễ dàng gỡ lỗi trong quá trình phát triển
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Thông tin kết nối cơ sở dữ liệu
$servername = "localhost"; // Tên máy chủ cơ sở dữ liệu (thường là localhost)
$username = "root";        // Tên người dùng MySQL của bạn (mặc định XAMPP/WAMP là "root")
$password = "";            // Mật khẩu MySQL của bạn (mặc định XAMPP/WAMP là trống)
$dbname = "tech_store_db"; // Tên cơ sở dữ liệu bạn sẽ tạo

// Tạo kết nối
$conn = new mysqli($servername, $username, $password, $dbname);

// Kiểm tra kết nối
if ($conn->connect_error) {
    // Dừng script và hiển thị lỗi nếu kết nối thất bại
    die("Kết nối cơ sở dữ liệu thất bại: " . $conn->connect_error);
}

// Thiết lập mã hóa ký tự cho kết nối để hỗ trợ tiếng Việt
$conn->set_charset("utf8mb4");

// Bắt đầu phiên làm việc (session) để quản lý trạng thái đăng nhập của người dùng
// Session cho phép lưu trữ thông tin người dùng giữa các trang
session_start();
?>
