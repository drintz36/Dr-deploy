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
