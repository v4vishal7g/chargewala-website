// ======================================
// ChargeWala FAQ
// ======================================

const faqs = [

{
category:"Drivers",
question:"What is ChargeWala?",
answer:"ChargeWala helps EV drivers find verified charging stations across India."
},

{
category:"Drivers",
question:"How do I find nearby charging stations?",
answer:"Open the Find Stations page or use the ChargeWala mobile app to search nearby stations."
},

{
category:"Booking",
question:"Can I book a charging station?",
answer:"Yes. Charging slots can be booked directly from the ChargeWala mobile application."
},

{
category:"Partners",
question:"How can I become a ChargeWala Partner?",
answer:"Click on Become Partner and submit the Google Form. Our team will contact you after verification."
},

{
category:"Payments",
question:"Which payment methods are supported?",
answer:"UPI, Credit Card, Debit Card and other online payment methods are supported inside the app."
},

{
category:"Drivers",
question:"Are all stations verified?",
answer:"Yes. Every charging station listed on ChargeWala is verified before being published."
},

{
category:"Booking",
question:"Can I cancel my booking?",
answer:"Yes. Cancellation is available according to the station's booking policy."
},

{
category:"Partners",
question:"Is there any registration fee?",
answer:"No. Joining ChargeWala as a partner is completely free."
},

{
category:"Payments",
question:"Do I receive an invoice?",
answer:"Yes. A digital invoice is available after successful payment."
},

{
category:"Drivers",
question:"Is ChargeWala available in all cities?",
answer:"We are expanding rapidly and continuously adding new cities and charging stations."
}

];

const faqContainer=document.getElementById("faqContainer");

renderFaqs(faqs);
function renderFaqs(list) {

    faqContainer.innerHTML = "";

    // No FAQ Found
    if (list.length === 0) {

        faqContainer.innerHTML = `

        <div class="faq-empty">

            <i class="fa-solid fa-circle-question"></i>

            <h3>No FAQ Found</h3>

            <p>Try another search keyword.</p>

        </div>

        `;

        return;

    }

    // Render FAQs
    list.forEach(faq => {

        faqContainer.innerHTML += `

        <div class="faq-item card">

            <div class="faq-question">

                <h3>${faq.question}</h3>

                <i class="fa-solid fa-plus"></i>

            </div>

            <div class="faq-answer">

                <p>

                    ${faq.answer}

                </p>

            </div>

        </div>

        `;

    });

    // Initialize Accordion
    initAccordion();

}

// ======================================
// Accordion
// ======================================

function initAccordion(){

document.querySelectorAll(".faq-question").forEach(item=>{

item.onclick=()=>{

const parent=item.parentElement;

parent.classList.toggle("active");

};

});

}

// ======================================
// SEARCH
// ======================================

const faqSearch = document.getElementById("faqSearch");

faqSearch.addEventListener("input", filterFaqs);

// ======================================
// CATEGORY FILTER
// ======================================

const faqButtons =
document.querySelectorAll(".faq-btn");

faqButtons.forEach(btn=>{

btn.addEventListener("click",()=>{

faqButtons.forEach(b=>{

b.classList.remove("active");

});

btn.classList.add("active");

filterFaqs();

});

});

// ======================================
// FILTER FAQ
// ======================================

function filterFaqs(){

const keyword=

faqSearch.value

.toLowerCase()

.trim();

const activeCategory=

document.querySelector(

".faq-btn.active"

).innerText;

const filtered=

faqs.filter(faq=>{

const matchCategory=

activeCategory==="All"

||

faq.category===activeCategory;

const matchSearch=

faq.question

.toLowerCase()

.includes(keyword)

||

faq.answer

.toLowerCase()

.includes(keyword);

return matchCategory && matchSearch;

});

renderFaqs(filtered);

}

// ======================================
// EXPAND / COLLAPSE
// ======================================

const expandAll = document.getElementById("expandAll");

const collapseAll = document.getElementById("collapseAll");

if(expandAll){

expandAll.onclick=()=>{

document.querySelectorAll(".faq-item")

.forEach(item=>{

item.classList.add("active");

});

};

}

if(collapseAll){

collapseAll.onclick=()=>{

document.querySelectorAll(".faq-item")

.forEach(item=>{

item.classList.remove("active");

});

};

}