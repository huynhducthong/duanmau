
    
document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim()
    const password = document.getElementById('password').value
    let role_id = 2;

    const uppercase = /[A-Z]/g
    const lowercase = /[a-z]/g
    const number = /[0-9]/g

    if (password.length < 8) {
        alert('Password phải có ít nhất 8 ký tự')
    } else if (!password.match(lowercase)) {
        alert('Password phải có ít nhất 1 chữ thường')
    } else if (!password.match(uppercase)) {
        alert('Password phải có ít nhất 1 chữ hoa')
    } else if (!password.match(number)) {
        alert('Password phải có ít nhất 1 số')
    } else {
        firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // thong tin nguoi dung

      let userData = {
        email,
        password,
        role_id: role_id,
        balance: 0, // SO DU VI MAC DINH LA 0
      };

      
          db.collection("users").add({ userData })
          .then((docRef) => {
            alert("đăng kí thành công");
            window.location.href = "login.html"; // chuyen trang
            console.log("Document written with ID: ", docRef.id);
          })
          .catch((error) => {
            alert("đăng nhập thất bại");
            console.error("Error adding document: ", error);
          });
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("🚀 ~ xuLyDangKy ~ error:", error);
    });
    }
});
