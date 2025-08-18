<?php
// process_login.php
// Bao gồm file cấu hình cơ sở dữ liệu để có thể kết nối đến MySQL và bắt đầu session
require_once 'db_config.php';

// Kiểm tra xem yêu cầu đến trang này có phải là phương thức POST không
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Lấy dữ liệu từ form đăng nhập
    $email = htmlspecialchars($_POST['email']);
    $password = $_POST['password'];

    // 1. Kiểm tra dữ liệu đầu vào cơ bản
    if (empty($email) || empty($password)) {
        header("Location: auth.html?error=empty_login_fields");
        exit();
    }

    // 2. Lấy thông tin người dùng từ cơ sở dữ liệu dựa trên email
    // Sử dụng Prepared Statements để ngăn chặn SQL Injection
    $stmt = $conn->prepare("SELECT id, name, email, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email); // "s" cho biết biến là kiểu string
    $stmt->execute();
    $result = $stmt->get_result(); // Lấy kết quả truy vấn

    if ($result->num_rows === 1) {
        // Tìm thấy người dùng, lấy dữ liệu
        $user = $result->fetch_assoc();

        // 3. Xác minh mật khẩu đã hash
        // password_verify() so sánh mật khẩu người dùng nhập với mật khẩu đã hash trong DB
        if (password_verify($password, $user['password'])) {
            // Đăng nhập thành công!
            // Lưu thông tin người dùng vào session để sử dụng trên các trang khác
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['name'];
            $_SESSION['user_email'] = $user['email'];

            // Chuyển hướng đến trang dashboard hoặc trang chính sau khi đăng nhập
            header("Location: dashboard.php");
            exit();
        } else {
            // Mật khẩu không đúng
            header("Location: auth.html?error=invalid_credentials");
            exit();
        }
    } else {
        // Email không tồn tại trong cơ sở dữ liệu
        header("Location: auth.html?error=invalid_credentials");
        exit();
    }

    $stmt->close(); // Đóng statement
    $conn->close(); // Đóng kết nối cơ sở dữ liệu
} else {
    // Nếu không phải là phương thức POST, chuyển hướng về trang đăng nhập/đăng ký
    header("Location: auth.html");
    exit();
}
?>
