function loadCommon() {
    replaceHTML("header", "html/header.html");
    replaceHTML("profile", "html/profile.html");
    replaceHTML("footer", "html/footer.html");
    switchLangCommon();
}

function loadOrbiter() {
    insertHTML("main", "html/orbiter.html");
    switchLangOrbiter();
    return document.getElementById("orbiter").children[0];
}

function setupShowcase() {
    var eventElems = [loadOrbiter()];
    var scElems = [initSolarSystem(), initSystem()];
    var scCurrent = randomVal(scElems.length);
    scElems[scCurrent].show();

    for (var i=0; i<eventElems.length; i++) {
        eventElems[i].addEventListener('dblclick', function(evt) {
            if (window.getSelection)
                window.getSelection().removeAllRanges();
            if (document.fullscreenElement != null)
                closeFullscreen();
            else
                openFullscreen();
        });
        eventElems[i].addEventListener('contextmenu', function(evt) {
            evt.preventDefault();
            scElems[scCurrent].hide();
            scCurrent = nextVal(scCurrent, scElems.length-1);
            scElems[scCurrent].show();
        });
    }
    window.addEventListener('resize', function(evt) {
        scElems[scCurrent].resize();
    });
    var creditlinks = document.querySelectorAll(".credit-link, .credit-goback");
    for (var i=0; i<creditlinks.length; i++) {
        creditlinks[i].addEventListener('click', function(evt) {
            scElems[scCurrent].toggleCredits();
        });
    }
}

function nextVal(current, max) {
    return (current < max) ? current + 1 : 0;
}

function randomVal(size) {
    return Math.floor(Math.random() * size);
}