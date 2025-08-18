<?php
// process_register.php
// Bao gồm file cấu hình cơ sở dữ liệu để có thể kết nối đến MySQL
require_once 'db_config.php';

// Kiểm tra xem yêu cầu đến trang này có phải là phương thức POST không
// Điều này đảm bảo rằng dữ liệu được gửi từ form
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Lấy dữ liệu từ form đăng ký
    // htmlspecialchars() được sử dụng để ngăn chặn các cuộc tấn công XSS (Cross-Site Scripting)
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $password = $_POST['password']; // Mật khẩu sẽ được hash, không cần htmlspecialchars ở đây
    $confirm_password = $_POST['confirm_password'];

    // 1. Kiểm tra dữ liệu đầu vào cơ bản
    if (empty($name) || empty($email) || empty($password) || empty($confirm_password)) {
        // Chuyển hướng người dùng về trang đăng ký với thông báo lỗi
        header("Location: auth.html?error=empty_fields");
        exit(); // Dừng script
    }

    // 2. Kiểm tra định dạng email hợp lệ
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header("Location: auth.html?error=invalid_email");
        exit();
    }

    // 3. Kiểm tra mật khẩu và xác nhận mật khẩu có khớp nhau không
    if ($password !== $confirm_password) {
        header("Location: auth.html?error=password_mismatch");
        exit();
    }

    // 4. Kiểm tra độ dài mật khẩu (tối thiểu 6 ký tự)
    if (strlen($password) < 6) {
        header("Location: auth.html?error=password_too_short");
        exit();
    }

    // 5. Hash mật khẩu (RẤT QUAN TRỌNG cho bảo mật)
    // password_hash() tạo ra một chuỗi hash an toàn của mật khẩu
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // 6. Kiểm tra xem email đã tồn tại trong cơ sở dữ liệu chưa
    // Sử dụng Prepared Statements để ngăn chặn SQL Injection
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email); // "s" cho biết biến là kiểu string
    $stmt->execute();
    $stmt->store_result(); // Lưu trữ kết quả để kiểm tra số hàng

    if ($stmt->num_rows > 0) {
        // Email đã tồn tại, thông báo cho người dùng
        header("Location: auth.html?error=email_exists");
        exit();
    }
    $stmt->close(); // Đóng statement

    // 7. Chèn dữ liệu người dùng mới vào cơ sở dữ liệu
    $stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $hashed_password); // "sss" cho 3 biến kiểu string

    if ($stmt->execute()) {
        // Đăng ký thành công, chuyển hướng đến trang đăng nhập với thông báo thành công
        header("Location: auth.html?success=registration_successful");
        exit();
    } else {
        // Xảy ra lỗi khi chèn vào cơ sở dữ liệu
        header("Location: auth.html?error=db_error");
        // Ghi log lỗi chi tiết hơn nếu cần: error_log("Lỗi chèn DB: " . $stmt->error);
        exit();
    }

    $stmt->close(); // Đóng statement
    $conn->close(); // Đóng kết nối cơ sở dữ liệu
} else {
    // Nếu không phải là phương thức POST (người dùng truy cập trực tiếp URL),
    // chuyển hướng về trang đăng ký/đăng nhập
    header("Location: auth.html");
    exit();
}
?>
