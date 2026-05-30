tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                heading: ['var(--font-heading-name)', 'sans-serif'],
                body: ['var(--font-body-name)', 'sans-serif'],
            },
            colors: {
                primary: '#0066FF',
                secondary: '#0A1930',
                accent: '#00AEEF',
            },
            spacing: {
                base: 'var(--space-base)',
            },
            borderRadius: {
                small: 'var(--radius-small)',
                large: 'var(--radius-large)',
            },
            boxShadow: {
                custom: 'var(--shadow-custom)',
                'custom-hover': 'var(--shadow-custom-hover)',
            }
        }
    }
}

// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const html = document.documentElement;

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        html.classList.add('dark');
    }

    function toggleTheme() {
        html.classList.toggle('dark');
        const theme = html.classList.contains('dark') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);

        // Update Lucide icons
        lucide.createIcons();
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', toggleTheme);
    }
});

// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');
    const openIcon = document.querySelector('.mobile-menu-open-icon');
    const closeIcon = document.querySelector('.mobile-menu-close-icon');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function (event) {
            event.stopPropagation();
            const isOpen = !mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden');
            mobileMenuBtn.setAttribute('aria-expanded', String(!isOpen));

            if (openIcon && closeIcon) {
                openIcon.classList.toggle('hidden');
                closeIcon.classList.toggle('hidden');
            }

            lucide.createIcons();
        });

        // Close mobile menu when clicking any mobile nav link
        mobileMenu.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', function () {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                if (openIcon && closeIcon) {
                    openIcon.classList.remove('hidden');
                    closeIcon.classList.add('hidden');
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function (event) {
            if (mobileMenu && !navbar.contains(event.target)) {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                if (openIcon && closeIcon) {
                    openIcon.classList.remove('hidden');
                    closeIcon.classList.add('hidden');
                }
            }
        });
    }
});

// Contact Form Submission
window.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contact-form');
    const contactName = document.getElementById('contact-name');
    const contactPhone = document.getElementById('contact-phone');
    const contactEmail = document.getElementById('contact-email');
    const contactMessage = document.getElementById('contact-message');
    const contactFeedback = document.getElementById('contact-feedback');

    if (contactForm && contactName && contactEmail && contactMessage && contactFeedback) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            contactFeedback.textContent = '';
            contactFeedback.classList.remove('text-red-500', 'text-emerald-500');

            const nameValue = contactName.value.trim();
            const emailValue = contactEmail.value.trim();
            const messageValue = contactMessage.value.trim();

            if (!nameValue || !emailValue || !messageValue) {
                contactFeedback.textContent = 'Please provide your name, email, and a short message.';
                contactFeedback.classList.add('text-red-500');
                return;
            }

            const subject = encodeURIComponent(`New message from ${nameValue}`);
            const body = encodeURIComponent(
                `Name: ${nameValue}\nPhone: ${contactPhone.value.trim() || 'N/A'}\nEmail: ${emailValue}\n\nMessage:\n${messageValue}`
            );
            const mailtoLink = `mailto:m7abdelmajeed@gmail.com?subject=${subject}&body=${body}`;

            contactFeedback.textContent = 'Preparing your message...';
            contactFeedback.classList.add('text-emerald-500');
            window.location.href = mailtoLink;
        });
    }
});

// Scroll Progress Bar
document.addEventListener('DOMContentLoaded', function () {
    const scrollProgress = document.getElementById('scroll-progress');

    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        if (scrollProgress) {
            scrollProgress.style.width = scrollPercent + '%';
        }
    }

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress(); // Initial call
});

// Back to Top Button
document.addEventListener('DOMContentLoaded', function () {
    const backToTopBtn = document.getElementById('back-to-top');

    function toggleBackToTop() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        } else {
            backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        }
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    if (backToTopBtn) {
        window.addEventListener('scroll', toggleBackToTop);
        backToTopBtn.addEventListener('click', scrollToTop);
    }
});

// Smooth Scrolling for Anchor Links
document.addEventListener('DOMContentLoaded', function () {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Navbar Background on Scroll
document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;

    function updateNavbar() {
        const scrollTop = window.pageYOffset;

        if (scrollTop > 50) {
            navbar.classList.add('bg-white/95', 'dark:bg-[#0B0F19]/95', 'backdrop-blur-md');
            navbar.classList.remove('bg-white/70', 'dark:bg-[#0B0F19]/70');
        } else {
            navbar.classList.remove('bg-white/95', 'dark:bg-[#0B0F19]/95', 'backdrop-blur-md');
            navbar.classList.add('bg-white/70', 'dark:bg-[#0B0F19]/70');
        }

        lastScrollTop = scrollTop;
    }

    window.addEventListener('scroll', updateNavbar);
    updateNavbar(); // Initial call
});

// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', function () {
    lucide.createIcons();
});