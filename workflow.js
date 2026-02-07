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

// Observe flow stages, cards, and sections
document.querySelectorAll('.flow-stage-header, .pipeline-stage, .environment-card, .monitor-card, .security-layer, .stat-card').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
    observer.observe(el);
});

// Add animate-in class styles
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Pipeline stage click interaction
document.querySelectorAll('.pipeline-stage').forEach(stage => {
    stage.addEventListener('click', () => {
        // Remove active from all
        document.querySelectorAll('.pipeline-stage').forEach(s => s.classList.remove('active'));
        // Add active to clicked
        stage.classList.add('active');
        
        // Flash effect
        stage.style.boxShadow = '0 0 30px rgba(99, 102, 241, 0.5)';
        setTimeout(() => {
            stage.style.boxShadow = '';
        }, 500);
    });
});

// Smooth scroll for nav links
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

// Branch diagram hover effects
document.querySelectorAll('.branch').forEach(branch => {
    branch.addEventListener('mouseenter', () => {
        branch.style.transform = 'translateX(10px)';
        branch.style.transition = 'transform 0.3s ease';
    });
    
    branch.addEventListener('mouseleave', () => {
        branch.style.transform = 'translateX(0)';
    });
});

// Security tool hover effects
document.querySelectorAll('.security-tool').forEach(tool => {
    tool.addEventListener('mouseenter', () => {
        tool.style.transform = 'scale(1.02)';
        tool.style.transition = 'transform 0.2s ease';
    });
    
    tool.addEventListener('mouseleave', () => {
        tool.style.transform = 'scale(1)';
    });
});

// Flow phase click to scroll
document.querySelectorAll('.flow-phase').forEach((phase, index) => {
    phase.addEventListener('click', () => {
        const stages = document.querySelectorAll('.flow-stage-header');
        if (stages[index]) {
            stages[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Highlight effect
            stages[index].style.boxShadow = '0 0 30px rgba(99, 102, 241, 0.3)';
            setTimeout(() => {
                stages[index].style.boxShadow = '';
            }, 1500);
        }
    });
});
