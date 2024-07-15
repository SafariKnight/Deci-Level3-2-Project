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
  navBarLink.href = `#${section.id}`;

  // Add the elements to the HTML
  navBarItem.append(navBarLink);
  navBarList.append(navBarItem);


});




/** TODO: Add a comment form **/
