/* ============================================
   SENSORIAL'S CAFÉ — Main JavaScript v2
   Enhanced animations, interactions & effects
   ============================================ */

(function () {
    'use strict';

    // Initialize Lucide icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // ---- Preloader ----
    const preloader = document.getElementById('preloader');

    function hidePreloader() {
        preloader.classList.add('hidden');
        document.body.classList.remove('no-scroll');
        revealHero();
    }

    if (document.readyState === 'complete') {
        setTimeout(hidePreloader, 800);
    } else {
        window.addEventListener('load', () => setTimeout(hidePreloader, 1200));
        // Fallback
        setTimeout(hidePreloader, 4000);
    }

    // ---- Scroll Progress Bar ----
    const scrollProgress = document.getElementById('scrollProgress');

    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        scrollProgress.style.width = progress + '%';
    }

    // ---- Cursor Glow (throttled) ----
    const cursorGlow = document.getElementById('cursorGlow');
    let cursorX = 0, cursorY = 0, glowX = 0, glowY = 0;
    let glowActive = false;

    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
        if (!glowActive) {
            cursorGlow.classList.add('active');
            glowActive = true;
        }
    });

    function animateCursorGlow() {
        glowX += (cursorX - glowX) * 0.08;
        glowY += (cursorY - glowY) * 0.08;
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';
        requestAnimationFrame(animateCursorGlow);
    }

    if (window.innerWidth > 768) {
        animateCursorGlow();
    }

    // ---- Hero Particles ----
    const particlesContainer = document.getElementById('heroParticles');
    if (particlesContainer) {
        for (let i = 0; i < 35; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (6 + Math.random() * 6) + 's';
            const size = (2 + Math.random() * 3) + 'px';
            particle.style.width = size;
            particle.style.height = size;
            particlesContainer.appendChild(particle);
        }
    }

    // ---- Hero Text Reveal ----
    function revealHero() {
        const hero = document.querySelector('.hero');
        if (hero) {
            setTimeout(() => hero.classList.add('revealed'), 200);
        }
        // Also trigger data-animate elements in hero
        const heroElements = document.querySelectorAll('.hero [data-animate]');
        heroElements.forEach(el => {
            const delay = parseInt(el.getAttribute('data-delay') || 0);
            setTimeout(() => el.classList.add('animated'), delay + 400);
        });
    }

    // ---- Navbar: hide on scroll down, show on scroll up ----
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navLinkItems = document.querySelectorAll('.nav-link');
    let lastScrollY = 0;
    let scrollDirection = 'up';
    let ticking = false;

    function handleScroll() {
        const currentScrollY = window.scrollY;

        updateScrollProgress();

        // Navbar background
        if (currentScrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar
        if (currentScrollY > 300) {
            if (currentScrollY > lastScrollY && scrollDirection !== 'down') {
                scrollDirection = 'down';
                navbar.classList.add('nav-hidden');
            } else if (currentScrollY < lastScrollY && scrollDirection !== 'up') {
                scrollDirection = 'up';
                navbar.classList.remove('nav-hidden');
            }
        } else {
            navbar.classList.remove('nav-hidden');
        }

        lastScrollY = currentScrollY;

        // Back to top visibility
        const backToTop = document.getElementById('backToTop');
        if (currentScrollY > 600) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(handleScroll);
            ticking = true;
        }
    }, { passive: true });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Active section tracking
    const sections = document.querySelectorAll('section[id]');
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
    }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });

    sections.forEach(section => sectionObserver.observe(section));

    // ---- Scroll Animations ----
    const animateElements = document.querySelectorAll('[data-animate]');

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.getAttribute('data-delay') || 0);
                setTimeout(() => entry.target.classList.add('animated'), delay);
                animationObserver.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });

    animateElements.forEach(el => {
        // Don't re-observe hero elements (handled by revealHero)
        if (!el.closest('.hero')) {
            animationObserver.observe(el);
        }
    });

    // ---- Image Reveal ----
    const imgReveals = document.querySelectorAll('.img-reveal');
    const imgRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('revealed'), 200);
                imgRevealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    imgReveals.forEach(el => imgRevealObserver.observe(el));

    // ---- Counter Animation ----
    const counters = document.querySelectorAll('[data-count]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target, parseInt(entry.target.getAttribute('data-count')));
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
            const eased = 1 - Math.pow(1 - progress, 3);
            element.textContent = Math.round(eased * target).toLocaleString('es-CO');
            if (progress < 1) requestAnimationFrame(update);
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

    // ---- Testimonials Slider with Touch/Swipe ----
    const track = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');
    const dotsContainer = document.getElementById('testimonialDots');
    const cards = track ? track.querySelectorAll('.testimonial-card') : [];
    let currentSlide = 0;
    let autoSlideInterval;

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
        dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToSlide(currentSlide === 0 ? cards.length - 1 : currentSlide - 1);
            resetAutoSlide();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goToSlide(currentSlide === cards.length - 1 ? 0 : currentSlide + 1);
            resetAutoSlide();
        });
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            if (cards.length) {
                goToSlide(currentSlide === cards.length - 1 ? 0 : currentSlide + 1);
            }
        }, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    startAutoSlide();

    // Touch/Swipe support
    if (track) {
        let touchStartX = 0;
        let touchEndX = 0;
        let isDragging = false;
        let startTranslate = 0;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            isDragging = true;
            track.classList.add('dragging');
            clearInterval(autoSlideInterval);
        }, { passive: true });

        track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            touchEndX = e.touches[0].clientX;
            const diff = touchEndX - touchStartX;
            const current = -(currentSlide * 100);
            const percent = (diff / track.offsetWidth) * 100;
            track.style.transform = `translateX(${current + percent}%)`;
        }, { passive: true });

        track.addEventListener('touchend', () => {
            isDragging = false;
            track.classList.remove('dragging');
            const diff = touchEndX - touchStartX;
            if (Math.abs(diff) > 50) {
                if (diff < 0 && currentSlide < cards.length - 1) {
                    goToSlide(currentSlide + 1);
                } else if (diff > 0 && currentSlide > 0) {
                    goToSlide(currentSlide - 1);
                } else {
                    goToSlide(currentSlide);
                }
            } else {
                goToSlide(currentSlide);
            }
            startAutoSlide();
        });

        // Pause on hover (desktop)
        track.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        track.addEventListener('mouseleave', startAutoSlide);
    }

    // ---- Gallery Lightbox ----
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.getAttribute('data-img');
            const caption = item.getAttribute('data-caption');
            if (imgSrc && lightbox) {
                lightboxImg.src = imgSrc;
                lightboxImg.alt = caption || '';
                lightboxCaption.textContent = caption || '';
                lightbox.classList.add('active');
                document.body.classList.add('no-scroll');
            }
        });

        // Gallery dim effect
        item.addEventListener('mouseenter', () => {
            galleryItems.forEach(other => {
                if (other !== item) other.style.opacity = '0.4';
            });
        });

        item.addEventListener('mouseleave', () => {
            galleryItems.forEach(other => other.style.opacity = '1');
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.classList.remove('no-scroll');
        setTimeout(() => {
            lightboxImg.src = '';
        }, 400);
    }

    // ---- Parallax Effect ----
    const parallaxBg = document.querySelector('.parallax-bg');

    function updateParallax() {
        if (parallaxBg) {
            const section = parallaxBg.parentElement;
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                parallaxBg.style.transform = `translateY(${rect.top * 0.25}px)`;
            }
        }
    }

    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateParallax);
    }, { passive: true });

    // ---- Magnetic Buttons ----
    const magneticElements = document.querySelectorAll('.magnetic');

    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
        });
    });

    // ---- Tilt Effect on Sense Cards ----
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        const glow = card.querySelector('.sense-glow');

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;

            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;

            if (glow) {
                glow.style.left = x + 'px';
                glow.style.top = y + 'px';
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ---- Back to Top ----
    const backToTop = document.getElementById('backToTop');
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ---- Smooth Scroll ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = navbar.offsetHeight + 10;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // Re-init icons after DOM changes
    setTimeout(() => {
        if (window.lucide) lucide.createIcons();
    }, 100);

})();
