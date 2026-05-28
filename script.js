/* ===== MOBILE MENU ===== */
function toggleMenu() {
  const links = document.getElementById('navLinks');
  links.classList.toggle('open');
}

document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
  });
});

/* ===== ACTIVE NAV LINK ===== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 200;
    if (window.scrollY >= top) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
});

/* ===== TYPEWRITER ===== */
const words = ['ML Pipelines', 'RAG Systems', 'Streaming Data', 'Smart Contracts', 'AI Applications'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typing');

function typeEffect() {
  const current = words[wordIndex];
  if (!isDeleting) {
    typingEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1800);
      return;
    }
    setTimeout(typeEffect, 80);
  } else {
    typingEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(typeEffect, 400);
      return;
    }
    setTimeout(typeEffect, 40);
  }
}

if (typingEl) typeEffect();

/* ===== FADE-IN SCROLL ===== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

/* ===== SKILL BARS ANIMATE ON SCROLL ===== */
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.getAttribute('data-width') || entry.target.classList.contains('p95') ? '95%' :
        entry.target.classList.contains('p90') ? '90%' :
        entry.target.classList.contains('p85') ? '85%' :
        entry.target.classList.contains('p80') ? '80%' :
        entry.target.classList.contains('p75') ? '75%' : '70%';
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.fill').forEach(el => barObserver.observe(el));
