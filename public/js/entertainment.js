const appData = {
    'netflix': {
        title: 'Netflix Premium',
        icon: '📺',
        features: ['4K Ultra HD', '4 Akun Simultan', 'Download Offline', 'No Ads'],
        options: [
            { duration: '1 Bulan', price: 54000, popular: false },
            { duration: '3 Bulan', price: 150000, popular: true, discount: '7%' },
            { duration: '6 Bulan', price: 290000, popular: false, discount: '10%' },
            { duration: '12 Bulan', price: 550000, popular: false, discount: '15%' }
        ]
    },
    'spotify': {
        title: 'Spotify Premium',
        icon: '🎵',
        features: ['No Ads', 'Offline Download', 'High Quality Audio', 'Unlimited Skips'],
        options: [
            { duration: '1 Bulan', price: 17000, popular: false },
            { duration: '3 Bulan', price: 45000, popular: true, discount: '12%' },
            { duration: '6 Bulan', price: 85000, popular: false, discount: '17%' },
            { duration: '12 Bulan', price: 150000, popular: false, discount: '26%' }
        ]
    },
    'youtube': {
        title: 'YouTube Premium',
        icon: '📹',
        features: ['Ad-Free Videos', 'Background Play', 'YouTube Music', 'Download Videos'],
        options: [
            { duration: '1 Bulan', price: 35000, popular: false },
            { duration: '3 Bulan', price: 95000, popular: true, discount: '10%' },
            { duration: '6 Bulan', price: 180000, popular: false, discount: '14%' },
            { duration: '12 Bulan', price: 350000, popular: false, discount: '17%' }
        ]
    },
    'vidio': {
        title: 'Vidio Premier',
        icon: '📺',
        features: ['Indonesian Content', 'Live Sports', 'Local Movies', 'Original Series'],
        options: [
            { duration: '1 Bulan', price: 29000, popular: false },
            { duration: '3 Bulan', price: 79000, popular: true, discount: '9%' },
            { duration: '6 Bulan', price: 149000, popular: false, discount: '14%' },
            { duration: '12 Bulan', price: 279000, popular: false, discount: '20%' }
        ]
    },
    'wetv': {
        title: 'WeTV VIP',
        icon: '📱',
        features: ['Asian Drama', 'Anime Content', 'No Ads', 'HD Quality'],
        options: [
            { duration: '1 Bulan', price: 25000, popular: false },
            { duration: '3 Bulan', price: 69000, popular: true, discount: '8%' },
            { duration: '6 Bulan', price: 129000, popular: false, discount: '14%' },
            { duration: '12 Bulan', price: 239000, popular: false, discount: '20%' }
        ]
    }
};

function selectApp(appId) {
    const app = appData[appId];
    if (!app) return;
    // Update modal title
    document.getElementById('appTitle').innerHTML = `<i class="fas fa-play-circle"></i> ${app.title}`;

    // Update app details
    const detailsContainer = document.getElementById('appDetails');
    detailsContainer.innerHTML = `
        <div class="app-description">
          <div class="app-icon-large">${app.icon}</div>
          <div class="description-text">
            <div class="features-list">
              ${app.features.map(feature => `<span class="feature-tag"><i class="fas fa-check"></i> ${feature}</span>`).join('')}
            </div>
          </div>
        </div>
      `;

    // Update subscription options
    const optionsContainer = document.getElementById('subscriptionOptions');
    optionsContainer.innerHTML = `
        <h4>Pilih Durasi Berlangganan</h4>
        <div class="subscription-plans">
          ${app.options.map(option => `
            <div class="plan-item ${option.popular ? 'popular' : ''}" onclick="selectPlan(this)">
              ${option.popular ? '<div class="plan-badge">TERPOPULER</div>' : ''}
              <div class="plan-duration">${option.duration}</div>
              <div class="plan-price">Rp ${option.price.toLocaleString()}</div>
              ${option.discount ? `<div class="plan-discount">Hemat ${option.discount}</div>` : ''}
            </div>
          `).join('')}
        </div>
      `;

    // Show modal
    document.getElementById('appModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeAppModal() {
    document.getElementById('appModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function selectPlan(element) {
    document.querySelectorAll('.plan-item').forEach(item => item.classList.remove('selected'));
    element.classList.add('selected');
}

function processSubscription() {
    const email = document.getElementById('userEmail').value;
    const selectedPlan = document.querySelector('.plan-item.selected');
    if (!email) {
        alert('Mohon masukkan email untuk akun');
        return;
    }
    if (!selectedPlan) {
        alert('Mohon pilih durasi berlangganan');
        return;
    }
    alert('Pembelian berhasil! Detail akun akan dikirim ke email Anda dalam 1-5 menit.');
    closeAppModal();
}

function filterApps(category) {
    const appCards = document.querySelectorAll('.app-card');
    const tabBtns = document.querySelectorAll('.tab-btn');
    // Update active tab
    tabBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    // Filter apps
    appCards.forEach(card => {
        if (category === 'all' || card.classList.contains(category)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Payment method selection
document.addEventListener('click', function (e) {
    if (e.target.closest('.payment-btn')) {
        document.querySelectorAll('.payment-btn').forEach(btn => btn.classList.remove('active'));
        e.target.closest('.payment-btn').classList.add('active');
    }
});

// Close modal when clicking outside
window.onclick = function (event) {
    const modal = document.getElementById('appModal');
    if (event.target == modal) {
        closeAppModal();
    }
}