// ======================================
// ChargeWala Stations
// ======================================

const stationGrid = document.getElementById("stationGrid");
const searchInput = document.getElementById("searchInput");
const chargerFilter = document.getElementById("chargerFilter");
const searchBtn = document.getElementById("searchBtn");

const loadingState = document.getElementById("loadingState");
const emptyState = document.getElementById("emptyState");

let allStations = [];

// ======================================
// Load Stations
// ======================================

async function loadStations() {

    loadingState.style.display = "block";
    emptyState.style.display = "none";
    stationGrid.innerHTML = "";

    try {

        const snapshot = await db.collection("stations").get();

        allStations = [];

        snapshot.forEach(doc => {

            allStations.push(doc.data());

        });

        console.log("Connected!");
        console.log("Total Stations:", allStations.length);

        loadingState.style.display = "none";

        renderStations(allStations);

    }

    catch (error) {

        loadingState.style.display = "none";

        console.error("Firestore Error:", error);

    }

}

// ======================================
// Render Stations
// ======================================

function renderStations(list) {

    stationGrid.innerHTML = "";

    if (list.length === 0) {

        emptyState.style.display = "block";

        return;

    }

    emptyState.style.display = "none";

    list.forEach(station => {

        stationGrid.innerHTML += createStationCard(station);

    });

}

// ======================================
// Station Card
// ======================================

function createStationCard(station) {

    const image =
        station.imageUrl && station.imageUrl.trim() !== ""
            ? station.imageUrl
            : "assets/image/station-placeholder.png";

    const statusClass = station.available ? "available" : "busy";

    const statusText = station.available ? "Available" : "Busy";

    const distance = station.distance
        ? station.distance.toFixed(1) + " km Away"
        : "--";

    return `

<div class="station-card">

    <div class="station-top">

    
        <img
            src="${image}"
            class="station-image"
            onerror="this.src='assets/image/station-placeholder.png'">

        <div class="station-head">

            <div class="station-status-row">

                <span class="status ${statusClass}">
                    ● ${statusText}
                </span>

                <span class="rating">
                    ⭐ ${station.rating}
                </span>

            </div>

            <h3>${station.stationName}</h3>

            <p class="address">

                📍 ${station.address}

            </p>

        </div>

    </div>

    <div class="station-grid-info">

        <div class="info-box">

            ⚡

            <span>Charger</span>

            <strong>${station.chargerType}</strong>

        </div>

        <div class="info-box">

            🔌

            <span>Available</span>

            <strong>${station.availableChargers}/${station.totalChargers}</strong>

        </div>

        <div class="info-box">

            💰

            <span>Price</span>

            <strong>₹${station.pricePerUnit}</strong>

        </div>

        <div class="info-box">

            📍

            <span>Distance</span>

            <strong>${distance}</strong>

        </div>

    </div>

    <div class="station-actions">

        <a

        class="btn-outline"

        target="_blank"

        href="https://www.google.com/maps/dir/?api=1&destination=${station.latitude},${station.longitude}">

            <i class="fa-solid fa-location-arrow"></i>

            Navigate

        </a>

        <a

        class="btn"

        href="download.html">

            <i class="fa-solid fa-mobile-screen"></i>

            Book App

        </a>

    </div>

</div>

`;

}

// ======================================
// Search
// ======================================

function filterStations() {

    const keyword = searchInput.value.trim().toLowerCase();

    const charger = chargerFilter.value;

    const filtered = allStations.filter(station => {

        const name =
            (station.stationName || "").toLowerCase();

        const address =
            (station.address || "").toLowerCase();

        const type =
            station.chargerType || "";

        const matchSearch =
            name.includes(keyword) ||
            address.includes(keyword);

        const matchCharger =
            charger === "" ||
            type === charger;

        return matchSearch && matchCharger;

    });

    renderStations(filtered);

}

// ======================================
// Events
// ======================================

searchInput.addEventListener("input", filterStations);

chargerFilter.addEventListener("change", filterStations);

searchBtn.addEventListener("click", filterStations);

// ======================================
// Init
// ======================================

loadStations();
// ======================================
// Distance
// ======================================

function calculateDistance(lat1, lon1, lat2, lon2) {

    const R = 6371;

    const dLat = (lat2 - lat1) * Math.PI / 180;

    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =

        Math.sin(dLat / 2) *

        Math.sin(dLat / 2) +

        Math.cos(lat1 * Math.PI / 180) *

        Math.cos(lat2 * Math.PI / 180) *

        Math.sin(dLon / 2) *

        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;

}

// ======================================
// Sort
// ======================================

function sortStationsByDistance() {

    if (!userLocation) return;

    allStations.forEach(station => {

        station.distance = calculateDistance(

            userLocation.latitude,

            userLocation.longitude,

            station.latitude,

            station.longitude

        );

    });

    allStations.sort((a, b) => a.distance - b.distance);

    renderStations(allStations);

}