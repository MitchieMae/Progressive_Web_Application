var mapCanvas = document.getElementById("baguioMap");
var mapCtx = mapCanvas.getContext("2d");

//set size

mapCanvas.height = document.body.clientHeight;
mapCanvas.width = document.body.clientWidth;

var mapBg = new Image();
mapBg.src = "assets/test.svg";

mapBg.onload = function(){
    mapCtx.drawImage(mapBg,0,0);
}

var mapTranslation = [0,0];

mapCanvas.addEventListener("mousemove",moveMap);
mapCanvas.addEventListener("mousedown",mouseDown);
mapCanvas.addEventListener("mouseup",mouseUp);
//TODO touch events

var mousePressed = false;

function mouseDown(event){
    mousePressed = true;
    prevCursPos_X = event.clientX;
    prevCursPos_Y = event.clientY;
    event.stopPropagation();
}

function mouseUp(event){
    mousePressed = false;
    event.stopPropagation();
}

var prevCursPos_X, prevCursPos_Y = undefined;

function moveMap(event){
    event.stopPropagation();
    if(!mousePressed) return;
    if(prevCursPos_X === undefined && prevCursPos_Y === undefined){
        prevCursPos_X = event.clientX;
        prevCursPos_Y = event.clientY;
    }else{
        offsetMap(event.clientX - prevCursPos_X,
                  event.clientY - prevCursPos_Y);
        prevCursPos_X = event.clientX;
        prevCursPos_Y = event.clientY;
    }
}

function offsetMap(x_offset,y_offset){
    mapTranslation[0] += x_offset;
    mapTranslation[1] += y_offset;
    mapCtx.clearRect(0,0,mapCanvas.width,mapCanvas.height)
    mapCtx.save();
    mapCtx.translate(mapTranslation[0],mapTranslation[1]);
    mapCtx.drawImage(mapBg,0,0);
    mapCtx.restore();
}