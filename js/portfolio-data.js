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

function flattenProjectSlides(projectList) {
    return projectList.flatMap((p) =>
        p.slides.map((src) => ({
            src,
            label: p.label,
            description: p.description || '',
        }))
    );
}

function getSlideProjectFocusFromFlatIndex(startIndex, flatImages, projectList) {
    const img = flatImages[startIndex];
    if (!img) return { projectIndex: 0, slideIndex: 0 };
    const src = img.src;
    let projectIndex = projectList.findIndex((p) => p.slides.includes(src));
    if (projectIndex < 0) projectIndex = 0;
    let slideIndex = projectList[projectIndex].slides.indexOf(src);
    if (slideIndex < 0) slideIndex = 0;
    return { projectIndex, slideIndex };
}

const brandingProjects = [
    {
        label: 'Where do we land?',
        description:
            'Visual identity for Where Do We Land?, a podcast about landscape architecture.',
        slides: [
            'img/where-do-we-land-01.png',
            'img/where-do-we-land-02.png',
            'img/where-do-we-land-03.png',
            'img/where-do-we-land-04.png',
            'img/where-do-we-land-05.png',
            'img/where-do-we-land-06.png',
            'img/where-do-we-land-07.png',
            'img/where-do-we-land-08.png',
            'img/where-do-we-land-09.png',
            'img/where-do-we-land-10.png',
            'img/where-do-we-land-11.png',
        ],
    },
    {
        label: 'Soul in the Kitchen',
        description:
            'Claudia Polo -the woman behind this project- is passionate about how a conscious meal can change the way we relate to food, ourselves, and our environment. The brand is supported by a series of drawings with elements of her universe -from a sriracha bottle to an Italian coffee maker. These are used on the website and can also work as stickers for social media.',
        slides: ['img/brand-1.png', 'img/brand-2.png', 'img/brand-3.png', 'img/brand-4.gif'],
    },
    {
        label: 'Hambre magazine',
        description: 'Logo and brand for online magazine',
        slides: ['img/brand-5.png'],
    },
    {
        label: 'Tame your gut',
        description: 'Social media assets and brand for Tame your gut, a health coach and content creator.',
        slides: ['img/brand-6.png'],
    },
    {
        label: 'BuidlGuidl',
        description:
            'Brand assets, merchandise and illustrations for BuidlGuidl, an Ethereum community and blockchain education platform, including the hero illustration sketch.',
        slides: ['img/brand-8.png', 'img/brand-9.png', 'img/brand-10.png', 'img/brand-11.png'],
    },
];

const mixedMediaProjects = [
    {
        label: 'Risoprint Animation',
        description:
            'This analog animation is the result of a workshop led by Julia Schimautz from DTAN Studio (Berlin), hosted by Onomatopee in Eindhoven, about Risoprint animation.',
        slides: ['img/sun-1.gif', 'img/sun-2.gif', 'img/sun-3.gif', 'img/sun-4.png'],
    },
    {
        label: 'Window puppy',
        description: 'Frame by frame animation using Procreate, from a recorded video.',
        slides: ['img/dog-1.gif', 'img/dog-2.gif'],
    },
];

const motionProjects = [
    {
        label: 'Ingennus',
        description:
            'Video for a sustainability campaign for Ingennus, a Spanish architecture firm, involved working from scratch to create the styleframes, storyboard, and full motion graphics animation -starting from a script written by the company and previously developed brand guidelines.',
        slides: ['img/motion-1.gif', 'img/motion-2.gif'],
    },
    {
        label: 'Etopia',
        description:
            "Etopia is the technology and art institute of Zaragoza (my home city). For this project, I created the motion identity of the brand -how it moves in a digital environment- using the iconic lower dash of the logo (_), and the brand's color blocks.",
        slides: ['img/motion-3.gif'],
    },
    {
        label: 'CTF',
        description: 'Social media assets and video editing for Capture the Flag event.',
        slides: ['img/motion-4.gif'],
    },
];

const potteryChairsGallery = [
    { src: 'img/chair-0.jpeg', label: "Jean Prouvé's in the making" },
    { src: 'img/chair-1.jpeg', label: 'Eames LCW & Kneeling chair' },
    { src: 'img/chair-2.jpeg', label: "Jean Prouvé's Standard chair" },
    { src: 'img/chair-4.jpeg', label: 'Eames LCW' },
    { src: 'img/chair-5.jpeg', label: "Enzo Mari's Sedia 1" },
    { src: 'img/chair-6.jpeg', label: 'Kneeling chair' },
];

const galleryImages = {
    branding: flattenProjectSlides(brandingProjects),
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
    motion: flattenProjectSlides(motionProjects),
    mixedmedia: flattenProjectSlides(mixedMediaProjects),
    pottery: potteryChairsGallery,
};

/** Subset of Where Do We Land frames used only for floating particles (modal keeps every slide). */
const WHERE_DO_WE_LAND_PARTICLE_SRCS = new Set([
    'img/where-do-we-land-01.png',
    'img/where-do-we-land-04.png',
    'img/where-do-we-land-05.png',
    'img/where-do-we-land-07.png',
    'img/where-do-we-land-09.png',
    'img/where-do-we-land-11.png',
]);

const brandingParticlePickPool = galleryImages.branding.map((img, galleryIndex) => ({
    src: img.src,
    label: img.label,
    galleryIndex,
})).filter((entry) => {
    if (!entry.src.includes('where-do-we-land')) return true;
    return WHERE_DO_WE_LAND_PARTICLE_SRCS.has(entry.src);
});

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
