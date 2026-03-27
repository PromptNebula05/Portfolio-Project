// =========================================
// Portfolio Project - Main JAVASCRIPT
// DOM Manipulation, Event Handling, Form Validation
// =========================================

'use strict';

// =========================================
// NAVIGATION & SCROLL EFFECTS
// =========================================
class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.getElementById('navMenu');
        this.init();
    }

    init() {
        // Mobile navigation toggle
        if (this.navToggle && this.navMenu) {
            this.navToggle.addEventListener('click', () => this.toggleMobileNav());
        }

        // Close mobile nav when clicking a link
        const navLinks = this.navMenu?.querySelectorAll('a');
        navLinks?.forEach(link => {
            link.addEventListener('click', () => {
                this.navMenu.classList.remove('active');
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => this.handleScroll());

        // Smooth scroll for internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => this.smoothScroll(e));
        });
        
        // Hero scroll button
        const heroScroll = document.querySelector('.hero-scroll');
        if (heroScroll) {
            heroScroll.addEventListener('click', (e) => this.smoothScroll(e));
        }
    }

    toggleMobileNav() {
        this.navMenu.classList.toggle('active');

        // Animate hamburger icon
        const spans = this.navToggle.querySelectorAll('span');
        spans[0].style.transform = this.navMenu.classList.contains('active')
            ? 'rotate(45deg) translate(5px, 5px)'
            : 'none';
        spans[1].style.opacity = this.navMenu.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = this.navMenu.classList.contains('active')
            ? 'rotate(-45deg) translate(7px, -6px)'
            : 'none';
    }

    handleScroll() {
        if (window.scrollY > 50) {
            this.navbar?.classList.add('scrolled');
        } else {
            this.navbar?.classList.remove('scrolled');
        }
    }

    smoothScroll(e) {
        const href = e.target.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    }
}

// =========================================
// FORM VALIDATION
// =========================================
class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        if (this.form) {
            this.init();
        }
    }

    int() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });

        // Character count for message
        const messageField = document.getElementById('message');
        if (messageField) {
            messageField.addEventListener('input', () => this.updateCharCount(messageField));
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        // Clear previous messages
        this.hideMessages();

        // Validate all fields
        let isValid = true;
        const formData = new FormData(this.form);

        // Validate required fields
        const name = this.form.querySelector('#name');
        const email = this.form.querySelector('#email');
        const subject = this.form.querySelector('#subject');
        const message = this.form.querySelector('#message');
        const consent = this.form.querySelector('#consent');

        if (!this.valdateName(name)) isValid = false;
        if (!this.validateEmail(email)) isValid = false;
        if (!this.validateSubject(subject)) isValid = false;
        if (!this.validateMessage(message)) isValid = false;
        if (!this.validateConsent(constent)) isValid = false;

        // Optional phone validation
        const phone = this.form.querySelector('#phone');
        if (phone && phone.value.trim()) {
            if (!this.validatePhone(phone)) isValid = false;
        }

        if (isValid) {
            this.submitForm(formData);
        } else {
            this.showError();
        }
    }

    validateField(field) {
        const fieldId = field.id;

        switch(fieldId) {
            case 'name':
                return this.valdateName(field);
            case 'email':
                return this.validateEmail(field);
            case 'phone':
                return this.validatePhone(field);
            case 'subject':
                return this.validateSubject(field);
            case 'message':
                return this.validateMessage(field);
            case 'consent':
                return this.validateConsent(field);
            default:
                return true;
        }
    }

    validateName(field) {
        const value = field.value.trim();
        const errorElement = document.getElementById('nameError');

        if (!value) {
            this.showFieldError(field, errorElement, 'Name is required');
            return false;
        }

        if (value.length < 2) {
            this.showFieldError(field, errorElement, 'Name must be at least 2 characters');
            return false;
        }

        if (!/^[a-zA-Z/s'-]+$/.test(value)) {
            this.showFieldError(field, errorElement, 'Name can only contain letters, spaces, hyphens, and apostrophes');
            return false;
        }

        this.clearFieldError(field, errorElement);
        return true;
    }

    validateEmail(field) {
        const value = field.value.trim();
        const errorElement = document.getElementById('emailError');

        if (!value) {
            this.showFieldError(field, errorElement, 'Email is required');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            this.showFieldError(field, errorElement, 'Please enter a valid email address');
            return false;
        }

        this.clearFieldError(field, errorElement);
        return true;
    }

    validatePhone(field) {
        const value = field.value.trim();
        const errorElement = document.getElementById('phoneError');

        if (!value) {
            this.clearFieldError(field, errorElement);
            return true; // Phone is optional
        }

        const phoneRegex = /^[\d\s()+-]+$/;
        if (!phoneRegex.test(value)) {
            this.showFieldError(field, errorElement, 'Plesae enter a valid phone number');
            return false;
        }

        const digitsOnly = value.replace(/\D/g, '');
        if (digitsOnly.length < 10) {
            this.showFieldError(field, errorElement, 'Phone number must have at least 10 digits');
            return false;
        }

        this.clearFieldError(field, errorElement);
        return true;
    }

    validateSubject(field) {
        const value = field.value;
        const errorElement = document.getElementById('subjectError');

        if (!value) {
            this.showFieldError(field, errorElement, 'Please select a subject');
            return false;
        }

        this.clearFieldError(field, errorElement);
        return true;
    }

    validateMessage(field) {
        const value = field.value.trim();
        const errorElement = document.getElementById('messageError');

        if (!value) {
            this.showFieldError(field, errorElement, 'Message is required');
            return false;
        }

        if (value.length < 10) {
            this.showFieldError(field, errorElement, 'Message must be at least 10 characters');
            return false;
        }

        if (value.length > 500) {
            this.showFieldError(field, errorElement, 'Message must be 500 characters or less');
            return false;
        }

        this.clearFieldError(field, errorElement);
        return true;
    }

    validateConsent(field) {
        const errorElement = document.getElementById('consentError');

        if (!field.checked) {
            this.showFieldError(field, errorElement, 'You must agree to be contacted');
            return false;
        }

        this.clearFieldError(field, errorElement);
        return true;
    }

    showFieldError(field, errorElement, message) {
        field.classList.add('error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }

    clearFieldError(field, errorElement) {
        field.classList.remove('error');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }
    }

    clearError(field) {
        field.classList.remove('error');
    }

    updateCharCount(field) {
        const charCount = document.getElementById('charCount');
        if (charCount) {
            const length = field.value.length;
            const maxLength = 500;
            charCount.textContent = `${length} / ${maxLength} characters`;

            if (length > maxLength) {
                charCount.style.color = 'var(--error)';
            } else if (length > maxLength * 0.9) {
                charCount.style.color = 'var(--warning)';
            } else {
                charCount.style.color = 'var(--text-light)';
            }
        }
    }

    submitForm(formData) {
        // Show loading state
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');

        btnText.style.display = 'none';
        btnLoader.style.display = 'inline';
        submitBtn.disabled = true;

        // Simulate form submission (in real app, would send to server)
        setTimeout(() => {
            // Reset button
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
            submitBtn.disabled = false;

            // Show success message
            this.showSuccess();

            // Reset form
            this.form.reset();
            this.updateCharCount(document.getElementById('message'));

            // Log form data (for demonstration)
            console.log('Form submitted with data');
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }
        }, 1500)
    }

    showSuccess() {
        const successElement = document.getElementById('formSuccess');
        if (successElement) {
            successElement.style.display = 'block';
            successElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            setTimeout(() => {
                successElement.style.display = 'none';
            }, 5000);
        }
    }

    showError() {
        const errorElement = document.getElementById('formError');
        if (errorElement) {
            errorElement.style.display = 'block';
            errorElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            setTimeout(() => {
                errorElement.style.display = 'none';
            }, 5000);
        }
    }

    hideMessages() {
        const successElement = document.getElementById('formSuccess');
        const errorElement = document.getElementById('formError');

        if (successElement) successElement.style.display = 'none';
        if (errorElement) errorElement.style.display = 'none';
    }
}

// =========================================
// PORTFOLIO FILTERING
// =========================================
class PortfolioFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.portfolioItems = document.querySelectorAll('.portfolio-item');

        if (this.filterButtons.length > 0) {
            this.init();
        }
    }

    init() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => this.filterPortfolio(button));
        });
    }

    filter(button) {
        const filterValue = button.getAttribute('data-filter');

        // Update active button
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter items
        this.portfolioItems.forEach(item => {
            const categories = item.getAttribute('data-category');

            if (filterValue === 'all') {
                item.classList.remove('hidden');
                item.style.display = 'block';
            } else {
                if (categories && categories.includes(filterValue)) {
                    item.classList.remove('hidden');
                    item.style.display = 'block';
                } else {
                    item.classList.add('hidden');
                    item.style.display = 'none';
                }
            }
        });
    }
}

// =========================================
// GALLERY & LIGHTBOX
// =========================================
class Gallery {
    constructor() {
        this.galleryItems = document.querySelectorAll('.gallery-item');
        this.filterButtons = document.querySelectorAll('.gallery-filter-btn');
        this.viewButtons = document.querySelectorAll('.view-btn');
        this.lightbox = document.getElementById('lightbox');
        this.currentImageIndex = 0;
        this.images = [];

        if (this.galleryItems.length > 0) {
            this.init();
        }
    }

    init() {
        // Initialize filter buttons
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => this.filter(button));
        });

        // Initialize toggle
        this.viewButtons.forEach(button => {
            button.addEventListener('click', () => this.toggleView(button));
        });

        // Initialize lightbox
        this.initLightbox();

        // Collect all images
        this.collectImages();
    }

    filter(button) {
        const filterValue = button.getAttribute('data-filter');

        // Update active button
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter items
        this.galleryItems.forEach(item => {
            const categories = item.getAttribute('data-category');

            if (filterValue === 'all') {
                item.classList.remove('hidden');
            } else {
                if (categories && categories.includes(filterValue)) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            }
        });

        // Update image collection
        this.collectImages();
    }

    toggleView(button) {
        const viewType = button.getAttribute('data-view');
        const galleryGrid = document.getElementById('galleryGrid');

        // Update active button
        this.viewButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Toggle view
        if (viewType === 'list') {
            galleryGrid.style.gridTemplateColumns = '1fr';
        } else {
            galleryGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
        }
    }

    collectImages() {
        this.images = [];
        this.galleryItems.forEach((item, index) => {
            if (!item.classList.contains('hidden')) {
                const img = item.querySelector('.gallery-image img');
                const caption = item.querySelector('.gallery-caption h4')?.textContent || '';
                this.images.push({
                    src: img.src,
                    alt: img.alt,
                    caption: caption,
                    element: item
                });
            }
        });
    }

    initLightbox() {
        // Open lightbox on image click
        const viewButtons = document.querySelectorAll('.view-full-btn');
        viewButtons.forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const imageSrc = btn.getAttribute('data-image');
                const imageIndex = this.images.findIndex(img => img.src.includes(imageSrc));
                this.openLightbox(imageIndex >= 0 ? imageIndex : 0);
            });
        });

        // Lightbox controls
        const closeBtn = document.getElementById('lightboxClose');
        const prevBtn = document.getElementById('lightboxPrev');
        const nextBtn = document.getElementById('lightboxNext');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeLightbox());
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousImage());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextImage());
        }

        // Close on background click
        if (this.lightbox) {
            this.lightbox.addEventListener('click', (e) => {
                if (e.target === this.lightbox) {
                    this.closeLightbox();
                }
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.lightbox && this.lightbox.style.display === 'flex'){
                if (e.key === 'Escape') this.closeLightbox();
                if (e.key === 'ArrowLeft') this.previousImage();
                if (e.key === 'ArrowRight') this.nextImage();
            }
        });
    }

    openLightbox(index) {
        this.currentImageIndex = index;
        this.updateLightboxImage();
        if (this.lightbox) {
            this.lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }

    closeLightbox() {
        if (this.lightbox) {
            this.lightbox.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    previousImage() {
        this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
        this.updateLightboxImage();
    }

    nextImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
        this.updateLightboxImage();
    }

    updateLightboxImage() {
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxCaption = document.getElementById('lightboxCaption');

        if (lightboxImage && this.images[this.currentImageIndex]) {
            const currentImage = this.images[this.currentImageIndex];
            lightboxImage.src = currentImage.src;
            lightboxImage.alt = currentImage.alt;

            if (lightboxCaption) {
                lightboxCaption.textContent = currentImage.caption;
            }
        }
    }
}

// =========================================
// SKILL PROGRESS ANIMATION
// =========================================
class SkillAnimator {
    constructor() {
        this.skillBars = document.querySelectorAll('.skill-progress');
        if (this.skillBars.length > 0) {
            this.init();
        }
    }

    init() {
        // Intersection Observer for animation on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSkill(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.skillBars.forEach(bar => observer.observe(bar));
    }

    animateSkill(bar) {
        const progress = bar.getAttribute('data-progress');
        setTimeout(() => {
            bar.style.width = `${progress}%`;
        }, 100);
    }
}

// =========================================
// STAT COUNTER ANIMATION
// =========================================
class StatCounter {
    constructor() {
        this.statNumbers = document.querySelectorAll('.stat-number');
        if (this.statNumbers.length > 0) {
            this.init();
        }
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.statNumbers.forEach(stat => observer.observe(stat));
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count')) || 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    }
}

// =========================================
// RESUME DOWNLOAD
// =========================================
class ResumeDownloader {
    constructor() {
        this.downloadBtn = document.getElementById('downloadResume');
        if (this.downloadBtn) {
            this.init();
        }
    }

    init() {
        this.downloadBtn.addEventListener('click', () => this.download());
    }

    download() {
        window.open('assets/Morgan_Rogers_SWE_Resume.pdf', '_blank');
    }
}

// =========================================
// SCROLL ANIMATIONS
// =========================================
class ScrollAnimations {
    constructor() {
        this.animatedElements = document.querySelectorAll('[data-animate]');
        if (this.animatedElements.length > 0) {
            this.init();
        }
    }

    init () {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const animationType = entry.target.getAttribute('data-animate');
                    entry.target.classList.add(animationType);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        this.animatedElements.forEach(el => observer.observe(el));
    }
}

// =========================================
// THEME PREFERENCES (Optional Enhancement)
// =========================================
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    toggleTheme(){
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
    }
}

// =========================================
// INITIALIZE ALL COMPONENTS
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new Navigation();
    new FormValidator('contactForm');
    new PortfolioFilter();
    new Gallery();
    new SkillAnimator();
    new StatCounter();
    new ResumeDownloader();
    new ScrollAnimations();
    new ThemeManager();

    console.log('Portfolio site initialized successfully! 🚀');
});

// =========================================
// UTILITY FUNCTIONS
// =========================================

// Debounce function for performance
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Navigation,
        FormValidator,
        PortfolioFilter,
        Gallery,
        SkillAnimator,
        StatCounter,
        ScrollAnimations,
        ThemeManager
    };
}
