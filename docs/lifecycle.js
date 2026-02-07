// Stage label click handling
document.querySelectorAll('.stage-label').forEach(label => {
    label.addEventListener('click', () => {
        const stage = label.dataset.stage;
        const targetCard = document.getElementById(`stage-${stage}`);
        
        if (targetCard) {
            // Remove active from all labels
            document.querySelectorAll('.stage-label').forEach(l => l.classList.remove('active'));
            // Add active to clicked
            label.classList.add('active');
            
            // Scroll to card
            targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Highlight card
            document.querySelectorAll('.stage-card').forEach(card => card.classList.remove('highlighted'));
            targetCard.classList.add('highlighted');
            
            // Remove highlight after animation
            setTimeout(() => {
                targetCard.classList.remove('highlighted');
            }, 2000);
        }
    });
});

// Animate stage cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.stage-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Animate tool cards on hover
document.querySelectorAll('.tool-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.boxShadow = '0 4px 20px rgba(99, 102, 241, 0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = 'none';
    });
});

// Update active stage label based on scroll position
const stageCards = document.querySelectorAll('.stage-card');
const stageLabels = document.querySelectorAll('.stage-label');

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stageId = entry.target.id.replace('stage-', '');
            stageLabels.forEach(label => {
                if (label.dataset.stage === stageId) {
                    label.classList.add('active');
                } else {
                    label.classList.remove('active');
                }
            });
        }
    });
}, { threshold: 0.5 });

stageCards.forEach(card => scrollObserver.observe(card));

// Smooth scroll for navigation
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

// Summary stats animation
const summaryStats = document.querySelectorAll('.summary-stat');
const summaryObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            summaryObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

summaryStats.forEach(stat => {
    stat.style.opacity = '0';
    stat.style.transform = 'translateY(20px)';
    stat.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    summaryObserver.observe(stat);
});
