// ======================================
// ChargeWala Footer Loader
// ======================================

async function loadFooter() {

    const footer = document.getElementById("footer");

    if (!footer) return;

    try {

        const response = await fetch("components/footer.html");

        footer.innerHTML = await response.text();

        updateFooterYear();

    }

    catch (e) {

        console.error("Footer Load Error", e);

    }

}

function updateFooterYear(){

    const year=document.querySelector(".footer-year");

    if(year){

        year.textContent=new Date().getFullYear();

    }

}

document.addEventListener("DOMContentLoaded",loadFooter);