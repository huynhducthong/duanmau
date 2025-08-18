const productForm = document.getElementById("product-form")

productForm.addEventListener("submit", function (event) {
    event.preventDefault() // ngan chan hanh vi mac dinh cua trang

    const productName = document.getElementById("product_name").value
    const productPrice = document.getElementById("product_price").value
    const productImage = document.getElementById("product_image").files[0]

    if (productImage) {
        const formData = new FormData()
        formData.append("image", productImage)

        fetch("http://localhost:3001/upload", {
            method: "POST",
            body: formData
        })
            .then((response) => response.json())
            .then((response) => {
                console.log('🚀 ~ .then ~ response:', response)
                db.collection("products").add({
                    name: productName,
                    price: productPrice,
                    image: response.data.secure_url,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                })
                    .then((docRef) => {
                        console.log("Them san pham thanh cong!!!")

                        // load san pham
                        loadProduct()
                    })
                    .catch((error) => {
                        console.error("Error adding document: ", error);
                    });
            })
    }
})

// hien thi san pham
function loadProduct() {
    const productTable = document.getElementById("product-list")

    let htmls = ""  // tao phan tu html rong
    let index = 1
    db.collection("products")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const product = doc.data()
                console.log('🚀 ~ querySnapshot.forEach ~ product:', product)

                // in html
                htmls += `
                <tr class="product-item text-center">
                              <th scope="row">${index}</th>
                              <td><img src="${product.image}" alt="${product.name}"></td>
                              <td>${product.name}</td>
                              <td>${product.price}</td>
                              <td>
                                  <button class="btn btn-danger btn-sm btn-delete-product" data-id="${doc.id}"><i class="fa-light fa-trash-can"></i></button>
                              </td>
                          </tr>
            `
                index++
            });
            productTable.innerHTML = htmls;

            const btnDelete = document.querySelectorAll(".btn-delete-product")

            btnDelete.forEach((btn) => {
                btn.addEventListener("click", () => {
                    const productId = btn.getAttribute("data-id")
                    deleteProduct(productId)
                    loadProduct()
                })
            })
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
}

// xoa san pham
function deleteProduct(productId) {
    if (confirm("Ban co chac chan muon xoa san pham nay?")) {
        db.collection("products").doc(productId).delete().then(() => {
            console.log("Xoa san pham thanh cong!!!");
            // tai lai danh sach san pham
            loadProduct()
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }
}

loadProduct()
