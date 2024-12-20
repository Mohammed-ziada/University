document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const togglePasswordBtn = document.querySelector('.toggle-password');

    // Toggle password visibility
    togglePasswordBtn.addEventListener('click', () => {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        togglePasswordBtn.querySelector('i').classList.toggle('fa-eye');
        togglePasswordBtn.querySelector('i').classList.toggle('fa-eye-slash');
    });

    // Email validation
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            return 'Email is required';
        }
        if (!emailRegex.test(email)) {
            return 'Please enter a valid email address';
        }
        return '';
    };

    // Password validation
    const validatePassword = (password) => {
        if (!password) {
            return 'Password is required';
        }
        if (password.length < 8) {
            return 'Password must be at least 8 characters long';
        }
        if (!/[A-Z]/.test(password)) {
            return 'Password must contain at least one uppercase letter';
        }
        if (!/[a-z]/.test(password)) {
            return 'Password must contain at least one lowercase letter';
        }
        if (!/[0-9]/.test(password)) {
            return 'Password must contain at least one number';
        }
        if (!/[!@#$%^&*]/.test(password)) {
            return 'Password must contain at least one special character (!@#$%^&*)';
        }
        return '';
    };

    // Real-time email validation
    emailInput.addEventListener('input', () => {
        const error = validateEmail(emailInput.value);
        emailError.textContent = error;
        emailInput.parentElement.style.boxShadow = error ? '0 0 0 2px var(--accent-color)' : '';
    });

    // Real-time password validation
    passwordInput.addEventListener('input', () => {
        const error = validatePassword(passwordInput.value);
        passwordError.textContent = error;
        passwordInput.parentElement.style.boxShadow = error ? '0 0 0 2px var(--accent-color)' : '';
    });

    // Form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate both fields
        const emailError = validateEmail(emailInput.value);
        const passwordError = validatePassword(passwordInput.value);

        // Update error messages
        document.getElementById('emailError').textContent = emailError;
        document.getElementById('passwordError').textContent = passwordError;

        // If no errors, proceed with login
        if (!emailError && !passwordError) {
            // Here you would typically make an API call to your backend
            console.log('Form is valid, proceeding with login...');
            
            // Simulate API call
            const loginButton = document.querySelector('.login-button');
            loginButton.textContent = 'Logging in...';
            loginButton.disabled = true;

            // Simulate API response
            setTimeout(() => {
                // Reset button state
                loginButton.textContent = 'Log In';
                loginButton.disabled = false;

                // Redirect to Home Page or show success message
         
                window.location.href = 'index.html';
            }, 1000);
        }
    });

    // Social login buttons
    const socialButtons = document.querySelectorAll('.social-button');
    socialButtons.forEach(button => {
        button.addEventListener('click', () => {
            const platform = button.classList.contains('google') ? 'Google' : 'Facebook';
            console.log(`Initiating ${platform} login...`);
            // Implement social login logic here
        });
    });
});
