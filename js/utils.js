function loadCommon() {
    loadHTMLTo("header", "html/header.html");
    loadHTMLTo("profile", "html/profile.html");
    loadHTMLTo("footer", "html/footer.html");
    switchLangCommon();
}

function loadOrbiter() {
    loadHTMLTo("main", "html/orbiter.html");
    switchLangOrbiter();
    orbiter = initOrbiter();
    return orbiter;
}

function setupShowcase() {
    orbiter = loadOrbiter();
    orbiter.start();
    var container = document.getElementById("main");
    container.addEventListener('dblclick', function(evt) {
        if (window.getSelection)
            window.getSelection().removeAllRanges();
        if (document.fullscreenElement != null)
            closeFullscreen();
        else
            openFullscreen();
    });
    container.addEventListener('contextmenu', function(evt) {
        evt.preventDefault();
        if (orbiter.running) 
            orbiter.stop();
        else
            orbiter.start();
    });
    window.addEventListener('resize', function(evt) {
        orbiter.resize();
    });
}