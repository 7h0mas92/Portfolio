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
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
    
    // Barre de progression
    updateScrollProgress();
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==== BARRE DE PROGRESSION ====
const scrollProgress = document.querySelector('.scroll-progress');

function updateScrollProgress() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
}

// ==== ANIMATION AU SCROLL (FADE IN) ====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Appliquer l'animation aux cartes de projet et compétences
document.querySelectorAll('.project-card, .skill-card, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==== EFFET DE FRAPPE (TYPEWRITER) ====
const subtitleElement = document.querySelector('.hero h2');
if (subtitleElement) {
    const text = subtitleElement.textContent;
    subtitleElement.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            subtitleElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Démarrer l'effet après un court délai
    setTimeout(typeWriter, 500);
}

// ==== SYSTÈME DE TRADUCTION ====
const translations = {
    fr: {
        nav_home: "Accueil",
        nav_about: "À propos",
        nav_skills: "Compétences",
        nav_projects: "Projets",
        nav_contact: "Contact",
        hero_greeting: "Salut, je suis",
        hero_title: "Étudiant en Développement Web",
        hero_description: "J'ai 18 ans et je transforme des idées en sites web fonctionnels et créatifs.",
        hero_btn_projects: "Voir mes projets",
        hero_btn_contact: "Me contacter",
        about_title: "À propos de moi",
        about_p1: "Passionné par le numérique depuis mon plus jeune âge, j'ai décidé de transformer cette passion en métier. Actuellement en formation de développement web, j'apprends chaque jour de nouvelles technologies et je développe mes compétences à travers des projets concrets.",
        about_p2: "Mon approche du développement se base sur trois piliers : la qualité du code, l'expérience utilisateur et l'apprentissage continu. Je suis curieux, persévérant et j'aime résoudre des problèmes complexes grâce au code.",
        about_p3: "Toujours à l'écoute des dernières tendances du web, je m'efforce de créer des sites modernes, performants et accessibles.",
        stat_years: "Ans",
        stat_projects: "Projets",
        stat_technologies: "Technologies",
        stat_motivation: "Motivation",
        skills_title: "Mes Compétences",
        projects_title: "Mes Projets",
        project1_title: "Projet docker Laravel",
        project1_description: "Un projet qui consiste à relier deux sites web distincts à une seule et même base de données MySQL via Docker. Cette architecture permet de mutualiser les données entre plusieurs applications Laravel tout en maintenant l'isolation des environnements grâce à la conteneurisation. Le projet inclut la configuration de services Docker pour Nginx, PHP-FPM et MySQL, avec une gestion optimisée des volumes pour la persistance des données. Cette solution démontre ma capacité à travailler avec des environnements conteneurisés et à concevoir des architectures évolutives.",
        project2_title: "To-Do List App",
        project2_description: "Application de gestion de tâches avec sauvegarde locale.",
        project3_title: "Portfolio V1",
        project3_description: "Mon premier portfolio professionnel développé from scratch. Design moderne et responsive avec navigation fluide, sections interactives, animations CSS et menu burger pour mobile. Projet qui démontre ma maîtrise des fondamentaux du développement front-end.",
        project_link: "Voir le code",
        contact_title: "Contactez-moi",
        contact_subtitle: "Une opportunité ou une question ? N'hésitez pas !",
        contact_name: "Votre Nom",
        contact_email: "Votre Email",
        contact_message: "Votre Message",
        contact_btn: "Envoyer",
        footer_rights: "Tous droits réservés."
    },
    en: {
        nav_home: "Home",
        nav_about: "About",
        nav_skills: "Skills",
        nav_projects: "Projects",
        nav_contact: "Contact",
        hero_greeting: "Hi, I'm",
        hero_title: "Web Development Student",
        hero_description: "I'm 18 years old and I transform ideas into functional and creative websites.",
        hero_btn_projects: "View my projects",
        hero_btn_contact: "Contact me",
        about_title: "About Me",
        about_p1: "Passionate about digital technology since my early age, I decided to turn this passion into a career. Currently studying web development, I learn new technologies every day and develop my skills through concrete projects.",
        about_p2: "My approach to development is based on three pillars: code quality, user experience, and continuous learning. I'm curious, persevering, and I love solving complex problems through code.",
        about_p3: "Always listening to the latest web trends, I strive to create modern, performant, and accessible websites.",
        stat_years: "Years",
        stat_projects: "Projects",
        stat_technologies: "Technologies",
        stat_motivation: "Motivation",
        skills_title: "My Skills",
        projects_title: "My Projects",
        project1_title: "Docker Laravel Project",
        project1_description: "A project that connects two distinct websites to a single MySQL database via Docker. This architecture allows data sharing between multiple Laravel applications while maintaining environment isolation through containerization. The project includes Docker service configuration for Nginx, PHP-FPM, and MySQL, with optimized volume management for data persistence. This solution demonstrates my ability to work with containerized environments and design scalable architectures.",
        project2_title: "To-Do List App",
        project2_description: "Task management application with local storage.",
        project3_title: "Portfolio V1",
        project3_description: "My first professional portfolio developed from scratch. Modern and responsive design with smooth navigation, interactive sections, CSS animations, and burger menu for mobile. Project that demonstrates my mastery of front-end development fundamentals.",
        project_link: "View code",
        contact_title: "Contact Me",
        contact_subtitle: "An opportunity or a question? Don't hesitate!",
        contact_name: "Your Name",
        contact_email: "Your Email",
        contact_message: "Your Message",
        contact_btn: "Send",
        footer_rights: "All rights reserved."
    },
    es: {
        nav_home: "Inicio",
        nav_about: "Acerca de",
        nav_skills: "Habilidades",
        nav_projects: "Proyectos",
        nav_contact: "Contacto",
        hero_greeting: "Hola, soy",
        hero_title: "Estudiante de Desarrollo Web",
        hero_description: "Tengo 18 años y transformo ideas en sitios web funcionales y creativos.",
        hero_btn_projects: "Ver mis proyectos",
        hero_btn_contact: "Contactarme",
        about_title: "Acerca de mí",
        about_p1: "Apasionado por la tecnología digital desde pequeño, decidí convertir esta pasión en carrera. Actualmente estudiando desarrollo web, aprendo nuevas tecnologías cada día y desarrollo mis habilidades a través de proyectos concretos.",
        about_p2: "Mi enfoque del desarrollo se basa en tres pilares: calidad de código, experiencia del usuario y aprendizaje continuo. Soy curioso, perseverante y me encanta resolver problemas complejos a través del código.",
        about_p3: "Siempre atento a las últimas tendencias web, me esfuerzo por crear sitios modernos, eficientes y accesibles.",
        stat_years: "Años",
        stat_projects: "Proyectos",
        stat_technologies: "Tecnologías",
        stat_motivation: "Motivación",
        skills_title: "Mis Habilidades",
        projects_title: "Mis Proyectos",
        project1_title: "Proyecto Docker Laravel",
        project1_description: "Un proyecto que conecta dos sitios web distintos a una única base de datos MySQL a través de Docker. Esta arquitectura permite compartir datos entre múltiples aplicaciones Laravel mientras mantiene el aislamiento del entorno mediante contenedores. El proyecto incluye configuración de servicios Docker para Nginx, PHP-FPM y MySQL, con gestión optimizada de volúmenes para persistencia de datos. Esta solución demuestra mi capacidad de trabajar con entornos contenerizados y diseñar arquitecturas escalables.",
        project2_title: "Aplicación To-Do List",
        project2_description: "Aplicación de gestión de tareas con almacenamiento local.",
        project3_title: "Portafolio V1",
        project3_description: "Mi primer portafolio profesional desarrollado desde cero. Diseño moderno y responsivo con navegación fluida, secciones interactivas, animaciones CSS y menú hamburguesa para móvil. Proyecto que demuestra mi dominio de los fundamentos del desarrollo front-end.",
        project_link: "Ver código",
        contact_title: "Contáctame",
        contact_subtitle: "¿Una oportunidad o una pregunta? ¡No dudes en escribir!",
        contact_name: "Tu Nombre",
        contact_email: "Tu Correo",
        contact_message: "Tu Mensaje",
        contact_btn: "Enviar",
        footer_rights: "Todos los derechos reservados."
    },
    it: {
        nav_home: "Home",
        nav_about: "Chi sono",
        nav_skills: "Competenze",
        nav_projects: "Progetti",
        nav_contact: "Contatti",
        hero_greeting: "Ciao, sono",
        hero_title: "Studente di Sviluppo Web",
        hero_description: "Ho 18 anni e trasformo idee in siti web funzionali e creativi.",
        hero_btn_projects: "Visualizza i miei progetti",
        hero_btn_contact: "Contattami",
        about_title: "Chi sono",
        about_p1: "Appassionato di tecnologia digitale fin da piccolo, ho deciso di trasformare questa passione in carriera. Attualmente studente di sviluppo web, imparo nuove tecnologie ogni giorno e sviluppo le mie competenze attraverso progetti concreti.",
        about_p2: "Il mio approccio allo sviluppo si basa su tre pilastri: qualità del codice, esperienza dell'utente e apprendimento continuo. Sono curioso, perseverante e mi piace risolvere problemi complessi attraverso il codice.",
        about_p3: "Sempre attento alle ultime tendenze web, mi impegno a creare siti moderni, performanti e accessibili.",
        stat_years: "Anni",
        stat_projects: "Progetti",
        stat_technologies: "Tecnologie",
        stat_motivation: "Motivazione",
        skills_title: "Le mie Competenze",
        projects_title: "I miei Progetti",
        project1_title: "Progetto Docker Laravel",
        project1_description: "Un progetto che collega due siti web distinti a un unico database MySQL tramite Docker. Questa architettura consente di condividere dati tra più applicazioni Laravel mantenendo l'isolamento dell'ambiente attraverso la containerizzazione. Il progetto include la configurazione dei servizi Docker per Nginx, PHP-FPM e MySQL, con gestione ottimizzata dei volumi per la persistenza dei dati. Questa soluzione dimostra la mia capacità di lavorare con ambienti containerizzati e progettare architetture scalabili.",
        project2_title: "App To-Do List",
        project2_description: "Applicazione di gestione attività con archiviazione locale.",
        project3_title: "Portfolio V1",
        project3_description: "Il mio primo portfolio professionale sviluppato da zero. Design moderno e responsive con navigazione fluida, sezioni interattive, animazioni CSS e menu burger per mobile. Progetto che dimostra la mia padronanza dei fondamenti dello sviluppo front-end.",
        project_link: "Visualizza codice",
        contact_title: "Contattami",
        contact_subtitle: "Un'opportunità o una domanda? Non esitare!",
        contact_name: "Il tuo Nome",
        contact_email: "La tua Email",
        contact_message: "Il tuo Messaggio",
        contact_btn: "Invia",
        footer_rights: "Tutti i diritti riservati."
    },
    de: {
        nav_home: "Startseite",
        nav_about: "Über mich",
        nav_skills: "Fähigkeiten",
        nav_projects: "Projekte",
        nav_contact: "Kontakt",
        hero_greeting: "Hallo, ich bin",
        hero_title: "Webentwicklungs-Student",
        hero_description: "Ich bin 18 Jahre alt und verwandle Ideen in funktionale und kreative Websites.",
        hero_btn_projects: "Meine Projekte anschauen",
        hero_btn_contact: "Kontaktieren Sie mich",
        about_title: "Über mich",
        about_p1: "Leidenschaftlich für digitale Technologie seit meiner Kindheit, habe ich mich entschieden, diese Leidenschaft in eine Karriere umzuwandeln. Derzeit studiere ich Webentwicklung, lerne jeden Tag neue Technologien und entwickle meine Fähigkeiten durch konkrete Projekte.",
        about_p2: "Mein Entwicklungsansatz basiert auf drei Säulen: Codequalität, Benutzererfahrung und kontinuierliches Lernen. Ich bin neugierig, ausdauernd und liebe es, komplexe Probleme durch Code zu lösen.",
        about_p3: "Immer auf die neuesten Web-Trends aufmerksam, bemühe ich mich, moderne, leistungsstarke und barrierefreie Websites zu erstellen.",
        stat_years: "Jahre",
        stat_projects: "Projekte",
        stat_technologies: "Technologien",
        stat_motivation: "Motivation",
        skills_title: "Meine Fähigkeiten",
        projects_title: "Meine Projekte",
        project1_title: "Docker Laravel Projekt",
        project1_description: "Ein Projekt, das zwei separate Websites mit einer einzigen MySQL-Datenbank über Docker verbindet. Diese Architektur ermöglicht die Datenverwaltung zwischen mehreren Laravel-Anwendungen und erhält gleichzeitig die Umgebungsisolierung durch Containerisierung. Das Projekt umfasst die Docker-Servicekonfiguration für Nginx, PHP-FPM und MySQL mit optimierter Volumenverwaltung für Datenpersistenz. Diese Lösung zeigt meine Fähigkeit, mit containerisierten Umgebungen zu arbeiten und skalierbare Architekturen zu entwerfen.",
        project2_title: "To-Do-Listen-App",
        project2_description: "Aufgabenverwaltungsanwendung mit lokalem Speicher.",
        project3_title: "Portfolio V1",
        project3_description: "Mein erstes professionelles Portfolio, von Grund auf entwickelt. Modernes und responsives Design mit flüssiger Navigation, interaktiven Abschnitten, CSS-Animationen und Burger-Menü für Mobilgeräte. Projekt, das meine Beherrschung der Grundlagen der Front-End-Entwicklung zeigt.",
        project_link: "Code anschauen",
        contact_title: "Kontaktieren Sie mich",
        contact_subtitle: "Eine Gelegenheit oder eine Frage? Zögern Sie nicht!",
        contact_name: "Ihr Name",
        contact_email: "Ihre E-Mail",
        contact_message: "Ihre Nachricht",
        contact_btn: "Senden",
        footer_rights: "Alle Rechte vorbehalten."
    },
    ja: {
        nav_home: "ホーム",
        nav_about: "自己紹介",
        nav_skills: "スキル",
        nav_projects: "プロジェクト",
        nav_contact: "お問い合わせ",
        hero_greeting: "こんにちは、私は",
        hero_title: "ウェブ開発学生",
        hero_description: "私は18歳で、アイデアを機能的で創造的なウェブサイトに変えています。",
        hero_btn_projects: "私のプロジェクトを見る",
        hero_btn_contact: "お問い合わせ",
        about_title: "自己紹介",
        about_p1: "幼い頃からデジタル技術に情熱を持ち、この情熱をキャリアに変えることに決めました。現在ウェブ開発を学んでおり、毎日新しい技術を学び、具体的なプロジェクトを通じてスキルを開発しています。",
        about_p2: "私の開発アプローチは3つの柱に基づいています：コード品質、ユーザー体験、継続的な学習。私は好奇心旺盛で、粘り強く、コードを通じて複雑な問題を解決するのが好きです。",
        about_p3: "常にウェブの最新トレンドに注意を払い、モダンで高性能でアクセシブルなウェブサイトを作成することに努めています。",
        stat_years: "年",
        stat_projects: "プロジェクト",
        stat_technologies: "技術",
        stat_motivation: "モチベーション",
        skills_title: "私のスキル",
        projects_title: "私のプロジェクト",
        project1_title: "Docker Laravelプロジェクト",
        project1_description: "Dockerを介して2つの異なるウェブサイトを単一のMySQLデータベースに接続するプロジェクト。このアーキテクチャは、コンテナ化により環境の隔離を維持しながら、複数のLaravelアプリケーション間でデータを共有できます。プロジェクトにはNginx、PHP-FPM、MySQLのDocker サービス設定が含まれており、データ永続性のためにボリューム管理が最適化されています。このソリューションは、コンテナ化された環境で作業し、スケーラブルなアーキテクチャを設計する能力を実証しています。",
        project2_title: "To-Doリストアプリ",
        project2_description: "ローカルストレージを備えたタスク管理アプリケーション。",
        project3_title: "ポートフォリオV1",
        project3_description: "ゼロから開発した私の最初のプロフェッショナルポートフォリオ。スムーズなナビゲーション、インタラクティブなセクション、CSS アニメーション、モバイル用バーガーメニューを備えたモダンでレスポンシブなデザイン。フロントエンド開発の基礎の習得を実証するプロジェクト。",
        project_link: "コードを見る",
        contact_title: "お問い合わせ",
        contact_subtitle: "チャンスか質問がありますか？ためらわずにお知らせください！",
        contact_name: "お名前",
        contact_email: "メールアドレス",
        contact_message: "メッセージ",
        contact_btn: "送信",
        footer_rights: "著作権所有。"
    }
};

let currentLang = 'fr';

// Fonction pour changer la langue
function switchLanguage(lang) {
    if (lang && translations[lang]) {
        currentLang = lang;
    }
    
    // Mettre à jour l'icône du drapeau
    const langIcon = document.querySelector('.lang-icon');
    const langEmojis = {
        'fr': '🇫🇷',
        'en': '🇬🇧',
        'es': '🇪🇸',
        'it': '🇮🇹',
        'de': '🇩🇪',
        'ja': '🇯🇵'
    };
    langIcon.textContent = langEmojis[currentLang] || '🇫🇷';
    
    // Traduire tous les éléments avec data-translate
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLang][key]) {
            element.textContent = translations[currentLang][key];
        }
    });
    
    // Traduire les placeholders
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (translations[currentLang][key]) {
            element.placeholder = translations[currentLang][key];
        }
    });
    
    // Mettre à jour le titre de la page
    const pageTitles = {
        'fr': 'Thomas Cornu | Développeur Web Junior',
        'en': 'Thomas Cornu | Junior Web Developer',
        'es': 'Thomas Cornu | Desarrollador Web Junior',
        'it': 'Thomas Cornu | Sviluppatore Web Junior',
        'de': 'Thomas Cornu | Junior-Webentwickler',
        'ja': 'Thomas Cornu | ジュニアウェブ開発者'
    };
    document.title = pageTitles[currentLang] || 'Thomas Cornu | Développeur Web Junior';
    
    // Sauvegarder la préférence
    localStorage.setItem('preferredLanguage', currentLang);
}

// Charger la langue préférée au démarrage
const savedLang = localStorage.getItem('preferredLanguage');
if (savedLang && savedLang !== currentLang) {
    switchLanguage(savedLang);
}

// Ordre des langues pour le cycle
const languages = ['fr', 'en', 'es', 'it', 'de', 'ja'];

// Ajouter l'événement au bouton de langue pour passer à la suivante
document.getElementById('langToggle').addEventListener('click', (e) => {
    e.stopPropagation();
    const currentIndex = languages.indexOf(currentLang);
    const nextIndex = (currentIndex + 1) % languages.length;
    const nextLang = languages[nextIndex];
    switchLanguage(nextLang);
});