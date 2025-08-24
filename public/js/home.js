const products = {
    pulsa: [
        { amount: 100000, price: 99000, discount: '1%' },
        { amount: 80000, price: 79000, discount: '1.25%' },
        { amount: 50000, price: 49500, discount: '1%' }
    ],
    paketData: [
        { name: '1GB 30 Hari', price: 15000, provider: 'Telkomsel' },
        { name: '3GB 30 Hari', price: 35000, provider: 'XL' },
        { name: '5GB 30 Hari', price: 50000, provider: 'Indosat' }
    ],
    ewallet: [
        { amount: 100000, price: 99500, fee: 500 },
        { amount: 50000, price: 49750, fee: 250 },
        { amount: 20000, price: 19900, fee: 100 }
    ],
    tokenListrik: [
        { amount: 200000, price: 201000, admin: 1000 },
        { amount: 100000, price: 101000, admin: 1000 },
        { amount: 50000, price: 51000, admin: 1000 },
        { amount: 20000, price: 21000, admin: 1000 }
    ],
    esim: [
        { provider: 'Telkomsel E-SIM 3GB', price: 36531 },
        { provider: 'Indosat E-SIM 3GB 30hr', price: 35145 }
    ]
};

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function (event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target == modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// E-wallet selection
document.querySelectorAll('.ewallet-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.ewallet-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

// Denomination selection
document.addEventListener('click', function (e) {
    if (e.target.closest('.denomination-item')) {
        const container = e.target.closest('.denomination-grid, .data-packages');
        if (container) {
            container.querySelectorAll('.denomination-item, .package-item').forEach(item => {
                item.classList.remove('selected');
            });
            e.target.closest('.denomination-item, .package-item').classList.add('selected');
        }
    }
});

// TAMBAHAN BARU: Fungsi untuk update harga E-SIM
function updateEsimPrice() {
    const select = document.querySelector('#esimModal select');
    const priceElement = document.querySelector('.esim-price .price');
    
    if (select && priceElement) {
        const selectedValue = select.value;
        const selectedEsim = products.esim.find(item => item.provider === selectedValue);
        
        if (selectedEsim) {
            priceElement.textContent = `Rp ${selectedEsim.price.toLocaleString('id-ID')}`;
        }
    }
}

// TAMBAHAN BARU: Event listener untuk perubahan provider E-SIM
document.addEventListener('DOMContentLoaded', function() {
    const esimSelect = document.querySelector('#esimModal select');
    if (esimSelect) {
        esimSelect.addEventListener('change', updateEsimPrice);
        // Set harga awal
        updateEsimPrice();
    }
});

// TAMBAHAN BARU: Fungsi validasi dan pembelian E-SIM
function buyEsim() {
    const providerSelect = document.querySelector('#esimModal select');
    const emailInput = document.querySelector('#esimModal input[type="email"]');
    const phoneInput = document.querySelector('#esimModal input[type="text"]:last-of-type');
    
    const provider = providerSelect.value;
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    
    // Validasi input kosong
    if (!provider || !email || !phone) {
        alert('Harap isi semua data yang diperlukan!');
        return;
    }
    
    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Format email tidak valid!');
        return;
    }
    
    // Validasi nomor telepon (hanya angka, minimal 10 digit)
    const phoneRegex = /^[0-9]{10,15}$/;
    const cleanPhone = phone.replace(/[^\d]/g, ''); // Hapus karakter non-digit
    if (!phoneRegex.test(cleanPhone)) {
        alert('Nomor telepon harus berupa angka dengan panjang 10-15 digit!');
        return;
    }
    
    // Ambil harga berdasarkan provider yang dipilih
    const selectedEsim = products.esim.find(item => item.provider === provider);
    const price = selectedEsim ? selectedEsim.price : 0;
    
    // Format pesan WhatsApp
    const message = `BELI E-SIM
Provider : ${provider}
Harga : Rp ${price.toLocaleString('id-ID')}
Email : ${email}
Nomor Telepon : ${phone}`;
    
    // Encode pesan untuk URL
    const encodedMessage = encodeURIComponent(message);
    
    // Redirect ke WhatsApp
    const whatsappUrl = `https://wa.me/6285805279420?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    
    // Tutup modal setelah redirect
    closeModal('esimModal');
}

// UPDATED: Fungsi untuk generate HTML token listrik dinamis
function generateTokenListrikHTML() {
    const container = document.querySelector('#tokenModal .denomination-grid');
    if (!container) return;
    
    container.innerHTML = ''; // Kosongkan container
    
    products.tokenListrik.forEach(token => {
        const tokenItem = document.createElement('div');
        tokenItem.className = 'denomination-item';
        tokenItem.innerHTML = `
            <div class="amount">Rp ${token.amount.toLocaleString('id-ID')}</div>
            <div class="price">Rp ${token.price.toLocaleString('id-ID')}</div>
            <div class="admin">Admin: Rp ${token.admin.toLocaleString('id-ID')}</div>
        `;
        container.appendChild(tokenItem);
    });
}

// SIMPLIFIED: Fungsi untuk membeli token listrik (tanpa validasi PLN)
function buyTokenListrik() {
    const plnInput = document.querySelector('#tokenModal input[type="text"]');
    const selectedItem = document.querySelector('#tokenModal .denomination-item.selected');
    
    const plnId = plnInput.value.trim();
    
    // Validasi input kosong saja
    if (!plnId) {
        alert('Harap masukkan ID Pelanggan PLN!');
        return;
    }
    
    if (!selectedItem) {
        alert('Harap pilih nominal token!');
        return;
    }
    
    // Ambil data nominal yang dipilih
    const priceText = selectedItem.querySelector('.price').textContent;
    
    // Format pesan WhatsApp
    const message = `BELI TOKEN LISTRIK
ID PLN : ${plnId}
Total Nominal : ${priceText}`;
    
    // Encode pesan untuk URL
    const encodedMessage = encodeURIComponent(message);
    
    // Redirect ke WhatsApp
    const whatsappUrl = `https://wa.me/6285805279420?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    
    // Tutup modal setelah redirect
    closeModal('tokenModal');
}

// UPDATED: Event listener DOMContentLoaded (hilangkan semua fungsi validasi PLN)
document.addEventListener('DOMContentLoaded', function() {
    // Generate token listrik HTML dinamis
    generateTokenListrikHTML();
    
    // Setup E-SIM functionality (existing code)
    const esimSelect = document.querySelector('#esimModal select');
    if (esimSelect) {
        esimSelect.addEventListener('change', updateEsimPrice);
        updateEsimPrice();
    }
    
    // TIDAK ADA LAGI setup PLN input validation - sudah dihapus
});