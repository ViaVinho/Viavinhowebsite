/* ═══════════════════════════════════════════════════════════
   VIA VINHO — Main JavaScript
   Nav scroll state + scroll-reveal animations
═══════════════════════════════════════════════════════════ */

// ── Nav scroll state ──
// Adds .scrolled class at 80px — triggers logo + background transition
const nav = document.getElementById('main-nav');
const navLogoText = nav.querySelector('.nav-logo-text');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    nav.classList.add('scrolled');
    if (navLogoText) navLogoText.style.color = 'var(--burgundy)';
  } else {
    nav.classList.remove('scrolled');
    if (navLogoText) navLogoText.style.color = 'var(--alabaster)';
  }
}, { passive: true });


// ── Scroll reveals (IntersectionObserver) ──
// Elements with class .reveal animate in as they enter the viewport
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // fire once only
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));
