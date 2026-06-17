/* ══════════════════════════════════════════════════════════
   VIA VINHO — Analytics + Cookie Consent (GA4, Consent Mode v2)
   GA4 loads ONLY after the visitor clicks "Accept".
   Consent default = denied (no cookies, no GA network calls until then).
   Choice is remembered in localStorage so the banner shows once.

   SETUP: paste your GA4 Measurement ID below (looks like G-XXXXXXXXXX).
   OPTIONAL: set PRIVACY_URL to your privacy/cookie page to show a link.
  ══════════════════════════════════════════════════════════ */
(function () {
  var GA_ID = 'G-SBHYYTHV9J';      // GA4 Measurement ID — Via Vinho
  var PRIVACY_URL = '';            // <-- e.g. '/privacy/' to add a link (leave '' to hide)
  var KEY = 'vv_consent';          // stored value: 'granted' | 'denied'

  // --- Consent Mode v2: default to denied before anything loads ---
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;
  gtag('consent', 'default', {
    ad_storage: 'denied',
    analytics_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500
  });

  function loadGA() {
    if (window.__vvGA || !GA_ID || GA_ID.indexOf('G-') !== 0 || GA_ID === 'G-XXXXXXXXXX') return;
    window.__vvGA = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  function grant() {
    gtag('consent', 'update', {
      ad_storage: 'granted',
      analytics_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted'
    });
    loadGA();
  }

  var prior = null;
  try { prior = localStorage.getItem(KEY); } catch (e) {}
  if (prior === 'granted') { grant(); return; }
  if (prior === 'denied') { return; }

  // --- No prior choice → show the banner ---
  function showBanner() {
    var bar = document.createElement('div');
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-label', 'Cookie consent');
    bar.style.cssText = 'position:fixed;left:0;right:0;bottom:0;z-index:9999;background:#1A1A1A;color:#F4F9F0;font-family:Poppins,system-ui,sans-serif;padding:18px clamp(20px,5vw,48px);display:flex;flex-wrap:wrap;align-items:center;gap:14px 24px;justify-content:center;box-shadow:0 -1px 0 rgba(244,249,240,0.14)';

    var msg = document.createElement('p');
    msg.style.cssText = 'margin:0;font-size:0.84rem;font-weight:300;line-height:1.55;max-width:680px';
    var msgText = 'We use cookies to understand how the site is used and improve your experience. You can accept or decline analytics.';
    if (PRIVACY_URL) {
      msg.innerHTML = msgText + ' <a href="' + PRIVACY_URL + '" style="color:#F4F9F0;text-decoration:underline">Learn more</a>.';
    } else {
      msg.textContent = msgText;
    }

    var btns = document.createElement('div');
    btns.style.cssText = 'display:flex;gap:10px;flex-shrink:0';

    function mkBtn(label, primary) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = label;
      b.style.cssText = 'font-family:Poppins,system-ui,sans-serif;font-size:0.66rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;padding:11px 22px;border-radius:2px;cursor:pointer;transition:opacity 150ms ease;border:1px solid ' +
        (primary ? '#F4F9F0' : 'rgba(244,249,240,0.35)') + ';background:' +
        (primary ? '#F4F9F0' : 'transparent') + ';color:' + (primary ? '#1A1A1A' : '#F4F9F0');
      b.addEventListener('mouseenter', function () { b.style.opacity = '0.82'; });
      b.addEventListener('mouseleave', function () { b.style.opacity = '1'; });
      return b;
    }

    var decline = mkBtn('Decline', false);
    var accept = mkBtn('Accept', true);

    function close() { if (bar.parentNode) bar.parentNode.removeChild(bar); }
    accept.addEventListener('click', function () {
      try { localStorage.setItem(KEY, 'granted'); } catch (e) {}
      grant(); close();
    });
    decline.addEventListener('click', function () {
      try { localStorage.setItem(KEY, 'denied'); } catch (e) {}
      close();
    });

    btns.appendChild(decline);
    btns.appendChild(accept);
    bar.appendChild(msg);
    bar.appendChild(btns);
    document.body.appendChild(bar);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showBanner);
  } else {
    showBanner();
  }
})();
