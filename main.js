document.addEventListener('DOMContentLoaded', () => {
    const categoryColors = {
        branding: '#BD9EFF',
        web: '#FF9D47',
        motion: '#FB7CA6',
        mixedmedia: '#9ACBFF',
        pottery: '#A4754C'
    };

    // Get all category links
    const categoryLinks = document.querySelectorAll('.category-link');
    const indexText = document.querySelector('.index-text');
    const galleryModal = document.getElementById('gallery-modal');
    const nameHighlights = document.querySelectorAll('.name-highlight');
    const scrollCue = document.querySelector('.scroll-cue');
    let backgroundManager = null;
    let hoveredCategory = null;

    // Hide scroll cue after 6 seconds
    if (scrollCue) {
        setTimeout(() => {
            scrollCue.classList.add('hidden');
        }, 6000);
    }

    // Wrap each letter in name highlights with spans for animation (only 'graphic designer')
    nameHighlights.forEach(highlight => {
        const text = highlight.textContent;
        highlight.textContent = '';
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = `${index * 0.05}s`;
            highlight.appendChild(span);
        });
    });

    // Name hover image (id.png follows mouse when hovering "Andrea Albiac")
    const nameHoverImage = document.getElementById('name-hover-image');
    const nameStatic = document.querySelector('.name-highlight-static');
    
    if (nameHoverImage && nameStatic) {
        nameStatic.addEventListener('mouseenter', () => {
            nameHoverImage.classList.add('visible');
        });
        
        nameStatic.addEventListener('mouseleave', () => {
            nameHoverImage.classList.remove('visible');
        });
        
        nameStatic.addEventListener('mousemove', (e) => {
            nameHoverImage.style.left = `${e.clientX + 15}px`;
            nameHoverImage.style.top = `${e.clientY + 15}px`;
        });
    }

    // Wait for BackgroundManager to be initialized
    window.addEventListener('load', () => {
        // Get reference to background manager from global scope
        setTimeout(() => {
            const bgContainer = document.getElementById('background-container');
            if (bgContainer && bgContainer.backgroundManager) {
                backgroundManager = bgContainer.backgroundManager;
            }
        }, 100);
    });

    // Handle category link hover and click
    categoryLinks.forEach(link => {
        const category = link.getAttribute('data-category');
        const color = categoryColors[category];

        link.addEventListener('mouseenter', () => {
            hoveredCategory = category;
            // Add color to the hovered link
            link.style.color = color;
            
            // Dim other text (not category links)
            indexText.classList.add('text-dimmed');
            
            // Dispatch event to show all particles of this category
            document.dispatchEvent(new CustomEvent('categoryHoverStart', { 
                detail: { category } 
            }));
        });

        link.addEventListener('mouseleave', () => {
            if (hoveredCategory === category) {
                hoveredCategory = null;
                link.style.color = '';
                indexText.classList.remove('text-dimmed');
                
                // Dispatch event to hide category particles
                document.dispatchEvent(new CustomEvent('categoryHoverEnd'));
            }
        });

        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Set background color immediately to full category color
            const bgContainer = document.getElementById('background-container');
            gsap.to(bgContainer, {
                backgroundColor: color,
                duration: 0.4,
                ease: 'power2.out'
            });
            
            // Open gallery
            openGallery(category);
        });
    });

    // Gallery functions
    function openGallery(category) {
        if (backgroundManager && backgroundManager.openGallery) {
            backgroundManager.openGallery(category);
        }
    }

    function closeGallery() {
        if (backgroundManager && backgroundManager.closeGallery) {
            backgroundManager.closeGallery();
        }
    }

    // Close gallery on overlay click
    if (galleryModal) {
        galleryModal.addEventListener('click', (e) => {
            if (e.target === galleryModal || e.target.classList.contains('gallery-overlay')) {
                closeGallery();
            }
        });
    }

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && galleryModal && galleryModal.style.display === 'flex') {
            closeGallery();
        }
    });

    // Listen for particle hover events to highlight category
    document.addEventListener('highlightCategory', (e) => {
        const category = e.detail.category;
        categoryLinks.forEach(link => {
            if (link.getAttribute('data-category') === category) {
                link.classList.add('highlighted');
                link.style.color = categoryColors[category];
            }
        });
        indexText.classList.add('text-dimmed');
    });

    document.addEventListener('unhighlightCategory', () => {
        categoryLinks.forEach(link => {
            link.classList.remove('highlighted');
            link.style.color = '';
        });
        indexText.classList.remove('text-dimmed');
    });
});
