// DOM Elements
const header = document.querySelector('.header');
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');

// Handle scroll events
window.addEventListener('scroll', () => {
    // Add shadow to header on scroll
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
    }
});

// Mobile menu toggle (simple implementation for future)
hamburger.addEventListener('click', () => {
    // We would toggle a mobile menu class here
    // nav.classList.toggle('active');
    // hamburger.classList.toggle('active');
    alert('Mobile menu will be implemented here!');
});

// ライトボックス
const overlay = document.createElement('div');
overlay.className = 'lightbox-overlay';
overlay.innerHTML = '<span class="lightbox-close">&times;</span><img>';
document.body.appendChild(overlay);

const lbImg = overlay.querySelector('img');
const lbClose = overlay.querySelector('.lightbox-close');

function openLightbox(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt || '';
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

document.querySelectorAll('.story-card-img').forEach(img => {
    img.addEventListener('click', () => openLightbox(img.src, img.alt));
});

overlay.addEventListener('click', (e) => {
    if (e.target !== lbImg) closeLightbox();
});

lbClose.addEventListener('click', closeLightbox);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});

// Story「もっと読む」トグル
document.querySelectorAll('.story-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
        const body = btn.previousElementSibling;
        const isExpanded = body.classList.toggle('expanded');
        btn.innerHTML = isExpanded
            ? '閉じる <span class="toggle-icon" style="transform:rotate(180deg)">▼</span>'
            : 'もっと読む <span class="toggle-icon">▼</span>';
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Adjust for header height
            const headerHeight = header.offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});
