const canvas = document.getElementById('waves-canvas');
const ctx = canvas.getContext('2d');

let width, height, speed = 0;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

/**
 * Dibuja una onda sinusoidal en el canvas
 * @param {string} color - Color de la línea (hex o rgba)
 * @param {number} amplitude - Altura de la onda
 * @param {number} frequency - Qué tan juntas están las ondas
 * @param {number} offset - Posición inicial
 * @param {number} speedMod - Multiplicador de velocidad de movimiento
 */
function drawWave(color, amplitude, frequency, offset, speedMod) {
    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = color;

    for (let x = 0; x < width; x++) {
        // Cálculo de la onda basado en seno
        const y = height / 2 + Math.sin(x * frequency + speed * speedMod + offset) * amplitude;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.stroke();
}

function animate() {
    // Fondo negro con rastro sutil para crear el efecto de estela
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.fillRect(0, 0, width, height);

    // --- CONFIGURACIÓN DE LAS ONDAS (Colores actualizados al azul elegante) ---
    
    // 1. Onda principal (Azul Elegante #007BA7)
    drawWave('#007BA7', height * 0.15, 0.005, 0, 0.02); 
    
    // 2. Onda secundaria (Mismo azul pero con transparencia)
    drawWave('rgba(0, 123, 167, 0.3)', height * 0.1, 0.01, 2, 0.01); 
    
    // 3. Onda de "aire" (Blanco muy suave para dar profundidad)
    drawWave('rgba(255, 255, 255, 0.05)', height * 0.2, 0.003, 4, 0.015); 

    speed += 1;
    requestAnimationFrame(animate);
}

animate();

// --- LÓGICA DE CAMBIO DE IDIOMA ---
const langBtn = document.getElementById('lang-switch');
let currentLang = localStorage.getItem('prefLang') || 'es';

const updateLanguage = (lang) => {
    // 1. Traducir elementos con atributos data-es/data-en
    document.querySelectorAll('[data-es]').forEach(el => {
        el.innerText = el.getAttribute(`data-${lang}`);
    });
    
    // 2. Traducir el Título de la pestaña del navegador
    if (lang === 'en') {
        document.title = "Home | Iván Marín García";
    } else {
        document.title = "Inicio | Iván Marín García";
    }
    
    // 3. Actualizar el texto del botón de idioma
    langBtn.innerText = lang === 'es' ? 'EN' : 'ES';
    
    // 4. Guardar la preferencia del usuario
    localStorage.setItem('prefLang', lang);
};

// Evento de clic para cambiar el idioma
langBtn.addEventListener('click', () => {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    updateLanguage(currentLang);
});

// Inicializar el idioma correcto al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    updateLanguage(currentLang);
});