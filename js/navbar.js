function initNavbar() {

    const navbar = document.querySelector(".navbar");
    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");
    const overlay = document.querySelector(".menu-overlay");

    if (!navbar) return;

    // Sticky Navbar
    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 30);
    });

    // Active Page
    const currentPage = location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-links a").forEach(link => {

        if (link.getAttribute("href") === currentPage) {

            link.classList.add("active-link");

        }

    });

    function openMenu() {

        navLinks.classList.add("active");
        overlay.classList.add("active");
        menuBtn.classList.add("active");

        document.body.style.overflow = "hidden";

    }

    function closeMenu() {

        navLinks.classList.remove("active");
        overlay.classList.remove("active");
        menuBtn.classList.remove("active");

        document.body.style.overflow = "";

    }

    menuBtn.addEventListener("click", () => {

        navLinks.classList.contains("active")
            ? closeMenu()
            : openMenu();

    });

    overlay.addEventListener("click", closeMenu);

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", closeMenu);

    });

    document.addEventListener("keydown", (e)=>{

        if(e.key==="Escape"){

            closeMenu();

        }

    });

}