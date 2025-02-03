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

    // Hero Slider functionality
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.nav-indicator');
    let currentSlide = 0;

    function updateSlideIndicators() {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(index) {
        // Stopp alle videoer først
        slides.forEach(slide => {
            const video = slide.querySelector('video');
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        });

        // Bytt slide
        slides[currentSlide].classList.remove('active');
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        updateSlideIndicators();
        
        // Start video på aktiv slide
        const activeVideo = slides[currentSlide].querySelector('video');
        if (activeVideo) {
            activeVideo.play();
        }
    }

    // Set up video ended events
    slides.forEach((slide, index) => {
        const video = slide.querySelector('video');
        if (video) {
            video.addEventListener('ended', () => {
                const nextIndex = (index + 1) % slides.length;
                goToSlide(nextIndex);
            });
        }
    });

    // Set up indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            if (index !== currentSlide) {
                goToSlide(index);
            }
        });
    });

    // Start første slide (only on index page)
    if (document.querySelector('.slide')) {
        goToSlide(0);
    }

    // Floor plan switching
    const floorTabs = document.querySelectorAll('.floor-tabs .tab-link');
    floorTabs.forEach((tab, index) => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all floor tabs
            floorTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding image
            const planImages = document.querySelectorAll('.hotel-plan-images .plan-image');
            planImages.forEach(img => img.classList.remove('active'));
            if (planImages[index]) {
                planImages[index].classList.add('active');
            }
        });
    });

    // Plan type switching (Hotelrum/Hotel)
    const planTypeLinks = document.querySelectorAll('.tab-navigation .tab-link');

    // Handle hotelrum tab clicks
    const hotelrumTabs = document.querySelectorAll('.hotelrum-tabs .tab-link');
    hotelrumTabs.forEach((tab, index) => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            hotelrumTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Show corresponding room image
            const roomImages = document.querySelectorAll('.hotelrum-images .plan-image');
            roomImages.forEach(img => img.classList.remove('active'));
            if (roomImages[index]) {
                roomImages[index].classList.add('active');
            }
        });
    });

    planTypeLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all type links
            planTypeLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');

            // Show/hide appropriate tabs
            const hotelrumTabs = document.querySelector('.hotelrum-tabs');
            const floorTabs = document.querySelector('.floor-tabs');
            
            const hotelPlanImages = document.querySelector('.hotel-plan-images');
            const hotelrumImages = document.querySelector('.hotelrum-images');

            if (this.textContent === 'HOTELRUM') {
                hotelrumTabs.style.display = 'block';
                floorTabs.style.display = 'none';
                hotelPlanImages.style.display = 'none';
                hotelrumImages.style.display = 'block';

                // Show first room image and tab by default
                const roomImages = document.querySelectorAll('.hotelrum-images .plan-image');
                const firstHotelrumTab = document.querySelector('.hotelrum-tabs .tab-link');
                
                roomImages.forEach(img => img.classList.remove('active'));
                hotelrumTabs.forEach(t => t.classList.remove('active'));
                
                if (roomImages[0]) roomImages[0].classList.add('active');
                if (firstHotelrumTab) firstHotelrumTab.classList.add('active');
            } else {
                hotelrumTabs.style.display = 'none';
                floorTabs.style.display = 'block';
                hotelPlanImages.style.display = 'block';
                hotelrumImages.style.display = 'none';

                // Show first floor plan image and tab by default
                const planImages = document.querySelectorAll('.hotel-plan-images .plan-image');
                const firstFloorTab = document.querySelector('.floor-tabs .tab-link');
                
                planImages.forEach(img => img.classList.remove('active'));
                floorTabs.forEach(t => t.classList.remove('active'));
                
                if (planImages[0]) planImages[0].classList.add('active');
                if (firstFloorTab) firstFloorTab.classList.add('active');
            }
            
            // Get the current plan type
            const planType = this.textContent.trim();
            
            // Update image sources based on plan type
            const images = document.querySelectorAll('.plan-image');
            images.forEach((img, index) => {
                const planNumber = index + 1; // Since we start at 1
                img.src = `assets/${planTypes[planType]}/${planTypes[planType]}-plan-${planNumber}.jpg`;
            });
        });
    });
});
