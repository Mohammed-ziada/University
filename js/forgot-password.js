document.addEventListener('DOMContentLoaded', () => {
    const emailForm = document.getElementById('emailForm');
    const verificationForm = document.getElementById('verificationForm');
    const newPasswordForm = document.getElementById('newPasswordForm');
    const emailInput = document.getElementById('email');
    const codeInputs = document.querySelectorAll('.code-input');
    const resendButton = document.querySelector('.resend-button');
    const countdownSpan = document.querySelector('.countdown');
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');

    let resendTimer = null;
    const COUNTDOWN_TIME = 60; // seconds

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

    // Start countdown timer
    const startCountdown = () => {
        let timeLeft = COUNTDOWN_TIME;
        resendButton.disabled = true;
        
        const updateCountdown = () => {
            countdownSpan.textContent = `(${timeLeft}s)`;
            if (timeLeft === 0) {
                clearInterval(resendTimer);
                countdownSpan.textContent = '';
                resendButton.disabled = false;
            }
            timeLeft--;
        };

        updateCountdown();
        resendTimer = setInterval(updateCountdown, 1000);
    };

    // Handle verification code inputs
    codeInputs.forEach((input, index) => {
        input.addEventListener('keyup', (e) => {
            const value = e.target.value;
            
            // Move to next input if value is entered
            if (value.length === 1 && index < codeInputs.length - 1) {
                codeInputs[index + 1].focus();
            }
            
            // Move to previous input on backspace
            if (e.key === 'Backspace' && index > 0 && !value) {
                codeInputs[index - 1].focus();
            }

            // Allow only numbers
            if (!/^\d*$/.test(value)) {
                input.value = '';
            }
        });

        // Select all text on focus
        input.addEventListener('focus', () => {
            input.select();
        });
    });

    // Email form submission
    emailForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const emailError = validateEmail(emailInput.value);
        document.getElementById('emailError').textContent = emailError;

        if (!emailError) {
            const submitButton = emailForm.querySelector('.submit-button');
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Simulate API call
            setTimeout(() => {
                emailForm.classList.remove('active');
                verificationForm.classList.add('active');
                startCountdown();
            }, 1500);
        }
    });

    // Verification form submission
    verificationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const code = Array.from(codeInputs).map(input => input.value).join('');
        
        if (code.length !== 6) {
            document.getElementById('codeError').textContent = 'Please enter the complete verification code';
            return;
        }

        const submitButton = verificationForm.querySelector('.submit-button');
        submitButton.textContent = 'Verifying...';
        submitButton.disabled = true;

        // Simulate API call
        setTimeout(() => {
            verificationForm.classList.remove('active');
            newPasswordForm.classList.add('active');
        }, 1500);
    });

    // New password form submission
    newPasswordForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        const passwordError = validatePassword(newPassword);
        const confirmError = newPassword !== confirmPassword ? 'Passwords do not match' : '';

        document.getElementById('newPasswordError').textContent = passwordError;
        document.getElementById('confirmPasswordError').textContent = confirmError;

        if (!passwordError && !confirmError) {
            const submitButton = newPasswordForm.querySelector('.submit-button');
            submitButton.textContent = 'Resetting...';
            submitButton.disabled = true;

            // Simulate API call
            setTimeout(() => {
                // Redirect to login page
                window.location.href = 'login.html';
            }, 1500);
        }
    });

    // Resend code
    resendButton.addEventListener('click', () => {
        if (!resendButton.disabled) {
            // Simulate resending code
            startCountdown();
            
            // Show success message
            document.getElementById('codeError').textContent = 'New code sent successfully';
            document.getElementById('codeError').style.color = '#28a745';
            
            // Clear inputs
            codeInputs.forEach(input => input.value = '');
            codeInputs[0].focus();
            
            // Reset error message style after 3 seconds
            setTimeout(() => {
                document.getElementById('codeError').textContent = '';
                document.getElementById('codeError').style.color = '';
            }, 3000);
        }
    });
});
