// Profile Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    loadUserData();
    loadProfilePhoto();
});

let isEditing = false;
let originalData = {};

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

// ===== USER DATA MANAGEMENT =====
function loadUserData() {
    const userData = localStorage.getItem('userAccount');
    
    if (userData) {
        const user = JSON.parse(userData);
        document.getElementById('userName').value = user.name || '';
        document.getElementById('userEmail').value = user.email || '';
        document.getElementById('userPassword').value = user.password || '';
    } else {
        // Redirect to home if no user data found
        alert('Anda belum login. Silakan login terlebih dahulu.');
        window.location.href = '/';
    }
}

function saveUserData(updatedData) {
    const userData = localStorage.getItem('userAccount');
    if (userData) {
        const user = JSON.parse(userData);
        const updatedUser = { ...user, ...updatedData };
        localStorage.setItem('userAccount', JSON.stringify(updatedUser));
        return true;
    }
    return false;
}

// ===== PROFILE PHOTO MANAGEMENT =====
function loadProfilePhoto() {
    const photoData = localStorage.getItem('userProfilePhoto');
    const profilePhoto = document.getElementById('profilePhoto');
    const placeholder = document.getElementById('profilePhotoPlaceholder');
    
    if (photoData) {
        profilePhoto.src = photoData;
        profilePhoto.style.display = 'block';
        placeholder.style.display = 'none';
    } else {
        profilePhoto.style.display = 'none';
        placeholder.style.display = 'flex';
    }
}

function openPhotoModal() {
    document.getElementById('photoModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closePhotoModal() {
    document.getElementById('photoModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Reset modal state
    document.getElementById('photoPreview').style.display = 'none';
    document.getElementById('savePhotoBtn').disabled = true;
    document.getElementById('photoInput').value = '';
}

function previewPhoto(input) {
    const file = input.files[0];
    if (!file) return;
    
    // Validate file size (1MB = 1024 * 1024 bytes)
    if (file.size > 1024 * 1024) {
        alert('Ukuran file terlalu besar! Maksimal 1MB.');
        input.value = '';
        return;
    }
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
        alert('Format file tidak didukung! Gunakan JPG, PNG, GIF, atau WebP.');
        input.value = '';
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const preview = document.getElementById('photoPreview');
        const previewImg = document.getElementById('previewImage');
        
        previewImg.src = e.target.result;
        preview.style.display = 'block';
        document.getElementById('savePhotoBtn').disabled = false;
    };
    reader.readAsDataURL(file);
}

function saveProfilePhoto() {
    const previewImg = document.getElementById('previewImage');
    if (!previewImg.src) return;
    
    // Compress and save photo
    compressImage(previewImg.src, (compressedImage) => {
        localStorage.setItem('userProfilePhoto', compressedImage);
        loadProfilePhoto();
        closePhotoModal();
        
        // Show success message
        showNotification('Foto profil berhasil diperbarui!', 'success');
    });
}

function removeProfilePhoto() {
    if (confirm('Apakah Anda yakin ingin menghapus foto profil?')) {
        localStorage.removeItem('userProfilePhoto');
        loadProfilePhoto();
        closePhotoModal();
        showNotification('Foto profil berhasil dihapus!', 'success');
    }
}

function compressImage(src, callback, quality = 0.8) {
    const img = new Image();
    img.onload = function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas dimensions (max 400x400 for profile photo)
        const maxSize = 400;
        let { width, height } = img;
        
        if (width > height) {
            if (width > maxSize) {
                height *= maxSize / width;
                width = maxSize;
            }
        } else {
            if (height > maxSize) {
                width *= maxSize / height;
                height = maxSize;
            }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        
        callback(compressedDataUrl);
    };
    img.src = src;
}

// ===== FIELD EDITING FUNCTIONALITY =====
function editField(fieldId) {
    if (isEditing) {
        alert('Selesaikan editing yang sedang berlangsung terlebih dahulu!');
        return;
    }
    
    isEditing = true;
    
    // Store original data
    originalData = {
        userName: document.getElementById('userName').value,
        userEmail: document.getElementById('userEmail').value,
        userPassword: document.getElementById('userPassword').value
    };
    
    // Enable editing for the specific field
    const input = document.getElementById(fieldId);
    input.readOnly = false;
    input.focus();
    input.style.background = 'white';
    input.style.borderColor = 'var(--primary-color)';
    
    // Show action buttons
    document.getElementById('actionButtons').style.display = 'flex';
    
    // Disable all edit buttons
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = '0.5';
        btn.style.cursor = 'not-allowed';
    });
}

function saveChanges() {
    const userName = document.getElementById('userName').value.trim();
    const userEmail = document.getElementById('userEmail').value.trim();
    const userPassword = document.getElementById('userPassword').value.trim();
    
    // Validation
    if (!userName || userName.length < 2) {
        alert('Nama user harus minimal 2 karakter!');
        return;
    }
    
    if (!validateEmail(userEmail)) {
        alert('Format email tidak valid!');
        return;
    }
    
    if (!userPassword || userPassword.length < 6) {
        alert('Password harus minimal 6 karakter!');
        return;
    }
    
    // Save to localStorage
    const success = saveUserData({
        name: userName,
        email: userEmail,
        password: userPassword
    });
    
    if (success) {
        resetEditingState();
        showNotification('Perubahan berhasil disimpan!', 'success');
    } else {
        alert('Gagal menyimpan perubahan. Coba lagi!');
    }
}

function cancelEdit() {
    // Restore original data
    document.getElementById('userName').value = originalData.userName;
    document.getElementById('userEmail').value = originalData.userEmail;
    document.getElementById('userPassword').value = originalData.userPassword;
    
    resetEditingState();
    showNotification('Perubahan dibatalkan!', 'info');
}

function resetEditingState() {
    isEditing = false;
    
    // Make all inputs readonly again
    const inputs = document.querySelectorAll('.info-input');
    inputs.forEach(input => {
        input.readOnly = true;
        input.style.background = 'var(--bg-secondary)';
        input.style.borderColor = 'var(--border-color)';
    });
    
    // Hide action buttons
    document.getElementById('actionButtons').style.display = 'none';
    
    // Re-enable edit buttons
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(btn => {
        btn.disabled = false;
        btn.style.opacity = '1';
        btn.style.cursor = 'pointer';
    });
    
    // Reset password field
    const passwordInput = document.getElementById('userPassword');
    if (passwordInput.type === 'text') {
        togglePassword();
    }
}

// ===== PASSWORD TOGGLE FUNCTIONALITY =====
function togglePassword() {
    const passwordInput = document.getElementById('userPassword');
    const toggleIcon = document.getElementById('togglePasswordIcon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.className = 'fas fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        toggleIcon.className = 'fas fa-eye';
    }
}

// ===== VALIDATION FUNCTIONS =====
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles if not exist
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 3000;
                min-width: 300px;
                border-radius: 8px;
                box-shadow: var(--shadow-lg);
                animation: slideInRight 0.3s ease;
            }
            
            .notification-success {
                background: var(--success-color);
                color: white;
            }
            
            .notification-error {
                background: var(--error-color);
                color: white;
            }
            
            .notification-info {
                background: var(--primary-color);
                color: white;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                padding: 1rem;
            }
            
            .notification-close {
                background: rgba(255, 255, 255, 0.2);
                border: none;
                color: white;
                padding: 0.25rem;
                border-radius: 4px;
                cursor: pointer;
                margin-left: auto;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @media (max-width: 640px) {
                .notification {
                    top: 10px;
                    right: 10px;
                    left: 10px;
                    min-width: auto;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'info': return 'fa-info-circle';
        default: return 'fa-info-circle';
    }
}

// ===== ACCOUNT ACTIONS =====
function handleLogout() {
    if (confirm('Apakah Anda yakin ingin logout?')) {
        // HANYA hapus session, JANGAN hapus userAccount
        localStorage.removeItem('userSession');
        
        // Show notification
        showNotification('Berhasil logout!', 'success');
        
        // Redirect to home page after short delay
        setTimeout(() => {
            window.location.href = '/';
        }, 1000);
    }
}

function handleDeleteAccount() {
    if (confirm('PERINGATAN: Tindakan ini akan menghapus akun Anda secara permanen. Apakah Anda yakin?')) {
        if (confirm('Sekali lagi, apakah Anda benar-benar yakin ingin menghapus akun? Data tidak dapat dikembalikan!')) {
            // Clear all user data from localStorage
            localStorage.removeItem('userAccount');
            localStorage.removeItem('userProfilePhoto');
            
            // Clear any other user-related data if exists
            const keysToRemove = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && (key.includes('user') || key.includes('profile') || key.includes('account'))) {
                    keysToRemove.push(key);
                }
            }
            keysToRemove.forEach(key => localStorage.removeItem(key));
            
            // Show notification
            showNotification('Akun berhasil dihapus!', 'success');
            
            // Redirect to home page after short delay
            setTimeout(() => {
                window.location.href = '/';
            }, 1000);
        }
    }
}

// ===== EVENT LISTENERS =====
// Close modals when clicking outside
window.addEventListener('click', function(event) {
    const photoModal = document.getElementById('photoModal');
    if (event.target === photoModal) {
        closePhotoModal();
    }
});

// Handle escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const photoModal = document.getElementById('photoModal');
        if (photoModal.style.display === 'block') {
            closePhotoModal();
        }
        
        const sideMenu = document.getElementById('sideMenu');
        if (sideMenu.classList.contains('active')) {
            closeSideMenu();
        }
        
        if (isEditing) {
            if (confirm('Batalkan perubahan yang belum disimpan?')) {
                cancelEdit();
            }
        }
    }
});

// Prevent accidental page leave when editing
window.addEventListener('beforeunload', function(event) {
    if (isEditing) {
        event.preventDefault();
        event.returnValue = 'Anda memiliki perubahan yang belum disimpan. Yakin ingin meninggalkan halaman?';
    }
});

// Handle input validation on real-time
document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('userEmail');
    const nameInput = document.getElementById('userName');
    const passwordInput = document.getElementById('userPassword');
    
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            if (this.readOnly) return;
            
            const email = this.value.trim();
            if (email && !validateEmail(email)) {
                this.style.borderColor = 'var(--error-color)';
            } else {
                this.style.borderColor = 'var(--success-color)';
            }
        });
    }
    
    if (nameInput) {
        nameInput.addEventListener('input', function() {
            if (this.readOnly) return;
            
            const name = this.value.trim();
            if (name && name.length < 2) {
                this.style.borderColor = 'var(--error-color)';
            } else {
                this.style.borderColor = 'var(--success-color)';
            }
        });
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            if (this.readOnly) return;
            
            const password = this.value.trim();
            if (password && password.length < 6) {
                this.style.borderColor = 'var(--error-color)';
            } else {
                this.style.borderColor = 'var(--success-color)';
            }
        });
    }
});

// Make functions globally available
window.openSideMenu = openSideMenu;
window.closeSideMenu = closeSideMenu;
window.openPhotoModal = openPhotoModal;
window.closePhotoModal = closePhotoModal;
window.previewPhoto = previewPhoto;
window.saveProfilePhoto = saveProfilePhoto;
window.removeProfilePhoto = removeProfilePhoto;
window.editField = editField;
window.saveChanges = saveChanges;
window.cancelEdit = cancelEdit;
window.togglePassword = togglePassword;
window.handleLogout = handleLogout;
window.handleDeleteAccount = handleDeleteAccount;