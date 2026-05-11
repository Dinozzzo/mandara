// Header scroll state + mobile drawer + Lenis smooth scroll

const header = document.querySelector('.site-header');
const toggle = document.querySelector('.site-nav__toggle');
const backdrop = document.querySelector('.site-nav__backdrop');
const links = document.querySelectorAll('.site-nav__link');

// Lenis — slowed, eased page scroll. Skipped for reduced-motion users.
let lenis = null;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion && typeof window.Lenis === 'function') {
  lenis = new window.Lenis({
    duration: 1.6,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.85,
    touchMultiplier: 1.5,
  });

  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
}

// Tear-off threshold: header detaches from hero after this scroll distance
const SCROLL_THRESHOLD = 80;

const updateScrollState = () => {
  if (window.scrollY > SCROLL_THRESHOLD) {
    header.classList.add('is-scrolled');
  } else {
    header.classList.remove('is-scrolled');
  }
};

window.addEventListener('scroll', updateScrollState, { passive: true });
updateScrollState();

// Mobile drawer
const closeMenu = () => {
  header.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open menu');
  document.body.style.overflow = '';
  if (lenis) lenis.start();
};

const openMenu = () => {
  header.classList.add('is-open');
  toggle.setAttribute('aria-expanded', 'true');
  toggle.setAttribute('aria-label', 'Close menu');
  document.body.style.overflow = 'hidden';
  if (lenis) lenis.stop();
};

toggle.addEventListener('click', () => {
  if (header.classList.contains('is-open')) closeMenu();
  else openMenu();
});

backdrop.addEventListener('click', closeMenu);

links.forEach((link) => {
  link.addEventListener('click', () => {
    if (header.classList.contains('is-open')) closeMenu();
  });
});

// Cocktail carousel — arrow buttons + ← / → keys scroll the track by
// one card width. Wraps around at both ends. Native scroll-snap handles
// the smooth snap. Lenis ignores the track via `data-lenis-prevent`.
const cocktailTrack = document.querySelector('.cocktails__track');
const cocktailPrev = document.querySelector('.cocktails__nav--prev');
const cocktailNext = document.querySelector('.cocktails__nav--next');
const cocktailsSection = document.querySelector('.cocktails');

if (cocktailTrack && cocktailPrev && cocktailNext) {
  const scrollByCard = (dir) => {
    const card = cocktailTrack.querySelector('.cocktails__card');
    if (!card) return;
    const cardWidth = card.offsetWidth;
    const { scrollLeft, scrollWidth, clientWidth } = cocktailTrack;
    const maxScroll = scrollWidth - clientWidth;
    const atEnd = scrollLeft >= maxScroll - 2;
    const atStart = scrollLeft <= 2;

    let target;
    if (dir > 0 && atEnd) target = 0;            // wrap forward → first card
    else if (dir < 0 && atStart) target = maxScroll; // wrap back → last card
    else target = scrollLeft + dir * cardWidth;

    cocktailTrack.scrollTo({ left: target, behavior: 'smooth' });
  };

  cocktailPrev.addEventListener('click', () => scrollByCard(-1));
  cocktailNext.addEventListener('click', () => scrollByCard(1));

  // Keyboard nav — only active when the cocktails section is the focus
  // of the viewport, so arrow keys keep scrolling the page elsewhere.
  let cocktailsActive = false;
  if (cocktailsSection && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => { cocktailsActive = entries[0].isIntersecting; },
      { rootMargin: '-30% 0px -30% 0px' }
    );
    io.observe(cocktailsSection);
  }

  window.addEventListener('keydown', (e) => {
    if (!cocktailsActive) return;
    if (e.target.matches('input, textarea, select')) return;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollByCard(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollByCard(1);
    }
  });
}

// Sub-page background decor — inject scattered ink line-drawings
// (tangerine slice + leaf SVGs) into any `.page` block. Aria-hidden,
// pointer-events: none — purely decorative.
const pageEl = document.querySelector('.page');
if (pageEl) {
  const LEAF = `<svg viewBox="0 0 60 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M30,4 Q4,38 4,86 Q4,138 30,156 Q56,138 56,86 Q56,38 30,4 Z" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M30,12 L30,152" stroke="currentColor" stroke-width="0.8"/><path d="M30,50 Q18,52 10,48" fill="none" stroke="currentColor" stroke-width="0.7"/><path d="M30,90 Q20,92 14,88" fill="none" stroke="currentColor" stroke-width="0.7"/><path d="M30,50 Q42,52 50,48" fill="none" stroke="currentColor" stroke-width="0.7"/><path d="M30,90 Q40,92 46,88" fill="none" stroke="currentColor" stroke-width="0.7"/></svg>`;

  const SLICE = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" stroke-width="1.3"/><circle cx="50" cy="50" r="39" fill="none" stroke="currentColor" stroke-width="0.7"/><g stroke="currentColor" stroke-width="0.7" fill="none"><line x1="50" y1="11" x2="50" y2="89"/><line x1="11" y1="50" x2="89" y2="50"/><line x1="22" y1="22" x2="78" y2="78"/><line x1="22" y1="78" x2="78" y2="22"/></g><ellipse cx="50" cy="26" rx="2.4" ry="5" fill="currentColor"/><ellipse cx="50" cy="74" rx="2.4" ry="5" fill="currentColor"/><ellipse cx="26" cy="50" rx="5" ry="2.4" fill="currentColor"/><ellipse cx="74" cy="50" rx="5" ry="2.4" fill="currentColor"/><ellipse cx="33" cy="33" rx="3.6" ry="3.6" fill="currentColor"/><ellipse cx="67" cy="33" rx="3.6" ry="3.6" fill="currentColor"/><ellipse cx="33" cy="67" rx="3.6" ry="3.6" fill="currentColor"/><ellipse cx="67" cy="67" rx="3.6" ry="3.6" fill="currentColor"/></svg>`;

  // Scattered along the full height — alternating sides, varied rotation/size.
  // Contact page gets a sparser layout (5 items) spread to use the full canvas.
  const isContact = !!document.querySelector('.contact-form');
  const items = isContact
    ? [
        { shape: LEAF,  top: '8%',  side: 'left:4%',   w: 130, rot: -22 },
        { shape: SLICE, top: '22%', side: 'right:5%',  w: 150, rot: 18 },
        { shape: LEAF,  top: '50%', side: 'left:7%',   w: 120, rot: 32 },
        { shape: SLICE, top: '62%', side: 'right:6%',  w: 140, rot: -14 },
        { shape: LEAF,  top: '85%', side: 'left:8%',   w: 120, rot: -28 },
      ]
    : [
        { shape: LEAF,  top: '6%',  side: 'left:3%',   w: 110, rot: -22 },
        { shape: SLICE, top: '14%', side: 'right:5%',  w: 140, rot: 16 },
        { shape: LEAF,  top: '26%', side: 'right:8%',  w: 90,  rot: 38 },
        { shape: SLICE, top: '36%', side: 'left:6%',   w: 120, rot: -14 },
        { shape: LEAF,  top: '48%', side: 'left:10%',  w: 100, rot: 28 },
        { shape: SLICE, top: '58%', side: 'right:4%',  w: 130, rot: 24 },
        { shape: LEAF,  top: '70%', side: 'right:12%', w: 90,  rot: -32 },
        { shape: SLICE, top: '80%', side: 'left:5%',   w: 110, rot: -10 },
        { shape: LEAF,  top: '90%', side: 'right:6%',  w: 100, rot: 20 },
      ];

  const decor = document.createElement('div');
  decor.className = 'page__decor';
  decor.setAttribute('aria-hidden', 'true');
  decor.innerHTML = items
    .map(
      (i) =>
        `<div class="page__decor-item" style="top:${i.top};${i.side};width:${i.w}px;transform:rotate(${i.rot}deg);">${i.shape}</div>`
    )
    .join('');
  pageEl.prepend(decor);
}

// Slide-in reveal — mandarin section image splits on home,
// about-page image on the about sub-page, accent words in the interlude.
// One-shot per element.
const reveals = document.querySelectorAll(
  '.mandarin__split, .about__image, .interlude__accent'
);
if (reveals.length && 'IntersectionObserver' in window && !prefersReducedMotion) {
  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in-view');
          obs.unobserve(entry.target);
        }
      });
    },
    /* Trigger only when the element is in the middle ~60% of the viewport
       (i.e. when the user has actually scrolled to that subsection). */
    { threshold: 0, rootMargin: '-20% 0px -20% 0px' }
  );
  reveals.forEach((el) => io.observe(el));
}
