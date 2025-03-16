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


    document.getElementById("subscriptionBtn").addEventListener("click", function() {
        document.querySelector(".menu-toggle").classList.remove("active");
        document.querySelector(".menu-overlay").classList.remove("active");

        document.body.style.overflow = "";
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

    let progressInterval;

    function resetAllProgress() {
        const allProgress = document.querySelectorAll('.nav-indicator .progress');
        allProgress.forEach(progress => {
            progress.style.transition = 'none';
            progress.style.transform = 'translateX(-100%)';
        });
    }

    function startProgress(videoDuration) {
        resetAllProgress();
        const activeIndicator = document.querySelector('.nav-indicator.active .progress');
        if (!activeIndicator) return;

        // Force reflow
        activeIndicator.offsetHeight;

        // Start progress animation with video duration
        requestAnimationFrame(() => {
            activeIndicator.style.transition = `transform ${videoDuration}s linear`;
            activeIndicator.style.transform = 'translateX(0%)';
        });
    }

    function goToSlide(index) {
        // Clear any existing interval
        if (progressInterval) {
            clearTimeout(progressInterval);
        }

        // Stop all videos and reset progress
        slides.forEach(slide => {
            const video = slide.querySelector('video');
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        });
        resetAllProgress();

        // Switch slide
        slides[currentSlide].classList.remove('active');
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        updateSlideIndicators();
        
        // Start video on active slide
        const activeVideo = slides[currentSlide].querySelector('video');
        if (activeVideo) {
            // Wait for video metadata to load to get duration
            if (activeVideo.readyState >= 1) {
                activeVideo.play();
                startProgress(activeVideo.duration);
                progressInterval = setTimeout(() => {
                    const nextIndex = (currentSlide + 1) % slides.length;
                    goToSlide(nextIndex);
                }, activeVideo.duration * 1000);
            } else {
                activeVideo.addEventListener('loadedmetadata', () => {
                    activeVideo.play();
                    startProgress(activeVideo.duration);
                    progressInterval = setTimeout(() => {
                        const nextIndex = (currentSlide + 1) % slides.length;
                        goToSlide(nextIndex);
                    }, activeVideo.duration * 1000);
                });
            }
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
    const navButtons = document.querySelectorAll('.nav-button');
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const index = parseInt(button.dataset.slide);
            if (index !== currentSlide) {
                goToSlide(index);
            }
        });
    });

    // Start første slide (only on index page)
    if (document.querySelector('.slide')) {
        goToSlide(0);
    }

    // Floor plan and hotelrum switching
    function setupTabSwitching(tabsSelector, imagesContainerSelector) {
        const tabs = document.querySelectorAll(tabsSelector);
        tabs.forEach((tab, index) => {
            tab.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all tabs
                tabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Show corresponding image
                const images = document.querySelectorAll(`${imagesContainerSelector} .plan-image`);
                images.forEach(img => img.classList.remove('active'));
                if (images[index]) {
                    images[index].classList.add('active');
                }
            });
        });
    }

    // Set up floor plan switching
    setupTabSwitching('.floor-tabs .tab-link', '.hotel-plan-images');

    // Set up hotelrum switching

    // Lightbox functionality
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    // Function to open lightbox
    function openLightbox(imgSrc) {
        lightboxImg.src = imgSrc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Function to close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Add click event to plan images
    document.querySelectorAll('.plan-image').forEach(img => {
        img.addEventListener('click', function() {
            openLightbox(this.src);
        });
    });

    // Close lightbox when clicking close button
    lightboxClose.addEventListener('click', closeLightbox);

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close lightbox with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
    setupTabSwitching('.hotelrum-tabs .tab-link', '.hotelrum-images');

    // Plan type switching (Hotelrum/Hotel)
    const planTypeLinks = document.querySelectorAll('.tab-navigation .tab-link');

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

            if (this.textContent === 'HOTELLRUM') {
                hotelrumTabs.style.display = 'block';
                floorTabs.style.display = 'none';
                hotelPlanImages.style.display = 'none';
                hotelrumImages.style.display = 'block';

                // Activate first hotelrum tab and image
                const firstHotelrumTab = document.querySelector('.hotelrum-tabs .tab-link');
                if (firstHotelrumTab) {
                    firstHotelrumTab.click();
                }
            } else {
                hotelrumTabs.style.display = 'none';
                floorTabs.style.display = 'block';
                hotelPlanImages.style.display = 'block';
                hotelrumImages.style.display = 'none';

                // Activate first floor plan tab and image
                const firstFloorTab = document.querySelector('.floor-tabs .tab-link');
                if (firstFloorTab) {
                    firstFloorTab.click();
                }
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
