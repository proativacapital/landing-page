/* ============================================================================
   NORTIA — JavaScript
   ----------------------------------------------------------------------------
   Três responsabilidades, todas simples:
     1. NOME DA MARCA como CONSTANTE ÚNICA (fonte da verdade).
     2. Animação sóbria de scroll-reveal (fade-in / slide-up ao rolar).
     3. Detalhe de UI: linha discreta no cabeçalho depois de rolar.
   ============================================================================ */

/* ============================================================
   1. NOME DA MARCA  —  >>> EDITAR AQUI E SÓ AQUI <<<
   ------------------------------------------------------------
   O nome "Nortia" NÃO está escrito solto no HTML. Ele é injetado
   em todos os pontos marcados com o atributo [data-brand].
   Para renomear a marca no futuro, troque APENAS a linha abaixo.
   ============================================================ */
const BRAND_NAME = "Nortia";

/* Sufixo usado no título da aba do navegador (SEO/branding).
   EDITAR: ajuste a descrição se quiser. */
const PAGE_TITLE_SUFFIX = "Conciliação fiscal feita pra você";

/* Aplica o nome da marca em todos os elementos marcados com [data-brand]
   e no <title> da página. */
function applyBrandName() {
  document.querySelectorAll("[data-brand]").forEach(function (el) {
    el.textContent = BRAND_NAME;
  });
  document.title = BRAND_NAME + " — " + PAGE_TITLE_SUFFIX;
}

/* ============================================================
   2. SCROLL-REVEAL
   Usa IntersectionObserver: cada elemento .reveal recebe a classe
   .is-visible quando entra na tela. Timing elegante via CSS.
   ============================================================ */
function setupScrollReveal() {
  const revealEls = document.querySelectorAll(".reveal");

  /* Sem suporte a IntersectionObserver ou movimento reduzido: mostra tudo. */
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (!("IntersectionObserver" in window) || prefersReduced) {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  const observer = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target); /* anima uma vez só */
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealEls.forEach(function (el) {
    observer.observe(el);
  });
}

/* ============================================================
   3. CABEÇALHO — linha discreta após rolar
   ============================================================ */
function setupHeaderState() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ============================================================
   Inicialização
   ============================================================ */
document.addEventListener("DOMContentLoaded", function () {
  applyBrandName();
  setupScrollReveal();
  setupHeaderState();
});
