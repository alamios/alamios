var bname = getBrowser().name.toLowerCase();
if (bname == "ie")
    alert(errorMessage());

var scElems = [solarSystem, testSystem];
var scIndex = randomIndex();
var scCurrent = undefined;

togglePage(retrieveSession('currpage'));


function togglePage(page) {
    stopShowcase();
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
    switch (scElems[scIndex]) {
        case solarSystem:
            replaceHTML("main", "html/orbiter.html");
            break;
        case testSystem:
            replaceHTML("main", "html/orbiter.html");
            break;
    }
    scCurrent = scElems[scIndex]();
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
        stopShowcase();
        toggleShowcase();
    });
    window.addEventListener('resize', function(evt) {
        scCurrent.resize();
    });
    scCurrent.start();
}

function stopShowcase() {
    if (scCurrent != undefined) {
        scCurrent.stop();
        scIndex = nextIndex();
        scCurrent = undefined;
    }
}

function nextIndex() {
    return (scIndex < scElems.length-1) ? scIndex + 1 : 0;
}

function randomIndex() {
    return Math.floor(Math.random() * scElems.length);
}