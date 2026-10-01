// ==== THÈME (violet par défaut / PSG) ====
// Le thème sauvegardé est déjà appliqué par le script en ligne du <head> ; ici on gère le bouton.
const themeToggle = document.querySelector('.theme-toggle');

function applyTheme(theme) {
    const isPsg = theme === 'psg';
    if (isPsg) {
        document.documentElement.dataset.theme = 'psg';
    } else {
        delete document.documentElement.dataset.theme;
    }
    if (themeToggle) {
        themeToggle.setAttribute('aria-pressed', String(isPsg));
        themeToggle.title = isPsg ? 'Revenir au thème violet' : 'Passer au thème PSG';
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.dataset.theme === 'psg' ? 'violet' : 'psg';
        applyTheme(theme);
        try {
            localStorage.setItem('theme', theme);
        } catch {
            // Stockage indisponible (navigation privée…) : le choix vaut pour cette page seulement
        }
    });
}

applyTheme(document.documentElement.dataset.theme === 'psg' ? 'psg' : 'violet');

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
// Styles .reveal / .is-visible / --reveal-delay dans style.css
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

const revealSelector = '.about-text p, .stat-item, .skill-group, .project-card, .section-lead, .contact-form, .social-links, .project-section';

document.querySelectorAll(revealSelector).forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});

// Dans une section, le contenu apparaît en cascade, après le titre
document.querySelectorAll('.section').forEach(section => {
    section.querySelectorAll('.reveal').forEach((el, index) => {
        el.style.setProperty('--reveal-delay', `${0.2 + Math.min(index, 6) * 0.08}s`);
    });
});

// ==== ANIMATION ENTRE LES SECTIONS ====
// À l'entrée d'une section : numéro, titre et trait d'accent s'animent (styles .section-animate / .is-in-view)
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-in-view');
            sectionObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.section').forEach(section => {
    section.classList.add('section-animate');
    sectionObserver.observe(section);
});

// Lien de navigation de la section en cours (accueil uniquement : liens en #ancre)
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

if (navAnchors.length) {
    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            navAnchors.forEach(link => {
                link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
            });
        });
    }, { rootMargin: '-45% 0px -50% 0px' }); // la section qui passe au milieu de l'écran

    navAnchors.forEach(link => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) spyObserver.observe(target);
    });
}

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

// ==== CV (cv.html) ====
// Le PDF est dessiné dans la page avec PDF.js (chargé uniquement sur cv.html) :
// pas de lecteur PDF du navigateur, et le rendu suit automatiquement le fichier cv/*.pdf.
const cvViewer = document.getElementById('cvViewer');

if (cvViewer) {
    renderCv();
}

async function renderCv() {
    const pdfUrl = cvViewer.dataset.pdf;
    try {
        if (!window.pdfjsLib) throw new Error('PDF.js non chargé');
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

        const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
        const pages = [];
        for (let n = 1; n <= pdf.numPages; n++) {
            const canvas = document.createElement('canvas');
            canvas.className = 'cv-page';
            canvas.setAttribute('role', 'img');
            canvas.setAttribute('aria-label', `CV de Thomas Cornu, page ${n} sur ${pdf.numPages}`);
            pages.push({ page: await pdf.getPage(n), canvas, task: null });
        }
        cvViewer.replaceChildren(...pages.map(p => p.canvas));

        const drawAll = () => pages.forEach(drawCvPage);
        drawAll();

        // Redessine à la bonne résolution quand la largeur change (rotation, redimensionnement)
        let resizeTimer;
        let lastWidth = cvViewer.clientWidth;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (cvViewer.clientWidth !== lastWidth) {
                    lastWidth = cvViewer.clientWidth;
                    drawAll();
                }
            }, 150);
        });
    } catch (error) {
        // Ex. page ouverte en file:// : PDF.js ne peut pas lire le fichier, on propose le lien
        console.warn('Affichage du CV impossible :', error);
        const status = document.createElement('p');
        status.className = 'cv-viewer__status';
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.textContent = 'ouvrir le PDF';
        status.append('Le CV ne peut pas être affiché ici. Vous pouvez ', link, '.');
        cvViewer.replaceChildren(status);
    }
}

function drawCvPage(item) {
    const { page, canvas } = item;
    if (item.task) item.task.cancel();

    const cssWidth = cvViewer.clientWidth;
    const scale = cssWidth / page.getViewport({ scale: 1 }).width;
    const ratio = window.devicePixelRatio || 1;
    const viewport = page.getViewport({ scale: scale * ratio });

    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);
    canvas.style.aspectRatio = `${viewport.width} / ${viewport.height}`;

    item.task = page.render({ canvasContext: canvas.getContext('2d'), viewport });
    item.task.promise.catch(() => { /* rendu annulé par un redimensionnement : normal */ });
}
