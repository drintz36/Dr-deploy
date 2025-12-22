const navItems = document.querySelectorAll(".nav-links > li");

navItems.forEach((item) => {
    const link = item.querySelector(".nav-link");
    const dropdown = item.querySelector(".nav-dropdown");

    if (link && dropdown) {
        let hideTimeout;

        const showDropdown = () => {
            clearTimeout(hideTimeout);
            // Hide other open dropdowns first for a cleaner transition
            document.querySelectorAll(".nav-dropdown").forEach(d => {
                if (d !== dropdown) {
                    d.classList.add("hidden");
                    d.style.display = "none";
                }
            });
            document.querySelectorAll(".nav-link").forEach(l => {
                if (l !== link) l.classList.remove("text-blue-500");
            });

            dropdown.classList.remove("hidden");
            dropdown.style.display = "flex";
            link.classList.add("text-blue-500");
        };

        const hideDropdown = () => {
            hideTimeout = setTimeout(() => {
                dropdown.classList.add("hidden");
                dropdown.style.display = "none";
                link.classList.remove("text-blue-500");
            }, 200);
        };

        item.onmouseenter = showDropdown;
        item.onmouseleave = hideDropdown;
    }
});

// Close all active dropdowns on scroll
window.addEventListener("scroll", () => {
    document.querySelectorAll(".nav-dropdown").forEach(dropdown => {
        if (!dropdown.classList.contains("hidden")) {
            dropdown.classList.add("hidden");
            dropdown.style.display = "none";
        }
    });
    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.remove("text-blue-500");
    });
}, { passive: true });