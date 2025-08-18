// Dữ liệu ví dụ về sản phẩm
const products = [
    { name: "Phở bò", price: 45000 },
    { name: "Bún bò", price: 50000 },
    { name: "Bánh xèo", price: 35000 },
    { name: "Bún chả", price: 120000 },
    { name: "Ốc hương", price: 100000 },
    { name: "Cơm tấm", price: 30000 },
    { name: "Chả cuốn", price: 325000 },
    { name: "Bánh mì", price: 10000 }
];

// Danh sách các món ăn trong giỏ
let cart = [];

// Hàm cập nhật giỏ hàng
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';  // Xóa nội dung hiện tại

    let total = 0;

    // Lặp qua từng sản phẩm trong giỏ
    cart.forEach((item, index) => {
        const row = document.createElement('tr');
        
        const itemName = document.createElement('td');
        itemName.textContent = item.name;
        
        const itemPrice = document.createElement('td');
        itemPrice.textContent = item.price + "k";
        
        const itemQuantity = document.createElement('td');
        itemQuantity.textContent = item.quantity;

        const itemTotal = document.createElement('td');
        itemTotal.textContent = item.price * item.quantity + "k";

        const removeButton = document.createElement('td');
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Xóa";
        removeBtn.onclick = () => {
            cart.splice(index, 8);
            updateCart();
        };
        removeButton.appendChild(removeBtn);

        row.appendChild(itemName);
        row.appendChild(itemPrice);
        row.appendChild(itemQuantity);
        row.appendChild(itemTotal);
        row.appendChild(removeButton);
        cartItems.appendChild(row);

        total += item.price * item.quantity;
    });

    // Cập nhật tổng giá
    document.getElementById('total-price').textContent = total;
}

// Thêm món ăn vào giỏ
function addToCart(productIndex, quantity) {
    const product = products[productIndex];
    const existingItem = cart.find(item => item.name === product.name);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }

    updateCart();
}

// Gắn sự kiện thanh toán
document.getElementById('checkout').onclick = () => {
    alert('Thanh toán thành công!');
};

// Ví dụ: Thêm món ăn vào giỏ
addToCart(0, 2); // Thêm 2 "Món ăn 1"
addToCart(8, 1); // Thêm 1 "Món ăn 2"
