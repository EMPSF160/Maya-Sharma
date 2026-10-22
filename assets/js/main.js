// Immediate Theme & Palette Check (Runs synchronously before DOM renders)
(function () {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (document.body) document.body.setAttribute('data-theme', savedTheme);

    const savedPalette = localStorage.getItem('site-palette') || 'nature';
    document.documentElement.setAttribute('data-palette', savedPalette);
    if (document.body) document.body.setAttribute('data-palette', savedPalette);
})();

document.addEventListener('DOMContentLoaded', () => {
    // 0. Global Header Injection
    const renderHeader = () => {
        const headerHTML = `
        <div class="container nav-container">
            <a href="index.html" class="logo"><i class="ri-sparkling-fill"></i> Story<span>Tail</span></a>

            <ul class="nav-links">
                <li><a href="index.html" class="nav-link" data-page="index.html">Home</a></li>
                <li><a href="about.html" class="nav-link" data-page="about.html">About</a></li>
                <li><a href="services.html" class="nav-link" data-page="services.html">Books</a></li>
                <li><a href="blog.html" class="nav-link" data-page="blog.html">Blog</a></li>
                <li><a href="pricing.html" class="nav-link" data-page="pricing.html">Visits</a></li>
                <li><a href="contact.html" class="nav-link" data-page="contact.html">Contact</a></li>
                <li><a href="login.html" class="btn btn-primary" data-page="login.html">Login</a></li>
            </ul>

            <div class="nav-right">
                <!-- Live Theme Palette Picker -->
                <div class="palette-picker-container">
                    <button class="palette-toggle" id="paletteToggleBtn" aria-label="Choose Story Theme" title="Choose Story Theme">
                        <i class="ri-palette-line"></i>
                        <span class="palette-current-indicator"></span>
                    </button>
                    <div class="palette-dropdown" id="paletteDropdown" role="dialog" aria-label="Theme Color Options">
                        <div class="palette-dropdown-header">
                            <span><i class="ri-sparkling-2-fill"></i> Storybook Colors</span>
                            <span style="font-size: 0.72rem; color: var(--text-muted); font-weight: normal;">Live Themes</span>
                        </div>
                        <div class="palette-options">
                            <button type="button" class="palette-option" data-palette-choice="nature">
                                <div class="palette-preview">
                                    <span style="background: #1B998B;"></span>
                                    <span style="background: #52B788;"></span>
                                    <span style="background: #FF9F1C;"></span>
                                    <span style="background: #E76F51;"></span>
                                </div>
                                <div class="palette-info">
                                    <span class="palette-name">🌿 Enchanted Nature</span>
                                    <span class="palette-desc">Forest Teal, Honey &amp; Berry</span>
                                </div>
                                <i class="ri-check-line palette-check"></i>
                            </button>
                            <button type="button" class="palette-option" data-palette-choice="storybook">
                                <div class="palette-preview">
                                    <span style="background: #FF5E5B;"></span>
                                    <span style="background: #00CECB;"></span>
                                    <span style="background: #FFB800;"></span>
                                    <span style="background: #2EC4B6;"></span>
                                </div>
                                <div class="palette-info">
                                    <span class="palette-name">🌈 Vibrant Storybook</span>
                                    <span class="palette-desc">Coral Punch &amp; Sky Cyan</span>
                                </div>
                                <i class="ri-check-line palette-check"></i>
                            </button>
                            <button type="button" class="palette-option" data-palette-choice="starlight">
                                <div class="palette-preview">
                                    <span style="background: #6C5CE7;"></span>
                                    <span style="background: #A29BFE;"></span>
                                    <span style="background: #FFA726;"></span>
                                    <span style="background: #FD79A8;"></span>
                                </div>
                                <div class="palette-info">
                                    <span class="palette-name">✨ Magical Starlight</span>
                                    <span class="palette-desc">Dream Purple &amp; Amber</span>
                                </div>
                                <i class="ri-check-line palette-check"></i>
                            </button>
                            <button type="button" class="palette-option" data-palette-choice="pastel">
                                <div class="palette-preview">
                                    <span style="background: #FF758F;"></span>
                                    <span style="background: #72EFDD;"></span>
                                    <span style="background: #FFD166;"></span>
                                    <span style="background: #80ED99;"></span>
                                </div>
                                <div class="palette-info">
                                    <span class="palette-name">🌸 Pastel Dream</span>
                                    <span class="palette-desc">Sweet Rosé &amp; Buttercup</span>
                                </div>
                                <i class="ri-check-line palette-check"></i>
                            </button>
                            <button type="button" class="palette-option" data-palette-choice="ocean">
                                <div class="palette-preview">
                                    <span style="background: #0077B6;"></span>
                                    <span style="background: #48CAE4;"></span>
                                    <span style="background: #FF7A00;"></span>
                                    <span style="background: #06D6A0;"></span>
                                </div>
                                <div class="palette-info">
                                    <span class="palette-name">🌊 Ocean Adventure</span>
                                    <span class="palette-desc">Deep Azure &amp; Coral Reef</span>
                                </div>
                                <i class="ri-check-line palette-check"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <button class="rtl-toggle" style="background: var(--primary); color: white; border: none; padding: 0.4rem 0.8rem; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 0.8rem; font-family: 'Fredoka', sans-serif;">RTL</button>
                <button class="theme-toggle" aria-label="Toggle Dark/Light Mode"><i class="ri-moon-line"></i></button>
                <button class="menu-btn" aria-label="Toggle Menu">
                    <i class="ri-menu-3-line"></i>
                </button>
            </div>
        </div>
        `;

        const mobileMenuHTML = `
        <div class="mobile-menu-overlay"></div>
        <div class="nav-links-mobile">
            <button class="close-menu"><i class="ri-close-line"></i></button>
            <a href="index.html" class="mobile-nav-link" data-page="index.html">Home</a>
            <a href="about.html" class="mobile-nav-link" data-page="about.html">About</a>
            <a href="services.html" class="mobile-nav-link" data-page="services.html">Books</a>
            <a href="blog.html" class="mobile-nav-link" data-page="blog.html">Blog</a>
            <a href="pricing.html" class="mobile-nav-link" data-page="pricing.html">Visits</a>
            <a href="contact.html" class="mobile-nav-link" data-page="contact.html">Contact</a>
            <a href="login.html" class="btn btn-primary mobile-login-btn" data-page="login.html">Login</a>
            <div class="mobile-nav-actions">
                <button class="theme-toggle mobile-theme-toggle" aria-label="Toggle Theme"><i class="ri-moon-line"></i></button>
                <button class="palette-toggle mobile-palette-toggle" aria-label="Toggle Theme Palette"><i class="ri-palette-line"></i></button>
                <button class="rtl-toggle mobile-rtl-toggle">RTL</button>
            </div>
            <div class="mobile-palette-section">
                <h4><i class="ri-palette-line" style="color: var(--primary);"></i> Color Palettes</h4>
                <div class="mobile-palette-grid">
                    <button type="button" class="palette-option" data-palette-choice="nature">
                        <div class="palette-preview">
                            <span style="background: #1B998B;"></span>
                            <span style="background: #52B788;"></span>
                            <span style="background: #FF9F1C;"></span>
                            <span style="background: #E76F51;"></span>
                        </div>
                        <div class="palette-info">
                            <span class="palette-name">🌿 Enchanted Nature</span>
                        </div>
                        <i class="ri-check-line palette-check"></i>
                    </button>
                    <button type="button" class="palette-option" data-palette-choice="storybook">
                        <div class="palette-preview">
                            <span style="background: #FF5E5B;"></span>
                            <span style="background: #00CECB;"></span>
                            <span style="background: #FFB800;"></span>
                            <span style="background: #2EC4B6;"></span>
                        </div>
                        <div class="palette-info">
                            <span class="palette-name">🌈 Vibrant Storybook</span>
                        </div>
                        <i class="ri-check-line palette-check"></i>
                    </button>
                    <button type="button" class="palette-option" data-palette-choice="starlight">
                        <div class="palette-preview">
                            <span style="background: #6C5CE7;"></span>
                            <span style="background: #A29BFE;"></span>
                            <span style="background: #FFA726;"></span>
                            <span style="background: #FD79A8;"></span>
                        </div>
                        <div class="palette-info">
                            <span class="palette-name">✨ Magical Starlight</span>
                        </div>
                        <i class="ri-check-line palette-check"></i>
                    </button>
                    <button type="button" class="palette-option" data-palette-choice="pastel">
                        <div class="palette-preview">
                            <span style="background: #FF758F;"></span>
                            <span style="background: #72EFDD;"></span>
                            <span style="background: #FFD166;"></span>
                            <span style="background: #80ED99;"></span>
                        </div>
                        <div class="palette-info">
                            <span class="palette-name">🌸 Pastel Dream</span>
                        </div>
                        <i class="ri-check-line palette-check"></i>
                    </button>
                    <button type="button" class="palette-option" data-palette-choice="ocean">
                        <div class="palette-preview">
                            <span style="background: #0077B6;"></span>
                            <span style="background: #48CAE4;"></span>
                            <span style="background: #FF7A00;"></span>
                            <span style="background: #06D6A0;"></span>
                        </div>
                        <div class="palette-info">
                            <span class="palette-name">🌊 Ocean Adventure</span>
                        </div>
                        <i class="ri-check-line palette-check"></i>
                    </button>
                </div>
            </div>
        </div>
        `;

        const isPortfolioPage = document.querySelector('.portfolio-page-wrapper') !== null;
        const isLoginPage = window.location.pathname.includes('login.html') || window.location.pathname.includes('register.html');
        const nav = document.querySelector('.navbar');
        if (nav && !isLoginPage && !isPortfolioPage) {
            nav.innerHTML = headerHTML;
            // Inject mobile menu logic too
            if (!document.querySelector('.nav-links-mobile')) {
                nav.insertAdjacentHTML('afterend', mobileMenuHTML);
            }
        } else if (nav) {
            nav.style.display = 'none'; // Hide placeholder if present
        }

        // Set Active class
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll(`[data-page="${currentPath}"]`).forEach(link => {
            link.classList.add('active');
        });
    };

    const renderFooter = () => {
        const footerHTML = `
        <!-- Premium Call to Adventure Section -->
        <section class="premium-cta-section" style="background: var(--bg-white); border-top: 1px solid var(--border); padding: 4rem 0 0;">
            <div class="container">
                <div class="premium-cta-card reveal">
                    <div class="cta-content">
                        <span class="hero-tag mb-1">✨ Write Your Story</span>
                        <h2 class="mb-2">Ready to Start Your Journey?</h2>
                        <p class="mb-3 mx-auto text-center" style="max-width: 700px; margin-left: auto; margin-right: auto; text-align: center;">Explore a world where every page is a doorway to
                            adventure. From whimsical picture books to interactive digital stories, find your next favorite
                            bedtime companion today.</p>
                        <div class="flex-gap-sm justify-center mt-3">
                            <a href="services.html" class="btn btn-primary">Browse All Books <i
                                    class="ri-book-3-line"></i></a>
                            <a href="services.html" class="btn btn-outline" style="border-color: #ffffff;">Free
                                Activities</a>
                        </div>
                    </div>
                    <!-- Floating Decorative Assets -->
                    <div class="cta-icon-float cta-book"><i class="ri-book-open-line"></i></div>
                    <div class="cta-icon-float cta-star"><i class="ri-star-smile-fill"></i></div>
                </div>
            </div>
        </section>

        <div class="container footer-grid mb-3 reveal" style="padding-top: 6rem; padding-bottom: 3rem;">
            <div class="footer-about">
                <a href="index.html" class="logo"><i class="ri-sparkling-fill"></i> Story<span>Tail</span></a>
                <p class="mt-1" style="color: var(--text-muted);">Unlocking worlds of wonder and imagination for little readers everywhere. Let's make every bedtime a magical adventure.</p>
                <div class="social-links">
                    <a href="#" class="social-icon" aria-label="Facebook"><i class="ri-facebook-fill"></i></a>
                    <a href="#" class="social-icon" aria-label="Instagram"><i class="ri-instagram-line"></i></a>
                    <a href="#" class="social-icon" aria-label="Twitter"><i class="ri-twitter-fill"></i></a>
                </div>
            </div>
            <div>
                <h4>Explore</h4>
                <ul class="footer-links">
                    <li><a href="services.html">All Books</a></li>
                    <li><a href="about.html">Author Journey</a></li>
                    <li><a href="blog.html">Blog Posts</a></li>
                    <li><a href="activity.html">Activity Sheets</a></li>
                </ul>
            </div>
            <div>
                <h4>Support</h4>
                <ul class="footer-links">
                    <li><a href="contact.html">Contact Us</a></li>
                    <li><a href="faq.html">FAQ</a></li>
                    <li><a href="privacy.html">Privacy Policy</a></li>
                </ul>
            </div>
            <div>
                <h4>Contact</h4>
                <ul class="footer-links" style="color: var(--text-muted);">
                    <li><i class="ri-mail-line"></i> hello@storytail.com</li>
                    <li><i class="ri-map-pin-line"></i> 123 Dreamy Lane, Storyville</li>
                    <li><i class="ri-phone-line"></i> +1 234 567 890</li>
                </ul>
            </div>
        </div>
        <div class="container py-2 text-center"
            style="border-top: 1px solid var(--border); color: var(--text-muted); font-size: 0.85rem; padding: 2rem 0;">
            &copy; 2026 StoryTail by [Author Name]. All rights reserved.
        </div>
        `;

        const footer = document.querySelector('footer');
        const isPortfolioPage = document.querySelector('.portfolio-page-wrapper') !== null;
        const isLoginPage = window.location.pathname.includes('login.html') || window.location.pathname.includes('register.html');

        if (footer && !isLoginPage && !isPortfolioPage) {
            footer.innerHTML = footerHTML;
            footer.style.display = 'block'; // Ensure footer is visible
        }
    };

    renderHeader();
    renderFooter();

    // 1. Preloader
    const preloader = document.querySelector('#preloader');
    if (preloader) {
        preloader.style.display = 'none';
    }

    // 2. Sticky Navbar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 3. Theme & RTL Toggles
    const rtlToggles = document.querySelectorAll('.rtl-toggle');
    const body = document.body;
    const html = document.documentElement;

    function getActiveTheme() {
        return html.getAttribute('data-theme') || body.getAttribute('data-theme') || localStorage.getItem('theme') || 'light';
    }

    function updateThemeIcons(theme) {
        const isDark = theme === 'dark';
        document.querySelectorAll('.theme-toggle').forEach(toggle => {
            const icon = toggle.querySelector('i');
            if (icon) {
                icon.className = isDark ? 'ri-sun-line' : 'ri-moon-line';
            }
            const label = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
            toggle.setAttribute('aria-label', label);
            toggle.setAttribute('title', label);
        });
    }

    function applyTheme(theme) {
        body.setAttribute('data-theme', theme);
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeIcons(theme);
    }

    // Sync theme and all icons on load
    applyTheme(getActiveTheme());

    // Unified click handler with event delegation (handles all current and injected theme toggles)
    document.addEventListener('click', (e) => {
        const toggleBtn = e.target.closest('.theme-toggle');
        if (toggleBtn) {
            e.preventDefault();
            const currentTheme = getActiveTheme();
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(nextTheme);
        }
    });

    // 3b. Theme Palette Switcher
    const initPaletteSwitcher = () => {
        const paletteToggleBtns = document.querySelectorAll('.palette-toggle');
        const paletteDropdown = document.querySelector('#paletteDropdown');
        const paletteOptions = document.querySelectorAll('.palette-option');
        const currentPalette = localStorage.getItem('site-palette') || 'nature';

        const applyPalette = (palette) => {
            document.documentElement.setAttribute('data-palette', palette);
            document.body.setAttribute('data-palette', palette);
            localStorage.setItem('site-palette', palette);

            paletteOptions.forEach(opt => {
                if (opt.getAttribute('data-palette-choice') === palette) {
                    opt.classList.add('active');
                } else {
                    opt.classList.remove('active');
                }
            });
        };

        // Apply saved palette on initialize
        applyPalette(currentPalette);

        // Desktop palette dropdown toggle
        paletteToggleBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (paletteDropdown) {
                    paletteDropdown.classList.toggle('active');
                }
            });
        });

        // Close dropdown on outside click
        document.addEventListener('click', (e) => {
            if (paletteDropdown && !paletteDropdown.contains(e.target) && !e.target.closest('.palette-toggle')) {
                paletteDropdown.classList.remove('active');
            }
        });

        // Close dropdown on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && paletteDropdown) {
                paletteDropdown.classList.remove('active');
            }
        });

        // Palette option click handlers (both desktop popover and mobile drawer)
        paletteOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const choice = option.getAttribute('data-palette-choice');
                if (choice) {
                    applyPalette(choice);
                    if (paletteDropdown) {
                        paletteDropdown.classList.remove('active');
                    }
                }
            });
        });
    };

    initPaletteSwitcher();

    // Check RTL local storage
    const currentRtl = localStorage.getItem('rtl') === 'true';
    if (currentRtl) {
        html.setAttribute('dir', 'rtl');
    }

    rtlToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const isRtl = html.getAttribute('dir') === 'rtl';
            if (isRtl) {
                html.removeAttribute('dir');
                localStorage.setItem('rtl', 'false');
            } else {
                html.setAttribute('dir', 'rtl');
                localStorage.setItem('rtl', 'true');
            }
        });
    });

    // 4. Scroll Reveal (Intersection Observer)
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealItems = document.querySelectorAll('.reveal, .premium-reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealItems.forEach(item => {
        // Ensure items are visible by default
        if (!item.classList.contains('premium-reveal')) {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
            item.style.transition = "all 0.8s ease-out";
        }
        revealObserver.observe(item);
    });

    // Custom Scroll Reveal class logic
    window.addEventListener('scroll', () => {
        document.querySelectorAll('.reveal, .premium-reveal').forEach(el => {
            const pos = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (pos < windowHeight * 0.85) {
                el.classList.add('active');
                if (!el.classList.contains('premium-reveal')) {
                    el.style.opacity = "1";
                    el.style.transform = "translateY(0)";
                }
            }
        });
    });

    // 5. Book Filter (For services.html)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const bookItems = document.querySelectorAll('.book-item');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Active class
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                bookItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => item.style.opacity = '1', 50);
                    } else {
                        item.style.opacity = '0';
                        setTimeout(() => item.style.display = 'none', 400);
                    }
                });
            });
        });
    }

    // 6. Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const mobileMenu = document.querySelector('.nav-links-mobile');
    const closeBtn = document.querySelector('.close-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            overlay.classList.add('active');
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    // 7. Form Validation (Generic)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            if (form.getAttribute('action') === '#') {
                e.preventDefault();
                alert('Thank you! This is a placeholder for form submission.');
                form.reset();
            }
        });
    });

    // 8. Countdown (For coming-soon.html)
    const countdown = document.querySelector('.countdown');
    if (countdown) {
        let timeLeft = 30 * 24 * 60 * 60; // 30 days
        const timer = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timer);
                return;
            }
            timeLeft--;
            const days = Math.floor(timeLeft / (24 * 3600));
            const hours = Math.floor((timeLeft % (24 * 3600)) / 3600);
            const minutes = Math.floor((timeLeft % 3600) / 60);
            const seconds = timeLeft % 60;

            const daysEl = document.querySelector('#days');
            const hoursEl = document.querySelector('#hours');
            const minsEl = document.querySelector('#mins');
            const secsEl = document.querySelector('#secs');

            if (daysEl) daysEl.innerText = days.toString().padStart(2, '0');
            if (hoursEl) hoursEl.innerText = hours.toString().padStart(2, '0');
            if (minsEl) minsEl.innerText = minutes.toString().padStart(2, '0');
            if (secsEl) secsEl.innerText = seconds.toString().padStart(2, '0');
        }, 1000);
    }
});
