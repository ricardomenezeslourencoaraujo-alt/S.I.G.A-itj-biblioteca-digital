document.addEventListener("DOMContentLoaded", () => {

  // ──────────────────────────────────────────────
  // Referências
  // ──────────────────────────────────────────────
  const wrapper = document.querySelector(".language-wrapper");
  const langBtn = document.querySelector(".language-button");
  const langItems = document.querySelectorAll(".language-list li");
  const currentFlag = document.getElementById("current-flag");
  const currentLangText = document.getElementById("current-lang-text");

  const togglePassword = document.getElementById("toggleAdminPassword");
  const passwordInput = document.getElementById("admin-password");
  const capsWarning = document.getElementById("caps_warning_admin");
  const formLogin = document.getElementById("form-login-adm");
  const errorMessage = document.querySelector(".error-message");

  const emailInput = document.getElementById("admin-email");

  // ──────────────────────────────────────────────
  // Traduções
  // ──────────────────────────────────────────────
  let idiomaAtual = "pt";

  const translations = {
    pt: {
      flag: "Imagens/br.png",
      titleLogin: "Login Admin",
      phEmail: "Email",
      phPassword: "Senha",
      btnLogin: "Entrar",
      textRemember: "Lembrar-me",
      linkForgot: "Esqueceu a senha?",
      msgCaps: "Caps Lock ativado!",
      msgError: "EMAIL OU SENHA INVÁLIDOS!",
      msgSuccess: "LOGIN BEM-SUCEDIDO!",
      panelTitle: "Painel Administrativo",
      panelDesc: "Gerencie sua biblioteca com praticidade."
    },
    en: {
      flag: "Imagens/us.png",
      titleLogin: "Admin Login",
      phEmail: "Email",
      phPassword: "Password",
      btnLogin: "Sign In",
      textRemember: "Remember me",
      linkForgot: "Forgot Password?",
      msgCaps: "Caps Lock is on!",
      msgError: "INVALID EMAIL OR PASSWORD!",
      msgSuccess: "LOGIN SUCCESSFUL!",
      panelTitle: "Admin Panel",
      panelDesc: "Manages your library with practicality."
    },
    es: {
      flag: "Imagens/es.png",
      titleLogin: "Login Admin",
      phEmail: "Correo electrónico",
      phPassword: "Contraseña",
      btnLogin: "Entrar",
      textRemember: "Recuérdame",
      linkForgot: "¿Olvidaste tu contraseña?",
      msgCaps: "¡Bloq Mayús activado!",
      msgError: "¡CORREO O CONTRASEÑA INVÁLIDOS!",
      msgSuccess: "¡INICIO DE SESIÓN EXITOSO!",
      panelTitle: "Panel de Administración",
      panelDesc: "Gestiona tu biblioteca con practicidad."
    }
  };

  // ──────────────────────────────────────────────
  // Aplica o idioma
  // ──────────────────────────────────────────────
  function applyLanguage(lang) {
    const t = translations[lang];
    if (!t) return;

    // Formulário
    document.querySelector(".dot-title").textContent = t.titleLogin;
    emailInput.placeholder = t.phEmail;
    passwordInput.placeholder = t.phPassword;
    document.getElementById("btn-submit-login").textContent = t.btnLogin;
    document.querySelector(".options-group span").textContent = t.textRemember;
    document.querySelector(".options-group a").textContent = t.linkForgot;
    capsWarning.textContent = t.msgCaps;

    // Painel decorativo
    document.getElementById("panel-title").textContent = t.panelTitle;
    document.getElementById("panel-desc").textContent = t.panelDesc;
  }

  // ──────────────────────────────────────────────
  // Seletor de idioma
  // ──────────────────────────────────────────────
  langBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    wrapper.classList.toggle("active");
  });

  document.addEventListener("click", () => {
    wrapper.classList.remove("active");
  });

  langItems.forEach(item => {
    item.addEventListener("click", () => {
      const lang = item.dataset.lang;
      idiomaAtual = lang;

      // Atualiza bandeira e texto
      currentFlag.src = translations[lang].flag;
      currentFlag.alt = item.querySelector("img").alt;
      currentLangText.textContent = lang.toUpperCase();

      applyLanguage(lang);
      wrapper.classList.remove("active");
    });
  });

  // Define idioma inicial
  applyLanguage("pt");

  // ──────────────────────────────────────────────
  // Olho da senha
  // ──────────────────────────────────────────────
  togglePassword.addEventListener("click", (e) => {
    e.preventDefault();
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    togglePassword.classList.toggle("fa-eye", isPassword);
    togglePassword.classList.toggle("fa-eye-slash", !isPassword);
  });

  // ──────────────────────────────────────────────
  // Caps Lock
  // ──────────────────────────────────────────────
  passwordInput.addEventListener("keyup", (e) => {
    capsWarning.style.display = e.getModifierState("CapsLock") ? "block" : "none";
  });
  passwordInput.addEventListener("focusout", () => {
    capsWarning.style.display = "none";
  });

  // ──────────────────────────────────────────────
  // Envio do formulário
  // ──────────────────────────────────────────────
  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    errorMessage.style.display = "none";

    const btn = document.getElementById("btn-submit-login");
    const originalText = btn.textContent;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

    setTimeout(() => {
      const t = translations[idiomaAtual];
      const isValid = emailInput.value.trim() === "admin@email.com" && passwordInput.value.trim() === "123";

      errorMessage.style.display = "block";
      if (isValid) {
        errorMessage.style.color = "#16a34a";
        errorMessage.style.backgroundColor = "rgba(22,163,74,0.08)";
        errorMessage.style.border = "1px solid #16a34a";
        errorMessage.textContent = t.msgSuccess;
        // window.location.href = "dashboard.html"; // redirecionamento opcional
      } else {
        errorMessage.style.color = "#dc2626";
        errorMessage.style.backgroundColor = "rgba(220,38,38,0.08)";
        errorMessage.style.border = "1px solid #dc2626";
        errorMessage.textContent = t.msgError;
      }

      btn.textContent = originalText;
    }, 800);
  });

});