/* ============================================
   ADURTEK - Script principal
   Interacciones y efectos
   ============================================ */

'use strict';

/* ---------- Utilidades ---------- */
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

/* ============================================
   PRELOADER
   ============================================ */
function initPreloader() {
    const preloader = $('#preloader');
    const bar = $('#preloaderBar');
    let progress = 0;

    const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                preloader.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }, 300);
        }
        bar.style.width = progress + '%';
    }, 150);

    // Fallback: ocultar preloader tras 3 segundos máximo
    setTimeout(() => {
        clearInterval(interval);
        preloader.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 3000);
}

/* ============================================
   CURSOR PERSONALIZADO
   ============================================ */
function initCursor() {
    const dot = $('#cursorDot');
    const ring = $('#cursorRing');

    if (window.matchMedia('(max-width: 768px)').matches) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    });

    // Animación suave del anillo
    function animateRing() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();

    // Efecto hover sobre elementos interactivos
    const interactiveElements = 'a, button, input, textarea, .service-card, .project-card, .value-item, .social-btn';
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(interactiveElements)) {
            ring.classList.add('hover');
        }
    });
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(interactiveElements)) {
            ring.classList.remove('hover');
        }
    });
}

/* ============================================
   PARTÍCULAS EN EL FONDO
   ============================================ */
function initParticles() {
    const canvas = $('#particlesCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    const colors = ['#6c5ce7', '#00d2ff', '#ff6b6b', '#feca57'];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticles() {
        const count = Math.min(Math.floor(window.innerWidth / 15), 80);
        particles = [];
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                color: colors[Math.floor(Math.random() * colors.length)],
                opacity: Math.random() * 0.5 + 0.1,
                pulse: Math.random() * Math.PI * 2
            });
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, i) => {
            // Movimiento
            p.x += p.speedX;
            p.y += p.speedY;
            p.pulse += 0.02;

            // Rebote en bordes
            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

            // Opacidad pulsante
            const opacity = p.opacity * (0.7 + 0.3 * Math.sin(p.pulse));

            // Dibujar partícula
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = opacity;
            ctx.fill();

            // Conexiones
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = p.color;
                    ctx.globalAlpha = opacity * (1 - distance / 120) * 0.3;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        });

        ctx.globalAlpha = 1;
        animationId = requestAnimationFrame(drawParticles);
    }

    // Interacción con el ratón
    let mouse = { x: null, y: null };
    canvas.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    canvas.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    resizeCanvas();
    createParticles();
    drawParticles();

    window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
    });
}

/* ============================================
   NAVEGACIÓN - Scroll
   ============================================ */
function initNavbar() {
    const navbar = $('#navbar');
    const progress = $('#scrollProgress');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;

        // Navbar con fondo al hacer scroll
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Barra de progreso
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progress.style.width = scrollPercent + '%';

        // Resaltar enlace activo
        updateActiveLink();
    });
}

function updateActiveLink() {
    const sections = $$('section[id], header[id]');
    const navLinks = $$('.nav-link');
    let current = '';

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

/* ============================================
   MENÚ MÓVIL
   ============================================ */
function initMobileMenu() {
    const hamburger = $('#hamburger');
    const navLinks = $('#navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

/* ============================================
   SCROLL REVEAL
   ============================================ */
function initScrollReveal() {
    const revealElements = $$('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach((el) => observer.observe(el));
}

/* ============================================
   CONTADOR DE ESTADÍSTICAS
   ============================================ */
function initStatsCounter() {
    const statNumbers = $$('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetValue = parseInt(target.dataset.target);
                animateCounter(target, targetValue);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach((el) => observer.observe(el));
}

function animateCounter(element, target) {
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        const current = Math.floor(eased * (target - start) + start);
        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }

    requestAnimationFrame(update);
}

/* ============================================
   FORMULARIO DE CONTACTO
   ============================================ */
function initContactForm() {
    const form = $('#contactForm');
    const success = $('#formSuccess');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validación básica
        const name = $('#name').value.trim();
        const email = $('#email').value.trim();
        const message = $('#message').value.trim();

        if (!name || !email || !message) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Por favor, introduce un email válido.');
            return;
        }

        // Simular envío (aquí conectarías con tu backend o servicio de email)
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Enviar mensaje <span class="btn-arrow">→</span>';
            form.reset();
            success.classList.add('show');
            setTimeout(() => success.classList.remove('show'), 5000);
        }, 1500);
    });
}

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/* ============================================
   AÑO EN EL FOOTER
   ============================================ */
function initFooterYear() {
    const yearElement = $('#year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/* ============================================
   EFECTO TILT EN TARJETAS DE PROYECTO
   ============================================ */
function initTiltEffect() {
    const cards = $$('.project-visual');

    cards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            const mockup = card.querySelector('.project-mockup');
            if (mockup) {
                mockup.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${y * -10}deg)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            const mockup = card.querySelector('.project-mockup');
            if (mockup) {
                mockup.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(2deg)';
            }
        });
    });
}

/* ============================================
   FORMULARIO DE SOLICITUD DE LICENCIAS B2B
   ============================================ */
function initLicenciaForm() {
    const form = $('#licenciaForm');
    if (!form) return;

    const producto = form.dataset.producto || 'Producto';
    const planSelector = form.querySelector('#planSelector');
    const numLicenciasInput = form.querySelector('#numLicencias');
    const precioTotalEl = form.querySelector('#precioTotal');
    const precioDetalleEl = form.querySelector('#precioDetalle');

    // Nombres legibles de los planes
    const planNombres = {};
    planSelector.querySelectorAll('.plan-option').forEach((opt) => {
        const input = opt.querySelector('input');
        const name = opt.querySelector('.plan-option-name');
        if (input && name) {
            planNombres[input.value] = name.textContent.trim();
        }
    });

    function formatPrecio(valor) {
        return valor.toLocaleString('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }

    function calcularPrecio() {
        const planSeleccionado = planSelector.querySelector('input[name="plan"]:checked');
        if (!planSeleccionado) return;

        const precioUnitario = parseFloat(planSeleccionado.dataset.precio) || 0;
        const numLicencias = parseInt(numLicenciasInput.value, 10) || 1;
        const esEnterprise = planSeleccionado.value === 'enterprise';
        const nombrePlan = planNombres[planSeleccionado.value] || planSeleccionado.value;

        if (esEnterprise) {
            precioTotalEl.innerHTML = 'A medida';
            precioDetalleEl.textContent = `${nombrePlan} · Precio personalizado`;
            return;
        }

        const total = precioUnitario * numLicencias;
        precioTotalEl.innerHTML = `${formatPrecio(total)} €<small style="font-size:0.5em; -webkit-text-fill-color:var(--text-secondary)">/mes</small>`;
        precioDetalleEl.textContent = `${nombrePlan} · ${numLicencias} licencia${numLicencias !== 1 ? 's' : ''} × ${formatPrecio(precioUnitario)} €`;
    }

    // Eventos
    planSelector.addEventListener('change', calcularPrecio);
    numLicenciasInput.addEventListener('input', calcularPrecio);

    // Envío por mailto
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const planSeleccionado = planSelector.querySelector('input[name="plan"]:checked');
        const nombrePlan = planSeleccionado ? (planNombres[planSeleccionado.value] || planSeleccionado.value) : '';
        const numLicencias = numLicenciasInput.value || '1';
        const empresa = form.querySelector('#empresa').value.trim();
        const nombre = form.querySelector('#nombre').value.trim();
        const email = form.querySelector('#email').value.trim();
        const mensaje = form.querySelector('#mensaje').value.trim();
        const precio = precioTotalEl.textContent.trim();

        const asunto = encodeURIComponent(`Solicitud de licencias ${producto} - ${nombrePlan}`);
        const cuerpo = [
            `Solicitud de licencias B2B - ${producto}`,
            '',
            `Plan: ${nombrePlan}`,
            `Número de licencias: ${numLicencias}`,
            `Precio estimado: ${precio}`,
            '',
            `Empresa: ${empresa}`,
            `Nombre: ${nombre}`,
            `Email: ${email}`,
            mensaje ? `Mensaje:\n${mensaje}` : '',
        ].filter(Boolean).join('\n');

        window.location.href = `mailto:info@adurtek.dev?subject=${asunto}&body=${encodeURIComponent(cuerpo)}`;
    });

    // Cálculo inicial
    calcularPrecio();
}

/* ============================================
   INICIALIZACIÓN
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initCursor();
    initParticles();
    initNavbar();
    initMobileMenu();
    initScrollReveal();
    initStatsCounter();
    initContactForm();
    initFooterYear();
    initTiltEffect();
    initLicenciaForm();
});
