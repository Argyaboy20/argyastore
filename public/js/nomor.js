// ===== SIDE MENU FUNCTIONALITY =====
function openSideMenu() {
    const sideMenu = document.getElementById('sideMenu');
    const overlay = document.getElementById('sideMenuOverlay');
    
    sideMenu.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSideMenu() {
    const sideMenu = document.getElementById('sideMenu');
    const overlay = document.getElementById('sideMenuOverlay');
    
    sideMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ===== FAVORITE NUMBERS MANAGEMENT =====
let editingNumberIndex = -1;

// Load favorite numbers when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadFavoriteNumbers();
});

// Get user-specific storage key
function getUserStorageKey() {
    const userData = localStorage.getItem('userAccount');
    if (userData) {
        const user = JSON.parse(userData);
        return `favoriteNumbers_${user.email}`;
    }
    return null;
}

// Load favorite numbers from localStorage
function loadFavoriteNumbers() {
    const storageKey = getUserStorageKey();
    if (!storageKey) {
        // Redirect to home if no user account
        alert('Anda belum login. Silakan login terlebih dahulu.');
        window.location.href = '/';
        return;
    }

    const savedNumbers = localStorage.getItem(storageKey);
    const numbers = savedNumbers ? JSON.parse(savedNumbers) : [];
    
    displayFavoriteNumbers(numbers);
    updateNumberCount(numbers.length);
}

// Display favorite numbers in the UI
function displayFavoriteNumbers(numbers) {
    const numbersList = document.getElementById('numbersList');
    const emptyState = document.getElementById('emptyState');

    if (numbers.length === 0) {
        numbersList.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }

    numbersList.style.display = 'block';
    emptyState.style.display = 'none';

    numbersList.innerHTML = numbers.map((number, index) => `
        <div class="number-item">
            <div class="number-info">
                <h3 class="number-name">${escapeHtml(number.name)}</h3>
                <p class="number-phone">${escapeHtml(number.phone)}</p>
                <span class="number-status">${getStatusText(number.status)}</span>
            </div>
            <div class="number-actions">
                <button class="edit-btn" onclick="openEditNumberModal(${index})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn" onclick="deleteFavoriteNumber(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Update number count display
function updateNumberCount(count) {
    document.getElementById('numberCount').textContent = count;
}

// Get status text in Indonesian
function getStatusText(status) {
    const statusMap = {
        'diri-sendiri': 'Diri Sendiri',
        'ayah': 'Ayah',
        'ibu': 'Ibu',
        'istri': 'Istri',
        'suami': 'Suami',
        'kerabat': 'Kerabat'
    };
    return statusMap[status] || status;
}

// Escape HTML to prevent XSS
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// ===== MODAL FUNCTIONS =====
function openAddNumberModal() {
    const modal = document.getElementById('addNumberModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Reset form
    document.getElementById('numberName').value = '';
    document.getElementById('phoneNumber').value = '';
    document.getElementById('ownershipStatus').value = '';
    clearAllAlerts();
}

function closeAddNumberModal() {
    const modal = document.getElementById('addNumberModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    clearAllAlerts();
}

function openEditNumberModal(index) {
    const storageKey = getUserStorageKey();
    if (!storageKey) return;

    const savedNumbers = localStorage.getItem(storageKey);
    const numbers = savedNumbers ? JSON.parse(savedNumbers) : [];
    
    if (index >= 0 && index < numbers.length) {
        const number = numbers[index];
        editingNumberIndex = index;
        
        document.getElementById('editNumberName').value = number.name;
        document.getElementById('editPhoneNumber').value = number.phone;
        document.getElementById('editOwnershipStatus').value = number.status;
        
        const modal = document.getElementById('editNumberModal');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        clearAllEditAlerts();
    }
}

function closeEditNumberModal() {
    const modal = document.getElementById('editNumberModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    editingNumberIndex = -1;
    clearAllEditAlerts();
}

// ===== VALIDATION FUNCTIONS =====
function showInputAlert(inputId, alertId, message, type) {
    const alertElement = document.getElementById(alertId);
    if (alertElement) {
        alertElement.textContent = message;
        alertElement.className = `input-alert ${type}`;
        alertElement.style.display = 'block';
    }
}

function hideInputAlert(alertId) {
    const alertElement = document.getElementById(alertId);
    if (alertElement) {
        alertElement.style.display = 'none';
    }
}

function clearAllAlerts() {
    const alertIds = ['nameAlert', 'phoneAlert', 'statusAlert'];
    alertIds.forEach(id => hideInputAlert(id));
}

function clearAllEditAlerts() {
    const alertIds = ['editNameAlert', 'editPhoneAlert', 'editStatusAlert'];
    alertIds.forEach(id => hideInputAlert(id));
}

function validateName(name) {
    return name.trim().length >= 2 && name.trim().length <= 50;
}

function validatePhone(phone) {
    const phoneRegex = /^[0-9]{10,13}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
}

function validateForm(nameId, phoneId, statusId, nameAlertId, phoneAlertId, statusAlertId) {
    const name = document.getElementById(nameId).value.trim();
    const phone = document.getElementById(phoneId).value.trim();
    const status = document.getElementById(statusId).value;
    
    let hasError = false;

    // Validate name
    if (!name) {
        showInputAlert(nameId, nameAlertId, 'Nama wajib diisi!', 'error');
        hasError = true;
    } else if (!validateName(name)) {
        showInputAlert(nameId, nameAlertId, 'Nama harus antara 2-50 karakter!', 'error');
        hasError = true;
    } else {
        hideInputAlert(nameAlertId);
    }

    // Validate phone
    if (!phone) {
        showInputAlert(phoneId, phoneAlertId, 'Nomor telepon wajib diisi!', 'error');
        hasError = true;
    } else if (!validatePhone(phone)) {
        showInputAlert(phoneId, phoneAlertId, 'Nomor telepon harus 10-13 digit angka!', 'error');
        hasError = true;
    } else {
        hideInputAlert(phoneAlertId);
    }

    // Validate status
    if (!status) {
        showInputAlert(statusId, statusAlertId, 'Status kepemilikan wajib dipilih!', 'error');
        hasError = true;
    } else {
        hideInputAlert(statusAlertId);
    }

    return { valid: !hasError, name, phone, status };
}

// ===== ADD/EDIT/DELETE FUNCTIONS =====
function addFavoriteNumber(event) {
    event.preventDefault();
    
    const validation = validateForm('numberName', 'phoneNumber', 'ownershipStatus', 'nameAlert', 'phoneAlert', 'statusAlert');
    
    if (!validation.valid) {
        return;
    }

    const storageKey = getUserStorageKey();
    if (!storageKey) return;

    const savedNumbers = localStorage.getItem(storageKey);
    const numbers = savedNumbers ? JSON.parse(savedNumbers) : [];

    // Check if maximum limit reached
    if (numbers.length >= 8) {
        alert('Maksimal 8 nomor favorit yang dapat disimpan!');
        return;
    }

    // Check for duplicate phone number
    const phoneExists = numbers.some(number => number.phone === validation.phone);
    if (phoneExists) {
        showInputAlert('phoneNumber', 'phoneAlert', 'Nomor telepon sudah ada!', 'error');
        return;
    }

    // Add new number
    const newNumber = {
        id: Date.now().toString(),
        name: validation.name,
        phone: validation.phone,
        status: validation.status,
        createdAt: new Date().toISOString()
    };

    numbers.push(newNumber);
    localStorage.setItem(storageKey, JSON.stringify(numbers));

    // Update UI
    displayFavoriteNumbers(numbers);
    updateNumberCount(numbers.length);

    // Show success message and close modal
    alert(`Nomor favorit "${validation.name}" berhasil ditambahkan!`);
    closeAddNumberModal();
}

function updateFavoriteNumber(event) {
    event.preventDefault();
    
    if (editingNumberIndex === -1) return;
    
    const validation = validateForm('editNumberName', 'editPhoneNumber', 'editOwnershipStatus', 'editNameAlert', 'editPhoneAlert', 'editStatusAlert');
    
    if (!validation.valid) {
        return;
    }

    const storageKey = getUserStorageKey();
    if (!storageKey) return;

    const savedNumbers = localStorage.getItem(storageKey);
    const numbers = savedNumbers ? JSON.parse(savedNumbers) : [];

    if (editingNumberIndex >= 0 && editingNumberIndex < numbers.length) {
        // Check for duplicate phone number (excluding current number)
        const phoneExists = numbers.some((number, index) => 
            index !== editingNumberIndex && number.phone === validation.phone
        );
        if (phoneExists) {
            showInputAlert('editPhoneNumber', 'editPhoneAlert', 'Nomor telepon sudah ada!', 'error');
            return;
        }

        // Update number
        numbers[editingNumberIndex] = {
            ...numbers[editingNumberIndex],
            name: validation.name,
            phone: validation.phone,
            status: validation.status,
            updatedAt: new Date().toISOString()
        };

        localStorage.setItem(storageKey, JSON.stringify(numbers));

        // Update UI
        displayFavoriteNumbers(numbers);
        updateNumberCount(numbers.length);

        // Show success message and close modal
        alert(`Nomor favorit "${validation.name}" berhasil diperbarui!`);
        closeEditNumberModal();
    }
}

function deleteFavoriteNumber(index) {
    const storageKey = getUserStorageKey();
    if (!storageKey) return;

    const savedNumbers = localStorage.getItem(storageKey);
    const numbers = savedNumbers ? JSON.parse(savedNumbers) : [];

    if (index >= 0 && index < numbers.length) {
        const numberName = numbers[index].name;
        
        if (confirm(`Apakah Anda yakin ingin menghapus nomor "${numberName}"?`)) {
            numbers.splice(index, 1);
            localStorage.setItem(storageKey, JSON.stringify(numbers));

            // Update UI
            displayFavoriteNumbers(numbers);
            updateNumberCount(numbers.length);

            alert(`Nomor favorit "${numberName}" berhasil dihapus!`);
        }
    }
}

// ===== PHONE NUMBER FORMATTING =====
document.addEventListener('DOMContentLoaded', function() {
    // Format phone input as user types
    const phoneInputs = ['phoneNumber', 'editPhoneNumber'];
    
    phoneInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', function() {
                // Remove all non-digit characters
                let value = this.value.replace(/\D/g, '');
                
                // Limit to 13 digits
                if (value.length > 13) {
                    value = value.substring(0, 13);
                }
                
                this.value = value;
            });
        }
    });
});

// ===== MODAL CLICK OUTSIDE TO CLOSE =====
window.addEventListener('click', function(event) {
    const addModal = document.getElementById('addNumberModal');
    const editModal = document.getElementById('editNumberModal');
    
    if (event.target === addModal) {
        closeAddNumberModal();
    }
    if (event.target === editModal) {
        closeEditNumberModal();
    }
});

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', function(event) {
    // Close modal with Escape key
    if (event.key === 'Escape') {
        const addModal = document.getElementById('addNumberModal');
        const editModal = document.getElementById('editNumberModal');
        
        if (addModal.classList.contains('active')) {
            closeAddNumberModal();
        }
        if (editModal.classList.contains('active')) {
            closeEditNumberModal();
        }
    }
});