var userLat, userLong;

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        userLat = position.coords.latitude;
        userLong = position.coords.longitude;
        
        inputBox.placeholder = "Location : " + userLat + ", " + userLong;
        
        locationName.textContent = userLat.toFixed(6) + ", " + userLong.toFixed(6);
        displayDetails();
        
    });
} else {
    console.log("Geolocation not available");
}
