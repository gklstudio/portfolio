// Felicity Clone - Enhanced Interactive JavaScript with Advanced Animations

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced scroll animations with intersection observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Stagger animation for multiple elements
                const siblings = entry.target.parentElement.children;
                Array.from(siblings).forEach((sibling, index) => {
                    if (sibling.classList.contains('glass')) {
                        setTimeout(() => {
                            sibling.classList.add('animate-in');
                        }, index * 100);
                    }
                });
            }
        });
    }, observerOptions);

    // Observe all glass elements for staggered animations
    const glassElements = document.querySelectorAll('.glass, .section-title, .step, .feature, .testimonial, .blog-card');
    glassElements.forEach(el => {
        observer.observe(el);
    });

    // Enhanced button interactions
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Enhanced glass card interactions
    const glassCards = document.querySelectorAll('.glass');
    glassCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.03) rotateX(5deg)';
            this.style.boxShadow = '0 25px 80px rgba(0, 0, 0, 0.25)';
            
            // Add glow effect
            this.style.borderColor = 'rgba(255, 255, 255, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
            this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
            this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        });

        // 3D tilt effect on mouse move
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `translateY(-12px) scale(1.03) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });

    // Typing animation for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid var(--secondary-color)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                heroTitle.style.borderRight = 'none';
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    // Floating particles background
    createFloatingParticles();
    
    // Enhanced form interactions
    enhanceFormInteractions();
    
    // Enhanced carousels
    enhanceCarousels();

    // Enhanced scroll effects
    let ticking = false;
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax for hero section
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.style.transform = `translateY(${rate}px)`;
        }
        
        // Floating elements
        const floatingElements = document.querySelectorAll('.phone-mockup, .laptop-mockup');
        floatingElements.forEach((el, index) => {
            const speed = 0.5 + (index * 0.2);
            el.style.transform += ` translateY(${scrolled * speed}px)`;
        });
        
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);

    // Smooth scroll for anchor links with enhanced animation
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Add loading animation to clicked link
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
                
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }

    // Testimonial carousel
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    const prevBtn = document.querySelector('.nav-btn.prev');
    const nextBtn = document.querySelector('.nav-btn.next');
    
    if (testimonialCarousel && prevBtn && nextBtn) {
        let currentIndex = 0;
        const testimonials = testimonialCarousel.querySelectorAll('.testimonial');
        const totalTestimonials = testimonials.length;
        
        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.style.display = i === index ? 'block' : 'none';
            });
        }
        
        function nextTestimonial() {
            currentIndex = (currentIndex + 1) % totalTestimonials;
            showTestimonial(currentIndex);
        }
        
        function prevTestimonial() {
            currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
            showTestimonial(currentIndex);
        }
        
        nextBtn.addEventListener('click', nextTestimonial);
        prevBtn.addEventListener('click', prevTestimonial);
        
        // Initialize
        showTestimonial(0);
        
        // Auto-rotate testimonials
        setInterval(nextTestimonial, 5000);
    }

    // Blog carousel
    const blogCarousel = document.querySelector('.blog-carousel');
    if (blogCarousel) {
        let blogIndex = 0;
        const blogCards = blogCarousel.querySelectorAll('.blog-card');
        const totalBlogs = blogCards.length;
        
        function showBlog(index) {
            blogCards.forEach((card, i) => {
                card.style.display = i >= index && i < index + 3 ? 'block' : 'none';
            });
        }
        
        function nextBlog() {
            blogIndex = Math.min(blogIndex + 1, totalBlogs - 3);
            showBlog(blogIndex);
        }
        
        function prevBlog() {
            blogIndex = Math.max(blogIndex - 1, 0);
            showBlog(blogIndex);
        }
        
        // Initialize
        showBlog(0);
    }

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        const emailInput = newsletterForm.querySelector('.email-input');
        const subscribeBtn = newsletterForm.querySelector('.btn');
        
        subscribeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const email = emailInput.value;
            if (email && isValidEmail(email)) {
                alert('Thank you for subscribing! You will receive our weekly mental health tips.');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    // Callback form
    const callbackForm = document.querySelector('.callback-form');
    if (callbackForm) {
        const phoneInput = callbackForm.querySelector('.phone-input');
        const callbackBtn = callbackForm.querySelector('.btn');
        
        callbackBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const phone = phoneInput.value;
            if (phone && isValidPhone(phone)) {
                alert('Thank you! We will call you back within 24 hours.');
                phoneInput.value = '';
            } else {
                alert('Please enter a valid phone number.');
            }
        });
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.glass, .section-title, .step, .feature, .testimonial, .blog-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Health tags interaction
    const healthTags = document.querySelectorAll('.tag');
    healthTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Remove active class from all tags
            healthTags.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tag
            this.classList.add('active');
            
            // Simulate filtering (in a real app, this would filter content)
            console.log('Selected health concern:', this.textContent);
        });
    });

    // Glass card hover effects
    const glassCards = document.querySelectorAll('.glass');
    glassCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
        });
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // WhatsApp float button
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            // In a real app, this would open WhatsApp chat
            alert('Opening WhatsApp chat...');
        });
    }

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }
});

// Floating particles background
function createFloatingParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    document.body.appendChild(particleContainer);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
            border-radius: 50%;
            opacity: ${Math.random() * 0.6 + 0.2};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 20 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        
        particleContainer.appendChild(particle);
    }
}

// Enhanced form interactions
function enhanceFormInteractions() {
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
        
        input.addEventListener('input', function() {
            if (this.value) {
                this.parentElement.classList.add('has-value');
            } else {
                this.parentElement.classList.remove('has-value');
            }
        });
    });
}

// Enhanced carousel with touch support
function enhanceCarousels() {
    const carousels = document.querySelectorAll('.testimonial-carousel, .blog-carousel');
    carousels.forEach(carousel => {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            carousel.classList.add('active');
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });
        
        carousel.addEventListener('mouseleave', () => {
            isDown = false;
            carousel.classList.remove('active');
        });
        
        carousel.addEventListener('mouseup', () => {
            isDown = false;
            carousel.classList.remove('active');
        });
        
        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        });
    });
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Add CSS for enhanced animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        25% { transform: translateY(-20px) rotate(1deg); }
        50% { transform: translateY(-10px) rotate(0deg); }
        75% { transform: translateY(-30px) rotate(-1deg); }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleEffect 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        padding: 20px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        animation: slideDown 0.3s ease-out;
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .tag.active {
        background: var(--gradient-secondary);
        color: white;
        transform: translateY(-4px) scale(1.05);
        box-shadow: 0 8px 25px rgba(248, 147, 29, 0.4);
    }
    
    .header {
        transition: transform 0.3s ease;
    }
    
    .glass {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        perspective: 1000px;
    }
    
    .btn {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
    }
    
    .field.focused {
        transform: translateY(-2px);
    }
    
    .field.focused .label {
        color: var(--primary-color);
        transform: scale(0.9);
    }
    
    .field.has-value .label {
        color: var(--primary-color);
    }
    
    .carousel.active {
        cursor: grabbing;
    }
    
    .particle {
        animation: particleFloat 15s linear infinite;
    }
    
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    /* Enhanced hover effects */
    .glass:hover {
        animation: glassHover 0.6s ease-out forwards;
    }
    
    @keyframes glassHover {
        0% { transform: translateY(0px) scale(1) rotateX(0deg) rotateY(0deg); }
        50% { transform: translateY(-15px) scale(1.05) rotateX(5deg) rotateY(5deg); }
        100% { transform: translateY(-12px) scale(1.03) rotateX(3deg) rotateY(3deg); }
    }
    
    /* Staggered animations */
    .glass:nth-child(1) { animation-delay: 0.1s; }
    .glass:nth-child(2) { animation-delay: 0.2s; }
    .glass:nth-child(3) { animation-delay: 0.3s; }
    .glass:nth-child(4) { animation-delay: 0.4s; }
    .glass:nth-child(5) { animation-delay: 0.5s; }
`;
document.head.appendChild(style);
