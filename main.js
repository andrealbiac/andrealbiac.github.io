document.addEventListener('DOMContentLoaded', () => {
    // Helper functions
    function showSlide(slides, index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }

    function nextSlide(slides, currentIndex) {
        return (currentIndex + 1) % slides.length;
    }

    // Detect if device supports touch
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Helper function to create slideshow handler
    function createSlideshowHandler(triggerClass, containerClass, slideInterval = 2500, hideDelay = 10000) {
        const trigger = document.querySelector(`.${triggerClass}`);
        const container = document.querySelector(`.${containerClass}`);
        const slides = document.querySelectorAll(`.${containerClass} .slide`);
        let currentSlide = 0;
        let interval;
        let hideTimeout;

        if (trigger && slides.length > 0) {
            slides[0].classList.add('active');

            const startSlideshow = () => {
                if (!interval) {
                    interval = setInterval(() => {
                        currentSlide = nextSlide(slides, currentSlide);
                        showSlide(slides, currentSlide);
                    }, slideInterval);
                }
                container.classList.add('active');
            };

            const stopSlideshow = () => {
                hideTimeout = setTimeout(() => {
                    container.classList.remove('active');
                    clearInterval(interval);
                    interval = null;
                }, hideDelay);
            };

            // Prevent navigation (only show slideshow)
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
            });

            if (isTouchDevice) {
                trigger.addEventListener('touchstart', (e) => {
                    if (!container.classList.contains('active')) {
                        startSlideshow();
                        stopSlideshow();
                    } else {
                        container.classList.remove('active');
                        clearInterval(interval);
                        interval = null;
                        clearTimeout(hideTimeout);
                    }
                });
            } else {
                trigger.addEventListener('mouseenter', startSlideshow);
                trigger.addEventListener('mouseleave', stopSlideshow);

                container.addEventListener('mouseenter', () => {
                    clearTimeout(hideTimeout);
                });

                container.addEventListener('mouseleave', stopSlideshow);
            }
        }
    }

    // Helper function to create single image handler
    function createSingleImageHandler(triggerClass, containerClass) {
        const trigger = document.querySelector(`.${triggerClass}`);
        const container = document.querySelector(`.${containerClass}`);
        let hideTimeout;

        if (trigger && container) {
            const show = () => {
                clearTimeout(hideTimeout);
                container.classList.add('active');
            };

            const hide = () => {
                hideTimeout = setTimeout(() => {
                    container.classList.remove('active');
                }, 10000);
            };

            // Prevent navigation (only show image)
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
            });

            if (isTouchDevice) {
                trigger.addEventListener('touchstart', (e) => {
                    if (!container.classList.contains('active')) {
                        show();
                        hide();
                    } else {
                        container.classList.remove('active');
                        clearTimeout(hideTimeout);
                    }
                });
            } else {
                trigger.addEventListener('mouseenter', show);
                trigger.addEventListener('mouseleave', hide);

                container.addEventListener('mouseenter', () => {
                    clearTimeout(hideTimeout);
                });

                container.addEventListener('mouseleave', hide);
            }
        }
    }

    // Initialize all hover effects
    createSlideshowHandler('branding-trigger', 'branding-hover-container');
    createSlideshowHandler('websites-trigger', 'websites-hover-container');
    createSlideshowHandler('motion-trigger', 'motion-container', 4000, 15000); // Longer timing for motion graphics
    createSlideshowHandler('pottery-trigger', 'pottery-hover-container', 800, 10000); // Even faster timing for chairs
    createSingleImageHandler('mixedmedia-trigger', 'mixedmedia-container');

    // Project page slideshow click functionality
    const projectSlideshows = document.querySelectorAll('.project .slideshow');
    
    projectSlideshows.forEach(slideshow => {
        const slides = slideshow.querySelectorAll('.slide');
        let currentSlide = 0;

        if (slides.length > 0) {
            slides[0].classList.add('active');

            slideshow.addEventListener('click', () => {
                currentSlide = nextSlide(slides, currentSlide);
                showSlide(slides, currentSlide);
            });
        }
    });
});
