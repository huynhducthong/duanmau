// // const db = firebase.firestore();
// // const userSession = JSON.parse(localStorage.getItem("user_session"));
// // const userId = userSession?.uid;

// // const form = document.getElementById("balance-form");
// // const balanceDisplay = document.querySelector(".balance-number");

// // async function loadBalance() {
// //     if (!userId) return;
// //     try {
// //         const docRef = db.collection("wallets").doc(userId);
// //         const docSnap = await docRef.get();

// //         if (docSnap.exists) {
// //             const data = docSnap.data();
// //             balanceDisplay.textContent = formatCurrency(data.balance || 0);
// //         } else {
// //             balanceDisplay.textContent = formatCurrency(0);
// //         }
// //     } catch (error) {
// //         console.error("Lỗi khi tải số dư:", error);
// //     }
// // }

// // function formatCurrency(amount) {
// //     return amount.toLocaleString('vi-VN', {
// //         style: 'currency',
// //         currency: 'VND'
// //     });
// // }

// // form.addEventListener("submit", async (e) => {
// //     e.preventDefault();
// //     const amount = parseFloat(document.getElementById("amount").value);

// //     if (!amount || amount <= 0) {
// //         alert("Vui lòng nhập số tiền hợp lệ");
// //         return;
// //     }

// //     try {
// //         const walletRef = db.collection("wallets").doc(userId);
// //         const walletDoc = await walletRef.get();

// //         let currentBalance = 0;
// //         if (walletDoc.exists) {
// //             currentBalance = walletDoc.data().balance || 0;
// //         }

// //         const newBalance = currentBalance + amount;

// //         await walletRef.set({
// //             balance: newBalance,
// //             updatedAt: firebase.firestore.FieldValue.serverTimestamp()
// //         });

// //         alert("Nạp tiền thành công!");
// //         form.reset();
// //         loadBalance();
// //     } catch (error) {
// //         console.error("Lỗi khi nạp tiền:", error);
// //         alert("Có lỗi xảy ra khi nạp tiền.");
// //     }
// // });

// // // Gọi khi load trang
// // loadBalance();


// // test
// document.addEventListener('DOMContentLoaded', function () {
//     const form = document.getElementById('balance-form');
//     const amountInput = document.getElementById('amount');
//     const balanceNumber = document.querySelector('.balance-number');

//     // Đọc số dư từ localStorage hoặc gán 0 nếu chưa có
//     let balance = parseFloat(localStorage.getItem('wallet_balance')) || 1;

//     // Hàm hiển thị số dư
//     function updateBalanceDisplay() {
//         balanceNumber.textContent = balance.toLocaleString('vi-VN') + ' VND';
//     }

//     // Khi người dùng submit form
//     form.addEventListener('submit', function (e) {
//         e.preventDefault();
//         const amount = parseFloat(amountInput.value);
//         if (isNaN(amount) || amount <= 0) {
//             alert('Vui lòng nhập số tiền hợp lệ!');
//             return;
//         }

//         // Cộng số dư
//         balance += amount;

//         // Lưu vào localStorage
//         localStorage.setItem('wallet_balance', balance);

//         // Cập nhật giao diện
//         updateBalanceDisplay();

//         // Reset input
//         amountInput.value = '';

//         alert('Nạp tiền thành công!');
//     });

//     // Hiển thị số dư khi tải trang
//     updateBalanceDisplay();
// });
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('balance-form');
    const amountInput = document.getElementById('amount');
    const balanceNumber = document.querySelector('.balance-number');
    const resetButton = document.getElementById('reset-button');  // Thêm nút reset

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

        // Reset input
        amountInput.value = '';

        alert('Nạp tiền thành công!');
    });

    // Thêm sự kiện cho nút reset để đưa số dư về 0
    resetButton.addEventListener('click', function () {
        balance = 0;  // Đặt số dư về 0
        localStorage.setItem('wallet_balance', balance);  // Lưu lại vào localStorage
        updateBalanceDisplay();  // Cập nhật giao diện
        alert('Số dư đã được đặt lại về 0');
    });

    // Hiển thị số dư khi tải trang
    updateBalanceDisplay();
});
