
            document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.carousel-slider');
    const slides = document.querySelectorAll('.carousel-slide');
    const navButtons = document.querySelectorAll('.carousel-nav-btn');
    
    let currentIndex = 1;
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    const slideWidth = 750;
    const gap = 90;
    const slideStep = slideWidth + gap;
    
    function updateCarousel() {
        const viewportWidth = document.querySelector('.carousel-viewport').offsetWidth;
        const centerOffset = (viewportWidth - slideWidth) / 2;
        const translateX = centerOffset - (currentIndex * slideStep);
        
        currentTranslate = translateX;
        prevTranslate = translateX;
        slider.style.transform = `translateX(${translateX}px)`;
        
        slides.forEach((slide, index) => slide.classList.toggle('active', index === currentIndex));
        navButtons.forEach((btn, index) => btn.classList.toggle('active', index === currentIndex));
    }
    
    function goToSlide(index) {
        if (index < 0) index = 0;
        if (index > slides.length - 1) index = slides.length - 1;
        currentIndex = index;
        updateCarousel();
    }
    
    navButtons.forEach((btn, index) => btn.addEventListener('click', () => goToSlide(index)));
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') goToSlide(currentIndex - 1);
        else if (e.key === 'ArrowRight') goToSlide(currentIndex + 1);
    });
    
    slider.addEventListener('mousedown', dragStart);
    slider.addEventListener('mousemove', drag);
    slider.addEventListener('mouseup', dragEnd);
    slider.addEventListener('mouseleave', dragEnd);
    slider.addEventListener('touchstart', dragStart);
    slider.addEventListener('touchmove', drag);
    slider.addEventListener('touchend', dragEnd);
    
    function dragStart(e) {
        isDragging = true;
        startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        slider.style.cursor = 'grabbing';
    }
    
    function drag(e) {
        if (!isDragging) return;
        e.preventDefault();
        const currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        currentTranslate = prevTranslate + (currentX - startX);
        slider.style.transform = `translateX(${currentTranslate}px)`;
    }
    
    function dragEnd() {
        if (!isDragging) return;
        isDragging = false;
        slider.style.cursor = 'grab';
        const movedBy = currentTranslate - prevTranslate;
        
        if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex++;
        else if (movedBy > 100 && currentIndex > 0) currentIndex--;
        
        updateCarousel();
    }
    
    updateCarousel();
    window.addEventListener('resize', updateCarousel);
});
