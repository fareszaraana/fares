// Optimized navigation with passive listeners and throttling
const navToggle = document.querySelector('.nav-toggle');
const navigation = document.querySelector('.navigation');

// Debounced navigation toggle
let navToggleTimeout;
function toggleNavigation() {
    clearTimeout(navToggleTimeout);
    navToggleTimeout = setTimeout(() => {
        navigation.classList.toggle('active');
        navToggle.classList.toggle('active');
    }, 10);
}

navToggle.addEventListener('click', toggleNavigation, { passive: true });

// Close navigation when clicking on a link with event delegation
const navLinks = document.querySelectorAll('.navigation a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        requestAnimationFrame(() => {
            navigation.classList.remove('active');
            navToggle.classList.remove('active');
        });
    }, { passive: true });
});

// Close navigation when clicking outside with throttling
let clickTimeout;
document.addEventListener('click', (e) => {
    clearTimeout(clickTimeout);
    clickTimeout = setTimeout(() => {
        if (!navigation.contains(e.target) && !navToggle.contains(e.target)) {
            navigation.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }, 10);
}, { passive: true });

// Smooth scroll optimization
const smoothScroll = (target) => {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
};

// Add smooth scroll to all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        smoothScroll(anchor.getAttribute('href'));
    }, { passive: true });
});

// Font loading optimization
const fontLoadTimeout = setTimeout(() => {
    document.documentElement.classList.add('fonts-loaded');
}, 3000); // Fallback after 3 seconds

// Check if fonts are loaded
if (document.fonts) {
    document.fonts.ready.then(() => {
        clearTimeout(fontLoadTimeout);
        document.documentElement.classList.add('fonts-loaded');
    });
}

// Preload critical resources
const preloadResource = (href, as) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    document.head.appendChild(link);
};

// Preload next likely resources after page load
window.addEventListener('load', () => {
    // Preload images that might be needed
    const projectImages = document.querySelectorAll('.project-image img');
    projectImages.forEach(img => {
        if (img.src && img.loading !== 'lazy') {
            preloadResource(img.src, 'image');
        }
    });
});