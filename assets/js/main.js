/* ============================================
   SENSORIAL'S CAFÉ — Main JavaScript v3
   "Outside the box" features
   ============================================ */
(function () {
    'use strict';

    // Reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Init Lucide (defer-safe)
    function initLucide() { if (window.lucide) lucide.createIcons(); }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLucide);
    } else {
        initLucide();
    }

    // ---- Preloader with progress ----
    const preloader = document.getElementById('preloader');
    const preloaderBar = document.getElementById('preloaderBar');
    let loadProgress = 0;

    const progressInterval = setInterval(() => {
        loadProgress += Math.random() * 15;
        if (loadProgress > 95) loadProgress = 95;
        if (preloaderBar) preloaderBar.style.width = loadProgress + '%';
    }, 200);

    function hidePreloader() {
        clearInterval(progressInterval);
        if (preloaderBar) preloaderBar.style.width = '100%';
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.classList.remove('no-scroll');
            revealHero();
        }, 400);
    }

    if (document.readyState === 'complete') {
        setTimeout(hidePreloader, 600);
    } else {
        window.addEventListener('load', () => setTimeout(hidePreloader, 1000));
        setTimeout(hidePreloader, 4000);
    }

    // ---- Dynamic Greeting & Open/Closed Status ----
    function updateGreetingAndStatus() {
        const now = new Date();
        const hour = now.getHours();
        const day = now.getDay(); // 0=Sunday
        const greetingEl = document.getElementById('dynamicGreeting');
        const statusBadge = document.getElementById('statusBadge');
        const statusText = document.getElementById('statusText');

        let greeting;
        if (hour >= 5 && hour < 12) greeting = 'Buenos días';
        else if (hour >= 12 && hour < 18) greeting = 'Buenas tardes';
        else greeting = 'Buenas noches';

        if (greetingEl) {
            greetingEl.textContent = `${greeting} — Armenia, Quindío`;
        }

        // Open/closed logic (Mon-Sat 8-20, Sun 9-18)
        let isOpen = false;
        if (day === 0) { // Sunday
            isOpen = hour >= 9 && hour < 18;
        } else if (day >= 1 && day <= 6) { // Mon-Sat
            isOpen = hour >= 8 && hour < 20;
        }

        if (statusBadge && statusText) {
            if (isOpen) {
                statusBadge.classList.remove('closed');
                statusText.textContent = 'Abierto ahora';
            } else {
                statusBadge.classList.add('closed');
                statusText.textContent = 'Cerrado ahora';
            }
        }
    }

    updateGreetingAndStatus();
    setInterval(updateGreetingAndStatus, 60000);

    // ---- Scroll Progress Bar ----
    const scrollProgress = document.getElementById('scrollProgress');

    // ---- Cursor Glow (smooth lerp) ----
    const cursorGlow = document.getElementById('cursorGlow');
    let cursorX = 0, cursorY = 0, glowX = 0, glowY = 0, glowActive = false;

    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
        if (!glowActive) { cursorGlow.classList.add('active'); glowActive = true; }
    });

    function animateCursorGlow() {
        glowX += (cursorX - glowX) * 0.08;
        glowY += (cursorY - glowY) * 0.08;
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';
        requestAnimationFrame(animateCursorGlow);
    }
    if (window.innerWidth > 768 && !prefersReducedMotion) animateCursorGlow();

    // ---- Particles ----
    const particlesContainer = document.getElementById('heroParticles');
    if (particlesContainer) {
        for (let i = 0; i < 35; i++) {
            const p = document.createElement('div');
            p.classList.add('particle');
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDelay = Math.random() * 8 + 's';
            p.style.animationDuration = (6 + Math.random() * 6) + 's';
            const s = (2 + Math.random() * 3) + 'px';
            p.style.width = s;
            p.style.height = s;
            particlesContainer.appendChild(p);
        }
    }

    // ---- Hero Text Reveal ----
    function revealHero() {
        const hero = document.querySelector('.hero');
        if (hero) setTimeout(() => hero.classList.add('revealed'), 200);

        document.querySelectorAll('.hero [data-animate]').forEach(el => {
            const delay = parseInt(el.getAttribute('data-delay') || 0);
            setTimeout(() => el.classList.add('animated'), delay + 400);
        });

        // Text scramble on hero titles
        setTimeout(triggerScrambleEffects, 1200);
    }

    // ---- Text Scramble Effect ----
    function scrambleText(element) {
        const original = element.textContent;
        const chars = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZáéíóú';
        let iteration = 0;

        const interval = setInterval(() => {
            element.textContent = original
                .split('')
                .map((letter, index) => {
                    if (index < iteration) return original[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');

            if (iteration >= original.length) clearInterval(interval);
            iteration += 1 / 2;
        }, 30);
    }

    function triggerScrambleEffects() {
        document.querySelectorAll('[data-scramble]').forEach(el => {
            scrambleText(el);
        });
    }

    // ---- Navbar: hide/show on scroll ----
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navLinkItems = document.querySelectorAll('.nav-link');
    let lastScrollY = 0, scrollDir = 'up', ticking = false;

    function handleScroll() {
        const y = window.scrollY;
        const docH = document.documentElement.scrollHeight - window.innerHeight;

        // Progress bar
        if (scrollProgress) scrollProgress.style.width = (docH > 0 ? (y / docH) * 100 : 0) + '%';

        // Navbar
        navbar.classList.toggle('scrolled', y > 60);
        if (y > 300) {
            if (y > lastScrollY && scrollDir !== 'down') { scrollDir = 'down'; navbar.classList.add('nav-hidden'); }
            else if (y < lastScrollY && scrollDir !== 'up') { scrollDir = 'up'; navbar.classList.remove('nav-hidden'); }
        } else {
            navbar.classList.remove('nav-hidden');
        }
        lastScrollY = y;

        // Back to top
        document.getElementById('backToTop').classList.toggle('visible', y > 600);

        ticking = false;
    }

    window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(handleScroll); ticking = true; } }, { passive: true });

    // Mobile menu
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    navLinkItems.forEach(link => link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }));

    // Active section tracking
    const sections = document.querySelectorAll('section[id]');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinkItems.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('data-section') === id);
                });
            }
        });
    }, { rootMargin: '-40% 0px -40% 0px' });
    sections.forEach(s => sectionObserver.observe(s));

    // ---- Scroll Animations ----
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.getAttribute('data-delay') || 0);
                setTimeout(() => entry.target.classList.add('animated'), delay);
                animationObserver.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });

    document.querySelectorAll('[data-animate]').forEach(el => {
        if (!el.closest('.hero')) animationObserver.observe(el);
    });

    // Image reveal
    const imgRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { setTimeout(() => e.target.classList.add('revealed'), 200); imgRevealObserver.unobserve(e.target); } });
    }, { threshold: 0.3 });
    document.querySelectorAll('.img-reveal').forEach(el => imgRevealObserver.observe(el));

    // Counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target, parseInt(e.target.getAttribute('data-count'))); counterObserver.unobserve(e.target); } });
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-count]').forEach(c => counterObserver.observe(c));

    function animateCounter(el, target) {
        const start = performance.now();
        (function update(now) {
            const p = Math.min((now - start) / 2000, 1);
            try { el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target).toLocaleString('es-CO'); }
            catch { el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target); }
            if (p < 1) requestAnimationFrame(update);
        })(start);
    }

    // ---- Coffee Journey Slider ----
    const journeyTrack = document.getElementById('journeyTrack');
    const journeyPrev = document.getElementById('journeyPrev');
    const journeyNext = document.getElementById('journeyNext');
    const journeyBar = document.getElementById('journeyProgressBar');
    const journeyNum = document.getElementById('journeyCurrentNum');
    let journeyIndex = 0;
    const journeyTotal = journeyTrack ? journeyTrack.children.length : 0;

    function goToJourneyStep(i) {
        journeyIndex = Math.max(0, Math.min(i, journeyTotal - 1));
        const stepWidth = journeyTrack.children[0].offsetWidth + 40; // gap
        journeyTrack.style.transform = `translateX(-${journeyIndex * stepWidth}px)`;
        if (journeyBar) journeyBar.style.width = ((journeyIndex + 1) / journeyTotal * 100) + '%';
        if (journeyNum) journeyNum.textContent = journeyIndex + 1;
    }

    if (journeyPrev) journeyPrev.addEventListener('click', () => { goToJourneyStep(journeyIndex - 1); resetJourneyAuto(); });
    if (journeyNext) journeyNext.addEventListener('click', () => { goToJourneyStep(journeyIndex + 1); resetJourneyAuto(); });

    // Journey auto-scroll
    let journeyAutoInterval;
    function startJourneyAuto() {
        journeyAutoInterval = setInterval(() => {
            if (journeyTotal > 0) goToJourneyStep(journeyIndex >= journeyTotal - 1 ? 0 : journeyIndex + 1);
        }, 5000);
    }
    function resetJourneyAuto() { clearInterval(journeyAutoInterval); startJourneyAuto(); }
    if (journeyTotal > 1) startJourneyAuto();

    // Pause auto-scroll on hover
    if (journeyTrack) {
        journeyTrack.addEventListener('mouseenter', () => clearInterval(journeyAutoInterval));
        journeyTrack.addEventListener('mouseleave', () => { if (journeyTotal > 1) startJourneyAuto(); });
    }

    // Touch support for journey
    if (journeyTrack) {
        let jtStartX = 0, jtDragging = false;
        journeyTrack.addEventListener('touchstart', (e) => { jtStartX = e.touches[0].clientX; jtDragging = true; journeyTrack.classList.add('dragging'); clearInterval(journeyAutoInterval); }, { passive: true });
        journeyTrack.addEventListener('touchend', (e) => {
            if (!jtDragging) return;
            jtDragging = false;
            journeyTrack.classList.remove('dragging');
            const diff = (e.changedTouches[0]?.clientX || 0) - jtStartX;
            if (Math.abs(diff) > 50) goToJourneyStep(diff < 0 ? journeyIndex + 1 : journeyIndex - 1);
            if (journeyTotal > 1) startJourneyAuto();
        });
    }

    // ---- Flavor Wheel ----
    const flavorWheel = document.getElementById('flavorWheel');
    const flavorDetail = document.getElementById('flavorDetail');
    const flavorDetailIcon = document.getElementById('flavorDetailIcon');
    const flavorDetailTitle = document.getElementById('flavorDetailTitle');
    const flavorDetailDesc = document.getElementById('flavorDetailDesc');

    if (flavorWheel) {
        const segments = flavorWheel.querySelectorAll('.wheel-segment');
        segments.forEach(seg => {
            seg.addEventListener('click', () => {
                segments.forEach(s => s.classList.remove('active'));
                seg.classList.add('active');
                if (flavorDetail) {
                    flavorDetail.classList.add('active');
                    flavorDetailIcon.textContent = seg.dataset.icon;
                    flavorDetailTitle.textContent = seg.dataset.title;
                    flavorDetailDesc.textContent = seg.dataset.desc;
                }
            });
        });
    }

    // ---- Menu Tabs ----
    document.querySelectorAll('.menu-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            document.querySelectorAll('.menu-panel').forEach(p => {
                p.classList.toggle('active', p.id === tab.dataset.tab);
            });
        });
    });

    // ---- Menu Image Preview on Hover ----
    const menuPreview = document.getElementById('menuPreview');
    const menuPreviewImg = document.getElementById('menuPreviewImg');

    document.querySelectorAll('.menu-item[data-preview]').forEach(item => {
        item.addEventListener('mouseenter', (e) => {
            const src = item.dataset.preview;
            if (src && menuPreview && window.innerWidth > 768) {
                menuPreviewImg.src = src;
                menuPreview.classList.add('visible');
            }
        });

        item.addEventListener('mousemove', (e) => {
            if (menuPreview && window.innerWidth > 768) {
                menuPreview.style.left = (e.clientX + 20) + 'px';
                menuPreview.style.top = (e.clientY - 80) + 'px';
            }
        });

        item.addEventListener('mouseleave', () => {
            if (menuPreview) menuPreview.classList.remove('visible');
        });
    });

    // ---- Testimonials Slider with Touch ----
    const track = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');
    const dotsContainer = document.getElementById('testimonialDots');
    const cards = track ? track.querySelectorAll('.testimonial-card') : [];
    let currentSlide = 0, autoSlideInterval;

    if (dotsContainer && cards.length) {
        cards.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => { goToSlide(i); resetAuto(); });
            dotsContainer.appendChild(dot);
        });
    }

    function goToSlide(i) {
        currentSlide = i;
        if (track) track.style.transform = `translateX(-${i * 100}%)`;
        dotsContainer?.querySelectorAll('.dot').forEach((d, j) => d.classList.toggle('active', j === i));
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { goToSlide(currentSlide === 0 ? cards.length - 1 : currentSlide - 1); resetAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { goToSlide(currentSlide === cards.length - 1 ? 0 : currentSlide + 1); resetAuto(); });

    function startAuto() { autoSlideInterval = setInterval(() => { if (cards.length) goToSlide(currentSlide === cards.length - 1 ? 0 : currentSlide + 1); }, 5000); }
    function resetAuto() { clearInterval(autoSlideInterval); startAuto(); }
    startAuto();

    if (track) {
        let tStartX = 0;
        track.addEventListener('touchstart', (e) => { tStartX = e.touches[0].clientX; clearInterval(autoSlideInterval); }, { passive: true });
        track.addEventListener('touchend', (e) => {
            const diff = (e.changedTouches[0]?.clientX || 0) - tStartX;
            if (Math.abs(diff) > 50) goToSlide(diff < 0 ? Math.min(currentSlide + 1, cards.length - 1) : Math.max(currentSlide - 1, 0));
            startAuto();
        });
        track.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        track.addEventListener('mouseleave', startAuto);
    }

    // ---- Gallery Lightbox ----
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const src = item.dataset.img;
            const cap = item.dataset.caption;
            if (src && lightbox) {
                lightboxImg.src = src;
                lightboxImg.alt = cap || '';
                lightboxCaption.textContent = cap || '';
                lightbox.classList.add('active');
                document.body.classList.add('no-scroll');
            }
        });
        item.addEventListener('mouseenter', () => { galleryItems.forEach(o => { if (o !== item) o.style.opacity = '0.4'; }); });
        item.addEventListener('mouseleave', () => { galleryItems.forEach(o => o.style.opacity = '1'); });
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.classList.remove('no-scroll');
        setTimeout(() => { lightboxImg.src = ''; }, 400);
    }

    document.getElementById('lightboxClose')?.addEventListener('click', closeLightbox);
    lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && lightbox?.classList.contains('active')) closeLightbox(); });

    // ---- Reservations Form ----
    const reservasForm = document.getElementById('reservasForm');
    const reservasSuccess = document.getElementById('reservasSuccess');

    if (reservasForm) {
        // Set min date to today
        const dateInput = document.getElementById('resDate');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }

        reservasForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate submission
            const btn = reservasForm.querySelector('button[type="submit"]');
            btn.innerHTML = '<span>Enviando...</span>';
            btn.disabled = true;

            setTimeout(() => {
                reservasForm.style.display = 'none';
                reservasSuccess.style.display = 'block';
                reservasSuccess.style.animation = 'menuSlideIn 0.6s var(--ease-out)';
            }, 1500);
        });
    }

    // ---- Parallax ----
    const parallaxBg = document.querySelector('.parallax-bg');
    window.addEventListener('scroll', () => {
        if (parallaxBg) {
            const rect = parallaxBg.parentElement.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                parallaxBg.style.transform = `translateY(${rect.top * 0.25}px)`;
            }
        }
    }, { passive: true });

    // ---- Magnetic Buttons ----
    document.querySelectorAll('.magnetic').forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const r = el.getBoundingClientRect();
            el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.2}px, ${(e.clientY - r.top - r.height / 2) * 0.2}px)`;
        });
        el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });

    // ---- Tilt Cards ----
    document.querySelectorAll('.tilt-card').forEach(card => {
        const glow = card.querySelector('.sense-glow');
        card.addEventListener('mousemove', (e) => {
            const r = card.getBoundingClientRect();
            const x = e.clientX - r.left, y = e.clientY - r.top;
            card.style.transform = `perspective(800px) rotateX(${((y - r.height / 2) / r.height) * -8}deg) rotateY(${((x - r.width / 2) / r.width) * 8}deg) translateY(-8px)`;
            if (glow) { glow.style.left = x + 'px'; glow.style.top = y + 'px'; }
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });

    // ---- Ambient Sound System ----
    const ambientToggle = document.getElementById('ambientToggle');
    const ambientIconOff = document.getElementById('ambientIconOff');
    const ambientIconOn = document.getElementById('ambientIconOn');
    let audioCtx, isPlaying = false;

    function createCoffeeShopAmbience() {
        try {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const masterGain = audioCtx.createGain();
            masterGain.gain.value = 0;
            masterGain.connect(audioCtx.destination);

            // Layer 1: Warm brown noise (café background hum)
            const brownLen = 2 * audioCtx.sampleRate;
            const brownBuf = audioCtx.createBuffer(2, brownLen, audioCtx.sampleRate);
            for (let ch = 0; ch < 2; ch++) {
                const d = brownBuf.getChannelData(ch);
                let last = 0;
                for (let i = 0; i < brownLen; i++) {
                    const w = Math.random() * 2 - 1;
                    d[i] = (last + 0.02 * w) / 1.02;
                    last = d[i];
                    d[i] *= 3.5;
                }
            }
            const brownSrc = audioCtx.createBufferSource();
            brownSrc.buffer = brownBuf;
            brownSrc.loop = true;
            const brownFilter = audioCtx.createBiquadFilter();
            brownFilter.type = 'lowpass';
            brownFilter.frequency.value = 350;
            const brownGain = audioCtx.createGain();
            brownGain.gain.value = 0.5;
            brownSrc.connect(brownFilter);
            brownFilter.connect(brownGain);
            brownGain.connect(masterGain);
            brownSrc.start();

            // Layer 2: Soft tonal hum (warm sine drone)
            const drone = audioCtx.createOscillator();
            drone.type = 'sine';
            drone.frequency.value = 85;
            const droneGain = audioCtx.createGain();
            droneGain.gain.value = 0.06;
            const droneLfo = audioCtx.createOscillator();
            droneLfo.frequency.value = 0.1;
            const droneLfoGain = audioCtx.createGain();
            droneLfoGain.gain.value = 8;
            droneLfo.connect(droneLfoGain);
            droneLfoGain.connect(drone.frequency);
            drone.connect(droneGain);
            droneGain.connect(masterGain);
            drone.start();
            droneLfo.start();

            // Layer 3: Random gentle "clinks" (spoon-on-cup)
            function scheduleClink() {
                if (!audioCtx || audioCtx.state === 'closed') return;
                const delay = 3 + Math.random() * 8;
                setTimeout(() => {
                    if (!audioCtx || audioCtx.state === 'closed') return;
                    const osc = audioCtx.createOscillator();
                    osc.type = 'sine';
                    osc.frequency.value = 1800 + Math.random() * 1200;
                    const env = audioCtx.createGain();
                    env.gain.setValueAtTime(0, audioCtx.currentTime);
                    env.gain.linearRampToValueAtTime(0.03 + Math.random() * 0.02, audioCtx.currentTime + 0.005);
                    env.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15 + Math.random() * 0.2);
                    osc.connect(env);
                    env.connect(masterGain);
                    osc.start(audioCtx.currentTime);
                    osc.stop(audioCtx.currentTime + 0.4);
                    scheduleClink();
                }, delay * 1000);
            }
            scheduleClink();

            // Layer 4: Occasional soft "pour" (filtered noise burst)
            function schedulePour() {
                if (!audioCtx || audioCtx.state === 'closed') return;
                const delay = 8 + Math.random() * 15;
                setTimeout(() => {
                    if (!audioCtx || audioCtx.state === 'closed') return;
                    const len = audioCtx.sampleRate * 2;
                    const buf = audioCtx.createBuffer(1, len, audioCtx.sampleRate);
                    const d = buf.getChannelData(0);
                    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
                    const src = audioCtx.createBufferSource();
                    src.buffer = buf;
                    const bp = audioCtx.createBiquadFilter();
                    bp.type = 'bandpass';
                    bp.frequency.value = 2000 + Math.random() * 1500;
                    bp.Q.value = 2;
                    const env = audioCtx.createGain();
                    const t = audioCtx.currentTime;
                    env.gain.setValueAtTime(0, t);
                    env.gain.linearRampToValueAtTime(0.015, t + 0.3);
                    env.gain.linearRampToValueAtTime(0.02, t + 0.8);
                    env.gain.exponentialRampToValueAtTime(0.001, t + 1.8);
                    src.connect(bp);
                    bp.connect(env);
                    env.connect(masterGain);
                    src.start(t);
                    src.stop(t + 2);
                    schedulePour();
                }, delay * 1000);
            }
            schedulePour();

            // Layer 5: Subtle distant chatter (modulated noise)
            const chatterLen = 4 * audioCtx.sampleRate;
            const chatterBuf = audioCtx.createBuffer(1, chatterLen, audioCtx.sampleRate);
            const cd = chatterBuf.getChannelData(0);
            for (let i = 0; i < chatterLen; i++) {
                cd[i] = Math.random() * 2 - 1;
                cd[i] *= 0.5 + 0.5 * Math.sin(i / audioCtx.sampleRate * Math.PI * 3);
            }
            const chatterSrc = audioCtx.createBufferSource();
            chatterSrc.buffer = chatterBuf;
            chatterSrc.loop = true;
            const chatterBp = audioCtx.createBiquadFilter();
            chatterBp.type = 'bandpass';
            chatterBp.frequency.value = 600;
            chatterBp.Q.value = 1.5;
            const chatterGain = audioCtx.createGain();
            chatterGain.gain.value = 0.04;
            chatterSrc.connect(chatterBp);
            chatterBp.connect(chatterGain);
            chatterGain.connect(masterGain);
            chatterSrc.start();

            return { gainNode: masterGain };
        } catch (e) {
            console.warn('Audio not supported:', e);
            return null;
        }
    }

    let ambientNodes = null;

    if (ambientToggle) {
        ambientToggle.addEventListener('click', () => {
            if (!isPlaying) {
                if (!ambientNodes) ambientNodes = createCoffeeShopAmbience();
                if (!ambientNodes) return;
                ambientNodes.gainNode.gain.linearRampToValueAtTime(0.15, audioCtx.currentTime + 1);
                isPlaying = true;
                ambientToggle.classList.add('active');
                ambientIconOff.style.display = 'none';
                ambientIconOn.style.display = 'inline';
            } else {
                ambientNodes.gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);
                isPlaying = false;
                ambientToggle.classList.remove('active');
                ambientIconOff.style.display = 'inline';
                ambientIconOn.style.display = 'none';
            }
        });
    }

    // ---- Back to Top ----
    document.getElementById('backToTop').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ---- Smooth Scroll ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight - 10, behavior: 'smooth' });
            }
        });
    });

    // ---- Easter Egg: Konami Code = Coffee Bean Rain ----
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                konamiIndex = 0;
                startCoffeeBeanRain();
            }
        } else {
            konamiIndex = 0;
        }
    });

    function startCoffeeBeanRain() {
        const canvas = document.getElementById('easterEggCanvas');
        if (!canvas) return;
        canvas.style.display = 'block';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext('2d');

        const beans = [];
        for (let i = 0; i < 80; i++) {
            beans.push({
                x: Math.random() * canvas.width,
                y: Math.random() * -canvas.height,
                size: 12 + Math.random() * 16,
                speed: 2 + Math.random() * 4,
                rotation: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.1,
                opacity: 0.6 + Math.random() * 0.4
            });
        }

        let frame = 0;
        function drawBean(b) {
            ctx.save();
            ctx.translate(b.x, b.y);
            ctx.rotate(b.rotation);
            ctx.globalAlpha = b.opacity;
            ctx.font = b.size + 'px serif';
            ctx.fillText('☕', -b.size / 2, b.size / 2);
            ctx.restore();
        }

        function animate() {
            frame++;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            beans.forEach(b => {
                b.y += b.speed;
                b.rotation += b.rotSpeed;
                b.x += Math.sin(frame * 0.02 + b.speed) * 0.5;
                drawBean(b);
            });

            if (frame < 300) {
                requestAnimationFrame(animate);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                canvas.style.display = 'none';
            }
        }

        animate();
    }

    // Re-init icons (safe for deferred loading)
    setTimeout(() => { initLucide(); }, 300);

})();
