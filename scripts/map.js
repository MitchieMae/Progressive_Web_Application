var mapCanvas = document.getElementById("baguioMap");
var mapCtx = mapCanvas.getContext("2d");

//top-left : 16.436468, 120.544788
//bottom-right : 16.361842, 120.631776

//set size

mapCanvas.height = document.body.clientHeight;
mapCanvas.width = document.body.clientWidth;

var mapBg = document.getElementById("mapSVG");
var testItem = document.getElementById("testItem");

mapBg.onload = function(){
    mapCtx.drawImage(mapBg,0,0);
}

testItem.onload = function(){
    mapCtx.drawImage(testItem,0,0);
}

var mapTranslation = [0,0];
var mapScale = [1,1];

mapCanvas.addEventListener("mousemove",moveMap);
mapCanvas.addEventListener("mousedown",mouseDown);
mapCanvas.addEventListener("mouseup",mouseUp);
//TODO touch events


///mapcontrols
var zoomInBtn = document.getElementById("mapCtr_zoom-in");
var zoomOutBtn = document.getElementById("mapCtr_zoom-out");

zoomInBtn.addEventListener("click",zoomIn);
zoomOutBtn.addEventListener("click",zoomOut);

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
    draw();
}

function zoomIn(){
    mapScale[0] += .5;
    mapScale[1] += .5;
    draw();
}

function zoomOut(){
    mapScale[0] -= .5;
    mapScale[1] -= .5;
    draw();
    console.log("zoomout");
}

function draw(){
    mapCtx.clearRect(0,0,mapCanvas.width,mapCanvas.height)
    mapCtx.save();
    mapCtx.translate(mapTranslation[0],mapTranslation[1]);
    mapCtx.scale(mapScale[0],mapScale[1]);
    mapCtx.drawImage(mapBg,0,0);
    mapCtx.drawImage(testItem,0,0);
    mapCtx.restore();
}