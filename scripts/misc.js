function RangeMap(srcMin,srcMax,destMin,destMax){
    this.ratio = ( destMax - destMin ) / ( srcMax - srcMin );
    console.log(this.ratio);
    this.map = function(x){
        return (x-srcMin) * this.ratio + destMin; 
    }
    
}

var list = document.getElementById("place-list");
var inputBox = document.getElementById("searchBox");
inputBox.addEventListener('keydown',search);

//populate places list
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
        draw();
        locationName.textContent = places[i].Location;
        policeDetails.textContent = closestStation.Number[0];
        policeDetails.textContent = closestFireDept.Number[0];
        dd_content.classList.remove("droppedContent");
        dropDownBtn.classList.remove("dropped");
        dd_content.showing = false;
        inputBox.value = places[i].Location;
        searchClosestStations(lat,long);
    });
    list.appendChild(item);
//    console.log(item.innerHTML);
})(i);

var listChild = list.querySelectorAll('li');

function search(){
    
    var searchitem = inputBox.value;

    for(var i in listChild){
        if(listChild[i].textContent.toLowerCase().indexOf(searchitem.toLowerCase()) >= 0){
            listChild[i].style.display = 'block';
        }else{
            listChild[i].style.display = 'none';
        }
    }
        
}

function searchClosestStations(lat,long){
    
}

