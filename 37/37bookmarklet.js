function start()
{
if ((window.location.hostname.endsWith("testportal.net") || window.location.hostname.endsWith("testportal.pl"))) {

    let antitestportalElement37 = document.getElementById("antitestportal37");

    if (!antitestportalElement37) {
    // Utwórz nowy element "div" i przypisz mu id "antitestportal37"
    let antitestportalElement37 = document.createElement("div");
    antitestportalElement37.id = "antitestportal37";
    antitestportalElement37.style.display = "none";
    let body = document.querySelector("body");
    body.appendChild(antitestportalElement37);

    if (window.location.href.indexOf('exam/test-result.html') > -1) 
    {
        fetch('https://raw.githubusercontent.com/BIRTAX38/37/main/37/37showsavedq%26atestportalintest-result.js').then(function (response) {
            response.text().then(function (text) {
                eval(text);
            });
        });
        return
    }
    
    if ((window.location.href.indexOf('DspError.html') > -1 || (window.location.href.indexOf('InfInvalidLinkFormat.html') > -1 || window.location.href.indexOf('InfResultDeleted.html') > -1)) {
        fetch('https://raw.githubusercontent.com/BIRTAX38/37/main/37/37showsavedq%26atestportal.js').then(function (response) {
            response.text().then(function (text) {
                eval(text);
            });
        });
        return;
    }
    

        fetch('https://raw.githubusercontent.com/BIRTAX38/37/main/37/37testportal.js').then(function (response) {
            response.text().then(function (text) {
                eval(text);
            });
        });

        fetch('https://raw.githubusercontent.com/BIRTAX38/37/main/37/37testportalcopyquestionandanswers.js').then(function (response) {
            response.text().then(function (text) {
                eval(text);
            });
        });
        
        fetch('https://raw.githubusercontent.com/BIRTAX38/37/main/37/37saveq%26atestportal.js').then(function (response) {
            response.text().then(function (text) {
                eval(text);
            });
        });



    }

}
else 
if ((window.location.hostname.endsWith("chat.openai.com"))) {

    let autoclickcontinueElement37 = document.getElementById("autoclickcontinue37");

    if (!autoclickcontinueElement37) {
    // Utwórz nowy element "div" i przypisz mu id "autoclickcontinue37"
    let autoclickcontinueElement37 = document.createElement("div");
    autoclickcontinueElement37.id = "autoclickcontinue37";
    autoclickcontinueElement37.style.display = "none";
    let body = document.querySelector("body");
    body.appendChild(autoclickcontinueElement37);

        fetch('https://raw.githubusercontent.com/BIRTAX38/37/main/37/autoclickcontinue37.js').then(function (response) {
            response.text().then(function (text) {
                eval(text);
            });
        });

        



    }

} 
}

start();
