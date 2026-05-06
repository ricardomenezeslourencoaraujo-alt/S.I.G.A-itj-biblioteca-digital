from flask import Flask, request, render_template
import mysql.connector

app = Flask(__name__)

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="siga"
)

# HOME
@app.route("/")
def home():
    return render_template("preview.html")

# PREVIEW (opcional)
@app.route("/preview")
def preview_page():
    return render_template("preview.html")

# LOGIN USER
@app.route("/login_user", methods=["GET"])
def login_user():
    return render_template("login_user.html")

@app.route("/login_user", methods=["POST"])
def login_user_post():
    email = request.form["email"]
    senha = request.form["senha"]

    cursor = db.cursor(dictionary=True)
    cursor.execute(
        "SELECT * FROM login_aluno WHERE email_aluno = %s",
        (email,)
    )
    user = cursor.fetchone()

    if user:
        return f"Usuário encontrado: {user['nome_aluno']}"
    else:
        return "Usuário não existe"

# LOGIN ADM
@app.route("/login_adm", methods=["GET"])
def login_adm():
    return render_template("login_adm.html")

if __name__ == "__main__":
    app.run(debug=True)