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

// ==========================
// Tic-Tac-Toe Modal Logic
// ==========================
const modal = document.getElementById("puzzleModal");
const closeBtn = modal?.querySelector(".close");
const resetBtn = document.getElementById("resetBtn");
const cells = document.querySelectorAll("[data-cell]");
const winnerText = document.getElementById("winnerText");

let turn = "X";

const winCombos = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function checkWin(player) {
  return winCombos.some(combo => combo.every(i => cells[i].textContent === player));
}

function handleClick(e) {
  if (e.target.textContent !== "") return;

  e.target.textContent = turn;

  if (checkWin(turn)) {
    winnerText.style.display = "block";
    cells.forEach(cell => cell.removeEventListener("click", handleClick));
  } else if ([...cells].every(cell => cell.textContent !== "")) {
    winnerText.textContent = "Draw!";
    winnerText.style.display = "block";
  } else {
    turn = turn === "X" ? "O" : "X";
  }
}

function resetGame() {
  cells.forEach(cell => cell.textContent = "");
  winnerText.style.display = "none";
  winnerText.textContent = "Winner: ";
  turn = "X";
  cells.forEach(cell => cell.addEventListener("click", handleClick));
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
resetBtn?.addEventListener("click", resetGame);
closeBtn?.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", (e) => { if(e.target === modal) modal.style.display = "none"; });

// ==========================
// Fun Trigger: Open Modal
// ==========================
document.querySelector('.logo')?.addEventListener('dblclick', () => {
  modal.style.display = "block";
});
