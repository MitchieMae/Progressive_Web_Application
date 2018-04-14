var userLat, userLong;

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        userLat = position.coords.latitude;
        userLong = position.coords.longitude;
        
        inputBox.placeholder = "Location : " + userLat + ", " + userLong;
        
    });
} else {
    console.log("Geolocation not available");
}
