/** Match portfolio mobile breakpoint (see styles.css). */
const MOBILE_CAROUSEL_MEDIA = '(max-width: 768px)';

const DEFAULT_MIN_INTERVAL_MS = 3000;
const DEFAULT_MAX_INTERVAL_MS = 4000;
/** Spread first ticks so many carousels on screen do not flip in sync. */
const DEFAULT_STAGGER_MAX_MS = 2800;

/**
 * On narrow viewports, call tickFn on a repeating schedule. Pauses when the tab is hidden.
 * Each instance picks its own interval (min–max ms) and random start delay so carousels drift apart.
 *
 * @param {() => void} tickFn
 * @param {{ minIntervalMs?: number, maxIntervalMs?: number, staggerMaxMs?: number }} [options]
 * @returns {() => void} stop and remove listeners
 */
function createMobileCarouselAutoplay(tickFn, options = {}) {
    const minI = options.minIntervalMs ?? DEFAULT_MIN_INTERVAL_MS;
    const maxI = options.maxIntervalMs ?? DEFAULT_MAX_INTERVAL_MS;
    const staggerMax = options.staggerMaxMs ?? DEFAULT_STAGGER_MAX_MS;
    const intervalMs = minI + Math.random() * (maxI - minI);
    const initialDelayMs = Math.random() * staggerMax;

    const mq = window.matchMedia(MOBILE_CAROUSEL_MEDIA);
    let intervalId = null;
    let initialTimeoutId = null;

    const runTick = () => {
        if (!document.hidden) tickFn();
    };

    const start = () => {
        if (intervalId !== null || initialTimeoutId !== null) return;
        initialTimeoutId = window.setTimeout(() => {
            initialTimeoutId = null;
            runTick();
            intervalId = window.setInterval(runTick, intervalMs);
        }, initialDelayMs);
    };

    const stop = () => {
        if (initialTimeoutId !== null) {
            window.clearTimeout(initialTimeoutId);
            initialTimeoutId = null;
        }
        if (intervalId !== null) {
            window.clearInterval(intervalId);
            intervalId = null;
        }
    };

    const onMq = () => {
        if (mq.matches) start();
        else stop();
    };
    onMq();
    mq.addEventListener('change', onMq);
    const onVis = () => {
        if (document.hidden) stop();
        else if (mq.matches) start();
    };
    document.addEventListener('visibilitychange', onVis);
    return () => {
        stop();
        mq.removeEventListener('change', onMq);
        document.removeEventListener('visibilitychange', onVis);
    };
}
