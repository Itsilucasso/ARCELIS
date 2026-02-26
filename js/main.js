/* Transcrição de textos*/
document.addEventListener("DOMContentLoaded", () => {
  const elemento = document.querySelector(".typewriter");
  if (!elemento) return;

  const textoOriginal = elemento.textContent.trim();
  elemento.textContent = "";

  let index = 0;
  const velocidadeEscrita = 60;

  function animar() {
    elemento.textContent = textoOriginal.slice(0, index + 1);
    index++;
    if (index < textoOriginal.length) setTimeout(animar, velocidadeEscrita);
  }

  animar();
});

/* Animação de "reveal" dos elementos da página */
const elements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {

    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    } else {
      entry.target.classList.remove("active");
    }

  });
}, {
  threshold: 0.2
});

elements.forEach((el) => observer.observe(el));