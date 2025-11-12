// Simple image loading optimization
// Force immediate loading for visible images
window.addEventListener('load', function() {
    // Load all images that are in viewport immediately
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        const rect = img.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            img.loading = 'eager';
        }
    });
});

// Fallback for browsers that don't support lazy loading
if ('loading' in HTMLImageElement.prototype) {
    // Browser supports lazy loading, let it handle it
} else {
    // Fallback for older browsers
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src; // Force load
    });
}