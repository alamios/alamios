function switchLangCommon() {
    if (window.rqlang == "es") {
        setContentSelection("#header .nav-item", ["Inicio", "Proyectos", "Sobre mi", "Contacto"]);
        setContentID("bio", "Desarrollador de Software y Web");
        setContentID("design", "Diseñado por");
    }
    else {
        setContentSelection("#header .nav-item", ["Home", "Projects", "About", "Contact"]);
        setContentID("bio", "Software and Web developer");
        setContentID("design", "Designed by");
    }
}

function switchLangHome() {
    if (window.rqlang == "es") {
        setContentName("title", "alamios&nbsp;&nbsp;|&nbsp;&nbsp;Inicio");
    }
    else {
        setContentName("title", "alamios&nbsp;&nbsp;|&nbsp;&nbsp;Home");
    }
}

function switchLangProjects() {
    if (window.rqlang == "es") {
        setContentName("title", "alamios&nbsp;&nbsp;|&nbsp;&nbsp;Proyectos");
    }
    else {
        setContentName("title", "alamios&nbsp;&nbsp;|&nbsp;&nbsp;Projects");
    }
}

function switchLangAbout() {
    if (window.rqlang == "es") {
        setContentName("title", "alamios&nbsp;&nbsp;|&nbsp;&nbsp;Sobre mi");
        setContentSelection("#about .intro", "Hola!");
        setContentSelection("#about .t1", "\
            Aficionado a la informática desde joven, adquirí de manera autodidacta \
            los conocimientos básicos de administración de sistemas. \
            Después cursé estudios reglados de desarrollo de aplicaciones, y más tarde de web.");
        setContentSelection("#about .t2", "\
            En mi tiempo libre me gusta programar y aprender a manejar \
            nuevas herramientas y lenguajes de programación.");
    }
    else {
        setContentName("title", "alamios&nbsp;&nbsp;|&nbsp;&nbsp;About");
        setContentSelection("#about .intro", "Hello!");
        setContentSelection("#about .text", "\
            In a village of La Mancha, the name of which I have no desire to call to mind,\
            there lived not long since one of those gentlemen that keep a lance in the lance-rack,\
            an old buckler, a lean hack, and a greyhound for coursing. An olla of rather more beef\
            than mutton, a salad on most nights, scraps on Saturdays, lentils on Fridays,\
            and a pigeon or so extra on Sundays, made away with three-quarters of his income.\
            The rest of it went in a doublet of fine cloth and velvet breeches and shoes to match\
            for holidays, while on week-days he made a brave figure in his best homespun.\
            He had in his house a housekeeper past forty, a niece under twenty, and a lad for the\
            field and market-place, who used to saddle the hack as well as handle the bill-hook.\
            The age of this gentleman of ours was bordering on fifty; he was of a hardy habit,\
            spare, gaunt-featured, a very early riser and a great sportsman. They will have it his\
            surname was Quixada or Quesada (for here there is some difference of opinion among the\
            authors who write on the subject), although from reasonable conjectures it seems plain\
            that he was called Quexana. This, however, is of but little importance to our tale;\
            it will be enough not to stray a hair’s breadth from the truth in the telling of it.");            
    }            
}

function switchLangOrbiter() {
    if (window.rqlang == "es") {
        setContentSelection("#orbiter .credit-link", "Creditos");
        setContentSelection("#orbiter .credit-goback", "&larr; Ir atrás");
        setContentSelection("#orbiter .credit-p", "Crédito:");
        setContentSelection("#orbiter .license-p", "Licencia:");
        setContentSelection("#orbiter .changes-p", "Cambios:");
        setContentSelection("#orbiter .source-p", "Fuente");
        setContentSelection("#orbiter .changes-m1", "Recortado el fondo y coloreada");
        setContentSelection("#orbiter .changes-m2", "Recortado el coche del original");
    }
    else {
        setContentSelection("#orbiter .credit-link", "Credits");
        setContentSelection("#orbiter .credit-goback", "&larr; Go back");
        setContentSelection("#orbiter .credit-p", "Credit:");
        setContentSelection("#orbiter .license-p", "License:");
        setContentSelection("#orbiter .changes-p", "Changes:");
        setContentSelection("#orbiter .source-p", "Source");
        setContentSelection("#orbiter .changes-m1", "Cropped the background and colored");
        setContentSelection("#orbiter .changes-m2", "Cropped the car from the original");
    }
}

function errorMessage() {
    if (window.rqlang == "es")
        return "Esta página no funciona en este navegador. Por favor, utilice uno más actualizado.";
    else
        return "This page don't work on that browser. Please, use one more updated."
}

function toggleLang(lang) {
    if (lang == undefined)
        lang = getLang();
    setLang(lang);
    switchLangCommon();
    var content = document.getElementById("main").firstChild.id;
    switch (content) {
        case "projects":
            switchLangProjects();
            break;
        case "about":
            switchLangAbout();
            break;
        default:
            switchLangHome();
            switch (content) {
                case "orbiter":
                    switchLangOrbiter();
                    break;
            }
    }
}

function getLang() {
    var rqlang = retrieveSession("rqlang");
    if (rqlang != undefined)
        return rqlang;
    if (navigator.languages != undefined) 
        return navigator.languages[0]; 
    if (navigator.language != undefined)
        return navigator.language;
    return undefined;
}

function setLang(lang) {
    lang = lang.substring(0, 2);
    window.rqlang = lang;
    storeSession("rqlang", lang);
}