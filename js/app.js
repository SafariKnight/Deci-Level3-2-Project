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

  // Add the elements to the HTML
  navBarItem.append(navBarLink);
  navBarList.append(navBarItem);


/* Active State */
  document.addEventListener("scroll", () => {
    const distanceFromTop = section.getBoundingClientRect().top;

    if (distanceFromTop <= 300) {
      section.classList = ["active"]
      return
    }
    section.classList = []
  })
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



/** TODO: Add a comment form **/
