document.addEventListener('DOMContentLoaded', () => {
    // Helper functions
    function showSlide(slides, index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }

    function nextSlide(slides, currentIndex) {
        return (currentIndex + 1) % slides.length;
    }

    // Projects hover slideshow
    const projectsTrigger = document.querySelector('.projects-trigger');
    const projectsContainer = document.querySelector('.projects-hover-container');
    const projectsSlides = document.querySelectorAll('.projects-hover-container .slide');
    let projectsCurrentSlide = 0;
    let projectsInterval;
    let projectsHideTimeout;

    if (projectsTrigger && projectsSlides.length > 0) {
        projectsSlides[0].classList.add('active');

        projectsTrigger.addEventListener('mouseenter', () => {
            if (!projectsInterval) {
                projectsInterval = setInterval(() => {
                    projectsCurrentSlide = nextSlide(projectsSlides, projectsCurrentSlide);
                    showSlide(projectsSlides, projectsCurrentSlide);
                }, 400);
            }
            projectsContainer.classList.add('active');
        });

        projectsTrigger.addEventListener('mouseleave', () => {
            projectsHideTimeout = setTimeout(() => {
                projectsContainer.classList.remove('active');
                clearInterval(projectsInterval);
                projectsInterval = null;
            }, 3000);
        });

        projectsContainer.addEventListener('mouseenter', () => {
            clearTimeout(projectsHideTimeout);
        });

        projectsContainer.addEventListener('mouseleave', () => {
            projectsHideTimeout = setTimeout(() => {
                projectsContainer.classList.remove('active');
                clearInterval(projectsInterval);
                projectsInterval = null;
            }, 3000);
        });
    }

    // Instagram hover slideshow
    const instagramTrigger = document.querySelector('.instagram-trigger');
    const instagramContainer = document.querySelector('.instagram-hover-container');
    const instagramSlides = document.querySelectorAll('.instagram-hover-container .slide');
    let instagramCurrentSlide = 0;
    let instagramInterval;
    let instagramHideTimeout;

    if (instagramTrigger && instagramSlides.length > 0) {
        instagramSlides[0].classList.add('active');

        instagramTrigger.addEventListener('mouseenter', () => {
            if (!instagramInterval) {
                instagramInterval = setInterval(() => {
                    instagramCurrentSlide = nextSlide(instagramSlides, instagramCurrentSlide);
                    showSlide(instagramSlides, instagramCurrentSlide);
                }, 400);
            }
            instagramContainer.classList.add('active');
        });

        instagramTrigger.addEventListener('mouseleave', () => {
            instagramHideTimeout = setTimeout(() => {
                instagramContainer.classList.remove('active');
                clearInterval(instagramInterval);
                instagramInterval = null;
            }, 3000);
        });

        instagramContainer.addEventListener('mouseenter', () => {
            clearTimeout(instagramHideTimeout);
        });

        instagramContainer.addEventListener('mouseleave', () => {
            instagramHideTimeout = setTimeout(() => {
                instagramContainer.classList.remove('active');
                clearInterval(instagramInterval);
                instagramInterval = null;
            }, 3000);
        });
    }

    // Instagram hover preview
    const instagramPreview = document.querySelector('.instagram-preview');

    if (instagramTrigger && instagramPreview) {
        instagramTrigger.addEventListener('mouseenter', () => {
            clearTimeout(instagramHideTimeout);
            instagramContainer.classList.add('active');
        });

        instagramTrigger.addEventListener('mousemove', (e) => {
            if (instagramContainer.classList.contains('active')) {
                instagramPreview.style.left = `${e.clientX}px`;
                instagramPreview.style.top = `${e.clientY}px`;
            }
        });

        instagramTrigger.addEventListener('mouseleave', () => {
            instagramHideTimeout = setTimeout(() => {
                instagramContainer.classList.remove('active');
            }, 300);
        });

        instagramContainer.addEventListener('mouseenter', () => {
            clearTimeout(instagramHideTimeout);
        });

        instagramContainer.addEventListener('mouseleave', () => {
            instagramHideTimeout = setTimeout(() => {
                instagramContainer.classList.remove('active');
            }, 300);
        });
    }

    // Riso animation
    const risoTrigger = document.querySelector('.riso-trigger');
    const risoContainer = document.querySelector('.riso-container');
    let risoHideTimeout;

    if (risoTrigger) {
        risoTrigger.addEventListener('mouseenter', () => {
            clearTimeout(risoHideTimeout);
            risoContainer.classList.add('active');
        });

        risoTrigger.addEventListener('mouseleave', () => {
            risoHideTimeout = setTimeout(() => {
                risoContainer.classList.remove('active');
            }, 3000);
        });

        risoContainer.addEventListener('mouseenter', () => {
            clearTimeout(risoHideTimeout);
        });

        risoContainer.addEventListener('mouseleave', () => {
            risoHideTimeout = setTimeout(() => {
                risoContainer.classList.remove('active');
            }, 3000);
        });
    }

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
