

    // تحميل بيانات السلة من LocalStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // تحديث عدد السلة
    function updateCartCount() {
        let count = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById("cartCount").innerHTML = count;
    }
    
    // أيقونة السلة - تصغر وتكبر عند التمرير
    const cartIcon = document.getElementById("cartIcon");
    
    window.addEventListener("scroll", () => {
        let currentScroll = window.pageYOffset;
        if (currentScroll > 100) {
            cartIcon.classList.add("small");
            cartIcon.classList.remove("large");
        } else {
            cartIcon.classList.add("large");
            cartIcon.classList.remove("small");
        }
    });
    
    // عند النقر على أيقونة السلة - ننتقل لصفحة الطلبات
    cartIcon.onclick = () => {
        window.location.href = "orders.html";
    };
    
    updateCartCount();
