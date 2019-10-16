function loadCommon() {
    loadHTMLTo("header", "html/header.html");
    loadHTMLTo("profile", "html/profile.html");
    loadHTMLTo("footer", "html/footer.html");
    switchLangCommon();
}

function loadOrbiter() {
    loadHTMLTo("main", "html/orbiter.html");
    switchLangOrbiter();
    execOrbiter();
}

function setHomeEvents() {
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
        // evt.preventDefault();
    });
}

function loadHTMLTo(targetID, file) {
    document.getElementById(targetID).innerHTML = loadHTML(file);
}

function loadHTML(file) {
    var req = new XMLHttpRequest();
    req.open("GET", file, false);
    req.send();
    return req.responseText;
}

function getCookie(name) {
    var cookies = document.cookie;
    if (cookies.includes(";")) {
        var carray = cookies.split(";");
        for (var i=0; i<carray.length; i++) {
            if (carray[i].includes(name)) {
                return carray[i].split("=")[1];
            }
        }
    }
    else if (cookies.includes(name)) {
        return cookies.split("=")[1];
    }
    return null;
}

function setCookie(name, value, expiration) {
    var cookie = name + "=" + value;
    if (expiration != undefined) {
        var d = new Date();
        d.setTime(d.getTime() + expiration);
        cookie += ";" + "expires=" + d.toUTCString();
    }
    document.cookie = cookie;
}

function openFullscreen() {
    var elem = document.documentElement;
    if (elem.requestFullscreen)
        elem.requestFullscreen();
    else if (elem.mozRequestFullScreen)
        elem.mozRequestFullScreen();
    else if (elem.webkitRequestFullscreen)
        elem.webkitRequestFullscreen();
    else if (elem.msRequestFullscreen)
        elem.msRequestFullscreen();
}

function closeFullscreen() {
    if (document.exitFullscreen)
        document.exitFullscreen();
    else if (document.mozCancelFullScreen)
        document.mozCancelFullScreen();
    else if (document.webkitExitFullscreen)
        document.webkitExitFullscreen();
    else if (document.msExitFullscreen)
        document.msExitFullscreen();
}