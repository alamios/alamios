
const homePage = 'html/home.html';
const defTarget = "main";

function loadInit() {
    var currPage = retrievePage();
    if (currPage == undefined)
        currPage = homePage;
    loadDefault(currPage);
}

function loadDefault(file) {
    loadCommon(defTarget, file);
    storePage(file);
    if (file == homePage) {
        execOrbiter();
    }
}

function loadCommon(targetID, file) {
    loadFileTo(targetID, file);
    switchLang();
}

function storePage(value) {
    if (typeof(Storage) !== undefined) {
        localStorage.currentPage = value;
    }
}

function retrievePage() {
    if (typeof(Storage) !== undefined) {
        return localStorage.currentPage;
    }
}