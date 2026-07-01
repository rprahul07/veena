/* =============================================
   VEENA PRASAD — PORTFOLIO JAVASCRIPT
   ============================================= */

// ---- NAVBAR SCROLL ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// ---- HAMBURGER MENU ----
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  hamburger.classList.toggle('active');
  if (hamburger.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
  } else {
    spans.forEach(s => { s.style.transform=''; s.style.opacity=''; });
  }
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform=''; s.style.opacity=''; });
  });
});

// ---- ACTIVE NAV LINKS (INTERSECTION OBSERVER) ----
const sections  = document.querySelectorAll('section[id]');
const navItems  = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navItems.forEach(n => n.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));

// ---- TYPEWRITER ----
const roles = [
  'IT Student @ CE Vadakara.',
  'FY Coordinator @ TinkerHub.',
  'IPR Lead @ IEDC CEV.',
  'Publicity Lead @ QL.',
  'Full Stack Developer.'
];
let roleIdx = 0, charIdx = 0, deleting = false;
const tw = document.getElementById('typewriter');

function typeWrite() {
  const current = roles[roleIdx];
  if (!deleting) {
    tw.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) { deleting = true; setTimeout(typeWrite, 2000); return; }
  } else {
    tw.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; }
  }
  setTimeout(typeWrite, deleting ? 50 : 80);
}
setTimeout(typeWrite, 1500);

// ---- PARTICLES CANVAS ----
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particlesArr = [];

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x  = Math.random() * canvas.width;
    this.y  = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.r  = Math.random() * 1.5 + 0.5;
    this.a  = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.5 ? '139,92,246' : '34,211,238';
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.a})`;
    ctx.fill();
  }
}

for (let i = 0; i < 80; i++) particlesArr.push(new Particle());

function connectParticles() {
  for (let i = 0; i < particlesArr.length; i++) {
    for (let j = i + 1; j < particlesArr.length; j++) {
      const dx = particlesArr[i].x - particlesArr[j].x;
      const dy = particlesArr[i].y - particlesArr[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particlesArr[i].x, particlesArr[i].y);
        ctx.lineTo(particlesArr[j].x, particlesArr[j].y);
        ctx.strokeStyle = `rgba(139,92,246,${0.08 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArr.forEach(p => { p.update(); p.draw(); });
  connectParticles();
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ---- SCROLL REVEAL ----
const revealEls = document.querySelectorAll(
  '.section-header, .about-text, .about-visual, .skill-category, ' +
  '.project-card, .experience-card, .timeline-item, .contact-card, .contact-form, .stat-card'
);
revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), 80);
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

// ---- STAGGERED REVEAL (children) ----
document.querySelectorAll('.skills-grid, .projects-grid').forEach(grid => {
  Array.from(grid.children).forEach((child, idx) => {
    child.style.transitionDelay = `${idx * 0.1}s`;
  });
});

// ---- CONTACT FORM ----
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submit-btn');
  const txt = document.getElementById('btn-text');
  const success = document.getElementById('form-success');

  btn.disabled = true;
  txt.textContent = 'Sending... ⏳';

  setTimeout(() => {
    txt.textContent = 'Send Message 🚀';
    btn.disabled = false;
    success.style.display = 'block';
    e.target.reset();
    setTimeout(() => { success.style.display = 'none'; }, 4000);
  }, 1500);
}

// ---- MOUSE PARALLAX ON HERO AVATAR ----
const heroAvatar = document.querySelector('.hero-avatar');
if (heroAvatar) {
  document.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    heroAvatar.style.transform = `translate(${dx * 10}px, ${dy * 10}px)`;
  });
}

// ---- SKILL TAG HOVER GLOW ----
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('mouseenter', () => {
    tag.style.boxShadow = `0 0 12px ${tag.style.getPropertyValue('--clr')}66`;
  });
  tag.addEventListener('mouseleave', () => {
    tag.style.boxShadow = '';
  });
});
