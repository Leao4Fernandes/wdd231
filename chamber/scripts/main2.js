
const membersURL = "data/members.json";
const spotlightCount = 3;

const levelNames = { 1: "Member", 2: "Silver Member", 3: "Gold Member" };

async function getSpotlights() {
  try {
    const response = await fetch(membersURL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    // works whether the file is [ ... ] or { "members": [ ... ] }
    const members = Array.isArray(data) ? data : data.members;

    const goldSilver = members.filter((m) => Number(m.membership) >= 2);
    const chosen = shuffle(goldSilver).slice(0, spotlightCount);
    displaySpotlights(chosen);
  } catch (error) {
    console.error("Spotlight error:", error);
  }
}

// Fisher–Yates shuffle (returns a new shuffled array)
function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function displaySpotlights(members) {
  const container = document.querySelector("#spotlight-cards");
  container.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("article");
    card.classList.add("spotlight-card");

    card.innerHTML = `
      <h3>${member.name}</h3>
      <img src="images/${member.image}" alt="${member.name} logo"
           width="66" height="66" loading="lazy">
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <p><a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
      <p>${levelNames[member.membership] ?? ""}</p>
    `;

    container.appendChild(card);
  });
}

getSpotlights();
