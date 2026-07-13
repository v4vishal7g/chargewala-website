console.log("⚡ ChargeWala Website Started");

/*=========================================
    HERO IMAGE FALLBACK
=========================================*/

window.addEventListener("load", () => {

    const image = document.querySelector(".ev-car");

    const placeholder = document.querySelector(".car-placeholder");

    if (!image || !placeholder) return;

    image.onload = () => {

        image.style.display = "block";

        placeholder.style.display = "none";

    };

    image.onerror = () => {

        image.style.display = "none";

        placeholder.style.display = "flex";

    };

});
/*=========================================
    STATS COUNTER
=========================================*/

const counters=document.querySelectorAll(".stat-number[data-target]");

const statsObserver=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const counter=entry.target;

const target=+counter.dataset.target;

let current=0;

const increment=Math.ceil(target/100);

const update=()=>{

current+=increment;

if(current>=target){

counter.textContent=target.toLocaleString()+"+";

}else{

counter.textContent=current.toLocaleString()+"+";

requestAnimationFrame(update);

}

};

update();

statsObserver.unobserve(counter);

}

});

},{threshold:.5});

counters.forEach(counter=>{

statsObserver.observe(counter);

});