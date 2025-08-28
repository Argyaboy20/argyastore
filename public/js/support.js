document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const supportForm = document.getElementById('supportForm');
    const phoneInput = document.getElementById('phone');
    const fileInput = document.getElementById('image');
    const fileDisplay = document.querySelector('.file-upload-display');
    const uploadedFile = document.querySelector('.uploaded-file');
    const removeFileBtn = document.querySelector('.remove-file');
    const complaintTextarea = document.getElementById('complaint');
    const charCounter = document.querySelector('.char-counter .current');
    const liveChatBtn = document.getElementById('liveChatBtn');
    const successModal = document.getElementById('successModal');

    // Phone input validation
    phoneInput.addEventListener('input', function() {
        // Remove non-numeric characters
        let value = this.value.replace(/[^\d]/g, '');
        
        // Limit to reasonable length
        if (value.length > 13) {
            value = value.slice(0, 13);
        }
        
        this.value = value;
        
        // Visual feedback for valid phone number
        if (value.length >= 10 && value.length <= 13) {
            this.style.borderColor = 'var(--success-color)';
        } else if (value.length > 0) {
            this.style.borderColor = 'var(--warning-color)';
        } else {
            this.style.borderColor = 'var(--border-color)';
        }
    });

    // File upload handling
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            // Validate file size (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                alert('File terlalu besar! Maksimal 5MB.');
                this.value = '';
                return;
            }
            
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('File harus berupa gambar!');
                this.value = '';
                return;
            }
            
            // Show uploaded file
            fileDisplay.style.display = 'none';
            uploadedFile.style.display = 'flex';
            uploadedFile.querySelector('.file-name').textContent = file.name;
        }
    });

    // Remove file
    removeFileBtn.addEventListener('click', function() {
        fileInput.value = '';
        fileDisplay.style.display = 'block';
        uploadedFile.style.display = 'none';
    });

    // Drag and drop functionality
    fileDisplay.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.style.borderColor = 'var(--primary-color)';
        this.style.backgroundColor = 'rgba(99, 102, 241, 0.1)';
    });

    fileDisplay.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.style.borderColor = 'var(--border-color)';
        this.style.backgroundColor = 'var(--bg-secondary)';
    });

    fileDisplay.addEventListener('drop', function(e) {
        e.preventDefault();
        this.style.borderColor = 'var(--border-color)';
        this.style.backgroundColor = 'var(--bg-secondary)';
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            fileInput.files = files;
            fileInput.dispatchEvent(new Event('change'));
        }
    });

    // Character counter for textarea
    complaintTextarea.addEventListener('input', function() {
        const current = this.value.length;
        const max = 500;
        
        charCounter.textContent = current;
        
        // Color coding for character count
        if (current > max * 0.9) {
            charCounter.style.color = 'var(--error-color)';
        } else if (current > max * 0.7) {
            charCounter.style.color = 'var(--warning-color)';
        } else {
            charCounter.style.color = 'var(--text-secondary)';
        }
        
        // Limit characters
        if (current > max) {
            this.value = this.value.substring(0, max);
            charCounter.textContent = max;
        }
    });

    // Auto-resize textarea
    complaintTextarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 200) + 'px';
    });

    // Form submission
    supportForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const nickname = formData.get('nickname').trim();
        const phone = formData.get('phone').trim();
        const complaint = formData.get('complaint').trim();
        
        // Validation
        if (!nickname) {
            showError('Nama panggilan harus diisi!');
            return;
        }
        
        if (!phone || phone.length < 10) {
            showError('Nomor telepon tidak valid!');
            return;
        }
        
        if (!complaint) {
            showError('Keluhan/pertanyaan harus diisi!');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Create WhatsApp message
            const file = fileInput.files[0];
            let message = `SUPPORT REQUEST
            
Nama: ${nickname}
No. HP: +62${phone}
Keluhan: ${complaint}`;
            
            if (file) {
                message += `\n\n*File terlampir: ${file.name}*`;
            }
            
            // Open WhatsApp
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/6285805279420?text=${encodedMessage}`;
            window.open(whatsappUrl, '_blank');
            
            // Show success modal
            showSuccessModal();
            
            // Reset form
            this.reset();
            removeFileBtn.click(); // Reset file upload
            complaintTextarea.style.height = 'auto';
            charCounter.textContent = '0';
            phoneInput.style.borderColor = 'var(--border-color)';
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });

    // Live chat button
    liveChatBtn.addEventListener('click', function() {
        // Open WhatsApp for live chat
        const message = encodeURIComponent('Halo, saya ingin chat langsung dengan customer service Argya Store.');
        const whatsappUrl = `https://wa.me/6285805279420?text=${message}`;
        window.open(whatsappUrl, '_blank');
    });

    // Input animations
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.closest('.form-group').classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.closest('.form-group').classList.remove('focused');
        });
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.form-container, .contact-info, .hero-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });

    // Add fadeInUp keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .form-group.focused label {
            color: var(--primary-color);
        }
        
        .form-group.focused label i {
            transform: scale(1.1);
        }
    `;
    document.head.appendChild(style);
});

// Utility functions
function showError(message) {
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = 'error-toast';
    toast.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
    `;
    
    // Style the toast
    Object.assign(toast.style, {
        position: 'fixed',
        top: '2rem',
        right: '2rem',
        background: 'var(--error-color)',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        boxShadow: 'var(--shadow-lg)',
        zIndex: '10001',
        animation: 'slideInRight 0.3s ease',
        fontWeight: '500'
    });
    
    document.body.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
    
    // Add slide animations
    if (!document.querySelector('#toast-animations')) {
        const toastStyle = document.createElement('style');
        toastStyle.id = 'toast-animations';
        toastStyle.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(toastStyle);
    }
}

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('successModal');
    if (event.target === modal) {
        closeSuccessModal();
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeSuccessModal();
    }
});

// Performance optimization: Debounce function for input events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}