const body = document.body;

function applyTheme(theme){

    if(theme === "dark"){

        body.classList.add("dark");

    }else{

        body.classList.remove("dark");

    }

}

function initTheme(){

    const savedTheme = localStorage.getItem("theme") || "light";

    applyTheme(savedTheme);

    const btn = document.querySelector(".theme-btn");

    if(!btn) return;

    btn.textContent = savedTheme === "dark" ? "☀️" : "🌙";

    btn.addEventListener("click",()=>{

        const isDark = body.classList.contains("dark");

        const newTheme = isDark ? "light" : "dark";

        applyTheme(newTheme);

        localStorage.setItem("theme",newTheme);

        btn.textContent = newTheme === "dark" ? "☀️" : "🌙";

    });

}