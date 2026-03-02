const projectsSection = document.getElementById('projects-section');
const projectsTitle = document.getElementById('projects-title');
const projects = [
    document.getElementById('project-0'),
    document.getElementById('project-1'),
    document.getElementById('project-2'),
    document.getElementById('project-3'),
];

const contactSection = document.getElementById('contact-section');
const contactTitle = document.getElementById('contact-title');
const contactLink = document.querySelector('.contact-button');

const footerLinks = document.getElementById('footer-links');


// FUNCTIONS


function lerp(a, b, t) {
    return a + (b - a) * Math.max(0, Math.min(1, t));
}

// Normalize t between two scroll progress points
function norm(t, start, end) {
    return Math.max(0, Math.min(1, (t - start) / (end - start)));
}

// Easing
function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}


// PROJECTS SECTION


function projectsOnScroll() {
    const rect = projectsSection.getBoundingClientRect();
    const sectionHeight = projectsSection.offsetHeight;
    const viewportHeight = window.innerHeight;

    // progress: 0 when section top hits viewport bottom, 1 when section bottom hits viewport top
    // We want 0 when sticky content first appears, 1 when it disappears
    // Scroll offset within section
    const scrolled = -rect.top;
    const scrollable = sectionHeight - viewportHeight;
    const progress = Math.max(0, Math.min(1, scrolled / scrollable));

    // --- Title fade in: 0 → 0.25 ---
    const titleT = easeOutCubic(norm(progress, 0, 0.22));
    projectsTitle.style.opacity = titleT;

    // --- projects slide up: staggered, start at 0.3 ---
    const projectStarts = [0.30, 0.40, 0.50, 0.60];
    const projectEnds   = [0.50, 0.60, 0.70, 0.80];

    projects.forEach((project, i) => {
        const t = easeOutCubic(norm(progress, projectStarts[i], projectEnds[i]));
        project.style.opacity = t;
        project.style.transform = `translateY(${lerp(50, 0, t)}px)`;
    });
}

window.addEventListener('scroll', projectsOnScroll, { passive: true });
projectsOnScroll(); // run once on load


// CONTACT SECTION


function contactOnScroll() {
    const rect = contactSection.getBoundingClientRect();
    const sectionHeight = contactSection.offsetHeight;
    const viewportHeight = window.innerHeight;

    // progress: 0 when section top hits viewport bottom, 1 when section bottom hits viewport top
    // We want 0 when sticky content first appears, 1 when it disappears
    // Scroll offset within section
    const scrolled = -rect.top;
    const scrollable = sectionHeight - viewportHeight;
    const progress = Math.max(0, Math.min(1, scrolled / scrollable));

    // --- Title fade in: 0 → 0.25 ---
    const titleT = easeOutCubic(norm(progress, 0, 0.22));
    contactTitle.style.opacity = titleT;

    const t = easeOutCubic(norm(progress, 0.3, 0.5));
    contactLink.style.opacity = t;
    const offset = window.innerWidth < 768 ? 95 : 150; // more offset on desktop for better visual balance
    contactLink.style.transform = `translateY(${lerp(50, 0, t) + offset}px)`;

    // --- Footer fades in after contact button has appeared ---
    const footerT = easeOutCubic(norm(progress, 0.55, 0.75));
    footerLinks.style.opacity = footerT;
}

window.addEventListener('scroll', contactOnScroll, { passive: true });
contactOnScroll(); // run once on load