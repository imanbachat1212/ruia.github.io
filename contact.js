import { BASE_URL } from "./const.js";

document.addEventListener("DOMContentLoaded", function () {
  var submitButton = document.getElementById("submit");

  // Debug: Log to console to confirm the script has loaded and button was found
  console.log("DOMContentLoaded", submitButton);

  submitButton.addEventListener("click", function (event) {
    console.log("Button clicked"); // Debug: Log to console when the button is clicked

    // Prevents the default button click behavior
    event.preventDefault();

    // Collecting form data
    var formData = {
      name: document.querySelector("[name='name']").value,
      phone: document.querySelector("[name='number']").value,
      email: document.querySelector("[name='email']").value,
      company: document.querySelector("[name='company']").value,
      message: document.querySelector("[name='message']").value,
    };

    console.log("Form data", formData); // Debug: Log the collected form data

    // Sending the form data using fetch
    fetch(`${BASE_URL}/contact/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(function (response) {
        console.log("Response received"); // Debug: Log when a response is received
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then(function (data) {
        console.log("Success:", data); // Debug: Log successful data submission
        document.querySelector(".form-messege").textContent =
          "Form submitted successfully!";

        // Open Calendly scheduling after form submission
        Calendly.initPopupWidget({
          url: "https://calendly.com/farah-b-salhab/30min?hide_gdpr_banner=1",
        });
      })
      .catch(function (error) {
        console.error("Error:", error); // Debug: Log any errors
        document.querySelector(".form-messege").textContent =
          "An error occurred!";
      });
  });
});
