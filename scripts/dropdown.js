
function dropDown() {
    var dd_content = document.getElementById("dropDown_content");
    var dropDownBtn = document.getElementById("dropDown");

    var disp = dd_content.style.display;
    
    if (disp === 'block'){
        dd_content.style.display = "none";
        dropDownBtn.classList.remove("dropped");
    } else {
        dd_content.style.display = "block";
        dropDownBtn.classList.add("dropped");
    }
    
}