// Color palette for the blocks
const colors = [
    '#FF6B6B', // Coral
    '#4ECDC4', // Turquoise
    '#45B7D1', // Sky Blue
    '#96CEB4', // Sage
    '#FFEEAD', // Cream
    '#D4A5A5', // Dusty Rose
    '#A8D8EA', // Pale Blue
    '#B5EAD7', // Mint
    '#FFDAC1', // Peach
    '#E2F0CB', // Pale Green
    '#C7CEEA', // Lavender Blue
    '#F8B195', // Soft Pink
    '#E6D5AC'  // Beige
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
        this.backgroundContainer.style.backgroundColor = '#f5f5f5';
        this.blocks = [];
        this.maxBlocks = 20;
        this.lastScrollY = 0;
        this.totalScrollY = 0;
        this.blocksCreated = 0;
        this.currentBackgroundColor = '#f5f5f5';
        this.originalBackgroundColor = '#f5f5f5';
        this.isAutoScrolling = false;
        this.autoScrollSpeed = 2;
        this.sunIcon = document.querySelector('.sun-icon');
        this.rotationDegrees = 0;
        this.growthThreshold = window.innerHeight * 0.8;
        this.init();
    }

    init() {
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

        window.addEventListener('scroll', this.handleScroll.bind(this));
        
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
            block.y = window.innerHeight + Math.random() * window.innerHeight;
            block.element.style.top = `${block.y}px`;
        }
        this.container.appendChild(block.element);
        this.blocks.push(block);
        this.blocksCreated++;
    }

    handleScroll() {
        const currentScrollY = window.scrollY;
        const scrollDelta = currentScrollY - this.lastScrollY;
        
        // Update total scroll amount
        this.totalScrollY += scrollDelta;
        
        // Update sun rotation based on scroll
        if (!this.isAutoScrolling) {
            this.rotationDegrees = (this.rotationDegrees + scrollDelta * 0.1) % 360;
            this.sunIcon.style.transform = `rotate(${this.rotationDegrees}deg)`;
        }
        
        // Reset background color when at the top
        if (currentScrollY <= 0) {
            this.backgroundContainer.style.backgroundColor = this.originalBackgroundColor;
            this.currentBackgroundColor = this.originalBackgroundColor;
        }
        
        // Sort blocks by y position to ensure we process them in order
        this.blocks.sort((a, b) => b.y - a.y);
        
        // Update block positions based on total scroll and check for background color change
        this.blocks.forEach(block => {
            block.update(scrollDelta);
            this.updateBackgroundColor(block);
        });

        // Add new blocks when scrolling down
        if (scrollDelta > 0) {
            const blocksToAdd = Math.floor(this.totalScrollY / (window.innerHeight / 7)) - this.blocksCreated;
            if (blocksToAdd > 0) {
                for (let i = 0; i < blocksToAdd; i++) {
                    this.addBlock(false);
                }
            }
        }

        // Grow container when approaching bottom
        const distanceToBottom = document.documentElement.scrollHeight - (currentScrollY + window.innerHeight);
        if (distanceToBottom < this.growthThreshold) {
            const currentHeight = parseInt(getComputedStyle(this.container).height);
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
        }
    }
}

// Initialize when the page loads
window.addEventListener('load', () => {
    new BackgroundManager();
}); 