function switchLangCommon() {
    if (window.rqlang == "es") {
        setContentSelection("#header .nav-item", ["Inicio", "Proyectos", "Sobre mi", "Contacto"]);
        setContentID("bio1", "Desarrollador de Software y aprendiz de Web");
        setContentID("bio2", "Java&nbsp; JavaScript&nbsp; PHP&nbsp; HTML&nbsp; CSS&nbsp; Python&nbsp; MySQL&nbsp; Git&nbsp; Gradle&nbsp; Android");
        setContentID("design", "Diseñado por");
    }
    else {
        setContentSelection("#header .nav-item", ["Home", "Projects", "About", "Contact"]);
        setContentID("bio1", "Software developer and Web learner");
        setContentID("bio2", "Java&nbsp; JavaScript&nbsp; PHP&nbsp; HTML&nbsp; CSS&nbsp; Python&nbsp; MySQL&nbsp; Git&nbsp; Gradle&nbsp; Android");
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
        setContentSelection("#projects .intro", "Proyectos");
    }
    else {
        setContentName("title", "alamios&nbsp;&nbsp;|&nbsp;&nbsp;Projects");
        setContentSelection("#projects .intro", "Projects");
    }
}

function switchLangAbout() {
    if (window.rqlang == "es") {
        setContentName("title", "alamios&nbsp;&nbsp;|&nbsp;&nbsp;Sobre mi");
        setContentSelection("#about .intro", "Hola!");
        setContentSelection("#about .text", "\
            En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo\
            que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo\
            corredor. Una olla de algo más vaca que carnero, salpicón las más noches, duelos y\
            quebrantos los sábados, lentejas los viernes, algún palomino de añadidura los domingos,\
            consumían las tres partes de su hacienda. El resto della concluían sayo de velarte,\
            calzas de velludo para las fiestas con sus pantuflos de lo mismo, los días de entre\
            semana se honraba con su vellori de lo más fino. Tenía en su casa una ama que pasaba\
            de los cuarenta, y una sobrina que no llegaba a los veinte, y un mozo de campo y plaza,\
            que así ensillaba el rocín como tomaba la podadera. Frisaba la edad de nuestro hidalgo\
            con los cincuenta años, era de complexión recia, seco de carnes, enjuto de rostro; gran\
            madrugador y amigo de la caza. Quieren decir que tenía el sobrenombre de Quijada o Quesada\
            (que en esto hay alguna diferencia en los autores que deste caso escriben), aunque por\
            conjeturas verosímiles se deja entender que se llama Quijana; pero esto importa poco a\
            nuestro cuento; basta que en la narración dél no se salga un punto de la verdad.\
            En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo\
            que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo\
            corredor. Una olla de algo más vaca que carnero, salpicón las más noches, duelos y\
            quebrantos los sábados, lentejas los viernes, algún palomino de añadidura los domingos,\
            consumían las tres partes de su hacienda. El resto della concluían sayo de velarte,\
            calzas de velludo para las fiestas con sus pantuflos de lo mismo, los días de entre\
            semana se honraba con su vellori de lo más fino. Tenía en su casa una ama que pasaba\
            de los cuarenta, y una sobrina que no llegaba a los veinte, y un mozo de campo y plaza,\
            que así ensillaba el rocín como tomaba la podadera. Frisaba la edad de nuestro hidalgo\
            con los cincuenta años, era de complexión recia, seco de carnes, enjuto de rostro; gran\
            madrugador y amigo de la caza. Quieren decir que tenía el sobrenombre de Quijada o Quesada\
            (que en esto hay alguna diferencia en los autores que deste caso escriben), aunque por\
            conjeturas verosímiles se deja entender que se llama Quijana; pero esto importa poco a\
            nuestro cuento; basta que en la narración dél no se salga un punto de la verdad.\
            En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo\
            que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo\
            corredor. Una olla de algo más vaca que carnero, salpicón las más noches, duelos y\
            quebrantos los sábados, lentejas los viernes, algún palomino de añadidura los domingos,\
            consumían las tres partes de su hacienda. El resto della concluían sayo de velarte,\
            calzas de velludo para las fiestas con sus pantuflos de lo mismo, los días de entre\
            semana se honraba con su vellori de lo más fino. Tenía en su casa una ama que pasaba\
            de los cuarenta, y una sobrina que no llegaba a los veinte, y un mozo de campo y plaza,\
            que así ensillaba el rocín como tomaba la podadera. Frisaba la edad de nuestro hidalgo\
            con los cincuenta años, era de complexión recia, seco de carnes, enjuto de rostro; gran\
            madrugador y amigo de la caza. Quieren decir que tenía el sobrenombre de Quijada o Quesada\
            (que en esto hay alguna diferencia en los autores que deste caso escriben), aunque por\
            conjeturas verosímiles se deja entender que se llama Quijana; pero esto importa poco a\
            nuestro cuento; basta que en la narración dél no se salga un punto de la verdad.\
            En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo\
            que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo\
            corredor. Una olla de algo más vaca que carnero, salpicón las más noches, duelos y\
            quebrantos los sábados, lentejas los viernes, algún palomino de añadidura los domingos,\
            consumían las tres partes de su hacienda. El resto della concluían sayo de velarte,\
            calzas de velludo para las fiestas con sus pantuflos de lo mismo, los días de entre\
            semana se honraba con su vellori de lo más fino. Tenía en su casa una ama que pasaba\
            de los cuarenta, y una sobrina que no llegaba a los veinte, y un mozo de campo y plaza,\
            que así ensillaba el rocín como tomaba la podadera. Frisaba la edad de nuestro hidalgo\
            con los cincuenta años, era de complexión recia, seco de carnes, enjuto de rostro; gran\
            madrugador y amigo de la caza. Quieren decir que tenía el sobrenombre de Quijada o Quesada\
            (que en esto hay alguna diferencia en los autores que deste caso escriben), aunque por\
            conjeturas verosímiles se deja entender que se llama Quijana; pero esto importa poco a\
            nuestro cuento; basta que en la narración dél no se salga un punto de la verdad.\
            En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo\
            que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo\
            corredor. Una olla de algo más vaca que carnero, salpicón las más noches, duelos y\
            quebrantos los sábados, lentejas los viernes, algún palomino de añadidura los domingos,\
            consumían las tres partes de su hacienda. El resto della concluían sayo de velarte,\
            calzas de velludo para las fiestas con sus pantuflos de lo mismo, los días de entre\
            semana se honraba con su vellori de lo más fino. Tenía en su casa una ama que pasaba\
            de los cuarenta, y una sobrina que no llegaba a los veinte, y un mozo de campo y plaza,\
            que así ensillaba el rocín como tomaba la podadera. Frisaba la edad de nuestro hidalgo\
            con los cincuenta años, era de complexión recia, seco de carnes, enjuto de rostro; gran\
            madrugador y amigo de la caza. Quieren decir que tenía el sobrenombre de Quijada o Quesada\
            (que en esto hay alguna diferencia en los autores que deste caso escriben), aunque por\
            conjeturas verosímiles se deja entender que se llama Quijana; pero esto importa poco a\
            nuestro cuento; basta que en la narración dél no se salga un punto de la verdad.");
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
    setLang(lang);
    switch (document.body.id) {
        case "home-page":
            switchLangCommon();
            switchLangHome();
            switchLangOrbiter();
            break;
        case "projects-page":
            switchLangCommon();
            switchLangProjects();
            break;
        case "about-page":
            switchLangCommon();
            switchLangAbout();
            break;
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

function setContentID(target, text) {
    var elem = document.getElementById(target);
    if (elem != null)
        elem.innerHTML = text;
}

function setContentClass(target, text) {
    var elems = document.getElementsByClassName(target);
    if (elems != null) {
        for (var i=0; i<elems.length; i++) {
            elems[i].innerHTML = (Array.isArray(text)) ? text[i] : text;
        }
    }
}

function setContentName(target, text) {
    var elems = document.getElementsByTagName(target);
    if (elems != null) {
        for (var i=0; i<elems.length; i++) {
            elems[i].innerHTML = (Array.isArray(text)) ? text[i] : text;
        }
    }
}

function setContentSelection(target, text) {
    var elems = document.querySelectorAll(target);
    if (elems != null) {
        for (var i=0; i<elems.length; i++) {
            elems[i].innerHTML = (Array.isArray(text)) ? text[i] : text;
        }
    }
}