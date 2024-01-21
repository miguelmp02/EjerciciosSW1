function validateForm() {
    var pass = document.getElementById("pass").value;
    var pass2 = document.getElementById("pass2").value;

    if (pass !== pass2) {
        document.getElementById("error-message").innerText = "Las contraseñas no coinciden.";
        return false;
    }else {
        if (pass.length < 8) {
            document.getElementById("error-message").innerText = "La contraseña debe tener al menos 8 caracteres.";
            return false;
        }
        var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
        if (!passwordRegex.test(pass)) {
            document.getElementById("error-message").innerText = "La contraseña debe contener al menos un número, una mayúscula y un símbolo.";
        return false;
    }
        document.getElementById("error-message").innerText = "";
        return true;
    }
}