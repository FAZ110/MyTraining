const menuIcon = document.getElementById("menu-icon");
const mobileMenu = document.querySelector(".mobile-menu");
let isMenuOpen = false;

menuIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        mobileMenu.style.display = "flex";
        // Allow display:flex to take effect before adding active class
        setTimeout(() => {
            mobileMenu.classList.add("active");
        }, 10);
    } else {
        mobileMenu.classList.remove("active");
        // Wait for animation to finish before hiding
        setTimeout(() => {
            mobileMenu.style.display = "none";
        }, 300);
    }
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
    if (isMenuOpen && !mobileMenu.contains(e.target)) {
        isMenuOpen = false;
        mobileMenu.classList.remove("active");
        setTimeout(() => {
            mobileMenu.style.display = "none";
        }, 300);
    }
});