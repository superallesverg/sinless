document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".sidebar-nav .nav-link");
  const sections = document.querySelectorAll(".dashboard-section");
  const mainContent = document.querySelector(".main-content"); // To scroll to top
  const dashboardCartCountElement = document.getElementById(
    "dashboard-cart-count"
  );
  const dashboardHeaderCartIcon = document.querySelector(
    ".dashboard-main-header .header-cart-info"
  ); // Atau ID spesifik jika ada

  if (dashboardHeaderCartIcon) {
    dashboardHeaderCartIcon.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = "keranjang.html";
    });
  }
  function loadCartCountForDashboard() {
    const storedCartCount =
      parseInt(localStorage.getItem("cartItemCount")) || 0;
    if (dashboardCartCountElement) {
      dashboardCartCountElement.textContent = storedCartCount;
    }
    // Jika Anda punya section untuk menampilkan daftar item keranjang di dashboard:
    // const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    // displayCartItemsOnDashboard(storedCartItems); // Buat fungsi ini
  }

  // Panggil fungsi ini saat dashboard dimuat
  loadCartCountForDashboard();

  // ... (sisa kode dashboard.script.js Anda)
});

// --- Section Navigation ---
navLinks.forEach((link) => {
  if (link.id === "logout-button") return; // Skip logout button for section switching

  link.addEventListener("click", (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute("data-section");

    // Update active link
    navLinks.forEach((nav) => nav.classList.remove("active"));
    link.classList.add("active");

    // Show target section and hide others
    sections.forEach((section) => {
      if (section.id === `${sectionId}-section`) {
        section.style.display = "block";
      } else {
        section.style.display = "none";
      }
    });

    // Load data for the section
    loadSectionData(sectionId);
    mainContent.scrollTop = 0; // Scroll to top of content area
  });
});

// --- Initial Load ---
// Load data for the default active section (Profile)
loadSectionData("profile");

// --- Data Loading and Rendering Functions ---
function loadSectionData(sectionId) {
  switch (sectionId) {
    case "profile":
      loadProfileData();
      break;
    case "orders":
      loadOrdersData("semua"); // Default to all orders
      break;
    case "addresses":
      loadAddressesData();
      break;
    // Add cases for other sections like 'wishlist', 'reviews', etc.
  }
}

// --- Profile Section ---
const profileDetailsDiv = document.getElementById("profile-details");
const profileEditForm = document.getElementById("profile-edit-form");
const editProfileBtn = document.getElementById("edit-profile-btn");
const cancelEditProfileBtn = document.getElementById("cancel-edit-profile-btn");

async function loadProfileData() {
  profileDetailsDiv.innerHTML = "<p>Memuat data profil...</p>";
  // TODO: Replace with your actual API call
  // Example: const response = await fetch('/api/user/profile');
  //          const data = await response.json();
  try {
    // MOCK API CALL
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
    const mockProfileData = {
      fullName: "John Doe",
      email: "john.doe@example.com",
      phone: "081234567890",
      memberSince: "10 Januari 2020",
    };
    // END MOCK API CALL

    renderProfileData(mockProfileData);
  } catch (error) {
    console.error("Error loading profile:", error);
    profileDetailsDiv.innerHTML =
      '<p class="error-message">Gagal memuat data profil. Silakan coba lagi.</p>';
  }
}

function renderProfileData(data) {
  profileDetailsDiv.innerHTML = `
            <p><strong>Nama Lengkap:</strong> ${data.fullName}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>No. Telepon:</strong> ${data.phone || "-"}</p>
            <p><strong>Bergabung Sejak:</strong> ${data.memberSince || "-"}</p>
        `;
  // Populate form for editing
  document.getElementById("fullName").value = data.fullName;
  document.getElementById("email").value = data.email;
  document.getElementById("phone").value = data.phone || "";
}

editProfileBtn.addEventListener("click", () => {
  profileDetailsDiv.style.display = "none";
  profileEditForm.style.display = "block";
});

cancelEditProfileBtn.addEventListener("click", () => {
  profileDetailsDiv.style.display = "block";
  profileEditForm.style.display = "none";
  loadProfileData(); // Optionally reload data or just reset form
});

profileEditForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const updatedData = {
    fullName: document.getElementById("fullName").value,
    phone: document.getElementById("phone").value,
  };
  // TODO: Replace with your actual API call to update profile
  // Example: const response = await fetch('/api/user/profile', {
  //              method: 'PUT',
  //              headers: { 'Content-Type': 'application/json' },
  //              body: JSON.stringify(updatedData)
  //          });
  console.log("Updating profile with:", updatedData);
  alert("Profil berhasil diperbarui (simulasi)!"); // Replace with actual success handling
  profileDetailsDiv.style.display = "block";
  profileEditForm.style.display = "none";
  loadProfileData(); // Reload data
});

// --- Orders Section ---
const ordersListDiv = document.getElementById("orders-list");
const orderFilterTabs = document.querySelectorAll("#orders-section .tab-link");

orderFilterTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    orderFilterTabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    const status = tab.getAttribute("data-status");
    loadOrdersData(status);
  });
});

async function loadOrdersData(statusFilter = "semua") {
  ordersListDiv.innerHTML = "<p>Memuat daftar pesanan...</p>";
  // TODO: Replace with your actual API call, including statusFilter
  // Example: const response = await fetch(`/api/user/orders?status=${statusFilter}`);
  //          const data = await response.json();
  try {
    // MOCK API CALL
    await new Promise((resolve) => setTimeout(resolve, 700));
    const allMockOrders = [
      {
        id: "INV/2024/001",
        date: "22 Mei 2024",
        total: 150000,
        status: "selesai",
        items: [
          {
            name: "Baju Koko Modern",
            qty: 1,
            price: 150000,
            image: "https://via.placeholder.com/60",
          },
        ],
      },
      {
        id: "INV/2024/002",
        date: "23 Mei 2024",
        total: 250000,
        status: "dikirim",
        items: [
          {
            name: "Sepatu Lari Keren",
            qty: 1,
            price: 250000,
            image: "https://via.placeholder.com/60",
          },
        ],
      },
      {
        id: "INV/2024/003",
        date: "24 Mei 2024",
        total: 75000,
        status: "diproses",
        items: [
          {
            name: "Kaos Polos Nyaman",
            qty: 1,
            price: 75000,
            image: "https://via.placeholder.com/60",
          },
        ],
      },
      {
        id: "INV/2024/004",
        date: "25 Mei 2024",
        total: 300000,
        status: "menunggu_pembayaran",
        items: [
          {
            name: "Jam Tangan Elegan",
            qty: 1,
            price: 300000,
            image: "https://via.placeholder.com/60",
          },
        ],
      },
      {
        id: "INV/2024/005",
        date: "20 Mei 2024",
        total: 50000,
        status: "dibatalkan",
        items: [
          {
            name: "Buku Coding",
            qty: 1,
            price: 50000,
            image: "https://via.placeholder.com/60",
          },
        ],
      },
    ];
    const filteredOrders =
      statusFilter === "semua"
        ? allMockOrders
        : allMockOrders.filter((order) => order.status === statusFilter);
    // END MOCK API CALL

    renderOrdersData(filteredOrders);
  } catch (error) {
    console.error("Error loading orders:", error);
    ordersListDiv.innerHTML =
      '<p class="error-message">Gagal memuat daftar pesanan. Silakan coba lagi.</p>';
  }
}

function renderOrdersData(orders) {
  if (orders.length === 0) {
    ordersListDiv.innerHTML = "<p>Tidak ada pesanan ditemukan.</p>";
    return;
  }
  ordersListDiv.innerHTML = orders
    .map(
      (order) => `
            <div class="order-card">
                <div class="order-card-header">
                    <div>
                        <span class="order-id">${order.id}</span>
                        <p class="text-muted" style="font-size:0.9em; margin: 2px 0;">Tanggal: ${
                          order.date
                        }</p>
                    </div>
                    <span class="order-status status-${order.status.toLowerCase()}">${order.status
        .replace("_", " ")
        .toUpperCase()}</span>
                </div>
                <div class="order-items-summary">
                    ${order.items
                      .map(
                        (item) => `
                        <div class="order-item">
                            <img src="${item.image}" alt="${item.name}">
                            <div class="order-item-details">
                                <p><strong>${item.name}</strong></p>
                                <p class="text-muted">${
                                  item.qty
                                } x Rp ${item.price.toLocaleString("id-ID")}</p>
                            </div>
                        </div>
                    `
                      )
                      .join("")}
                </div>
                <div class="order-card-footer">
                    <p style="margin-bottom:10px;"><strong>Total: Rp ${order.total.toLocaleString(
                      "id-ID"
                    )}</strong></p>
                    <button class="btn btn-primary btn-sm" onclick="viewOrderDetail('${
                      order.id
                    }')"><i class="fas fa-eye"></i> Lihat Detail</button>
                </div>
            </div>
        `
    )
    .join("");
}

window.viewOrderDetail = function (orderId) {
  // Make it global for inline onclick
  // TODO: Implement order detail view (e.g., modal or new page/section)
  alert(
    `Lihat detail untuk pesanan: ${orderId} (implementasi detail belum ada)`
  );
  console.log("View detail for order:", orderId);
};

// --- Addresses Section ---
const addressesListDiv = document.getElementById("addresses-list");
const addAddressBtn = document.getElementById("add-address-btn");
const addressFormContainer = document.getElementById("address-form-container");
const addressForm = document.getElementById("address-form");
const cancelAddressFormBtn = document.getElementById("cancel-address-form-btn");
const addressFormTitle = document.getElementById("address-form-title");

async function loadAddressesData() {
  addressesListDiv.innerHTML = "<p>Memuat daftar alamat...</p>";
  // TODO: Replace with your actual API call
  // Example: const response = await fetch('/api/user/addresses');
  //          const data = await response.json();
  try {
    // MOCK API CALL
    await new Promise((resolve) => setTimeout(resolve, 600));
    const mockAddresses = [
      {
        id: "addr1",
        label: "Rumah",
        recipientName: "John Doe",
        phone: "081234567890",
        fullAddress: "Jl. Merdeka No. 10, Jakarta Pusat",
        city: "Jakarta Pusat",
        postalCode: "10110",
        isPrimary: true,
      },
      {
        id: "addr2",
        label: "Kantor",
        recipientName: "John Doe (Work)",
        phone: "089876543210",
        fullAddress: "Jl. Sudirman Kav. 1, Gedung Perkantoran Lt. 5",
        city: "Jakarta Selatan",
        postalCode: "12190",
        isPrimary: false,
      },
    ];
    // END MOCK API CALL
    renderAddressesData(mockAddresses);
  } catch (error) {
    console.error("Error loading addresses:", error);
    addressesListDiv.innerHTML =
      '<p class="error-message">Gagal memuat daftar alamat. Silakan coba lagi.</p>';
  }
}

function renderAddressesData(addresses) {
  if (addresses.length === 0) {
    addressesListDiv.innerHTML =
      "<p>Belum ada alamat tersimpan. Silakan tambahkan alamat baru.</p>";
    return;
  }
  addressesListDiv.innerHTML = addresses
    .map(
      (addr) => `
            <div class="address-card ${
              addr.isPrimary ? "primary-address" : ""
            }">
                ${
                  addr.isPrimary
                    ? '<span class="primary-badge">Utama</span>'
                    : ""
                }
                <h4>${addr.label}</h4>
                <p><strong>${addr.recipientName}</strong> (${addr.phone})</p>
                <p>${addr.fullAddress}, ${addr.city}, ${addr.postalCode}</p>
                <div class="address-actions">
                    <button class="btn btn-primary btn-sm" onclick="editAddress('${
                      addr.id
                    }')"><i class="fas fa-edit"></i> Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteAddress('${
                      addr.id
                    }')"><i class="fas fa-trash"></i> Hapus</button>
                    ${
                      !addr.isPrimary
                        ? `<button class="btn btn-secondary btn-sm" onclick="setPrimaryAddress('${addr.id}')"><i class="fas fa-check-circle"></i> Jadikan Utama</button>`
                        : ""
                    }
                </div>
            </div>
        `
    )
    .join("");
}

addAddressBtn.addEventListener("click", () => {
  addressForm.reset();
  document.getElementById("addressId").value = ""; // Clear ID for new address
  addressFormTitle.textContent = "Tambah Alamat Baru";
  addressFormContainer.style.display = "block";
});

cancelAddressFormBtn.addEventListener("click", () => {
  addressFormContainer.style.display = "none";
});

addressForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const addressId = document.getElementById("addressId").value;
  const formData = {
    label: document.getElementById("addressLabel").value,
    recipientName: document.getElementById("recipientName").value,
    recipientPhone: document.getElementById("recipientPhone").value,
    fullAddress: document.getElementById("fullAddress").value,
    city: document.getElementById("city").value,
    postalCode: document.getElementById("postalCode").value,
    isPrimary: document.getElementById("isPrimary").checked,
  };

  if (addressId) {
    // Editing existing address
    // TODO: Replace with your actual API call to UPDATE address
    // Example: await fetch(`/api/user/addresses/${addressId}`, { method: 'PUT', ... });
    console.log("Updating address:", addressId, formData);
    alert("Alamat berhasil diperbarui (simulasi)!");
  } else {
    // Adding new address
    // TODO: Replace with your actual API call to ADD address
    // Example: await fetch('/api/user/addresses', { method: 'POST', ... });
    console.log("Adding new address:", formData);
    alert("Alamat baru berhasil ditambahkan (simulasi)!");
  }
  addressFormContainer.style.display = "none";
  loadAddressesData(); // Reload addresses
});

window.editAddress = async function (addressId) {
  // TODO: Fetch address details by ID if not already loaded or pass full object
  // For this mock, we'll find it in the mock data (in real app, fetch from API)
  console.log("Editing address:", addressId);
  // MOCK: Simulating fetching address details
  const mockAddresses = [
    // Assuming this is accessible or refetch
    {
      id: "addr1",
      label: "Rumah",
      recipientName: "John Doe",
      phone: "081234567890",
      fullAddress: "Jl. Merdeka No. 10, Jakarta Pusat",
      city: "Jakarta Pusat",
      postalCode: "10110",
      isPrimary: true,
    },
    {
      id: "addr2",
      label: "Kantor",
      recipientName: "John Doe (Work)",
      phone: "089876543210",
      fullAddress: "Jl. Sudirman Kav. 1, Gedung Perkantoran Lt. 5",
      city: "Jakarta Selatan",
      postalCode: "12190",
      isPrimary: false,
    },
  ];
  const addr = mockAddresses.find((a) => a.id === addressId);
  if (addr) {
    document.getElementById("addressId").value = addr.id;
    document.getElementById("addressLabel").value = addr.label;
    document.getElementById("recipientName").value = addr.recipientName;
    document.getElementById("recipientPhone").value = addr.phone;
    document.getElementById("fullAddress").value = addr.fullAddress;
    document.getElementById("city").value = addr.city;
    document.getElementById("postalCode").value = addr.postalCode;
    document.getElementById("isPrimary").checked = addr.isPrimary;
    addressFormTitle.textContent = "Edit Alamat";
    addressFormContainer.style.display = "block";
  }
};

window.deleteAddress = async function (addressId) {
  if (confirm("Apakah Anda yakin ingin menghapus alamat ini?")) {
    // TODO: Replace with your actual API call to DELETE address
    // Example: await fetch(`/api/user/addresses/${addressId}`, { method: 'DELETE' });
    console.log("Deleting address:", addressId);
    alert("Alamat berhasil dihapus (simulasi)!");
    loadAddressesData(); // Reload addresses
  }
};

window.setPrimaryAddress = async function (addressId) {
  // TODO: Replace with your actual API call to SET PRIMARY address
  // Example: await fetch(`/api/user/addresses/${addressId}/set-primary`, { method: 'POST' });
  console.log("Setting primary address:", addressId);
  alert("Alamat utama berhasil diubah (simulasi)!");
  loadAddressesData(); // Reload addresses
};

// --- Logout ---
const logoutButton = document.getElementById("logout-button");
logoutButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (confirm("Apakah Anda yakin ingin keluar?")) {
    // TODO: Implement your actual logout logic
    // Example: await fetch('/api/logout', { method: 'POST' });
    //          window.location.href = '/login.html'; // Redirect to login page
    alert("Anda telah keluar (simulasi)!");
    console.log("Logout");
    // For simulation, you might redirect or clear some local storage if used
  }
});
