const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animation des liens
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Animation du burger
        burger.classList.toggle('toggle');
    });
}

// Appel de la fonction
navSlide();

// Smooth scrolling pour les ancres (optionnel car géré par CSS html {scroll-behavior: smooth} moderne, 
// mais utile pour compatibilité)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// ==== BOUTON RETOUR EN HAUT ====
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    // Afficher le bouton après 300px de scroll
    if (scrollToTopBtn) {
        scrollToTopBtn.classList.toggle('visible', window.pageYOffset > 300);
    }

    // Barre de progression
    updateScrollProgress();
});

if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==== BARRE DE PROGRESSION ====
const scrollProgress = document.querySelector('.scroll-progress');

function updateScrollProgress() {
    if (!scrollProgress) return;
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = windowHeight > 0 ? (window.pageYOffset / windowHeight) * 100 : 0;
    scrollProgress.style.width = scrolled + '%';
}

// ==== FORMULAIRE CONTACT ====
const contactForm = document.getElementById('contactForm');
const contactStatus = document.getElementById('contactStatus');

if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get('name')?.trim();
        const email = formData.get('email')?.trim();
        const message = formData.get('message')?.trim();

        if (!name || !email || !message) {
            showStatus('Veuillez remplir tous les champs.', 'error');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showStatus('Adresse email invalide.', 'error');
            return;
        }

        const subject = encodeURIComponent(`Contact Portfolio - ${name}`);
        const body = encodeURIComponent(`Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

        // Utilise mailto pour ouvrir le client mail local
        window.location.href = `mailto:tcornu92@gmail.com?subject=${subject}&body=${body}`;

        showStatus('Merci ! Votre client mail s\'ouvre pour envoyer le message.', 'success');
        contactForm.reset();
    });
}

function showStatus(text, type = '') {
    if (!contactStatus) return;
    contactStatus.textContent = text;
    contactStatus.classList.remove('success', 'error');
    if (type) contactStatus.classList.add(type);
}

// ==== ANIMATION AU SCROLL (FADE IN) ====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apparition des cartes (styles .reveal / .is-visible dans style.css)
document.querySelectorAll('.project-card, .skill-card, .stat-item, .project-section').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});

// ==== EFFET DE FRAPPE (TYPEWRITER) ====
const subtitleElement = document.querySelector('.hero h2');
if (subtitleElement) {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let typingTimer;

    const typeWriter = (text) => {
        clearTimeout(typingTimer);
        if (reduceMotion) {
            subtitleElement.textContent = text;
            return;
        }

        subtitleElement.textContent = '';
        let i = 0;
        const step = () => {
            if (i < text.length) {
                subtitleElement.textContent += text.charAt(i);
                i++;
                typingTimer = setTimeout(step, 100);
            }
        };
        // Démarrer l'effet après un court délai
        typingTimer = setTimeout(step, 500);
    };

    typeWriter(subtitleElement.textContent.trim());
}
