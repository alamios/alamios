if (headerContent == undefined)
    var headerContent = loadFile("html/header.html");
if (profileContent == undefined)
    var profileContent = loadFile("html/profile.html");
if (footerContent == undefined) {
    var footerContent = loadFile("html/footer.html");
    console.log(new Date().getMilliseconds);
}

function loadCommon() {
    loadTo("header", headerContent);
    loadTo("profile", profileContent);
    loadTo("footer", footerContent);
}

