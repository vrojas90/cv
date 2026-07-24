(() => {
  const shell = document.querySelector('.story-shell');
  const screens = [...document.querySelectorAll('.screen')];
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  const current = document.querySelector('#screen-current');
  const total = document.querySelector('#screen-total');
  const progress = document.querySelector('#progress-fill');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  total.textContent = String(screens.length).padStart(2, '0');

  const closeMenu = () => {
    nav?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  };
  menuButton?.addEventListener('click', () => {
    const open = nav?.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(Boolean(open)));
  });
  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

  const baseUrl = document.querySelector('meta[name="case-study-base-url"]')?.content.trim().replace(/\/$/, '');
  if (baseUrl) document.querySelectorAll('[data-case-study-link]').forEach((link) => { link.href = `${baseUrl}/stories/natural_science_case.html`; });

  const revealScreen = (screen) => {
    screen.querySelectorAll('.reveal').forEach((item, index) => {
      item.style.transitionDelay = reducedMotion ? '0ms' : `${Math.min(index * 90, 270)}ms`;
      item.classList.add('is-visible');
    });
  };

  const navLinks = [...document.querySelectorAll('.primary-nav a[href^="#"]')];
  const updateActive = (screen, index) => {
    current.textContent = String(index + 1).padStart(2, '0');
    progress.style.height = `${((index + 1) / screens.length) * 100}%`;
    revealScreen(screen);
    navLinks.forEach((link) => {
      const target = document.querySelector(link.getAttribute('href'));
      const active = target === screen || (target && target.id.split('-')[0] === screen.id.split('-')[0]);
      link.toggleAttribute('aria-current', active);
    });
    document.title = `${screen.dataset.title} | Victor Rojas`;
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      updateActive(visible.target, screens.indexOf(visible.target));
    }, { root: shell, threshold: [0.55, 0.75, 0.95] });
    screens.forEach((screen) => observer.observe(screen));
  } else {
    screens.forEach(revealScreen);
  }

  document.addEventListener('keydown', (event) => {
    if (!['ArrowDown','ArrowUp','PageDown','PageUp'].includes(event.key)) return;
    const activeIndex = Math.round(shell.scrollTop / shell.clientHeight);
    const direction = ['ArrowDown','PageDown'].includes(event.key) ? 1 : -1;
    const next = Math.max(0, Math.min(screens.length - 1, activeIndex + direction));
    event.preventDefault();
    screens[next].scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
  });

  window.addEventListener('resize', closeMenu);
  revealScreen(screens[0]);
})();
