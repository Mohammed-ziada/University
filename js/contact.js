document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.querySelector('.newsletter-form');

    // Contact form validation and submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();

        // Basic validation
        if (!firstName || !lastName || !email || !subject || !message) {
            alert('Please fill in all required fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Phone validation (optional)
        if (phone) {
            const phoneRegex = /^\+?[\d\s-]{10,}$/;
            if (!phoneRegex.test(phone)) {
                alert('Please enter a valid phone number');
                return;
            }
        }

        // If validation passes, show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Reset form
            contactForm.reset();
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset button
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }, 1500);
    });

    // Newsletter form submission
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // Simulate newsletter subscription
            const submitBtn = newsletterForm.querySelector('button');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;

            setTimeout(() => {
                newsletterForm.reset();
                alert('Thank you for subscribing to our newsletter!');
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // Add smooth scrolling for anchor links
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
});
