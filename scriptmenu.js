
    const menuData = {
        "🍰 كيك": [
            { name: "كيك تي سي", price: 4800 }, { name: "كيك تشالكس", price: 4800 },
            { name: "ماتيلدا كيك", price: 5300 }, { name: "كيك مارس", price: 6300 },
            { name: "كيك فيروشي", price: 5300 }, { name: "كيك كيت كات", price: 4800 },
            { name: "كيك أوريو", price: 4800 }, { name: "كيك لوست", price: 3500 }
        ],
        "🍰 تشيز كيك": [
            { name: "تشيز كيك فراولة", price: 5800 }, { name: "تشيز كيك بستاشيو", price: 4500 },
            { name: "تشيز كيك أوريو", price: 6300 }, { name: "تشيز كيك تي سي", price: 6300 }
        ],
        "🍪 حلى": [
            { name: "براونيز", price: 3000 }, { name: "وافل", price: 3000 },
            { name: "كريب", price: 3000 }, { name: "دونات محشي", price: 2800 }
        ],
        "🍕 بيتزا وفطائر": [
            { name: "بيتزا تي سي", price: 10000 }, { name: "بيتزا دجاج", price: 6300 },
            { name: "بيتزا مكس", price: 7500 }
        ],
        "🥤 مشروبات باردة": [
            { name: "كواد برو", price: 5500 }, { name: "موكا بارد", price: 4800 },
            { name: "ميلك شيك", price: 5000 }
        ],
        "☕ قهوة ساخنة": [
            { name: "اسبرسو", price: 2500 }, { name: "كابتشينو", price: 4000 },
            { name: "قهوة تركية", price: 2500 }
        ]
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let activeTab = Object.keys(menuData)[0];

    function showNotification(msg) {
        let n = document.createElement("div");
        n.className = "notification";
        n.innerHTML = msg;
        document.body.appendChild(n);
        setTimeout(() => n.remove(), 2000);
    }

    function updateCartCount() {
        let count = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById("cartCount").innerHTML = count;
    }

    function addToCart(name, price) {
        let existing = cart.find(i => i.name === name);
        if (existing) {
            existing.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showNotification("✅ تم إضافة " + name + " إلى السلة");
    }

    function renderTabs() {
        let container = document.getElementById("tabsContainer");
        container.innerHTML = "";
        for (let cat in menuData) {
            let btn = document.createElement("button");
            btn.innerHTML = cat;
            btn.className = "tab-btn";
            if (activeTab === cat) btn.classList.add("active");
            btn.onclick = (function(c) {
                return function() { activeTab = c; renderTabs(); renderMenu(); };
            })(cat);
            container.appendChild(btn);
        }
    }

    function renderMenu() {
        let grid = document.getElementById("menuGrid");
        let items = menuData[activeTab];
        grid.innerHTML = "";
        for (let item of items) {
            let div = document.createElement("div");
            div.className = "menu-item";
            div.innerHTML = `
                <div class="menu-img">${activeTab.includes("كيك") ? "🍰" : activeTab.includes("بيتزا") ? "🍕" : activeTab.includes("مشروبات") ? "🥤" : activeTab.includes("قهوة") ? "☕" : "🍽️"}</div>
                <div class="menu-info">
                    <h3>${item.name}</h3>
                    <div class="price">${item.price.toLocaleString()}  ر. ي </div>
                    <button class="add-to-cart" data-name="${item.name}" data-price="${item.price}">➕ أضف للسلة</button>
                </div>
            `;
            grid.appendChild(div);
        }
        document.querySelectorAll(".add-to-cart").forEach(btn => {
            btn.onclick = function() {
                addToCart(this.getAttribute("data-name"), parseInt(this.getAttribute("data-price")));
            };
        });
    }

    // أيقونة السلة
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
    renderTabs();
    renderMenu();
