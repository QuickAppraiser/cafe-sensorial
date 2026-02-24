/* ============================================
   SENSORIAL'S CAFÉ — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // ---- Preloader ----
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.classList.remove('no-scroll');
            animateHero();
        }, 1200);
    });

    // Fallback: hide preloader after 3s
    setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.classList.remove('no-scroll');
    }, 3000);

    // ---- Cursor Glow ----
    const cursorGlow = document.getElementById('cursorGlow');
    let glowActive = false;

    document.addEventListener('mousemove', (e) => {
        if (!glowActive) {
            cursorGlow.classList.add('active');
            glowActive = true;
        }
        requestAnimationFrame(() => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
    });

    // ---- Hero Particles ----
    const particlesContainer = document.getElementById('heroParticles');
    if (particlesContainer) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (6 + Math.random() * 6) + 's';
            particle.style.width = (2 + Math.random() * 3) + 'px';
            particle.style.height = particle.style.width;
            particlesContainer.appendChild(particle);
        }
    }

    // ---- Navbar ----
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navLinkItems = document.querySelectorAll('.nav-link');

    // Scroll handler for navbar
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Close mobile menu on link click
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Active section tracking
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        root: null,
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinkItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // ---- Scroll Animations ----
    const animateElements = document.querySelectorAll('[data-animate]');

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, parseInt(delay));
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    });

    animateElements.forEach(el => animationObserver.observe(el));

    // ---- Hero Animation ----
    function animateHero() {
        const heroElements = document.querySelectorAll('.hero [data-animate]');
        heroElements.forEach(el => {
            const delay = el.getAttribute('data-delay') || 0;
            setTimeout(() => {
                el.classList.add('animated');
            }, parseInt(delay) + 300);
        });
    }

    // ---- Counter Animation ----
    const counters = document.querySelectorAll('[data-count]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    function animateCounter(element, target) {
        const duration = 2000;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            element.textContent = current.toLocaleString('es-CO');
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // ---- Menu Tabs ----
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuPanels = document.querySelectorAll('.menu-panel');

    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');

            menuTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            menuPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === target) {
                    panel.classList.add('active');
                }
            });
        });
    });

    // ---- Testimonials Slider ----
    const track = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');
    const dotsContainer = document.getElementById('testimonialDots');
    const cards = track ? track.querySelectorAll('.testimonial-card') : [];
    let currentSlide = 0;

    // Create dots
    if (dotsContainer && cards.length) {
        cards.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });
    }

    function goToSlide(index) {
        currentSlide = index;
        if (track) {
            track.style.transform = `translateX(-${index * 100}%)`;
        }
        const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const newIndex = currentSlide === 0 ? cards.length - 1 : currentSlide - 1;
            goToSlide(newIndex);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const newIndex = currentSlide === cards.length - 1 ? 0 : currentSlide + 1;
            goToSlide(newIndex);
        });
    }

    // Auto-advance testimonials
    let autoSlide = setInterval(() => {
        if (cards.length) {
            const newIndex = currentSlide === cards.length - 1 ? 0 : currentSlide + 1;
            goToSlide(newIndex);
        }
    }, 5000);

    // Pause auto-advance on hover
    if (track) {
        track.addEventListener('mouseenter', () => clearInterval(autoSlide));
        track.addEventListener('mouseleave', () => {
            autoSlide = setInterval(() => {
                const newIndex = currentSlide === cards.length - 1 ? 0 : currentSlide + 1;
                goToSlide(newIndex);
            }, 5000);
        });
    }

    // ---- Back to Top ----
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 600) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ---- Smooth Scroll for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // ---- Parallax effect on scroll ----
    const parallaxBg = document.querySelector('.parallax-bg');
    if (parallaxBg) {
        window.addEventListener('scroll', () => {
            const section = parallaxBg.parentElement;
            const rect = section.getBoundingClientRect();
            const speed = 0.3;
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                parallaxBg.style.transform = `translateY(${rect.top * speed}px)`;
            }
        });
    }

    // ---- Gallery hover effect ----
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            galleryItems.forEach(other => {
                if (other !== item) {
                    other.style.opacity = '0.5';
                }
            });
        });

        item.addEventListener('mouseleave', () => {
            galleryItems.forEach(other => {
                other.style.opacity = '1';
            });
        });
    });
});
