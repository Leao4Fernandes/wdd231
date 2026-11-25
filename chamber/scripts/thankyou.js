// Read the form data sent in the URL (method="get")
const params = new URLSearchParams(window.location.search);

// Only the required fields + timestamp are shown
const fields = [
  ["first", "First Name"],
  ["last", "Last Name"],
  ["email", "Email"],
  ["phone", "Mobile Phone"],
  ["organization", "Business Name"],
  ["timestamp", "Submitted On"],
];

const results = document.querySelector("#results");

fields.forEach(([key, label]) => {
  let value = params.get(key) || "Not provided";

  if (key === "timestamp" && params.get(key)) {
    value = new Intl.DateTimeFormat("en-GB", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(new Date(value));
  }

  const dt = document.createElement("dt");
  dt.textContent = label;
  const dd = document.createElement("dd");
  dd.textContent = value; // textContent keeps user input safe
  results.append(dt, dd);
});