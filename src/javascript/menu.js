const menuBtn = document.getElementById('menuToggle');
const blueMenu = document.getElementById('blueMenu');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    blueMenu.classList.toggle('hidden');
    blueMenu.classList.toggle('flex');
});



//about subscribe

let lastScroll = 0;
const btn = document.getElementById('subscribeBtn');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 50) {
        btn.classList.add('drop-up');
    } else {
        btn.classList.remove('drop-up');
    }
    lastScroll = currentScroll;
});