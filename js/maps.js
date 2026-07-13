// ======================================
// ChargeWala Maps
// ======================================

let userLocation = null;

function getCurrentLocation() {

    if (!navigator.geolocation) {

        console.log("Geolocation not supported.");

        return;

    }

    navigator.geolocation.getCurrentPosition(

        (position) => {

            userLocation = {

                latitude: position.coords.latitude,

                longitude: position.coords.longitude

            };

            console.log("User Location:", userLocation);

            if (typeof sortStationsByDistance === "function") {

                sortStationsByDistance();

            }

        },

        (error) => {

            console.error(error);

        },

        {

            enableHighAccuracy: true,

            timeout: 10000

        }

    );

}

getCurrentLocation();