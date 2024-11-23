// script.js

// Get all tabs and contents
const tabs = document.querySelectorAll(".tab");
const tabContents = document.querySelectorAll(".tab-content");

// Add click event to each tab
tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        // Remove 'active' class from all tabs
        tabs.forEach((t) => t.classList.remove("active"));

        // Add 'active' class to the clicked tab
        tab.classList.add("active");

        // Hide all tab contents
        tabContents.forEach((content) => content.classList.remove("active"));

        // Show content corresponding to the clicked tab
        const target = tab.getAttribute("data-tab");
        document.getElementById(target).classList.add("active");
    });
});
