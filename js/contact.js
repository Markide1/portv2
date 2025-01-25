document.addEventListener("DOMContentLoaded", function () {
  // FAQ Accordion
  document.querySelectorAll(".faq-item h4").forEach((header) => {
    header.addEventListener("click", () => {
      const parent = header.parentElement;
      const isActive = parent.classList.contains("active");

      // Hide all open FAQ items
      document.querySelectorAll(".faq-item").forEach((item) => {
        item.classList.remove("active");
      });

      // If the clicked FAQ was not active, activate it
      if (!isActive) {
        parent.classList.add("active");
      }
    });
  });

  // Contact Form Handling
  const contactForm = document.querySelector(
    'form[name="submit-to-google-sheet"]'
  );
  const msgElement =
    document.getElementById("msg") || document.createElement("div");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Email Validation
      const emailInput = document.getElementById("email");
      const email = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        emailInput.focus();
        return;
      }

      // Google Sheet Script URL
      const scriptURL =
        "https://script.google.com/macros/s/AKfycbzLxTBYvN6Ozl0NTHWX0hlMbSpEZjEbsDEUTG25TvpdEj5mYrwcucYlTvIfmq6IRQeJ/exec";

      fetch(scriptURL, {
        method: "POST",
        body: new FormData(contactForm),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          msgElement.textContent = "Message sent successfully!";
          msgElement.style.color = "green";
          contactForm.reset();

          setTimeout(() => {
            msgElement.textContent = "";
          }, 3000);
        })
        .catch((error) => {
          console.error("Error!", error);
          msgElement.textContent = "An error occurred. Please try again.";
          msgElement.style.color = "red";
        });
    });
  } else {
    console.error("Contact form not found");
  }
});
