/**
 * Script for matrix background animation
 * Separated for cleaner code and better performance
 */
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('matrixCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Set canvas exactly to window size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Characters for animation (Katakana, Latin, Numbers)
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン';
    const fontSize = 14;
    let columns = canvas.width / fontSize;

    // Array to store Y coordinates of falling characters
    let drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    // Render loop
    function draw() {
        // Semi-transparent black background creates "fading" effect for old characters
        ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#22c55e'; // Bright green (Primary color from CSS)
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            // Select random character
            const text = characters.charAt(Math.floor(Math.random() * characters.length));

            // Draw character
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            // Randomly reset drop to the top
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    // Smooth animation
    setInterval(draw, 40);
});