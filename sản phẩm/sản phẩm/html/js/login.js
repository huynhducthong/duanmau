const form = document.querySelector('form')
const inpEmail = document.getElementById('email')
const inpPass = document.getElementById('password')

form.addEventListener('submit', function (e) {
    // ngăn chặn tải lại trang
    e.preventDefault()

    let email = inpEmail.value
    let password = inpPass.value

    // dangnhapvs firebase auth
    firebase.auth().signInWithEmailAndPassword(email,password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    alert("dang nhap thanh cong")
    // luu thong tin dang nhap vao local storage
    const userSession = {
        user: user,
        hetHan: new Date().getTime() + 2 * 60 * 60 * 1000
    }

    /// luu vao storage

    localStorage.setItem("user_session", JSON.stringify(userSession))

     // chuyen den trang chu
     window.location.href = "/html/spck.html"
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert("mat khau sai!")
  });
   
})

form.reset()
