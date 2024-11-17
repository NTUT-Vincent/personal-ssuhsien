// script.js

// Highlight active section in navigation
const navLinks = document.querySelectorAll('.header nav a');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(nav => nav.classList.remove('active'));
        link.classList.add('active');
    });
});

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
