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




// Initialize EmailJS
(function () {
  emailjs.init("yL67veS68GcByv1He");  
})();

// Email validation function
function validateEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
}

// Show notification
function showNotification(message, isSuccess) {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.className = isSuccess ? 'success' : 'error';
  notification.style.display = 'block';

  setTimeout(() => {
      notification.style.display = 'none';
  }, 4000);
}

document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const name = document.getElementById('name').value;
  const message = document.getElementById('message').value;

  if (!validateEmail(email)) {
      showNotification('Please enter a valid email address', false);
      return;
  }

  emailjs.sendForm(
      'service_devmail',     // Service ID
      'template_jtnyfzu',    // Template ID
      this
  ).then(
      function (response) {
          showNotification('Message sent successfully!', true);
          document.getElementById('contact-form').reset();
      },
      function (error) {
          showNotification('Failed to send message. Please try again.', false);
          console.error('EmailJS error:', error);
      })
    })
  })
    