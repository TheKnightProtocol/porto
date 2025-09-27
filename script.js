// ==========================
// Typewriter Effect
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const glowText = document.querySelector(".glow-text");
  if (!glowText) return;

  const text = glowText.textContent;
  glowText.textContent = "";
  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      glowText.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100); // slightly faster typing
    }
  }
  typeWriter();
});

// ==========================
// Particle Background Effect
// ==========================
const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particleCount = 100;
let particles = [];

function createParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 1.2,
      dy: (Math.random() - 0.5) * 1.2,
    });
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--accent") || "#00e5ff";

  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    // Bounce off edges
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });

  requestAnimationFrame(animateParticles);
}

createParticles();
animateParticles();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createParticles();
});

// ==========================
// Theme Color Switcher
// ==========================
const root = document.documentElement;
const savedColor = localStorage.getItem("themeColor");
if (savedColor) root.style.setProperty("--accent", savedColor);

document.querySelectorAll(".color-option").forEach(option => {
  option.addEventListener("click", () => {
    const newColor = option.getAttribute("data-color");
    root.style.setProperty("--accent", newColor);
    localStorage.setItem("themeColor", newColor);
  });
});


// Scroll-to-Top Button Logic
const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.classList.add("show");
  } else {
    scrollBtn.classList.remove("show");
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


// =========================
// Message Modal
// =========================
const modal = document.getElementById("messageModal");
const openBtn = document.getElementById("openMessageBtn");
const closeBtn = document.querySelector(".modal .close");
const form = document.getElementById("messageForm");
const responseBox = document.getElementById("formResponse");

openBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Handle Form Submit
form.addEventListener("submit", async function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  try {
    const res = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" }
    });
    if (res.ok) {
      responseBox.textContent = "✅ Message Sent Successfully!";
      responseBox.style.color = "#39ff14";
      form.reset();
    } else {
      responseBox.textContent = "❌ Error sending message. Try again.";
      responseBox.style.color = "#ff0077";
    }
  } catch (err) {
    responseBox.textContent = "⚠️ Network error. Please try later.";
    responseBox.style.color = "#ff0077";
  }
});


