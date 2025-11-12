// Image optimization script for WebP conversion
// This script would typically run during build process

// Modern image loading with intersection observer for better performance
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            
            // Load the image immediately when it comes into view
            if (img.loading === 'lazy') {
                img.loading = 'eager'; // Load immediately
                img.classList.add('loaded');
            }
            
            observer.unobserve(img);
        }
    });
}, {
    rootMargin: '50px 0px',
    threshold: 0.01
});

// Apply lazy loading to images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        if ('IntersectionObserver' in window) {
            imageObserver.observe(img);
        }
    });
});

// WebP support detection and fallback
function supportsWebP() {
    return new Promise(resolve => {
        const webP = new Image();
        webP.onload = webP.onerror = () => {
            resolve(webP.height === 2);
        };
        webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
}

// Apply WebP support with proper fallback
supportsWebP().then(hasWebP => {
    if (!hasWebP) {
        // If WebP is not supported, remove WebP sources so browser uses fallback images
        document.querySelectorAll('source[type="image/webp"]').forEach(source => {
            const picture = source.parentElement;
            const img = picture.querySelector('img');
            if (img) {
                // Ensure the img src is set correctly
                img.src = img.getAttribute('src');
            }
        });
    }
});

// Force load images that are in viewport on page load
document.addEventListener('DOMContentLoaded', () => {
    // Check which images are already in viewport
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const rect = img.getBoundingClientRect();
        const isInViewport = rect.top >= 0 && rect.bottom <= window.innerHeight;
        
        if (isInViewport && img.loading === 'lazy') {
            img.loading = 'eager';
        }
    });
});