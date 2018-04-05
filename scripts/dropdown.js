function dropDown() {
    var dd_content = document.getElementById("dropDown_content");
    var dropDownBtn = document.getElementById("dropDown");

    var disp = dd_content.style.display;
    
    if (dd_content.showing){
        
        dd_content.classList.remove("droppedContent");
        dropDownBtn.classList.remove("dropped");
        dd_content.showing = false;
        
    } else {
        
        dd_content.classList.add("droppedContent");
        dropDownBtn.classList.add("dropped");
        dd_content.showing = true;
        
    }
    
}