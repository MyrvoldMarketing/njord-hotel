// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 1000,
    once: true
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.main-nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const hamburgerSpans = document.querySelectorAll('.hamburger span');
    
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
        document.body.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
        document.body.classList.remove('scrolled');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message. We will get back to you soon!');
        this.reset();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    
    const words = ['NATURLIGA', 'VACKRA', 'SKÖNA'];
    const typewriterElement = document.querySelector('.typewriter');
    
    console.log('Typewriter element:', typewriterElement);
    
    if (!typewriterElement) {
        console.error('Could not find typewriter element');
        return;
    }

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Sletter bokstaver
            typewriterElement.textContent = currentWord.substring(0, charIndex);
            charIndex--;
        } else {
            // Skriver bokstaver
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        // Bestemmer hastigheten på skrivingen/slettingen
        let typeSpeed = isDeleting ? 100 : 200;

        // Når ordet er ferdig skrevet
        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Venter litt før sletting
            isDeleting = true;
        }

        // Når ordet er ferdig slettet
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Venter litt før neste ord
        }

        setTimeout(type, typeSpeed);
    }

    // Starter animasjonen
    type();

    // Menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuText = document.querySelector('.menu-text');
    const defaultText = menuText.dataset.textDefault;
    const activeText = menuText.dataset.textActive;

    const toggleMenu = (show) => {
        menuToggle.classList.toggle('active', show);
        menuOverlay.classList.toggle('active', show);
        menuText.textContent = show ? activeText : defaultText;
        document.body.style.overflow = show ? 'hidden' : '';
    };

    menuToggle.addEventListener('click', () => {
        const isActive = menuToggle.classList.contains('active');
        toggleMenu(!isActive);
    });

    // Close menu when clicking on a menu item
    const menuLinks = document.querySelectorAll('.menu-nav a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu(false);
        });
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
