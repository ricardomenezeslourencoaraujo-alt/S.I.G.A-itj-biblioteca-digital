// Define o idioma padrão da página assim que ela carrega
let idiomaAtual = "pt";

// Selecionando os elementos do HTML (DOM) que serão manipulados pelo JavaScript
const wrapper = document.querySelector(".language-wrapper"); // A caixa/container do menu de idiomas
const button = document.querySelector(".language-button"); // O botão principal que mostra a bandeira atual
const items = document.querySelectorAll(".language-list li"); // A lista com as opções de idiomas
const flagImg = button.querySelector("img"); // A imagem da bandeira no botão
const errorMessage = document.querySelector(".error-message"); // A caixa onde aparecerão os alertas (sucesso/erro)

// Dicionário de traduções: guarda todos os textos e caminhos de imagens separados por idioma
const translations = {
  en: {
    flag: "Imagens/us.png",
    flagAlt: "US Flag",
    title: "Admin Login",
    subtitle: "Access to admin panel",
    button: "Sign in",
    forgot: "Forgot Password?",
    labelEmail: "Email",
    labelPass: "Password",
    phEmail: "Enter your email",
    phPass: "Enter your password",
    labelLembrar: "Remember me",
    msgSuccess: "LOGIN SUCCESSFUL!",
    msgError: "INVALID EMAIL OR PASSWORD!"
  },
  pt: {
    flag: "Imagens/br.png",
    flagAlt: "Bandeira do Brasil",
    title: "Login Administrador",
    subtitle: "Acesso ao painel administrativo",
    button: "Entrar",
    forgot: "Esqueceu sua senha?",
    labelEmail: "Email",
    labelPass: "Senha",
    phEmail: "Digite seu email",
    phPass: "Digite sua senha",
    labelLembrar: "Lembrar-me",
    msgSuccess: "LOGIN EFETUADO COM SUCESSO!",
    msgError: "EMAIL OU SENHA INVÁLIDOS!"
  },
  es: {
    flag: "Imagens/es.png",
    flagAlt: "Bandera de España",
    title: "Inicio de sesión de administrador",
    subtitle: "Acceso al panel administrativo",
    button: "Iniciar sesión",
    forgot: "¿Olvidaste tu contraseña?",
    labelEmail: "Email",
    labelPass: "Contraseña",
    phEmail: "Introduce tu email",
    phPass: "Introduce tu contraseña",
    labelLembrar: "Recuérdame",
    msgSuccess: "¡INICIO DE SESIÓN EXITOSO!",
    msgError: "¡CORREO O CONTRASEÑA INVÁLIDOS!"
  }
};

// 1. MENU DE IDIOMA
// Quando clicar no botão de idioma, abre ou fecha (toggle) a lista de opções
button.addEventListener("click", (e) => {
  e.stopPropagation(); // Impede que o clique "vaze" para o document e feche o menu na mesma hora
  wrapper.classList.toggle("active");
});

// Se o usuário clicar em qualquer lugar da tela que NÃO seja o menu de idiomas, ele fecha
document.addEventListener("click", (e) => {
  if (!wrapper.contains(e.target)) {
    wrapper.classList.remove("active");
  }
});

// 2. TROCAR IDIOMA
// Percorre cada uma das opções de idioma (as tags <li>)
items.forEach(item => {
  // O que acontece quando clica em um idioma específico
  item.addEventListener("click", () => {
    const lang = item.dataset.lang; // Pega o atributo data-lang do HTML (ex: "pt", "en")
    idiomaAtual = lang; // Atualiza a variável global de idioma

    // Altera o texto do botão para a sigla do idioma em maiúsculo (ex: "PT") e fecha o menu
    button.querySelector("span").textContent = lang.toUpperCase();
    wrapper.classList.remove("active");

    const t = translations[lang]; // Pega os textos do idioma escolhido no dicionário

    // Se o idioma existir no dicionário, atualiza todos os elementos da tela
    if (t) {
      flagImg.src = t.flag; // Muda a imagem da bandeira
      flagImg.alt = t.flagAlt; // Muda o texto alternativo da bandeira

      // Substitui os textos do HTML pelos textos do dicionário
      document.getElementById("title").textContent = t.title;
      document.getElementById("subtitle").textContent = t.subtitle;
      document.getElementById("bot_entrar").textContent = t.button;
      document.getElementById("mudar_senha").textContent = t.forgot;
      document.getElementById("label_email").textContent = t.labelEmail;
      document.getElementById("label_senha").textContent = t.labelPass;
      document.getElementById("input_email").placeholder = t.phEmail;
      document.getElementById("input_senha").placeholder = t.phPass;
      document.getElementById("label_lembrar").textContent = t.labelLembrar;

      // Verifica se a mensagem de erro/sucesso está visível na tela
      if (errorMessage.classList.contains("active")) {
        // Checa as cores para descobrir se a mensagem atual é um erro ou um sucesso
        if (
          errorMessage.style.color === "rgb(217, 48, 37)" ||
          errorMessage.style.color === "rgb(213, 0, 0)" ||
          errorMessage.style.backgroundColor === "rgb(252, 232, 230)"
        ) {
          errorMessage.textContent = t.msgError; // Traduz a mensagem de erro
        } else {
          errorMessage.textContent = t.msgSuccess; // Traduz a mensagem de sucesso
        }
      }
    }
  });

  // Teclado (acessibilidade): Permite selecionar o idioma usando "Enter" ou "Espaço" ao navegar pelo teclado
  item.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      item.click(); // Simula um clique
      button.focus(); // Devolve o foco ao botão principal
    }
  });
});

// 3. MOSTRAR SENHA
const togglePassword = document.querySelector("#togglePassword"); // O ícone do "olhinho"
const passwordField = document.querySelector("#input_senha"); // O campo de senha

// O que acontece ao clicar no olhinho da senha
togglePassword.addEventListener("click", function () {
  // Se o tipo for 'password' (escondido com bolinhas), muda para 'text' (visível), e vice-versa
  const type = passwordField.type === "password" ? "text" : "password";
  passwordField.type = type;
  
  // Troca a classe do ícone para alternar entre o olho aberto e o olho cortado
  this.classList.toggle("fa-eye");
  this.classList.toggle("fa-eye-slash");
});

// Teclado no olhinho: Acessibilidade para usar o olho da senha via teclado
togglePassword.addEventListener("keydown", function (e) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    this.click();
  }
});

// 4. LOGIN
// Selecionando os elementos do formulário de login
const form = document.querySelector("form");
const email = document.getElementById("input_email");
const senha = document.getElementById("input_senha");

// Função responsável por estilizar e mostrar a mensagem de ERRO no login
function showError() {
  errorMessage.textContent = translations[idiomaAtual].msgError;
  errorMessage.style.color = "#d93025"; // Cor da fonte (vermelho)
  errorMessage.style.backgroundColor = "#fce8e6"; // Fundo da caixa (vermelho claro)
  errorMessage.classList.add("active"); // Mostra a caixa na tela

  // Adiciona a borda vermelha nos campos e remove a verde caso exista
  email.classList.add("input-error");
  senha.classList.add("input-error");
  email.classList.remove("input-success");
  senha.classList.remove("input-success");
}

// Função responsável por limpar qualquer mensagem de erro ou de sucesso
function clearError() {
  errorMessage.textContent = "";
  errorMessage.classList.remove("active"); // Esconde a caixa de mensagem

  // Remove as bordas vermelhas e verdes dos campos
  email.classList.remove("input-error", "input-success");
  senha.classList.remove("input-error", "input-success");
}

// Se o usuário começar a digitar de novo em algum campo, limpa os erros antigos
email.addEventListener("input", clearError);
senha.addEventListener("input", clearError);

// --- AVISO DE CAPS LOCK ---
const capsWarning = document.getElementById("caps_warning");

// "Escuta" as teclas soltas no campo de senha para detectar o Caps Lock
senha.addEventListener("keyup", function (event) {
  // Se a tecla Caps Lock estiver ativada, mostra a mensagem de aviso. Se não, esconde.
  if (event.getModifierState("CapsLock")) {
    capsWarning.style.display = "block";
  } else {
    capsWarning.style.display = "none";
  }
});


// --- ENVIO DO FORMULÁRIO COM LOADING ---
// Intercepta a tentativa de enviar o formulário (quando o botão "Entrar" é clicado)
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Impede o comportamento padrão do HTML (que seria recarregar a página)

  const btnEntrar = document.getElementById("bot_entrar");
  const emailDigitado = email.value.trim(); // .trim() remove espaços em branco no começo e no fim
  const senhaDigitada = senha.value.trim();

  // 1. Inicia a animação de Loading visualmente no botão
  btnEntrar.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'; // Coloca ícone girando
  btnEntrar.classList.add("loading"); // Aplica o CSS de carregamento

  // 2. O setTimeout simula o atraso de buscar isso num banco de dados real (1.5 segundos)
  setTimeout(() => {
    // Definindo credenciais corretas (hardcoded apenas para exemplo)
    const emailCorreto = "admin@email.com";
    const senhaCorreta = "123";

    // Verifica se as informações digitadas batem com as corretas
    if (emailDigitado === emailCorreto && senhaDigitada === senhaCorreta) {
      // CENÁRIO: LOGIN BEM-SUCEDIDO
      clearError(); // Limpa formatações antigas
      email.classList.add("input-success"); // Borda verde no e-mail
      senha.classList.add("input-success"); // Borda verde na senha

      // Configura e mostra a mensagem de sucesso
      errorMessage.textContent = translations[idiomaAtual].msgSuccess;
      errorMessage.style.color = "#155724"; // Cor da fonte (verde escuro)
      errorMessage.style.backgroundColor = "#d4edda"; // Fundo da caixa (verde claro)
      errorMessage.classList.add("active");
    } else {
      // CENÁRIO: LOGIN FALHOU (email ou senha incorretos)
      // Configura e mostra a mensagem de erro
      errorMessage.textContent = translations[idiomaAtual].msgError;
      errorMessage.style.color = "#d93025";
      errorMessage.style.backgroundColor = "#fce8e6";
      errorMessage.classList.add("active");

      // Adiciona borda vermelha nos campos
      email.classList.add("input-error");
      senha.classList.add("input-error");
    }

    // 3. Finaliza o Loading: Tira o ícone de carregamento e devolve o texto original do botão (traduzido)
    btnEntrar.textContent = translations[idiomaAtual].button;
    btnEntrar.classList.remove("loading");

  }, 1500); // Fim do setTimeout. 1500 milissegundos = 1.5 segundos aguardando
});