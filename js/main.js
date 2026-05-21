/* ============================================
   Zhengzhou Zeyao Media Technology Co., Ltd.
   Main JavaScript
   ============================================ */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Initialize all modules
    initNavigation();
    initMobileMenu();
    initScrollReveal();
    initCounters();
    initSmoothScroll();
    initBackToTop();
    initNavbarScroll();
    initParallax();
    initParticleEffect();
});

/* ==================== Navigation ==================== */
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentPath.endsWith(href) || (currentPath === '/' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

/* ==================== Mobile Menu ==================== */
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-nav .nav-link');
    
    if (!mobileMenuBtn || !mobileMenu) return;
    
    // Toggle menu
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Close menu on link click
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
    
    // Close menu on resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991 && mobileMenu.classList.contains('active')) {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
}

/* ==================== Scroll Reveal Animation ==================== */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate, .stagger-reveal');
    
    if (!revealElements.length) return;
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optional: unobserve after revealing
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

/* ==================== Counter Animation ==================== */
function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    
    if (!counters.length) return;
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-counter'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

/* ==================== Smooth Scroll ==================== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ==================== Back to Top Button ==================== */
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) {
        // Create back to top button if it doesn't exist
        const btn = document.createElement('button');
        btn.className = 'back-to-top';
        btn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 15l-6-6-6 6"/>
            </svg>
        `;
        btn.setAttribute('aria-label', 'Back to top');
        document.body.appendChild(btn);
        
        btn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #0066FF, #00D4AA);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 999;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 102, 255, 0.3);
        `;
        
        btn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                btn.style.opacity = '1';
                btn.style.visibility = 'visible';
            } else {
                btn.style.opacity = '0';
                btn.style.visibility = 'hidden';
            }
        });
    }
}

/* ==================== Navbar Scroll Effect ==================== */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

/* ==================== Parallax Effect ==================== */
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    if (!parallaxElements.length) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

/* ==================== Particle Effect ==================== */
function initParticleEffect() {
    const particleContainer = document.querySelector('.particles');
    
    if (!particleContainer) return;
    
    // Create particles
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            animation-delay: ${Math.random() * 10}s;
            animation-duration: ${Math.random() * 20 + 10}s;
        `;
        particleContainer.appendChild(particle);
    }
}

/* ==================== Form Handling ==================== */
function initForms() {
    const forms = document.querySelectorAll('form[data-ajax]');
    
    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="loader"></span> Sending...';
            
            try {
                // Simulate form submission
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success message
                showNotification('Thank you! Your message has been sent successfully.', 'success');
                this.reset();
            } catch (error) {
                showNotification('Sorry, there was an error. Please try again.', 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    });
}

/* ==================== Notification System ==================== */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

/* ==================== Lazy Loading Images ==================== */
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if (!lazyImages.length) return;
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
}

/* ==================== Tabs ==================== */
function initTabs() {
    const tabContainers = document.querySelectorAll('[data-tabs]');
    
    tabContainers.forEach(container => {
        const buttons = container.querySelectorAll('[data-tab-button]');
        const contents = container.querySelectorAll('[data-tab-content]');
        
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.dataset.tabButton;
                
                // Remove active class from all buttons
                buttons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                // Hide all content
                contents.forEach(content => content.classList.remove('active'));
                // Show selected content
                const targetContent = container.querySelector(`[data-tab-content="${tabId}"]`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    });
}

/* ==================== Accordion ==================== */
function initAccordion() {
    const accordions = document.querySelectorAll('[data-accordion]');
    
    accordions.forEach(accordion => {
        const items = accordion.querySelectorAll('[data-accordion-item]');
        
        items.forEach(item => {
            const header = item.querySelector('[data-accordion-header]');
            const content = item.querySelector('[data-accordion-content]');
            
            header.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');
                
                // Close all items
                items.forEach(i => i.classList.remove('active'));
                
                // Toggle current item
                if (!isOpen) {
                    item.classList.add('active');
                }
            });
        });
    });
}

/* ==================== Modal ==================== */
function initModals() {
    const modalTriggers = document.querySelectorAll('[data-modal-trigger]');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.dataset.modalTrigger;
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.classList.add('active');
                document.body.classList.add('no-scroll');
            }
        });
    });
    
    // Close modal on backdrop click
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => modal.classList.remove('active'));
            document.body.classList.remove('no-scroll');
        }
    });
}

/* ==================== Export Functions ==================== */
window.ZeyaoWebsite = {
    showNotification,
    initForms,
    initLazyLoading,
    initTabs,
    initAccordion,
    initModals
};
