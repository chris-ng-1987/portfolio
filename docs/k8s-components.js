// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe component cards
document.querySelectorAll('.component-card, .component-category, .stat-box').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease ${index * 0.03}s, transform 0.5s ease ${index * 0.03}s`;
    observer.observe(el);
});

// Add animate-in styles
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Component card hover effect
document.querySelectorAll('.component-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.boxShadow = '0 12px 30px rgba(99, 102, 241, 0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '';
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Nav background on scroll
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        nav.style.background = 'rgba(10, 10, 15, 0.95)';
    } else {
        nav.style.background = 'rgba(10, 10, 15, 0.8)';
    }
});

// Filter by badge type (future enhancement)
document.querySelectorAll('.component-badge').forEach(badge => {
    badge.style.cursor = 'pointer';
    badge.addEventListener('click', (e) => {
        e.stopPropagation();
        const type = badge.classList[1]; // cncf, native, oss, commercial
        console.log(`Filter by: ${type}`);
        // Could add filtering logic here
    });
});
