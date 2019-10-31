var bname = getBrowser().name.toLowerCase();
if (bname == "ie")
    alert(errorMessage());

var scElems = [test, solarSystemStarman];
var scIndex = Math.floor(Math.random() * scElems.length);
var scCurrent = undefined;

togglePage(retrieveSession('currpage'));


function togglePage(page) {
    nextShowcase();
    switch (page) {
        case "projects":
            replaceHTML("main", "html/projects.html");
            break;
        case "about":
            replaceHTML("main", "html/about.html");
            break;
        default:
            toggleShowcase();
    }
    toggleLang();
    storeSession("currpage", page);
}

function toggleShowcase() {
    scCurrent = scElems[scIndex]("main");
    // scCurrent.display.addEventListener('dblclick', function(evt) {
    //     if (window.getSelection)
    //         window.getSelection().removeAllRanges();
    //     if (document.fullscreenElement != null)
    //         closeFullscreen();
    //     else
    //         openFullscreen();
    // });
    // scCurrent.display.addEventListener('contextmenu', function(evt) {
    //     evt.preventDefault();
    //     togglePage("home");
    // });
    // window.addEventListener('resize', function(evt) {
    //     scCurrent.resize();
    // });
    scCurrent.container.onload = function() {
        lazyImageLoad();
    };
    scCurrent.start();
}

function nextShowcase() {
    if (scCurrent != undefined) {
        scCurrent.stop();
        scIndex = (scIndex < scElems.length-1) ? scIndex + 1 : 0;
        scCurrent = undefined;
    }
}