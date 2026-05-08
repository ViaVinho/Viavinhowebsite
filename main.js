/* Via Vinho — minimal JS
   Nav scroll · Mobile menu · Reveal · Video pause · Form pre-fill */

const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');
if (burger && mobileMenu) {
  burger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  mobileMenu.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => mobileMenu.classList.remove('open'))
  );
}

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && reveals.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  reveals.forEach(el => observer.observe(el));
} else {
  reveals.forEach(el => el.classList.add('visible'));
}

const hero = document.getElementById('hero');
const heroVideo = hero ? hero.querySelector('video') : null;
if (hero && heroVideo && 'IntersectionObserver' in window) {
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) heroVideo.play().catch(() => {});
      else heroVideo.pause();
    });
  }, { threshold: 0.1 });
  videoObserver.observe(hero);
}

const enquirySelect = document.getElementById('enquiry-interest');
if (enquirySelect) {
  const params = new URLSearchParams(window.location.search);
  const tier = params.get('tier');
  const experience = params.get('experience');

  if (tier === 'reserve') {
    enquirySelect.value = 'reserve';
  } else if (experience) {
    enquirySelect.value = 'classic';
    const contextEl = document.getElementById('enquiry-context');
    if (contextEl) {
      const name = experience.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      contextEl.textContent = 'Enquiring about: ' + name;
      contextEl.style.display = 'inline-block';
    }
  }
}

/* ============================================================
   Pricing engine — modular, data-driven
   Reads pricing matrix from data-prices on each engine.
   Animates value changes; updates instantly on input.
   ============================================================ */
function formatPrice(n) {
  return '€' + Math.round(n).toLocaleString('en-US');
}

function animatePriceTo(el, target) {
  const current = parseInt((el.textContent || '').replace(/[^\d]/g, ''), 10) || 0;
  if (current === target) {
    el.textContent = formatPrice(target);
    return;
  }
  const duration = 280;
  const start = performance.now();
  function step(now) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = formatPrice(current + (target - current) * eased);
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function setupPricingEngine(engine) {
  let prices;
  try {
    prices = JSON.parse(engine.dataset.prices);
  } catch (e) {
    return;
  }
  const seasonInputs = engine.querySelectorAll('input[type="radio"]');
  const slider = engine.querySelector('.guest-slider');
  const guestDisplay = engine.querySelector('[data-guest-display]');
  const totalEl = engine.querySelector('[data-price-total]');
  const perEl = engine.querySelector('[data-price-per]');
  if (!seasonInputs.length || !slider || !totalEl || !perEl) return;

  function currentSeason() {
    const checked = engine.querySelector('input[type="radio"]:checked');
    return checked ? checked.value : Object.keys(prices)[0];
  }

  function update(animate) {
    const season = currentSeason();
    const guests = parseInt(slider.value, 10);
    const perPerson = prices[season] && prices[season][guests];
    if (perPerson == null) return;
    const total = perPerson * guests;
    if (guestDisplay) guestDisplay.textContent = guests;
    if (animate) {
      animatePriceTo(totalEl, total);
      animatePriceTo(perEl, perPerson);
    } else {
      totalEl.textContent = formatPrice(total);
      perEl.textContent = formatPrice(perPerson);
    }
  }

  seasonInputs.forEach(input => input.addEventListener('change', () => update(true)));
  slider.addEventListener('input', () => update(true));
  update(false);
}

document.querySelectorAll('[data-pricing-engine]').forEach(setupPricingEngine);

/* ============================================================
   Expandable cards — only one open at a time
   ============================================================ */
const expandableCards = document.querySelectorAll('[data-card]');
expandableCards.forEach(card => {
  const toggle = card.querySelector('[data-toggle]');
  if (!toggle) return;
  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    const willExpand = !card.classList.contains('expanded');
    expandableCards.forEach(c => {
      c.classList.remove('expanded');
      const t = c.querySelector('[data-toggle]');
      if (t) t.setAttribute('aria-expanded', 'false');
    });
    if (willExpand) {
      card.classList.add('expanded');
      toggle.setAttribute('aria-expanded', 'true');
    }
  });
});
