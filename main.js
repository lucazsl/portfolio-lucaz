document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("menu");

  toggle.addEventListener("click", () => {
    const aberto = menu.classList.toggle("aberto");
    toggle.classList.toggle("aberto", aberto);
    toggle.setAttribute("aria-expanded", aberto);
  });

  menu.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("aberto");
      toggle.classList.remove("aberto");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  const digitando = document.getElementById("digitando");
  const palavras = [
    "Desenvolvedor Front-end",
    "Estudante de Tecnologia",
    "Apaixonado por Tecnologia",
    "Criador de Experiências",
  ];
  let indicePalavra = 0;
  let indiceLetra = 0;
  let apagando = false;

  function efeitoDigitacao() {
    const palavraAtual = palavras[indicePalavra];

    if (!apagando) {
     
      digitando.textContent = palavraAtual.slice(0, indiceLetra + 1);
      indiceLetra++;

      if (indiceLetra === palavraAtual.length) {
        apagando = true;
        setTimeout(efeitoDigitacao, 1800); 
        return;
      }
    } else {
    
      digitando.textContent = palavraAtual.slice(0, indiceLetra - 1);
      indiceLetra--;

      if (indiceLetra === 0) {
        apagando = false;
        indicePalavra = (indicePalavra + 1) % palavras.length;
      }
    }

    setTimeout(efeitoDigitacao, apagando ? 50 : 100);
  }

  efeitoDigitacao();

  const elementos = document.querySelectorAll(
    ".sobre__card, .projeto, .habilidade, .hobby"
  );
  elementos.forEach((el) => el.classList.add("revelar"));

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visivel");

          const preenchimento = entrada.target.querySelector(
            ".habilidade__preenchimento"
          );
          if (preenchimento) {
            preenchimento.style.width =
              preenchimento.getAttribute("data-nivel") + "%";
          }

          observador.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  elementos.forEach((el) => observador.observe(el));

  const secoes = document.querySelectorAll("section[id]");
  const linksNav = document.querySelectorAll(".nav__link");

  const observadorSecao = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          const id = entrada.target.getAttribute("id");
          linksNav.forEach((link) => {
            link.classList.toggle("ativo", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  secoes.forEach((secao) => observadorSecao.observe(secao));

  const form = document.getElementById("form-contato");
  const status = document.getElementById("status");

  form.addEventListener("submit", (evento) => {
    evento.preventDefault(); 

    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const mensagem = document.getElementById("mensagem");

    let valido = true;

    [nome, email, mensagem].forEach((campo) => {
      campo.classList.remove("invalido");
      if (!campo.value.trim()) {
        campo.classList.add("invalido");
        valido = false;
      }
    });

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() && !regexEmail.test(email.value.trim())) {
      email.classList.add("invalido");
      valido = false;
    }

    if (valido) {
      status.textContent = "Mensagem enviada com sucesso! (demonstração)";
      status.className = "contato__status sucesso";
      form.reset();
    } else {
      status.textContent = "Preencha todos os campos corretamente.";
      status.className = "contato__status erro";
    }
  });

  document.getElementById("ano").textContent = new Date().getFullYear();
});
