const PROJECT_LIST_GRID_IDS = [
    'web-projects-grid',
    'motion-projects-grid',
    'branding-projects-grid',
    'mixedmedia-projects-grid',
];

function setVisibleProjectListGrid(activeGridId) {
    PROJECT_LIST_GRID_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.hidden = id !== activeGridId;
    });
}
