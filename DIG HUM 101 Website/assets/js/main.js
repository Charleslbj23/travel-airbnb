/* ==========================================================================
   Navigation: hamburger toggle, dropdown behavior, scroll shadow
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  const navbar = document.querySelector('.navbar');

  /* ---- Hamburger toggle ---- */
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.classList.toggle('active');
      links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });
  }

  /* ---- Dropdown toggle (click) ---- */
  dropdowns.forEach(dd => {
    const btn = dd.querySelector('button');
    if (!btn) return;
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const isOpen = dd.classList.contains('open');
      // close all
      dropdowns.forEach(other => {
        other.classList.remove('open');
        const otherBtn = other.querySelector('button');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });
      // toggle current
      if (!isOpen) {
        dd.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---- Close dropdowns on outside click ---- */
  document.addEventListener('click', () => {
    dropdowns.forEach(dd => {
      dd.classList.remove('open');
      const btn = dd.querySelector('button');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---- Close mobile menu on nav link click ---- */
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      if (toggle) {
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      }
      if (links) links.classList.remove('open');
    });
  });

  /* ---- Escape to close ---- */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      dropdowns.forEach(dd => {
        dd.classList.remove('open');
        const btn = dd.querySelector('button');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
      if (toggle) {
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      }
      if (links) links.classList.remove('open');
    }
  });

  /* ---- Navbar shadow on scroll ---- */
  if (navbar) {
    const updateShadow = () => {
      if (window.scrollY > 10) {
        navbar.style.boxShadow = '0 1px 8px rgba(0,0,0,0.06)';
      } else {
        navbar.style.boxShadow = 'none';
      }
    };
    window.addEventListener('scroll', updateShadow, { passive: true });
    updateShadow();
  }

  /* ---- Scroll-reveal for timeline elements ---- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length) {
    document.body.classList.add('reveal-ready');

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));
  }
});
