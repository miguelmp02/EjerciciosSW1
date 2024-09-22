// Función para cambiar el color de la valoración según su valor
function cambiarColorValoracion() {
    // Selecciona todos los elementos que tienen la clase 'valoracion'
    const valoraciones = document.querySelectorAll('.valoracion');

    // Recorre cada valoración y cambia el color según el valor numérico
    valoraciones.forEach(function(valoracion) {
        const valor = parseFloat(valoracion.textContent); // Obtiene el valor numérico
        
        if (valor < 5) {
            valoracion.style.color = 'red'; // Menor que 5 -> Rojo
        } else if (valor === 5) {
            valoracion.style.color = 'yellow'; // Igual a 5 -> Amarillo
        } else {
            valoracion.style.color = 'green'; // Mayor que 5 -> Verde
        }
    });
}

function cambiarColorEdad() {
    const edades = document.querySelectorAll('.edad');

    edades.forEach(function(edad) {
        const valor = edad.textContent.trim(); // Obtiene el valor de la edad (G, PGR, MA, etc.)

        if (valor === 'G') {
            edad.style.color = 'green'; // Verde para G (todas las edades)
        } else if (valor === 'PGR') {
            edad.style.color = 'blue'; // Azul para PGR (supervisión parental)
        } else {
            edad.style.color = 'red'; // Rojo para MA u otras clasificaciones
        }
    });
}


// Función para truncar descripciones largas

function truncarDescripcion() {
    const descripciones = document.querySelectorAll('.descripcion');
    
    descripciones.forEach(function(descripcion) {
        const palabras = descripcion.textContent.split(' '); // Separa la descripción en palabras
        if (palabras.length > 50) {
            const primerasPalabras = palabras.slice(0, 10).join(' '); // Toma las primeras 10 palabras
            descripcion.textContent = primerasPalabras + '...'; // Añade los tres puntos
        }
    });
}

// Ejecuta las funciones cuando el documento esté cargado
document.addEventListener('DOMContentLoaded', function() {
    cambiarColorValoracion();
    truncarDescripcion();
    cambiarColorEdad();
});
