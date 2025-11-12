// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Remove loading class to show content
    document.body.classList.remove('loading');
    document.body.classList.add('loaded');
    
    // Navigation toggle for mobile
    const navToggle = document.querySelector('.nav-toggle');
    const navigation = document.querySelector('.navigation');
    
    if (navToggle && navigation) {
        navToggle.addEventListener('click', () => {
            navigation.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close navigation when clicking on a link
    const navLinks = document.querySelectorAll('.navigation a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navigation.classList.contains('active')) {
                navigation.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });
    
    // Smooth scrolling for anchor links with requestAnimationFrame for performance
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 1000;
                let start = null;
                
                function step(timestamp) {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
                    if (progress < duration) {
                        window.requestAnimationFrame(step);
                    }
                }
                
                window.requestAnimationFrame(step);
            }
        });
    });
    
    // Easing function for smooth scrolling
    function easeInOutCubic(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t*t + b;
        t -= 2;
        return c/2*(t*t*t + 2) + b;
    }
    
    // Lazy load images with Intersection Observer
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Optimize animations with will-change
    const cards = document.querySelectorAll('.card, .project-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.willChange = 'transform';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.willChange = 'auto';
        });
    });
    
    // Preload images when user hovers over project section
    const projectsSection = document.querySelector('.projects');
    if (projectsSection) {
        projectsSection.addEventListener('mouseenter', () => {
            const images = projectsSection.querySelectorAll('img[data-src]');
            images.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                }
            });
        }, { once: true });
    }
});