// ========================================================
// ========================================================
// hamburger menu script
const hamMenu = document.querySelector('.ham-menu');
const offScreenMenu = document.querySelector('.off-screen');

hamMenu.addEventListener('click', () => {
    hamMenu.classList.toggle('active');
    offScreenMenu.classList.toggle('active');
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 1000) {
        hamMenu.classList.remove('active');
        offScreenMenu.classList.remove('active');
    }
});

// ========================================================
// ========================================================
// nav bar toggle
const toggleBtn = document.getElementById("menu-toggle");
const sidebar = document.querySelector(".sidebar");
const toggleImg = toggleBtn.querySelector("img");

toggleBtn.addEventListener("click", () => {
    const isOpen = sidebar.style.display === "block";

    if (isOpen) {
        sidebar.style.display = "none";
        toggleImg.src = "assets/view.png";
    } else {
        sidebar.style.display = "block";
        toggleImg.src = "assets/hide.png";
    }
});

// ========================================================
// ========================================================
// password on pages

const urlParams = new URLSearchParams(window.location.search);
const currentPage = window.location.pathname.split('/').pop().toLowerCase().trim();

// Pages that don't need password
const publicPages = ['index.html', 'graphic.html', 'digital.html', 'work.html', 'art.html', 'password.html', ''];

// Check if user already typed in the password OR is on a public page
const isAuthenticated = sessionStorage.getItem('authenticated') === 'true';

if (!publicPages.includes(currentPage) && !isAuthenticated && urlParams.get('auth') !== 'true') {
    window.location.href = 'password.html?redirect=' + currentPage;
}

// If they successfully entered the password
if (urlParams.get('auth') === 'true') {
    console.log("password correct")
    sessionStorage.setItem('authenticated', 'true');
}

const correct = "ashleykang";
const redirectPage = urlParams.get('redirect') || 'index.html';

function checkPassword() {
    const entered = document.getElementById("password").value;
    
    if (entered == correct) {
        // user doesn't need to type in the password again
        sessionStorage.setItem('authenticated', 'true'); 
        window.location.href = redirectPage; 
    } else {
        document.getElementById("error").style.display = "block";
    }
}
