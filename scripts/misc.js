function RangeMap(srcMin,srcMax,destMin,destMax){
    this.ratio = ( destMax - destMin ) / ( srcMax - srcMin );
    console.log(this.ratio);
    this.map = function(x){
        return (x-srcMin) * this.ratio + destMin; 
    }
    
}
//populate places list
var list = document.getElementById("place-list");
var locationName = document.getElementById("location-name");
var policeDetails = document.getElementById("police-details");
var hospDetails = document.getElementById("hospital-details");
var firedeptDetails = document.getElementById("firedept-details");
var closestStation = stations.police[0];
var closestHospital = stations.hospital[0];
var closestFireDept = stations.firedept[0];

for(var i in places)(function(i){
    var item = document.createElement('li');
    item.innerHTML = places[i].Location;
    item.addEventListener('click',function(){
        var lat = Number(places[i].Coordinates.split(',')[0]);
        var long = Number(places[i].Coordinates.split(',')[1]);
        pointer.posX = mapper_X.map(long) - 25;
        pointer.posY = mapper_Y.map(lat) - 25;
        console.log(lat + "," + long);
        draw();
        locationName.textContent = places[i].Location;
        policeDetails.textContent = "Police Station: " + closestStation.Number[0] + " | " + closestStation.Specification + " | " + closestStation.Location;
        hospDetails.textContent = "Hospital: " + closestHospital.Number[0] + " | " + closestHospital.Location;
        firedeptDetails.textContent = "Fire Department: " + closestFireDept.Number[0] + " | " + closestFireDept.Specification + " | " + closestFireDept.Location;
        dd_content.classList.remove("droppedContent");
        dropDownBtn.classList.remove("dropped");
        dd_content.showing = false;
    });
    list.appendChild(item);    
})(i);

