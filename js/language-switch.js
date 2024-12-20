document.addEventListener('DOMContentLoaded', () => {
    const languageSelector = document.getElementById('languageSelector');
    const directionElements = document.querySelectorAll('[data-direction]');

    // Language configurations
    const languages = {
        'en': {
            direction: 'ltr',
            name: 'English'
        },
        'ar': {
            direction: 'rtl',
            name: 'العربية'
        }
    };

    // Initialize language from localStorage or default to English
    const currentLang = localStorage.getItem('selectedLanguage') || 'en';
    document.documentElement.lang = currentLang;
    document.documentElement.dir = languages[currentLang].direction;

    // Handle language change
    if (languageSelector) {
        languageSelector.value = currentLang;
        
        languageSelector.addEventListener('change', (e) => {
            const selectedLang = e.target.value;
            document.documentElement.lang = selectedLang;
            document.documentElement.dir = languages[selectedLang].direction;
            localStorage.setItem('selectedLanguage', selectedLang);

            // Update direction for specific elements
            directionElements.forEach(element => {
                element.dir = languages[selectedLang].direction;
            });

            // Reload page to apply translations
            window.location.reload();
        });
    }

    // Add keyboard layout indicator
    const keyboardIndicator = document.createElement('div');
    keyboardIndicator.className = 'keyboard-indicator';
    keyboardIndicator.textContent = 'Current Layout: ' + (currentLang === 'ar' ? 'Arabic' : 'English');
    document.body.appendChild(keyboardIndicator);

    // Handle keyboard layout detection
    document.addEventListener('keydown', (e) => {
        // Simple detection based on character codes
        const isArabic = /[\u0600-\u06FF]/.test(e.key);
        keyboardIndicator.textContent = 'Current Layout: ' + (isArabic ? 'Arabic' : 'English');
    });
});
