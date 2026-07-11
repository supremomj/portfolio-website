// Lazy Loading for Images
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('.lazyload');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;

                    if (img.tagName === 'IMG') {
                        img.src = img.dataset.src;
                        img.classList.remove('lazyload');
                    } else if (img.style.backgroundImage) {
                        const bgUrl = img.dataset.bg;
                        if (bgUrl) {
                            img.style.backgroundImage = `url("${bgUrl}")`;
                            img.classList.remove('lazyload');
                        }
                    }

                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            if (img.tagName === 'IMG') {
                img.src = img.dataset.src;
            } else if (img.dataset.bg) {
                img.style.backgroundImage = `url("${img.dataset.bg}")`;
            }
            img.classList.remove('lazyload');
        });
    }
}

// Initialize dark mode on page load
function initDarkMode() {
    const isDark = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = isDark === null ? prefersDark : isDark === 'true';

    if (shouldBeDark) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    updateThemeIcon();
}

function updateThemeIcon() {
    const icons = document.querySelectorAll('.dark-mode-icon');
    const isDark = document.documentElement.classList.contains('dark');
    icons.forEach(icon => {
        icon.textContent = isDark ? 'dark_mode' : 'light_mode';
    });
}

function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('darkMode', isDark);
    updateThemeIcon();
}

// ===== SEASONAL EFFECTS =====
function initSeasonalEffects() {
    const now = new Date();
    const month = now.getMonth();
    const day = now.getDate();

    // Christmas: December 20 - December 25 (Snow effect)
    if (month === 11 && day >= 20 && day <= 25) {
        initSnowEffect();
    }
    // New Year: December 31 - January 2 (Fireworks effect)
    else if ((month === 11 && day === 31) || (month === 0 && day <= 2)) {
        initFireworksEffect();
    }
    // Halloween: October 25 - October 31 (Floating pumpkins)
    else if (month === 9 && day >= 25 && day <= 31) {
        initHalloweenEffect();
    }
    // Valentine's Day: February 10 - February 18 (Floating hearts)
    else if (month === 1 && day >= 10 && day <= 18) {
        initValentinesEffect();
    }
    // Graduation/Spring: March 1 - April 30 (Confetti/Flowers)
    else if (month === 2 || month === 3) {
        initGraduationEffect();
    }
    // Summer: June 20 - August 31 (Sunny vibe with subtle particles)
    else if (month >= 5 && month <= 7) {
        initSummerEffect();
    }
}

// Snow effect for Christmas
function initSnowEffect() {
    const snowflakes = ['❄️', '❅', '❆', '⛄'];

    function createSnowflake() {
        const snowflake = document.createElement('div');
        const flakeChar = snowflakes[Math.floor(Math.random() * snowflakes.length)];
        snowflake.textContent = flakeChar;
        snowflake.className = 'snowflake';

        const randomLeft = Math.random() * 100;
        const duration = Math.random() * 8 + 5;
        const delay = Math.random() * 2;

        snowflake.style.left = randomLeft + '%';
        snowflake.style.animationDuration = duration + 's';
        snowflake.style.animationDelay = delay + 's';

        // Alternate between left and right direction
        if (Math.random() > 0.5) {
            snowflake.classList.add('animate-snowfall');
        } else {
            snowflake.classList.add('animate-snowfall-left');
        }

        document.body.appendChild(snowflake);

        setTimeout(() => snowflake.remove(), (duration + delay) * 1000);
    }

    // Create snowflakes continuously
    setInterval(createSnowflake, 300);

    // Initial batch
    for (let i = 0; i < 10; i++) {
        setTimeout(createSnowflake, i * 100);
    }
}

// Fireworks effect for New Year
function initFireworksEffect() {
    function createFireworks(x, y) {
        const colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C', '#FF006E'];
        const particleCount = 30;

        for (let i = 0; i < particleCount; i++) {
            const firework = document.createElement('div');
            firework.className = 'firework';

            const angle = (i / particleCount) * Math.PI * 2;
            const velocity = 5 + Math.random() * 8;
            const tx = Math.cos(angle) * velocity * 50;
            const ty = Math.sin(angle) * velocity * 50;

            firework.style.left = x + 'px';
            firework.style.top = y + 'px';
            firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            firework.style.setProperty('--tx', tx + 'px');
            firework.style.setProperty('--ty', ty + 'px');

            document.body.appendChild(firework);

            setTimeout(() => firework.remove(), 1000);
        }
    }

    // Trigger fireworks on click and automatically
    document.addEventListener('click', (e) => {
        createFireworks(e.clientX, e.clientY);
    });

    // Auto fireworks every 3-5 seconds
    setInterval(() => {
        const randomX = Math.random() * window.innerWidth;
        const randomY = Math.random() * (window.innerHeight * 0.5);
        createFireworks(randomX, randomY);
    }, Math.random() * 2000 + 3000);
}

// Halloween effect
function initHalloweenEffect() {
    const decorations = ['🎃', '👻', '🦇'];

    for (let i = 0; i < 5; i++) {
        const decoration = document.createElement('div');
        decoration.className = 'seasonal-decoration';
        decoration.textContent = decorations[Math.floor(Math.random() * decorations.length)];

        const randomX = Math.random() * (window.innerWidth - 50);
        const randomY = Math.random() * (window.innerHeight - 50);
        const delay = Math.random() * 2;

        decoration.style.left = randomX + 'px';
        decoration.style.top = randomY + 'px';
        decoration.style.animationDelay = delay + 's';

        document.body.appendChild(decoration);
    }
}

// Valentine's Day effect
function initValentinesEffect() {
    const hearts = ['❤️', '💕', '💖'];

    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'snowflake';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

        const randomLeft = Math.random() * 100;
        const duration = Math.random() * 6 + 4;
        const delay = Math.random() * 2;

        heart.style.left = randomLeft + '%';
        heart.style.animationDuration = duration + 's';
        heart.style.animationDelay = delay + 's';
        heart.classList.add('animate-snowfall');
        heart.style.color = '#ff69b4';

        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), (duration + delay) * 1000);
    }

    // Create hearts continuously
    setInterval(createHeart, 400);

    for (let i = 0; i < 8; i++) {
        setTimeout(createHeart, i * 150);
    }
}

// Graduation/Spring effect
function initGraduationEffect() {
    const symbols = ['🎓', '🌸', '✨', '⭐'];

    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.className = 'snowflake';
        confetti.textContent = symbols[Math.floor(Math.random() * symbols.length)];

        const randomLeft = Math.random() * 100;
        const duration = Math.random() * 6 + 4;
        const delay = Math.random() * 2;

        confetti.style.left = randomLeft + '%';
        confetti.style.animationDuration = duration + 's';
        confetti.style.animationDelay = delay + 's';

        if (Math.random() > 0.5) {
            confetti.classList.add('animate-snowfall');
        } else {
            confetti.classList.add('animate-snowfall-left');
        }

        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), (duration + delay) * 1000);
    }

    // Create confetti periodically
    setInterval(createConfetti, 500);

    // Initial burst
    for (let i = 0; i < 15; i++) {
        setTimeout(createConfetti, i * 100);
    }
}

// Summer effect with subtle sunny particles
function initSummerEffect() {
    const sunIcon = document.createElement('div');
    sunIcon.style.cssText = `
        position: fixed;
        font-size: 3em;
        opacity: 0.1;
        top: 20px;
        right: 20px;
        z-index: 5;
        pointer-events: none;
        animation: float 6s ease-in-out infinite;
    `;
    sunIcon.textContent = '☀️';
    document.body.appendChild(sunIcon);
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function () {
    // Initialize lazy loading
    initLazyLoading();

    // Initialize dark mode
    initDarkMode();

    // Initialize seasonal effects
    initSeasonalEffects();

    // Dark mode toggle buttons
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    if (themeToggle) themeToggle.addEventListener('click', toggleDarkMode);
    if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleDarkMode);

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuIcon = mobileMenuBtn ? mobileMenuBtn.querySelector('span') : null;
    const body = document.body;

    if (mobileMenuBtn && mobileMenu) {
        function toggleMenu() {
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);

            if (!isExpanded) {
                // Open menu
                mobileMenu.classList.remove('translate-x-full');
                mobileMenuIcon.textContent = 'close';
                mobileMenuIcon.classList.add('rotate-90');
                body.style.overflow = 'hidden'; // Prevent scrolling
            } else {
                // Close menu
                mobileMenu.classList.add('translate-x-full');
                mobileMenuIcon.textContent = 'menu';
                mobileMenuIcon.classList.remove('rotate-90');
                body.style.overflow = ''; // Restore scrolling
            }
        }

        mobileMenuBtn.addEventListener('click', toggleMenu);

        // Close menu when clicking a link
        const navLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mobileMenuBtn.getAttribute('aria-expanded') === 'true') {
                    toggleMenu();
                }
            });
        });

        // Close menu on resize to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768 && mobileMenuBtn.getAttribute('aria-expanded') === 'true') {
                toggleMenu();
            }
        });
    }

    // Smooth scroll for navigation links
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

    // Load sections dynamically
    loadSections();

    // Initialize project filters after sections load
    setTimeout(() => {
        initProjectFilters();
        initProjectAnimations();
        initProjectModals();
        initLazyLoading(); // Re-initialize lazy loading after sections load
    }, 500);
});

// Function to load section content with stale-while-revalidate local caching
async function loadSections() {
    const sections = [
        { id: 'hero-content', file: 'sections/hero.html' },
        { id: 'about-content', file: 'sections/about.html' },
        { id: 'projects-content', file: 'sections/projects.html' },
        { id: 'experience-content', file: 'sections/experience.html' },
        { id: 'certifications-content', file: 'sections/certifications.html' },
        { id: 'contact-content', file: 'sections/contact.html' }
    ];

    const loadPromises = sections.map(async (section) => {
        const cacheKey = `portfolio_section_${section.id}`;
        const cachedHtml = localStorage.getItem(cacheKey);
        const container = document.getElementById(section.id);

        if (container && cachedHtml) {
            // Render cached version instantly
            container.innerHTML = cachedHtml;
        }

        try {
            const response = await fetch(section.file);
            if (response.ok) {
                const html = await response.text();
                if (container) {
                    // Only update the DOM if the content has changed to avoid unnecessary re-renders
                    if (html !== cachedHtml) {
                        container.innerHTML = html;
                        localStorage.setItem(cacheKey, html);
                    }
                }
            } else if (!cachedHtml) {
                console.warn(`Failed to load ${section.file}. Make sure you're running a local server.`);
                showError(section.id);
            }
        } catch (error) {
            console.error(`Error loading ${section.file}:`, error);
            if (!cachedHtml) {
                showError(section.id);
            }
        }
    });

    // Wait for all sections to load before initializing dependent scripts
    await Promise.all(loadPromises);

    // Initialize components that depend on dynamically loaded content
    initProjectFilters();
    initProjectAnimations();
    initProjectModals();
    initLazyLoading();
    initActiveNavigationObserver();
}

// Observe visible sections and highlight nav links
function initActiveNavigationObserver() {
    const sections = ['hero', 'about', 'projects', 'experience', 'certifications', 'contact'];
    const navLinks = document.querySelectorAll('nav div a[href^="#"]');
    const mobileLinks = document.querySelectorAll('#mobile-menu a.mobile-nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Trigger when section occupies the sweet spot of viewport
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                
                // Helper to update active class
                const updateActiveState = (links) => {
                    links.forEach(link => {
                        const href = link.getAttribute('href');
                        if (href === `#${sectionId}` || (sectionId === 'hero' && href === '#')) {
                            link.classList.add('nav-active');
                        } else {
                            link.classList.remove('nav-active');
                        }
                    });
                };

                updateActiveState(navLinks);
                updateActiveState(mobileLinks);
            }
        });
    }, observerOptions);

    sections.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            observer.observe(element);
        }
    });
}

// Show error message if section fails to load
function showError(sectionId) {
    const container = document.getElementById(sectionId);
    if (container) {
        container.innerHTML = `
            <div class="p-8 text-center">
                <p class="text-red-400 mb-2">Failed to load section</p>
                <p class="text-gray-400 text-sm">Please run a local server: <code class="bg-gray-800 px-2 py-1 rounded">npm run dev</code></p>
            </div>
        `;
    }
}

// Dark mode toggle (if needed)
function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
}

// Initialize dark mode from localStorage
if (localStorage.getItem('darkMode') === 'true') {
    document.documentElement.classList.add('dark');
}

// Project filter functionality
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const projectCount = document.getElementById('project-count');

    filterButtons.forEach(button => {
        // Click handler
        button.addEventListener('click', function () {
            applyFilter(this.getAttribute('data-filter'));
        });

        // Keyboard support
        button.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                applyFilter(this.getAttribute('data-filter'));
            }
        });
    });

    function applyFilter(filter) {
        // Update active state
        filterButtons.forEach(btn => {
            const isActive = btn.getAttribute('data-filter') === filter;
            if (isActive) {
                btn.classList.add('active', 'bg-primary', 'text-white', 'shadow-lg');
                btn.classList.remove('bg-white', 'dark:bg-card-border', 'text-slate-900', 'dark:text-white');
            } else {
                btn.classList.remove('active', 'bg-primary', 'text-white', 'shadow-lg');
                btn.classList.add('bg-white', 'dark:bg-card-border', 'text-slate-900', 'dark:text-white');
            }
        });

        // Filter projects with animation
        let visibleCount = 0;
        const visibleCards = [];

        projectCards.forEach((card, index) => {
            const categories = card.getAttribute('data-category');

            if (filter === 'all' || categories.includes(filter)) {
                visibleCards.push({ card, index });
                visibleCount++;
            }
        });

        // Hide non-matching cards
        projectCards.forEach((card) => {
            const categories = card.getAttribute('data-category');
            if (filter !== 'all' && !categories.includes(filter)) {
                card.style.transition = 'all 0.3s ease-out';
                card.style.opacity = '0';
                card.style.transform = 'translateY(-20px)';

                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });

        // Show matching cards with stagger
        visibleCards.forEach(({ card, index }) => {
            card.style.display = 'flex';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';

            setTimeout(() => {
                card.style.transition = 'all 0.5s ease-out';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });

        // Update project count with animation
        if (projectCount) {
            projectCount.style.transition = 'all 0.3s';
            projectCount.style.transform = 'scale(1.3)';
            projectCount.style.color = '#7f13ec';

            setTimeout(() => {
                projectCount.textContent = visibleCount;
                setTimeout(() => {
                    projectCount.style.transform = 'scale(1)';
                    projectCount.style.color = '';
                }, 150);
            }, 150);
        }

        // Smooth scroll to projects section if needed
        const projectsSection = document.getElementById('projects');
        if (projectsSection && window.scrollY > projectsSection.offsetTop - 100) {
            projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

// Project card animations
function initProjectAnimations() {
    const projectCards = document.querySelectorAll('.project-card');

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s both`;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    projectCards.forEach(card => {
        observer.observe(card);

        // Keyboard navigation
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Project data structure
const projectData = {
    1: {
        title: "KaagapAI",
        description: "A mental health companion app I built as a thesis project. Users can journal their thoughts, track their mood over time, and chat with an AI that responds with empathy. All journal entries are encrypted so nobody — not even the server — can read them.",
        techStack: ["AI/ML", "Python", "Flask", "React", "Tailwind CSS", "Cryptography"],
        challenges: [
            {
                challenge: "Keeping journal entries truly private",
                solution: "Used client-side encryption so entries are scrambled before they ever leave the browser. The server only stores ciphertext."
            },
            {
                challenge: "Making the AI feel safe, not clinical",
                solution: "Spent a lot of time tuning the system prompt and adding guardrails so the AI stays supportive and always suggests professional help when things get serious."
            }
        ],
        screenshots: ["images/kaagapai.png"],
        github: "https://github.com/supremomj/kaagapai",
        demo: "https://kaagapai.onrender.com"
    },
    2: {
        title: "HanapBuh.AI - AI Job Recommendation",
        description: "A job-matching platform I helped build during a group project. I wrote the core matching engine — it reads a user's resume, pulls out the skills, and scores them against job listings in the database. The tricky part was handling all the different ways people format their resumes.",
        techStack: ["Python", "NLP", "AI/ML", "scikit-learn", "Pandas", "NumPy"],
        challenges: [
            {
                challenge: "Resumes come in wildly different formats",
                solution: "Built a parsing pipeline that strips formatting, identifies sections by keyword patterns, and normalizes everything into a flat structure before running the matcher."
            },
            {
                challenge: "Matching got slow with thousands of listings",
                solution: "Added TF-IDF vectorization with cosine similarity instead of brute-force comparison, which cut search time from seconds to milliseconds."
            }
        ],
        screenshots: ["images/hanapbuh-ai-screenshot - Copy.jpg"],
        github: "https://github.com/supremomj/HanapBuh.AI",
        demo: "#"
    },
    3: {
        title: "Brosko",
        description: "A study tool that takes a photo of a multiple-choice test, identifies the correct answers, and explains why they're right. I built this because my peers and I kept wasting time checking answers manually — this does it in seconds.",
        techStack: ["Python", "AI", "Web", "Flask", "TensorFlow", "React"],
        challenges: [
            {
                challenge: "Reading handwritten or blurry answer sheets",
                solution: "Used OpenCV for pre-processing (thresholding, denoising) before feeding images to the model, which improved accuracy a lot on low-quality photos."
            },
            {
                challenge: "Generating explanations that actually help",
                solution: "Connected the answer detection to a prompt-based explanation generator that breaks down why each option is correct or wrong, step by step."
            }
        ],
        screenshots: [],
        github: "https://github.com/supremomj/brosko",
        demo: "#"
    },
    4: {
        title: "Taliknows",
        description: "An educational quiz game I built with JavaScript. It tests your knowledge on different subjects and adjusts the difficulty as you play. The idea was to make reviewing for exams feel less boring — it tracks your score and shows you which topics you're weakest in.",
        techStack: ["JavaScript", "Game Dev", "Web", "HTML5 Canvas", "Node.js"],
        challenges: [
            {
                challenge: "Making it feel like a game, not a quiz",
                solution: "Added a points system, streak bonuses, and timed rounds. Small things like sound effects and animations made it way more engaging during testing."
            },
            {
                challenge: "Adapting difficulty on the fly",
                solution: "Tracked correct/wrong answer ratios per topic and used that to pull harder or easier questions from the question bank automatically."
            }
        ],
        screenshots: ["images/Taliknows.jpg"],
        github: "https://github.com/supremomj/Mathify",
        demo: "#"
    },
    5: {
        title: "CEU Chatbot",
        description: "A chatbot for Centro Escolar University that answers common student questions — things like enrollment schedules, tuition fees, office hours, and course prerequisites. I built it so students could get quick answers instead of waiting in line at the registrar's office.",
        techStack: ["Python", "Chatbot", "NLP", "Flask", "Dialogflow"],
        challenges: [
            {
                challenge: "Students ask the same thing in a hundred different ways",
                solution: "Trained the intent classifier on real student questions I collected from Facebook groups and class chats. The more examples per intent, the better it got."
            },
            {
                challenge: "Multi-turn conversations kept breaking",
                solution: "Added a simple context stack that remembers what the student was asking about so follow-up questions like 'how about for IT?' still make sense."
            }
        ],
        screenshots: ["images/ceuchat.jpg"],
        github: "https://github.com/supremomj/ceu-chatbot",
        demo: "#"
    },
    6: {
        title: "Expenses Tracker",
        description: "A personal finance app where you log your daily expenses, tag them by category, and see where your money actually goes. I built this because I kept running out of allowance by Wednesday. The charts make it obvious when you're overspending on food delivery.",
        techStack: ["Web", "Finance", "Dashboard", "React", "Node.js", "MongoDB", "Chart.js"],
        challenges: [
            {
                challenge: "Categorizing expenses without making it tedious",
                solution: "Added quick-select category buttons and remembered the user's most-used categories so logging an expense takes under 5 seconds."
            },
            {
                challenge: "Charts were laggy with months of data",
                solution: "Aggregated data by week/month on the server side before sending it to Chart.js, so the frontend only renders summary points instead of thousands of individual entries."
            }
        ],
        screenshots: ["images/Fexpenses.jpg"],
        github: "https://github.com/supremomj/expenses-tracker",
        demo: "#"
    },
    7: {
        title: "Call Center Review",
        description: "A web app for reviewing and scoring call center interactions. Supervisors can listen to recordings, leave notes, and track how agents perform over time. I built this for a freelance client who was managing everything in spreadsheets before.",
        techStack: ["Web", "Analytics", "Review", "Python", "React", "PostgreSQL"],
        challenges: [
            {
                challenge: "Audio playback was unreliable across browsers",
                solution: "Standardized all uploads to MP3 format on the backend and used a consistent HTML5 audio player with custom controls that worked the same everywhere."
            },
            {
                challenge: "The client wanted reports but hated dashboards",
                solution: "Built a simple weekly email digest that summarizes agent scores and flags any calls that scored below average, so they didn't have to log in at all."
            }
        ],
        screenshots: ["images/Reviewer.jpg"],
        github: "https://github.com/supremomj/call-center-review",
        demo: "#"
    }
};

// Initialize project modals
function initProjectModals() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        const projectId = card.getAttribute('data-project');

        // Add click handler for modal opening and button actions
        card.addEventListener('click', function (e) {
            // Don't trigger if clicking on action buttons
            if (e.target.closest('.bg-black\\/50')) {
                const button = e.target.closest('.bg-black\\/50');
                const title = button.getAttribute('title');
                const project = projectData[projectId];

                if (title === 'View Code' && project?.github) {
                    e.stopPropagation();
                    e.preventDefault();
                    window.open(project.github, '_blank', 'noopener,noreferrer');
                    return;
                } else if (title === 'Live Demo' && project?.demo) {
                    e.stopPropagation();
                    e.preventDefault();
                    if (project.demo !== '#') {
                        window.open(project.demo, '_blank', 'noopener,noreferrer');
                    }
                    return;
                }
                return;
            }

            // Add ripple effect
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(127, 19, 236, 0.4);
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                width: 100px;
                height: 100px;
                left: ${x - 50}px;
                top: ${y - 50}px;
                z-index: 1000;
            `;
            this.style.position = 'relative';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);

            // Open modal if project data exists
            if (projectId && projectData[projectId]) {
                openProjectModal(projectId);
            }
        });
    });
}

// Open project modal
function openProjectModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;

    const modal = document.getElementById('project-modal');
    const modalContent = modal.querySelector('.relative');

    // Set hero image
    const heroDiv = document.getElementById('modal-hero').querySelector('.absolute.inset-0');
    if (project.screenshots && project.screenshots.length > 0) {
        heroDiv.style.backgroundImage = `url("${project.screenshots[0]}")`;
    }

    // Set title
    document.getElementById('modal-title').textContent = project.title;

    // Set description
    document.getElementById('modal-description').textContent = project.description;

    // Set tech stack
    const techStackContainer = document.getElementById('modal-tech-stack');
    techStackContainer.innerHTML = '';
    project.techStack.forEach(tech => {
        const tag = document.createElement('span');
        tag.className = 'px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-semibold';
        tag.textContent = tech;
        techStackContainer.appendChild(tag);
    });

    // Set challenges
    const challengesContainer = document.getElementById('modal-challenges');
    challengesContainer.innerHTML = '';
    project.challenges.forEach((item, index) => {
        const challengeDiv = document.createElement('div');
        challengeDiv.className = 'bg-slate-50 dark:bg-[#2a1d3a] rounded-lg p-4 border border-gray-200 dark:border-[#362348]';
        challengeDiv.innerHTML = `
            <div class="flex items-start gap-3 mb-2">
                <span class="material-symbols-outlined text-primary text-sm">error</span>
                <h4 class="font-semibold text-slate-900 dark:text-white text-sm">Challenge ${index + 1}: ${item.challenge}</h4>
            </div>
            <div class="flex items-start gap-3 ml-8">
                <span class="material-symbols-outlined text-green-400 text-sm">check_circle</span>
                <p class="text-slate-600 dark:text-gray-300 text-sm">${item.solution}</p>
            </div>
        `;
        challengesContainer.appendChild(challengeDiv);
    });

    // Set screenshots
    const screenshotsContainer = document.getElementById('modal-screenshots');
    const screenshotsGrid = screenshotsContainer.querySelector('.grid');
    if (project.screenshots && project.screenshots.length > 1) {
        screenshotsContainer.classList.remove('hidden');
        screenshotsGrid.innerHTML = '';
        project.screenshots.slice(1).forEach(screenshot => {
            const imgDiv = document.createElement('div');
            imgDiv.className = 'rounded-lg overflow-hidden border border-gray-200 dark:border-[#362348]';
            imgDiv.innerHTML = `<img src="${screenshot}" alt="${project.title} screenshot" class="w-full h-full object-cover" />`;
            screenshotsGrid.appendChild(imgDiv);
        });
    } else {
        screenshotsContainer.classList.add('hidden');
    }

    // Set links
    const githubLink = document.getElementById('modal-github');
    const demoLink = document.getElementById('modal-demo');

    if (project.github && project.github !== '#') {
        githubLink.href = project.github;
        githubLink.classList.remove('hidden');
    } else {
        githubLink.classList.add('hidden');
    }

    if (project.demo && project.demo !== '#') {
        demoLink.href = project.demo;
        demoLink.classList.remove('hidden');
    } else {
        demoLink.classList.add('hidden');
    }

    // Show modal with animation
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    setTimeout(() => {
        modalContent.style.transform = 'scale(1)';
        modalContent.style.opacity = '1';
    }, 10);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

// Close project modal
function closeProjectModal(event) {
    if (event && event.target !== event.currentTarget) return;

    const modal = document.getElementById('project-modal');
    const modalContent = modal.querySelector('.relative');

    modalContent.style.transform = 'scale(0.95)';
    modalContent.style.opacity = '0';

    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
    }, 300);
}

// Close modal on Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('project-modal');
        if (!modal.classList.contains('hidden')) {
            closeProjectModal();
        }
    }
});

