function switchLang() {
    if (window.requestedLang.includes("es")) {
        setContentID("home-title", "alamios&nbsp;&nbsp;|&nbsp;&nbsp;Desarrollador");
        setContentID("projects-title", "alamios&nbsp;&nbsp;|&nbsp;&nbsp;Proyectos");
        setContentID("about-title", "alamios&nbsp;&nbsp;|&nbsp;&nbsp;Sobre mi");
        setContentClass("nav", ["Inicio", "Proyectos", "Sobre mi", "Contacto"]);
        setContentID("bio", "Desarrollador de Software y aprendiz de Web<br>\
            En un lugar de la Mancha, de cuyo nombre no quiero acordarme,\
            no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero,\
            adarga antigua, rocín flaco y galgo corredor.");
        setContentID("design", "Diseñado por");
        setContentID("about-intro", "Hola!");
        setContentID("about-text", "\
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
        setContentID("home-intro", "Inicio");
        setContentID("projects-intro", "Proyectos");
    }
    else {
        setContentID("home-title", "alamios&nbsp;&nbsp;|&nbsp;&nbsp;Developer");
        setContentID("projects-title", "alamios&nbsp;&nbsp;|&nbsp;&nbsp;Projects");
        setContentID("about-title", "alamios&nbsp;&nbsp;|&nbsp;&nbsp;About");
        setContentClass("nav", ["Home", "Projects", "About", "Contact"]);
        setContentID("bio", "Software developer and Web learner<br>\
            In a village of La Mancha, the name of which I have no desire to call to mind,\
            there lived not long since one of those gentlemen that keep a lance in the lance-rack,\
            an old buckler, a lean hack, and a greyhound for coursing.");
        setContentID("design", "Designed by");
        setContentID("about-intro", "Hello!");
        setContentID("about-text", "\
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
        setContentID("home-intro", "Home");
        setContentID("projects-intro", "Projects");
    }
}

function getLang() {
    var rqlang = getCookie("requestedLang");
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
    setCookie("requestedLang", lang, 365*24*60*60*1000);
    switchLang();
}

function setContentID(target, text) {
    var elem = document.getElementById(target);
    if (elem != null)
        elem.innerHTML = text;
}

function setContentClass(targets, texts) {
    var elems = document.getElementsByClassName(targets);
    if (elems != null) {
        for (var i=0; i<elems.length; i++) {
            elems[i].innerHTML = texts[i];
        }
    }
}