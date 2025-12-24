// Select all gallery wrappers
const galleries = document.querySelectorAll(".gallery-wrap");

galleries.forEach((gallery) => {
    // Within each gallery, find the specific wrapper and buttons
    const scrollS = gallery.querySelector(".wrapper");
    const scrollL = gallery.querySelector(".left-btn");
    const scrollR = gallery.querySelector(".right-btn");

    if (scrollS && scrollL && scrollR) {
        // Right Button
        scrollR.addEventListener("click", () => {
            scrollS.style.scrollBehavior = "smooth";
            scrollS.scrollLeft += 1200;
        });

        // Left Button
        scrollL.addEventListener("click", () => {
            scrollS.style.scrollBehavior = "smooth";
            scrollS.scrollLeft -= 1200;
        });
    }
});




/*
// Wheel scroll
scrollS.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    scrollS.scrollLeft += evt.deltaY;

    // Looping logic
    if (scrollS.scrollLeft >= totalScrollWidth - visibleWidth) {
        scrollS.scrollLeft = 0; // Jump back to start
    } else if (scrollS.scrollLeft <= 0) {
        scrollS.scrollLeft = totalScrollWidth - visibleWidth; // Jump to end
    }
});

// Right button
scrollR.addEventListener("click", () => {
    scrollS.style.scrollBehavior = "smooth";
    scrollS.scrollLeft += scrollAmount;

    // Loop check after smooth scroll (use setTimeout for smooth transition)
    setTimeout(() => {
        if (scrollS.scrollLeft >= totalScrollWidth - visibleWidth) {
            scrollS.style.scrollBehavior = "auto"; // Disable smooth jump
            scrollS.scrollLeft = 0;
            scrollS.style.scrollBehavior = "smooth"; // Re-enable smooth
        }
    }, 300); // Adjust timeout based on your smooth scroll speed
});

// Left button
scrollL.addEventListener("click", () => {
    scrollS.style.scrollBehavior = "smooth";
    scrollS.scrollLeft -= scrollAmount;

    setTimeout(() => {
        if (scrollS.scrollLeft <= 0) {
            scrollS.style.scrollBehavior = "auto";
            scrollS.scrollLeft = totalScrollWidth - visibleWidth;
            scrollS.style.scrollBehavior = "smooth";
        }
    }, 300);
});
*/