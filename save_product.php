<?php
// Thư mục lưu ảnh
$targetDir = "uploads/";

// Nếu chưa có thì tạo
if (!is_dir($targetDir)) {
    mkdir($targetDir, 0777, true);
}

$imageName = basename($_FILES["image"]["name"]);
$targetFile = $targetDir . time() . "_" . $imageName; // tránh trùng tên

// Di chuyển file từ bộ nhớ tạm sang thư mục uploads
if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile)) {
    // Lấy thông tin từ form
    $name = $_POST["name"];
    $price = $_POST["price"];
    $description = $_POST["description"];

    // Lưu vào file JSON
    $product = [
        "name" => $name,
        "price" => $price,
        "description" => $description,
        "image" => $targetFile
    ];

    $file = "products.json";
    $products = [];

    if (file_exists($file)) {
        $products = json_decode(file_get_contents($file), true);
    }

    $products[] = $product;

    file_put_contents($file, json_encode($products, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

    echo "Thêm sản phẩm thành công! <a href='order.html'>Xem sản phẩm</a>";
} else {
    echo "Lỗi khi upload ảnh.";
}
?>
