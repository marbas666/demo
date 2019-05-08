
var lang = "ja";

function init() {
    lang = getLang();
    setInfo();
    setNews();
    setAbout();
    setEvent();
    setContact();
    getEBI("event-select").addEventListener("change", changeEvent);
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
    let langs = ["ja", "en", "de"];
    for (let i = 0; i < langs.length; i++) {
        if (lang == langs[i]) {
            getEBI("lang-link-" + langs[i]).style.display = "none";
        } else {
            getEBI("lang-link-" + langs[i]).style.display = "inline";
        }
    }
    return lang;
}

function setInfo() {
    document.getElementsByTagName("title")[0].innerHTML = info_data[lang].title + " - Homepage";
    getEBI("header-title").innerHTML = info_data[lang].title;
    getEBI("footer-title").innerHTML = info_data[lang].title;
    let names = ["news", "about", "event", "contact"];
    for (let i = 0; i < names.length; i++) {
        getEBI("menu-" + names[i]).innerHTML = info_data[lang][names[i]];
        getEBI(names[i] + "-title").innerHTML = info_data[lang][names[i]];
    }
}

function getEBI(id) {
    return document.getElementById(id);
}

function createDiv(clazz, text) {
    let div = document.createElement("div");
    div.className = clazz;
    div.innerHTML = text;
    return div;
}

function createBr() {
    return document.createElement("br");
}

function createImg(src) {
    let img = document.createElement("img");
    img.src = src;
    img.width = 300;
    let a = document.createElement("a");
    a.href = src;
    a.target = "blank_";
    a.appendChild(img);
    let div = createDiv("center", "");
    div.appendChild(a);
    return div;
}

function createOption(value, text) {
    let op = document.createElement("option");
    op.value = value;
    op.innerText = text;
    return op;
}

function setNews() {
    getEBI("news-body").innerHTML = "";
    let news = news_data[lang];
    if (!news) {
        news = news_data["ja"];
        getEBI("news-body").appendChild(createDiv("bold under", "Sorry Japanese Only."));
    }
    for (let i = 0; i < news.length; i++) {
        if (i >= 10) {
            break;
        }
        getEBI("news-body").appendChild(createDiv("", news[i]));
    }
}

function setAbout() {
    let msg = about_data[lang];
    if (!msg) {
        msg = about_data["ja"];
    }
    getEBI("about-body").innerHTML = msg;
}

function setEvent() {
    for (let i = 0; i < event_data.length; i++) {
        let title = event_data[i]["title_" + lang];
        if (!title) {
            title = event_data[i]["title_ja"];
        }
        getEBI("event-select").appendChild(createOption(i, title));
    }
    changeEvent();
}

function changeEvent() {
    getEBI("event-body").innerHTML = "";
    let idx = getEBI("event-select").value;
    let event = event_data[idx];
    let contents = event["contents_" + lang];
    if (!contents) {
        contents = event["contents_ja"];
        getEBI("event-body").appendChild(createDiv("bold under", "Sorry Japanese Only."));
    }
    for (let i = 0; i < contents.length; i++) {
        let data = contents[i];
        if (data[0] == "br") {
            getEBI("event-body").appendChild(createBr());
        } else if (data[0] == "img") {
            getEBI("event-body").appendChild(createImg(data[1]));
        } else {
            getEBI("event-body").appendChild(createDiv(data[0], data[1]));
        }
    }
}

function setContact() {
    getEBI("contact-body").innerHTML = "";
    let contacts = contact_data[lang];
    if (!contacts) {
        contacts = contact_data["ja"];
        getEBI("news-body").appendChild(createDiv("bold under", "Sorry Japanese Only."));
    }
    for (let i = 0; i < contacts.length; i++) {
        let data = contacts[i];
        if (data[0] == "br") {
            getEBI("contact-body").appendChild(createBr());
        } else {
            getEBI("contact-body").appendChild(createDiv(data[0], data[1]));
        }
    }
}

window.addEventListener("load", init);