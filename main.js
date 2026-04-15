function bindLinks() {
    document.querySelectorAll('a').forEach(anchor => {
        // Clone and replace to remove old listeners
        const newAnchor = anchor.cloneNode(true);
        anchor.replaceWith(newAnchor);

        newAnchor.addEventListener('click', async function (e) {
            const href = this.getAttribute('href');
            if (href && !href.startsWith('#') && !href.startsWith('http') && !this.hasAttribute('target')) {
                e.preventDefault();

                // Start transition
                const isHome = href.includes('index.html') || href === '/';
                console.log(`[Transition] Navigation started: ${isHome ? 'To Home' : 'To Subpage'}`);
                document.body.classList.remove('page-loaded');
                document.body.classList.add('page-leaving');

                // Force a reflow to ensure styles are committed
                void document.body.offsetWidth;

                // Deliberate delay to ensure the browser strictly registers the start state
                // Removed delay so `nav-to-subpage` takes effect immediately for faster element hiding like `.hero-content`
                console.log(`[Transition] Starting animation...`);
                document.body.classList.add(isHome ? 'nav-to-home' : 'nav-to-subpage');

                // Performance optimization: start fetch immediately
                const fetchPromise = fetch(href).then(r => {
                    if (!r.ok) throw new Error('Network fail');
                    return r.text();
                });

                // Calculate transition wait time (2200ms for slide up/down, 400ms for fast subpage switch)
                const isFromHome = document.body.classList.contains('home-page');
                const waitTime = (!isHome && !isFromHome) ? 400 : 2200;

                // Wait for exit animation AND fetch
                const [html] = await Promise.all([
                    fetchPromise,
                    new Promise(resolve => setTimeout(resolve, waitTime))
                ]).catch(err => {
                    window.location.href = href;
                    return [];
                });

                if (!html) return;

                const parser = new DOMParser();
                const newDoc = parser.parseFromString(html, 'text/html');

                // Apply changes
                document.title = newDoc.title;

                // Update Body Classes - Atomic update to prevent flicker
                const pageTypeClasses = ['home-page', 'kontakt-page', 'info-page'];
                const newPageType = Array.from(newDoc.body.classList).find(c => pageTypeClasses.includes(c));
                if (newPageType) {
                    document.body.classList.remove(...pageTypeClasses);
                    document.body.classList.add(newPageType);
                }

                // Sync Header (Active state) without innerHTML replacement
                const currentLinks = document.querySelectorAll('header nav a');
                const newLinks = newDoc.querySelectorAll('header nav a');
                currentLinks.forEach((link, idx) => {
                    if (newLinks[idx] && newLinks[idx].classList.contains('active')) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });

                // Sync Hero Container Elements (Layer, Fade, Pop Layer)
                const currentHeroLayer = document.querySelector('.hero-layer');
                const newHeroLayer = newDoc.querySelector('.hero-layer');
                if (currentHeroLayer && newHeroLayer) {
                    currentHeroLayer.src = newHeroLayer.src;
                }

                const currentFade = document.querySelector('.city-bottom-fade');
                const newFade = newDoc.querySelector('.city-bottom-fade');
                if (!currentFade && newFade) {
                    document.querySelector('.hero-container').insertBefore(newFade.cloneNode(true), document.querySelector('.pop-layer-wrapper'));
                } else if (currentFade && !newFade) {
                    currentFade.remove();
                }

                // Sync Pop Layer Wrapper
                const currentPopWrapper = document.querySelector('.pop-layer-wrapper');
                const newPopWrapper = newDoc.querySelector('.pop-layer-wrapper');

                if (currentPopWrapper && newPopWrapper) {
                    const currentImg = currentPopWrapper.querySelector('img');
                    const newImg = newPopWrapper.querySelector('img');

                    if (currentImg && newImg) {
                        const currentSrc = currentImg.getAttribute('src');
                        const newSrc = newImg.getAttribute('src');

                        if (currentSrc !== newSrc) {
                            currentPopWrapper.replaceWith(newPopWrapper.cloneNode(true));
                        }
                    }
                } else if (currentPopWrapper) {
                    currentPopWrapper.remove();
                } else if (newPopWrapper) {
                    document.querySelector('.hero-container').appendChild(newPopWrapper.cloneNode(true));
                }

                // Sync Hero Content
                const currentHeroContent = document.querySelector('.hero-content');
                const newHeroContent = newDoc.querySelector('.hero-content');
                if (currentHeroContent && newHeroContent) {
                    currentHeroContent.innerHTML = newHeroContent.innerHTML;
                }

                // Sync Content Section
                const currentContent = document.querySelector('.content-section');
                const newContent = newDoc.querySelector('.content-section');
                if (currentContent && newContent) {
                    currentContent.innerHTML = newContent.innerHTML;
                    currentContent.className = newContent.className;
                    if (newContent.id) currentContent.id = newContent.id;
                    else currentContent.removeAttribute('id');
                } else if (currentContent) {
                    currentContent.remove();
                } else if (newContent) {
                    document.body.appendChild(newContent.cloneNode(true));
                }

                window.history.pushState({}, '', href);
                window.scrollTo(0, 0);

                // Allow a single frame for the browser to "see" the new elements at translateY(0)
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        document.body.classList.remove('page-leaving');
                        document.body.classList.remove('nav-to-home');
                        document.body.classList.remove('nav-to-subpage');
                        document.body.classList.add('page-loaded');
                    });
                });

                bindLinks();
            }
        });
    });

    // Mobile Menu Toggle Logic
    const burgerToggle = document.getElementById('burgerToggle');
    if (burgerToggle) {
        burgerToggle.onclick = () => {
            document.body.classList.toggle('header-nav-active');
        };
    }

    // Close menu when clicking a link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            document.body.classList.remove('header-nav-active');
        });
    });
}

window.addEventListener("pageshow", function () {
    document.body.classList.remove('page-leaving');
    document.body.classList.add('page-loaded');
});

window.addEventListener("popstate", () => {
    window.location.reload();
});

// Initial bind
document.addEventListener('DOMContentLoaded', () => {
    bindLinks();

    // Slow down background hero video by 20%
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        heroVideo.playbackRate = 0.8;
    }

    // Intro video handling
    const introContainer = document.getElementById('intro-video-container');
    const introVideo = document.getElementById('intro-video');

    if (introContainer && introVideo) {
        if (!sessionStorage.getItem('introPlayed')) {
            document.body.style.overflow = 'hidden';

            const hideIntro = () => {
                if (!introContainer.classList.contains('hidden')) {
                    introContainer.classList.add('hidden');
                    document.body.style.overflow = '';
                    sessionStorage.setItem('introPlayed', 'true');
                    setTimeout(() => introContainer.remove(), 1000);
                }
            };

            // Try to play explicitly
            const playPromise = introVideo.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    hideIntro(); // Fallback if autoplay is blocked
                });
            }

            introVideo.addEventListener('ended', hideIntro);
            introVideo.addEventListener('error', hideIntro);
            // Timeupdate alternative check because ended sometimes doesn't fire gracefully if interrupted
            introVideo.addEventListener('timeupdate', () => {
                if (introVideo.duration && introVideo.currentTime >= introVideo.duration - 0.5) {
                    hideIntro();
                }
            });
            setTimeout(hideIntro, 12000); // 12s Fallback just in case
        } else {
            introContainer.remove();
        }
    }
});
bindLinks(); // Also call immediately in case DOMContentLoaded already fired
