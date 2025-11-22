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
    
});

// ========================================================
// ========================================================
// password on pages

const urlParams = new URLSearchParams(window.location.search);
const currentPage = window.location.pathname.split('/').pop().toLowerCase().trim();

// Pages that don't need password
const publicPages = ['index.html', 'aboutme.html', 'work.html', 'art.html', 'password.html', ''];

// Check if user is authenticated OR on a public page
const isAuthenticated = sessionStorage.getItem('authenticated') === 'true';

if (!publicPages.includes(currentPage) && !isAuthenticated && urlParams.get('auth') !== 'true') {
    window.location.href = 'password.html?redirect=' + currentPage;
}

// If they came with ?auth=true, save to sessionStorage
if (urlParams.get('auth') === 'true') {
    console.log("true")
    sessionStorage.setItem('authenticated', 'true');
}

const correct = "ashleykang";
const redirectPage = urlParams.get('redirect') || 'index.html';

function checkPassword() {
    const entered = document.getElementById("password").value;

    if (entered == correct) {
        sessionStorage.setItem('authenticated', 'true');  // Save authentication
        window.location.href = redirectPage;  // No need for ?auth=true anymore
    } else {
        document.getElementById("error").style.display = "block";
    }
}