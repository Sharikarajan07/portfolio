// ===============================================
// MODERN PROFESSIONAL PORTFOLIO - JAVASCRIPT
// Clean interactions with subtle 3D depth
// ===============================================

// System initialization
window.addEventListener('load', () => {
    initSystemLoader();
});

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initSmoothScrolling();
    initParallaxEffects();
    initSkillsInteraction();
    initProjectAnimations();
    init3DProjectWall();
    initCaseStudyModal();
    initContactForm();
    initScrollAnimations();
    initCardHoverEffects();
});

// ===============================================
// SYSTEM LOADER
// ===============================================
function initSystemLoader() {
    const loader = document.getElementById('system-loader');
    const mainContent = document.getElementById('main-content');
    
    if (!loader || !mainContent) return;
    
    // Hide loader after 1 second
    setTimeout(() => {
        loader.classList.add('hide');
        mainContent.classList.add('ready');
        
        // Remove loader from DOM after fade out
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 1000);
}

// ===============================================
// SMOOTH SCROLLING
// ===============================================
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===============================================
// PARALLAX EFFECTS - 3-LAYER DEPTH SYSTEM
// ===============================================
function initParallaxEffects() {
    let ticking = false;
    const hero = document.querySelector('.hero');
    
    // Mouse parallax effect
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateMouseParallax(e);
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    // Scroll parallax effect
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateScrollParallax();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    function updateMouseParallax(e) {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        const rect = hero.getBoundingClientRect();
        const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
        const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
        
        // Background layer - very subtle movement
        const heroGradient = document.querySelector('.hero-gradient');
        if (heroGradient) {
            const moveX = mouseX * 10;
            const moveY = mouseY * 10;
            heroGradient.style.transform = `translateZ(-200px) scale(1.2) translate(${moveX}px, ${moveY}px)`;
        }
        
        // Mid layer - glass cards with different depths
        const glassCards = document.querySelectorAll('.glass-card');
        glassCards.forEach((card) => {
            const depth = parseFloat(card.dataset.depth) || 0.2;
            const moveX = mouseX * 50 * depth;
            const moveY = mouseY * 50 * depth;
            const currentTransform = card.style.transform.match(/translateZ\([^)]+\)[^t]*(rotate\([^)]+\))?/);
            const zTransform = currentTransform ? currentTransform[0] : 'translateZ(-50px)';
            card.style.transform = `${zTransform} translate(${moveX}px, ${moveY}px)`;
        });
        
        // Foreground layer - subtle content movement
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            const moveX = mouseX * 15;
            const moveY = mouseY * 15;
            heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
        
        // Hero text - more noticeable tilt (2-3 degrees)
        const heroText = document.getElementById('heroText');
        if (heroText) {
            const tiltX = mouseY * -3;
            const tiltY = mouseX * 3;
            heroText.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(20px)`;
        }
    }
    
    function updateScrollParallax() {
        const scrolled = window.pageYOffset;
        
        // Parallax for gradient orbs (background)
        const orbs = document.querySelectorAll('.gradient-orb');
        orbs.forEach((orb, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = -(scrolled * speed);
            orb.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
        
        // Glass cards - mid layer depth shift
        const glassCards = document.querySelectorAll('.glass-card');
        glassCards.forEach((card) => {
            const depth = parseFloat(card.dataset.depth) || 0.2;
            const yPos = scrolled * depth * 0.5;
            const currentTransform = card.style.transform.match(/translateZ\([^)]+\)[^t]*(rotate\([^)]+\))?/);
            const baseTransform = currentTransform ? currentTransform[0] : 'translateZ(-50px)';
            card.style.transform = `${baseTransform} translateY(${yPos}px)`;
        });
        
        // Hero content - foreground layer
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && scrolled < 800) {
            const opacity = 1 - (scrolled / 800);
            heroContent.style.opacity = opacity;
        }
    }
}

// ===============================================
// SKILLS INTERACTION - ROLE-BASED
// ===============================================
function initSkillsInteraction() {
    const roleTabs = document.querySelectorAll('.role-tab');
    const roleCards = document.querySelectorAll('.role-card');
    
    if (roleTabs.length === 0) return;
    
    roleTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetRole = tab.dataset.role;
            
            // Update active tab
            roleTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Animate role cards with 3D transition
            roleCards.forEach(card => {
                if (card.dataset.role === targetRole) {
                    card.classList.add('active');
                } else {
                    card.classList.remove('active');
                }
            });
        });
    });
}

// ===============================================
// PROJECT ANIMATIONS
// ===============================================
function initProjectAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    
    // Stagger animation on load
    projectCards.forEach((card, index) => {
        if (!card.classList.contains('project-hidden')) {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                requestAnimationFrame(() => {
                    card.style.transition = 'opacity 0.6s cubic-bezier(0.19, 1, 0.22, 1), transform 0.6s cubic-bezier(0.19, 1, 0.22, 1)';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                });
            }, index * 100);
        }
    });
}

// ===============================================
// 3D PROJECT WALL - HORIZONTAL SCROLL
// ===============================================
function init3DProjectWall() {
    const wall = document.getElementById('projectsWall');
    const wallInner = document.querySelector('.projects-wall-inner');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!wall) return;
    
    // Horizontal scroll with mouse wheel
    wall.addEventListener('wheel', (e) => {
        e.preventDefault();
        wall.scrollLeft += e.deltaY * 2;
    }, { passive: false });
    
    // Drag to scroll
    let isDown = false;
    let startX;
    let scrollLeft;
    
    wall.addEventListener('mousedown', (e) => {
        if (e.target.closest('.project-card')) return; // Don't drag when clicking cards
        isDown = true;
        wall.style.cursor = 'grabbing';
        startX = e.pageX - wall.offsetLeft;
        scrollLeft = wall.scrollLeft;
    });
    
    wall.addEventListener('mouseleave', () => {
        isDown = false;
        wall.style.cursor = 'grab';
    });
    
    wall.addEventListener('mouseup', () => {
        isDown = false;
        wall.style.cursor = 'grab';
    });
    
    wall.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - wall.offsetLeft;
        const walk = (x - startX) * 2;
        wall.scrollLeft = scrollLeft - walk;
    });
    
    // 3D tilt effect based on scroll position
    wall.addEventListener('scroll', () => {
        const scrollPercent = wall.scrollLeft / (wall.scrollWidth - wall.clientWidth);
        const rotateY = -3 + (scrollPercent * 6); // -3deg to 3deg
        wallInner.style.transform = `rotateX(2deg) rotateY(${rotateY}deg)`;
    });
    
    // Touch support for mobile
    let touchStartX = 0;
    
    wall.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });
    
    wall.addEventListener('touchmove', (e) => {
        const touchX = e.touches[0].clientX;
        const diff = touchStartX - touchX;
        wall.scrollLeft += diff * 0.5;
        touchStartX = touchX;
    }, { passive: true });
    
    // Enhanced 3D card hover within wall
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.zIndex = '100';
        });
        
        card.addEventListener('mouseleave', () => {
            setTimeout(() => {
                card.style.zIndex = '1';
            }, 300);
        });
    });
}

// ===============================================
// CASE STUDY MODAL
// ===============================================
const projectData = {
    1: {
        badge: 'Hackathon Winner',
        title: 'Event Ticketing & Registration System',
        role: 'Full-Stack Development',
        challenge: 'Building a system that handles thousands of concurrent bookings during peak event registrations without performance degradation or booking conflicts.',
        solution: 'Implemented WebSocket-based real-time updates, optimistic UI patterns, and MongoDB transactions to ensure data consistency during high-concurrency scenarios.',
        tech: ['React', 'Node.js', 'MongoDB', 'WebSockets', 'Redis'],
        impact: 'Successfully handled 10,000+ concurrent users with 99.9% uptime during Naan Mudhalvan Hackathon finals.'
    },
    2: {
        badge: 'Smart India Hackathon Winner',
        title: 'VEXTA AI – Intelligent IDP System',
        role: 'AI & Full-Stack Development',
        challenge: 'Reducing manual document processing time for Individual Development Plans while maintaining accuracy and personalization.',
        solution: 'Developed a TensorFlow-based NLP pipeline that analyzes employee data and auto-generates customized development recommendations using FastAPI backend.',
        tech: ['Python', 'TensorFlow', 'React', 'FastAPI', 'PostgreSQL'],
        impact: 'Achieved 80% reduction in document processing time with 95% accuracy in skill gap identification.'
    },
    3: {
        badge: 'Security Project',
        title: 'PhishCatcher – Phishing URL Detection',
        role: 'Machine Learning & Security',
        challenge: 'Detecting increasingly sophisticated phishing URLs that evade traditional pattern-based detection systems.',
        solution: 'Built an ensemble ML model using Random Forest and XGBoost, trained on 50,000+ URLs with feature extraction from URL structure, domain age, and SSL certificates.',
        tech: ['Python', 'Scikit-learn', 'Flask', 'XGBoost', 'REST API'],
        impact: 'Achieved 97.3% detection accuracy with < 100ms response time for real-time URL scanning.'
    },
    4: {
        badge: 'Frontend',
        title: 'Travel Explorer',
        role: 'Frontend Development',
        challenge: 'Creating an immersive travel planning experience without relying on heavy media assets that slow page load.',
        solution: 'Used CSS animations, lazy loading, and optimized SVG illustrations to create smooth micro-interactions and visual depth.',
        tech: ['React', 'CSS Animations', 'Framer Motion', 'Responsive Design'],
        impact: 'Achieved perfect Lighthouse performance scores with engaging user experience.'
    },
    5: {
        badge: 'Real-Time',
        title: 'Communication App',
        role: 'Full-Stack Development',
        challenge: 'Building a messaging platform that feels instant while handling message delivery, read receipts, and online status.',
        solution: 'Implemented Socket.io for bi-directional communication, message queuing for offline delivery, and optimistic updates for perceived speed.',
        tech: ['React', 'Socket.io', 'Node.js', 'Express', 'MongoDB'],
        impact: 'Sub-50ms message delivery latency with reliable offline-to-online sync.'
    },
    6: {
        badge: 'E-Commerce',
        title: 'Online Store',
        role: 'Full-Stack Development',
        challenge: 'Building a trustworthy e-commerce experience with seamless checkout and inventory management.',
        solution: 'Developed a Redux-powered storefront with Stripe integration, real-time inventory tracking, and secure authentication.',
        tech: ['React', 'Redux', 'Node.js', 'PostgreSQL', 'Stripe'],
        impact: 'Complete e-commerce solution with cart persistence and payment processing.'
    }
};

function initCaseStudyModal() {
    const modal = document.getElementById('caseStudyModal');
    const closeBtn = document.getElementById('closeCaseStudy');
    const content = document.getElementById('caseStudyContent');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!modal || !content) return;
    
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.dataset.project;
            const data = projectData[projectId];
            
            if (!data) return;
            
            content.innerHTML = `
                <div class="case-study-header">
                    <span class="case-study-badge">${data.badge}</span>
                    <h2 class="case-study-title">${data.title}</h2>
                    <p class="case-study-role">${data.role}</p>
                </div>
                
                <div class="case-study-section">
                    <h3>The Challenge</h3>
                    <p>${data.challenge}</p>
                </div>
                
                <div class="case-study-section">
                    <h3>The Solution</h3>
                    <p>${data.solution}</p>
                </div>
                
                <div class="case-study-section">
                    <h3>Tech Stack</h3>
                    <div class="case-study-tech">
                        ${data.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                    </div>
                </div>
                
                <div class="case-study-section">
                    <h3>Impact</h3>
                    <p class="case-study-impact">${data.impact}</p>
                </div>
            `;
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    closeBtn?.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ===============================================
// VIEW MORE PROJECTS
// ===============================================
function initViewMoreProjects() {
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    const hiddenProjects = document.querySelectorAll('.project-hidden');
    
    if (!viewMoreBtn || hiddenProjects.length === 0) return;
    
    viewMoreBtn.addEventListener('click', () => {
        const isExpanded = viewMoreBtn.classList.contains('expanded');
        
        if (isExpanded) {
            // Collapse
            hiddenProjects.forEach(project => {
                project.classList.remove('show');
            });
            viewMoreBtn.classList.remove('expanded');
            viewMoreBtn.querySelector('.view-more-text').textContent = 'View More Projects';
        } else {
            // Expand
            hiddenProjects.forEach((project, index) => {
                setTimeout(() => {
                    project.classList.add('show');
                }, index * 100);
            });
            viewMoreBtn.classList.add('expanded');
            viewMoreBtn.querySelector('.view-more-text').textContent = 'View Less Projects';
        }
    });
}

// ===============================================
// CONTACT FORM
// ===============================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
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
                showFormStatus('success', 'Message sent successfully! I\'ll get back to you soon.');
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            showFormStatus('error', 'Oops! Something went wrong. Please try again or email me directly.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

function showFormStatus(type, message) {
    // Remove existing status
    const existingStatus = document.querySelector('.form-status');
    if (existingStatus) {
        existingStatus.remove();
    }
    
    // Create new status message
    const status = document.createElement('div');
    status.className = `form-status ${type}`;
    status.textContent = message;
    
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(status, form);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        status.style.opacity = '0';
        setTimeout(() => status.remove(), 300);
    }, 5000);
}

// ===============================================
// SCROLL ANIMATIONS (Intersection Observer)
// ===============================================
function initScrollAnimations() {
    // Optional: Add animate-in class to sections that should animate
    // For now, let sections show immediately
    
    // Card and element animations
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                cardObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements that should fade in
    const elementsToAnimate = document.querySelectorAll('.github-content');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.19, 1, 0.22, 1)';
        cardObserver.observe(el);
    });
}

// ===============================================
// CARD HOVER EFFECTS - PROFESSIONAL 3D TILT
// ===============================================
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.project-card, .achievement-card, .contact-card');
    
    cards.forEach(card => {
        // Add shine overlay element
        const shine = document.createElement('div');
        shine.className = 'card-shine';
        card.appendChild(shine);
        
        card.addEventListener('mousemove', handleCardMouseMove);
        card.addEventListener('mouseleave', handleCardMouseLeave);
        card.addEventListener('mouseenter', handleCardMouseEnter);
    });
}

function handleCardMouseEnter(e) {
    const card = e.currentTarget;
    card.style.transition = 'transform 0.1s ease-out, box-shadow 0.3s ease-out';
}

function handleCardMouseMove(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // More dramatic tilt (5-8 degrees)
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    
    // Dynamic lighting position
    const gradientX = (x / rect.width) * 100;
    const gradientY = (y / rect.height) * 100;
    
    // Z-axis lift on hover
    card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateZ(30px)
        scale3d(1.02, 1.02, 1.02)
    `;
    
    // Update shine effect
    const shine = card.querySelector('.card-shine');
    if (shine) {
        shine.style.background = `radial-gradient(circle at ${gradientX}% ${gradientY}%, rgba(255,255,255,0.3) 0%, transparent 60%)`;
        shine.style.opacity = '1';
    }
}

function handleCardMouseLeave(e) {
    const card = e.currentTarget;
    card.style.transition = 'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), box-shadow 0.5s ease-out';
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) scale3d(1, 1, 1)';
    
    const shine = card.querySelector('.card-shine');
    if (shine) {
        shine.style.opacity = '0';
    }
}

// ===============================================
// PERFORMANCE OPTIMIZATIONS
// ===============================================

// Debounce function for scroll events
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

// Throttle function for frequent events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===============================================
// KEYBOARD ACCESSIBILITY
// ===============================================
document.addEventListener('keydown', (e) => {
    // Add keyboard navigation support
    if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('user-is-tabbing');
});

// ===============================================
// REDUCED MOTION SUPPORT
// ===============================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable parallax and complex animations
    document.querySelectorAll('[data-parallax]').forEach(el => {
        el.style.transform = 'none';
    });
    
    // Disable glass card animations
    document.querySelectorAll('.glass-card').forEach(card => {
        card.style.animation = 'none';
        card.style.transform = 'none';
    });
    
    // Disable gradient orb animations
    document.querySelectorAll('.gradient-orb').forEach(orb => {
        orb.style.animation = 'none';
    });
    
    // Ensure all content is visible
    document.querySelectorAll('.section, .achievement-card, .section-title, .github-content').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
    });
}

console.log('🚀 Portfolio loaded with premium 3D depth system');
console.log('✨ Features: Hero text tilt, Z-axis depth, glassmorphism, professional animations');
console.log('🎯 Optimized for recruiters and hiring managers');
console.log('💼 Built by Sharika Rajan - Full-Stack Developer');

// Add subtle entrance for hero text
window.addEventListener('load', () => {
    const heroText = document.getElementById('heroText');
    if (heroText) {
        setTimeout(() => {
            heroText.style.opacity = '1';
        }, 800);
    }
});
