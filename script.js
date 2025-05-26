document.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.getElementById("product-grid");
  const productListingSection = document.getElementById(
    "product-listing-section"
  );
  const productDetailSection = document.getElementById(
    "product-detail-section"
  );
  const backToProductsBtn = document.getElementById("back-to-products-btn");
  const cartCountElement = document.querySelector(".cart-count");

  // Tombol dan input di detail produk (ambil referensinya sekali)
  const mainProductImage = document.getElementById("main-product-image");
  const productDetailNameEl = document.getElementById("product-detail-name");
  const productDetailBrandEl = document.getElementById("product-detail-brand");
  const productDetailPriceEl = document.getElementById("product-detail-price");
  const stockElement = document.getElementById("product-detail-stock");
  const productDetailDescriptionEl = document.getElementById(
    "product-detail-description"
  );
  const thumbnailContainer = document.getElementById("thumbnail-images");
  const sizeOptionGroup = document.getElementById("size-option-group");
  const sizeSelect = document.getElementById("product-size");
  const colorOptionGroup = document.getElementById("color-option-group");
  const colorSwatchesContainer = document.getElementById("product-colors");
  const quantityInput = document.getElementById("quantity");
  const decreaseQtyBtn = document.getElementById("decrease-qty");
  const increaseQtyBtn = document.getElementById("increase-qty");
  const addToCartBtn = document.getElementById("add-to-cart-btn");
  const buyNowBtn = document.getElementById("buy-now-btn");

  // Fungsi untuk memuat data keranjang dari localStorage
  function loadCartFromLocalStorage() {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const storedCartCount =
      parseInt(localStorage.getItem("cartItemCount")) || 0;
    updateCartIcon(storedCartCount);
    return { items: storedCartItems, count: storedCartCount };

    document.addEventListener("DOMContentLoaded", () => {
      // ... (kode konstanta yang sudah ada seperti productGrid, cartCountElement, dll.) ...
      // ... (fungsi loadCartFromLocalStorage, saveCartToLocalStorage, updateCartIcon sudah ada) ...
      // ... (let { items: cartItems, count: cartItemCount } = loadCartFromLocalStorage(); sudah ada) ...

      const cartIconLink = document.getElementById("cart-icon-link"); // Ambil elemen ikon keranjang
      if (cartIconLink) {
        // Gunakan variabel baru ini
        cartIconLink.addEventListener("click", (event) => {
          event.preventDefault();
          window.location.href = "keranjang.html"; // Arahkan ke halaman keranjang
        });
      }

      // ... (mockProducts dan semua fungsi lainnya seperti displayProducts, showProductDetail, dll. tetap sama) ...

      // === TAMBAHKAN EVENT LISTENER INI UNTUK IKON KERANJANG ===
      if (cartIcon) {
        cartIcon.addEventListener("click", (event) => {
          event.preventDefault(); // Mencegah link default (#) dieksekusi

          console.log("Ikon keranjang diklik!");

          const currentCartItems =
            JSON.parse(localStorage.getItem("cartItems")) || [];

          if (currentCartItems.length > 0) {
            console.log("Isi Keranjang Saat Ini:");
            let cartSummaryForAlert = "Isi Keranjang Anda:\n";
            currentCartItems.forEach((item) => {
              const itemLog = `${item.name} - Jumlah: ${
                item.quantity
              }, Ukuran: ${item.size || "-"}, Warna: ${
                item.color || "-"
              }, Subtotal: Rp ${(item.price * item.quantity).toLocaleString(
                "id-ID"
              )}`;
              console.log(itemLog);
              cartSummaryForAlert += `\n- ${item.name} (${
                item.quantity
              }x) = Rp ${(item.price * item.quantity).toLocaleString("id-ID")}`;
            });
            // Tampilkan ringkasan sederhana melalui alert untuk saat ini
            alert(cartSummaryForAlert);
          } else {
            console.log("Keranjang masih kosong.");
            alert("Keranjang Anda masih kosong.");
          }
        });
      }
    });
    const cartIcon = document.getElementById("cart-icon"); // Pastikan ini sudah ada

    if (cartIcon) {
      cartIcon.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = "keranjang.html"; // ARAHKAN KE HALAMAN KERANJANG
      });
    }
  }

  // Fungsi untuk menyimpan data keranjang ke localStorage
  function saveCartToLocalStorage(items, count) {
    localStorage.setItem("cartItems", JSON.stringify(items));
    localStorage.setItem("cartItemCount", count.toString());
  }

  // Fungsi untuk update ikon keranjang
  function updateCartIcon(count) {
    if (cartCountElement) {
      cartCountElement.textContent = count;
    }
  }

  let { items: cartItems, count: cartItemCount } = loadCartFromLocalStorage();

  const mockProducts = [
    {
      id: "P001",
      name: "Kemeja Flanel Pria Kotak-kotak",
      brand: "H&M",
      price: 299000,
      stock: 15,
      images: [
        "https://via.placeholder.com/400/FF0000/FFFFFF?Text=Produk1_1",
        "https://via.placeholder.com/400/FF0000/FFFFFF?Text=Produk1_2",
        "https://via.placeholder.com/400/FF0000/FFFFFF?Text=Produk1_3",
      ],
      sizes: ["S", "M", "L", "XL"],
      colors: [
        { name: "Merah", hex: "#FF0000" },
        { name: "Biru", hex: "#0000FF" },
        { name: "Hitam", hex: "#000000" },
      ],
      description:
        "Kemeja flanel pria lengan panjang dengan motif kotak-kotak klasik. Terbuat dari bahan katun flanel berkualitas tinggi yang lembut dan nyaman dipakai sehari-hari. Cocok untuk gaya kasual maupun semi-formal.",
    },
    {
      id: "P002",
      name: "Sepatu Sneakers Wanita Putih",
      brand: "Nike",
      price: 749000,
      stock: 8,
      images: [
        "https://via.placeholder.com/400/00FF00/000000?Text=Produk2_1",
        "https://via.placeholder.com/400/00FF00/000000?Text=Produk2_2",
      ],
      sizes: ["36", "37", "38", "39", "40"],
      colors: [],
      description:
        "Sepatu sneakers wanita berwarna putih bersih dengan desain minimalis dan modern. Outsole karet yang empuk memberikan kenyamanan maksimal untuk aktivitas Anda. Ideal untuk berbagai gaya.",
    },
    {
      id: "P003",
      name: "Tas Ransel Laptop Anti Air",
      brand: "Eiger",
      price: 450000,
      stock: 22,
      images: ["https://via.placeholder.com/400/0000FF/FFFFFF?Text=Produk3_1"],
      sizes: ["One Size"],
      colors: [
        { name: "Abu-abu", hex: "#808080" },
        { name: "Hijau Army", hex: "#4b5320" },
      ],
      description:
        "Tas ransel laptop dengan kompartemen khusus hingga 15.6 inch. Terbuat dari bahan tahan air (water-resistant) yang melindungi barang bawaan Anda dari hujan ringan. Banyak kantong untuk organisasi.",
    },
    {
      id: "P004",
      name: "Celana Jeans Pria Slim Fit",
      brand: "Levi's",
      price: 899000,
      stock: 0,
      images: ["https://via.placeholder.com/400/FFFF00/000000?Text=Produk4_1"],
      sizes: ["28", "30", "32", "34", "36"],
      colors: [{ name: "Biru Tua", hex: "#00008B" }],
      description:
        "Celana jeans pria model slim fit yang nyaman dan stylish. Terbuat dari denim berkualitas dengan sedikit campuran stretch untuk kenyamanan bergerak. Warna biru tua klasik yang mudah dipadukan.",
    },
  ];

  function displayProducts(productsToDisplay) {
    if (!productGrid) return;
    productGrid.innerHTML = "";
    productsToDisplay.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
      productCard.dataset.productId = product.id;

      productCard.innerHTML = `
                <img src="${product.images[0]}" alt="${
        product.name
      }" class="product-card-image">
                <div class="product-card-content">
                    <h3 class="product-card-name">${product.name}</h3>
                    <p class="product-card-price">Rp ${product.price.toLocaleString(
                      "id-ID"
                    )}</p>
                    <button class="btn btn-secondary view-details-btn" data-product-id="${
                      product.id
                    }">Lihat Detail</button>
                </div>
            `;
      productGrid.appendChild(productCard);
    });

    document.querySelectorAll(".view-details-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const productId = event.currentTarget.dataset.productId;
        showProductDetail(productId);
      });
    });
  }

  function showProductDetail(productId) {
    const product = mockProducts.find((p) => p.id === productId);
    if (!product) return;

    // Simpan ID produk saat ini di data attribute section detail untuk diakses listener global
    if (productDetailSection) {
      productDetailSection.dataset.currentProductId = product.id;
    }

    if (mainProductImage) mainProductImage.src = product.images[0];
    if (productDetailNameEl) productDetailNameEl.textContent = product.name;
    if (productDetailBrandEl) productDetailBrandEl.textContent = product.brand;
    if (productDetailPriceEl)
      productDetailPriceEl.textContent = `Rp ${product.price.toLocaleString(
        "id-ID"
      )}`;

    if (stockElement) {
      stockElement.textContent = `Stok: ${
        product.stock > 0 ? product.stock + " buah" : "Habis"
      }`;
      stockElement.classList.remove("in-stock", "low-stock", "out-of-stock");
      if (product.stock === 0) {
        stockElement.classList.add("out-of-stock");
      } else if (product.stock <= 10) {
        stockElement.classList.add("low-stock");
      } else {
        stockElement.classList.add("in-stock");
      }
    }

    if (productDetailDescriptionEl)
      productDetailDescriptionEl.textContent = product.description;

    if (thumbnailContainer) {
      thumbnailContainer.innerHTML = "";
      product.images.forEach((imgSrc, index) => {
        const thumb = document.createElement("img");
        thumb.src = imgSrc;
        thumb.alt = `Thumbnail ${index + 1}`;
        if (index === 0) thumb.classList.add("active");
        thumb.addEventListener("click", () => {
          if (mainProductImage) mainProductImage.src = imgSrc;
          thumbnailContainer
            .querySelectorAll("img")
            .forEach((t) => t.classList.remove("active"));
          thumb.classList.add("active");
        });
        thumbnailContainer.appendChild(thumb);
      });
    }

    if (sizeSelect && sizeOptionGroup) {
      sizeSelect.innerHTML = "";
      if (product.sizes && product.sizes.length > 0) {
        sizeOptionGroup.style.display = "block";
        product.sizes.forEach((size) => {
          const option = document.createElement("option");
          option.value = size;
          option.textContent = size;
          sizeSelect.appendChild(option);
        });
      } else {
        sizeOptionGroup.style.display = "none";
      }
    }

    if (colorSwatchesContainer && colorOptionGroup) {
      colorSwatchesContainer.innerHTML = "";
      if (product.colors && product.colors.length > 0) {
        colorOptionGroup.style.display = "block";
        product.colors.forEach((color) => {
          const swatch = document.createElement("span");
          swatch.classList.add("color-swatch");
          swatch.style.backgroundColor = color.hex;
          swatch.title = color.name;
          swatch.dataset.colorName = color.name;
          swatch.addEventListener("click", () => {
            colorSwatchesContainer
              .querySelectorAll(".color-swatch")
              .forEach((s) => s.classList.remove("selected"));
            swatch.classList.add("selected");
            console.log("Warna dipilih:", color.name);
          });
          colorSwatchesContainer.appendChild(swatch);
        });
        // Pilih warna pertama secara default jika ada
        if (colorSwatchesContainer.firstChild) {
          colorSwatchesContainer.firstChild.classList.add("selected");
        }
      } else {
        colorOptionGroup.style.display = "none";
      }
    }

    if (quantityInput) {
      quantityInput.value = 1;
      quantityInput.max = product.stock > 0 ? product.stock : 1;
    }

    // Atur status tombol berdasarkan stok
    if (addToCartBtn && buyNowBtn) {
      if (product.stock === 0) {
        addToCartBtn.disabled = true;
        addToCartBtn.textContent = "Stok Habis"; // Mengubah teks, bukan innerHTML jika tidak ada ikon
        buyNowBtn.disabled = true;
      } else {
        addToCartBtn.disabled = false;
        addToCartBtn.innerHTML =
          '<i class="fas fa-cart-plus"></i> Tambah ke Keranjang';
        buyNowBtn.disabled = false;
      }
    }

    if (productListingSection) productListingSection.style.display = "none";
    if (productDetailSection) productDetailSection.style.display = "block";
    window.scrollTo(0, 0);
  }

  if (backToProductsBtn) {
    backToProductsBtn.addEventListener("click", () => {
      if (productDetailSection) productDetailSection.style.display = "none";
      if (productListingSection) productListingSection.style.display = "block";
    });
  }

  if (decreaseQtyBtn && quantityInput) {
    decreaseQtyBtn.addEventListener("click", () => {
      let currentValue = parseInt(quantityInput.value);
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
      }
    });
  }

  if (increaseQtyBtn && quantityInput) {
    increaseQtyBtn.addEventListener("click", () => {
      let currentValue = parseInt(quantityInput.value);
      const maxStock = parseInt(quantityInput.max); // Ambil max dari input, yang sudah diupdate di showProductDetail
      if (currentValue < maxStock) {
        quantityInput.value = currentValue + 1;
      } else {
        alert(`Stok produk hanya tersisa ${maxStock} buah.`);
      }
    });
  }

  if (quantityInput) {
    quantityInput.addEventListener("change", () => {
      let currentValue = parseInt(quantityInput.value);
      const maxStock = parseInt(quantityInput.max);
      if (isNaN(currentValue) || currentValue < 1) {
        quantityInput.value = 1;
      } else if (currentValue > maxStock) {
        quantityInput.value = maxStock;
        alert(`Stok produk hanya tersisa ${maxStock} buah.`);
      }
    });
  }

  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", () => {
      const currentProductId = productDetailSection.dataset.currentProductId;
      if (!currentProductId) {
        alert("Tidak ada produk yang dipilih untuk ditambahkan ke keranjang.");
        return;
      }
      const currentProduct = mockProducts.find(
        (p) => p.id === currentProductId
      );

      if (!currentProduct) {
        alert("Produk tidak ditemukan!");
        return;
      }
      if (currentProduct.stock === 0) {
        alert("Maaf, stok produk ini habis.");
        return;
      }

      const quantity = parseInt(quantityInput.value);
      // Pastikan quantity tidak melebihi stok saat tombol diklik
      if (quantity > currentProduct.stock) {
        alert(
          `Jumlah melebihi stok. Stok produk hanya tersisa ${currentProduct.stock} buah.`
        );
        quantityInput.value = currentProduct.stock; // Set ke stok maks
        return;
      }

      const selectedSize = sizeSelect ? sizeSelect.value : "-";
      const selectedColorEl = colorSwatchesContainer
        ? colorSwatchesContainer.querySelector(".color-swatch.selected")
        : null;
      const selectedColor = selectedColorEl
        ? selectedColorEl.dataset.colorName
        : "-";

      const existingItemIndex = cartItems.findIndex(
        (item) =>
          item.id === currentProduct.id &&
          item.size === selectedSize &&
          item.color === selectedColor
      );

      if (existingItemIndex > -1) {
        cartItems[existingItemIndex].quantity += quantity;
      } else {
        cartItems.push({
          id: currentProduct.id,
          name: currentProduct.name,
          price: currentProduct.price,
          image: currentProduct.images[0],
          quantity: quantity,
          size: selectedSize,
          color: selectedColor,
        });
      }

      cartItemCount += quantity;

      updateCartIcon(cartItemCount);
      saveCartToLocalStorage(cartItems, cartItemCount);

      console.log("Keranjang diperbarui:", cartItems);
      alert(
        `${quantity}x ${currentProduct.name} (Uk: ${selectedSize}, Wrn: ${selectedColor}) telah ditambahkan/diperbarui di keranjang!`
      );
    });
  }

  if (buyNowBtn) {
    buyNowBtn.addEventListener("click", () => {
      const currentProductId = productDetailSection.dataset.currentProductId;
      if (!currentProductId) {
        alert("Tidak ada produk yang dipilih untuk dibeli.");
        return;
      }
      const currentProduct = mockProducts.find(
        (p) => p.id === currentProductId
      );

      if (!currentProduct) {
        alert("Produk tidak ditemukan!");
        return;
      }
      if (currentProduct.stock === 0) {
        alert("Maaf, stok produk ini habis.");
        return;
      }

      const quantity = parseInt(quantityInput.value);
      if (quantity > currentProduct.stock) {
        alert(
          `Jumlah melebihi stok. Stok produk hanya tersisa ${currentProduct.stock} buah.`
        );
        quantityInput.value = currentProduct.stock;
        return;
      }

      const selectedSize = sizeSelect ? sizeSelect.value : "-";
      const selectedColorEl = colorSwatchesContainer
        ? colorSwatchesContainer.querySelector(".color-swatch.selected")
        : null;
      const selectedColor = selectedColorEl
        ? selectedColorEl.dataset.colorName
        : "-";

      const itemToCheckout = {
        id: currentProduct.id,
        name: currentProduct.name,
        price: currentProduct.price,
        image: currentProduct.images[0],
        quantity: quantity,
        size: selectedSize,
        color: selectedColor,
      };

      localStorage.setItem("itemToCheckout", JSON.stringify([itemToCheckout]));
      console.log(`Beli Sekarang:`, itemToCheckout);
      alert(
        `Anda akan diarahkan ke halaman checkout untuk ${quantity}x ${currentProduct.name}. (Simulasi)`
      );
      // window.location.href = 'checkout.html'; // Arahkan ke halaman checkout jika ada
    });
  }

  displayProducts(mockProducts);
  const currentYearEl = document.getElementById("current-year");
  if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();
});
