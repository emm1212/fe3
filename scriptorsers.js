
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    function updateQuantity(index, change) {
        let newQty = cart[index].quantity + change;
        if (newQty <= 0) {
            cart.splice(index, 1);
        } else {
            cart[index].quantity = newQty;
        }
        saveCart();
    }

    function calculateTotal() {
        return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    function sendOrder() {
        if (cart.length === 0) {
            alert("⚠️ السلة فارغة!");
            return;
        }
        let name = document.getElementById("customerName")?.value;
        let phone = document.getElementById("customerPhone")?.value;
        let address = document.getElementById("customerAddress")?.value;
        let notes = document.getElementById("orderNotes")?.value;
        
        if (!name || !phone) {
            alert("⚠️ الرجاء إدخال الاسم ورقم الجوال");
            return;
        }
        
        let msg = "🛍️ *طلب جديد من T/C Coffee*%0a%0a";
        msg += `👤 *الاسم:* ${name}%0a`;
        msg += `📱 *الجوال:* ${phone}%0a`;
        msg += `📍 *العنوان:* ${address || "لم يحدد"}%0a`;
        msg += `📝 *ملاحظات:* ${notes || "لا توجد"}%0a%0a`;
        msg += `📦 *الطلبات:*%0a`;
        
        let total = 0;
        for (let item of cart) {
            msg += `• ${item.name} ×${item.quantity} = ${(item.price * item.quantity).toLocaleString()} ر.ي %0a`;
            total += item.price * item.quantity;
        }
        msg += `%0a────────────────%0a`;
        msg += `💰 *الإجمالي:* ${total.toLocaleString()} ر.ي%0a`;
        msg += `%0a📦 يرجى تأكيد الطلب.`;
        
        let phoneNumber = "963123456789";
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`, "_blank");
    }

    function renderCart() {
        let container = document.getElementById("cartContainer");
        if (cart.length === 0) {
            container.innerHTML = `<div class="empty-cart">🛒 السلة فارغة<br><br><a href="menu.html" class="btn" style="display:inline-block; width:auto;">تسوق الآن</a></div>`;
            return;
        }
        
        let itemsHtml = `
            <table class="cart-table">
                <thead>
                    <tr>
                        <th>المنتج</th>
                        <th>السعر</th>
                        <th>الكمية</th>
                        <th>الإجمالي</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        for (let i = 0; i < cart.length; i++) {
            let item = cart[i];
            itemsHtml += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.price.toLocaleString()} ر.ي </td>
                    <td>
                        <button class="quantity-btn" onclick="updateQuantity(${i}, -1)">-</button>
                        ${item.quantity}
                        <button class="quantity-btn" onclick="updateQuantity(${i}, 1)">+</button>
                    </td>
                    <td>${(item.price * item.quantity).toLocaleString()} ر.ي </td>
                    <td><button class="remove-btn" onclick="updateQuantity(${i}, -${item.quantity})">حذف</button></td>
                </tr>
            `;
        }
        
        itemsHtml += `
                </tbody>
            </table>
            <div class="cart-total">💰 الإجمالي الكلي: ${calculateTotal().toLocaleString()} ر.ي </div>
            <div class="order-form">
                <h3 style="margin-bottom:20px;">📝 معلومات الطلب</h3>
                <input type="text" id="customerName" placeholder="👤 الاسم الكامل">
                <input type="tel" id="customerPhone" placeholder="📱 رقم الجوال">
                <input type="text" id="customerAddress" placeholder="📍 العنوان">
                <textarea id="orderNotes" rows="3" placeholder="💬 ملاحظات إضافية"></textarea>
                <button class="btn" onclick="sendOrder()">✅ إتمام الطلب عبر واتساب</button>
            </div>
        `;
        
        container.innerHTML = itemsHtml;
    }

    window.updateQuantity = updateQuantity;
    window.sendOrder = sendOrder;
    
    renderCart();
