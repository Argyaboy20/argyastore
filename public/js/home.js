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
    paketData: {
        xl: [
            { name: '1GB 30 Hari', price: 15000, provider: 'XL' },
            { name: '3GB 30 Hari', price: 35000, provider: 'XL' },
            { name: '5GB 30 Hari', price: 50000, provider: 'XL' }
        ],
        telkomsel: [
            { name: '1.5GB 30 Hari', price: 18000, provider: 'Telkomsel' },
            { name: '3.5GB 30 Hari', price: 38000, provider: 'Telkomsel' },
            { name: '6GB 30 Hari', price: 55000, provider: 'Telkomsel' }
        ],
        smartfren: [
            { name: '2GB 30 Hari', price: 16000, provider: 'Smartfren' },
            { name: '4GB 30 Hari', price: 32000, provider: 'Smartfren' },
            { name: '8GB 30 Hari', price: 48000, provider: 'Smartfren' }
        ],
        indosat: [
            { name: '1GB 30 Hari', price: 14000, provider: 'Indosat' },
            { name: '3GB 30 Hari', price: 34000, provider: 'Indosat' },
            { name: '5GB 30 Hari', price: 49000, provider: 'Indosat' }
        ],
        byu: [
            { name: '1.5GB 30 Hari', price: 17000, provider: 'by.U' },
            { name: '3.5GB 30 Hari', price: 36000, provider: 'by.U' },
            { name: '7GB 30 Hari', price: 52000, provider: 'by.U' }
        ],
        axis: [
            { name: '2GB 30 Hari', price: 15500, provider: 'Axis' },
            { name: '4GB 30 Hari', price: 33000, provider: 'Axis' },
            { name: '6GB 30 Hari', price: 47000, provider: 'Axis' }
        ],
        tri: [
            { name: '1GB 30 Hari', price: 13000, provider: 'Tri' },
            { name: '3GB 30 Hari', price: 31000, provider: 'Tri' },
            { name: '5GB 30 Hari', price: 45000, provider: 'Tri' }
        ]
    },
    ewallet: {
        ovo: [
            { amount: 102000, price: 100980, fee: 300 },
            { amount: 82000, price: 81180, fee: 180 },
            { amount: 52000, price: 50960, fee: 250 }
        ],
        gopay: [
            { amount: 102000, price: 100980, fee: 300 },
            { amount: 82300, price: 81477, fee: 200 },
            { amount: 52000, price: 51480, fee: 480 }
        ],
        dana: [
            { amount: 100000, price: 100000, fee: '-' },
            { amount: 81900, price: 81081, fee: 200 },
            { amount: 52100, price: 51058, fee: 300 }
        ],
        shopeepay: [
            { amount: 101000, price: 101000, fee: '-' },
            { amount: 82600, price: 81774, fee: 300 },
            { amount: 50000, price: 50000, fee: '-' }
        ]
    },
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
    
    // Reset payment method selection
    modal.querySelectorAll('.payment-btn, .pulsapayment-btn, .paketpayment-btn, .ewalletpayment-btn').forEach(btn => {
    btn.classList.remove('active');
    });
    
    // Special reset untuk modal pulsa
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

    // Special reset untuk modal paket data
    if (modalId === 'dataModal') {
        // Reset provider selection
        modal.querySelectorAll('.paketprovider-item').forEach(item => {
            item.classList.remove('selected');
        });
        
        // Reset packages to default state
        const packages = modal.querySelectorAll('#paketPackages .paket-item');
        packages.forEach(item => {
            item.classList.remove('selected');
            item.querySelector('.paket-name').textContent = 'Pilih provider dulu';
            item.querySelector('.paket-provider').textContent = '-';
            item.querySelector('.paket-price').textContent = 'Rp -';
        });
    }
    
    // Khusus untuk E-SIM modal, reset harga
    if (modalId === 'esimModal') {
        const priceElement = modal.querySelector('.esim-price .price');
        if (priceElement) {
            priceElement.textContent = 'Rp -';
        }
    }

    // Special reset untuk modal e-wallet
    if (modalId === 'ewalletModal') {
        // Reset e-wallet selection - tidak ada yang terpilih
        modal.querySelectorAll('.ewallet-select-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Reset denominations to default state
        const denominations = modal.querySelectorAll('#ewalletDenominations .ewalletdenomination-item');
        const defaultAmounts = ['Rp 100.000', 'Rp 80.000', 'Rp 50.000'];
        denominations.forEach((item, index) => {
            item.classList.remove('selected');
            item.querySelector('.amount').textContent = defaultAmounts[index] || 'Rp -';
            item.querySelector('.price').textContent = 'Pilih e-wallet dulu';
            item.querySelector('.fee').textContent = '-';
        });
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

// Close modal when clicking outside
window.onclick = function (event) {
    const modals = document.querySelectorAll('.modal, .pulsamodal, .paketmodal, .ewalletmodal');
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
-> Provider : ${provider}
-> Nomor HP : ${phone}
-> Nominal : ${amount}
-> Harga diskon : ${price}
-> Metode Pembayaran : ${paymentMethod}`;
    
    // Encode and redirect to WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/6285805279420?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    
    // Close modal
    closeModal('pulsaModal');
}

// ===== E-WALLET FUNCTIONALITY =====
function updateEwalletDenominations(ewallet) {
    const denominations = document.querySelectorAll('#ewalletDenominations .ewalletdenomination-item');
    const ewalletData = products.ewallet[ewallet];
    
    if (!ewalletData) return;
    
    denominations.forEach((item, index) => {
        if (ewalletData[index]) {
            const data = ewalletData[index];
            item.querySelector('.amount').textContent = `Rp ${data.amount.toLocaleString('id-ID')}`;
            item.querySelector('.price').textContent = `Rp ${data.price.toLocaleString('id-ID')}`;
            item.querySelector('.fee').textContent = `Fee: Rp ${data.fee.toLocaleString('id-ID')}`;
        }
    });
}

function buyEwallet() {
    const selectedEwallet = document.querySelector('#ewalletModal .ewallet-select-btn.active');
    const phoneInput = document.querySelector('#ewalletModal input[type="text"]');
    const selectedDenomination = document.querySelector('#ewalletModal #ewalletDenominations .ewalletdenomination-item.selected');
    const selectedPayment = document.querySelector('#ewalletModal .ewalletpayment-btn.active');
    // Validations
    if (!selectedEwallet) {
        alert('Harap pilih e-wallet!');
        return;
    }
    if (!phoneInput.value.trim()) {
        alert('Harap masukkan nomor HP!');
        return;
    }
    if (!selectedDenomination) {
        alert('Harap pilih nominal top up!');
        return;
    }
    if (!selectedPayment) {
        alert('Harap pilih metode pembayaran!');
        return;
    }
    
    // Get data for WhatsApp message
    const ewallet = selectedEwallet.querySelector('span').textContent;
    const phone = phoneInput.value.trim();
    const amount = selectedDenomination.querySelector('.amount').textContent;
    const price = selectedDenomination.querySelector('.price').textContent;
    const fee = selectedDenomination.querySelector('.fee').textContent;
    const paymentMethod = selectedPayment.querySelector('span').textContent;
    
    // Format WhatsApp message
    const message = `TOP UP E-WALLET
-> E-Wallet: ${ewallet}
-> Nomor HP: ${phone}
-> Nominal : ${amount}
-> Harga : ${price}
-> ${fee}
-> Metode Pembayaran : ${paymentMethod}`;
    
    // Encode and redirect to WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/6285805279420?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    
    // Close modal
    closeModal('ewalletModal');
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

// ===== PAKET DATA FUNCTIONALITY =====
function updatePaketDataPackages(provider) {
    const packages = document.querySelectorAll('#paketPackages .paket-item');
    const providerData = products.paketData[provider];
    
    if (!providerData) return;
    
    packages.forEach((item, index) => {
        if (providerData[index]) {
            const data = providerData[index];
            item.querySelector('.paket-name').textContent = data.name;
            item.querySelector('.paket-provider').textContent = data.provider;
            item.querySelector('.paket-price').textContent = `Rp ${data.price.toLocaleString('id-ID')}`;
        }
    });
}

function buyPaketData() {
    const selectedProvider = document.querySelector('#dataModal .paketprovider-item.selected');
    const phoneInput = document.querySelector('#dataModal input[type="text"]');
    const selectedPackage = document.querySelector('#dataModal #paketPackages .paket-item.selected');
    const selectedPayment = document.querySelector('#dataModal .paketpayment-btn.active');
    // Validations
    if (!selectedProvider) {
        alert('Harap pilih provider!');
        return;
    }
    if (!phoneInput.value.trim()) {
        alert('Harap masukkan nomor HP!');
        return;
    }
    if (!selectedPackage) {
        alert('Harap pilih paket data!');
        return;
    }
    if (!selectedPayment) {
        alert('Harap pilih metode pembayaran!');
        return;
    }
    
    // Get data for WhatsApp message
    const provider = selectedProvider.querySelector('.paketprovider-name').textContent;
    const phone = phoneInput.value.trim();
    const packageName = selectedPackage.querySelector('.paket-name').textContent;
    const price = selectedPackage.querySelector('.paket-price').textContent;
    const paymentMethod = selectedPayment.querySelector('span').textContent;
    
    // Format WhatsApp message
    const message = `BELI PAKET DATA
-> Provider: ${provider}
-> Nomor HP: ${phone}
-> Paket: ${packageName}
-> Harga: ${price}
-> Metode Pembayaran: ${paymentMethod}`;
    
    // Encode and redirect to WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/6285805279420?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    
    // Close modal
    closeModal('dataModal');
}

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
-> Provider : ${provider}
-> Harga : Rp ${price.toLocaleString('id-ID')}
-> Email : ${email}
-> Nomor Telepon : ${phone}
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
-> ID PLN : ${plnId}
-> Total Nominal : ${priceText}
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

    // ===== ALL ELEMENT LISTENERS - UPDATED semua selector =====
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

        if (e.target.closest('#dataModal .paketprovider-item')) {
            // Remove selected from all providers
            document.querySelectorAll('#dataModal .paketprovider-item').forEach(item => {
                item.classList.remove('selected');
            });
            
            // Add selected to clicked provider
            const clickedProvider = e.target.closest('.paketprovider-item');
            clickedProvider.classList.add('selected');
            
            // Update packages
            const provider = clickedProvider.dataset.provider;
            updatePaketDataPackages(provider);
        }

        if (e.target.closest('#ewalletModal .ewallet-select-btn')) {
            // Remove active from all e-wallet buttons
            document.querySelectorAll('#ewalletModal .ewallet-select-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active to clicked e-wallet
            const clickedEwallet = e.target.closest('.ewallet-select-btn');
            clickedEwallet.classList.add('active');
            
            // Update denominations
            const ewallet = clickedEwallet.dataset.ewallet;
            updateEwalletDenominations(ewallet);
            
            // Reset denomination selection
            document.querySelectorAll('#ewalletModal .ewalletdenomination-item').forEach(item => {
                item.classList.remove('selected');
            });
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
        
        // For Paket Data
        if (e.target.closest('#dataModal #paketPackages .paket-item')) {
            // Remove selected from all packages
            document.querySelectorAll('#dataModal #paketPackages .paket-item').forEach(item => {
                item.classList.remove('selected');
            });
            
            // Add selected to clicked package
            e.target.closest('.paket-item').classList.add('selected');
        }

        //For E-Wallet
        if (e.target.closest('#ewalletModal #ewalletDenominations .ewalletdenomination-item')) {
            // Remove selected from all e-wallet denominations
            document.querySelectorAll('#ewalletModal #ewalletDenominations .ewalletdenomination-item').forEach(item => {
                item.classList.remove('selected');
            });
            
            // Add selected to clicked denomination
            e.target.closest('.ewalletdenomination-item').classList.add('selected');
        }
    });

    // Payment method selection
    document.addEventListener('click', function(e) {
        // Payment method selection 
        if (e.target.closest('.payment-btn, .pulsapayment-btn, .paketpayment-btn, .ewalletpayment-btn')) {
            const modal = e.target.closest('.modal, .pulsamodal, .paketmodal, .ewalletmodal');
            if (modal) {
                modal.querySelectorAll('.payment-btn, .pulsapayment-btn, .paketpayment-btn, .ewalletpayment-btn').forEach(btn => btn.classList.remove('active'));
                e.target.closest('.payment-btn, .pulsapayment-btn, .paketpayment-btn, .ewalletpayment-btn').classList.add('active');
            }
        }
    });

    // Close button functionality 
    document.querySelectorAll('.close, .pulsaclose, .paketclose, .ewalletclose').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.modal, .pulsamodal, .paketmodal, .ewalletmodal'); 
            if (modal) {
                const modalId = modal.id;
                closeModal(modalId);
            }
        });
    });

    // Scroll to top button functionality
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 100) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});