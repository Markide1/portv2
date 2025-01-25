// Function to load Header & Footer content dynamically
function loadHTMLContent(file, elementId) {
  fetch(file)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(elementId).innerHTML = data;

      // If header is loaded, initialize components
      if (elementId === "header-container") {
        initializeHamburgerMenu();
      }
    })
    .catch((error) => {
      console.error("Error loading HTML content:", error);
    });
}

// Load the header and footer into their respective containers
loadHTMLContent("components/header.html", "header-container");
loadHTMLContent("components/footer.html", "footer-container");

// Function to initialize Hamburger Menu
function initializeHamburgerMenu() {
  const hamburger = document.querySelector(".hamburger-menu");
  const sidebar = document.querySelector(".sidebar-menu");
  const overlay = document.querySelector(".sidebar-overlay");
  const closeBtn = document.querySelector(".close-sidebar");

  if (!hamburger || !sidebar || !overlay || !closeBtn) return;

  function toggleMenu() {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  }

  // Remove existing event listeners to prevent multiple bindings
  hamburger.removeEventListener("click", toggleMenu);
  closeBtn.removeEventListener("click", toggleMenu);
  overlay.removeEventListener("click", toggleMenu);

  // Add new event listeners
  hamburger.addEventListener("click", toggleMenu);
  closeBtn.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", toggleMenu);

  // Close menu when a link is clicked
  const sidebarLinks = document.querySelectorAll(".sidebar-nav a");
  sidebarLinks.forEach((link) => {
    link.removeEventListener("click", toggleMenu);
    link.addEventListener("click", toggleMenu);
  });

  // Close menu on Escape key
  function handleEscapeKey(e) {
    if (e.key === "Escape" && sidebar.classList.contains("active")) {
      toggleMenu();
    }
  }

  document.removeEventListener("keydown", handleEscapeKey);
  document.addEventListener("keydown", handleEscapeKey);
}

// Initialize on DOM load as a fallback
document.addEventListener("DOMContentLoaded", initializeHamburgerMenu);
