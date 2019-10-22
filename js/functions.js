function urlExists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status != 404;
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

function storePersistent(key, value, expiration) {
    if (localStorage) {
        localStorage.setItem(key, value);
    } 
    else {
        var cookie = key + "=" + value;
        if (expiration == undefined)
            expiration = 365*24*60*60*1000;
        var d = new Date();
        d.setTime(d.getTime() + expiration);
        cookie += ";" + "expires=" + d.toUTCString();
        document.cookie = cookie;
    }
}

function retrievePersistent(key) {
    if (localStorage)
        return localStorage.getItem(key);
    else
        return parseCookie(key);
}

function storeSession(key, value) {
    if (sessionStorage)
        sessionStorage.setItem(key, value);
    else
        document.cookie = key + "=" + value;
}

function retrieveSession(key) {
    if (sessionStorage)
        return sessionStorage.getItem(key);
    else
        return parseCookie(key);
}

function parseCookie(key) {
    var cookies = document.cookie;
    if (cookies.includes(";")) {
        var carray = cookies.split(";");
        for (var i=0; i<carray.length; i++) {
            if (carray[i].includes(key)) {
                return carray[i].split("=")[1];
            }
        }
    }
    else if (cookies.includes(key)) {
        return cookies.split("=")[1];
    }
    return undefined;
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

// Source: https://stackoverflow.com/questions/5916900/how-can-you-detect-the-version-of-a-browser/5918791#5918791
function getBrowser() {
    var ua = navigator.userAgent, tem, 
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return {name:'IE',version:(tem[1] || '')};
    }
    if(M[1]=== 'Chrome'){
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem != null) return {name:tem[1].replace('OPR', 'Opera'),version:tem[2]};
    }
    M = M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem = ua.match(/version\/(\d+)/i))!= null)
        M.splice(1, 1, tem[1]);
    return {name:M[0], version:M[1]};
}