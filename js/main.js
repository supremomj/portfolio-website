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

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dark mode
    initDarkMode();
    
    // Dark mode toggle buttons
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    if (themeToggle) themeToggle.addEventListener('click', toggleDarkMode);
    if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleDarkMode);
    
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            // Add mobile menu functionality here
            console.log('Mobile menu clicked');
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
    }, 500);
});

// Function to load section content
async function loadSections() {
    const sections = [
        { id: 'hero-content', file: 'sections/hero.html' },
        { id: 'about-content', file: 'sections/about.html' },
        { id: 'projects-content', file: 'sections/projects.html' },
        { id: 'skills-content', file: 'sections/skills.html' },
        { id: 'contact-content', file: 'sections/contact.html' }
    ];

    for (const section of sections) {
        try {
            const response = await fetch(section.file);
            if (response.ok) {
                const html = await response.text();
                const container = document.getElementById(section.id);
                if (container) {
                    container.innerHTML = html;
                }
            } else {
                console.warn(`Failed to load ${section.file}. Make sure you're running a local server.`);
                showError(section.id);
            }
        } catch (error) {
            console.error(`Error loading ${section.file}:`, error);
            console.info('Tip: Run "npm run dev" to start a local development server');
            showError(section.id);
        }
    }
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
        button.addEventListener('click', function() {
            applyFilter(this.getAttribute('data-filter'));
        });
        
        // Keyboard support
        button.addEventListener('keydown', function(e) {
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
        
        // Add click interaction with ripple effect
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on action buttons
            if (e.target.closest('.bg-black\\/50')) return;
            
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
            
            // Add scale animation on click
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
        
        // Keyboard navigation
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

