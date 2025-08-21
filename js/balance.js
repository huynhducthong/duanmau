document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('balance-form');
    const amountInput = document.getElementById('amount');
    const cardNumberInput = document.getElementById('card-number'); // Lấy ô input số tài khoản
    const balanceNumber = document.querySelector('.balance-number');
    const resetButton = document.getElementById('reset-button');

    // Đọc số dư từ localStorage hoặc gán 0 nếu chưa có
    let balance = parseFloat(localStorage.getItem('wallet_balance')) || 0;

    // Hàm hiển thị số dư
    function updateBalanceDisplay() {
        balanceNumber.textContent = balance.toLocaleString('vi-VN') + ' VND';
    }

    // Khi người dùng submit form
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const amount = parseFloat(amountInput.value);
        if (isNaN(amount) || amount <= 0) {
            alert('Vui lòng nhập số tiền hợp lệ!');
            return;
        }

        // Cộng số dư
        balance += amount;

        // Lưu vào localStorage
        localStorage.setItem('wallet_balance', balance);

        // Cập nhật giao diện
        updateBalanceDisplay();

        // Reset input số tiền sau khi nạp thành công
        amountInput.value = '';

        alert('Nạp tiền thành công!');
    });

    // Thêm sự kiện cho nút reset để chỉ làm trống ô "Số tài khoản"
    resetButton.addEventListener('click', function () {
        cardNumberInput.value = ''; // Chỉ làm sạch ô số tài khoản
        alert('Đã reset ô số tài khoản!');
    });

    // Hiển thị số dư khi tải trang
    updateBalanceDisplay();
});