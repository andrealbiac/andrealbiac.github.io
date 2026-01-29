// Color palette for the blocks
const colors = [
    '#9ACBFF',
    '#E6E4DE',
    '#BD9EFF',
    '#A4754C',
    '#DAE8FF',
    '#FB7CA6',
    '#FF9D47',
    '#FFC0F1',
    '#435DAE',
    '#DFC3A4',
];

class ColorBlock {
    constructor() {
        this.element = document.createElement('div');
        this.element.className = 'color-block';
        this.reset();
    }

    reset() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * (window.innerHeight * 3);
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.element.style.backgroundColor = this.color;
    }

    update(scrollDelta) {
        this.y = this.y - scrollDelta;
        this.element.style.top = `${this.y}px`;
    }
}

class BackgroundManager {
    constructor() {
        this.container = document.getElementById('scrollable-container');
        this.backgroundContainer = document.getElementById('background-container');
        // Pick a random color from the palette as the initial background
        const randomInitialColor = colors[Math.floor(Math.random() * colors.length)];
        this.backgroundContainer.style.backgroundColor = randomInitialColor;
        document.documentElement.style.setProperty('--page-bg-color', randomInitialColor);
        this.blocks = [];
        // Fewer blocks so they appear more spaced vertically
        this.maxBlocks = 12;
        this.lastScrollY = 0;
        this.totalScrollY = 0;
        this.blocksCreated = 0;
        this.lastBlockCreationScroll = 0;
        this.highestBlockY = window.innerHeight * 3; // Initial blocks go up to 3 * viewport height
        this.currentBackgroundColor = randomInitialColor;
        this.originalBackgroundColor = randomInitialColor;
        this.isAutoScrolling = false;
        this.autoScrollSpeed = 2;
        this.sunIcon = document.querySelector('.sun-icon');
        this.rotationDegrees = 0;
        this.growthThreshold = window.innerHeight * 0.8;
        // Cache DOM elements and optimize scroll handling
        this.scrollCue = document.querySelector('.scroll-cue');
        this.rafPending = false;
        this.init();
    }

    init() {
        // Set initial scroll height to enable smooth first scroll
        const initialHeight = window.innerHeight * 2;
        this.container.style.height = `${initialHeight}px`;
        document.body.style.height = `${initialHeight}px`;
        
        // Create initial blocks
        for (let i = 0; i < this.maxBlocks; i++) {
            this.addBlock(true);
        }

        // Check initial block positions
        this.blocks.forEach(block => {
            if (block.y <= 0) {
                this.backgroundContainer.style.backgroundColor = block.color;
                this.currentBackgroundColor = block.color;
            }
        });

        // Use requestAnimationFrame to throttle scroll handling for smooth performance
        window.addEventListener('scroll', () => {
            if (!this.rafPending) {
                this.rafPending = true;
                requestAnimationFrame(() => {
                    this.handleScroll();
                    this.rafPending = false;
                });
            }
        }, { passive: true });
        
        // Add auto-scroll button functionality
        const autoScrollBtn = document.getElementById('auto-scroll-btn');
        autoScrollBtn.addEventListener('click', () => {
            this.isAutoScrolling = !this.isAutoScrolling;
            
            if (this.isAutoScrolling) {
                this.startAutoScroll();
                autoScrollBtn.classList.add('active');
            } else {
                autoScrollBtn.classList.remove('active');
                this.sunIcon.style.transform = `rotate(${this.rotationDegrees}deg)`;
            }
        });
    }

    startAutoScroll() {
        const scroll = () => {
            if (!this.isAutoScrolling) return;
            window.scrollBy(0, this.autoScrollSpeed);
            requestAnimationFrame(scroll);
        };
        requestAnimationFrame(scroll);
    }

    addBlock(isInitial = false) {
        const block = new ColorBlock();
        if (!isInitial) {
            // Position new blocks ahead of current scroll position to avoid overlap
            // Place them 1-2 viewport heights ahead of current scroll
            const baseY = window.scrollY + window.innerHeight * 1.5;
            // Add some random variation, but ensure we're ahead of existing blocks
            const newY = baseY + Math.random() * window.innerHeight;
            block.y = newY;
            block.element.style.top = `${newY}px`;
            // Update the highest block creation position for reference
            this.highestBlockY = Math.max(this.highestBlockY, newY);
        } else {
            // For initial blocks, track the highest creation position
            this.highestBlockY = Math.max(this.highestBlockY, block.y);
        }
        this.container.appendChild(block.element);
        this.blocks.push(block);
        this.blocksCreated++;
    }

    handleScroll() {
        const currentScrollY = window.scrollY;
        const scrollDelta = currentScrollY - this.lastScrollY;
        
        // Hide scroll cue when user starts scrolling
        if (this.scrollCue) {
            if (currentScrollY > 50) {
                this.scrollCue.classList.add('hidden');
            } else {
                this.scrollCue.classList.remove('hidden');
            }
        }
        
        // Update total scroll amount
        this.totalScrollY += scrollDelta;
        
        // Update sun rotation based on scroll
        if (!this.isAutoScrolling && this.sunIcon) {
            this.rotationDegrees = (this.rotationDegrees + scrollDelta * 0.1) % 360;
            this.sunIcon.style.transform = `rotate(${this.rotationDegrees}deg)`;
        }
        
        // Reset background color when at the top
        if (currentScrollY <= 0) {
            this.backgroundContainer.style.backgroundColor = this.originalBackgroundColor;
            this.currentBackgroundColor = this.originalBackgroundColor;
            document.documentElement.style.setProperty('--page-bg-color', this.originalBackgroundColor);
        }
        
        // Sort blocks by y position to ensure we process them in order
        // Only skip sorting if scrollDelta is very small to optimize performance
        if (Math.abs(scrollDelta) > 0.5) {
            this.blocks.sort((a, b) => b.y - a.y);
        }
        
        // Update block positions based on total scroll and check for background color change
        this.blocks.forEach(block => {
            block.update(scrollDelta);
            this.updateBackgroundColor(block);
        });

        // Add new blocks when scrolling down to maintain the same density as initial screen
        if (scrollDelta > 0) {
            // Initial blocks (12) are spread across 3 viewport heights, so add ~4 blocks per viewport
            const blocksPerViewport = this.maxBlocks / 3; // 12 / 3 = 4 blocks per viewport
            const scrollSinceLastBlock = currentScrollY - this.lastBlockCreationScroll;
            const blocksToAdd = Math.floor((scrollSinceLastBlock / window.innerHeight) * blocksPerViewport);
            
            if (blocksToAdd > 0) {
                // Place blocks spaced out within the viewport to avoid clustering
                const spacing = window.innerHeight / blocksPerViewport;
                const baseY = window.scrollY + window.innerHeight * 1.5;
                
                for (let i = 0; i < blocksToAdd; i++) {
                    const block = new ColorBlock();
                    // Space blocks evenly within the viewport
                    block.y = baseY + (i * spacing) + Math.random() * (spacing * 0.5);
                    block.element.style.top = `${block.y}px`;
                    this.container.appendChild(block.element);
                    this.blocks.push(block);
                    this.blocksCreated++;
                    this.highestBlockY = Math.max(this.highestBlockY, block.y);
                }
                this.lastBlockCreationScroll = currentScrollY;
            }
        }

        // Grow container when approaching bottom (cache height to avoid getComputedStyle on every scroll)
        const distanceToBottom = document.documentElement.scrollHeight - (currentScrollY + window.innerHeight);
        if (distanceToBottom < this.growthThreshold) {
            // Only check height when actually needed
            const currentHeight = this.container.offsetHeight;
            const newHeight = currentHeight + window.innerHeight;
            this.container.style.height = `${newHeight}px`;
            document.body.style.height = `${newHeight}px`;
        }

        this.lastScrollY = currentScrollY;
    }

    updateBackgroundColor(block) {
        if (block.y <= 0 && block.y > -100 && block.color !== this.currentBackgroundColor) {
            this.backgroundContainer.style.backgroundColor = block.color;
            this.currentBackgroundColor = block.color;
            document.documentElement.style.setProperty('--page-bg-color', block.color);
        }
    }
}

// Initialize when the page loads
window.addEventListener('load', () => {
    new BackgroundManager();
}); 