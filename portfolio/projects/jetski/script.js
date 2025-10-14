// Fortnight - Interactions & Animations

document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer animations (slower)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('animate-in');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -80px 0px' });

  document.querySelectorAll('.section-title, .value-card, .product-card, .post-card, .cta-box, .about-text, .about-img').forEach(el => observer.observe(el));

  // Parallax waves background (reduced intensity)
  const waves = document.querySelector('.waves-bg');
  if (waves) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      waves.style.transform = `translateY(${y * 0.08}px)`; // slower parallax
    }, { passive: true });
  }

  // Mobile menu toggle
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.classList.toggle('open');
      if (nav.classList.contains('open')) {
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
        nav.style.gap = '12px';
        nav.style.background = 'rgba(255,255,255,.98)';
        nav.style.position = 'absolute';
        nav.style.right = '20px';
        nav.style.top = '64px';
        nav.style.padding = '12px 16px';
        nav.style.border = '1px solid rgba(0,0,0,.05)';
        nav.style.borderRadius = '12px';
        nav.style.boxShadow = '0 10px 28px rgba(0,0,0,.08)';
      } else {
        nav.removeAttribute('style');
      }
    });
  }

  // CTA ripple effect (softer)
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const ripple = document.createElement('span');
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.position = 'absolute';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      ripple.style.background = 'rgba(255,255,255,.35)';
      ripple.style.borderRadius = '50%';
      ripple.style.pointerEvents = 'none';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'ripple 0.9s ease-out forwards';
      ripple.className = 'ripple';
      btn.style.position = 'relative';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 950);
    });
  });

  // Lazy-load placeholders for images
  document.querySelectorAll('[data-img]').forEach(div => {
    div.style.backgroundImage = 'linear-gradient(135deg,#121212,#1b1b1b)';
    div.style.backgroundSize = 'cover';
    div.style.backgroundPosition = 'center';
  });
});

// Inline CSS for simple animations (slower)
const style = document.createElement('style');
style.textContent = `
  .animate-in { animation: rise .8s cubic-bezier(.25,.8,.25,1) both; }
  @keyframes rise { from { opacity: 0; transform: translateY(18px) } to { opacity:1; transform:translateY(0) } }
  @keyframes ripple { to { transform: scale(3.2); opacity: 0 } }
`;
document.head.appendChild(style);
