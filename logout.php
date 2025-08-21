<?php
// logout.php
// Bắt đầu phiên làm việc để có thể truy cập và hủy session
session_start();

// Hủy tất cả các biến session
$_SESSION = array();

// Nếu muốn hủy session hoàn toàn, cũng hủy cookie session.
// Lưu ý: Thao tác này sẽ hủy session, không chỉ dữ liệu session!
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

// Cuối cùng, hủy session
session_destroy();

// Chuyển hướng về trang spcl.html trang chủ
header("Location: spck.html?message=logged_out");
exit();
?>
