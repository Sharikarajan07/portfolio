// ===============================================
// ELITE PORTFOLIO - INTERACTIVE JAVASCRIPT
// Real 3D Effects with Depth and Motion
// Professional Senior-Level Interactions
// ===============================================

// System initialization
window.addEventListener('load', () => {
    initSystemLoader();
});

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initSkillsInteraction();
    initProjectAnimations();
    initContactForm();
    initScrollEffects();
    initSmoothScroll();
    init3DEffects();
    initHero3D();
    initParallaxLayers();
    initParticles();
    initEnhancedAnimations();
    initViewMoreProjects();
    initKeyboardNavigation();
    initCursorLighting();
});

// ===============================================
// SYSTEM INITIALIZATION LOADER
// ===============================================
function initSystemLoader() {
    const loader = document.getElementById('system-loader');
    const mainContent = document.getElementById('main-content');
    
    if (!loader || !mainContent) return;
    
    // Hide loader after 1.5 seconds
    setTimeout(() => {
        loader.classList.add('hide');
        mainContent.classList.add('ready');
        
        // Remove loader from DOM after fade out
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 1500);
}

// ===============================================
// KEYBOARD NAVIGATION
// ===============================================
function initKeyboardNavigation() {
    const projectCards = document.querySelectorAll('.project-card');
    const skillCategories = document.querySelectorAll('.skill-category');
    
    // Make project cards keyboard focusable
    projectCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
    
    // Improve skill category navigation
    skillCategories.forEach((category, index) => {
        category.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' && index < skillCategories.length - 1) {
                e.preventDefault();
                skillCategories[index + 1].focus();
            }
            if (e.key === 'ArrowUp' && index > 0) {
                e.preventDefault();
                skillCategories[index - 1].focus();
            }
        });
    });
}

// ===============================================
// CURSOR-AWARE LIGHTING
// ===============================================
function initCursorLighting() {
    const cards = document.querySelectorAll('.project-card, .achievement-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / centerY;
            const angleY = (x - centerX) / centerX;
            
            // Subtle lighting effect
            const lightX = 50 + (angleY * 20);
            const lightY = 50 + (angleX * 20);
            
            card.style.setProperty('--light-x', `${lightX}%`);
            card.style.setProperty('--light-y', `${lightY}%`);
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.removeProperty('--light-x');
            card.style.removeProperty('--light-y');
        });
    });
}

// ===============================================
// SKILLS SECTION INTERACTION
// ===============================================
function initSkillsInteraction() {
    const categories = document.querySelectorAll('.skill-category');
    const skillLists = document.querySelectorAll('.skills-list');

    categories.forEach(category => {
        category.addEventListener('click', () => {
            const targetCategory = category.dataset.category;
            
            // Update active category button
            categories.forEach(cat => cat.classList.remove('active'));
            category.classList.add('active');
            
            // Update displayed skills
            skillLists.forEach(list => {
                list.classList.remove('active');
                if (list.dataset.category === targetCategory) {
                    list.classList.add('active');
                    
                    // Re-trigger animations
                    const skillItems = list.querySelectorAll('.skill-item');
                    skillItems.forEach(item => {
                        item.style.animation = 'none';
                        setTimeout(() => {
                            item.style.animation = '';
                        }, 10);
                    });
                }
            });
        });
    });
}

// ===============================================
// PROJECT CARDS ANIMATION
// ===============================================
function initProjectAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        card.style.setProperty('--index', index);
        
        // Add click interaction for mobile
        card.addEventListener('click', function() {
            // Toggle expanded state on mobile
            if (window.innerWidth <= 768) {
                this.classList.toggle('expanded');
            }
        });
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        observer.observe(card);
    });
}

// ===============================================
// CONTACT FORM HANDLING (Formspree Integration)
// ===============================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            try {
                const formData = new FormData(form);
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Success
                    submitButton.textContent = '✓ Message Sent!';
                    submitButton.style.background = '#10b981';
                    form.reset();
                    
                    setTimeout(() => {
                        submitButton.textContent = originalText;
                        submitButton.disabled = false;
                        submitButton.style.background = '';
                    }, 3000);
                } else {
                    // Error
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                submitButton.textContent = '✗ Failed. Try again.';
                submitButton.style.background = '#ef4444';
                
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    submitButton.style.background = '';
                }, 3000);
            }
        });
    }
}

// ===============================================
// SCROLL EFFECTS
// ===============================================
function initScrollEffects() {
    // Fade in sections on scroll
    const sections = document.querySelectorAll('.section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    sections.forEach(section => {
        if (!section.classList.contains('hero')) {
            section.style.opacity = '0';
            section.style.transform = 'translateY(50px)';
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            sectionObserver.observe(section);
        }
    });
    
    // Achievement cards stagger
    const achievementCards = document.querySelectorAll('.achievement-card');
    const achievementObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.2
    });
    
    achievementCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        achievementObserver.observe(card);
    });
}

// ===============================================
// SMOOTH SCROLL
// ===============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===============================================
// PARALLAX EFFECT (Subtle)
// ===============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroGradient = document.querySelector('.hero-gradient');
    
    if (heroGradient && scrolled < window.innerHeight) {
        heroGradient.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroGradient.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// ===============================================
// 3D MOUSE TRACKING FOR CARDS
// ===============================================
function init3DEffects() {
    const cards = document.querySelectorAll('.project-card, .achievement-card, .contact-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * 10; // Max 10deg
            const rotateY = ((x - centerX) / centerX) * -10; // Max 10deg
            
            card.style.setProperty('--rotate-x', `${rotateX}deg`);
            card.style.setProperty('--rotate-y', `${rotateY}deg`);
            card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
            card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--rotate-x', '0deg');
            card.style.setProperty('--rotate-y', '0deg');
        });
    });
}

// ===============================================
// HERO 3D CAMERA MOVEMENT
// ===============================================
function initHero3D() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (!hero || !heroContent) return;
    
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const moveX = ((x - centerX) / centerX) * 30; // Camera shift
        const moveY = ((y - centerY) / centerY) * 30;
        
        heroContent.style.transform = `
            translateX(${moveX}px) 
            translateY(${moveY}px) 
            translateZ(0px)
        `;
    });
    
    hero.addEventListener('mouseleave', () => {
        heroContent.style.transform = 'translateX(0) translateY(0) translateZ(0)';
    });
}

// ===============================================
// PARALLAX DEPTH LAYERS (Scroll-based 3D)
// ===============================================
function initParallaxLayers() {
    const layers = [
        { selector: '.hero-name', speed: 0.3, depth: 100 },
        { selector: '.hero-role', speed: 0.5, depth: 80 },
        { selector: '.hero-tagline', speed: 0.7, depth: 60 },
        { selector: '.hero-cta', speed: 0.9, depth: 50 }
    ];
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        if (scrolled < window.innerHeight) {
            layers.forEach(layer => {
                const element = document.querySelector(layer.selector);
                if (element) {
                    const yPos = -(scrolled * layer.speed);
                    element.style.transform = `translateY(${yPos}px) translateZ(${layer.depth}px)`;
                }
            });
        }
    });
}

// ===============================================
// PERFORMANCE: Debounce Resize Events
// ===============================================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Handle any resize-dependent logic here
        console.log('Window resized');
    }, 250);
});

// ===============================================
// UTILITY: Log Portfolio Load
// ===============================================
console.log('%c🚀 Portfolio Loaded Successfully', 'color: #14b8a6; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with clarity and purpose by Sharika Rajan', 'color: #9ca3af; font-size: 12px;');
console.log('%cFrontend Only | No Backend Simulation', 'color: #6b7280; font-size: 10px;');

// ===============================================
// PARTICLE SYSTEM
// ===============================================
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouseX = 0;
    let mouseY = 0;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.z = Math.random() * 1000;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.3;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // Mouse interaction
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                const force = (150 - distance) / 150;
                this.x -= dx * force * 0.03;
                this.y -= dy * force * 0.03;
            }
            
            // Wrap around edges
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }
        
        draw() {
            const perspective = 1000 / (1000 - this.z);
            const x = (this.x - canvas.width / 2) * perspective + canvas.width / 2;
            const y = (this.y - canvas.height / 2) * perspective + canvas.height / 2;
            const size = this.size * perspective;
            
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(20, 184, 166, ${this.opacity * perspective})`;
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'rgba(20, 184, 166, 0.5)';
            ctx.fill();
        }
    }
    
    // Create particles
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
    
    // Mouse tracking
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Connect nearby particles
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(20, 184, 166, ${0.2 * (1 - distance / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ===============================================
// ENHANCED ANIMATIONS
// ===============================================
function initEnhancedAnimations() {
    // Add shimmer effect to cards
    const cards = document.querySelectorAll('.achievement-card, .project-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.animation = 'shimmer 0.6s ease';
        });
        
        card.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
    
    // Floating shapes interaction
    const shapes = document.querySelectorAll('.shape');
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 20;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Add shimmer keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shimmer {
        0% { filter: brightness(1); }
        50% { filter: brightness(1.3); }
        100% { filter: brightness(1); }
    }
`;
document.head.appendChild(style);

// ===============================================
// VIEW MORE PROJECTS
// ===============================================
function initViewMoreProjects() {
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    const hiddenProjects = document.querySelectorAll('.project-hidden');
    
    if (!viewMoreBtn) return;
    
    viewMoreBtn.addEventListener('click', () => {
        hiddenProjects.forEach((project, index) => {
            setTimeout(() => {
                project.classList.remove('project-hidden');
                project.style.animation = 'fadeInUp 0.6s ease forwards';
            }, index * 100);
        });
        
        // Hide the button after revealing all projects
        setTimeout(() => {
            viewMoreBtn.classList.add('hide');
        }, hiddenProjects.length * 100);
    });
}
