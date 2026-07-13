/*=============================
Scroll Progress
=============================*/

const progress = document.querySelector(".scroll-progress");

if (progress) {

    window.addEventListener("scroll", () => {

        const total =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const current = window.scrollY;

        progress.style.width = (current / total) * 100 + "%";

    });

}

/*=============================
Top Button
=============================*/

const topBtn = document.querySelector(".scroll-top");

if (topBtn) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            topBtn.classList.add("show");

        } else {

            topBtn.classList.remove("show");

        }

    });

    topBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

/*=============================
Cursor Glow
=============================*/

const glow = document.querySelector(".cursor-glow");

if (glow) {

    window.addEventListener("mousemove", (e) => {

        glow.style.left = e.clientX + "px";

        glow.style.top = e.clientY + "px";

    });

}