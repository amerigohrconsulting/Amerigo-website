const nav = document.querySelector('.site-nav');
const toggle = document.querySelector('.nav-toggle');
const menuLinks = document.querySelectorAll('.menu-link');
const logoLink = document.querySelector('.logo-link');
const mobileSections = document.querySelectorAll('.mobile-section');
const header = document.querySelector('header');

const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

function closeMobileMenu() {
  if (!nav || !toggle) return;
  nav.classList.remove('nav-open');
  toggle.setAttribute('aria-expanded', 'false');
}

function showMobilePage(id) {
  if (!isMobile()) return;

  mobileSections.forEach(section => {
    section.classList.toggle('active', section.id === id);
  });

  closeMobileMenu();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

menuLinks.forEach(link => {
  link.addEventListener('click', event => {
    if (!isMobile()) {
      closeMobileMenu();
      return;
    }

    event.preventDefault();
    const id = link.getAttribute('href')?.replace('#', '');

    if (id === 'home') {
      mobileSections.forEach(section => section.classList.remove('active'));
      closeMobileMenu();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id && document.getElementById(id)) {
      showMobilePage(id);
    }
  });
});

if (logoLink) {
  logoLink.addEventListener('click', event => {
    if (!isMobile()) return;
    event.preventDefault();
    mobileSections.forEach(section => section.classList.remove('active'));
    closeMobileMenu();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function syncLayout() {
  if (isMobile()) {
    // Home is the only visible page on first load or after returning from desktop.
    const active = document.querySelector('.mobile-section.active');
    if (active) {
      mobileSections.forEach(section => {
        section.classList.toggle('active', section === active);
      });
    } else {
      mobileSections.forEach(section => section.classList.remove('active'));
    }
  } else {
    // Desktop keeps the original continuous scrolling layout.
    mobileSections.forEach(section => section.classList.remove('active'));
    closeMobileMenu();
  }
}

syncLayout();
window.addEventListener('resize', syncLayout);

window.addEventListener('scroll', () => {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 20);
});
