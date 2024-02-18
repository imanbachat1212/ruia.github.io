document.addEventListener("DOMContentLoaded", function () {
  var contactForm = document.getElementById("contact-form");
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents the default form submission behavior

    // Collecting form data
    var formData = {
      name: document.querySelector("[name='name']").value,
      phone: document.querySelector("[name='number']").value,
      email: document.querySelector("[name='email']").value,
      company: document.querySelector("[name='company']").value, // Ensure this matches the 'name' attribute in your form
      message: document.querySelector("[name='message']").value, // Ensure this matches the 'name' attribute in your form
    };

    // Sending the form data using fetch
    fetch("https://backend-ruia.onrender.com/contact/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(function (response) {
        return response.text();
      })
      .then(function (data) {
        // Handling the response
        console.log("Success:", data);
        document.querySelector(".form-messege").textContent =
          "Form submitted successfully!";
      })
      .catch(function (error) {
        // Handling errors
        console.error("Error:", error);
        document.querySelector(".form-messege").textContent =
          "An error occurred!";
      });
  });
});
