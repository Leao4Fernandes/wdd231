// Timestamp: the date and time the form was loaded
document.querySelector("#timestamp").value = new Date().toISOString();

// Open the matching modal when a "Learn more" link is clicked
document.querySelectorAll("[data-modal]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById(link.dataset.modal).showModal();
  });
});

// Close with the button, or by clicking the backdrop (Esc works by default)
document.querySelectorAll("dialog").forEach((dialog) => {
  dialog.querySelector(".close-modal").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});
