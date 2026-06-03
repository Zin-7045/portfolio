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
  
  // Dynamic header scrolled scaling
  const navbar = document.querySelector('nav');
  if (navbar) {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // Immersive emerging scroll background flow
  const root = document.documentElement;
  if (current === 'home' || !current) {
    root.style.setProperty('--glow-1', '#7c6aff'); // Electric Indigo
    root.style.setProperty('--glow-2', '#3bc9b0'); // Neon Cyan/Teal
    root.style.setProperty('--glow-3', '#7c6aff');
  } else if (current === 'about') {
    root.style.setProperty('--glow-1', '#3bc9b0'); // Cyan/Teal
    root.style.setProperty('--glow-2', '#5a4ce0'); // Deep Ocean Blue
    root.style.setProperty('--glow-3', '#3bc9b0');
  } else if (current === 'skills') {
    root.style.setProperty('--glow-1', '#a855f7'); // Violet/Purple
    root.style.setProperty('--glow-2', '#7c6aff'); // Electric Indigo
    root.style.setProperty('--glow-3', '#a855f7');
  } else if (current === 'projects') {
    root.style.setProperty('--glow-1', '#3bc9b0'); // Neon Cyan
    root.style.setProperty('--glow-2', '#a855f7'); // Neon Violet
    root.style.setProperty('--glow-3', '#3bc9b0');
  } else if (current === 'contact') {
    root.style.setProperty('--glow-1', '#7c6aff'); // Electric Indigo
    root.style.setProperty('--glow-2', '#3bc9b0'); // Neon Teal
    root.style.setProperty('--glow-3', '#7c6aff');
  }
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
      const el = entry.target;
      const width = el.getAttribute('data-width');
      if (width) {
        el.style.width = width + '%';
      }
      barObserver.unobserve(el);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.fill').forEach(el => barObserver.observe(el));

/* ==========================================================================
   DYNAMIC PORTFOLIO LOGIC & COOL INTERACTIVE ENHANCEMENTS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCursorTracker();
  initStatsCounters();
  initMagneticNodes();
  initCardSpotlights();
});

/* ===== 1. CUSTOM TRAILING CURSOR HALO ===== */
function initCursorTracker() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Position dot instantly
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  // Lerp trailer loop
  function animateRing() {
    const lerp = 0.15;
    ringX += (mouseX - ringX) * lerp;
    ringY += (mouseY - ringY) * lerp;
    
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Morph halo on hover
  const interactives = document.querySelectorAll('a, button, .channel, .magnetic-node, .hamburger, .run-code-btn');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  // Scale halo on click
  window.addEventListener('mousedown', () => document.body.classList.add('cursor-active'));
  window.addEventListener('mouseup', () => document.body.classList.remove('cursor-active'));
}

/* ===== 2. ACTIVE STATS METRIC COUNTER REVEAL ===== */
function initStatsCounters() {
  const countElements = document.querySelectorAll('.count');
  
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        
        let current = 0;
        const duration = 1500; // ms
        const increment = target / (duration / 16); // 60fps
        
        function countUp() {
          current += increment;
          if (current >= target) {
            el.textContent = target;
          } else {
            el.textContent = Math.floor(current);
            requestAnimationFrame(countUp);
          }
        }
        
        countUp();
        observer.unobserve(el); // Only fire once
      }
    });
  }, { threshold: 0.2 });

  countElements.forEach(el => counterObserver.observe(el));
}

/* ===== 3. MAGNETIC NODE PULL EASE ===== */
function initMagneticNodes() {
  const magneticNodes = document.querySelectorAll('.magnetic-node');
  
  // Disable on small tablets / touch screens for performance
  if (window.innerWidth < 768) return;

  magneticNodes.forEach(node => {
    node.addEventListener('mousemove', (e) => {
      const bounds = node.getBoundingClientRect();
      const x = e.clientX - bounds.left - (bounds.width / 2);
      const y = e.clientY - bounds.top - (bounds.height / 2);
      
      const factor = 0.35;
      node.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });

    node.addEventListener('mouseleave', () => {
      node.style.transform = 'translate(0px, 0px)';
    });
  });
}

/* ===== 4. EMAIL COPY TO CLIPBOARD SUCCESS TOAST & MAILTO APP REDIRECT ===== */
window.copyEmail = function(triggerBtn) {
  const email = 'abdur.dev@outlook.com';
  const toast = document.getElementById('connectToast');
  
  navigator.clipboard.writeText(email).then(() => {
    if (toast) {
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2200);
    }
    // Launch email app after a minor delay
    setTimeout(() => {
      window.location.href = `mailto:${email}`;
    }, 300);
  }).catch(err => {
    console.error('Copy pipeline failed: ', err);
    // Fallback: Launch email app immediately if clipboard blocked
    window.location.href = `mailto:${email}`;
  });
};

/* ===== 5. HERO PY SCRIPT OUTPUT TOGGLE ===== */
window.runHeroCode = function(btn) {
  const output = document.getElementById('heroCodeOutput');
  if (!output) return;
  
  // Toggle output window show
  output.classList.toggle('show');
  
  // Flashing micro action indicator on run button
  if (output.classList.contains('show')) {
    btn.innerHTML = '<i class="fas fa-undo"></i> Reset';
    btn.style.background = 'rgba(80, 250, 123, 0.1)';
    btn.style.color = '#50fa7b';
    btn.style.borderColor = '#50fa7b';
  } else {
    btn.innerHTML = '<i class="fas fa-play"></i> Run';
    btn.style.background = 'rgba(124, 106, 255, 0.1)';
    btn.style.color = '#7c6aff';
    btn.style.borderColor = 'rgba(124, 106, 255, 0.3)';
  }
};



/* ===== 7. VERCEL-STYLE CARD HOVER SPOTLIGHTS ===== */
function initCardSpotlights() {
  const cards = document.querySelectorAll('.project-card, .stat-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}


