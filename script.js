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
        navigation.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Close navigation when clicking outside
document.addEventListener('click', (e) => {
    if (!navigation.contains(e.target) && !navToggle.contains(e.target)) {
        navigation.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Lazy loading للصور مع Intersection Observer
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // يمكن إضافة تحميل للصور عالية الجودة هنا إذا أردت
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// تحسين التمرير السلس
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// تحسين أداء hover animations
const animatedElements = document.querySelectorAll('.card, .project-card, .main-btn, .social-icons a');
animatedElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.willChange = 'transform';
    });
    
    element.addEventListener('mouseleave', function() {
        // إعادة تعيين will-change بعد انتهاء التحريك لتوفير الذاكرة
        setTimeout(() => {
            this.style.willChange = 'auto';
        }, 300);
    });
});