
/* ========================================
   1. FOOTER DATES
======================================== */

const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
    const modifiedDate = new Date(document.lastModified);

    lastModified.textContent = `Last Modified: ${new Intl.DateTimeFormat(
        "en-GB",
        {
            dateStyle: "medium",
            timeStyle: "short"
        }
    ).format(modifiedDate)}`;
}

/* ========================================
   2. MOBILE NAVIGATION
======================================== */

const navButton = document.querySelector("#ham-btn");
const navBar = document.querySelector("#nav-bar");

if (navButton && navBar) {
    navButton.addEventListener("click", () => {
        const isOpen = navBar.classList.toggle("show");

        navButton.classList.toggle("show", isOpen);
        navButton.setAttribute("aria-expanded", String(isOpen));
    });
}

/* ========================================
   3. COURSE FILTERS
======================================== */

const filterButtons = document.querySelectorAll(
    ".course-filters button"
);

const courseButtons = document.querySelectorAll(
    ".course-list button"
);

filterButtons.forEach((filterButton) => {
    filterButton.addEventListener("click", () => {
        const selectedFilter = filterButton.dataset.filter;

        /* Update the active filter button */

        filterButtons.forEach((button) => {
            const isActive = button === filterButton;

            button.classList.toggle("active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });

        /* Show matching courses */

        courseButtons.forEach((courseButton) => {
            const courseCategory = courseButton.dataset.category;

            const shouldShow =
                selectedFilter === "all" ||
                courseCategory === selectedFilter;

            courseButton.hidden = !shouldShow;
        });
    });
});
