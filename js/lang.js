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

function switchLang() {
    console.log(document.getElementById("main").innerHTML);
    console.log(document.getElementById("main").innerHTML);
    var navs = document.getElementsByClassName("nav");
    if (window.requestedLang.includes("es")) {
        navs[0].innerHTML = "Inicio";
        navs[1].innerHTML = "Proyectos";
        navs[2].innerHTML = "Sobre mi";
        navs[3].innerHTML = "Contacto";
        document.getElementById("bio").innerHTML = "Desarrollador de Software y Web<br>\
            En un lugar de la Mancha, de cuyo nombre no quiero acordarme,\
            no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero,\
            adarga antigua, rocín flaco y galgo corredor.";
        document.getElementById("design").innerHTML = "Diseñado por";
        document.getElementById("about-intro").innerHTML = "Hola!";
        document.getElementById("about-text").innerHTML = "\
            En un lugar de la Mancha, de cuyo nombre no quiero acordarme,\
            no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero,\
            adarga antigua, rocín flaco y galgo corredor.";
        console.log(document.getElementById("main").innerHTML);
        console.log(document.getElementById("main").innerHTML);
    }
    else {
        navs[0].innerHTML = "Home";
        navs[1].innerHTML = "Projects";
        navs[2].innerHTML = "About";
        navs[3].innerHTML = "Contact";
        document.getElementById("bio").innerHTML = "Software and Web developer<br>\
            In a village of La Mancha, the name of which I have no desire to call to mind,\
            there lived not long since one of those gentlemen that keep a lance in the lance-rack,\
            an old buckler, a lean hack, and a greyhound for coursing.";
        document.getElementById("design").innerHTML = "Designed by";
        document.getElementById("about-intro").innerHTML = "Hello!";
        document.getElementById("about-text").innerHTML = "\
            In a village of La Mancha, the name of which I have no desire to call to mind,\
            there lived not long since one of those gentlemen that keep a lance in the lance-rack,\
            an old buckler, a lean hack, and a greyhound for coursing.";
    }
}

function setAndSwitchLang(lang) {
    setLang(lang);
    switchLang();
}