
function init() {
    console.log(getLang());
}

function getLang() {
    let lang = "ja";
    let params = location.search;
    console.log("params", params);
    if (params) {
        if (params.indexOf("lang=en") > 0) {
            lang = "en";
        } else if (params.indexOf("lang=de") > 0) {
            lang = "de";
        }
    }
    return lang;
}

window.addEventListener("load", init);