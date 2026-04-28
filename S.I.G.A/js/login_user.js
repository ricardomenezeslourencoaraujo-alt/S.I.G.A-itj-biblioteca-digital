document.addEventListener("DOMContentLoaded", () => {

  const googleBtn = document.getElementById('googleLoginBtn');
  if (googleBtn) {
    googleBtn.addEventListener('click', () => {
      // Mensagem de alerta poderia ser internacionalizada, mas mantida conforme original
      alert('Integração com Google em desenvolvimento. Em breve você poderá logar com sua conta Google.');
    });
  }

  let idiomaAtual = "pt";

  const container = document.getElementById('container');
  const wrapper = document.querySelector(".language-wrapper");
  const langBtn = document.querySelector(".language-button");
  const langItems = document.querySelectorAll(".language-list li");

  const loginForm = document.getElementById("form-login");
  const regForm = document.getElementById("form-register");

  const errorMessage = document.querySelector(".error-message");
  const regErrorMessage = document.querySelector(".reg-error-message");

  const regName = document.getElementById("reg-name");
  const regEmail = document.getElementById("reg-email");
  const regPassword = document.getElementById("reg-password");
  const regConfirmPassword = document.getElementById("reg-confirm-password");

  const loginEmail = document.getElementById("login-email");
  const loginPassword = document.getElementById("login-password");

  const capsWarningReg = document.getElementById("caps_warning_reg");
  const capsWarningLogin = document.getElementById("caps_warning");

  const authHeader = document.querySelector('.auth-header');

  capsWarningReg.style.display = "none";
  capsWarningLogin.style.display = "none";

  const translations = {
    pt: {
      flag: "Imagens/br.png",
      titleLogin: "Faça seu Login",
      titleRegister: "Crie sua Conta",
      phName: "Nome",
      phEmail: "Email",
      phPassword: "Senha",
      phConfirm: "Confirmar Senha",
      btnRegister: "Criar conta",
      btnLogin: "Entrar",
      textRemember: "Lembrar-me",
      linkForgot: "Esqueci a senha?",
      panelTitleLeft: "Já nos conhece?",
      panelDescLeft: "Acesse sua conta para continuar sua jornada acadêmica.",
      btnPanelLeft: "ENTRAR",
      panelTitleRight: "Novo por aqui?",
      panelDescRight: "Junte-se a nós e comece sua jornada acadêmica hoje mesmo.",
      btnPanelRight: "REGISTRE-SE",
      msgSuccess: "SUCESSO!",
      msgError: "EMAIL OU SENHA INVÁLIDOS!",
      msgMatchError: "AS SENHAS NÃO CONFEREM!",
      msgCaps: "Caps Lock ativado!",
      googleBtn: "Entrar com Google"      // ← Adicionado
    },
    en: {
      flag: "Imagens/us.png",
      titleLogin: "Sign In",
      titleRegister: "Create Account",
      phName: "Name",
      phEmail: "Email",
      phPassword: "Password",
      phConfirm: "Confirm Password",
      btnRegister: "Sign Up",
      btnLogin: "Sign In",
      textRemember: "Remember me",
      linkForgot: "Forgot Password?",
      panelTitleLeft: "Welcome Back!",
      panelDescLeft: "Access your account to continue your academic journey.",
      btnPanelLeft: "SIGN IN",
      panelTitleRight: "New here?",
      panelDescRight: "Join us and start your academic journey today.",
      btnPanelRight: "SIGN UP",
      msgSuccess: "SUCCESS!",
      msgError: "INVALID EMAIL OR PASSWORD!",
      msgMatchError: "PASSWORDS DO NOT MATCH!",
      msgCaps: "Caps Lock is on!",
      googleBtn: "Sign in with Google"    // ← Adicionado
    },
    es: {
      flag: "Imagens/es.png",
      titleLogin: "Iniciar Sesión",
      titleRegister: "Crea tu Cuenta",
      phName: "Nombre",
      phEmail: "Correo electrónico",
      phPassword: "Contraseña",
      phConfirm: "Confirmar Contraseña",
      btnRegister: "Registrarse",
      btnLogin: "Entrar",
      textRemember: "Recuérdame",
      linkForgot: "¿Olvidaste tu contraseña?",
      panelTitleLeft: "¡Bienvenido de nuevo!",
      panelDescLeft: "Accede a tu cuenta para continuar tu viaje académico.",
      btnPanelLeft: "ENTRAR",
      panelTitleRight: "¿Nuevo por aquí?",
      panelDescRight: "Únete a nosotros y comienza tu viaje académico hoy mismo.",
      btnPanelRight: "REGÍSTRATE",
      msgSuccess: "¡ÉXITO!",
      msgError: "¡CORREO O CONTRASEÑA INVÁLIDOS!",
      msgMatchError: "¡LAS CONTRASEÑAS NO COINCIDEN!",
      msgCaps: "¡Bloq Mayús activado!",
      googleBtn: "Iniciar sesión con Google" // ← Adicionado
    }
  };

  // Troca de tela + tema do cabeçalho
  document.getElementById('register').addEventListener('click', () => {
    container.classList.add("active");
    authHeader.classList.add('dark-theme');
    clearMessages();
  });
  document.getElementById('login').addEventListener('click', () => {
    container.classList.remove("active");
    authHeader.classList.remove('dark-theme');
    clearMessages();
  });

  function clearMessages() {
    errorMessage.style.display = "none";
    regErrorMessage.style.display = "none";
  }

  function setupToggle(toggleId, inputId) {
    const toggle = document.getElementById(toggleId);
    const input = document.getElementById(inputId);
    if (!toggle || !input) return;
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      input.type = input.type === "password" ? "text" : "password";
      toggle.classList.toggle("fa-eye");
      toggle.classList.toggle("fa-eye-slash");
    });
  }
  setupToggle("togglePasswordLogin", "login-password");
  setupToggle("togglePasswordReg", "reg-password");
  setupToggle("toggleConfirmPasswordReg", "reg-confirm-password");

  langBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    wrapper.classList.toggle("active");
  });
  document.addEventListener("click", () => wrapper.classList.remove("active"));

  langItems.forEach(item => {
    item.addEventListener("click", () => {
      const lang = item.dataset.lang;
      idiomaAtual = lang;
      const t = translations[lang];

      // Atualiza bandeira e texto do seletor
      document.getElementById("current-lang-text").textContent = lang.toUpperCase();
      document.getElementById("current-flag").src = t.flag;

      // Títulos e placeholders
      document.getElementById("title-register").textContent = t.titleRegister;
      regName.placeholder = t.phName;
      regEmail.placeholder = t.phEmail;
      regPassword.placeholder = t.phPassword;
      regConfirmPassword.placeholder = t.phConfirm;
      document.getElementById("btn-submit-register").textContent = t.btnRegister;
      capsWarningReg.textContent = t.msgCaps;

      document.getElementById("title-login").textContent = t.titleLogin;
      loginEmail.placeholder = t.phEmail;
      loginPassword.placeholder = t.phPassword;
      document.getElementById("text-remember").textContent = t.textRemember;
      document.getElementById("link-forgot").textContent = t.linkForgot;
      document.getElementById("btn-submit-login").textContent = t.btnLogin;
      capsWarningLogin.textContent = t.msgCaps;

      // Painéis laterais
      document.getElementById("panel-title-left").textContent = t.panelTitleLeft;
      document.getElementById("panel-desc-left").textContent = t.panelDescLeft;
      document.getElementById("login").textContent = t.btnPanelLeft;
      document.getElementById("panel-title-right").textContent = t.panelTitleRight;
      document.getElementById("panel-desc-right").textContent = t.panelDescRight;
      document.getElementById("register").textContent = t.btnPanelRight;

      // Botão Google (ícone + texto traduzido)
      if (googleBtn) {
        googleBtn.innerHTML = `<i class="fab fa-google"></i> ${t.googleBtn}`;
      }

      clearMessages();
    });
  });

  function handleCaps(input, warning) {
    input.addEventListener("keyup", (e) => warning.style.display = e.getModifierState("CapsLock") ? "block" : "none");
    input.addEventListener("focusout", () => warning.style.display = "none");
  }
  handleCaps(loginPassword, capsWarningLogin);
  handleCaps(regPassword, capsWarningReg);

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = document.getElementById("btn-submit-login");
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    setTimeout(() => {
      const isValid = loginEmail.value.trim() === "admin@email.com" && loginPassword.value.trim() === "123";
      showMessage(errorMessage, isValid);
      btn.textContent = translations[idiomaAtual].btnLogin;
    }, 800);
  });

  regForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (regPassword.value !== regConfirmPassword.value) {
      showMessage(regErrorMessage, false, true);
      return;
    }
    const btn = document.getElementById("btn-submit-register");
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    setTimeout(() => {
      showMessage(regErrorMessage, true);
      btn.textContent = translations[idiomaAtual].btnRegister;
      regForm.reset();
      capsWarningReg.style.display = "none";
    }, 800);
  });
})