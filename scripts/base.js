
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
const courseDetails = document.querySelector("#course-details");

function displayCourseDetails(course) {
    courseDetails.innerHTML = `
        <button type="button" id="closeModal" aria-label="Close">❌</button>
        <h2>${course.subject} ${course.number}</h2>
        <h3>${course.title}</h3>
        <p><strong>Credits</strong>: ${course.credits}</p>
        <p><strong>Certificate</strong>: ${course.certificate}</p>
        <p>${course.description}</p>
        <p><strong>Technologies</strong>: ${course.technology.join(", ")}</p>
    `;

    courseDetails.showModal();

    courseDetails.querySelector("#closeModal").addEventListener("click", () => {
        courseDetails.close();
    });
}

if (courseDetails) {
    /* Close when clicking the dark backdrop outside the box */
    courseDetails.addEventListener("click", (event) => {
        if (event.target === courseDetails) {
            courseDetails.close();
        }
    });

    /* Give every course button its own click listener */
    courseButtons.forEach((courseButton) => {
        const label = courseButton.textContent.trim(); // e.g. "WDD 131"

        const course = courses.find(
            (c) => `${c.subject} ${c.number}` === label
        );

        if (course) {
            courseButton.addEventListener("click", () => {
                displayCourseDetails(course);
            });
        }
    });
}

const wdd131Button = document.querySelector("#wdd131");
displayCourseDetails(wdd131Button);