const profileDropdown = document.querySelector("#author-menu-drd")

if(userSession){
    const now = new Date().getTime()
    console.log("🚀 ~ now:", now)

    if(now < userSession?.expiry){
        profileDropdown.innerHTML = `
        <li class="bg-grey-light"><span class="dropdown-item">${userSession.user.providerData[0].email}</span></li>
        <li><a class="dropdown-item" href="./order.html">Đơn hàng</a></li>
        <li><a class="dropdown-item" href="./balance.html">Ví</a></li>
        <li><button id="logout-btn" class="btn text-danger">Đăng xuất</button</li>
        `

        // Xu ly dang xuat
        document.getElementById("logout-btn").addEventListener("click", function(){
            if(confirm("Ban co chac chan muon dang xuat khong?")){
                firebase.auth().signOut().then(() => {
                    // Sign-out successful.
                    
                    // Xoa thong tin user trong local storage
                    localStorage.removeItem("user_session")

                    // Chuyen huong den trang index
                    window.location.href = "/client/index.html"

                  }).catch((error) => {
                    // An error happened.
                    alert("Loi dang xuat")
                  });
            }
        })
    }
}