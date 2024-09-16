// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://as.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==
// Este script hace que cuando entres en el as.com te ponga el numero de noticias del Real Madrid de Fútbol que hay.
// Este script ademas resalta esas noticias encontradas del Real Madrid para encontrarlas de forma mas sencilla y facilitar la lectura.
(function() {
    'use strict';

    var noticiasUnicas = {};
    var noticiasUnicas1 = {};

    var etiquetasSpan = document.querySelectorAll('span');
    var etiquetasA = document.querySelectorAll('a[href*="https://as.com/noticias/real-madrid/"]');
    var etiquetasA1 = document.querySelectorAll('a[href*="https://as.com/futbol/"]');

    etiquetasSpan.forEach(function(span) {
        if (span.textContent.includes("REAL MADRID")) {
            noticiasUnicas[span.textContent] = true;
            span.style.backgroundColor = 'yellow';
            span.style.fontWeight = 'bold';
        }
    });

    etiquetasA.forEach(function(enlace) {
        if (enlace.textContent.includes("REAL MADRID")) {
            noticiasUnicas1[enlace.textContent] = true;
            enlace.style.backgroundColor = 'yellow';
            enlace.style.fontWeight = 'bold';
        }
    });
     etiquetasA1.forEach(function(enlace) {
        if (enlace.textContent.includes("REAL MADRID")) {
            noticiasUnicas1[enlace.textContent] = true;
            enlace.style.backgroundColor = 'yellow';
            enlace.style.fontWeight = 'bold';
        }
    });

    var titulosNoticias = Object.keys(noticiasUnicas);
    var titulosNoticias1 = Object.keys(noticiasUnicas1);

    var contadorNoticiasRealMadrid = titulosNoticias.length + titulosNoticias1.length;

    alert("Número de noticias del Real Madrid: " + contadorNoticiasRealMadrid + "\n\nTítulos de noticias:\n" + titulosNoticias1.join("\n") + "\n" + titulosNoticias.join("\n"));
})();
