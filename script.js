// ==========================
// Particle Background
// ==========================
const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 100; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 1.5,
    dy: (Math.random() - 0.5) * 1.5
  });
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "#00e5ff";
    ctx.fill();
    
    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx = -p.dx;
    if (p.y < 0 || p.y > canvas.height) p.dy = -p.dy;
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ==========================
// Contact Card Hover Glow
// ==========================
const contactCards = document.querySelectorAll('.contact-card');

contactCards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });

  card.addEventListener('mouseleave', () => {
    card.style.setProperty('--mouse-x', `50%`);
    card.style.setProperty('--mouse-y', `50%`);
  });
});

// ==========================
// Color Theme Picker
// ==========================
const colorOptions = document.querySelectorAll('.color-option');
colorOptions.forEach(option => {
  option.addEventListener('click', () => {
    document.documentElement.style.setProperty('--theme-color', option.dataset.color);
    // Update glow colors dynamically
    document.querySelectorAll('.glow-text, .section-title, .skills-list li, .project-card').forEach(el => {
      el.style.textShadow = `0 0 10px ${option.dataset.color}, 0 0 20px ${option.dataset.color}`;
    });
    document.querySelectorAll('.bat-button, .contact-card, .project-card').forEach(el => {
      el.style.borderColor = option.dataset.color;
      el.style.boxShadow = `0 0 10px ${option.dataset.color}40`;
    });
  });
});
