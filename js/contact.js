// Initialize EmailJS
emailjs.init("JxH9YrbhybSikVo6t");

// Handle form submission
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const submitBtn = document.getElementById("submitBtn");
  const formStatus = document.getElementById("formStatus");
  const originalBtnText = submitBtn.innerHTML;
  
  // Show loading state
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span>Sending...</span><span class="material-symbols-outlined text-lg">hourglass_empty</span>';
  formStatus.classList.add("hidden");
  
  // Get form data
  const templateParams = {
    from_name: document.getElementById("from_name").value,
    from_email: document.getElementById("from_email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
    to_email: "santiano2200383@ceu.edu.ph"
  };
  
  // Send email
  emailjs.send("service_g2zy6am", "template_s948ntj", templateParams)
    .then(function(response) {
      // Success
      formStatus.classList.remove("hidden");
      formStatus.className = "rounded-lg p-4 text-sm font-medium bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800";
      formStatus.textContent = "✓ Message sent successfully! I'll get back to you soon.";
      
      // Reset form
      document.getElementById("contactForm").reset();
      
      // Reset button
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        formStatus.classList.add("hidden");
      }, 5000);
    }, function(error) {
      // Error
      formStatus.classList.remove("hidden");
      formStatus.className = "rounded-lg p-4 text-sm font-medium bg-red-500/10 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800";
      formStatus.textContent = "✗ Failed to send message. Please check your configuration or try again.";
      
      // Reset button
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
      
      console.error("EmailJS Error:", error);
    });
});
