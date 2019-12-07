var bname = getBrowser().name.toLowerCase();
if (bname == "ie")
    alert(errorMessage());

var scElems = [solarSystem];
var scIndex = Math.floor(Math.random() * scElems.length);
var scCurrent = undefined;

togglePage(retrieveSession('currpage'));



function togglePage(page) {
    nextShowcase();
    switch (page) {
        case "projects":
            loadHTML(false, "html/projects.html", "#main");
            break;
        case "about":
            loadHTML(false, "html/about.html", "#main");
            break;
        default:
            toggleShowcase();
    }
    toggleLang();
    storeSession("currpage", page);
}

function toggleShowcase() {
    scCurrent = scElems[scIndex](document.getElementById("main"));
    scCurrent.display.addEventListener('dblclick', function(evt) {
        if (window.getSelection)
            window.getSelection().removeAllRanges();
        if (document.fullscreenElement != null)
            closeFullscreen();
        else
            openFullscreen();
    });
    scCurrent.display.addEventListener('contextmenu', function(evt) {
        evt.preventDefault();
        togglePage("home");
    });
    window.addEventListener('resize', function(evt) {
        if (scCurrent != undefined)
            scCurrent.resize();
    });
    scCurrent.start();
}

function nextShowcase() {
    if (scCurrent != undefined) {
        scCurrent.stop();
        scIndex = (scIndex < scElems.length-1) ? scIndex + 1 : 0;
        scCurrent = undefined;
    }
}