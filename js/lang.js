function getLang() {
    var rqlang = getCookieVal("requestedlang");
    if (rqlang != null)
        return rqlang;
    else if (navigator.languages != undefined) 
        return navigator.languages[0]; 
    else if (navigator.language != undefined)
        return navigator.language;
    else
        return "";
}

function setLang(lang) {
    lang = lang.toLowerCase();
    window.requestedLang = lang;
    addCookie("requestedlang", lang, 365);
}

function setAndSwitchLang(lang) {
    setLang(lang);
    switchLang();
}

function switchLang() {
    if (window.requestedLang.includes("es")) {
        setTextClass("nav", ["Inicio", "Proyectos", "Sobre mi", "Contacto"]);
        setTextID("bio", "Desarrollador de Software y Web<br>\
            En un lugar de la Mancha, de cuyo nombre no quiero acordarme,\
            no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero,\
            adarga antigua, rocín flaco y galgo corredor.");
        setTextID("design", "Diseñado por");
        setTextID("about-intro", "Hola!");
        setTextID("about-text", "\
            En un lugar de la Mancha, de cuyo nombre no quiero acordarme,\
            no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero,\
            adarga antigua, rocín flaco y galgo corredor.");
        setTextID("home-intro", "Inicio");
        setTextID("projects-intro", "Proyectos");
    }
    else {
        setTextClass("nav", ["Home", "Projects", "About", "Contact"]);
        setTextID("bio", "\
            In a village of La Mancha, the name of which I have no desire to call to mind,\
            there lived not long since one of those gentlemen that keep a lance in the lance-rack,\
            an old buckler, a lean hack, and a greyhound for coursing.");
        setTextID("design", "Designed by");
        setTextID("about-intro", "Hello!");
        setTextID("about-text", "\
            In a village of La Mancha, the name of which I have no desire to call to mind,\
            there lived not long since one of those gentlemen that keep a lance in the lance-rack,\
            an old buckler, a lean hack, and a greyhound for coursing.");
        setTextID("home-intro", "Home");
        setTextID("projects-intro", "Projects");
    }
}

function setTextID(target, text) {
    var elem = document.getElementById(target);
    if (elem != null)
        elem.innerHTML = text;
}

function setTextClass(targets, texts) {
    var elems = document.getElementsByClassName(targets);
    if (elems != null) {
        for (var i=0; i<elems.length; i++) {
            elems[i].innerHTML = texts[i];
        }
    }
}