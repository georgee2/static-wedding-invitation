/* ============================================================
   WEDDING INVITATION — Marble & Gold Atelier
   Countdown · Scroll Reveal · Lightbox · Marble Parallax
   ============================================================ */

(function () {
  'use strict';

  // ─────────────── COUNTDOWN TIMER ───────────────
  const WEDDING_DATE = new Date('2026-11-10T00:00:00-05:00');

  function updateCountdown() {
    const now = new Date();
    const diff = WEDDING_DATE - now;

    if (diff <= 0) {
      document.getElementById('countdown-days').textContent    = '0';
      document.getElementById('countdown-hours').textContent   = '0';
      document.getElementById('countdown-minutes').textContent = '0';
      document.getElementById('countdown-seconds').textContent = '0';
      return;
    }

    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById('countdown-days').textContent    = String(days).padStart(3, '0');
    document.getElementById('countdown-hours').textContent   = String(hours).padStart(2, '0');
    document.getElementById('countdown-minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('countdown-seconds').textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ─────────────── SCROLL REVEAL (JS Fallback) ───────────────
  // Only activate the JS reveal if the browser doesn't support
  // CSS scroll-driven animations.
  if (!CSS.supports('(animation-timeline: view()) and (animation-range: entry)')) {
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // ─────────────── MARBLE PARALLAX ───────────────
  // Subtle background position shift on scroll (desktop only)
  const isDesktop = window.matchMedia('(min-width: 769px)').matches;
  const motionOk  = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isDesktop && motionOk) {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          document.body.style.backgroundPositionY = `${-scrollY * 0.03}px`;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ─────────────── GALLERY LIGHTBOX ───────────────
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const galleryItems = document.querySelectorAll('.gallery-item img');

  function openLightbox(img) {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  galleryItems.forEach(img => {
    img.addEventListener('click', () => openLightbox(img));
  });

  lightbox.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

})();
