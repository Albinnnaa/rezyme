// ==================== ТЕМА (темный/светлый режим) ====================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

// Проверяем сохраненную тему
const savedTheme = localStorage.getItem('theme') || 'light';

// Устанавливаем тему при загрузке
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

// Обработчик клика по кнопке темы
themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    
    // Меняем иконку
    if (document.body.classList.contains('dark-theme')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// ==================== МОБИЛЬНОЕ МЕНЮ ====================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ==================== МОДАЛЬНОЕ ОКНО ДЛЯ ИЗОБРАЖЕНИЙ ====================
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalClose = document.querySelector('.modal-close');

// Открытие модального окна при клике на изображения в галерее
document.querySelectorAll('.practice-gallery img, .cert-img').forEach(img => {
    img.addEventListener('click', function() {
        modal.style.display = 'block';
        modalImage.src = this.src;
        modalImage.alt = this.alt;
    });
});

// Закрытие модального окна
modalClose.addEventListener('click', function() {
    modal.style.display = 'none';
});

// Закрытие при клике вне изображения
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Закрытие на Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
    }
});

// ==================== ПЛАВНАЯ ПРОКРУТКА ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== АКТИВНЫЙ ПУНКТ МЕНЮ ПРИ ПРОКРУТКЕ ====================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==================== АНИМАЦИЯ ПРИ ПРОКРУТКЕ ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Наблюдаем за элементами для анимации
document.querySelectorAll('.course-card, .project-card, .roadmap-item').forEach(el => {
    observer.observe(el);
});