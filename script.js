let map;
let marker;

// Initialize the map
function initMap(latitude, longitude) {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: latitude, lng: longitude },
        zoom: 15
    });

    // Use AdvancedMarkerElement instead of the deprecated Marker
    marker = new google.maps.marker.AdvancedMarkerElement({
        position: { lat: latitude, lng: longitude },
        map: map,
        title: 'Your Location'
    });
}

// Update the map with new coordinates
function updateMap(latitude, longitude) {
    if (map && marker) {
        const newPosition = { lat: latitude, lng: longitude };
        marker.position = newPosition;
        map.panTo(newPosition);
    } else {
        initMap(latitude, longitude);
    }
}

// Start tracking the user's location
if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
        (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
            updateMap(latitude, longitude);
        },
        (error) => {
            console.error("Error getting location:", error);
        },
        {
            enableHighAccuracy: true, // For more accurate results
            timeout: 5000, // Timeout in milliseconds
            maximumAge: 0 // Do not use a cached position
        }
    );
} else {
    console.error("Geolocation is not supported by this browser.");
}