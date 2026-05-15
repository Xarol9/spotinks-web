/**
 * VOID_OS Engine v2.6
 * Lead Developer: Morivis
 * Functions: UX/UI Logic, Interactive Glow, System Notifications
 */

document.addEventListener('DOMContentLoaded', () => {
    initGlowEffect();
    initSystemNavigation();
    initGlitchEffect();
    console.log("VOID_OS: System initialized.");
});

// Ефект світіння, що слідує за курсором
function initGlowEffect() {
    const glow = document.querySelector('.glow');
    if (!glow) return;

    window.addEventListener('mousemove', (e) => {
        // Плавне переміщення фонового світла
        const x = e.clientX;
        const y = e.clientY;
        
        glow.style.left = `${x}px`;
        glow.style.top = `${y}px`;
    });
}

// Обробка навігації та активних станів
function initSystemNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Додаємо легку вібрацію для мобільних пристроїв (iPhone 11)
            if (navigator.vibrate) {
                navigator.vibrate(10);
            }
        });
    });
}

// Система сповіщень (викликається зі сторінок через window.notify)
window.notify = function(message) {
    const notifyContainer = document.createElement('div');
    notifyContainer.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 240, 255, 0.1);
        border: 1px solid var(--accent);
        color: var(--accent);
        padding: 10px 20px;
        font-family: var(--font-mono);
        font-size: 10px;
        border-radius: 4px;
        z-index: 9999;
        backdrop-filter: blur(10px);
        animation: slideIn 0.3s ease-out;
    `;
    
    notifyContainer.innerHTML = `> ${message}`;
    document.body.appendChild(notifyContainer);

    setTimeout(() => {
        notifyContainer.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notifyContainer.remove(), 300);
    }, 3000);
};

// Додатковий ефект глітча при кліку на важливі елементи
function initGlitchEffect() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const h3 = card.querySelector('h3, .data-value');
            if (h3) {
                h3.style.textShadow = `2px 0 var(--accent), -2px 0 #ff0055`;
                setTimeout(() => {
                    h3.style.textShadow = 'none';
                }, 100);
            }
        });
    });
}

// Animations definitions
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);