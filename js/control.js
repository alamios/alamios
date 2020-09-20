var bname = getBrowser().name.toLowerCase();
if (bname == "ie")
    alert(errorMessage());

var scElems = [solarSystem];
var scPaths = ["orbiter"];
var scIndex = Math.floor(Math.random() * scElems.length);
var scCurrent = undefined;

togglePage(retrieveSession('currpage'));



function togglePage(page) {
    nextShowcase();
    switch (page) {
        case "projects":
            loadHTML(false, "html/projects.html", "#main");
            loadURLAsync('https://api.github.com/users/alamios/repos', parseProjects)
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
    scCurrent = scElems[scIndex](document.getElementById("main"), "lib/"+scPaths[scIndex]);
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

function parseProjects(projects) {
    var proj = JSON.parse(projects);
    var cont = document.getElementById("projects");
    for (var p of proj) {
        var pcont = document.createElement("a");
        var title = document.createElement("h2");
        var desc = document.createElement("p");
        title.textContent = p["name"];
        desc.textContent = p["description"];
        pcont.href = p["html_url"];
        pcont.append(title);
        pcont.append(desc);
        cont.append(pcont);
        pcont.classList.add("pcont");
        title.classList.add("ptitle");
        desc.classList.add("pdesc");
    }
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