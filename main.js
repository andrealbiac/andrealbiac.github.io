// Category colors: purple, orange, pink, light blue, blue, soft brown
const categoryColors = {
    branding: '#BD9EFF',    // purple
    web: '#FF9D47',         // orange
    motion: '#FB7CA6',      // pink
    mixedmedia: '#7EB5E8',  // blue
    pottery: '#A4754C'      // soft brown
};

const DEFAULT_BG = '#F9F2E4';

/** Hash fragments that open a gallery (shareable URLs, e.g. /#web). */
const GALLERY_ROUTE_CATEGORIES = new Set(['web', 'branding', 'motion', 'mixedmedia', 'pottery']);

function categoryFromLocationHash() {
    const raw = (window.location.hash || '').replace(/^#/, '').trim().toLowerCase();
    return GALLERY_ROUTE_CATEGORIES.has(raw) ? raw : null;
}

const HALF_W = 7;
const BLOCK_H = 18;

// Projects with site links (assign projectId to images that link to these)
const projects = {
    project1: { link: 'https://haydenmalan.nl', },
    project2: { link: 'https://pear-ed.org', },
    project3: { link: 'https://soulinthekitchen.com', },
    project4: { link: 'https://hambremagazine.com', },
    project5: { link: 'https://x402hackathon.com', },
    project6: { link: 'https://ethglobal.com/showcase/dynos-95-9n57a', },
    project7: { link: 'https://vimeo.com/1072529410', label: 'See full video' },
    project8: { link: 'https://estudioslapeseta.com', },
    project9: { link: 'https://yellow-thread.com', },
};

// Featured website projects (modal list order)
const webProjects = [
    {
        projectId: 'project8',
        label: 'La Peseta',
        description:
            'Design and development of a website for a music teacher that offers courses on Song-making and Musical Production. Different elements of the website encourage you to move things, interact with it and play music, evoking a playful headspace.',
        slides: ['img/web-25.png', 'img/web-26.png', 'img/web-27.png', 'img/web-28.png'],
    },
    {
        projectId: 'project9',
        label: 'Yellow Thread',
        description:
            'Design and development for Yellow Thread, a craft studio that make props, shootings and atrezzo for brands. The website works as a simple, linear catalog of their work, grouped into categories that flow as the gallery advances.',
        slides: ['img/web-29.png', 'img/web-30.png', 'img/web-31.png', 'img/web-32.png'],
    },
    {
        projectId: 'project1',
        label: 'Hayden malan',
        description:
            'For this landscape architectural portfolio, we wanted to create a playful environment where users can browse through maps. The projects were grouped into four categories that slide in from the side like archive folders on top of them. The website was fully coded, with the help of vibe coding. It involved API map embedding, and since the practice is spread between Cape Town and Amsterdam, we came up with a system of anchor tags to make it easier to jump from one place to the other.',
        slides: ['img/web-2.png', 'img/web-3.png'],
    },
    {
        projectId: 'project2',
        label: 'Pear_ed',
        description:
            'Website for Pear_ed, a botanical art and research project. The site holds their artworks and a map with the cuttings locations, enabling a space that supports exploration, discovery and ongoing documentation.',
        slides: ['img/web-5.png', 'img/web-5-1.png', 'img/web-6.png', 'img/web-7.png'],
    },
    {
        projectId: 'project3',
        label: 'Soul in the kitchen',
        description:
            'Claudia Polo—the woman behind this project—is passionate about how a conscious meal can change the way we relate to food, ourselves, and our environment. As she was growing on social media and writing a book, she asked me to define her brand and create a website that would serve as a portfolio, a recipe book for her followers, and a manifesto.',
        slides: ['img/web-8.png', 'img/web-9.png', 'img/web-10.png'],
    },
    {
        projectId: 'project4',
        label: 'Hambre magazine',
        description:
            'Hambre (Hunger) magazine is a secondary brand of Soul in the Kitchen, a collaborative and online magazine about food-related narratives.',
        slides: ['img/web-11.png', 'img/web-12.png', 'img/web-13.png'],
    },
    {
        projectId: 'project6',
        label: 'DynOS95',
        description: 'UI design work for finalist project at ETHGlobal\'s London hackathon, winning Noun\'s best UX/UI implementation and Dynamic\'s best onboarding UX prizes, inspired in Windows 95 aesthetics.',
        slides: ['img/web-21.png'],
    },
];

function getWebProjectFocusFromGalleryIndex(startIndex) {
    const images = galleryImages.web;
    const img = images[startIndex];
    if (!img || !img.projectId) return { projectIndex: 0, slideIndex: 0 };
    const projectIndex = webProjects.findIndex((p) => p.projectId === img.projectId);
    if (projectIndex < 0) return { projectIndex: 0, slideIndex: 0 };
    const slides = webProjects[projectIndex].slides;
    let slideIndex = slides.indexOf(img.src);
    if (slideIndex < 0) slideIndex = 0;
    return { projectIndex, slideIndex };
}

// Gallery images: src, label, description (optional), projectId (optional)
const galleryImages = {
    branding: [
        { src: 'img/brand-1.png', label: 'Soul in the Kitchen', description: 'Visual identity and illustrations for Soul in the Kitchen, a conscious food advocate, content creator and author.' },
        { src: 'img/brand-2.png', label: 'Soul in the Kitchen', description: 'Visual identity and illustrations for Soul in the Kitchen, a conscious food advocate, content creator and author.' },
        { src: 'img/brand-3.png', label: 'Soul in the Kitchen', description: 'Visual identity and illustrations for Soul in the Kitchen, a conscious food advocate, content creator and author.' },
        { src: 'img/brand-4.gif', label: 'Soul in the Kitchen', description: 'Visual identity and illustrations for Soul in the Kitchen, a conscious food advocate, content creator and author.' },
        { src: 'img/brand-5.png', label: 'Hambre magazine', description: 'Logo and brand for online magazine' },
        { src: 'img/brand-6.png', label: 'Tame your gut', description: 'Social media assets and brand for Tame your gut, a health coach and content creator.' },
        { src: 'img/brand-8.png', label: 'BuidlGuidl', description: 'Brand assets, merchandise and illustrations for BuidGuidl, an Ethereum community and blockchain education platform.' },
        { src: 'img/brand-9.png', label: 'BuidlGuidl', description: 'Brand assets, merchandise and illustrations for BuidGuidl, an Ethereum community and blockchain education platform.' },
        { src: 'img/brand-10.png', label: 'BuidlGuidl', description: 'Brand assets, merchandise and illustrations for BuidGuidl, an Ethereum community and blockchain education platform.' },
        { src: 'img/brand-11.png', label: 'Illustration sketch', description: 'Sketch for BuidlGuidl\'s hero illustration.' },
        { src: 'img/brand-14.png', label: 'Scroll.io', description: 'Illustrations for Scroll.io website.' },
    ],
    web: [
        { src: 'img/web-25.png', label: 'La Peseta', description: 'Design and development of a website for a music teacher that offers courses on Song-making and Musical Production. Different elements of the website encourage you to move things, interact with it and play music, evoking a playful headspace.', projectId: 'project8' },
        { src: 'img/web-26.png', label: 'La Peseta', description: 'Design and development of a website for a music teacher that offers courses on Song-making and Musical Production. Different elements of the website encourage you to move things, interact with it and play music, evoking a playful headspace.', projectId: 'project8' },
        { src: 'img/web-27.png', label: 'La Peseta', description: 'Design and development of a website for a music teacher that offers courses on Song-making and Musical Production. Different elements of the website encourage you to move things, interact with it and play music, evoking a playful headspace.', projectId: 'project8' },
        { src: 'img/web-28.png', label: 'La Peseta', description: 'Design and development of a website for a music teacher that offers courses on Song-making and Musical Production. Different elements of the website encourage you to move things, interact with it and play music, evoking a playful headspace.', projectId: 'project8' },
        { src: 'img/web-29.png', label: 'Yellow Thread', description: 'Design and development for Yellow Thread, a craft studio that make props, shootings and atrezzo for brands. The website works as a simple, linear catalog of their work, grouped into categories that flow as the gallery advances.', projectId: 'project9' },
        { src: 'img/web-30.png', label: 'Yellow Thread', description: 'Design and development for Yellow Thread, a craft studio that make props, shootings and atrezzo for brands. The website works as a simple, linear catalog of their work, grouped into categories that flow as the gallery advances.', projectId: 'project9' },
        { src: 'img/web-31.png', label: 'Yellow Thread', description: 'Design and development for Yellow Thread, a craft studio that make props, shootings and atrezzo for brands. The website works as a simple, linear catalog of their work, grouped into categories that flow as the gallery advances.', projectId: 'project9' },
        { src: 'img/web-32.png', label: 'Yellow Thread', description: 'Design and development for Yellow Thread, a craft studio that make props, shootings and atrezzo for brands. The website works as a simple, linear catalog of their work, grouped into categories that flow as the gallery advances.', projectId: 'project9' },
        { src: 'img/web-2.png', label: 'Hayden', description: 'For this landscape architectural portfolio, we wanted to create a playful environment where users can browse through maps. The projects were grouped into four categories that slide in from the side like archive folders on top of them. The website was fully coded, with the help of vibe coding. It involved API map embedding, and since the practice is spread between Cape Town and Amsterdam, we came up with a system of anchor tags to make it easier to jump from one place to the other.', projectId: 'project1' },
        { src: 'img/web-3.png', label: 'Hayden', description: 'For this landscape architectural portfolio, we wanted to create a playful environment where users can browse through maps. The projects were grouped into four categories that slide in from the side like archive folders on top of them. The website was fully coded, with the help of vibe coding. It involved API map embedding, and since the practice is spread between Cape Town and Amsterdam, we came up with a system of anchor tags to make it easier to jump from one place to the other.', projectId: 'project1' },
        { src: 'img/web-5.png', label: 'pear_ed', description: 'Website for pear_ed, a botanical art and research project. The site holds their artworks and a map with the cuttings locations, enabling a space that supports exploration, discovery and ongoing documentation.', projectId: 'project2' },
        { src: 'img/web-5-1.png', label: 'pear_ed', description: 'Website for pear_ed, a botanical art and research project. The site holds their artworks and a map with the cuttings locations, enabling a space that supports exploration, discovery and ongoing documentation.', projectId: 'project2' },
        { src: 'img/web-6.png', label: 'pear_ed', description: 'Website for pear_ed, a botanical art and research project. The site holds their artworks and a map with the cuttings locations, enabling a space that supports exploration, discovery and ongoing documentation.', projectId: 'project2' },
        { src: 'img/web-7.png', label: 'pear_ed', description: 'Website for pear_ed, a botanical art and research project. The site holds their artworks and a map with the cuttings locations, enabling a space that supports exploration, discovery and ongoing documentation.', projectId: 'project2' },
        { src: 'img/web-8.png', label: 'Soul', description: 'Claudia Polo—the woman behind this project—is passionate about how a conscious meal can change the way we relate to food, ourselves, and our environment. As she was growing on social media and writing a book, she asked me to define her brand and create a website that would serve as a portfolio, a recipe book for her followers, and a manifesto.', projectId: 'project3' },
        { src: 'img/web-9.png', label: 'Soul', description: 'Claudia Polo—the woman behind this project—is passionate about how a conscious meal can change the way we relate to food, ourselves, and our environment. As she was growing on social media and writing a book, she asked me to define her brand and create a website that would serve as a portfolio, a recipe book for her followers, and a manifesto.', projectId: 'project3' },
        { src: 'img/web-10.png', label: 'Soul', description: 'Claudia Polo—the woman behind this project—is passionate about how a conscious meal can change the way we relate to food, ourselves, and our environment. As she was growing on social media and writing a book, she asked me to define her brand and create a website that would serve as a portfolio, a recipe book for her followers, and a manifesto.', projectId: 'project3' },
        { src: 'img/web-11.png', label: 'Hambre', description: 'Hambre (Hunger) magazine is a secondary brand of Soul in the Kitchen, a collaborative and online magazine about food-related narratives.', projectId: 'project4' },
        { src: 'img/web-12.png', label: 'Hambre', description: 'Hambre (Hunger) magazine is a secondary brand of Soul in the Kitchen, a collaborative and online magazine about food-related narratives.', projectId: 'project4' },
        { src: 'img/web-13.png', label: 'Hambre', description: 'Hambre (Hunger) magazine is a secondary brand of Soul in the Kitchen, a collaborative and online magazine about food-related narratives.', projectId: 'project4' },
        { src: 'img/web-14.png', label: 'It\'s me!', description: 'Designed and coded this website.' },
        { src: 'img/web-21.png', label: 'DynOS95', description: 'UI design work for finalist project at ETHGlobal\'s London hackathon, winning Noun\'s best UX/UI implementation and Dynamic\'s best onboarding UX prizes, inspired in Windows 95 aesthetics.', projectId: 'project6' },
    ],
    motion: [
        { src: 'img/motion-1.gif', label: 'Ingennus', description: 'Full animation, concept and storyboard for Ingennus\' sustainability campaign, along with Tropical Studio.', projectId: 'project7' },
        { src: 'img/motion-2.gif', label: 'Ingennus', description: 'Full animation, concept and storyboard for Ingennus\' sustainability campaign, along with Tropical Studio.', projectId: 'project7' },
        { src: 'img/motion-3.gif', label: 'Etopia', description: 'Animated and worked in the concept of Etopia\'s moving identity, while working at Tropical Studio.' },
        { src: 'img/motion-4.gif', label: 'CTF', description: 'Social media assets and video editing for Capture the Flag event.' }
    ],
    mixedmedia: [
        { src: 'img/sun-1.gif', label: 'Risoprint Animation', description: 'Mixed media, frame by frame animation.Developed in a workshop led by Julia Schimautz from DTAN Studio: from Flipbook to animation. Hosted by Onomatopee (Eindhoven).' },
        { src: 'img/sun-2.gif', label: 'Risoprint Animation', description: 'Mixed media, frame by frame animation.Developed in a workshop led by Julia Schimautz from DTAN Studio: from Flipbook to animation. Hosted by Onomatopee (Eindhoven).' },
        { src: 'img/sun-3.gif', label: 'Risoprint Animation', description: 'Mixed media, frame by frame animation.Developed in a workshop led by Julia Schimautz from DTAN Studio: from Flipbook to animation. Hosted by Onomatopee (Eindhoven).' },
        { src: 'img/dog-1.gif', label: 'Window puppy', description: 'Frame by frame animation using Procreate, from a recorded video.' },
        { src: 'img/dog-2.gif', label: 'Window puppy', description: 'Frame by frame animation using Procreate, from a recorded video.' },
        { src: 'img/sun-4.png', label: 'Styleframe' }
    ],
    pottery: [
        { src: 'img/chair-0.jpeg', label: 'Jean Prouvé\'s in the making' },
        { src: 'img/chair-1.jpeg', label: 'Eames LCW & Kneeling chair' },
        { src: 'img/chair-2.jpeg', label: 'Jean Prouvé\'s Standard chair' },
        { src: 'img/chair-4.jpeg', label: 'Eames LCW' },
        { src: 'img/chair-5.jpeg', label: 'Enzo Mari\'s Sedia 1' },
        { src: 'img/chair-6.jpeg', label: 'Kneeling chair' }
    ]
};

class BackgroundManager {
    constructor() {
        this.container = document.getElementById('scrollable-container');
        this.backgroundContainer = document.getElementById('background-container');

        this.backgroundContainer.style.backgroundColor = DEFAULT_BG;

        this.blocks = [];
        this.minBlocks = 16;
        this.maxBlocks = 22;
        this.mobileMaxWidth = 768;
        this.lastScrollY = 0;
        this.lastBlockCreationScroll = 0;
        this.isAutoScrolling = false;
        this.autoScrollSpeed = 0.8;
        this.autoScrollAccum = 0;
        this.sunIcon = document.querySelector('.sun-icon');
        this.rotationDegrees = 0;
        this.growthThreshold = window.innerHeight * 0.8;
        this.rafPending = false;

        this.smoothScroll = { y: 0 };
        this.smoothScrollTo = gsap.quickTo(this.smoothScroll, 'y', {
            duration: 0.7,
            ease: 'power2.out',
        });

        this.hoveredBlock = null;

        this.loadedImages = {};
        this.preloadImages();

        this.activeGallery = null;
        this.pushedStateForGallery = false;

        // Particle overlays container for animated GIFs
        this.overlaysContainer = document.getElementById('particle-overlays-container');
        this.activeOverlays = new Map(); // Map of block -> overlay element
        this.closingOverlays = new Set(); // Blocks whose overlay is animating closed (don't immediate-remove)
        this.hoveredCategory = null; // Category being hovered in text
        this.peekBlock = null;
        this.peekTimeoutId = null;
        this.peekCloseTimeoutId = null;
        this.lastParticleOverlayShownAt = 0;

        this.setupCanvas();
        this.setupCategoryHoverListeners();
        this._galleryRouteSyncScheduled = false;
        window.addEventListener('popstate', () => this.scheduleGalleryRouteSync());
        window.addEventListener('hashchange', () => this.scheduleGalleryRouteSync());
        const galleryCloseBtn = document.getElementById('gallery-close-btn');
        if (galleryCloseBtn) {
            galleryCloseBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (this.activeGallery) this.closeGallery();
            });
        }
        this.webProjectsCarouselCleanups = [];
        this.setupGalleryNav();
        this.init();
        this.scheduleRandomPeek();
        requestAnimationFrame(() => this.applyGalleryRouteFromUrl());
    }

    scheduleGalleryRouteSync() {
        if (this._galleryRouteSyncScheduled) return;
        this._galleryRouteSyncScheduled = true;
        requestAnimationFrame(() => {
            this._galleryRouteSyncScheduled = false;
            this.handleGalleryHistoryChange();
        });
    }

    handleGalleryHistoryChange() {
        const cat = categoryFromLocationHash();
        if (cat && cat !== this.activeGallery) {
            this.openGallery(cat, 0, null);
        } else if (!cat && this.activeGallery) {
            this.closeGallery(true);
        }
    }

    updateGalleryHistory(category, wasGalleryOpen) {
        const path = window.location.pathname + window.location.search;
        const next = `${path}#${category}`;
        const urlAlreadyShowsCategory = !wasGalleryOpen && categoryFromLocationHash() === category;
        if (!wasGalleryOpen) {
            if (urlAlreadyShowsCategory) {
                this.pushedStateForGallery = false;
            } else {
                history.pushState({ gallery: category }, '', next);
                this.pushedStateForGallery = true;
            }
        } else {
            history.replaceState({ gallery: category }, '', next);
        }
    }

    applyGalleryRouteFromUrl() {
        const cat = categoryFromLocationHash();
        if (!cat) return;
        this.openGallery(cat, 0, null);
    }

    scheduleRandomPeek() {
        if (this.peekTimeoutId) clearTimeout(this.peekTimeoutId);
        this.peekTimeoutId = null;
        const delay = 3000 + Math.random() * 1500;
        this.peekTimeoutId = setTimeout(() => this.doRandomPeek(), delay);
    }

    doRandomPeek() {
        this.peekTimeoutId = null;
        if (this.hoveredCategory || this.activeGallery || this.hoveredBlock) {
            this.scheduleRandomPeek();
            return;
        }
        const sy = this.smoothScroll.y;
        const h = window.innerHeight;
        const visible = this.blocks.filter((block) => {
            const screenY = block.y - sy;
            return screenY > 50 && screenY < h - 50 && !this.activeOverlays.has(block);
        });
        if (visible.length === 0) {
            this.scheduleRandomPeek();
            return;
        }
        const block = visible[Math.floor(Math.random() * visible.length)];
        this.peekBlock = block;
        this.showParticleOverlayAnimated(block, 0);
        const peekCloseId = setTimeout(() => {
            if (this.peekBlock === block && block !== this.hoveredBlock && !this.hoveredCategory) {
                this.removeOverlay(block, false, () => {
                    this.peekBlock = null;
                    this.scheduleRandomPeek();
                });
            } else {
                this.peekBlock = null;
                this.scheduleRandomPeek();
            }
        }, 3000);
        this.peekCloseTimeoutId = peekCloseId;
    }

    setupCategoryHoverListeners() {
        // Category link hover (index text) drives particle emphasis
        document.addEventListener('categoryHoverStart', (e) => {
            this.hoveredCategory = e.detail.category;
            this.scheduleRandomPeek();
            this.showCategoryParticles(e.detail.category);
        });

        document.addEventListener('categoryHoverEnd', () => {
            this.hoveredCategory = null;
            this.hideCategoryParticles();
        });

    }

    createOverlayElement() {
        const overlay = document.createElement('div');
        overlay.className = 'particle-hover-overlay';
        overlay.innerHTML = `
            <img src="" alt="" class="particle-hover-image">
            <div class="particle-hover-label"></div>
        `;
        this.overlaysContainer.appendChild(overlay);
        return overlay;
    }

    getOrCreateOverlay(block) {
        if (!this.activeOverlays.has(block)) {
            const overlay = this.createOverlayElement();
            overlay.addEventListener('click', (e) => {
                e.stopPropagation();
                this.openGallery(block.category, block.imageIndex, block);
            });
            this.activeOverlays.set(block, overlay);
        }
        return this.activeOverlays.get(block);
    }

    removeOverlay(block, immediate = false, onComplete = null) {
        const overlay = this.activeOverlays.get(block);
        if (!overlay) return;
        this.closingOverlays.delete(block);
        if (immediate) {
            gsap.killTweensOf(overlay);
            if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
            this.activeOverlays.delete(block);
            if (onComplete) onComplete();
            return;
        }
        this.closingOverlays.add(block);
        gsap.to(overlay, {
            opacity: 0,
            scale: 0.05,
            duration: 0.18,
            ease: 'power2.in',
            xPercent: -50,
            yPercent: -50,
            overwrite: true,
            onComplete: () => {
                this.closingOverlays.delete(block);
                if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
                this.activeOverlays.delete(block);
                if (onComplete) onComplete();
            }
        });
    }

    showCategoryParticles(category) {
        const sy = this.smoothScroll.y;
        const h = window.innerHeight;
        
        // Collect visible particles of this category
        const visibleBlocks = [];
        this.blocks.forEach(block => {
            if (block.category === category) {
                const screenY = block.y - sy;
                // Only show particles that are visible on screen
                if (screenY > -100 && screenY < h + 100) {
                    visibleBlocks.push(block);
                }
            }
        });
        
        // Animate them open with stagger
        visibleBlocks.forEach((block, index) => {
            this.showParticleOverlayAnimated(block, index * 0.06);
        });
    }

    showParticleOverlayAnimated(block, delay) {
        const overlay = this.getOrCreateOverlay(block);
        const img = overlay.querySelector('.particle-hover-image');
        const label = overlay.querySelector('.particle-hover-label');
        
        const imgData = galleryImages[block.category][block.imageIndex];
        img.src = imgData.src;
        label.textContent = imgData.label;
        
        this.updateOverlayPosition(block, overlay);
        
        // Start from particle size and animate to full size
        gsap.set(overlay, {
            opacity: 0,
            scale: 0.05,
            xPercent: -50,
            yPercent: -50
        });
        
        // Make visible (but scaled down)
        overlay.style.transform = 'none'; // Let GSAP handle transform
        overlay.classList.add('visible');
        
        // Animate open
        gsap.to(overlay, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            delay: delay,
            ease: 'power2.out',
            xPercent: -50,
            yPercent: -50
        });
    }

    hideCategoryParticles() {
        this.activeOverlays.forEach((overlay, block) => {
            if (block !== this.hoveredBlock) this.removeOverlay(block);
        });
    }

    hideAllParticleOverlays() {
        this.activeOverlays.forEach((overlay, block) => this.removeOverlay(block));
    }

    showParticleOverlayForBlock(block) {
        const overlay = this.getOrCreateOverlay(block);
        const img = overlay.querySelector('.particle-hover-image');
        const label = overlay.querySelector('.particle-hover-label');
        
        const imgData = galleryImages[block.category][block.imageIndex];
        img.src = imgData.src;
        label.textContent = imgData.label;
        
        this.updateOverlayPosition(block, overlay);
        
        // Animate open from particle size
        gsap.set(overlay, {
            opacity: 0,
            scale: 0.05,
            xPercent: -50,
            yPercent: -50
        });
        
        overlay.style.transform = 'none';
        overlay.classList.add('visible');
        
        gsap.to(overlay, {
            opacity: 1,
            scale: 1,
            duration: 0.35,
            ease: 'power2.out',
            xPercent: -50,
            yPercent: -50
        });
    }

    updateOverlayPosition(block, overlay) {
        const sy = this.smoothScroll.y;
        const screenY = block.y - sy;
        
        overlay.style.left = `${block.x}px`;
        overlay.style.top = `${screenY + block.height / 2}px`;
    }

    updateAllOverlayPositions() {
        const sy = this.smoothScroll.y;
        const h = window.innerHeight;
        // Clean up stale overlays (e.g. from fast cursor moves) – remove if block shouldn't have one
        // Don't immediate-remove overlays that are animating closed (closingOverlays)
        const toRemove = [];
        this.activeOverlays.forEach((overlay, block) => {
            if (this.closingOverlays.has(block)) return;
            const isHovered = block === this.hoveredBlock;
            const isCategory = this.hoveredCategory && block.category === this.hoveredCategory;
            const isPeek = block === this.peekBlock;
            const screenY = block.y - sy;
            const outOfView = screenY < -150 || screenY > h + 150;
            if (!isHovered && !isCategory && !isPeek) {
                toRemove.push(block);
            } else if (outOfView && !isHovered && !isPeek) {
                toRemove.push(block);
            }
        });
        toRemove.forEach(block => this.removeOverlay(block, true));
        this.activeOverlays.forEach((overlay, block) => {
            this.updateOverlayPosition(block, overlay);
        });
    }

    preloadImages() {
        Object.entries(galleryImages).forEach(([category, images]) => {
            this.loadedImages[category] = [];
            images.forEach((imgData, index) => {
                const img = new Image();
                img.src = imgData.src;
                img.label = imgData.label;
                this.loadedImages[category][index] = img;
            });
        });
    }

    setupCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'background-canvas';
        this.backgroundContainer.insertBefore(this.canvas, this.container);

        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseleave', (e) => this.handleMouseLeave(e));
        this.canvas.addEventListener('click', (e) => this.handleCanvasClick(e));
        this.canvas.addEventListener('touchend', (e) => this.handleCanvasTouchEnd(e), { passive: false });

        document.addEventListener('click', (e) => {
            if (!window.matchMedia('(hover: none)').matches || !this.hoveredBlock) return;
            if (this.canvas.contains(e.target) || document.getElementById('gallery-modal').contains(e.target)) return;
            if (e.target.closest('.particle-hover-overlay')) return;
            if (Date.now() - this.lastParticleOverlayShownAt < 450) return;
            if (this.wasAutoScrollingBeforeHover) {
                this.isAutoScrolling = true;
                if (!this.autoScrollRunning) this.startAutoScroll();
            }
            this.unhighlightCategoryInText();
            if (!this.hoveredCategory) this.removeOverlay(this.hoveredBlock);
            this.hoveredBlock = null;
            this.scheduleRandomPeek();
        });
    }

    getCanvasPoint(e) {
        const rect = this.canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : (e.changedTouches ? e.changedTouches[0].clientX : e.clientX);
        const clientY = e.touches ? e.touches[0].clientY : (e.changedTouches ? e.changedTouches[0].clientY : e.clientY);
        return {
            x: clientX - rect.left,
            y: clientY - rect.top,
        };
    }

    getBlockAtPoint(point, stickToBlock = null) {
        const sy = this.smoothScroll.y;
        const enterPadding = 15;
        const stickPadding = 35;

        for (let i = this.blocks.length - 1; i >= 0; i--) {
            const block = this.blocks[i];
            const screenY = block.y - sy;
            if (screenY < -BLOCK_H - 20 || screenY > window.innerHeight + 20) continue;
            const padding = (stickToBlock === block) ? stickPadding : enterPadding;
            if (
                point.x >= block.x - HALF_W - padding &&
                point.x <= block.x + HALF_W + padding &&
                point.y >= screenY - padding &&
                point.y <= screenY + BLOCK_H + padding
            ) {
                return block;
            }
        }
        return null;
    }

    handleMouseMove(e) {
        const point = this.getCanvasPoint(e);
        const block = this.getBlockAtPoint(point, this.hoveredBlock);
        this.canvas.style.cursor = block ? 'pointer' : 'default';

        if (block !== this.hoveredBlock) {
            // Remove previous hover overlay
            if (this.hoveredBlock && !this.hoveredCategory) {
                this.removeOverlay(this.hoveredBlock);
            }
            
            const wasLeavingBlock = !!this.hoveredBlock;
            this.hoveredBlock = block;
            
            if (block) {
                this.scheduleRandomPeek();
                // Pause auto-scroll when entering a particle from background; keep paused when moving between particles
                if (!wasLeavingBlock) {
                    const wasAutoScrolling = this.isAutoScrolling;
                    if (wasAutoScrolling) this.isAutoScrolling = false;
                    this.wasAutoScrollingBeforeHover = wasAutoScrolling;
                }

                // Highlight category in text
                this.highlightCategoryInText(block.category);

                // Show particle overlay with image
                this.showParticleOverlayForBlock(block);
            } else {
                // Resume auto-scroll when unhovering
                if (this.wasAutoScrollingBeforeHover) {
                    this.isAutoScrolling = true;
                    if (!this.autoScrollRunning) {
                        this.startAutoScroll();
                    }
                }

                // Remove text highlighting
                this.unhighlightCategoryInText();
            }
        }
    }

    highlightCategoryInText(category) {
        const event = new CustomEvent('highlightCategory', { detail: { category } });
        document.dispatchEvent(event);
    }

    unhighlightCategoryInText() {
        const event = new CustomEvent('unhighlightCategory');
        document.dispatchEvent(event);
    }

    handleMouseLeave(e) {
        if (e && e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest('#particle-overlays-container')) {
            return;
        }
        this.canvas.style.cursor = 'default';
        if (this.hoveredBlock) {
            // Resume auto-scroll
            if (this.wasAutoScrollingBeforeHover) {
                this.isAutoScrolling = true;
                if (!this.autoScrollRunning) {
                    this.startAutoScroll();
                }
            }
            // Remove text highlighting
            this.unhighlightCategoryInText();
            
            // Remove overlay if not in category hover mode
            if (!this.hoveredCategory) {
                this.removeOverlay(this.hoveredBlock);
            }
            
            this.hoveredBlock = null;
            this.scheduleRandomPeek();
        }
    }

    applyParticleTouchState(point) {
        const block = this.getBlockAtPoint(point, this.hoveredBlock);
        if (block) {
            if (this.hoveredBlock === block) {
                this.hoveredBlock = null;
                this.openGallery(block.category, block.imageIndex, block);
                return;
            }
            if (this.hoveredBlock && !this.hoveredCategory) {
                this.removeOverlay(this.hoveredBlock);
            }
            this.hoveredBlock = block;
            this.scheduleRandomPeek();
            const wasAutoScrolling = this.isAutoScrolling;
            if (wasAutoScrolling) this.isAutoScrolling = false;
            this.wasAutoScrollingBeforeHover = wasAutoScrolling;
            this.highlightCategoryInText(block.category);
            this.showParticleOverlayForBlock(block);
            this.lastParticleOverlayShownAt = Date.now();
        } else {
            if (this.hoveredBlock) {
                if (this.wasAutoScrollingBeforeHover) {
                    this.isAutoScrolling = true;
                    if (!this.autoScrollRunning) this.startAutoScroll();
                }
                this.unhighlightCategoryInText();
                if (!this.hoveredCategory) this.removeOverlay(this.hoveredBlock);
                this.hoveredBlock = null;
                this.scheduleRandomPeek();
            }
        }
    }

    handleCanvasTouchEnd(e) {
        if (!window.matchMedia('(hover: none)').matches) return;
        if (e.changedTouches.length === 0) return;
        const rect = this.canvas.getBoundingClientRect();
        const t = e.changedTouches[0];
        if (t.clientX < rect.left || t.clientX > rect.right || t.clientY < rect.top || t.clientY > rect.bottom) return;
        const point = this.getCanvasPoint(e);
        this.applyParticleTouchState(point);
        e.preventDefault();
    }

    handleCanvasClick(e) {
        const isTouchLike = window.matchMedia('(hover: none)').matches;
        if (isTouchLike) {
            return;
        }
        const block = this.getBlockAtPoint(this.getCanvasPoint(e));
        if (block) {
            this.openGallery(block.category, block.imageIndex, block);
        }
    }

    setupGalleryNav() {
        const nav = document.getElementById('gallery-nav');
        if (!nav) return;
        nav.addEventListener('click', (e) => e.stopPropagation());
        const nameLink = nav.querySelector('.gallery-nav-name');
        if (nameLink) {
            nameLink.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.closeGallery();
            });
        }
        nav.querySelectorAll('.gallery-nav-link').forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const cat = link.getAttribute('data-category');
                if (cat) this.openGallery(cat, 0, null);
            });
        });
    }

    syncGalleryNav(category) {
        const nav = document.getElementById('gallery-nav');
        if (!nav) return;
        if (category) {
            nav.hidden = false;
            nav.querySelectorAll('.gallery-nav-link').forEach((link) => {
                const cat = link.getAttribute('data-category');
                const active = cat === category;
                link.classList.toggle('is-active', active);
                if (active) link.setAttribute('aria-current', 'page');
                else link.removeAttribute('aria-current');
            });
        } else {
            nav.hidden = true;
            nav.querySelectorAll('.gallery-nav-link').forEach((link) => {
                link.classList.remove('is-active');
                link.removeAttribute('aria-current');
            });
        }
    }

    teardownGalleryInteractions(galleryModal) {
        if (this.galleryKeyHandler) {
            document.removeEventListener('keydown', this.galleryKeyHandler);
            this.galleryKeyHandler = null;
        }
        if (this.galleryClickHandler) {
            galleryModal.removeEventListener('click', this.galleryClickHandler);
            galleryModal.removeEventListener('mousedown', this.galleryMouseDownHandler);
            galleryModal.removeEventListener('mousemove', this.galleryMouseMoveHandler);
            this.galleryClickHandler = null;
            this.galleryMouseDownHandler = null;
            this.galleryMouseMoveHandler = null;
        }
        if (this.galleryDraggable) {
            this.galleryDraggable.kill();
            this.galleryDraggable = null;
        }
        if (this.galleryWheelTarget && this.galleryWheelHandler) {
            this.galleryWheelTarget.removeEventListener('wheel', this.galleryWheelHandler);
            this.galleryWheelTarget = null;
            this.galleryWheelHandler = null;
        }
        if (this.galleryDragCleanup) {
            this.galleryDragCleanup();
            this.galleryDragCleanup = null;
        }
        this.galleryGoToIndex = null;
    }

    cleanupWebProjectsContent() {
        this.webProjectsCarouselCleanups.forEach((fn) => fn());
        this.webProjectsCarouselCleanups = [];
        const grid = document.getElementById('web-projects-grid');
        if (grid) grid.innerHTML = '';
    }

    openWebProjectsGallery(galleryModal, startIndex, fromBlock) {
        this.cleanupWebProjectsContent();

        galleryModal.classList.add('gallery-modal--web-projects');
        galleryModal.classList.remove('motion');

        const layoutClassic = document.querySelector('.gallery-layout-classic');
        const layoutWeb = document.querySelector('.gallery-layout-web');
        if (layoutClassic) layoutClassic.style.display = 'none';
        if (layoutWeb) {
            layoutWeb.style.display = 'flex';
            layoutWeb.setAttribute('aria-hidden', 'false');
        }

        const grid = document.getElementById('web-projects-grid');
        const focus = getWebProjectFocusFromGalleryIndex(startIndex);

        webProjects.forEach((proj, pi) => {
            const card = document.createElement('article');
            card.className = 'web-project-card';
            card.dataset.projectIndex = String(pi);

            const titleEl = document.createElement('h3');
            titleEl.className = 'web-project-title';
            const rawTitle = proj.label.trim();
            const titleBase = rawTitle.endsWith('.') ? rawTitle.slice(0, -1).trim() : rawTitle;
            titleEl.textContent = `${titleBase.toLowerCase()}.`;

            const projMeta = projects[proj.projectId];
            const visit = document.createElement('a');
            visit.href = projMeta.link;
            visit.target = '_blank';
            visit.rel = 'noopener';
            visit.className = 'web-project-visit';
            visit.textContent = 'Visit site';

            const descEl = document.createElement('p');
            descEl.className = 'web-project-desc';
            descEl.textContent = proj.description;

            const carousel = document.createElement('div');
            carousel.className = 'web-project-carousel';
            carousel.dataset.currentSlide = '0';

            const viewport = document.createElement('div');
            viewport.className = 'web-carousel-viewport';

            const stack = document.createElement('div');
            stack.className = 'web-carousel-stack';

            proj.slides.forEach((src) => {
                const slide = document.createElement('div');
                slide.className = 'web-carousel-slide';
                slide.setAttribute('aria-hidden', 'true');
                const img = document.createElement('img');
                img.src = src;
                img.alt = proj.label;
                img.draggable = false;
                img.addEventListener('dragstart', (e) => e.preventDefault());
                slide.appendChild(img);
                stack.appendChild(slide);
            });

            viewport.appendChild(stack);
            viewport.setAttribute('role', 'button');
            viewport.setAttribute('tabindex', '0');
            viewport.setAttribute(
                'aria-label',
                `${proj.label} — click image for next slide`
            );

            carousel.appendChild(viewport);

            const copyCol = document.createElement('div');
            copyCol.className = 'web-project-copy';
            copyCol.appendChild(titleEl);
            copyCol.appendChild(descEl);
            copyCol.appendChild(visit);
            card.appendChild(copyCol);
            card.appendChild(carousel);

            grid.appendChild(card);

            const nSlides = proj.slides.length;
            let slideIndex = pi === focus.projectIndex ? focus.slideIndex : 0;
            slideIndex = ((slideIndex % nSlides) + nSlides) % nSlides;
            carousel.dataset.currentSlide = String(slideIndex);

            const slides = stack.querySelectorAll('.web-carousel-slide');
            const applySlide = () => {
                carousel.dataset.currentSlide = String(slideIndex);
                slides.forEach((slide, i) => {
                    const on = i === slideIndex;
                    slide.classList.toggle('is-active', on);
                    slide.setAttribute('aria-hidden', on ? 'false' : 'true');
                });
            };

            let lastAdvanceAt = 0;
            const goNext = () => {
                const now = Date.now();
                if (now - lastAdvanceAt < 200) return;
                lastAdvanceAt = now;
                slideIndex = (slideIndex + 1 + nSlides) % nSlides;
                applySlide();
            };

            const onViewportClick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                goNext();
            };
            viewport.addEventListener('click', onViewportClick);

            const onViewportKey = (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    goNext();
                }
            };
            viewport.addEventListener('keydown', onViewportKey);

            let touchStartX = 0;
            let touchMoved = false;
            const onTouchStart = (e) => {
                touchStartX = e.touches[0].clientX;
                touchMoved = false;
            };
            const onTouchMove = (e) => {
                if (touchMoved) return;
                const dx = e.touches[0].clientX - touchStartX;
                if (Math.abs(dx) > 40) touchMoved = true;
            };
            const onTouchEnd = (e) => {
                if (touchMoved) {
                    const dx = e.changedTouches[0].clientX - touchStartX;
                    if (Math.abs(dx) > 48) {
                        slideIndex = (slideIndex + (dx < 0 ? 1 : -1) + nSlides) % nSlides;
                        applySlide();
                    }
                    touchMoved = false;
                    return;
                }
                goNext();
                touchMoved = false;
            };
            viewport.addEventListener('touchstart', onTouchStart, { passive: true });
            viewport.addEventListener('touchmove', onTouchMove, { passive: true });
            viewport.addEventListener('touchend', onTouchEnd);

            this.webProjectsCarouselCleanups.push(() => {
                viewport.removeEventListener('click', onViewportClick);
                viewport.removeEventListener('keydown', onViewportKey);
                viewport.removeEventListener('touchstart', onTouchStart);
                viewport.removeEventListener('touchmove', onTouchMove);
                viewport.removeEventListener('touchend', onTouchEnd);
            });

            applySlide();
        });

        const clickHandler = (e) => {
            if (e.target.closest('.gallery-close-btn')) {
                this.closeGallery();
                return;
            }
            if (e.target.closest('#gallery-nav')) return;
            if (e.target.closest('.web-project-card')) return;
            this.closeGallery();
        };
        galleryModal.addEventListener('click', clickHandler);
        this.galleryClickHandler = clickHandler;

        document.body.classList.add('gallery-open');
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        galleryModal.style.display = 'flex';
        galleryModal.style.opacity = '1';
        galleryModal.style.visibility = 'visible';

        gsap.set('.web-project-card', { opacity: 0, y: 12 });
        gsap.to('.web-project-card', {
            opacity: 1,
            y: 0,
            duration: 0.95,
            stagger: 0.14,
            ease: 'power2.out',
            delay: 0.22,
        });

        const focusedCard = grid.querySelector(`.web-project-card[data-project-index="${focus.projectIndex}"]`);
        if (focusedCard) {
            requestAnimationFrame(() => {
                focusedCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            });
        }

        if (fromBlock) {
            const grad = document.createElement('div');
            grad.className = 'gallery-open-gradient';
            grad.style.cssText =
                'position:fixed;inset:0;z-index:1005;pointer-events:none;background:radial-gradient(ellipse at center, rgba(255,255,255,0.5) 0%, transparent 60%);';
            document.body.appendChild(grad);
            galleryModal.style.opacity = '0';
            gsap.to(galleryModal, { opacity: 1, duration: 0.65, ease: 'power2.out' });
            gsap.to(grad, { opacity: 0, duration: 0.55, delay: 0.35, onComplete: () => grad.remove() });
        } else {
            gsap.fromTo(galleryModal, { opacity: 0 }, { opacity: 1, duration: 0.65, ease: 'power2.out' });
        }
    }

    openGallery(category, startIndex = 0, fromBlock = null) {
        if (category !== 'web') {
            const imgs = galleryImages[category];
            if (!imgs || !imgs.length) return;
        }

        const wasGalleryOpen = document.body.classList.contains('gallery-open');
        this.updateGalleryHistory(category, wasGalleryOpen);

        this.activeGallery = category;
        this.hoveredCategory = null;
        this.hideAllParticleOverlays();

        const galleryModal = document.getElementById('gallery-modal');
        this.teardownGalleryInteractions(galleryModal);
        this.syncGalleryNav(category);
        if (category === 'web') {
            this.openWebProjectsGallery(galleryModal, startIndex, fromBlock);
            return;
        }

        this.cleanupWebProjectsContent();
        galleryModal.classList.remove('gallery-modal--web-projects');
        const layoutClassic = document.querySelector('.gallery-layout-classic');
        const layoutWeb = document.querySelector('.gallery-layout-web');
        if (layoutClassic) layoutClassic.style.display = '';
        if (layoutWeb) {
            layoutWeb.style.display = 'none';
            layoutWeb.setAttribute('aria-hidden', 'true');
        }

        const centerWrap = document.querySelector('.gallery-center-image');
        const thumbsContainer = document.querySelector('.gallery-thumbs');
        const titleEl = document.querySelector('.gallery-title');
        const descEl = document.querySelector('.gallery-description');
        const visitBtn = document.getElementById('visit-site-btn');

        galleryModal.classList.toggle('motion', category === 'motion');
        thumbsContainer.innerHTML = '';
        visitBtn.style.display = 'none';
        visitBtn.href = '#';
        visitBtn.textContent = 'Visit site';

        const images = galleryImages[category];
        const n = images.length;
        if (!n) return;

        const idx = ((startIndex % n) + n) % n;

        images.forEach((imgData, i) => {
            const thumb = document.createElement('div');
            thumb.className = 'gallery-thumb' + (i === idx ? ' active' : '');
            thumb.dataset.index = i;
            const img = document.createElement('img');
            img.src = imgData.src;
            img.alt = imgData.label;
            img.draggable = false;
            img.addEventListener('dragstart', (e) => e.preventDefault());
            thumb.appendChild(img);
            thumbsContainer.appendChild(thumb);
        });

        const updateView = (index) => {
            const i = ((index % n) + n) % n;
            const imgData = images[i];
            centerWrap.innerHTML = '';
            const centerImg = document.createElement('img');
            centerImg.src = imgData.src;
            centerImg.alt = imgData.label;
            centerImg.draggable = false;
            centerImg.addEventListener('dragstart', (e) => e.preventDefault());
            centerWrap.appendChild(centerImg);

            titleEl.textContent = imgData.label;
            descEl.textContent = imgData.description || '';
            descEl.style.display = imgData.description ? '' : 'none';

            if (visitBtn && imgData.projectId && projects[imgData.projectId]) {
                const proj = projects[imgData.projectId];
                visitBtn.href = proj.link;
                visitBtn.textContent = proj.label || 'Visit site';
                visitBtn.style.display = 'inline-flex';
            } else {
                visitBtn.style.display = 'none';
            }

            thumbsContainer.querySelectorAll('.gallery-thumb').forEach((t, j) => {
                t.classList.toggle('active', j === i);
            });
        };

        let currentIndex = idx;

        const goToIndex = (index) => {
            currentIndex = ((index % n) + n) % n;
            updateView(currentIndex);
        };

        thumbsContainer.addEventListener('click', (e) => {
            const thumb = e.target.closest('.gallery-thumb');
            if (thumb) {
                const i = parseInt(thumb.dataset.index, 10);
                if (!isNaN(i)) goToIndex(i);
            }
        });

        let dragStartX = 0;
        let dragged = false;
        const dragThreshold = 50;
        const onTouchStart = (e) => {
            dragStartX = e.touches[0].clientX;
            dragged = false;
        };
        const onTouchMove = (e) => {
            if (dragged) return;
            const delta = e.touches[0].clientX - dragStartX;
            if (Math.abs(delta) > dragThreshold) {
                dragged = true;
                goToIndex(currentIndex + (delta < 0 ? 1 : -1));
            }
        };
        const onTouchEnd = () => { dragged = false; };
        const galleryMain = document.querySelector('.gallery-main');
        galleryMain.addEventListener('touchstart', onTouchStart, { passive: true });
        galleryMain.addEventListener('touchmove', onTouchMove, { passive: true });
        galleryMain.addEventListener('touchend', onTouchEnd);
        this.galleryDragCleanup = () => {
            galleryMain.removeEventListener('touchstart', onTouchStart);
            galleryMain.removeEventListener('touchmove', onTouchMove);
            galleryMain.removeEventListener('touchend', onTouchEnd);
        };

        let wheelTimeout = null;
        const wheelHandler = (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (wheelTimeout) return;
            const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
            if (Math.abs(delta) > 15) {
                goToIndex(currentIndex + (e.deltaY > 0 || e.deltaX > 0 ? 1 : -1));
                wheelTimeout = setTimeout(() => { wheelTimeout = null; }, 120);
            }
        };
        galleryMain.addEventListener('wheel', wheelHandler, { passive: false });
        this.galleryWheelTarget = galleryMain;
        this.galleryWheelHandler = wheelHandler;

        const keyHandler = (e) => {
            if (!this.activeGallery) return;
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); goToIndex(currentIndex - 1); }
            else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); goToIndex(currentIndex + 1); }
        };
        document.addEventListener('keydown', keyHandler);
        this.galleryKeyHandler = keyHandler;
        this.galleryGoToIndex = goToIndex;

        const clickHandler = (e) => {
            if (e.target.closest('.gallery-close-btn')) {
                this.closeGallery();
                return;
            }
            if (e.target.closest('#gallery-nav')) return;
            if (e.target.closest('.gallery-thumbs') || e.target.closest('.visit-site-btn')) return;
            if (e.target.closest('.gallery-header') && e.target.tagName !== 'A') return;
            if (e.target.closest('.gallery-center-image img')) return;
            this.closeGallery();
        };
        galleryModal.addEventListener('click', clickHandler);
        this.galleryClickHandler = clickHandler;

        document.body.classList.add('gallery-open');
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        galleryModal.style.display = 'flex';
        galleryModal.style.opacity = '1';
        galleryModal.style.visibility = 'visible';

        updateView(idx);
        if (fromBlock) {
            const grad = document.createElement('div');
            grad.className = 'gallery-open-gradient';
            grad.style.cssText = 'position:fixed;inset:0;z-index:1005;pointer-events:none;background:radial-gradient(ellipse at center, rgba(255,255,255,0.5) 0%, transparent 60%);';
            document.body.appendChild(grad);
            galleryModal.style.opacity = '0';
            gsap.to(galleryModal, { opacity: 1, duration: 0.65, ease: 'power2.out' });
            gsap.to(grad, { opacity: 0, duration: 0.55, delay: 0.35, onComplete: () => grad.remove() });
        } else {
            gsap.fromTo(galleryModal, { opacity: 0 }, { opacity: 1, duration: 0.65, ease: 'power2.out' });
        }
    }

    closeGallery(fromPopstate = false) {
        if (!fromPopstate && this.pushedStateForGallery) {
            this.pushedStateForGallery = false;
            history.back();
            return;
        }

        const galleryModal = document.getElementById('gallery-modal');
        this.teardownGalleryInteractions(galleryModal);

        this.hoveredBlock = null;
        this.hoveredCategory = null;
        this.unhighlightCategoryInText();
        this.hideAllParticleOverlays();
        document.dispatchEvent(new CustomEvent('galleryClosed'));

        document.body.classList.remove('gallery-open');
        gsap.to(galleryModal, {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
            onComplete: () => {
                galleryModal.style.display = 'none';
                galleryModal.style.opacity = '';
                galleryModal.style.visibility = '';
                document.documentElement.style.overflow = '';
                document.body.style.overflow = '';
                this.activeGallery = null;
                this.cleanupWebProjectsContent();
                galleryModal.classList.remove('gallery-modal--web-projects');
                const layoutClassic = document.querySelector('.gallery-layout-classic');
                const layoutWeb = document.querySelector('.gallery-layout-web');
                if (layoutClassic) layoutClassic.style.display = '';
                if (layoutWeb) {
                    layoutWeb.style.display = 'none';
                    layoutWeb.setAttribute('aria-hidden', 'true');
                }
                this.isAutoScrolling = true;
                if (!this.autoScrollRunning) {
                    this.startAutoScroll();
                }
                if (!fromPopstate && categoryFromLocationHash()) {
                    history.replaceState(null, '', window.location.pathname + window.location.search);
                }
                this.pushedStateForGallery = false;
                this.syncGalleryNav(null);
            }
        });
    }

    resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const w = window.innerWidth;
        const h = window.innerHeight;
        this.canvas.width = w * dpr;
        this.canvas.height = h * dpr;
        this.canvas.style.width = `${w}px`;
        this.canvas.style.height = `${h}px`;
        this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        this.draw();
    }

    getUsedImageSrcs(expandRange = true) {
        // Get image sources from blocks that could be visible at the same time
        // Use scrollY (not smoothScroll) for accuracy
        const scrollY = window.scrollY;
        const h = window.innerHeight;
        const visibleSrcs = new Set();

        // Wide range: current view + area above and below where blocks can appear together
        const viewTop = expandRange ? scrollY - h : scrollY - 100;
        const viewBottom = expandRange ? scrollY + h * 3 : scrollY + h + 100;

        for (const block of this.blocks) {
            if (block.y >= viewTop && block.y <= viewBottom) {
                visibleSrcs.add(block.imageSrc);
            }
        }
        return visibleSrcs;
    }

    isMobile() {
        return window.innerWidth <= this.mobileMaxWidth;
    }

    getBlockCountRange() {
        if (this.isMobile()) {
            return { min: 14, max: 20 };
        }
        return { min: this.minBlocks, max: this.maxBlocks };
    }

    createBlockData(isInitial = false) {
        // Assign a weighted random category to this particle (motion a bit more often, mixedmedia more now)
        const categoryWeights = {
            branding: 3,
            web: 3,
            motion: 2.5,
            mixedmedia: 3,
            pottery: 2
        };
        const totalWeight = Object.values(categoryWeights).reduce((a, b) => a + b, 0);

        // Get image srcs already in use (wide range so no duplicates when scrolling)
        const usedSrcs = this.getUsedImageSrcs(true);

        let attempts = 0;
        let category, imageIndex, imgData;

        do {
            let random = Math.random() * totalWeight;
            category = 'branding';
            for (const [cat, weight] of Object.entries(categoryWeights)) {
                random -= weight;
                if (random <= 0) {
                    category = cat;
                    break;
                }
            }
            const categoryImgs = galleryImages[category];
            imageIndex = Math.floor(Math.random() * categoryImgs.length);
            imgData = categoryImgs[imageIndex];
            attempts++;
        } while (usedSrcs.has(imgData.src) && attempts < 12);

        const edgeMargin = Math.min(90, window.innerWidth * 0.08);
        const usableWidth = window.innerWidth - edgeMargin * 2;
        const block = {
            x: edgeMargin + Math.random() * usableWidth,
            y: isInitial ? Math.random() * (window.innerHeight * 3.5) : 0,
            color: categoryColors[category],
            width: HALF_W * 2,
            height: BLOCK_H,
            category: category,
            imageIndex: imageIndex,
            imageSrc: imgData.src,
            imageLabel: imgData.label
        };
        if (!isInitial) {
            const baseY = window.scrollY + window.innerHeight * 0.8;
            const bandHeight = window.innerHeight * 1.2;
            // More even spread: use sub-bands so blocks don't cluster
            const subBands = 4;
            const subBandHeight = bandHeight / subBands;
            const subBand = Math.floor(Math.random() * subBands);
            block.y = baseY + subBand * subBandHeight + Math.random() * subBandHeight;
        }
        return block;
    }

    init() {
        const initialHeight = window.innerHeight * 2;
        this.container.style.height = `${initialHeight}px`;
        document.body.style.height = `${initialHeight}px`;

        const range = this.getBlockCountRange();
        const initialCount = Math.ceil((range.min + range.max) / 2) + (this.isMobile() ? 2 : 5);
        const initialHeightRange = window.innerHeight * 3.5;
        for (let i = 0; i < initialCount; i++) {
            const block = this.createBlockData(true);
            // More even initial spread: distribute Y across the range with small jitter
            const t = initialCount <= 1 ? 0.5 : i / (initialCount - 1);
            const jitter = (Math.random() - 0.5) * (initialHeightRange * 0.08);
            block.y = t * initialHeightRange * 0.92 + jitter;
            this.blocks.push(block);
        }

        this.smoothScroll.y = window.scrollY;
        this.lastScrollY = window.scrollY;

        window.addEventListener(
            'scroll',
            () => {
                if (!this.rafPending) {
                    this.rafPending = true;
                    requestAnimationFrame(() => {
                        this.handleScroll();
                        this.rafPending = false;
                    });
                }
            },
            { passive: true }
        );

        // Space bar toggles auto-scroll (not when gallery is open)
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && !this.activeGallery) {
                e.preventDefault();
                this.toggleAutoScroll();
            }
        });

        // Sun button stops/starts scroll when clicked
        const autoScrollBtn = document.getElementById('auto-scroll-btn');
        if (autoScrollBtn) {
            autoScrollBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (!this.activeGallery) this.toggleAutoScroll();
            });
        }

        // Start with auto-scroll on
        this.isAutoScrolling = true;
        this.startAutoScroll();

        this.startDrawLoop();
    }

    toggleAutoScroll() {
        this.isAutoScrolling = !this.isAutoScrolling;
        if (this.isAutoScrolling && !this.autoScrollRunning) {
            this.startAutoScroll();
        }
    }

    startDrawLoop() {
        const draw = () => {
            this.draw();
            requestAnimationFrame(draw);
        };
        requestAnimationFrame(draw);
    }

    draw() {
        const ctx = this.ctx;
        const w = window.innerWidth;
        const h = window.innerHeight;
        const sy = this.smoothScroll.y;

        ctx.clearRect(0, 0, w, h);

        this.updateAllOverlayPositions();

        // When category is hovered, show overlays for blocks that enter viewport during scroll
        if (this.hoveredCategory) {
            this.blocks.forEach((block) => {
                if (block.category === this.hoveredCategory && !this.activeOverlays.has(block)) {
                    const screenY = block.y - sy;
                    if (screenY > -100 && screenY < h + 100) {
                        this.showParticleOverlayAnimated(block, 0);
                    }
                }
            });
        }

        this.blocks.forEach((block) => {
            const screenY = block.y - sy;
            if (screenY > h + 50 || screenY < -block.height - 50) return;

            // Skip drawing blocks that have active overlays
            if (this.activeOverlays.has(block)) return;

            ctx.save();
            ctx.translate(block.x, screenY + block.height / 2);
            ctx.translate(-block.width / 2, -block.height / 2);
            ctx.fillStyle = block.color;
            ctx.fillRect(0, 0, block.width, block.height);
            ctx.restore();
        });
    }

    startAutoScroll() {
        this.autoScrollRunning = true;
        const scroll = () => {
            if (!this.isAutoScrolling || this.activeGallery) {
                this.autoScrollRunning = false;
                return;
            }
            this.autoScrollAccum += this.autoScrollSpeed;
            if (this.autoScrollAccum >= 1) {
                const step = Math.floor(this.autoScrollAccum);
                window.scrollBy(0, step);
                this.autoScrollAccum -= step;
            }
            requestAnimationFrame(scroll);
        };
        requestAnimationFrame(scroll);
    }

    addBlock() {
        const block = this.createBlockData(false);
        const bandStart = window.scrollY + window.innerHeight * 1.2;
        const bandHeight = window.innerHeight * 1.0;
        block.y = bandStart + Math.random() * bandHeight;
        this.blocks.push(block);
    }

    handleScroll() {
        const currentScrollY = window.scrollY;

        this.smoothScrollTo(currentScrollY);

        // Sun icon tracks scroll - rotates when scrolling
        if (this.sunIcon) {
            const scrollDelta = currentScrollY - this.lastScrollY;
            if (scrollDelta !== 0) {
                this.rotationDegrees = (this.rotationDegrees + scrollDelta * 0.3) % 360;
                this.sunIcon.style.transform = `rotate(${this.rotationDegrees}deg)`;
            }
        }

        // Update overlay positions during scroll
        this.updateAllOverlayPositions();

        // Count blocks in active region only (view + 2 viewports ahead) – ignore scrolled-past blocks
        const h = window.innerHeight;
        const activeTop = currentScrollY - 50;
        const activeBottom = currentScrollY + h * 2;
        const activeCount = this.blocks.filter(
            (b) => b.y >= activeTop && b.y <= activeBottom
        ).length;

        // Add blocks to maintain density in active region (no cap on total – we don't cull)
        const range = this.getBlockCountRange();
        const scrollStep = this.isMobile() ? h * 0.35 : h * 0.4;
        if (currentScrollY - this.lastBlockCreationScroll > scrollStep) {
            const targetCount = (range.min + range.max) / 2;
            const needed = Math.max(0, targetCount - activeCount);
            const maxPerStep = this.isMobile() ? 4 : 5;
            const toAdd = Math.min(Math.max(needed, activeCount < range.min ? 1 : 0), maxPerStep);
            for (let i = 0; i < toAdd; i++) this.addBlock();
            this.lastBlockCreationScroll = currentScrollY;
        }

        const distanceToBottom =
            document.documentElement.scrollHeight - (currentScrollY + window.innerHeight);
        if (distanceToBottom < this.growthThreshold) {
            const currentHeight = this.container.offsetHeight;
            this.container.style.height = `${currentHeight + window.innerHeight}px`;
            document.body.style.height = `${currentHeight + window.innerHeight}px`;
        }

        this.lastScrollY = currentScrollY;
    }
}

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
