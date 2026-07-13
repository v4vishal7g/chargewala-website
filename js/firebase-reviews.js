let visibleReviews = 4;

// =====================================
// CACHE
// =====================================

const userCache = new Map();

const stationCache = new Map();

// =====================================
// ChargeWala Live Firebase Reviews
// =====================================

const reviewContainer =
document.getElementById("reviewsContainer");

const loadingState =
document.getElementById("reviewsLoading");

const emptyState =
document.getElementById("reviewsEmpty");

let allReviews = [];

// =====================================
// LOAD REVIEWS
// =====================================

async function loadReviews() {

    if (loadingState) {

        loadingState.style.display = "flex";

    }

    if (emptyState) {

        emptyState.style.display = "none";

    }

    if (reviewContainer) {

        reviewContainer.innerHTML = "";

    }

    try {

        const snapshot = await db
            .collection("reviews")
            .orderBy(
                "createdAt",
                "desc",
            )
            .get();

        allReviews = snapshot.docs;

        console.log(
            "Total Reviews :",
            allReviews.length,
        );

        if (loadingState) {

            loadingState.style.display = "none";

        }

        if (allReviews.length === 0) {

            if (emptyState) {

                emptyState.style.display = "block";

            }

            return;

        }

        // Part 2 me yaha render hoga

       renderReviews(allReviews.slice(0, visibleReviews));

    }

    catch (e) {

        console.error(e);

        if (loadingState) {

            loadingState.style.display = "none";

        }

    }

}

const loadMoreBtn = document.querySelector(".load-more-section .btn");

if (loadMoreBtn) {

    loadMoreBtn.addEventListener("click", () => {

        visibleReviews += 4;

        renderReviews(allReviews.slice(0, visibleReviews));

        // Agar sab reviews dikh gaye
        if (visibleReviews >= allReviews.length) {

            loadMoreBtn.style.display = "none";

        }

    });

}

// =====================================

document.addEventListener(

    "DOMContentLoaded",

    loadReviews,

);

// =====================================
// RENDER REVIEWS
// =====================================
async function renderReviews(reviews){

    reviewContainer.innerHTML="";

    const cards=await Promise.all(

        reviews.map(async(doc)=>{

            const review=doc.data();

            let user=userCache.get(review.driverId);

            if(!user){

                const userDoc=await db

                .collection("users")

                .doc(review.driverId)

                .get();

                user=userDoc.exists

                ?userDoc.data()

                :{};

                userCache.set(

                    review.driverId,

                    user

                );

            }

            let station=

            stationCache.get(

                review.stationId

            );

            if(!station){

                const stationDoc=await db

                .collection("stations")

                .doc(review.stationId)

                .get();

                station=stationDoc.exists

                ?stationDoc.data()

                :{};

                stationCache.set(

                    review.stationId,

                    station

                );

            }

            return createReviewCard(

                review,

                user,

                station

            );

        })

    );

    reviewContainer.innerHTML=

    cards.join("");

}

// =====================================
// REVIEW CARD
// =====================================

function createReviewCard(

    review,

    user,

    station

) {

    const userName =

        user.name ||

        "EV Driver";

    const stationName =

        station.stationName ||

        "Charging Station";

    const avatar =

        userName.charAt(0).toUpperCase();

    const stars = Math.round(review.rating);

const rating =

"★".repeat(stars)+

"☆".repeat(5-stars);

    const date =

        review.createdAt

        ? review.createdAt

              .toDate()

              .toLocaleDateString(

                  "en-IN",

                  {

                      day: "numeric",

                      month: "short",

                      year: "numeric",

                  }

              )

        : "";

    return `

<div class="review-card card">

<div class="review-top">

<div class="review-user">

<div class="review-avatar">

${avatar}

</div>

<div>

<h3>

${userName}

</h3>

<span>

Verified EV Driver

</span>

</div>

</div>

<div class="review-rating">

${rating}

</div>

</div>

<p class="review-text">

${review.review}

</p>

<div class="review-footer">

<span>

📍 ${stationName}

</span>

<span>

${date}

</span>

</div>

</div>

`;

}

// =====================================
// SEARCH
// =====================================

const reviewSearch=

document.querySelector(

".review-search input"

);

if(reviewSearch){

reviewSearch.addEventListener(

"keyup",

()=>{

const keyword=

reviewSearch.value

.toLowerCase()

.trim();

const cards=

document.querySelectorAll(

".review-card"

);

cards.forEach(card=>{

const text=

card.innerText

.toLowerCase();

card.style.display=

text.includes(keyword)

?"block"

:"none";

});

});

}

// =====================================
// FILTER
// =====================================

document

.querySelectorAll(

".filter-btn"

)

.forEach(btn=>{

btn.onclick=()=>{

document

.querySelectorAll(

".filter-btn"

)

.forEach(b=>

b.classList.remove(

"active"

)

);

btn.classList.add(

"active"

);

const value=

btn.innerText;

document

.querySelectorAll(

".review-card"

)

.forEach(card=>{

if(

value==="All Reviews"

){

card.style.display=

"block";

return;

}

const stars=

card.querySelector(

".review-rating"

)

.innerText;

card.style.display=

stars===value

?"block"

:"none";

});

};

});