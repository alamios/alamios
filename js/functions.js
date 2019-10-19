function urlExists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}

function replaceHTML(targetID, file) {
    document.getElementById(targetID).innerHTML = loadHTML(file);
}

function insertHTML(targetID, file) {
    var target = document.getElementById(targetID);
    target.innerHTML = target.innerHTML + loadHTML(file);
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
    if (document.cancelFullScreen)
        document.cancelFullScreen();
    else if (document.exitFullscreen)
        document.exitFullscreen();
    else if (document.mozCancelFullScreen)
        document.mozCancelFullScreen();
    else if (document.webkitExitFullscreen)
        document.webkitExitFullscreen();
    else if (document.msExitFullscreen)
        document.msExitFullscreen();
}

function scale(image, newWidth, newHeight, rate) {
	var tmpcanvas = document.createElement('canvas');
	var tmpctx = tmpcanvas.getContext('2d');
	tmpcanvas.width = image.width;
	tmpcanvas.height = image.height;
	tmpctx.drawImage(image, 0, 0);
	var newcanvas = document.createElement('canvas');
    var newctx = newcanvas.getContext('2d');
    newWidth = Math.round(newWidth);
    newHeight = Math.round(newHeight);
	newcanvas.width = newWidth;
	newcanvas.height = newHeight;
	var width = image.width;
	var height = image.height;
	var nextWidth = image.width;
	var nextHeight = image.height;
	var done = false;
	while (!done) {
		nextWidth *= rate;
		nextHeight *= rate;
		if (nextWidth < newWidth){
			newctx.drawImage(tmpcanvas, 0, 0, Math.round(width), Math.round(height), 0, 0, newWidth, newHeight);
			done = true;
		}
		else {
			tmpctx.drawImage(tmpcanvas, 0, 0, Math.round(width), Math.round(height), 0, 0, Math.round(nextWidth), Math.round(nextHeight));
			width = nextWidth;
			height = nextHeight;
		}
    }
    return newcanvas;
}

function createBlob(canvas) {
    var newImage = new Image();
    canvas.toBlob(function(blob) {
        url = URL.createObjectURL(blob);
		newImage.onload = function() {
			URL.revokeObjectURL(url);
		}
        newImage.src = url;
	});
    return newImage;
}