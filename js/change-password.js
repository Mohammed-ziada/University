document.addEventListener('DOMContentLoaded', () => {
    const changePasswordForm = document.getElementById('changePasswordForm');
    const currentPasswordInput = document.getElementById('currentPassword');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const strengthIndicator = document.querySelector('.strength-indicator');
    const strengthText = document.querySelector('.strength-text');
    const requirements = document.querySelectorAll('.password-requirements li');
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');

    // Password requirements regex patterns
    const patterns = {
        length: /.{8,}/,
        uppercase: /[A-Z]/,
        lowercase: /[a-z]/,
        number: /[0-9]/,
        special: /[!@#$%^&*]/
    };

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

    // Check password strength and update UI
    const checkPasswordStrength = (password) => {
        let strength = 0;
        let validRequirements = 0;

        // Check each requirement
        requirements.forEach(requirement => {
            const type = requirement.dataset.requirement;
            const isValid = patterns[type].test(password);
            
            if (isValid) {
                requirement.classList.add('valid');
                requirement.querySelector('i').style.color = '#00C851';
                validRequirements++;
            } else {
                requirement.classList.remove('valid');
                requirement.querySelector('i').style.color = '#ccc';
            }
        });

        // Calculate strength based on valid requirements
        strength = (validRequirements / Object.keys(patterns).length) * 100;

        // Update strength indicator
        strengthIndicator.style.width = `${strength}%`;
        strengthIndicator.className = 'strength-indicator';

        if (strength <= 33) {
            strengthIndicator.classList.add('weak');
            strengthText.textContent = 'Weak Password';
        } else if (strength <= 66) {
            strengthIndicator.classList.add('medium');
            strengthText.textContent = 'Medium Password';
        } else {
            strengthIndicator.classList.add('strong');
            strengthText.textContent = 'Strong Password';
        }

        return validRequirements === Object.keys(patterns).length;
    };

    // Validate current password
    const validateCurrentPassword = (password) => {
        if (!password) {
            return 'Current password is required';
        }
        return '';
    };

    // Validate new password
    const validateNewPassword = (password, currentPassword) => {
        if (!password) {
            return 'New password is required';
        }
        if (password === currentPassword) {
            return 'New password must be different from current password';
        }
        if (!checkPasswordStrength(password)) {
            return 'Password does not meet all requirements';
        }
        return '';
    };

    // Validate confirm password
    const validateConfirmPassword = (confirmPassword, newPassword) => {
        if (!confirmPassword) {
            return 'Please confirm your new password';
        }
        if (confirmPassword !== newPassword) {
            return 'Passwords do not match';
        }
        return '';
    };

    // Real-time password strength check
    newPasswordInput.addEventListener('input', () => {
        checkPasswordStrength(newPasswordInput.value);
    });

    // Form submission
    changePasswordForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const currentPassword = currentPasswordInput.value;
        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Validate all fields
        const currentPasswordError = validateCurrentPassword(currentPassword);
        const newPasswordError = validateNewPassword(newPassword, currentPassword);
        const confirmPasswordError = validateConfirmPassword(confirmPassword, newPassword);

        // Display error messages
        document.getElementById('currentPasswordError').textContent = currentPasswordError;
        document.getElementById('newPasswordError').textContent = newPasswordError;
        document.getElementById('confirmPasswordError').textContent = confirmPasswordError;

        // If no errors, proceed with password change
        if (!currentPasswordError && !newPasswordError && !confirmPasswordError) {
            const submitBtn = changePasswordForm.querySelector('.submit-btn');
            submitBtn.textContent = 'Changing Password...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                // Reset form
                changePasswordForm.reset();
                
                // Reset password strength indicator
                strengthIndicator.style.width = '0';
                strengthIndicator.className = 'strength-indicator';
                strengthText.textContent = 'Password Strength';
                
                // Reset requirement indicators
                requirements.forEach(requirement => {
                    requirement.classList.remove('valid');
                    requirement.querySelector('i').style.color = '#ccc';
                });

                // Show success message and redirect
                alert('Password changed successfully! Please log in with your new password.');
                window.location.href = 'login.html';
            }, 1500);
        }
    });
});
