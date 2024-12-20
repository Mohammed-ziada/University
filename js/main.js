// Navigation scroll effect
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.main-nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            nav.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
            nav.classList.remove('scroll-up');
            nav.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
            nav.classList.remove('scroll-down');
            nav.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Feature cards animation
    const featureCards = document.querySelectorAll('.feature-card');
    
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

    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // Statistics animation
    const animateStats = () => {
        const stats = document.querySelectorAll('.stat-number');
        
        stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            let current = 0;
            const increment = target / 50; // Adjust speed of counting
            const updateCount = () => {
                if (current < target) {
                    current += increment;
                    stat.textContent = Math.ceil(current) + (stat.textContent.includes('+') ? '+' : '%');
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target + (stat.textContent.includes('+') ? '+' : '%');
                }
            };
            updateCount();
        });
    };

    // Testimonials slider
    const initTestimonialsSlider = () => {
        const slider = document.querySelector('.testimonials-slider');
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
    };

    // Course cards hover effect
    const initCourseCards = () => {
        const courseCards = document.querySelectorAll('.course-card');
        
        courseCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    };

    // Mobile Navigation
    const initMobileNav = () => {
        const mobileToggle = document.querySelector('.mobile-nav-toggle');
        const navLinks = document.querySelector('.nav-links');
        const navLinksItems = document.querySelectorAll('.nav-links a');

        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                const isOpened = navLinks.classList.contains('active');
                navLinks.classList.toggle('active');
                mobileToggle.setAttribute('aria-expanded', !isOpened);
            });
        }

        // Close mobile menu when clicking on a link
        navLinksItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-links') && !e.target.closest('.mobile-nav-toggle')) {
                navLinks.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
        });
    };

    // Scroll Header
    const initScrollHeader = () => {
        const header = document.querySelector('.main-nav');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                header.classList.remove('scroll-up');
                return;
            }
            
            if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
                header.classList.remove('scroll-up');
                header.classList.add('scroll-down');
            } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
                header.classList.remove('scroll-down');
                header.classList.add('scroll-up');
            }
            lastScroll = currentScroll;
        });
    };

    // Initialize new features
    const statsSection = document.querySelector('.statistics');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }

    initMobileNav();
    initScrollHeader();
    initTestimonialsSlider();
    initCourseCards();
});

// Mobile navigation toggle
const createMobileNav = () => {
    const nav = document.querySelector('.nav-links');
    const burger = document.createElement('div');
    burger.className = 'burger';
    burger.innerHTML = '<span></span><span></span><span></span>';
    
    document.querySelector('.nav-container').appendChild(burger);

    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('active');
    });
};

// Initialize mobile navigation on small screens
if (window.innerWidth <= 768) {
    createMobileNav();
}

// Window resize handler
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        if (!document.querySelector('.burger')) {
            createMobileNav();
        }
    } else {
        const burger = document.querySelector('.burger');
        if (burger) {
            burger.remove();
            document.querySelector('.nav-links').classList.remove('active');
        }
    }
});
