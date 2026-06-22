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

/* ============================================================
   DESTINO DA LISTA DE ESPERA  —  >>> EDITAR ANTES DE PUBLICAR <<<
   ------------------------------------------------------------
   Cole aqui o endpoint que vai RECEBER os e-mails da lista.
   Recomendado: Formspree (grátis, 2 min). Passo a passo no README,
   seção "Conectar a lista de espera".

     const WAITLIST_ENDPOINT = "https://formspree.io/f/SEU_ID";

   Enquanto estiver vazio (""), o formulário valida o e-mail e mostra
   a confirmação, mas NÃO guarda nada (modo demonstração) — e avisa
   no console do navegador.
   ============================================================ */
const WAITLIST_ENDPOINT = "";

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
   4. LISTA DE ESPERA (waitlist)
   ------------------------------------------------------------
   Captura o e-mail na própria página: valida, envia para o
   WAITLIST_ENDPOINT (se configurado) e troca o formulário pelo
   estado de sucesso. Sem endpoint, roda em "modo demonstração".
   ============================================================ */
function isValidEmail(value) {
  /* Verificação simples e suficiente para um e-mail de lista de espera. */
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function setupWaitlist() {
  const form = document.getElementById("waitlist-form");
  const success = document.getElementById("waitlist-success");
  if (!form || !success) return;

  const emailInput = document.getElementById("wl-email");
  const errorEl = document.getElementById("wl-error");
  const submitBtn = form.querySelector(".waitlist-submit");
  const submitLabel = submitBtn ? submitBtn.textContent : "";

  /* Troca o formulário pela mensagem de sucesso e leva o olho até ela. */
  function showSuccess() {
    form.hidden = true;
    success.hidden = false;
    success.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function showError(message) {
    if (!errorEl) return;
    errorEl.textContent = message;
    errorEl.hidden = false;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (errorEl) errorEl.hidden = true;

    const email = (emailInput.value || "").trim();
    if (!isValidEmail(email)) {
      showError("Confira o e-mail e tente de novo.");
      emailInput.focus();
      return;
    }

    /* Sem destino configurado: confirma na tela, mas avisa que nada foi salvo. */
    if (!WAITLIST_ENDPOINT) {
      console.warn(
        "[" + BRAND_NAME + "] WAITLIST_ENDPOINT está vazio: o e-mail NÃO foi salvo. " +
        "Configure o endpoint no script.js antes de publicar (ver README)."
      );
      showSuccess();
      return;
    }

    /* Estado de envio */
    if (submitBtn) {
      submitBtn.setAttribute("aria-busy", "true");
      submitBtn.textContent = "Enviando…";
    }

    const payload = new FormData(form);
    payload.append("_origem", "landing-" + BRAND_NAME.toLowerCase());

    fetch(WAITLIST_ENDPOINT, {
      method: "POST",
      body: payload,
      headers: { Accept: "application/json" },
    })
      .then(function (res) {
        if (!res.ok) throw new Error("Resposta " + res.status);
        showSuccess();
      })
      .catch(function () {
        if (submitBtn) {
          submitBtn.removeAttribute("aria-busy");
          submitBtn.textContent = submitLabel;
        }
        showError("Não consegui enviar agora. Tente de novo em instantes.");
      });
  });
}

/* ============================================================
   Inicialização
   ============================================================ */
document.addEventListener("DOMContentLoaded", function () {
  applyBrandName();
  setupScrollReveal();
  setupHeaderState();
  setupWaitlist();
});
