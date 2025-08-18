// const orderList = document.querySelector(".order-list")

// // check session
// checkSession()

// function getOrderList() {
//     let authorEmail = userSession?.user.email
//     let htmls = ""

//     db.collection("orders").where("author", "==", authorEmail)
//         .get()
//         .then((querySnapshot) => {
//             querySnapshot.forEach((doc) => {
//                 const orderItem = doc.data()
//                 console.log('🚀 ~ querySnapshot.forEach ~ orderItem:', orderItem)

//                 const createdAt = orderItem.createdAt.toDate(); // Chuyển đổi Firestore Timestamp thành đối tượng Date
//                 const options = { timeZone: 'Asia/Ho_Chi_Minh', hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
//                 const formattedDate = createdAt.toLocaleString('vi-VN', options); // Định dạng ngày tháng và giờ theo định dạng Việt Nam

//                 let statusString = ""
//                 let cancelButton = "" // Khởi tạo biến để lưu nút hủy

//                 if (orderItem.status == 0) {
//                     statusString = "Chờ xác nhận";
//                     cancelButton = `<button class="btn btn-danger btn-cancel" data-author="${orderItem.author}" data-order-id="${doc.id}" data-order-price="${orderItem.product.price * parseInt(orderItem.quantity)}">Hủy đơn</button>`; // Nút hủy hiển thị nếu status = 0
//                 } else if (orderItem.status == 1) {
//                     statusString = "Chờ vận chuyển";
//                 } else if (orderItem.status == 2) {
//                     statusString = "Đã nhận hàng";
//                 }
//                 else {
//                     statusString = "Đã hủy";
//                 }

//                 htmls += `
//                     <div class="order-item shadow-md mt-2">
//                         <div class="d-flex align-items-center px-2">
//                             <img class="rounded-md" src="${orderItem.product.image}" alt="${orderItem.product.name}">
//                             <div class="content p-2" style="flex: 50%">
//                                 <h6>${orderItem.product.name}</h6>
//                                 <p>Tổng tiền: ${orderItem.product.price * parseInt(orderItem.quantity)}</p>
//                                 <p>Ngày đặt: ${formattedDate}</p>
//                                 <p>Trạng thái: <i>${statusString}</i></p>
//                             </div>
//                             <div class="actions">
//                                 ${cancelButton}
//                             </div>
//                         </div>
//                     </div>
//                 `
//             });

//             orderList.innerHTML = htmls


//             // Thêm sự kiện cho nút hủy
//             document.querySelectorAll('.btn-cancel').forEach((button) => {
//                 button.addEventListener('click', function () {
//                     const orderId = this.getAttribute('data-order-id');
//                     const author = this.getAttribute('data-author');
//                     const orderPrice = parseFloat(this.getAttribute('data-order-price'));

//                     // Xác nhận hủy đơn hàng
//                     if (confirm("Bạn có chắc chắn muốn hủy đơn hàng này?")) {
//                         db.collection("orders").doc(orderId).update({
//                             status: 3 // Cập nhật status thành 3 để thể hiện rằng đơn hàng đã bị hủy
//                         })
//                             .then(() => {
//                                 // Lấy thông tin user để cập nhật lại số dư ví
//                                 return db.collection("users").where("email", "==", author).get();
//                             })
//                             .then((querySnapshot) => {
//                                 if (!querySnapshot.empty) {
//                                     const userDoc = querySnapshot.docs[0];
//                                     const userData = userDoc.data();
//                                     const newBalance = userData.balance + orderPrice;

//                                     // Cập nhật lại số dư ví
//                                     return db.collection("users").doc(userDoc.id).update({
//                                         balance: newBalance
//                                     });
//                                 } else {
//                                     throw new Error("User không tồn tại");
//                                 }
//                             })
//                             .then(() => {
//                                 alert("Hủy đơn hàng thành công và số dư ví đã được cập nhật.");
//                                 getOrderList(); // Cập nhật lại danh sách đơn hàng
//                             })
//                             .catch((error) => {
//                                 alert("Lỗi hủy đơn hàng.");
//                                 console.error("Error cancelling order: ", error);
//                             });
//                     }
//                 });
//             });
//         })
//         .catch((error) => {
//             console.log("Error getting documents: ", error);
//         });
// }

// getOrderList()
// Lấy các nút "Mua"
const buyButtons = document.querySelectorAll('.buy-btn');

// Giỏ hàng và tổng tiền
let cart = [];
let totalAmount = 0;

// Hàm thêm món vào giỏ hàng
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');
    
    // Clear giỏ hàng
    cartItems.innerHTML = '';

    // Hiển thị các món ăn trong giỏ hàng
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price}k`;
        cartItems.appendChild(li);
    });

    // Cập nhật tổng tiền
    totalElement.textContent = `Tổng tiền: ${totalAmount} VND`;
}

// Xử lý khi nhấn nút "Mua"
buyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const itemName = button.getAttribute('data-name');
        const itemPrice = parseFloat(button.getAttribute('data-price').replace('.', ''));

        // Thêm món ăn vào giỏ hàng
        cart.push({ name: itemName, price: itemPrice });
        
        // Cập nhật tổng tiền
        totalAmount += itemPrice;
        
        // Cập nhật giỏ hàng hiển thị
        updateCart();
    });
});
