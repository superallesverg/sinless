document.addEventListener("DOMContentLoaded", () => {
  const cartCountHeader = document.querySelector("header .cart-count");
  const checkoutOrderItemsContainer = document.getElementById(
    "checkout-order-items"
  );
  const summarySubtotalEl = document.getElementById("summary-subtotal");
  const summaryShippingCostEl = document.getElementById(
    "summary-shipping-cost"
  );
  const summaryTotalPaymentEl = document.getElementById(
    "summary-total-payment"
  );
  const shippingOptionsContainer = document.getElementById(
    "shipping-options-container"
  );
  const paymentOptionsContainer = document.getElementById(
    "payment-options-container"
  );
  const payNowButton = document.getElementById("pay-now-button");
  const shippingAddressForm = document.getElementById("shipping-address-form");

  let currentSubtotal = 0;
  let currentShippingCost = 0;
  let currentCartItems = [];

  // Mock data untuk opsi pengiriman dan pembayaran
  const mockShippingOptions = [
    { id: "jne_reg", name: "JNE REG", price: 15000, eta: "2-3 hari" },
    { id: "sicepat_reg", name: "Sicepat REG", price: 12000, eta: "2-4 hari" },
    {
      id: "gojek_sameday",
      name: "GoSend SameDay",
      price: 25000,
      eta: "Hari ini",
    },
  ];

  const mockPaymentOptions = [
    {
      id: "bca_va",
      name: "BCA Virtual Account",
      logo: "https://via.placeholder.com/50x25/00A4E8/FFFFFF?Text=BCA",
    },
    {
      id: "gopay",
      name: "GoPay",
      logo: "https://via.placeholder.com/50x25/00AEEF/FFFFFF?Text=GoPay",
    },
    {
      id: "cod",
      name: "Bayar di Tempat (COD)",
      logo: "https://via.placeholder.com/50x25/FF8C00/FFFFFF?Text=COD",
    },
  ];

  function loadCartFromLocalStorage() {
    const items = JSON.parse(localStorage.getItem("cartItems")) || []; // Ambil dari 'cartItems'
    const count = parseInt(localStorage.getItem("cartItemCount")) || 0;
    return { items, count };
  }

  function updateHeaderCartCount(count) {
    if (cartCountHeader) {
      cartCountHeader.textContent = count;
    }
  }

  function renderOrderSummary(items) {
    if (!checkoutOrderItemsContainer) return;
    checkoutOrderItemsContainer.innerHTML = "";
    currentSubtotal = 0;

    if (items.length === 0) {
      checkoutOrderItemsContainer.innerHTML =
        "<p>Tidak ada item untuk dibayar.</p>";
      if (payNowButton) payNowButton.disabled = true;
      return;
    }
    if (payNowButton) payNowButton.disabled = false;

    items.forEach((item) => {
      const itemSubtotal = item.price * item.quantity;
      currentSubtotal += itemSubtotal;

      const itemElement = document.createElement("div");
      itemElement.classList.add("order-item-summary");
      itemElement.innerHTML = `
                <img src="${
                  item.image || "https://via.placeholder.com/60"
                }" alt="${item.name}" class="item-image">
                <div class="item-info">
                    <p class="item-name">${item.name}</p>
                    <p class="item-variant">Jml: ${item.quantity}${
        item.size && item.size !== "-" ? ", Uk: " + item.size : ""
      }${item.color && item.color !== "-" ? ", Wrn: " + item.color : ""}</p>
                </div>
                <div class="item-price-qty">
                    <p>Rp ${itemSubtotal.toLocaleString("id-ID")}</p>
                </div>
            `;
      checkoutOrderItemsContainer.appendChild(itemElement);
    });
    updatePaymentDetails();
  }

  function renderShippingOptions() {
    if (!shippingOptionsContainer) return;
    shippingOptionsContainer.innerHTML = "";
    mockShippingOptions.forEach((option, index) => {
      const optionElement = document.createElement("div");
      optionElement.classList.add("option-item");
      optionElement.innerHTML = `
                <label for="ship-${option.id}">
                    <input type="radio" name="shipping_method" id="ship-${
                      option.id
                    }" value="${option.id}" data-price="${option.price}" ${
        index === 0 ? "checked" : ""
      }>
                    ${option.name} (Estimasi: ${option.eta})
                </label>
                <span class="option-price">Rp ${option.price.toLocaleString(
                  "id-ID"
                )}</span>
            `;
      shippingOptionsContainer.appendChild(optionElement);
    });

    // Set default shipping cost from the first checked option
    const defaultShipping = mockShippingOptions.find((opt, idx) => idx === 0);
    if (defaultShipping) {
      currentShippingCost = defaultShipping.price;
    }

    shippingOptionsContainer
      .querySelectorAll('input[name="shipping_method"]')
      .forEach((radio) => {
        radio.addEventListener("change", (event) => {
          currentShippingCost = parseInt(event.target.dataset.price) || 0;
          updatePaymentDetails();
        });
      });
  }

  function renderPaymentOptions() {
    if (!paymentOptionsContainer) return;
    paymentOptionsContainer.innerHTML = "";
    mockPaymentOptions.forEach((option, index) => {
      const optionElement = document.createElement("div");
      optionElement.classList.add("option-item");
      optionElement.innerHTML = `
                <label for="pay-${option.id}">
                    <input type="radio" name="payment_method" id="pay-${
                      option.id
                    }" value="${option.id}" ${index === 0 ? "checked" : ""}>
                    ${option.name}
                </label>
                ${
                  option.logo
                    ? `<img src="${option.logo}" alt="${option.name}" class="payment-logo">`
                    : ""
                }
            `;
      paymentOptionsContainer.appendChild(optionElement);
    });
  }

  function updatePaymentDetails() {
    const totalPayment = currentSubtotal + currentShippingCost;
    if (summarySubtotalEl)
      summarySubtotalEl.textContent = `Rp ${currentSubtotal.toLocaleString(
        "id-ID"
      )}`;
    if (summaryShippingCostEl)
      summaryShippingCostEl.textContent = `Rp ${currentShippingCost.toLocaleString(
        "id-ID"
      )}`;
    if (summaryTotalPaymentEl)
      summaryTotalPaymentEl.textContent = `Rp ${totalPayment.toLocaleString(
        "id-ID"
      )}`;
  }

  function initializeCheckoutPage() {
    const { items, count } = loadCartFromLocalStorage();
    currentCartItems = items; // Simpan untuk digunakan nanti
    updateHeaderCartCount(count);
    renderOrderSummary(items);
    renderShippingOptions();
    renderPaymentOptions();
    updatePaymentDetails(); // Panggil sekali untuk inisialisasi total dengan pengiriman default
  }

  if (payNowButton && shippingAddressForm) {
    payNowButton.addEventListener("click", () => {
      // Validasi form alamat
      if (!shippingAddressForm.checkValidity()) {
        alert("Mohon lengkapi semua field alamat pengiriman yang wajib diisi.");
        shippingAddressForm.reportValidity(); // Tampilkan pesan error browser standar
        return;
      }

      if (currentCartItems.length === 0) {
        alert("Keranjang Anda kosong. Tidak ada yang bisa dibayar.");
        return;
      }

      const addressData = {
        fullName: document.getElementById("checkout-fullname").value,
        phone: document.getElementById("checkout-phone").value,
        address: document.getElementById("checkout-address").value,
        city: document.getElementById("checkout-city").value,
        postalCode: document.getElementById("checkout-postalcode").value,
        notes: document.getElementById("checkout-notes").value,
      };

      const selectedShipping = shippingOptionsContainer.querySelector(
        'input[name="shipping_method"]:checked'
      );
      const shippingMethod = selectedShipping
        ? {
            id: selectedShipping.value,
            name: mockShippingOptions.find(
              (opt) => opt.id === selectedShipping.value
            )?.name,
            price: parseInt(selectedShipping.dataset.price),
          }
        : null;

      const selectedPayment = paymentOptionsContainer.querySelector(
        'input[name="payment_method"]:checked'
      );
      const paymentMethod = selectedPayment
        ? {
            id: selectedPayment.value,
            name: mockPaymentOptions.find(
              (opt) => opt.id === selectedPayment.value
            )?.name,
          }
        : null;

      if (!shippingMethod) {
        alert("Mohon pilih metode pengiriman.");
        return;
      }
      if (!paymentMethod) {
        alert("Mohon pilih metode pembayaran.");
        return;
      }

      const orderData = {
        items: currentCartItems,
        shippingAddress: addressData,
        shippingMethod: shippingMethod,
        paymentMethod: paymentMethod,
        subtotal: currentSubtotal,
        shippingCost: currentShippingCost,
        totalPayment: currentSubtotal + currentShippingCost,
      };

      console.log("Order Data (Simulasi Pengiriman ke Backend):", orderData);
      alert(
        `Pesanan Anda sebesar Rp ${orderData.totalPayment.toLocaleString(
          "id-ID"
        )} dengan metode pembayaran ${
          orderData.paymentMethod.name
        } sedang diproses (Simulasi).\nTerima kasih telah berbelanja!`
      );

      // (OPSIONAL) Kosongkan keranjang setelah "pembayaran" berhasil
      localStorage.removeItem("cartItems");
      localStorage.setItem("cartItemCount", "0");
      updateHeaderCartCount(0);
      currentCartItems = []; // Kosongkan juga di halaman ini
      renderOrderSummary([]); // Re-render ringkasan jadi kosong
      if (proceedToCheckoutBtn) proceedToCheckoutBtn.disabled = true; // Tombol di keranjang (jika ada)
      if (payNowButton) payNowButton.disabled = true;

      // Arahkan ke halaman sukses atau riwayat pesanan
      // window.location.href = 'order-success.html';
    });
  }

  // Inisialisasi halaman
  initializeCheckoutPage();

  // Update tahun di footer
  const currentYearEl = document.getElementById("current-year");
  if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();
});
