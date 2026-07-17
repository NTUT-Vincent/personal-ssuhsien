const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const updateScrollProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? Math.min((window.scrollY / scrollable) * 100, 100) : 0;
    document.documentElement.style.setProperty("--scroll-progress", `${progress}%`);
};

const setActiveNavigation = () => {
    if (!("IntersectionObserver" in window)) return;

    const navigationLinks = [...document.querySelectorAll(".top-nav a[href^='#']")];
    const sections = navigationLinks
        .map((link) => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);

    if (!sections.length) return;

    const navigationObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                navigationLinks.forEach((link) => {
                    const isActive = link.getAttribute("href") === `#${entry.target.id}`;
                    link.classList.toggle("active", isActive);

                    if (isActive) {
                        link.setAttribute("aria-current", "location");
                    } else {
                        link.removeAttribute("aria-current");
                    }
                });
            });
        },
        { rootMargin: "-24% 0px -62%", threshold: 0 }
    );

    sections.forEach((section) => navigationObserver.observe(section));
};

const addScrollReveal = () => {
    if (reducedMotion) return;

    document.documentElement.classList.add("motion-ready");

    const revealTargets = [
        ...document.querySelectorAll(
            ".section-heading, .experience-card, .expertise-card, .work-card, .earlier-work"
        ),
    ];

    revealTargets.forEach((target, index) => {
        target.classList.add("reveal");
        target.style.setProperty("--reveal-delay", `${(index % 3) * 90}ms`);
    });

    if (!("IntersectionObserver" in window)) {
        revealTargets.forEach((target) => target.classList.add("is-visible"));
        document.body.classList.add("page-ready");
        return;
    }

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        },
        { rootMargin: "0px 0px -8%", threshold: 0.12 }
    );

    revealTargets.forEach((target) => revealObserver.observe(target));

    requestAnimationFrame(() => {
        requestAnimationFrame(() => document.body.classList.add("page-ready"));
    });
};

const addCardSpotlights = () => {
    if (reducedMotion || !window.matchMedia("(pointer: fine)").matches) return;

    const cards = document.querySelectorAll(
        ".hero, .experience-card, .expertise-card, .work-card, .earlier-work"
    );

    cards.forEach((card) => {
        card.classList.add("spotlight-card");
        card.addEventListener("pointermove", (event) => {
            const bounds = card.getBoundingClientRect();
            card.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
            card.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
        });
    });
};

let scrollFrame;
window.addEventListener(
    "scroll",
    () => {
        if (scrollFrame) return;
        scrollFrame = requestAnimationFrame(() => {
            updateScrollProgress();
            scrollFrame = undefined;
        });
    },
    { passive: true }
);

updateScrollProgress();
setActiveNavigation();
addScrollReveal();
addCardSpotlights();
