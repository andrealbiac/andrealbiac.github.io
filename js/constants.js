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
