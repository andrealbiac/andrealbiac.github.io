document.addEventListener('DOMContentLoaded', () => {
    const indexText = document.querySelector('.index-text');
    const galleryModal = document.getElementById('gallery-modal');
    const nameHighlights = document.querySelectorAll('.name-highlight');
    const categoryLinks = document.querySelectorAll('.category-link');
    let backgroundManager = null;
    let hoveredCategory = null;

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
                repeat: 1,
            });
        }, 3000);
    }

    nameHighlights.forEach((highlight) => {
        const text = highlight.textContent;
        highlight.textContent = '';
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = `${index * 0.05}s`;
            highlight.appendChild(span);
        });
    });

    const getInTouchBtn = document.querySelector('.get-in-touch-btn');
    const bottomBar = document.querySelector('.bottom-bar');
    if (getInTouchBtn && bottomBar) {
        const defaultText = getInTouchBtn.dataset.defaultText || 'Contact';
        const hoverText = getInTouchBtn.dataset.hoverText || 'Email';

        bottomBar.addEventListener('mouseenter', () => {
            getInTouchBtn.textContent = hoverText;
        });
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
            }
        });

        document.addEventListener('click', (e) => {
            if (
                window.matchMedia('(max-width: 768px)').matches &&
                bottomBar.classList.contains('mobile-expanded') &&
                !bottomBar.contains(e.target)
            ) {
                bottomBar.classList.remove('mobile-expanded');
                getInTouchBtn.textContent = defaultText;
            }
        });
    }

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
            const mgr =
                document.getElementById('background-container')?.backgroundManager || window.backgroundManager;
            if (mgr) backgroundManager = mgr;
        };
        initManager();
        setTimeout(initManager, 100);
    });

    categoryLinks.forEach((link) => {
        const category = link.getAttribute('data-category');
        const color = categoryColors[category];

        link.addEventListener('mouseenter', () => {
            hoveredCategory = category;
            link.style.color = color;
            indexText.classList.add('text-dimmed');
            document.dispatchEvent(new CustomEvent('categoryHoverStart', { detail: { category } }));
        });

        link.addEventListener('mouseleave', () => {
            if (hoveredCategory === category) {
                hoveredCategory = null;
                link.style.color = '';
                indexText.classList.remove('text-dimmed');
                document.dispatchEvent(new CustomEvent('categoryHoverEnd'));
            }
        });

        link.addEventListener('click', (e) => {
            e.preventDefault();
            const manager = backgroundManager || window.backgroundManager;
            if (manager && manager.openGallery) {
                manager.openGallery(category);
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && galleryModal && galleryModal.style.display === 'flex') {
            const manager = backgroundManager || window.backgroundManager;
            if (manager && manager.closeGallery) {
                manager.closeGallery();
            }
        }
    });

    document.addEventListener('highlightCategory', (e) => {
        const cat = e.detail.category;
        categoryLinks.forEach((link) => {
            if (link.getAttribute('data-category') === cat) {
                link.classList.add('highlighted');
                link.style.color = categoryColors[cat];
            }
        });
        indexText.classList.add('text-dimmed');
    });

    document.addEventListener('unhighlightCategory', () => {
        categoryLinks.forEach((link) => {
            link.classList.remove('highlighted');
            link.style.color = '';
        });
        indexText.classList.remove('text-dimmed');
    });

    document.addEventListener('galleryClosed', () => {
        hoveredCategory = null;
        document.dispatchEvent(new CustomEvent('categoryHoverEnd'));
        categoryLinks.forEach((link) => {
            link.classList.remove('highlighted');
            link.style.color = '';
        });
        indexText.classList.remove('text-dimmed');
    });
});

window.addEventListener('load', () => {
    const manager = new BackgroundManager();
    document.getElementById('background-container').backgroundManager = manager;
    window.backgroundManager = manager;
});
