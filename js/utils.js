function loadTo(target, file) {
    var result = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", file, false);
    xmlhttp.send();
    XMLHttpRequest.onload = loaded(target, xmlhttp.responseText);
}

function loaded(target, result) {
    console.log(target);
    document.getElementById(target).innerHTML = result;
    switchLang();
}

function loadDefault(file) {
    loadTo("main", file);
}

function loadInit(file) {
    setLang(getLang());
    loadDefault(file);
}

function getCookieVal(name) {
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

function addCookie(name, value, expdays) {
    var d = new Date();
    d.setTime(d.getTime() + (expdays*24*60*60*1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires;
}