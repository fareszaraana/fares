// Navigation toggle for mobile
const navToggle = document.querySelector('.nav-toggle');
const navigation = document.querySelector('.navigation');

navToggle.addEventListener('click', () => {
    navigation.classList.toggle('active');
    navToggle.classList.toggle('active');
});

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