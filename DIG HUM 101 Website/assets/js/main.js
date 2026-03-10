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

  /* ---- Hero & page-header entrance animations ---- */
  const hero = document.querySelector('.hero');
  const pageHeader = document.querySelector('.page-header');
  const pageHeaderClean = document.querySelector('.page-header-clean');

  if (hero) {
    requestAnimationFrame(() => {
      hero.classList.add('is-loaded');
      const heroBg = hero.querySelector('.hero-bg');
      if (heroBg) heroBg.classList.add('is-loaded');
    });
  }
  if (pageHeader) {
    requestAnimationFrame(() => {
      pageHeader.classList.add('is-loaded');
      const heroBg = pageHeader.querySelector('.hero-bg');
      if (heroBg) heroBg.classList.add('is-loaded');
    });
  }
  if (pageHeaderClean) {
    requestAnimationFrame(() => pageHeaderClean.classList.add('is-loaded'));
  }

  /* ---- Subtle parallax on hero/page-header backgrounds ---- */
  const parallaxBg = document.querySelector('.hero .hero-bg img, .page-header .hero-bg img');
  if (parallaxBg) {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 800) {
        parallaxBg.style.transform = `scale(1.06) translateY(${y * 0.15}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
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

  /* ---- CountUp animation for stat numbers ---- */
  const statNums = document.querySelectorAll('.stat-number');
  if (statNums.length) {
    const countUp = (el) => {
      const text = el.textContent.trim();
      const hasPercent = text.includes('%');
      const hasComma = text.includes(',');
      const raw = parseFloat(text.replace(/[,%]/g, ''));
      if (isNaN(raw)) return;
      const isDecimal = text.includes('.') && !hasComma;
      const decimals = isDecimal ? (text.split('.')[1] || '').replace('%', '').length : 0;
      const duration = 1200;
      const start = performance.now();
      const step = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        let val = (raw * ease).toFixed(decimals);
        if (hasComma) val = Number(val).toLocaleString('en-US');
        el.textContent = val + (hasPercent ? '%' : '');
        if (t < 1) requestAnimationFrame(step);
      };
      el.textContent = '0' + (hasPercent ? '%' : '');
      requestAnimationFrame(step);
    };
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          countUp(entry.target);
          statObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    statNums.forEach(el => statObserver.observe(el));
  }

  /* ---- Timeline scroll progress bar ---- */
  const progressFill = document.getElementById('tl-progress');
  const tlWrapper = document.querySelector('.tl-wrapper');
  if (progressFill && tlWrapper) {
    const updateProgress = () => {
      const rect = tlWrapper.getBoundingClientRect();
      const start = rect.top + window.scrollY;
      const end = start + rect.height - window.innerHeight;
      const progress = Math.min(Math.max((window.scrollY - start) / (end - start), 0), 1);
      progressFill.style.width = (progress * 100) + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }
});
