var mapCanvas = document.getElementById("baguioMap");
var mapCtx = mapCanvas.getContext("2d");

//top-left : 16.436468, 120.544788
//bottom-right : 16.361842, 120.631776

var top_leftCoor = new Object();
top_leftCoor.lat = 16.453924; //Y
top_leftCoor.long = 120.549271 - 0.002; //X

var bottom_rightCoor = new Object();
bottom_rightCoor.lat = 16.329225;
bottom_rightCoor.long = 120.634303 - 0.002;

//set size

mapCanvas.height = document.body.clientHeight;
mapCanvas.width = document.body.clientWidth;

if (mapCanvas.height > mapCanvas.width) {
    mapCanvas.width = mapCanvas.height;
} else {
    mapCanvas.height = mapCanvas.width;
}

var mapBg = document.getElementById("mapSVG");
mapBg.src = "assets/baguiomap.svg";
mapBg.width = mapCanvas.width;
mapBg.height = mapCanvas.height;
var testItem = document.getElementById("testItem");

mapBg.onload = function () {
    mapCtx.drawImage(mapBg, 0, 0);
}

var mapTranslation = [0, 0];
var mapScale = [1, 1];
var mousePressed, touchPressed = false;
var prevCursPos_X, prevCursPos_Y, prevTouchPos_X, prevTouchPos_Y = undefined;
var mousedown_time, mouseelapsed;

mapCanvas.addEventListener("mousemove", moveMap);
mapCanvas.addEventListener("mousedown", mouseDown);
mapCanvas.addEventListener("mouseup", mouseUp);
mapCanvas.addEventListener("touchstart", touchPress);
mapCanvas.addEventListener("touchmove", touchMoveMap);
mapCanvas.addEventListener("touchend", touchRelease);
mapCanvas.addEventListener("click",function(e){
    if(mouseelapsed < 500){
        drawPointer(e.clientX,e.clientY);
    }
});


///mapcontrols
var zoomInBtn = document.getElementById("mapCtr_zoom-in");
var zoomOutBtn = document.getElementById("mapCtr_zoom-out");

zoomInBtn.addEventListener("click", zoomIn);
zoomOutBtn.addEventListener("click", zoomOut);

var mapper_X = new RangeMap(top_leftCoor.long, bottom_rightCoor.long,
    0, mapBg.width);
var mapper_Y = new RangeMap(top_leftCoor.lat, bottom_rightCoor.lat,
    0, mapBg.height);

function plotOnMap(elem, lat, long) {
    mapCtx.drawImage(elem, mapper_X.map(long), mapper_Y.map(lat));
}

function plotOnMap(elem,lat, long,width,height){
    mapCtx.drawImage(elem,mapper_X.map(long) - width/2, mapper_Y.map(lat) - height/2 ,width,height);
}

function mouseDown(event) {
    mousePressed = true;
    prevCursPos_X = event.clientX;
    prevCursPos_Y = event.clientY;
    mousedown_time = Date.now();
    event.stopPropagation();
}

function mouseUp(event) {
    mousePressed = false;
    mouseelapsed = Date.now() - mousedown_time;
    event.stopPropagation();
}

function touchPress(event) {
    touchPressed = true;
    prevTouchPos_X = event.touches[0].clientX;
    prevTouchPos_Y = event.touches[0].clientY;
    mousedown_time = Date.now();
    event.stopPropagation();
}

function touchRelease(event) {
    touchPressed = false;
    mouseelapsed = Date.now() - mousedown_time;
    event.stopPropagation();
    
}

function moveMap(event) {
    event.stopPropagation();
    if (!mousePressed) return;
    if (prevCursPos_X === undefined && prevCursPos_Y === undefined) {
        prevCursPos_X = event.clientX;
        prevCursPos_Y = event.clientY;
    } else {
        offsetMap(event.clientX - prevCursPos_X,
            event.clientY - prevCursPos_Y);
        prevCursPos_X = event.clientX;
        prevCursPos_Y = event.clientY;
    }
}

function touchMoveMap(event) {
    if (!touchPressed) return;
    if (prevTouchPos_X === undefined && prevTouchPos_Y === undefined) {
        prevTouchPos_X = event.touches[0].clientX;
        prevTouchPos_Y = event.touches[0].clientY;
    } else {
        offsetMap(event.touches[0].clientX - prevTouchPos_X,
                  event.touches[0].clientY - prevTouchPos_Y);
        prevTouchPos_X = event.touches[0].clientX;
        prevTouchPos_Y = event.touches[0].clientY;
    }
    moving = (prevTouchPos_X - event.clientX == 0) && (prevTouchPos_Y - event.clientY == 0);
}

function offsetMap(x_offset, y_offset) {
    mapTranslation[0] += x_offset;
    mapTranslation[1] += y_offset;
    draw();
}

function zoomIn() {
    mapScale[0] += .5;
    mapScale[1] += .5;
    draw();
}

function zoomOut() {
    mapScale[0] -= .5;
    mapScale[1] -= .5;
    draw();
}

function draw() {
    mapCtx.clearRect(0, 0, mapCanvas.width, mapCanvas.height)
    mapCtx.save();
    mapCtx.translate(mapTranslation[0],mapTranslation[1]);
    mapCtx.scale(mapScale[0],mapScale[1]);
    mapCtx.drawImage(mapBg,0,0);
    drawStations(stations.police,"../assets/icons/police.png");
    drawStations(stations.firedept,"../assets/icons/firefighter.png");
    drawStations(stations.hospital,"../assets/icons/hosp.png");
    mapCtx.drawImage(pointer,pointer.posX - 25, pointer.posY - 25 ,50 * 1/mapScale[0],50 * 1/mapScale[1]);
    mapCtx.restore();
}

function drawStations(dept,imgsrc){
    for(i = 0; i < dept.length; i++){
        var icon = new Image();
        icon.src = imgsrc;
        var lat = Number(dept[i].Coordinates.split(',')[0]);
        var lon = Number(dept[i].Coordinates.split(',')[1]);
        plotOnMap(icon,lat,lon,25 * 1/mapScale[0],25 * 1/mapScale[1]);

    }

}

var pointer = new Image();
pointer.src = "../assets/icons/pointer.png";
pointer.posX = 0;
pointer.posY = 0;

function drawPointer(x , y){
    pointer.posX = x - mapTranslation[0];
    pointer.posY = y - mapTranslation[1];
    draw();
}

