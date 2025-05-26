document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items-container");
  const cartSummaryDiv = document.getElementById("cart-summary");
  const emptyCartMessage = document.querySelector(".empty-cart-message");
  const cartSubtotalEl = document.getElementById("cart-subtotal");
  // const cartShippingEl = document.getElementById('cart-shipping'); // Jika ingin implementasi biaya kirim
  const cartTotalEl = document.getElementById("cart-total");
  const cartCountHeader = document.querySelector("header .cart-count"); // Ambil cart count di header
  const proceedToCheckoutBtn = document.getElementById(
    "proceed-to-checkout-btn"
  );

  function loadCartFromLocalStorage() {
    const items = JSON.parse(localStorage.getItem("cartItems")) || [];
    const count = parseInt(localStorage.getItem("cartItemCount")) || 0;
    return { items, count };
  }

  function saveCartToLocalStorage(items, count) {
    localStorage.setItem("cartItems", JSON.stringify(items));
    localStorage.setItem("cartItemCount", count.toString());
    updateHeaderCartCount(count); // Update juga header saat menyimpan
  }

  function updateHeaderCartCount(count) {
    if (cartCountHeader) {
      cartCountHeader.textContent = count;
    }
  }

  function renderCartItems() {
    const { items, count } = loadCartFromLocalStorage();
    updateHeaderCartCount(count); // Update hitungan di header

    if (!cartItemsContainer || !cartSummaryDiv || !emptyCartMessage) return;

    cartItemsContainer.innerHTML = ""; // Kosongkan kontainer dulu

    if (items.length === 0) {
      emptyCartMessage.style.display = "block";
      cartSummaryDiv.style.display = "none";
      if (proceedToCheckoutBtn) proceedToCheckoutBtn.disabled = true;
    } else {
      emptyCartMessage.style.display = "none";
      cartSummaryDiv.style.display = "block";
      if (proceedToCheckoutBtn) proceedToCheckoutBtn.disabled = false;

      const table = document.createElement("table");
      table.classList.add("cart-table");
      table.innerHTML = `
                <thead>
                    <tr>
                        <th>Produk</th>
                        <th>Nama</th>
                        <th>Harga</th>
                        <th>Jumlah</th>
                        <th>Subtotal</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody></tbody>
            `;
      const tbody = table.querySelector("tbody");

      items.forEach((item, index) => {
        const row = tbody.insertRow();
        row.innerHTML = `
                    <td><img src="${
                      item.image || "https://via.placeholder.com/50"
                    }" alt="${item.name}" class="cart-item-image"></td>
                    <td>
                        ${item.name}
                        <div class="cart-item-variants">
                            ${
                              item.size && item.size !== "-"
                                ? `<span>Ukuran: ${item.size}</span>`
                                : ""
                            }
                            ${
                              item.color && item.color !== "-"
                                ? `<span>Warna: ${item.color}</span>`
                                : ""
                            }
                        </div>
                    </td>
                    <td>Rp ${item.price.toLocaleString("id-ID")}</td>
                    <td>
                        <div class="quantity-selector cart-quantity">
                            <button class="quantity-btn decrease-cart-item" data-index="${index}">-</button>
                            <input type="number" value="${
                              item.quantity
                            }" min="1" readonly class="cart-item-qty-input">
                            <button class="quantity-btn increase-cart-item" data-index="${index}">+</button>
                        </div>
                    </td>
                    <td>Rp ${(item.price * item.quantity).toLocaleString(
                      "id-ID"
                    )}</td>
                    <td><button class="btn btn-danger btn-sm remove-cart-item" data-index="${index}"><i class="fas fa-trash"></i></button></td>
                `;
      });
      cartItemsContainer.appendChild(table);
      addCartItemEventListeners(); // Tambahkan event listener ke tombol +/-/hapus
    }
    updateCartSummary(items);
  }

  function updateCartSummary(items) {
    let subtotal = 0;
    items.forEach((item) => {
      subtotal += item.price * item.quantity;
    });

    // Untuk sekarang, biaya pengiriman kita set 0 atau placeholder
    const shippingCost = 0; // Anda bisa membuat ini lebih dinamis nanti

    const total = subtotal + shippingCost;

    if (cartSubtotalEl)
      cartSubtotalEl.textContent = `Rp ${subtotal.toLocaleString("id-ID")}`;
    // if (cartShippingEl) cartShippingEl.textContent = `Rp ${shippingCost.toLocaleString('id-ID')}`;
    if (cartTotalEl)
      cartTotalEl.textContent = `Rp ${total.toLocaleString("id-ID")}`;
  }

  function addCartItemEventListeners() {
    document.querySelectorAll(".decrease-cart-item").forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = parseInt(event.currentTarget.dataset.index);
        updateCartItemQuantity(index, -1);
      });
    });

    document.querySelectorAll(".increase-cart-item").forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = parseInt(event.currentTarget.dataset.index);
        updateCartItemQuantity(index, 1);
      });
    });

    document.querySelectorAll(".remove-cart-item").forEach((button) => {
      button.addEventListener("click", (event) => {
        if (
          confirm("Apakah Anda yakin ingin menghapus item ini dari keranjang?")
        ) {
          const index = parseInt(event.currentTarget.dataset.index);
          removeCartItem(index);
        }
      });
    });
  }

  function updateCartItemQuantity(index, change) {
    let { items, count } = loadCartFromLocalStorage();
    if (items[index]) {
      const newQuantity = items[index].quantity + change;
      if (newQuantity > 0) {
        // Di sini Anda mungkin ingin memeriksa stok produk jika Anda menyimpannya
        // Untuk contoh ini, kita asumsikan stok selalu ada untuk update di keranjang
        items[index].quantity = newQuantity;
        count += change;
        saveCartToLocalStorage(items, count);
        renderCartItems(); // Re-render keranjang
      } else if (newQuantity === 0) {
        // Jika kuantitas jadi 0, hapus item
        removeCartItem(index);
      }
    }
  }

  function removeCartItem(indexToRemove) {
    let { items, count } = loadCartFromLocalStorage();
    if (items[indexToRemove]) {
      const itemRemoved = items.splice(indexToRemove, 1)[0]; // Hapus item dan dapatkan item yang dihapus
      count -= itemRemoved.quantity; // Kurangi total count dengan kuantitas item yang dihapus
      saveCartToLocalStorage(items, count);
      renderCartItems(); // Re-render keranjang
    }
  }

  if (proceedToCheckoutBtn) {
    proceedToCheckoutBtn.addEventListener("click", () => {
      const { items } = loadCartFromLocalStorage();
      if (items.length > 0) {
        localStorage.setItem("itemToCheckout", JSON.stringify(items)); // Simpan semua item keranjang untuk checkout
        alert("Mengarahkan ke halaman pembayaran...");
        window.location.href = "pembayaran.html"; // Arahkan ke halaman checkout sebenarnya
      } else {
        alert(
          "Keranjang Anda kosong. Silakan tambahkan produk terlebih dahulu."
        );
      }
    });
  }

  // Initial render
  renderCartItems();

  // Update tahun di footer
  const currentYearEl = document.getElementById("current-year");
  if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();
});
