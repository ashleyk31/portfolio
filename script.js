function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}  

// Get references to the button and content
const toggleButton = document.getElementById('toggleButton');
const content = document.getElementById('content');

// Add click event listener to the button
toggleButton.addEventListener('click', function() {
  // Toggle the visibility of the content
  if (content.style.display === 'none') {
    content.style.display = 'block'; // Show content
    toggleButton.src = 'collapse.png'; // Change button image
  } else {
    content.style.display = 'none'; // Hide content
    toggleButton.src = 'expand.png'; // Change button image
  }
});
