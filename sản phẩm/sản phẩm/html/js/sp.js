let carts = [];

function addToCart(productName, productPrice) {
    const product = {
        name: productName,
        price: productPrice,
        quantity: 1
    };

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingProductIndex = cart.findIndex(item => item.name === productName);

    if (existingProductIndex !== -1) {
        // Nếu có rồi, tăng số lượng sản phẩm
        cart[existingProductIndex].quantity++;
    } else {
        // Nếu chưa có, thêm sản phẩm mới vào giỏ
        cart.push(product);
    }

    renderCart();
}

function renderCart() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.getElementById('total-price');
    cartItemsContainer.innerHTML = '';  // Clear the cart items

    let totalPrice = 0;

    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `
            <span>${item.name} (x${item.quantity})</span>
            <span>${item.price * item.quantity} VNĐ</span>
        `;
        cartItemsContainer.appendChild(cartItemDiv);
        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = totalPrice.toLocaleString() + ' VNĐ';
}


const cartItemsContainer = document.querySelector(".cart-items");
const totalPriceEl = document.getElementById("total-price");

let cart = [];

function updateCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <span>${item.name}</span> - 
      <span>${item.price.toLocaleString()} VNĐ</span>
      <button onclick="removeItem(${index})">❌</button>
    `;
    cartItemsContainer.appendChild(div);
    total += item.price;
  });

  totalPriceEl.innerText = `${total.toLocaleString()} VNĐ`;
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

document.querySelectorAll(".buy-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const name = this.dataset.name;
    const price = parseInt(this.dataset.price);
    cart.push({ name, price });
    updateCart();
  });
});

// giohang
document.querySelectorAll('.buy-btn').forEach(button => {
  button.addEventListener('click', function() {
      let name = this.getAttribute('data-name');
      let price = parseInt(this.getAttribute('data-price'));
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      
      // Kiểm tra nếu món đã tồn tại trong giỏ
      let existingItem = cart.find(item => item.name === name);
      if (existingItem) {
          existingItem.quantity += 1;
      } else {
          cart.push({ name, price, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Đã thêm vào giỏ hàng!');
  });
});
// chat bot
// Mở/Đóng chatbot
document.getElementById('closeChat').onclick = function() {
  document.getElementById('chatbox').style.display = 'none';
};

// Mở chatbot khi click vào biểu tượng
document.getElementById('openChat').onclick = function() {
  document.getElementById('chatbox').style.display = 'block';
};

// Xử lý gửi tin nhắn
document.getElementById('sendMessage').onclick = function() {
  let userMessage = document.getElementById('chatInput').value;
  if (userMessage.trim() !== "") {
      // Hiển thị tin nhắn của người dùng
      let userMessageElement = document.createElement('div');
      userMessageElement.classList.add('user-message');
      userMessageElement.textContent = userMessage;
      document.getElementById('chatMessages').appendChild(userMessageElement);
      
      // Trả lời tự động từ chatbot
      let botMessageElement = document.createElement('div');
      botMessageElement.classList.add('bot-message');
      botMessageElement.textContent = generateBotResponse(userMessage);
      document.getElementById('chatMessages').appendChild(botMessageElement);
      
      // Cuộn xuống cuối chat
      document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;

      // Xóa input sau khi gửi
      document.getElementById('chatInput').value = '';
  }
};

// Hàm sinh câu trả lời tự động
function generateBotResponse(userMessage) {
  const lowerCaseMessage = userMessage.toLowerCase();
  
  if (lowerCaseMessage.includes("giá") || lowerCaseMessage.includes("món ăn")) {
      return "Chào bạn, vui lòng cung cấp tên món ăn bạn muốn biết giá.";
  } else if (lowerCaseMessage.includes("menu")) {
      return "Chúng tôi có nhiều món ngon như Bánh mì, Phở, Bún bò, Cơm tấm... bạn muốn xem món nào?";
  } else {
      return "Xin lỗi, tôi không hiểu câu hỏi của bạn. Bạn có thể thử lại không?";
  }
}
