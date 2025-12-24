const slider = document.getElementById('slider');
const line = document.getElementById('line');
const slides = document.querySelectorAll('.slide');
let current = 0, startX = 0;
slides.forEach((s, i) => {
    const btn = document.createElement('button');
    btn.className = 'text-t';
    // flexGrow is gone, so CSS 'flex: 1' will take over
    btn.innerHTML = `<div class="text-tab-content">
        <div class="text-tab-lab">${s.dataset.title}</div>
        <div class="text-tab-pro-bg">
            <div class="text-tab-pro-fill"></div>
        </div>
    </div>`;
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
            fill.style.animation = `pro ${slides[current].dataset.duration || 5}s linear forwards`;
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
const navCollapsible = document.querySelector('.nav-collapsible');
const libraryList = document.getElementById('libraryList');
const librarySearchInput = document.getElementById('librarySearchInput');

if (searchBtn && searchContainer && searchInput) {
    const normalizeSearchText = (value) => (value || '').toLowerCase().trim();

    const applyLibraryFilter = (value) => {
        if (!libraryList) return;

        const query = normalizeSearchText(value);
        const items = libraryList.querySelectorAll('li');
        items.forEach((li) => {
            const titleEl = li.querySelector('h1');
            const title = normalizeSearchText(titleEl ? titleEl.textContent : '');
            li.style.display = query === '' || title.includes(query) ? '' : 'none';
        });
    };

    searchBtn.onclick = (e) => {
        e.preventDefault();
        const wasActive = searchContainer.classList.contains('active');

        if (wasActive) {
            const query = normalizeSearchText(searchInput.value);
            if (query !== '') {
                applyLibraryFilter(query);
                return;
            }
        }

        searchContainer.classList.toggle('active');
        if (navCollapsible) navCollapsible.classList.toggle('search-open', searchContainer.classList.contains('active'));
        if (searchContainer.classList.contains('active')) {
            searchInput.focus();
        }
    };

    searchInput.addEventListener('input', () => {
        applyLibraryFilter(searchInput.value);
        if (librarySearchInput) librarySearchInput.value = searchInput.value;
    });

    searchInput.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        applyLibraryFilter(searchInput.value);
    });

    if (librarySearchInput) {
        librarySearchInput.addEventListener('input', () => {
            applyLibraryFilter(librarySearchInput.value);
            searchInput.value = librarySearchInput.value;
        });
    }

    // Optional: Close on click outside
    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target)) {
            searchContainer.classList.remove('active');
            if (navCollapsible) navCollapsible.classList.remove('search-open');
        }
    });
}