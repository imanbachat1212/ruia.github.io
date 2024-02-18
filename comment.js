document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("commentForm"); // Make sure to give your form an ID

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect form data
    const name = document.getElementById("nameInput").value; // Use correct IDs for your inputs
    const comment = document.getElementById("commentInput").value;

    // Send the data using fetch to your backend
    fetch("/comments/post", {
      // Use the correct endpoint you defined in your backend
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, comment }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        // Here you can add the new comment to the DOM
        // so that it appears without needing to refresh the page
        // ...
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});
// Function to load comments
function loadComments() {
  fetch("/comments/get") // Use the correct endpoint you defined in your backend
    .then((response) => response.json())
    .then((comments) => {
      const commentsList = document.getElementById("commentsList"); // Replace with your actual element
      commentsList.innerHTML = ""; // Clear existing comments

      // Append each comment to the comments list
      comments.forEach((comment) => {
        const commentElement = document.createElement("div");
        commentElement.innerHTML = `
            <h4>${comment.name}</h4>
            <p>${comment.comment}</p>
          `;
        commentsList.appendChild(commentElement);
      });
    })
    .catch((error) => console.error("Error:", error));
}

// Call this function when the page loads
document.addEventListener("DOMContentLoaded", () => {
  loadComments();
});
