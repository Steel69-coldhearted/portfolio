/* =====================================================
   MODERN PORTFOLIO BUNDLE SCRIPT
   All JavaScript consolidated with enhanced features
   ===================================================== */

// ===== DYNAMIC ROLE ANIMATION =====
const roles = ["Data Engineer", "Data Scientist", "Data Visualizer"];
let i = 0;
const roleText = document.getElementById("changing-text");
const typingElement = document.querySelector('.typing-text');

function changeRole() {
    if (roleText) {
        roleText.textContent = roles[i];
        i = (i + 1) % roles.length;
    }
}

// Typing animation for ho.html
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {
    if (!typingElement) return;
    
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(typeRole, isDeleting ? 50 : 100);
}

if (roleText) {
    setInterval(changeRole, 2000);
    changeRole();
}

if (typingElement) {
    typeRole();
}

// ===== CONTACT FORM HANDLING =====
const contactForm = document.getElementById("contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Thanks for reaching out! I'll get back to you soon.");
        this.reset();
    });
}

// Form submission for ho.html
function handleSubmit(event) {
    event.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    event.target.reset();
}

// ===== PARTICLE ANIMATION (p5.js) =====
// Note: Only runs if p5.js is loaded separately
let offsetAngle = 0;
let particle;
let particles = [];

function setup() {
    // Check if p5.js is loaded
    if (typeof createCanvas !== 'undefined') {
        let ctx = createCanvas(windowWidth, windowHeight);
        colorMode(HSB, 100);
        blendMode(ADD);
        noStroke();
        background(0, 0, 0);
    }
}

function draw() {
    if (typeof clear === 'undefined') return; // p5.js not loaded
    
    clear();
    background(0, 0, 0);
    offsetAngle += 0.05;

    if (touchX > 0 && touchY > 0) {
        makeParticles(1, touchX, touchY);
    } else {
        makeParticles(2, width / 2, height / 2);
    }

    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.render();
        p.update();
    }

    while (particles.length > 1000) particles.shift();
}

function makeParticles(pcount, mx, my) {
    for (let i = 0; i < pcount; i++) {
        let p = new Particle(mx, my, Math.random() * 60 + 35);
        let angle = Math.PI + Math.random() * (Math.PI * 2) - Math.PI;
        let speed = Math.random() * 4 + 4;

        p.velX = Math.sin(angle) * speed;
        p.velY = Math.cos(angle) * speed;
        p.size = Math.random() * 12 + 6;

        particles.push(p);
    }
}

function Particle(x, y, h) {
    this.posX = x;
    this.posY = y;
    this.velX = 0;
    this.velY = 0;
    this.shrink = 0.95;
    this.size = 1;
    this.drag = 0.4;
    this.gravity = 0.3;
    this.hue = h;

    this.update = function () {
        this.velX *= this.drag;
        this.velY *= this.drag;
        this.velY += this.gravity;
        this.posX += this.velX;
        this.posY += this.velY;
        this.size *= this.shrink;
    };

    this.render = function () {
        if (typeof fill !== 'undefined') {
            fill(20, 60, 200, 50);
            ellipse(this.posX, this.posY, this.size);
        }
    };
}

// ===== SKILL BARS ANIMATION =====
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate skill bars
            const skillBars = entry.target.querySelectorAll('.skill-bar-fill');
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 100);
            });

            // Animate skill progress
            const skillProgresses = entry.target.querySelectorAll('.skill-progress');
            skillProgresses.forEach((progress, index) => {
                setTimeout(() => {
                    const percentage = progress.getAttribute('data-progress');
                    progress.style.setProperty('--progress', percentage);
                    progress.style.width = percentage + '%';
                }, index * 100);
            });

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill cards and experience cards
document.querySelectorAll('.skill-card, .exp-card').forEach(card => {
    observer.observe(card);
});

// ===== PROJECT CARDS ANIMATION =====
const projectObserverOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate bar charts
            const barFills = entry.target.querySelectorAll('.bar-fill');
            barFills.forEach(bar => {
                const percent = bar.getAttribute('data-percent');
                setTimeout(() => {
                    bar.style.width = percent + '%';
                }, 200);
            });

            // Animate line chart points
            const linePoints = entry.target.querySelectorAll('.line-point');
            linePoints.forEach((point, index) => {
                setTimeout(() => {
                    point.style.opacity = '1';
                    point.style.transform = 'translate(-50%, 50%) scale(1)';
                }, index * 100);
            });

            // Animate comparison bars
            const comparisonFills = entry.target.querySelectorAll('.comparison-fill');
            comparisonFills.forEach(fill => {
                setTimeout(() => {
                    fill.style.width = fill.style.width || '100%';
                }, 200);
            });

            projectObserver.unobserve(entry.target);
        }
    });
}, projectObserverOptions);

// Observe all project cards
document.querySelectorAll('.project-card').forEach(card => {
    projectObserver.observe(card);
});

// Initialize line points as hidden
document.querySelectorAll('.line-point').forEach(point => {
    point.style.opacity = '0';
    point.style.transform = 'translate(-50%, 50%) scale(0)';
    point.style.transition = 'all 0.5s ease';
});

// Add smooth hover effect for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const barFills = card.querySelectorAll('.bar-fill');
        barFills.forEach(bar => {
            const percent = bar.getAttribute('data-percent');
            bar.style.width = percent + '%';
        });
    });
});

// ===== TECH STACK ANIMATION =====
const techObserverOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const techObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate skill cards
            const skillCards = entry.target.querySelectorAll('.skill-card');
            skillCards.forEach((card, index) => {
                setTimeout(() => {
                    const progress = card.querySelector('.skill-progress');
                    if (progress) {
                        const percentage = progress.getAttribute('data-progress');
                        progress.style.setProperty('--progress', percentage);
                        progress.style.width = percentage + '%';
                    }
                }, index * 100);
            });

            // Animate stats
            const progressRing = entry.target.querySelector('.progress-ring-circle');
            if (progressRing) {
                const progress = progressRing.style.getPropertyValue('--progress');
                setTimeout(() => {
                    progressRing.style.strokeDashoffset = `calc(251.2 - (251.2 * ${progress}) / 100)`;
                }, 200);
            }

            // Animate sparkline bars
            const sparklineBars = entry.target.querySelectorAll('.sparkline-bar');
            sparklineBars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.opacity = '1';
                    bar.style.transform = 'scaleY(1)';
                }, index * 150);
            });

            // Animate timeline dots
            const timelineDots = entry.target.querySelectorAll('.timeline-dot.active');
            timelineDots.forEach((dot, index) => {
                setTimeout(() => {
                    dot.style.opacity = '1';
                    dot.style.transform = 'scale(1)';
                }, index * 200);
            });

            // Animate badges
            const badges = entry.target.querySelectorAll('.badge-icon');
            badges.forEach((badge, index) => {
                setTimeout(() => {
                    badge.style.opacity = '1';
                    badge.style.transform = 'scale(1)';
                }, index * 150);
            });

            techObserver.unobserve(entry.target);
        }
    });
}, techObserverOptions);

// Observe skill categories and overall stats
document.querySelectorAll('.skill-category, .overall-stats').forEach(element => {
    techObserver.observe(element);
});

// Initialize hidden elements
document.querySelectorAll('.sparkline-bar').forEach(bar => {
    bar.style.opacity = '0';
    bar.style.transform = 'scaleY(0)';
    bar.style.transition = 'all 0.5s ease';
});

document.querySelectorAll('.timeline-dot.active').forEach(dot => {
    dot.style.opacity = '0';
    dot.style.transform = 'scale(0)';
    dot.style.transition = 'all 0.5s ease';
});

document.querySelectorAll('.badge-icon').forEach(badge => {
    badge.style.opacity = '0';
    badge.style.transform = 'scale(0)';
    badge.style.transition = 'all 0.5s ease';
});

// ===== SKILL CARD HOVER EFFECT =====
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const progress = card.querySelector('.skill-progress');
        if (progress) {
            const percentage = progress.getAttribute('data-progress');
            progress.style.width = percentage + '%';
        }
    });
});

// ===== COUNTER ANIMATION =====
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValue = entry.target.querySelector('.stat-value');
            if (statValue && !statValue.classList.contains('animated')) {
                const text = statValue.textContent;
                const hasPlus = text.includes('+');
                const hasPercent = text.includes('%');
                const number = parseInt(text.replace(/[^0-9]/g, ''));

                if (!isNaN(number)) {
                    statValue.classList.add('animated');
                    statValue.textContent = '0';

                    const timer = setInterval(() => {
                        const current = parseInt(statValue.textContent);
                        if (current < number) {
                            statValue.textContent = (current + Math.ceil(number / 50));
                            if (parseInt(statValue.textContent) > number) {
                                statValue.textContent = number;
                            }
                        } else {
                            clearInterval(timer);
                        }

                        if (hasPlus) statValue.textContent += '+';
                        if (hasPercent) statValue.textContent += '%';
                    }, 30);
                }
            }
            counterObserver.unobserve(entry.target);
        }
    });
}, techObserverOptions);

document.querySelectorAll('.stat-card').forEach(card => {
    counterObserver.observe(card);
});

// ===== PARALLAX EFFECT =====
document.addEventListener('mousemove', (e) => {
    const categories = document.querySelectorAll('.skill-category');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    categories.forEach((category, index) => {
        const depth = (index + 1) * 5;
        const moveX = (mouseX - 0.5) * depth;
        const moveY = (mouseY - 0.5) * depth;

        const header = category.querySelector('.category-header');
        if (header) {
            header.style.transform = `translate(${moveX}px, ${moveY}px)`;
            header.style.transition = 'transform 0.3s ease';
        }
    });
});

// ===== SCROLL GLOW EFFECT =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const skillCards = document.querySelectorAll('.skill-card');

    skillCards.forEach((card, index) => {
        const cardTop = card.offsetTop;
        const cardHeight = card.offsetHeight;
        const windowHeight = window.innerHeight;

        if (scrolled + windowHeight > cardTop && scrolled < cardTop + cardHeight) {
            card.style.opacity = '1';
        }
    });
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});









// ===== INITIAL LOAD ANIMATIONS =====
window.addEventListener('load', () => {
    // Animate load-animation elements
    const loadAnimationElements = document.querySelectorAll('.load-animation');
    loadAnimationElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Fade in sections on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        sectionObserver.observe(section);
    });
});

// ===== RESPONSIVE MENU TOGGLE =====
function setupResponsiveMenu() {
    // Create menu toggle if needed
    const header = document.querySelector('.main-header');
    const nav = document.querySelector('.main-header nav');
    
    if (!header || !nav) return;
    
    // Add mobile menu functionality here if needed
}

document.addEventListener('DOMContentLoaded', setupResponsiveMenu);







var experienceSwiper = new Swiper(".experience-swiper", {
            effect: "cards",
            cardsEffect: {
                rotate: true,
                perSlideRotate: 2,   // This creates the slight tilt of the back card
                perSlideOffset: 30,  // This makes the back card visible on the side
                slideShadows: false,
            },
            grabCursor: true,
            initialSlide: 0,
            speed: 500,
            loop: true,
            
            mousewheel: {
                invert: false,
            },
        });

        function openExperienceModal(modalId) {
            document.getElementById(modalId).classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeExperienceModal(modalId) {
            document.getElementById(modalId).classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // Close modal when clicking outside
        window.onclick = function(event) {
            if (event.target.classList.contains('experience-modal')) {
                event.target.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }

        // Close modal with Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                const modals = document.querySelectorAll('.experience-modal.active');
                modals.forEach(modal => {
                    modal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                });
            }
        });


