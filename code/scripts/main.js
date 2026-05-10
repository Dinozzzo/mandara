// Header scroll state + mobile drawer

const header = document.querySelector('.site-header');
const toggle = document.querySelector('.site-nav__toggle');
const backdrop = document.querySelector('.site-nav__backdrop');
const links = document.querySelectorAll('.site-nav__link');

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
};

const openMenu = () => {
  header.classList.add('is-open');
  toggle.setAttribute('aria-expanded', 'true');
  toggle.setAttribute('aria-label', 'Close menu');
  document.body.style.overflow = 'hidden';
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
