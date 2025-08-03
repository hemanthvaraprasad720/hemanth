// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

// Initialize Portfolio
function initializePortfolio() {
    setupTypingAnimation();
    setupScrollAnimations();
    setupSmoothScrolling();
    setupActiveNavigation();
    populateTechStack();
    populateProjects();
    populateExperience();
}

// Typing Animation
function setupTypingAnimation() {
    const techStack = [
        'HTML',
        'CSS',
        'Bootstrap',
        'JavaScript',
        'Python', 
        'Flask',
        'MySQL',
        'Git',
        'Github'
    ];
    
    const typingElement = document.getElementById('typing-text');
    let currentTech = 0;
    
    function updateText() {
        if (typingElement) {
            typingElement.textContent = techStack[currentTech];
            currentTech = (currentTech + 1) % techStack.length;
        }
    }
    
    updateText(); // Initial call
    setInterval(updateText, 2000);
}

// Scroll Animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in-element').forEach(el => {
        observer.observe(el);
    });
}

// Smooth Scrolling for Navigation
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });
}

// Active Navigation Highlighting
function setupActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial call
}

// Populate Tech Stack
function populateTechStack() {
    const techStack = [
        { name: 'HTML', icon: 'fab fa-html5' },
        { name: 'CSS', icon: 'fab fa-css3-alt' },
        { name: 'Bootstrap', icon: 'fab fa-bootstrap' },
        { name: 'JavaScript', icon: 'fab fa-js-square' },
        { name: 'Python', icon: 'fab fa-python' },
        { name: 'Flask', icon: 'fas fa-flask' },
        { name: 'MySQL', icon: 'fas fa-database' },
        { name: 'Git', icon: 'fab fa-git-alt' },
        { name: 'Github', icon: 'fab fa-github' }
    ];
    
    const techGrid = document.getElementById('tech-grid');
    if (techGrid) {
        techGrid.innerHTML = techStack.map((tech, index) => `
            <div class="col-6 col-md-4 col-lg-2">
                <div class="glass-card tech-item text-center p-4 h-100 hover-scale" style="animation-delay: ${index * 0.1}s">
                    <i class="${tech.icon} fa-3x mb-3 text-primary"></i>
                    <h6 class="fw-semibold">${tech.name}</h6>
                    <div class="opacity-0 transition-opacity duration-300 mt-2 tech-tooltip">
                        <span class="small text-secondary">Experienced</span>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Add hover effect for tooltips
        document.querySelectorAll('.tech-item').forEach(item => {
            const tooltip = item.querySelector('.tech-tooltip');
            item.addEventListener('mouseenter', () => {
                tooltip.style.opacity = '1';
            });
            item.addEventListener('mouseleave', () => {
                tooltip.style.opacity = '0';
            });
        });
    }
}

// Populate Projects
function populateProjects() {
    const projects = [
        {
            id: 1,
            title: 'E-Commerce Platform',
            description: 'Full-stack e-commerce solution with React, Node.js, and PostgreSQL',
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop',
            tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
            liveDemo: 'https://demo.example.com',
            sourceCode: 'https://github.com/example/ecommerce'
        },
        {
            id: 2,
            title: 'Task Management App',
            description: 'Collaborative task management with real-time updates and team features',
            image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=200&fit=crop',
            tech: ['HTML', 'CSS', 'Bootstrap', 'JavaScript'],
            liveDemo: 'https://tasky-daily.vercel.app/',
            sourceCode: 'https://github.com/hemanthvaraprasad720/task-tracker'
        },
        {
            id: 3,
            title: 'Analytics Dashboard',
            description: 'Real-time analytics dashboard with interactive charts and data visualization',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop',
            tech: ['Vue.js', 'Python', 'Flask', 'Chart.js'],
            liveDemo: 'https://demo.example.com',
            sourceCode: 'https://github.com/example/analytics'
        }
    ];
    
    const projectsGrid = document.getElementById('projects-grid');
    if (projectsGrid) {
        projectsGrid.innerHTML = projects.map((project, index) => `
            <div class="col-lg-4 col-md-6">
                <div class="glass-card project-card overflow-hidden h-100" style="animation-delay: ${index * 0.2}s">
                    <div class="position-relative overflow-hidden">
                        <img src="${project.image}" alt="${project.title}" class="project-img">
                        <div class="project-overlay"></div>
                    </div>
                    <div class="p-4">
                        <h5 class="fw-bold mb-3">${project.title}</h5>
                        <p class="text-secondary mb-4">${project.description}</p>
                        <div class="d-flex flex-wrap gap-2 mb-4">
                            ${project.tech.map(tech => `
                                <span class="tech-tag">${tech}</span>
                            `).join('')}
                        </div>
                        <div class="d-flex gap-3">
                            <a href="${project.liveDemo}" target="_blank" rel="noopener noreferrer" 
                               class="btn btn-primary flex-fill">Live Demo</a>
                            <a href="${project.sourceCode}" target="_blank" rel="noopener noreferrer" 
                               class="btn btn-outline-primary flex-fill">Source Code</a>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Populate Blog Posts
function populateExperience() {
    const experiences = [
        {
            id: 1,
            company: 'Spondias India Pvt Ltd.',
            position: 'Full Web Stack Developer',
            duration: 'April-2023 - June-2023',
            location: 'Kakinada, Andhra Pradesh',
            description: 'Undergone intensive training in full stack development using HTML, CSS, Bootstrap, JavaScript, MySQL, and PHP. Developed multiple mini-projects including responsive web pages and dynamic applications.',
            achievements: [
                'Designed and developed user-friendly login and registration systems.',
                'Implemented full CRUD operations using PHP and MySQL with phpMyAdmin.',
                'Deployed projects locally using Apache server through XAMPP.'
            ]
        },
        {
            id: 2,
            company: 'Codegnan IT Solutions',
            position: 'Python Full Stack Traniee',
            duration: 'May-2025 - Present',
            location: 'Hyderabad, Telangana',
            description: 'Currently undergoing comprehensive training in full stack development, including front-end and back-end technologies like HTML, CSS, JavaScript, Bootstrap, Python, MySQL, and Flask.',
            achievements: [
                'Designed and developed a full stack web application using Flask and MySQL.',
                'Built interactive front-end interfaces and integrated with backend APIs.',
                'Used Node.js and JavaScript to store and retrieve data from .json files for dynamic content rendering.'
            ]
        }
    ];
    
    const experienceGrid = document.getElementById('experience-grid');
    if (experienceGrid) {
        experienceGrid.innerHTML = experiences.map((exp, index) => `
            <div class="col-lg-6 col-md-6">
                <div class="glass-card experience-card p-4 h-100" style="animation-delay: ${index * 0.2}s">
                    <div class="d-flex justify-content-between align-items-start mb-3">
                        <span class="small text-primary fw-semibold">${exp.duration}</span>
                        <span class="small text-secondary">${exp.location}</span>
                    </div>
                    <h5 class="fw-bold mb-2 text-primary">${exp.company}</h5>
                    <h6 class="fw-semibold mb-3 text-light">${exp.position}</h6>
                    <p class="text-secondary mb-4">${exp.description}</p>
                    <div class="achievements">
                        <h6 class="small fw-semibold mb-2 text-light">Key Achievements:</h6>
                        <ul class="list-unstyled">
                            ${exp.achievements.map(achievement => `
                                <li class="small text-secondary mb-1">
                                    <i class="fas fa-check text-primary me-2"></i>${achievement}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Utility Functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function downloadResume() {
    // Create a dummy download link
    const link = document.createElement('a');
    link.href = './resume/Hemanth_Resume.pdf'; // Replace with actual resume URL
    link.download = 'Hemanth_Resume.pdf';
    link.click();
    
    // You can replace this with actual file download logic
    alert('Thank you for your interest! The resume is now downloading.');
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Add some extra interactive effects
document.addEventListener('mousemove', function(e) {
    // Optional: Add cursor trail or particle effects
});

// Navbar background opacity on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// const cursor = document.querySelector('.cursor');

// document.addEventListener('mousemove', e => {
//   cursor.style.left = `${e.clientX}px`;
//   cursor.style.top = `${e.clientY}px`;
//   document.querySelectorAll('a, button').forEach(elem => {
//   elem.addEventListener('mouseenter', () => cursor.classList.add('hover'));
//   elem.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
// });
// });

const cursor = document.querySelector('.cursor');

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animate() {
  currentX += (mouseX - currentX) * 0.15;
  currentY += (mouseY - currentY) * 0.15;

  cursor.style.left = `${currentX}px`;
  cursor.style.top = `${currentY}px`;

  requestAnimationFrame(animate);
}

animate();
