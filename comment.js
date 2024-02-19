import { BASE_URL } from "./const.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("commentForm");
  const submitButton = document.getElementById("submitComment");
  // Obtain the postIdentifier from the URL or other means
  const postIdentifier = window.location.pathname.split("/").pop(); // This needs to be defined outside of your submitComment function

  // Function to handle form submission
  function submitComment(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    const name = document.getElementById("nameInput").value;
    const comment = document.getElementById("commentInput").value;

    // Send the data using fetch to your backend
    fetch(`${BASE_URL}/comments/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, comment, postIdentifier }),
    })
      .then((response) => {
        if (!response.ok) {
          // Convert non-2xx HTTP responses into errors
          return response.json().then((errorData) => {
            throw new Error(errorData.message || "Network response was not ok");
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        // Optionally clear the form
        document.getElementById("nameInput").value = "";
        document.getElementById("commentInput").value = "";
        // Call loadComments to refresh the comment list
        loadComments(postIdentifier);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Display an error message to the user
        document.getElementById("formMessage").textContent = error.message;
      });
  }

  // Attach event listener to the submit button instead of form to control the submission
  if (submitButton) {
    submitButton.addEventListener("click", submitComment);
  } else {
    console.error("Submit button not found");
  }

  // Function to load comments
  function loadComments(postIdentifier) {
    fetch(`${BASE_URL}/comments/get/${postIdentifier}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }
        return response.json();
      })
      .then((comments) => {
        const commentsList = document.getElementById("commentsList");
        commentsList.innerHTML = ""; // Clear existing comments
        comments.forEach((comment) => {
          const commentBox = document.createElement("div");
          commentBox.className = "comment-box";

          const avatarDiv = document.createElement("div");
          avatarDiv.className = "comment-avatar";
          avatarDiv.innerHTML =
            '<img src="assets/images/seo/avatar1.png" alt="avatar">';

          const contentDiv = document.createElement("div");
          contentDiv.className = "comment-content";

          const nameDiv = document.createElement("h4");
          nameDiv.className = "comment-name";
          nameDiv.textContent = comment.name;

          const commentDiv = document.createElement("p");
          commentDiv.className = "comment-text";
          commentDiv.textContent = comment.comment;

          contentDiv.appendChild(nameDiv);
          contentDiv.appendChild(commentDiv);

          commentBox.appendChild(avatarDiv);
          commentBox.appendChild(contentDiv);

          commentsList.appendChild(commentBox);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // Call loadComments with the postIdentifier to load comments when the page loads
  loadComments(postIdentifier);
});
