// Webora interactions and animations (vanilla JS)

// Helpers
const qs = (sel, p = document) => p.querySelector(sel);
const qsa = (sel, p = document) => Array.from(p.querySelectorAll(sel));

// Hero animated word: typewriter + single color
(() => {
  const wordEl = qs('#hero-animated-word');
  if (!wordEl) return;
  const words = ['stunning', 'smart', 'simple'];
  let idx = 0;
  let typing = true;
  let char = 0;

  const type = () => {
    const current = words[idx % words.length];
    wordEl.textContent = current.slice(0, char);
    // use single accent color for the changing word
    wordEl.style.color = getComputedStyle(document.documentElement).getPropertyValue('--accent-1') || '#00f0ff';
    if (typing) {
      if (char < current.length) {
        char++;
      } else {
        typing = false;
        setTimeout(type, 1200);
        return;
      }
    } else {
      if (char > 0) {
        char--;
      } else {
        typing = true;
        idx++;
      }
    }
    setTimeout(type, typing ? 90 : 40);
  };
  type();
})();

// Intersection-based reveal animations
(() => {
  const revealEls = qsa('[data-reveal]');
  if (!('IntersectionObserver' in window) || revealEls.length === 0) {
    revealEls.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
  revealEls.forEach(el => io.observe(el));
})();

// Portfolio filters
(() => {
  const chips = qsa('.chip');
  const cards = qsa('.project-card');
  if (chips.length === 0) return;
  const applyFilter = (key) => {
    cards.forEach(card => {
      const cat = card.getAttribute('data-category');
      const show = key === 'all' || key === cat;
      card.style.display = show ? '' : 'none';
    });
  };
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      applyFilter(chip.getAttribute('data-filter'));
    });
  });
})();

// Mobile nav toggle
(() => {
  const toggle = qs('.nav-toggle');
  const nav = qs('#primary-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  // Close menu on nav link click (mobile UX)
  qsa('#primary-nav a').forEach(a => a.addEventListener('click', () => {
    if (nav.classList.contains('open')) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  }));
})();

// Back-to-top show/hide on scroll
(() => {
  const btn = qs('#to-top');
  if (!btn) return;
  const toggle = () => {
    if (window.scrollY > 180) btn.classList.add('is-visible'); else btn.classList.remove('is-visible');
  };
  window.addEventListener('scroll', toggle, { passive: true });
  toggle();
})();

// Year in footer
(() => {
  const yearEl = qs('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

// Hide page loader when content is ready
(() => {
  const loader = qs('#page-loader');
  if (!loader) return;
  const hide = () => {
    loader.style.opacity = '0';
    loader.style.transition = 'opacity 300ms ease';
    setTimeout(() => loader.remove(), 320);
  };
  if (document.readyState === 'complete') hide();
  else window.addEventListener('load', hide);
})();

// Contact form handling (client-side only)
(() => {
  const form = qs('#contact-form');
  const status = qs('#form-status');
  if (!form || !status) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();
    if (!name || !email || !message) {
      status.textContent = 'Please fill in all fields.';
      return;
    }
    status.textContent = 'Thanks! Your message has been prepared in your email client.';
    const subject = encodeURIComponent('Webora — New Project Inquiry');
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:hello@webora.studio?subject=${subject}&body=${body}`;
    form.reset();
  });
})();

// Background particles on canvas (lightweight) — can be disabled via data-enabled="false"
(() => {
  const canvas = qs('#bg-canvas');
  if (!canvas) return;
  if (canvas.getAttribute('data-enabled') === 'false') { return; }
  const ctx = canvas.getContext('2d');
  let width, height, raf;
  const particles = Array.from({ length: 60 }).map(() => ({
    x: Math.random(),
    y: Math.random(),
    vx: (Math.random() - 0.5) * 0.0006,
    vy: (Math.random() - 0.5) * 0.0006,
    r: 0.6 + Math.random() * 1.4,
    hue: [180, 300, 40][Math.floor(Math.random() * 3)],
  }));

  const resize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };
  window.addEventListener('resize', resize);
  resize();

  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > 1) p.vx *= -1;
      if (p.y < 0 || p.y > 1) p.vy *= -1;
      const px = p.x * width;
      const py = p.y * height;
      ctx.beginPath();
      ctx.arc(px, py, p.r, 0, Math.PI * 2);
      const grad = ctx.createRadialGradient(px, py, 0, px, py, p.r * 8);
      const color = `hsla(${p.hue}, 100%, 60%, 0.6)`;
      grad.addColorStop(0, color);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fill();
    });
    raf = requestAnimationFrame(draw);
  };
  draw();

  // Stop animation if tab is hidden to save power
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else draw();
  });
})();
