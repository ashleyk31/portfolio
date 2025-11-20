// ========================================================
// ========================================================
// hamburger menu script
const hamMenu = document.querySelector('.ham-menu');
const offScreenMenu = document.querySelector('.off-screen');

hamMenu.addEventListener('click', () => {
    hamMenu.classList.toggle('active');
    offScreenMenu.classList.toggle('active');
});

// ========================================================
// ========================================================
// nav bar toggle
// const toggleBtn = document.getElementById("menu-toggle");
// const sidebar = document.querySelector(".sidebar");

// toggleBtn.addEventListener("click", () => {
//     const isOpen = sidebar.style.display === "flex";

//     if (isOpen) {
//         sidebar.style.display = "none";
//         toggleBtn.src = "assets/view.png";
//     } else {
//         sidebar.style.display = "flex";
//         toggleBtn.src = "assets/hide.png";
//     }
// });

const toggleBtn = document.getElementById("menu-toggle");
const sidebar = document.querySelector(".sidebar");

toggleBtn.addEventListener("click", () => {
    const isOpen = sidebar.style.display === "block";

    if (isOpen) {
        sidebar.style.display = "none";
        toggleBtn.src = "assets/view.png";

    } else {
        sidebar.style.display = "block";
        toggleBtn.src = "assets/hide.png";
    }
    toggleBtn.classList.toggle("icon-rotate");
    
});