/** Navigation Bar Code **/

/* Generating the navigation bar */
// Finding the sections
const sections = document.querySelectorAll("section");

// Generating the navigation bar items
const navBarList = document.querySelector("#navbar__list");
sections.forEach((section) => {
  // Create the elements
  const navBarItem = document.createElement("li");
  const navBarLink = document.createElement("a");

  // Modify the properties of the anchor
  navBarLink.textContent = section.dataset.nav;
  navBarLink.href = `#${section.id}`;
  navBarLink.className = "menu__link";

  // Add the elements to the HTML
  navBarItem.append(navBarLink);
  navBarList.append(navBarItem);

  /* Active State */
  document.addEventListener("scroll", () => {
    const distanceFromTop = section.getBoundingClientRect().top;

    if (distanceFromTop <= 300 && distanceFromTop > 0) {
      section.classList.add("active");
      return;
    }
    section.classList.remove("active");
  });
});

/* Smooth Scrolling */

// Event Delegation
navBarList.addEventListener("click", (e) => {
  e.preventDefault(); // Prevents the default scrolling
  const anchor = e.target; // Gets which achor was actually clicked on

  // Scroll to section
  document
    // If anchor.href was used it would return the entire address
    .querySelector(anchor.getAttribute("href")) // Get the section the anchor refers to
    .scrollIntoView({ behavior: "smooth" }); // Scroll untili the section is visible (`{ behaviour: "smooth"}` ensures it scrolls to it smoothly)
});

/* Comment Form */

// Helper function for creating comment objects
function createCommentObject(name, email, content) {
  return {
    name: name,
    email: email,
    content: content,
  };
}

// Enum-Like object to bind the status of the form validation to a number
const validationStatus = {
  emptyName: 1,
  emptyEmail: 2,
  emptyComment: 3,
  invalidEmail: 4,
  success: 5,
};

// Since I'm using BEM, these selector should never select more than one element
const authorName = document.querySelector(".input__name");
const authorEmail = document.querySelector(".input__email");
const commentText = document.querySelector(".input__text");

// Converts the form inputs into a status code
function validateForm() {
  if (authorName.value === "") return validationStatus.emptyName;
  if (authorEmail.value === "") return validationStatus.emptyEmail;
  if (!authorEmail.value.includes("@")) return validationStatus.invalidEmail;
  if (commentText.value === "") return validationStatus.emptyComment;

  return validationStatus.success;
}

// Handles the status form and returns whether or not the code should continue
function handleForm(errorValue) {
  switch (errorValue) {
    case validationStatus.emptyName:
      authorName.placeholder = "Input your Name";
      alert("Input your Name");
      return false;
    case validationStatus.emptyEmail:
      authorEmail.placeholder = "Input your Email";
      alert("Input your Email");
      return false;
    case validationStatus.emptyComment:
      commentText.placeholder = "Enter a Comment";
      alert("Input a Comment");
      return false;
    case validationStatus.invalidEmail:
      authorEmail.value = "";
      authorEmail.placeholder = "Input a valid Email";
      alert("Input a Valid Email");
      return false;
    case validationStatus.success:
      return true;
  }
}

// Rerenders the Comments
const commentsBox = document.querySelector(".comments__box");
function updateComments() {
  commentsBox.innerHTML = "";
  comments.forEach((comment) => {
    commentsBox.innerHTML += `
        <div class="comment__container">
          <div class="comment__content">
            <div class="comment__author">
              <div class="author__info">
                <p class="author__name">${comment.name}</p>
                <p class="author__email">(${comment.email})</p>
              </div>
            </div>
            <p class="comment__text">
              ${comment.content}
            </p>
          </div>
        </div>
    `;
  });
}


const comments = JSON.parse(localStorage.getItem("comments")) || [];
updateComments();

// Handles submitting the form
document.querySelector(".comments__form").addEventListener("submit", (e) => {
  e.preventDefault();
  if (handleForm(validateForm())) {
    comments.push(
      createCommentObject(
        authorName.value,
        authorEmail.value,
        commentText.value,
      ),
    );
    localStorage.setItem("comments", JSON.stringify(comments));
    updateComments();
    // Clear the form after submitting
    authorName.value = "";
    authorEmail.value = "";
    commentText.value = "";
  }
});
