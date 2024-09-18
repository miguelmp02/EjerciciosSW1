window.onload = function() {
    if (localStorage.getItem('cookiesAccepted') === 'true') {
        // Si las cookies ya fueron aceptadas, oculta el banner
        var cookiesBanner = document.getElementById("cookies-banner");
        if (cookiesBanner) {
            cookiesBanner.style.display = "none";
        }
    }
}

// Función para aceptar las cookies
function aceptar() {
    // Ocultar el banner de cookies
    var cookiesBanner = document.getElementById("cookies-banner");
    cookiesBanner.style.display = "none";

    // Guardar la elección del usuario en localStorage
    localStorage.setItem('cookiesAccepted', 'true');
}

// Función para rechazar las cookies
function rechazar() {
    // Redirigir a Google
    window.location.href = "https://www.google.com";
}