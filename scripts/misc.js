function RangeMap(srcMin,srcMax,destMin,destMax){
    this.ratio = ( destMax - destMin ) / ( srcMax - srcMin );
    console.log(this.ratio);
    this.map = function(x){
        return (x-srcMin) * this.ratio + destMin; 
    }
    
}
//populate places list
var list = document.getElementById("place-list");

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
        dd_content.classList.remove("droppedContent");
        dropDownBtn.classList.remove("dropped");
        dd_content.showing = false;
    });
    list.appendChild(item);    
})(i);

