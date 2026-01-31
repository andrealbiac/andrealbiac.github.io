// Category colors: purple, orange, pink, light blue, blue, soft brown
const categoryColors = {
    branding: '#BD9EFF',    // purple
    web: '#FF9D47',         // orange
    motion: '#FB7CA6',      // pink
    mixedmedia: '#9ACBFF',  // light blue
    pottery: '#A4754C'      // soft brown
};

const DEFAULT_BG = '#E8E4DC';

const HALF_W = 7;
const BLOCK_H = 18;

// Projects with site links (assign projectId to images that link to these)
const projects = {
    project1: { link: 'https://example.com', name: 'Project 1' },
    project2: { link: 'https://example.com', name: 'Project 2' }
};

// Gallery images: src, label, description (optional), projectId (optional)
const galleryImages = {
    branding: [
        { src: 'img/brand-1.png', label: 'Brand Identity 01', projectId: 'project1' },
        { src: 'img/brand-2.png', label: 'Brand Identity 02' },
        { src: 'img/brand-3.png', label: 'Brand Identity 03' },
        { src: 'img/brand-4.gif', label: 'Animated Logo' }
    ],
    web: [
        { src: 'img/web-1.png', label: 'Web Project 01', projectId: 'project1' },
        { src: 'img/web-2.png', label: 'Web Project 02', projectId: 'project1' },
        { src: 'img/web-3.png', label: 'Web Project 03', projectId: 'project1' },
        { src: 'img/web-4.png', label: 'Web Project 04', projectId: 'project1' },
        { src: 'img/web-5.png', label: 'Web Project 05', projectId: 'project1' },
        { src: 'img/web-6.png', label: 'Web Project 06', projectId: 'project1' },
        { src: 'img/web-7.png', label: 'Web Project 07', projectId: 'project1' },
        { src: 'img/web-8.png', label: 'Web Project 08', projectId: 'project1' },
        { src: 'img/web-9.png', label: 'Web Project 09', projectId: 'project1' }
    ],
    motion: [
        { src: 'img/motion-1.gif', label: 'Motion Graphics 01' },
        { src: 'img/motion-2.gif', label: 'Motion Graphics 02' }
    ],
    mixedmedia: [
        { src: 'img/sun-1.gif', label: 'Mixed Media 01' },
        { src: 'img/sun-2.gif', label: 'Mixed Media 02' },
        { src: 'img/sun-3.gif', label: 'Mixed Media 03' }
    ],
    pottery: [
        { src: 'img/chair-1.jpeg', label: 'Pottery Chair 01' },
        { src: 'img/chair-2.jpeg', label: 'Pottery Chair 02' },
        { src: 'img/chair-3.jpeg', label: 'Pottery Chair 03' },
        { src: 'img/chair-4.jpeg', label: 'Pottery Chair 04' },
        { src: 'img/chair-5.jpeg', label: 'Pottery Chair 05' },
        { src: 'img/chair-6.jpeg', label: 'Pottery Chair 06' }
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
        this.lastScrollY = 0;
        this.lastBlockCreationScroll = 0;
        this.isAutoScrolling = false;
        this.autoScrollSpeed = 0.8;
        this.autoScrollAccum = 0;
        this.sunIcon = document.querySelector('.sun-icon');
        this.rotationDegrees = 0;
        this.growthThreshold = window.innerHeight * 0.8;
        this.scrollCue = document.querySelector('.scroll-cue');
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

        // Particle overlays container for animated GIFs
        this.overlaysContainer = document.getElementById('particle-overlays-container');
        this.activeOverlays = new Map(); // Map of block -> overlay element
        this.hoveredCategory = null; // Category being hovered in text
        this.peekBlock = null;
        this.peekTimeoutId = null;

        this.setupCanvas();
        this.setupCategoryHoverListeners();
        this.init();
        this.scheduleRandomPeek();
    }

    scheduleRandomPeek() {
        if (this.peekTimeoutId) clearTimeout(this.peekTimeoutId);
        const delay = 8000 + Math.random() * 6000;
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
        setTimeout(() => {
            if (this.peekBlock === block && block !== this.hoveredBlock && !this.hoveredCategory) {
                this.removeOverlayAnimated(block);
            }
            this.peekBlock = null;
            this.scheduleRandomPeek();
        }, 2000);
    }

    setupCategoryHoverListeners() {
        // Listen for category hover events from main.js
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
            this.activeOverlays.set(block, overlay);
        }
        return this.activeOverlays.get(block);
    }

    removeOverlay(block, immediate = false) {
        const overlay = this.activeOverlays.get(block);
        if (!overlay) return;
        if (immediate) {
            gsap.killTweensOf(overlay);
            if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
            this.activeOverlays.delete(block);
            return;
        }
        gsap.to(overlay, {
            opacity: 0,
            scale: 0.05,
            duration: 0.25,
            ease: 'power2.in',
            xPercent: -50,
            yPercent: -50,
            onComplete: () => {
                if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
                this.activeOverlays.delete(block);
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
        const toRemove = [];
        this.activeOverlays.forEach((overlay, block) => {
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
        this.canvas.addEventListener('mouseleave', () => this.handleMouseLeave());
        this.canvas.addEventListener('click', (e) => this.handleCanvasClick(e));
    }

    getCanvasPoint(e) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
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

    handleMouseLeave() {
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
        }
    }

    handleCanvasClick(e) {
        const block = this.getBlockAtPoint(this.getCanvasPoint(e));
        if (block) {
            this.openGallery(block.category, block.imageIndex, block);
        }
    }

    openGallery(category, startIndex = 0, fromBlock = null) {
        this.activeGallery = category;
        this.hoveredCategory = null;
        this.hideAllParticleOverlays();

        const galleryModal = document.getElementById('gallery-modal');
        const centerWrap = document.querySelector('.gallery-center-image');
        const thumbsContainer = document.querySelector('.gallery-thumbs');
        const titleEl = document.querySelector('.gallery-title');
        const descEl = document.querySelector('.gallery-description');
        const visitBtn = document.getElementById('visit-site-btn');

        galleryModal.classList.toggle('motion', category === 'motion');
        thumbsContainer.innerHTML = '';
        visitBtn.style.display = 'none';
        visitBtn.href = '#';

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
                visitBtn.href = projects[imgData.projectId].link;
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
        galleryModal.addEventListener('wheel', wheelHandler, { passive: false });
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
            gsap.to(galleryModal, { opacity: 1, duration: 0.35, ease: 'power2.out' });
            gsap.to(grad, { opacity: 0, duration: 0.4, delay: 0.2, onComplete: () => grad.remove() });
        } else {
            gsap.fromTo(galleryModal, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
        }
    }

    closeGallery() {
        const galleryModal = document.getElementById('gallery-modal');
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
        if (galleryModal && this.galleryWheelHandler) {
            galleryModal.removeEventListener('wheel', this.galleryWheelHandler);
            this.galleryWheelHandler = null;
        }
        if (this.galleryDragCleanup) {
            this.galleryDragCleanup();
            this.galleryDragCleanup = null;
        }
        this.galleryGoToIndex = null;

        document.body.classList.remove('gallery-open');
        gsap.to(galleryModal, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out',
            onComplete: () => {
                galleryModal.style.display = 'none';
                galleryModal.style.opacity = '';
                galleryModal.style.visibility = '';
                document.documentElement.style.overflow = '';
                document.body.style.overflow = '';
                this.activeGallery = null;

                if (this.isAutoScrolling && !this.autoScrollRunning) {
                    this.startAutoScroll();
                }
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

    createBlockData(isInitial = false) {
        // Assign a weighted random category to this particle
        const categoryWeights = {
            branding: 3,
            web: 3,
            motion: 1,
            mixedmedia: 2,
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
            block.y = baseY + Math.random() * bandHeight;
        }
        return block;
    }

    init() {
        const initialHeight = window.innerHeight * 2;
        this.container.style.height = `${initialHeight}px`;
        document.body.style.height = `${initialHeight}px`;

        const initialCount = Math.ceil((this.minBlocks + this.maxBlocks) / 2) + 5;
        for (let i = 0; i < initialCount; i++) {
            this.blocks.push(this.createBlockData(true));
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
        block.y = window.scrollY + window.innerHeight * 1.5 + Math.random() * window.innerHeight;
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
        if (currentScrollY - this.lastBlockCreationScroll > h * 0.4) {
            const targetCount = (this.minBlocks + this.maxBlocks) / 2;
            const needed = Math.max(0, targetCount - activeCount);
            const toAdd = Math.min(Math.max(needed, activeCount < this.minBlocks ? 1 : 0), 5);
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

window.addEventListener('load', () => {
    const manager = new BackgroundManager();
    // Store reference for access from main.js
    document.getElementById('background-container').backgroundManager = manager;
    window.backgroundManager = manager;
});
