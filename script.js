document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Мобільне меню
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            // Перемикаємо клас для анімації кнопки
            mobileToggle.classList.toggle('active');
            // Показуємо/ховаємо меню
            navLinks.classList.toggle('nav-active');
        });
    }

    // 2. Анімація появи елементів (Reveal)
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        reveals.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                el.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Запуск при завантаженні

    // 3. Ефект друку в терміналі (Typing Effect)
    const typedText = document.querySelector('.typed');
    if (typedText) {
        const text = typedText.innerHTML;
        typedText.innerHTML = '';
        let i = 0;
        const typeWriter = setInterval(() => {
            if (i < text.length) {
                typedText.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(typeWriter);
            }
        }, 50);
    }
});