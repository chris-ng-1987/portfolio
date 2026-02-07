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

// Observe elements
document.querySelectorAll('.arch-layer, .stage-block, .branch-env-row, .code-example-card, .template-category, .benefit-card, .metric').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
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

// Stage block click interaction
document.querySelectorAll('.stage-block').forEach(stage => {
    stage.addEventListener('click', () => {
        // Toggle expanded state
        stage.classList.toggle('expanded');
    });
});

// Arch item hover effect
document.querySelectorAll('.arch-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-2px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// Template item click to highlight related
document.querySelectorAll('.template-item').forEach(item => {
    item.addEventListener('click', () => {
        // Flash highlight
        item.style.background = 'rgba(99, 102, 241, 0.2)';
        setTimeout(() => {
            item.style.background = '';
        }, 300);
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

// Job chip animation
document.querySelectorAll('.job-chip').forEach((chip, index) => {
    chip.style.animationDelay = `${index * 0.1}s`;
});

// Code block copy functionality
document.querySelectorAll('.code-block').forEach(block => {
    block.addEventListener('dblclick', () => {
        const text = block.textContent;
        navigator.clipboard.writeText(text).then(() => {
            // Show copied feedback
            const feedback = document.createElement('div');
            feedback.textContent = 'Copied!';
            feedback.style.cssText = `
                position: absolute;
                top: 10px;
                right: 10px;
                background: #22c55e;
                color: white;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 12px;
            `;
            block.parentElement.style.position = 'relative';
            block.parentElement.appendChild(feedback);
            setTimeout(() => feedback.remove(), 1500);
        });
    });
});
