// Typewriter Effect
document.addEventListener("DOMContentLoaded", () => {
  const glowText = document.querySelector(".glow-text");
  const text = glowText.textContent;
  glowText.textContent = "";

  let i = 0;
  function typeWriter() {
    if (i < text.length) {
      glowText.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 120);
    }
  }
  typeWriter();
});

// Particle background effect
const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 1,
    dy: (Math.random() - 0.5) * 1,
  });
}



// Puzzle Modal Logic
const modal = document.getElementById("puzzleModal");
const span = document.querySelector(".close");
const resetBtn = document.getElementById("resetBtn");
const cells = document.querySelectorAll("[data-cell]");
const winnerText = document.getElementById("winnerText");

let turn = "X";

function checkWin(player) {
  const winCombos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return winCombos.some(combo => 
    combo.every(index => cells[index].textContent === player)
  );
}

function handleClick(e) {
  if(e.target.textContent !== "") return;
  e.target.textContent = turn;
  
  if(checkWin(turn)) {
    winnerText.style.display = "block";
    cells.forEach(cell => cell.removeEventListener("click", handleClick));
  } else {
    turn = turn === "X" ? "O" : "X";
  }
}

cells.forEach(cell => cell.addEventListener("click", handleClick));

resetBtn.addEventListener("click", () => {
  cells.forEach(cell => cell.textContent = "");
  winnerText.style.display = "none";
  turn = "X";
  cells.forEach(cell => cell.addEventListener("click", handleClick));
});

span.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if(e.target === modal) modal.style.display = "none"; }

// Optional: Open modal on some fun click (e.g., click your logo)
document.querySelector('.logo').addEventListener('dblclick', () => {
  modal.style.display = "block";
});


function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--accent");
  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Theme color switcher with localStorage
const root = document.documentElement;
const savedColor = localStorage.getItem("themeColor");
if (savedColor) {
  root.style.setProperty("--accent", savedColor);
}

document.querySelectorAll(".color-option").forEach(option => {
  option.addEventListener("click", () => {
    const newColor = option.getAttribute("data-color");
    root.style.setProperty("--accent", newColor);
    localStorage.setItem("themeColor", newColor);
  });
});

// Mobile Navbar Toggle
const navbar = document.querySelector('.navbar'); 
const hamburger = document.createElement('div');
hamburger.classList.add('hamburger');
hamburger.innerHTML = '<span></span><span></span><span></span>';
navbar.appendChild(hamburger);

hamburger.addEventListener('click', () => {
  navbar.classList.toggle('active');
});

