function checkSession(){
    if(userSession){
        const now = new Date().getTime()

        if(now > userSession?.expiry){
            //Het han thi xoa thong tin user trong local storage
            localStorage.removeItem("user_session")
            window.location.href = "./login.html"
        }
        else{
            console.log("Còn phiên đăng nhập");
            
        }
    } else{
        // Khong co session, chuyen huong ve trang login
        window.location.href = "./login.html"
    }
}