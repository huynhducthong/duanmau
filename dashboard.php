<?php
// dashboard.php
// Bắt đầu phiên làm việc để có thể truy cập thông tin session của người dùng
session_start();

// Kiểm tra xem người dùng đã đăng nhập chưa bằng cách kiểm tra biến session 'user_id'
if (!isset($_SESSION['user_id'])) {
    // Nếu chưa đăng nhập, chuyển hướng về trang đăng nhập/đăng ký
    header("Location: auth.html");
    exit();
}

// Lấy tên người dùng từ session để hiển thị
$user_name = $_SESSION['user_name'];
?>

<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Inter Font -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body class="bg-gray-100 flex flex-col justify-center items-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-xl text-center">
        <h2 class="text-3xl font-bold text-gray-800 mb-4">Chào mừng, <?php echo htmlspecialchars($user_name); ?>!</h2>
        <p class="text-gray-600 mb-6">Bạn đã đăng nhập thành công.</p>
        <!-- Nút Đăng Xuất, trỏ đến file spck.html -->
        <a href="logout.php" class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200">Về Trang Chủ</a>
    </div>
</body>
</html>
