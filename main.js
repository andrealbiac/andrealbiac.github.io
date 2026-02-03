document.addEventListener('DOMContentLoaded', () => {
    const categoryColors = {
        branding: '#BD9EFF',
        web: '#FF9D47',
        motion: '#FB7CA6',
        mixedmedia: '#7EB5E8',
        pottery: '#A4754C'
    };

    // Get all category links
    const categoryLinks = document.querySelectorAll('.category-link');
    const indexText = document.querySelector('.index-text');
    const galleryModal = document.getElementById('gallery-modal');
    const nameHighlights = document.querySelectorAll('.name-highlight');
    let backgroundManager = null;
    let hoveredCategory = null;
    let touchHoveredCategory = null; // On (hover: none): first tap = show hover, second = open gallery

    // Subtle wave on 'branding' after 3 seconds to cue hover
    const brandingLink = document.querySelector('.category-link[data-category="branding"]');
    if (brandingLink) {
        const brandingText = brandingLink.textContent;
        brandingLink.textContent = '';
        brandingText.split('').forEach((char) => {
            const span = document.createElement('span');
            span.className = 'branding-letter';
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            brandingLink.appendChild(span);
        });
        const letters = brandingLink.querySelectorAll('.branding-letter');
        setTimeout(() => {
            gsap.to(letters, {
                y: -6,
                duration: 0.18,
                stagger: { each: 0.06, from: 'start' },
                ease: 'power2.out',
                yoyo: true,
                repeat: 1
            });
        }, 3000);
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

    // Contact/Email button: desktop = hover reveals portfolio note; mobile = tap to expand, then tap to email
    const getInTouchBtn = document.querySelector('.get-in-touch-btn');
    const bottomBar = document.querySelector('.bottom-bar');
    if (getInTouchBtn && bottomBar) {
        const defaultText = getInTouchBtn.dataset.defaultText || 'Contact';
        const hoverText = getInTouchBtn.dataset.hoverText || 'Email';

        bottomBar.addEventListener('mouseenter', () => { getInTouchBtn.textContent = hoverText; });
        bottomBar.addEventListener('mouseleave', () => {
            if (!bottomBar.classList.contains('mobile-expanded')) {
                getInTouchBtn.textContent = defaultText;
            }
        });

        getInTouchBtn.addEventListener('click', (e) => {
            const isMobile = window.matchMedia('(max-width: 768px)').matches;
            if (isMobile) {
                if (!bottomBar.classList.contains('mobile-expanded')) {
                    e.preventDefault();
                    bottomBar.classList.add('mobile-expanded');
                    getInTouchBtn.textContent = hoverText;
                }
                // If already expanded, allow default (mailto opens)
            }
        });

        // Mobile: tap outside to collapse portfolio note
        document.addEventListener('click', (e) => {
            if (window.matchMedia('(max-width: 768px)').matches &&
                bottomBar.classList.contains('mobile-expanded') &&
                !bottomBar.contains(e.target)) {
                bottomBar.classList.remove('mobile-expanded');
                getInTouchBtn.textContent = defaultText;
            }
        });
    }

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

    window.addEventListener('load', () => {
        const initManager = () => {
            const mgr = (document.getElementById('background-container')?.backgroundManager) || window.backgroundManager;
            if (mgr) backgroundManager = mgr;
        };
        initManager();
        setTimeout(initManager, 100);
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
            const isTouchLike = window.matchMedia('(hover: none)').matches;
            if (isTouchLike) {
                if (touchHoveredCategory === category) {
                    touchHoveredCategory = null;
                    openGallery(category);
                } else {
                    e.preventDefault();
                    touchHoveredCategory = category;
                    link.style.color = color;
                    indexText.classList.add('text-dimmed');
                    document.dispatchEvent(new CustomEvent('categoryHoverStart', { detail: { category } }));
                }
            } else {
                e.preventDefault();
                openGallery(category);
            }
        });
    });

    // On touch devices: clear category "tap hover" when tapping outside (not contact, not gallery)
    document.addEventListener('click', (e) => {
        if (!window.matchMedia('(hover: none)').matches || touchHoveredCategory === null) return;
        const t = e.target;
        if (t.closest('.category-link') || t.closest('.get-in-touch-btn') || t.closest('.bottom-bar') || t.closest('#gallery-modal')) return;
        touchHoveredCategory = null;
        document.dispatchEvent(new CustomEvent('categoryHoverEnd'));
        categoryLinks.forEach(link => {
            link.classList.remove('highlighted');
            link.style.color = '';
        });
        indexText.classList.remove('text-dimmed');
    });

    // Gallery functions
    function openGallery(category) {
        const manager = backgroundManager || window.backgroundManager;
        if (manager && manager.openGallery) {
            manager.openGallery(category);
        }
    }

    function closeGallery() {
        const manager = backgroundManager || window.backgroundManager;
        if (manager && manager.closeGallery) {
            manager.closeGallery();
        }
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
