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
        setContentSelection("#about .t1", "\
            I was a computer freak since I was young, and I self-taught \
            the basic knowledge of systems administration. Then I studied \
            application development, and later web development.");
        setContentSelection("#about .t2", "\
            In my spare time I like to program and learn to use \
            new tools and programming languages.");          
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