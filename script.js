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
