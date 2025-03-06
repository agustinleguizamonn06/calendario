const correctUsername = "seleyagus"; // Usuario fijo
const correctPassword = "081124"; // Contraseña fija

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    // Verificamos si las credenciales son correctas
    if (username === correctUsername && password === correctPassword) {
        // Redirigir a otra página
        window.location.href="../agusss/index.html"; // Reemplaza esto con el enlace que quieras usar
    } else {
        errorMessage.style.display = "block"; // Muestra un mensaje de error
    }
}