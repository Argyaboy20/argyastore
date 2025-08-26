const products = {
    pulsa: {
        indosat: [
            { amount: 100500, price: 99495, discount: '1%' },
            { amount: 80730, price: 79923, discount: '1%' },
            { amount: 50500, price: 49995, discount: '1%' }
        ],
        simpati: [
            { amount: 100900, price: 99891, discount: '1%' },
            { amount: 80100, price: 80100, discount: '0%' },
            { amount: 51000, price: 49980, discount: '2%' }
        ],
        smartfren: [
            { amount: 100800, price: 99792, discount: '1%' },
            { amount: 80100, price: 80100, discount: '0%' },
            { amount: 50000, price: 49500, discount: '1%' }
        ],
        telkomsel: [
            { amount: 101000, price: 99990, discount: '1%' },
            { amount: 80100, price: 80100, discount: '0%' },
            { amount: 51000, price: 49980, discount: '2%' }
        ],
        tri: [
            { amount: 100000, price: 99000, discount: '1%' },
            { amount: 80200, price: 79398, discount: '1%' },
            { amount: 50500, price: 49995, discount: '1%' }
        ],
        xl: [
            { amount: 101000, price: 99990, discount: '1%' },
            { amount: 85000, price: 84950, discount: '0.06%' },
            { amount: 50600, price: 50094, discount: '1%' }
        ],
        byu: [
            { amount: 101250, price: 99225, discount: '2%' },
            { amount: 80000, price: 80000, discount: '0%' },
            { amount: 50350, price: 49847, discount: '1%' }
        ]
    },
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

function getSelectedPaymentMethod(modalId) {
    const activePayment = document.querySelector(`#${modalId} .payment-btn.active, #${modalId} .pulsapayment-btn.active`);
    return activePayment ? activePayment.querySelector('span').textContent : null;
}

function resetModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    // Reset semua input text dan email
    modal.querySelectorAll('input[type="text"], input[type="email"]').forEach(input => {
        input.value = '';
    });
    
    // Reset select dropdown
    modal.querySelectorAll('select').forEach(select => {
        select.selectedIndex = 0;
    });
    
    // Reset pilihan denomination/package yang selected
    modal.querySelectorAll('.denomination-item, .package-item, .pulsadenomination-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // Reset payment method ke default (E-Wallet) - UPDATED untuk modal pulsa
    modal.querySelectorAll('.payment-btn, .pulsapayment-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Special reset untuk modal pulsa - UPDATED
    if (modalId === 'pulsaModal') {
        // Reset provider selection - UPDATED class name
        modal.querySelectorAll('.pulsaprovider-item').forEach(item => {
            item.classList.remove('selected');
        });
        
        // Reset denominations to default state - UPDATED selector
        const denominations = modal.querySelectorAll('#pulsaDenominations .pulsadenomination-item');
        const defaultAmounts = ['Rp 100.000', 'Rp 80.000', 'Rp 50.000']; // Template default
        denominations.forEach((item, index) => {
            item.classList.remove('selected');
            item.querySelector('.amount').textContent = defaultAmounts[index] || 'Rp -';
            item.querySelector('.price').textContent = 'Pilih provider dulu';
            item.querySelector('.discount').textContent = '-';
        });
    }
    
    // Khusus untuk E-SIM modal, reset harga
    if (modalId === 'esimModal') {
        const priceElement = modal.querySelector('.esim-price .price');
        if (priceElement) {
            priceElement.textContent = 'Rp -';
        }
    }
}

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto';
    resetModal(modalId);
}

// UPDATED: Close modal when clicking outside - sekarang mencakup modal pulsa
window.onclick = function (event) {
    const modals = document.querySelectorAll('.modal, .pulsamodal'); 
    modals.forEach(modal => {
        if (event.target == modal) {
            const modalId = modal.id;
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            resetModal(modalId);
        }
    });
}

// ===== PULSA FUNCTIONALITY =====
// UPDATED: Update denominations based on selected provider
function updatePulsaDenominations(provider) {
    const denominations = document.querySelectorAll('#pulsaDenominations .pulsadenomination-item');
    const providerData = products.pulsa[provider];
    
    if (!providerData) return;
    
    denominations.forEach((item, index) => {
        if (providerData[index]) {
            const data = providerData[index];
            item.querySelector('.amount').textContent = `Rp ${data.amount.toLocaleString('id-ID')}`;
            item.querySelector('.price').textContent = `Rp ${data.price.toLocaleString('id-ID')}`;
            item.querySelector('.discount').textContent = `Hemat ${data.discount}`;
        }
    });
}

// UPDATED: Buy pulsa function - sesuaikan selector dengan class yang benar
function buyPulsa() {
    const selectedProvider = document.querySelector('#pulsaModal .pulsaprovider-item.selected');
    const phoneInput = document.querySelector('#pulsaModal input[type="text"]');
    const selectedDenomination = document.querySelector('#pulsaModal #pulsaDenominations .pulsadenomination-item.selected'); // UPDATED class
    const selectedPayment = document.querySelector('#pulsaModal .pulsapayment-btn.active');
    
    // Validations
    if (!selectedProvider) {
        alert('Harap pilih provider!');
        return;
    }
    
    if (!phoneInput.value.trim()) {
        alert('Harap masukkan nomor HP!');
        return;
    }
    
    if (!selectedDenomination) {
        alert('Harap pilih nominal pulsa!');
        return;
    }
    
    if (!selectedPayment) {
        alert('Harap pilih metode pembayaran!');
        return;
    }
    
    // Get data for WhatsApp message - UPDATED selector
    const provider = selectedProvider.querySelector('.pulsaprovider-name').textContent; // UPDATED class
    const phone = phoneInput.value.trim();
    const amount = selectedDenomination.querySelector('.amount').textContent;
    const price = selectedDenomination.querySelector('.price').textContent;
    const paymentMethod = selectedPayment.querySelector('span').textContent;
    
    // Format WhatsApp message
    const message = `BELI PULSA
-> Provider     : ${provider}
-> Nomor HP     : ${phone}
-> Nominal      : ${amount}
-> Harga diskon : ${price}
-> Metode Pembayaran: ${paymentMethod}`;
    
    // Encode and redirect to WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/6285805279420?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    
    // Close modal
    closeModal('pulsaModal');
}

// E-wallet selection
document.querySelectorAll('.ewallet-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.ewallet-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

// Denomination selection (untuk modal lain selain pulsa)
document.addEventListener('click', function (e) {
    if (e.target.closest('.denomination-item')) {
        const container = e.target.closest('.denomination-grid, .data-packages');
        if (container && !container.id.includes('pulsa')) { // Exclude pulsa denominations
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

// TAMBAHAN BARU: Fungsi validasi dan pembelian E-SIM
function buyEsim() {
    const providerSelect = document.querySelector('#esimModal select');
    const emailInput = document.querySelector('#esimModal input[type="email"]');
    const phoneInput = document.querySelector('#esimModal input[type="text"]:last-of-type');
    
    const provider = providerSelect.value;
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const paymentMethod = getSelectedPaymentMethod('esimModal');

    // Validasi input kosong
    if (!provider || !email || !phone) {
        alert('Harap isi semua data yang diperlukan!');
        return;
    }

    if (!paymentMethod) {
        alert('Harap pilih metode pembayaran!');
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
-> Provider         : ${provider}
-> Harga            : Rp ${price.toLocaleString('id-ID')}
-> Email            : ${email}
-> Nomor Telepon    : ${phone}
-> Metode Pembayaran : ${paymentMethod}`;
    
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
    const paymentMethod = getSelectedPaymentMethod('tokenModal');
    
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

    if (!paymentMethod) {
        alert('Harap pilih metode pembayaran!');
        return;
    }
    
    // Ambil data nominal yang dipilih
    const priceText = selectedItem.querySelector('.price').textContent;
    
    // Format pesan WhatsApp
    const message = `BELI TOKEN LISTRIK
-> ID PLN           : ${plnId}
-> Total Nominal    : ${priceText}
-> Metode Pembayaran : ${paymentMethod}`;
    
    // Encode pesan untuk URL
    const encodedMessage = encodeURIComponent(message);
    
    // Redirect ke WhatsApp
    const whatsappUrl = `https://wa.me/6285805279420?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    
    // Tutup modal setelah redirect
    closeModal('tokenModal');
}

// Event listener DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // Generate token listrik HTML dinamis
    generateTokenListrikHTML();
    
    // Setup E-SIM functionality
    const esimSelect = document.querySelector('#esimModal select');
    if (esimSelect) {
        esimSelect.addEventListener('change', updateEsimPrice);
        updateEsimPrice();
    }

    // ===== PULSA EVENT LISTENERS - UPDATED semua selector =====
    // Provider selection for pulsa - UPDATED class names
    document.addEventListener('click', function(e) {
        if (e.target.closest('#pulsaModal .pulsaprovider-item')) {
            // Remove selected from all providers
            document.querySelectorAll('#pulsaModal .pulsaprovider-item').forEach(item => { 
                item.classList.remove('selected');
            });
            
            // Add selected to clicked provider
            const clickedProvider = e.target.closest('.pulsaprovider-item'); 
            clickedProvider.classList.add('selected');
            
            // Update denominations
            const provider = clickedProvider.dataset.provider;
            updatePulsaDenominations(provider);
        }
    });

    // Denomination selection for pulsa - UPDATED class names
    document.addEventListener('click', function(e) {
        if (e.target.closest('#pulsaModal #pulsaDenominations .pulsadenomination-item')) {
            // Remove selected from all pulsa denominations
            document.querySelectorAll('#pulsaModal #pulsaDenominations .pulsadenomination-item').forEach(item => { 
                item.classList.remove('selected');
            });
            
            // Add selected to clicked denomination
            e.target.closest('.pulsadenomination-item').classList.add('selected');
        }
    });

    // Payment method selection - UPDATED untuk modal pulsa
    document.addEventListener('click', function(e) {
        if (e.target.closest('.payment-btn, .pulsapayment-btn')) { 
            const modal = e.target.closest('.modal, .pulsamodal');
            if (modal) {
                modal.querySelectorAll('.payment-btn, .pulsapayment-btn').forEach(btn => btn.classList.remove('active')); 
                e.target.closest('.payment-btn, .pulsapayment-btn').classList.add('active'); 
            }
        }
    });

    // Close button functionality - UPDATED untuk modal pulsa
    document.querySelectorAll('.close, .pulsaclose').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.modal, .pulsamodal'); 
            if (modal) {
                const modalId = modal.id;
                closeModal(modalId);
            }
        });
    });
});