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
document.addEventListener('DOMContentLoaded', function() {
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
        initProjectModals();
    }, 500);
});

// Function to load section content
async function loadSections() {
    const sections = [
        { id: 'hero-content', file: 'sections/hero.html' },
        { id: 'about-content', file: 'sections/about.html' },
        { id: 'projects-content', file: 'sections/projects.html' },
        { id: 'skills-content', file: 'sections/skills.html' },
        { id: 'experience-content', file: 'sections/experience.html' },
        { id: 'certifications-content', file: 'sections/certifications.html' },
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

// Project data structure
const projectData = {
    1: {
        title: "HanapBuh.AI",
        description: "A comprehensive job board platform powered by AI that analyzes resumes and matches candidates with relevant job opportunities. The system uses natural language processing to extract skills, experience, and qualifications from resumes, then compares them against job requirements to provide intelligent job recommendations.",
        techStack: ["Laravel", "Python", "AI/NLP", "MySQL", "JavaScript", "Tailwind CSS"],
        challenges: [
            {
                challenge: "Resume parsing accuracy",
                solution: "Implemented a hybrid approach combining regex patterns with NLP models to extract structured data from various resume formats, achieving 92% accuracy."
            },
            {
                challenge: "Real-time job matching performance",
                solution: "Optimized the matching algorithm using vector embeddings and implemented caching strategies to reduce response time from 3s to under 500ms."
            }
        ],
        screenshots: ["images/JobPosting.jpg"],
        github: "https://github.com/supremomj/hanapbuh-ai",
        demo: "#"
    },
    2: {
        title: "HanapBuh.AI - AI Job Recommendation",
        description: "Engineered the core AI engine for job matching using advanced NLP techniques. Built a recommendation system that analyzes user profiles, skills, and preferences to suggest the most relevant job opportunities with confidence scores.",
        techStack: ["Python", "NLP", "AI/ML", "scikit-learn", "Pandas", "NumPy"],
        challenges: [
            {
                challenge: "Handling diverse resume formats",
                solution: "Created a flexible parsing pipeline that normalizes different resume structures into a standardized format before processing."
            },
            {
                challenge: "Scalability with large job databases",
                solution: "Implemented efficient indexing and used approximate nearest neighbor search to handle millions of job listings efficiently."
            }
        ],
        screenshots: ["images/hanapbuh-ai-screenshot - Copy.jpg"],
        github: "https://github.com/supremomj/HanapBuh.AI",
        demo: "#"
    },
    3: {
        title: "Brosko",
        description: "An AI-powered educational tool that helps students learn more effectively by highlighting correct answers and providing detailed explanations. The system uses machine learning to adapt to individual learning styles and provide personalized feedback.",
        techStack: ["Python", "AI", "Web", "Flask", "TensorFlow", "React"],
        challenges: [
            {
                challenge: "Real-time answer analysis",
                solution: "Implemented a lightweight ML model that can process and analyze answers in real-time without significant latency."
            },
            {
                challenge: "Personalized learning paths",
                solution: "Developed a recommendation system that tracks user progress and adjusts difficulty and content based on performance metrics."
            }
        ],
        screenshots: [],
        github: "https://github.com/supremomj/brosko",
        demo: "#"
    },
    4: {
        title: "Taliknows",
        description: "An interactive educational game platform that evaluates users' skills through engaging gameplay. The system provides detailed feedback and personalized recommendations to help users improve their knowledge and skills in various subjects.",
        techStack: ["JavaScript", "Game Dev", "Web", "HTML5 Canvas", "Node.js"],
        challenges: [
            {
                challenge: "Creating engaging game mechanics",
                solution: "Designed a gamification system with points, levels, and achievements to maintain user engagement while learning."
            },
            {
                challenge: "Real-time skill assessment",
                solution: "Implemented an adaptive testing algorithm that adjusts question difficulty based on user responses for accurate skill evaluation."
            }
        ],
        screenshots: ["images/Taliknows.jpg"],
        github: "https://github.com/supremomj/Mathify",
        demo: "#"
    },
    5: {
        title: "CEU Chatbot",
        description: "A conversational AI assistant designed to help students navigate academic processes and answer common questions about university services, course registration, and campus information. The chatbot provides 24/7 support and reduces the workload on administrative staff.",
        techStack: ["Python", "Chatbot", "NLP", "Flask", "Dialogflow", "Natural Language Processing"],
        challenges: [
            {
                challenge: "Understanding diverse student queries",
                solution: "Trained the NLP model on a comprehensive dataset of student questions and implemented intent classification to handle various query types."
            },
            {
                challenge: "Maintaining conversational context",
                solution: "Implemented a context management system that tracks conversation history and maintains context across multiple turns."
            }
        ],
        screenshots: ["images/ceuchat.jpg"],
        github: "https://github.com/supremomj/ceu-chatbot",
        demo: "#"
    },
    6: {
        title: "Expenses Tracker",
        description: "A comprehensive personal finance management application that helps users track expenses, categorize transactions, and manage budgets. Features include expense visualization, budget alerts, and financial reports to help users make informed financial decisions.",
        techStack: ["Web", "Finance", "Dashboard", "React", "Node.js", "MongoDB", "Chart.js"],
        challenges: [
            {
                challenge: "Real-time expense synchronization",
                solution: "Implemented WebSocket connections to sync expenses across multiple devices in real-time."
            },
            {
                challenge: "Data visualization performance",
                solution: "Optimized chart rendering using canvas-based libraries and implemented data aggregation to handle large datasets efficiently."
            }
        ],
        screenshots: ["images/Fexpenses.jpg"],
        github: "https://github.com/supremomj/expenses-tracker",
        demo: "#"
    },
    7: {
        title: "Call Center Review",
        description: "A comprehensive system for analyzing and reviewing call center interactions to improve customer service quality. The platform provides detailed analytics, sentiment analysis, and performance metrics to help managers identify areas for improvement and recognize top performers.",
        techStack: ["Web", "Analytics", "Review", "Python", "React", "PostgreSQL", "Audio Processing"],
        challenges: [
            {
                challenge: "Processing large volumes of call recordings",
                solution: "Implemented batch processing with queue management and parallel processing to handle thousands of calls efficiently."
            },
            {
                challenge: "Real-time sentiment analysis",
                solution: "Integrated advanced NLP models for real-time sentiment analysis during live calls, providing immediate feedback to supervisors."
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
        card.addEventListener('click', function(e) {
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
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('project-modal');
        if (!modal.classList.contains('hidden')) {
            closeProjectModal();
        }
    }
});

