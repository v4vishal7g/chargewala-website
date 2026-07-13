async function loadComponent(id, file){

    try{

        const response = await fetch(file);

        if(!response.ok){

            throw new Error(`Unable to load ${file}`);

        }

        document.getElementById(id).innerHTML = await response.text();

       if(id==="navbar"){
        setTimeout(()=>{

    if(typeof observer!=="undefined"){

        document.querySelectorAll(".fade-up").forEach(el=>{

            observer.observe(el);

        });

    }

},100);

            if(typeof initNavbar==="function"){

                initNavbar();

            }

            if(typeof initTheme==="function"){

                initTheme();

            }

        }

    }catch(error){

        console.error(error);

    }

}

loadComponent("navbar","components/navbar.html");