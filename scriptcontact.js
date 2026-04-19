
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    function updateCartCount() {
        let count = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById("cartCount").innerHTML = count;
    }
    
    const cartIcon = document.getElementById("cartIcon");
    window.addEventListener("scroll", () => {
        if (window.pageYOffset > 100) {
            cartIcon.classList.add("small");
            cartIcon.classList.remove("large");
        } else {
            cartIcon.classList.add("large");
            cartIcon.classList.remove("small");
        }
    });
    cartIcon.onclick = () => { window.location.href = "orders.html"; };
    
    updateCartCount();
