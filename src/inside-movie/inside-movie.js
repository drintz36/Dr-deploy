        const scrollContainer = document.getElementById('mainContainer');
        const mainNav = document.getElementById('mainNav');
        const sections = document.querySelectorAll('section');
        const dotItems = document.querySelectorAll('.dot-item');
        const dots = document.querySelectorAll('.dot');

        // Detect scroll and slide nav up/down
        scrollContainer.addEventListener('scroll', () => {
            const scrollPosition = scrollContainer.scrollTop;
            const windowHeight = window.innerHeight;

            // If scrolled past first section, slide nav up
            if (scrollPosition > windowHeight * 0.5) {
                mainNav.classList.add('slide-up');
            } else {
                mainNav.classList.remove('slide-up');
            }

            // Update active dot based on scroll position
            // Only consider the first 9 sections (those with dots)
            let currentSection = 0;
            const totalDots = dots.length; // Should be 9
            for (let i = 0; i < totalDots && i < sections.length; i++) {
                const sectionTop = sections[i].offsetTop;
                if (scrollPosition >= sectionTop - windowHeight / 2) {
                    currentSection = i;
                }
            }

            // Update dots - highlight the currently active section
            dots.forEach((dot, index) => {
                if (index === currentSection) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        });

        // Click on dots to navigate to sections
        dotItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                // Make sure we don't go beyond available sections
                if (index < sections.length) {
                    sections[index].scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Video switching functionality
        const videoItems = document.querySelectorAll('.video-item');
        const videoPlayerBg = document.getElementById('video-player-bg');
        const mainPlayBtn = document.getElementById('main-play-button');

        videoItems.forEach(item => {
            item.addEventListener('click', () => {
                // Remove active class from all items
                videoItems.forEach(video => video.classList.remove('active'));

                // Add active class to clicked item
                item.classList.add('active');

                // Get the thumbnail path and video ID from data attributes
                const thumbPath = item.getAttribute('data-video-thumb');
                const videoId = item.getAttribute('data-video-id');

                // Update the video player background
                if (videoPlayerBg && thumbPath) {
                    videoPlayerBg.src = thumbPath;
                }

                // Update the main play button's video ID
                if (mainPlayBtn && videoId) {
                    mainPlayBtn.setAttribute('data-video-id', videoId);
                }
            });
        });

        // Video Modal Functionality
        const videoModal = document.getElementById('video-modal');

        // Search functionality
        const searchBtn = document.getElementById('searchBtn');
        const searchContainer = document.querySelector('.search-container');
        const searchInput = document.getElementById('searchInput');
        const navCollapsible = document.querySelector('.nav-collapsible');

        if (searchBtn && searchContainer && searchInput) {
            searchBtn.addEventListener('click', (e) => {
                e.preventDefault();
                searchContainer.classList.toggle('active');
                if (navCollapsible) {
                    navCollapsible.classList.toggle('search-open');
                }

                if (searchContainer.classList.contains('active')) {
                    searchInput.focus();
                }
            });
            // Close search when clicking outside
            document.addEventListener('click', (e) => {
                if (!searchContainer.contains(e.target) && searchContainer.classList.contains('active')) {
                    searchContainer.classList.remove('active');
                    if (navCollapsible) {
                        navCollapsible.classList.remove('search-open');
                    }
                }
            });
        }
        const videoIframe = document.getElementById('video-iframe');
        const closeModal = document.getElementById('close-modal');
        const mainPlayButton = document.getElementById('main-play-button');
        const allVideoItems = document.querySelectorAll('.video-item');

        // Function to open modal with video
        function openVideoModal(videoId) {
            const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
            videoIframe.src = embedUrl;
            videoModal.classList.remove('hidden');
            videoModal.classList.add('flex');
        }

        // Function to close modal
        function closeVideoModal() {
            videoIframe.src = '';
            videoModal.classList.add('hidden');
            videoModal.classList.remove('flex');
        }

        // Main play button click
        mainPlayButton.addEventListener('click', () => {
            const videoId = mainPlayButton.getAttribute('data-video-id');
            openVideoModal(videoId);
        });

        // Video items click
        allVideoItems.forEach(item => {
            item.addEventListener('click', () => {
                const videoId = item.getAttribute('data-video-id');
                if (videoId) {
                    openVideoModal(videoId);
                }
            });
        });

        // Close button click
        closeModal.addEventListener('click', closeVideoModal);

        // Click outside video to close
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                closeVideoModal();
            }
        });

        // Gallery Slider
        let currentSlide = 1; // Start at index 1 (after the clone)
        const gallerySlider = document.getElementById('gallerySlider');
        const gallerySlides = document.querySelectorAll('.gallery-slide');
        const totalSlides = 5; // Only count real slides, not clones
        const gallerySection = document.querySelector('.gallery-section');
        const prevButton = document.getElementById('prevButton');
        const nextButton = document.getElementById('nextButton');

        function updateGallerySlider(noTransition = false) {
            if (!gallerySlider) {
                console.error('Gallery slider element not found!');
                return;
            }

            console.log('Updating slider to slide:', currentSlide);

            if (noTransition) {
                gallerySlider.style.transition = 'none';
            } else {
                gallerySlider.style.transition = 'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
            }

            // Each slide is full screen width
            const slideWidth = window.innerWidth;

            // Calculate offset: how many pixels to move left
            const offset = currentSlide * slideWidth;

            console.log('Applying transform:', `translateX(-${offset}px)`);
            gallerySlider.style.transform = `translateX(-${offset}px)`;

            // Force reflow to apply no-transition immediately
            if (noTransition) {
                gallerySlider.offsetHeight;
            }
        }

        function goToPrevSlide() {
            console.log('Going to previous slide, current:', currentSlide);
            currentSlide--;
            updateGallerySlider();

            // If we're at the first clone (index 0), jump to the real last slide (index 5)
            if (currentSlide === 0) {
                setTimeout(() => {
                    currentSlide = 5;
                    updateGallerySlider(true);
                }, 800); // Match animation duration
            }
        }

        function goToNextSlide() {
            console.log('Going to next slide, current:', currentSlide);
            currentSlide++;
            updateGallerySlider();

            // If we're at the last clone (index 6), jump to the real first slide (index 1)
            if (currentSlide === 6) {
                setTimeout(() => {
                    currentSlide = 1;
                    updateGallerySlider(true);
                }, 800); // Match animation duration
            }
        }

        // Check if gallery section is in viewport
        function isGalleryVisible() {
            if (!gallerySection) return false;
            const rect = gallerySection.getBoundingClientRect();

            // Check if gallery section is taking up most of the viewport
            // More strict check to ensure gallery is the active section
            const isVisible = rect.top <= 100 && rect.bottom >= window.innerHeight - 100;
            return isVisible;
        }

        // Click handlers for navigation buttons
        if (prevButton) {
            console.log('Prev button found, adding click listener');
            prevButton.addEventListener('click', (e) => {
                console.log('Prev button clicked!');
                e.preventDefault();
                e.stopPropagation();
                goToPrevSlide();
            });
        } else {
            console.error('Prev button not found!');
        }

        if (nextButton) {
            console.log('Next button found, adding click listener');
            nextButton.addEventListener('click', (e) => {
                console.log('Next button clicked!');
                e.preventDefault();
                e.stopPropagation();
                goToNextSlide();
            });
        } else {
            console.error('Next button not found!');
        }

        // Combined keyboard handler for all keyboard events
        document.addEventListener('keydown', (e) => {
            console.log('Key pressed:', e.key);

            // Handle ESC key for video modal
            if (e.key === 'Escape' && !videoModal.classList.contains('hidden')) {
                closeVideoModal();
                return;
            }

            // Handle arrow keys for gallery navigation
            // Check if gallery is visible
            const isVisible = isGalleryVisible();
            console.log('Gallery visible for keyboard:', isVisible);

            if (isVisible) {
                if (e.key === 'ArrowLeft') {
                    console.log('Left arrow pressed, going to prev slide');
                    e.preventDefault(); // Prevent page scroll
                    e.stopPropagation(); // Stop event from bubbling
                    goToPrevSlide();
                } else if (e.key === 'ArrowRight') {
                    console.log('Right arrow pressed, going to next slide');
                    e.preventDefault(); // Prevent page scroll
                    e.stopPropagation(); // Stop event from bubbling
                    goToNextSlide();
                }
            }
        });

        // Initialize - center first real slide (index 1) on load
        window.addEventListener('load', () => {
            updateGallerySlider(true);
        });

        // Recalculate on window resize
        window.addEventListener('resize', () => {
            updateGallerySlider(true);
        });

        // Initialize immediately
        setTimeout(() => {
            updateGallerySlider(true);
        }, 100);
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