const slider = document.getElementById('slider');
const line = document.getElementById('line');
const slides = document.querySelectorAll('.slide');
let current = 0, startX = 0;
slides.forEach((s, i) => {
    const btn = document.createElement('button');
    btn.className = 'text-t';
    btn.style.flexGrow = s.dataset.duration || 8;
    btn.innerHTML = `<div class="text-tab-lab">${s.dataset.title}</div><div class="text-tab-pro-bg"><div class="text-tab-pro-fill"></div></div>`;
    btn.onclick = () => activate(i);
    btn.querySelector('.text-tab-pro-fill').addEventListener('animationend', () => i === current && next());
    line.appendChild(btn);
});
function activate(idx) {
    current = idx;
    slides.forEach((s, i) => {
        s.classList.toggle('active', i === current);
        const vid = s.querySelector('video');
        if (vid) {
            if (i === current) {
                vid.currentTime = 0;
                vid.play().catch(() => { });
            } else {
                vid.pause();
            }
        }
    });
    Array.from(line.children).forEach((tab, i) => {
        tab.classList.toggle('active', i === current);
        const fill = tab.querySelector('.text-tab-pro-fill');
        fill.style.animation = 'none';
        fill.style.width = '0%';
        if (i < current) {
            fill.style.width = '100%';
        } else if (i === current) {
            void fill.offsetWidth;
            fill.style.animation = `pro ${slides[current].dataset.duration || 8}s linear forwards`;
        }
    });
}

const next = () => activate((current + 1) % slides.length);
const prev = () => activate((current - 1 + slides.length) % slides.length);

slider.addEventListener('keydown', e => e.key === 'ArrowRight' ? next() : e.key === 'ArrowLeft' && prev());

const pause = () => slider.classList.add('paused');
const resume = () => slider.classList.remove('paused');

['mousedown', 'touchstart'].forEach(evt => slider.addEventListener(evt, e => {
    startX = (e.touches ? e.touches[0] : e).clientX;
    pause();
}));

['mouseup', 'touchend'].forEach(evt => slider.addEventListener(evt, e => {
    resume();
    const clientX = (e.changedTouches ? e.changedTouches[0] : e).clientX;
    if (clientX !== undefined) {
        const diff = clientX - startX;
        if (Math.abs(diff) > 50) diff < 0 ? next() : prev();
    }
}));
slider.addEventListener('mouseleave', resume);
setTimeout(() => activate(0), 50);






// Search Bar Toggle
const searchBtn = document.getElementById('searchBtn');
const searchContainer = document.querySelector('.search-container');
const searchInput = document.getElementById('searchInput');

if (searchBtn && searchContainer && searchInput) {
    searchBtn.onclick = (e) => {
        e.preventDefault();
        searchContainer.classList.toggle('active');
        if (searchContainer.classList.contains('active')) {
            searchInput.focus();
        }
    };

    // Optional: Close on click outside
    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target)) {
            searchContainer.classList.remove('active');
        }
    });
}