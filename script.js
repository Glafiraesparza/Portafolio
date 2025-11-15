// Datos de proyectos reales de GitHub
const projectsData = [
    {
        id: 1,
        title: "Desarrollo Web",
        description: "Página web informativa sobre desarrollo web moderno, con diseño responsive",
        demoLink: "https://glafiraesparza.github.io/parcial2",
        image: "assets/images/desarrollo-web.jpg"
    },
    {
        id: 2,
        title: "Red Social Interactiva",
        description: "Plataforma social con interfaz de usuario moderna y funcionalidades de interacción.",
        demoLink: "https://glafiraesparza.github.io/redsocialinicio",
        image: "assets/images/red-social.jpg"
    },
    {
        id: 3,
        title: "Portal Vida Marina",
        description: "Sitio web educativo sobre la vida marina, con galería de especies e información ecológica.",
        demoLink: "https://glafiraesparza.github.io/proyecto",
        image: "assets/images/vida-marina.jpg"
    },
    {
        id: 4,
        title: "Sistema de Recepción",
        description: "Interfaz para recepcionistas de clínica con gestión de citas y pacientes.",
        demoLink: "https://glafiraesparza.github.io/clinica/secretaria2.html",
        image: "assets/images/recepcion.jpg"
    },
    {
        id: 5,
        title: "Consultorio Médico",
        description: "Plataforma para gestión de consultorio médico con interfaz de doctor y administración de pacientes.",
        demoLink: "https://glafiraesparza.github.io/clinica/PrincipalMedico.html",
        image: "assets/images/medico.jpg"
        
    }
];

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

function initializePortfolio() {
    // Iniciar secuencia de carga
    startLoadingSequence();
    
    // Configurar efectos
    createParticles();
    setupParallax();
    setupScrollEffects();
    setupSkillAnimations();
    
    // Cargar proyectos
    setTimeout(() => {
        renderProjects();
        setupContactForm();
    }, 2000);
}

// Secuencia de carga
function startLoadingSequence() {
    const loading = document.querySelector('.loading');
    
    setTimeout(() => {
        loading.classList.add('fade-out');
        
        // Mostrar navbar después del loading
        setTimeout(() => {
            window.addEventListener('scroll', handleNavbarScroll);
        }, 800);
        
    }, 2500);
}

// Efectos de partículas mejorados
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 60;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Posición aleatoria
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Tamaño aleatorio
        const size = Math.random() * 3 + 1;
        
        // Opacidad aleatoria
        const opacity = Math.random() * 0.4 + 0.1;
        
        // Duración de animación aleatoria
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(139, 92, 246, ${opacity});
            border-radius: 50%;
            left: ${posX}%;
            top: ${posY}%;
            animation: floatParticle ${duration}s ease-in-out ${delay}s infinite;
            will-change: transform;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // Agregar animación de partículas
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0%, 100% {
                transform: translate(0, 0) rotate(0deg);
                opacity: 0.3;
            }
            25% {
                transform: translate(20px, -20px) rotate(90deg);
                opacity: 0.8;
            }
            50% {
                transform: translate(0, -40px) rotate(180deg);
                opacity: 0.5;
            }
            75% {
                transform: translate(-20px, -20px) rotate(270deg);
                opacity: 0.2;
            }
        }
    `;
    document.head.appendChild(style);
}



// Navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.pageYOffset > 100;
    
    if (scrolled) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Efectos al hacer scroll - Versión simplificada
function setupScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animación específica para barras de habilidades
                if (entry.target.classList.contains('skill-item')) {
                    const skillProgress = entry.target.querySelector('.skill-progress');
                    const skillLevel = entry.target.getAttribute('data-skill');
                    setTimeout(() => {
                        skillProgress.style.width = skillLevel + '%';
                    }, 300);
                }
                
                // Animación escalonada para proyectos
                if (entry.target.classList.contains('project-card')) {
                    const cards = Array.from(document.querySelectorAll('.project-card'));
                    const index = cards.indexOf(entry.target);
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                }
            }
        });
    }, observerOptions);

    // Observar elementos
    const elementsToObserve = [
        '.section-header',
        '.about-content', 
        '.skills-container',
        '.contact-content',
        '.floating-card',
        '.skill-item'
    ];
    
    elementsToObserve.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            observer.observe(el);
        });
    });
    
    // Observer específico para proyectos con delay escalonado
    const projectsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const projectCards = document.querySelectorAll('.project-card');
                projectCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 150); // Delay escalonado de 150ms entre cada card
                });
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observar el contenedor de proyectos
    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid) {
        projectsObserver.observe(projectsGrid);
    }
}

// Efecto parallax mejorado - Versión simplificada
function setupParallax() {
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        const parallaxBg = document.querySelectorAll('.parallax-bg');
        const parallaxLayers = document.querySelectorAll('.parallax-layer');
        
        // Parallax para el hero
        parallaxBg.forEach((layer, index) => {
            const depth = layer.getAttribute('data-depth');
            const movement = -(scrolled * depth);
            layer.style.transform = `translate3d(0, ${movement}px, 0)`;
        });
        
        // Parallax para las secciones
        parallaxLayers.forEach(layer => {
            const depth = layer.getAttribute('data-depth');
            const movement = -(scrolled * depth);
            layer.style.transform = `translate3d(0, ${movement}px, 0)`;
        });

        // Transformación del fondo del hero
        const hero = document.querySelector('.hero');
        const about = document.querySelector('.about');
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        const scrollProgress = Math.min(scrolled / (heroBottom * 0.3), 1);
        
        // Cambiar el fondo del body gradualmente
        document.body.style.background = `linear-gradient(180deg, 
            var(--darker) 0%, 
            color-mix(in srgb, var(--darker) ${(1 - scrollProgress) * 100}%, var(--dark-purple) ${scrollProgress * 100}%) 100%
        )`;
    }, { passive: true });
}



// Animaciones de habilidades
function setupSkillAnimations() {
    // Las barras se animan automáticamente al ser observadas
}

// Renderizar proyectos con efectos parallax
function renderProjects() {
    const grid = document.querySelector('.projects-grid');
    
    projectsData.forEach((project, index) => {
        const projectCard = createProjectCard(project, index);
        grid.appendChild(projectCard);
    });
    
    // Agregar event listeners a las tarjetas
    setTimeout(() => {
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', function(e) {
                // Prevenir que se active cuando se hace click en los links
                if (!e.target.closest('.project-link')) {
                    const title = this.querySelector('h3').textContent;
                    console.log(`Proyecto clickeado: ${title}`);
                    // Aquí puedes agregar la lógica para abrir un modal o redirigir
                }
            });
        });
    }, 100);
}

function createProjectCard(project, index) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    card.innerHTML = `
        <div class="project-image">
            <img src="${project.image}" alt="${project.title}" onerror="this.style.display='none'" />
        </div>
        <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-links">
                <a href="${project.demoLink}" class="project-link" target="_blank" onclick="event.stopPropagation()">
                    <i class="bi bi-eye"></i>
                    Ver Demo
                </a>
            </div>
        </div>
    `;
    
    return card;
}


// Formulario de contacto
function setupContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simular envío
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.querySelector('span').textContent;
            const originalIcon = submitBtn.querySelector('i').className;
            
            submitBtn.querySelector('span').textContent = 'Enviando...';
            submitBtn.querySelector('i').className = 'bi bi-hourglass-split';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.querySelector('span').textContent = '¡Enviado!';
                submitBtn.querySelector('i').className = 'bi bi-check-lg';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                
                setTimeout(() => {
                    submitBtn.querySelector('span').textContent = originalText;
                    submitBtn.querySelector('i').className = originalIcon;
                    submitBtn.disabled = false;
                    submitBtn.style.background = 'linear-gradient(135deg, var(--primary), var(--accent))';
                    contactForm.reset();
                }, 2000);
            }, 1500);
        });
    }
}

// Scroll suave
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Efecto typing para el texto "Sobre Mí"
function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;
    
    const text = "Desarrolladora full stack con especialización en crear experiencias digitales únicas que combinan funcionalidad técnica con diseño agradable.";
    let index = 0;
    let currentText = '';
    
    // Crear cursor
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    
    function type() {
        if (index < text.length) {
            currentText += text.charAt(index);
            typingElement.innerHTML = currentText;
            typingElement.appendChild(cursor);
            index++;
            setTimeout(type, 20); // Velocidad de escritura (ms)
        } else {
            // Cuando termina, quitar el cursor
            cursor.style.animation = 'none';
            cursor.style.opacity = '0';
        }
    }
    
    // Iniciar typing después de un delay
    setTimeout(() => {
        typingElement.style.opacity = '1';
        type();
    }, 1000);
}

// Llamar la función en initializePortfolio()
function initializePortfolio() {
    startLoadingSequence();
    createParticles();
    setupParallax();
    setupScrollEffects();
    setupSkillAnimations();
    
    setTimeout(() => {
        renderProjects();
        setupContactForm();
        initTypingEffect(); // ← Agregar esta línea
    }, 2000);
}