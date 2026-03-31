/**
 * Corporate Investigation Firm - Main Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initRTL();
    initAnimations();
    initMobileMenu();
    initBackToTop();
});

// Theme Management
function initTheme() {
    const themeToggles = document.querySelectorAll('#theme-toggle, .theme-toggle-btn, #drawer-theme-toggle');
    const storedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', storedTheme);

    const updateIcons = (theme) => {
        themeToggles.forEach(toggle => {
            const icon = toggle.querySelector('i');
            if (icon) {
                if (theme === 'dark') {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                } else {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                }
            }
        });
    };

    updateIcons(storedTheme);

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateIcons(newTheme);
        });
    });
}

// RTL Management
function initRTL() {
    const rtlToggles = document.querySelectorAll('#rtl-toggle, #drawer-rtl-toggle');
    const storedRTL = localStorage.getItem('rtl') === 'true';
    if (storedRTL) document.documentElement.setAttribute('dir', 'rtl');

    rtlToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
            const newRTL = !isRTL;
            document.documentElement.setAttribute('dir', newRTL ? 'rtl' : 'ltr');
            localStorage.setItem('rtl', newRTL);
        });
    });
}

// Mobile Drawer Menu
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const drawer = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('mobile-drawer-overlay');
    const closeBtn = document.getElementById('close-drawer');

    const openDrawer = () => {
        if (!drawer || !overlay) return;
        overlay.classList.remove('hidden');
        // Let CSS block display apply before animating opacity
        setTimeout(() => {
            overlay.classList.remove('opacity-0');
            drawer.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden';
        }, 10);
    };

    const closeDrawer = () => {
        if (!drawer || !overlay) return;
        overlay.classList.add('opacity-0');
        drawer.classList.add('translate-x-full');
        document.body.style.overflow = '';
        setTimeout(() => {
            overlay.classList.add('hidden');
        }, 300);
    };

    if (hamburger) {
        hamburger.addEventListener('click', openDrawer);
    }
    if (closeBtn) {
        closeBtn.addEventListener('click', closeDrawer);
    }
    if (overlay) {
        overlay.addEventListener('click', closeDrawer);
    }
}

// Observer for Intelligence Fade
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-intelligence');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    if (!backToTopButton) return;

    const toggleButtonVisibility = () => {
        const shouldShow = window.scrollY > 400;
        backToTopButton.classList.toggle('opacity-0', !shouldShow);
        backToTopButton.classList.toggle('invisible', !shouldShow);
        backToTopButton.classList.toggle('translate-y-4', !shouldShow);
        backToTopButton.classList.toggle('pointer-events-none', !shouldShow);
    };

    toggleButtonVisibility();
    window.addEventListener('scroll', toggleButtonVisibility, { passive: true });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Drawer Home Dropdown Accordion
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.drawer-dd-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const dd = trigger.closest('.drawer-dropdown');
            const panel = dd.querySelector('.drawer-dd-panel');
            const icon = dd.querySelector('.drawer-dd-icon');
            const isOpen = panel.style.maxHeight && panel.style.maxHeight !== '0px';
            if (isOpen) {
                panel.style.maxHeight = '0px';
                icon.style.transform = 'rotate(0deg)';
            } else {
                panel.style.maxHeight = panel.scrollHeight + 'px';
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
});
