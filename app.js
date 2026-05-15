document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SMOOTH SPOTLIGHT (Слідування сяйва за курсором) ---
    const glow = document.querySelector('.glow');
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateGlow() {
        // Додаємо плавність (інерцію 0.05)
        glowX += (mouseX - glowX) * 0.05;
        glowY += (mouseY - glowY) * 0.05;
        
        if (glow) {
            glow.style.left = `${glowX}px`;
            glow.style.top = `${glowY}px`;
        }
        requestAnimationFrame(animateGlow);
    }
    animateGlow();

    // --- 2. TERMINAL NOTIFICATIONS (Системні сповіщення) ---
    function createNotify(text) {
        const notify = document.createElement('div');
        notify.style.cssText = `
            position: fixed; bottom: 110px; right: 20px;
            background: rgba(0, 240, 255, 0.1);
            border-left: 3px solid var(--accent);
            padding: 12px 20px; border-radius: 8px;
            font-family: var(--font-mono); font-size: 0.7rem;
            color: var(--accent); backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            z-index: 9999; opacity: 0; transform: translateX(20px);
            transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
        `;
        notify.innerText = `[ SYSTEM ]: ${text}`;
        document.body.appendChild(notify);
        
        // Плавна поява
        setTimeout(() => {
            notify.style.opacity = '1';
            notify.style.transform = 'translateX(0)';
        }, 100);
        
        // Видалення
        setTimeout(() => {
            notify.style.opacity = '0';
            notify.style.transform = 'translateX(20px)';
            setTimeout(() => notify.remove(), 400);
        }, 4000);
    }

    // Стартові логи при завантаженні
    setTimeout(() => createNotify("Connection established."), 800);
    setTimeout(() => createNotify("Void_Shell v2.6.5 ready."), 1600);

    // --- 3. BENTO TILT (3D-нахил карток при наведенні) ---
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 12;
            const rotateY = (centerX - x) / 12;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    });

    // --- 4. HAPTIC FEEDBACK (Вібровідгук для iPhone 11) ---
    const interactiveElements = document.querySelectorAll('.nav-link, .card, .code-box');
    interactiveElements.forEach(el => {
        el.addEventListener('touchstart', () => {
            if (window.navigator.vibrate) {
                window.navigator.vibrate(12); // Легкий "тік"
            }
        });
    });

    // --- 5. REVEAL ANIMATION (Анімація появи блоків при скролі) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0) scale(1)";
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px) scale(0.98)";
        observer.observe(card);
    });

    // --- 6. EASTER EGG (Системний імпульс) ---
    let keyBuffer = "";
    window.addEventListener('keydown', (e) => {
        keyBuffer += e.key.toLowerCase();
        keyBuffer = keyBuffer.slice(-4);
        if (keyBuffer === 'void') {
            createNotify("CRITICAL: VOID_MODE OVERRIDE");
            document.body.style.filter = 'hue-rotate(180deg) brightness(1.2)';
            setTimeout(() => {
                document.body.style.filter = 'none';
            }, 1000);
            keyBuffer = "";
        }
    });
});