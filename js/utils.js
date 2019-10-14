function loadTo(targetID, content) {
    document.getElementById(targetID).innerHTML = content;
}

function loadFileTo(targetID, file) {
    loadTo(targetID, loadFile(file));
}

function loadFile(file) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", file, false);
    xmlhttp.send();
    return xmlhttp.responseText;
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