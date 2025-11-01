document.addEventListener("DOMContentLoaded", function() {
    const newPhoneNumber = "584243493080"; 
    const whatsappMessage = "Hola%2C%20me%20interesa%20saber%20m%C3%A1s%20sobre%20tus%20guiones%20para%20canales%20faceless%20de%20YouTube.";
    const whatsappUrl = `https://wa.me/${newPhoneNumber}?text=${whatsappMessage}`;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elements = document.querySelectorAll('.fade-in-item');
    elements.forEach(el => {
        if (el.id !== 'header') {
            observer.observe(el);
        }
    });

    const carousel = document.getElementById('carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    
    const updateFocus = () => {
        const containerCenter = carousel.scrollLeft + carousel.offsetWidth / 2;

        carouselItems.forEach(item => {
            const itemCenter = item.offsetLeft + item.offsetWidth / 2;
            const distance = Math.abs(containerCenter - itemCenter);
            const threshold = carousel.offsetWidth * 0.20; 

            if (distance < threshold) {
                item.classList.add('is-focused');
            } else {
                item.classList.remove('is-focused');
            }
        });
    };

    let isDown = false;
    let startX;
    let scrollLeft;
    
    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        carousel.classList.add('active-drag');
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.classList.remove('active-drag');
    });

    carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.classList.remove('active-drag');
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 1.5; 
        carousel.scrollLeft = scrollLeft - walk;
    });

    updateFocus();

    carousel.addEventListener('scroll', updateFocus);

    let scrollTimeout;
    carousel.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateFocus, 150); 
    });
});