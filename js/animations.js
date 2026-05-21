/* ============================================
   Zhengzhou Zeyao Media Technology Co., Ltd.
   Advanced Animations
   ============================================ */

// Scroll-based animations
class ScrollAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupScrollObserver();
        this.setupParallax();
        this.setupTiltEffect();
        this.setupMagneticEffect();
    }
    
    setupScrollObserver() {
        const animatedElements = document.querySelectorAll('[data-animate]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const animation = entry.target.dataset.animate;
                    const delay = entry.target.dataset.animateDelay || 0;
                    
                    setTimeout(() => {
                        entry.target.classList.add('animate', `animate-${animation}`);
                    }, delay);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(el => observer.observe(el));
    }
    
    setupParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            parallaxElements.forEach(el => {
                const speed = parseFloat(el.dataset.parallax) || 0.5;
                const yPos = scrollY * speed;
                el.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
    
    setupTiltEffect() {
        const tiltElements = document.querySelectorAll('[data-tilt]');
        
        tiltElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });
        });
    }
    
    setupMagneticEffect() {
        const magneticElements = document.querySelectorAll('[data-magnetic]');
        
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0, 0)';
            });
        });
    }
}

// Text split animation
class TextSplitAnimation {
    constructor(element, options = {}) {
        this.element = element;
        this.options = {
            type: options.type || 'chars', // 'chars', 'words', 'lines'
            animation: options.animation || 'fadeInUp',
            stagger: options.stagger || 50,
            ...options
        };
        this.split();
    }
    
    split() {
        const text = this.element.textContent;
        this.element.innerHTML = '';
        this.element.style.visibility = 'visible';
        
        if (this.options.type === 'chars') {
            this.splitChars(text);
        } else if (this.options.type === 'words') {
            this.splitWords(text);
        }
    }
    
    splitChars(text) {
        const chars = text.split('');
        chars.forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.transition = `all 0.5s ease ${index * this.options.stagger}ms`;
            this.element.appendChild(span);
        });
        
        this.animate();
    }
    
    splitWords(text) {
        const words = text.split(' ');
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word;
            span.style.display = 'inline-block';
            span.style.marginRight = '0.3em';
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.transition = `all 0.5s ease ${index * this.options.stagger}ms`;
            this.element.appendChild(span);
        });
        
        this.animate();
    }
    
    animate() {
        setTimeout(() => {
            const spans = this.element.querySelectorAll('span');
            spans.forEach(span => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            });
        }, 100);
    }
}

// Initialize text animations
function initTextAnimations() {
    const splitTexts = document.querySelectorAll('[data-split]');
    splitTexts.forEach(el => {
        const type = el.dataset.split || 'chars';
        const stagger = parseInt(el.dataset.stagger) || 50;
        new TextSplitAnimation(el, { type, stagger });
    });
}

// Ripple effect
function createRipple(event) {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Initialize ripple effects
function initRippleEffects() {
    const rippleButtons = document.querySelectorAll('.btn-ripple');
    rippleButtons.forEach(btn => {
        btn.addEventListener('click', createRipple);
    });
}

// Typewriter effect
class Typewriter {
    constructor(element, options = {}) {
        this.element = element;
        this.text = element.dataset.typewriter || element.textContent;
        this.speed = options.speed || 50;
        this.delay = options.delay || 0;
        this.cursor = options.cursor !== false;
        this.loop = options.loop || false;
        
        this.init();
    }
    
    init() {
        this.element.textContent = '';
        if (this.cursor) {
            this.element.style.borderRight = '2px solid';
        }
        
        setTimeout(() => this.type(), this.delay);
    }
    
    type() {
        if (this.index < this.text.length) {
            this.element.textContent += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.type(), this.speed);
        } else if (this.loop) {
            setTimeout(() => this.reset(), 2000);
        }
    }
    
    reset() {
        this.index = 0;
        this.element.textContent = '';
        this.type();
    }
}

function initTypewriter() {
    const typewriters = document.querySelectorAll('[data-typewriter]');
    typewriters.forEach(el => {
        new Typewriter(el);
    });
}

// Image reveal animation
function initImageReveal() {
    const reveals = document.querySelectorAll('[data-image-reveal]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    reveals.forEach(el => observer.observe(el));
}

// Stagger children animation
function initStaggerChildren() {
    const staggerContainers = document.querySelectorAll('[data-stagger-children]');
    const staggerDelay = parseInt(staggerContainers[0]?.dataset.staggerChildren) || 100;
    
    staggerContainers.forEach(container => {
        const children = container.children;
        Array.from(children).forEach((child, index) => {
            child.style.transitionDelay = `${index * staggerDelay}ms`;
            child.classList.add('stagger-item');
        });
    });
}

// Morph shape animation
function initMorphShapes() {
    const morphShapes = document.querySelectorAll('[data-morph]');
    
    morphShapes.forEach(shape => {
        const duration = parseInt(shape.dataset.morph) || 8000;
        shape.style.animation = `morph ${duration}ms ease-in-out infinite`;
    });
}

// Number counter with suffix
function animateNumberWithSuffix(element, target, suffix = '', duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const updateNumber = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + suffix;
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = target + suffix;
        }
    };
    
    updateNumber();
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();
    initTextAnimations();
    initRippleEffects();
    initTypewriter();
    initImageReveal();
    initStaggerChildren();
    initMorphShapes();
});

// Export for use
window.ZeyaoAnimations = {
    TextSplitAnimation,
    Typewriter,
    ScrollAnimations
};
