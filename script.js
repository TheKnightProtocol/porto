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

// Language translations
const translations = {
  en: {
    summaryTitle: "🦇 Summary",
    summaryText: "Aspiring AI/ML Engineer specializing in Generative AI, LLMs, and NLP...",
    skillsTitle: "⚡ Skills",
    experienceTitle: "💼 Experience",
    projectsTitle: "💻 Projects",
    educationTitle: "🎓 Education",
    contactTitle: "📨 Contact",
  },
  es: {
    summaryTitle: "🦇 Resumen",
    summaryText: "Aspirante a Ingeniero de IA/ML especializado en Generative AI, LLMs y NLP...",
    skillsTitle: "⚡ Habilidades",
    experienceTitle: "💼 Experiencia",
    projectsTitle: "💻 Proyectos",
    educationTitle: "🎓 Educación",
    contactTitle: "📨 Contacto",
  },
  fr: {
    summaryTitle: "🦇 Résumé",
    summaryText: "Aspirant Ingénieur IA/ML spécialisé en Generative AI, LLMs et NLP...",
    skillsTitle: "⚡ Compétences",
    experienceTitle: "💼 Expérience",
    projectsTitle: "💻 Projets",
    educationTitle: "🎓 Éducation",
    contactTitle: "📨 Contact",
  },
  de: {
    summaryTitle: "🦇 Zusammenfassung",
    summaryText: "Angehender KI/ML-Ingenieur mit Spezialisierung auf Generative AI, LLMs und NLP...",
    skillsTitle: "⚡ Fähigkeiten",
    experienceTitle: "💼 Erfahrung",
    projectsTitle: "💻 Projekte",
    educationTitle: "🎓 Ausbildung",
    contactTitle: "📨 Kontakt",
  },
  zh: {
    summaryTitle: "🦇 简介",
    summaryText: "有志成为AI/ML工程师，专注于生成式AI、大语言模型和自然语言处理...",
    skillsTitle: "⚡ 技能",
    experienceTitle: "💼 经历",
    projectsTitle: "💻 项目",
    educationTitle: "🎓 教育",
    contactTitle: "📨 联系方式",
  }
};

// Apply translations
document.getElementById("language-selector").addEventListener("change", (e) => {
  const lang = e.target.value;
  document.querySelector("#summary h2").textContent = translations[lang].summaryTitle;
  document.querySelector("#summary-text").textContent = translations[lang].summaryText;
  document.querySelector("#skills h2").textContent = translations[lang].skillsTitle;
  document.querySelector("#experience h2").textContent = translations[lang].experienceTitle;
  document.querySelector("#projects h2").textContent = translations[lang].projectsTitle;
  document.querySelector("#education h2").textContent = translations[lang].educationTitle;
  document.querySelector("#contact h2").textContent = translations[lang].contactTitle;
});


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
