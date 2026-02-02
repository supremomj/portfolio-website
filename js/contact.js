// Handle form submission with custom backend
document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  
  const submitBtn = document.getElementById("submitBtn");
  const formStatus = document.getElementById("formStatus");
  const originalBtnText = submitBtn.innerHTML;
  
  // Show loading state
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span>Sending...</span><span class="material-symbols-outlined text-lg">hourglass_empty</span>';
  formStatus.classList.add("hidden");
  
  // Get form data
  const formData = {
    name: document.getElementById("from_name").value,
    email: document.getElementById("from_email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value
  };
  
  try {
    // Send to our backend
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    
    const result = await response.json();
    
    if (result.success) {
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
    } else {
      // Error from backend
      throw new Error(result.message || 'Failed to send message');
    }
  } catch (error) {
    // Network or other error
    formStatus.classList.remove("hidden");
    formStatus.className = "rounded-lg p-4 text-sm font-medium bg-red-500/10 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800";
    formStatus.textContent = "✗ " + (error.message || "Failed to send message. Please try again.");
    
    // Reset button
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;
    
    console.error("Contact Form Error:", error);
  }
});
