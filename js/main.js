document.addEventListener("DOMContentLoaded", () => {
  /* TYPEWRITER */
  const type = document.querySelector(".typewriter");

  if (type) {
    const text = type.textContent.trim();
    type.textContent = "";
    let i = 0;

    const write = () => {
      type.textContent = text.slice(0, ++i);
      if (i < text.length) setTimeout(write, 60);
    };

    write();
  }

  /* REVEAL */
  const reveals = document.querySelectorAll(".reveal");
  const detalhes = document.querySelectorAll(".servico__type");

  reveals.forEach((el) => {
    if (
      ["from-left", "from-right", "from-top", "from-bottom"].some((c) =>
        el.classList.contains(c),
      )
    )
      return;

    const servico = el.closest(".servicos__grid");

    if (servico) {
      const reverse = servico.classList.contains("reverse");
      const title = el.closest(".servicos__title");
      const text = el.closest(".servicos__text");

      el.classList.add(
        title
          ? reverse
            ? "from-right"
            : "from-left"
          : text
            ? reverse
              ? "from-left"
              : "from-right"
            : "from-bottom",
      );

      return;
    }

    const sobre = el.closest(".sobre__grid");

    if (sobre) {
      el.classList.add(
        el.closest(".sobre__arcelis") ? "from-left" : "from-right",
      );
      return;
    }

    el.classList.add("from-bottom");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -10% 0px",
    },
  );

  reveals.forEach((el) => observer.observe(el));

  /* REANIMAÇÃO DO ACCORDION */
  detalhes.forEach((detail) => {
    detail.addEventListener("toggle", () => {
      if (!detail.open) return;

      detail.querySelectorAll(".reveal").forEach((el) => {
        el.classList.remove("active");
        void el.offsetWidth;
        el.classList.add("active");
      });
    });
  });
});

const phone = document.getElementById("phone");

phone.addEventListener("input", (e) => {
  // Remove tudo que não for número
  let numbers = e.target.value.replace(/\D/g, "");

  // Remove um 55 inicial caso o usuário digite
  if (numbers.startsWith("55")) {
    numbers = numbers.substring(2);
  }

  // Limita a DDD + número (11 dígitos)
  numbers = numbers.slice(0, 11);

  let formatted = "+55";

  if (numbers.length > 0) {
    formatted += " (" + numbers.substring(0, 2);
  }

  if (numbers.length >= 2) {
    formatted += ")";
  }

  if (numbers.length > 2) {
    formatted += " " + numbers.substring(2, 7);
  }

  if (numbers.length > 7) {
    formatted += "-" + numbers.substring(7, 11);
  }

  e.target.value = formatted;
});

// Deixa o +55 aparecer quando o campo recebe foco
phone.addEventListener("focus", () => {
  if (phone.value === "") {
    phone.value = "+55 ";
  }
});

const bgDesktop = document.querySelector(".video-bg:not(.bgmobile) source");
const bgMobile = document.querySelector(".video-bg.bgmobile source");
