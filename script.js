function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('active');
}

function closeMenu() {
  document.getElementById('navLinks').classList.remove('active');
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => {
  el.style.animationPlayState = 'paused';
  observer.observe(el);
});
