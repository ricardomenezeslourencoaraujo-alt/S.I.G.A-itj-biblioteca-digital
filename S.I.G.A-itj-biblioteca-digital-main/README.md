# 🚀 Como iniciar o projeto (Flask)

## ▶️ 1. Abrir o projeto no terminal

```bash
cd C:\Users\PROFESSOR\Downloads\S.I.G.A-itj-biblioteca-digital-main
```

---

## ▶️ 2. Ativar o ambiente virtual (venv)

### PowerShell (Windows)

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned
venv\Scripts\activate
```

Se funcionar, vai aparecer:

```text
(venv)
```

---

## ▶️ 3. Instalar dependências (se necessário)

```bash
pip install flask mysql-connector-python
```

---

## ▶️ 4. Rodar o servidor

```bash
python app.py
```

---

## ▶️ 5. Abrir no navegador

```text
http://127.0.0.1:5000/
```

---

# 🔁 Fluxo rápido (resumo)

```bash
cd pasta-do-projeto
venv\Scripts\activate
python app.py
```

---

# ⚠️ Problemas comuns

### ❌ Erro de permissão no activate

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

---

### ❌ Flask não encontrado

```bash
pip install flask
```

---

### ❌ MySQL não conecta

👉 Verificar se o XAMPP/WAMP está ligado (MySQL rodando)

---

# 🛑 Para parar o servidor

```text
CTRL + C
```
