// ******************************************
// Footer Dates 

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

// ******************************************
// Nav

const navButton = document.querySelector("#ham-btn");
const navBar = document.querySelector("#nav-bar");

if (navButton && navBar) {
    navButton.addEventListener("click", () => {
        const isOpen = navBar.classList.toggle("show");

        navButton.classList.toggle("show", isOpen);
        navButton.setAttribute("aria-expanded", String(isOpen));
    });
}

// ******************************************
// Data

// adjust the variables and the attributes to match your data source and the elements in your data file. The displayData function will need to be adjusted to match the data you are working with.


const cards = document.getElementById("cards");
const url = "./data/members.json";

async function getDocumentData() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();

        displayData(data.companies);

    } catch (error) {
        console.error(error);
    }
}

const displayData = (companies) => {

    companies.forEach((company) => {

        const card = document.createElement("section");
        const fullName = document.createElement("h2");
        const portrait = document.createElement("img");
        const address = document.createElement("p");
        const phone = document.createElement("p");
        const website = document.createElement("a");
        const membership = document.createElement("p");

        fullName.textContent = company.name;

        portrait.setAttribute("src", `./images/${company.image}`);
        portrait.setAttribute("alt", `${company.name} company`);
        portrait.setAttribute("loading", "lazy");
        portrait.setAttribute("width", "340");
        portrait.setAttribute("height", "440");

        address.textContent = company.address;

        phone.textContent = company.phone;

        website.textContent = company.website;
        website.setAttribute("href", company.website);
        website.setAttribute("target", "_blank");
        website.setAttribute("rel", "noopener noreferrer");

        if (company.membership === 3) {
            membership.textContent = "Gold Member";
        } else if (company.membership === 2) {
            membership.textContent = "Silver Member";
        } else {
            membership.textContent = "Member";
        }

        card.appendChild(fullName);
        card.appendChild(portrait);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(membership);

        cards.appendChild(card);
    });
};

getDocumentData();
