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

    console.log('[Menu] Initializing menu functionality...');
    
    // Menu elements
    const menuToggle = document.querySelector('.menu-toggle');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuText = document.querySelector('.menu-text');
    
    // Verify all elements exist
    if (!menuToggle || !menuOverlay || !menuText) {
        console.error('[Menu] Missing required elements:', {
            menuToggle: !!menuToggle,
            menuOverlay: !!menuOverlay,
            menuText: !!menuText
        });
        return;
    }
    
    console.log('[Menu] All required elements found');
    
    const defaultText = menuText.dataset.textDefault || 'MENY';
    const activeText = menuText.dataset.textActive || 'CLOSE';
    
    const toggleMenu = (show) => {
        console.log(`[Menu] Toggling menu ${show ? 'open' : 'closed'}`);
        
        try {
            menuToggle.classList.toggle('active', show);
            menuOverlay.classList.toggle('active', show);
            menuText.textContent = show ? activeText : defaultText;
            document.body.style.overflow = show ? 'hidden' : '';
            
            console.log('[Menu] Menu state updated successfully');
        } catch (error) {
            console.error('[Menu] Error updating menu state:', error);
        }
    };
    
    menuToggle.addEventListener('click', () => {
        console.log('[Menu] Menu toggle clicked');
        const isActive = menuToggle.classList.contains('active');
        toggleMenu(!isActive);
    });
    
    // Close menu when clicking on a menu item
    const menuLinks = document.querySelectorAll('.menu-nav a');
    console.log(`[Menu] Found ${menuLinks.length} menu links`);
    
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            console.log('[Menu] Menu link clicked, closing menu');
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
