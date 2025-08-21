<?php
// process_register.php
require_once 'db_config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    // 1. Kiểm tra dữ liệu đầu vào cơ bản
    if (empty($name) || empty($email) || empty($password) || empty($confirm_password)) {
        header("Location: auth.html?error=empty_fields");
        exit();
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

    // 4. BỔ SUNG: Kiểm tra các ràng buộc phức tạp của mật khẩu
    $uppercase = preg_match('@[A-Z]@', $password);
    $lowercase = preg_match('@[a-z]@', $password);
    $number    = preg_match('@[0-9]@', $password);
    $specialChars = preg_match('@[^\w]@', $password);

    if (strlen($password) < 8 || !$uppercase || !$lowercase || !$number || !$specialChars) {
        header("Location: auth.html?error=password_requirements");
        exit();
    }
    
    // 5. Hash mật khẩu (RẤT QUAN TRỌNG cho bảo mật)
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // 6. Kiểm tra xem email đã tồn tại trong cơ sở dữ liệu chưa
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        header("Location: auth.html?error=email_exists");
        exit();
    }
    $stmt->close();

    // 7. Chèn dữ liệu người dùng mới vào cơ sở dữ liệu
    $stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $hashed_password);

    if ($stmt->execute()) {
        header("Location: auth.html?success=registration_successful");
        exit();
    } else {
        header("Location: auth.html?error=db_error");
        exit();
    }

    $stmt->close();
    $conn->close();
} else {
    header("Location: auth.html");
    exit();
}
?>