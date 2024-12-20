document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const termsCheckbox = document.getElementById('terms');
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');

    // Toggle password visibility
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const input = e.target.closest('.input-group').querySelector('input');
            const type = input.type === 'password' ? 'text' : 'password';
            input.type = type;
            btn.querySelector('i').classList.toggle('fa-eye');
            btn.querySelector('i').classList.toggle('fa-eye-slash');
        });
    });

    // Name validation
    const validateName = (name, fieldName) => {
        if (!name) {
            return `${fieldName} is required`;
        }
        if (name.length < 2) {
            return `${fieldName} must be at least 2 characters long`;
        }
        if (!/^[a-zA-Z\s-']+$/.test(name)) {
            return `${fieldName} can only contain letters, spaces, hyphens, and apostrophes`;
        }
        return '';
    };

    // Email validation
    const validateEmail = (email) => {
        if (!email) {
            return 'Email is required';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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

    // Confirm password validation
    const validateConfirmPassword = (confirmPassword, password) => {
        if (!confirmPassword) {
            return 'Please confirm your password';
        }
        if (confirmPassword !== password) {
            return 'Passwords do not match';
        }
        return '';
    };

    // Terms validation
    const validateTerms = (checked) => {
        return checked ? '' : 'You must accept the Terms of Service and Privacy Policy';
    };

    // Real-time validation
    firstNameInput.addEventListener('input', () => {
        const error = validateName(firstNameInput.value, 'First name');
        document.getElementById('firstNameError').textContent = error;
        firstNameInput.parentElement.style.boxShadow = error ? '0 0 0 2px var(--accent-color)' : '';
    });

    lastNameInput.addEventListener('input', () => {
        const error = validateName(lastNameInput.value, 'Last name');
        document.getElementById('lastNameError').textContent = error;
        lastNameInput.parentElement.style.boxShadow = error ? '0 0 0 2px var(--accent-color)' : '';
    });

    emailInput.addEventListener('input', () => {
        const error = validateEmail(emailInput.value);
        document.getElementById('emailError').textContent = error;
        emailInput.parentElement.style.boxShadow = error ? '0 0 0 2px var(--accent-color)' : '';
    });

    passwordInput.addEventListener('input', () => {
        const error = validatePassword(passwordInput.value);
        document.getElementById('passwordError').textContent = error;
        passwordInput.parentElement.style.boxShadow = error ? '0 0 0 2px var(--accent-color)' : '';

        // Also validate confirm password if it has a value
        if (confirmPasswordInput.value) {
            const confirmError = validateConfirmPassword(confirmPasswordInput.value, passwordInput.value);
            document.getElementById('confirmPasswordError').textContent = confirmError;
            confirmPasswordInput.parentElement.style.boxShadow = confirmError ? '0 0 0 2px var(--accent-color)' : '';
        }
    });

    confirmPasswordInput.addEventListener('input', () => {
        const error = validateConfirmPassword(confirmPasswordInput.value, passwordInput.value);
        document.getElementById('confirmPasswordError').textContent = error;
        confirmPasswordInput.parentElement.style.boxShadow = error ? '0 0 0 2px var(--accent-color)' : '';
    });

    termsCheckbox.addEventListener('change', () => {
        const error = validateTerms(termsCheckbox.checked);
        document.getElementById('termsError').textContent = error;
    });

    // Form submission
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate all fields
        const firstNameError = validateName(firstNameInput.value, 'First name');
        const lastNameError = validateName(lastNameInput.value, 'Last name');
        const emailError = validateEmail(emailInput.value);
        const passwordError = validatePassword(passwordInput.value);
        const confirmPasswordError = validateConfirmPassword(confirmPasswordInput.value, passwordInput.value);
        const termsError = validateTerms(termsCheckbox.checked);

        // Update error messages
        document.getElementById('firstNameError').textContent = firstNameError;
        document.getElementById('lastNameError').textContent = lastNameError;
        document.getElementById('emailError').textContent = emailError;
        document.getElementById('passwordError').textContent = passwordError;
        document.getElementById('confirmPasswordError').textContent = confirmPasswordError;
        document.getElementById('termsError').textContent = termsError;

        // Check if there are any errors
        if (!firstNameError && !lastNameError && !emailError && !passwordError && !confirmPasswordError && !termsError) {
            // Proceed with signup
            const signupButton = document.querySelector('.signup-button');
            signupButton.textContent = 'Creating Account...';
            signupButton.disabled = true;

            // Simulate API call
            setTimeout(() => {
                // Reset button state
                signupButton.textContent = 'Create Account';
                signupButton.disabled = false;

                // Redirect to login page
                window.location.href = 'login.html';
            }, 1500);
        }
    });

    // Social signup buttons
    const socialButtons = document.querySelectorAll('.social-button');
    socialButtons.forEach(button => {
        button.addEventListener('click', () => {
            const platform = button.classList.contains('google') ? 'Google' : 'Facebook';
            console.log(`Initiating ${platform} signup...`);
            // Implement social signup logic here
        });
    });
});
