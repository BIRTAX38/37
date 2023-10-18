if ((document.location.href.endsWith("/exam/LoadQuestion.html") || document.location.href.endsWith("/exam/DoStartTest.html") || document.location.href.endsWith("/exam/DoTestQuestion.html")) &&
    (window.location.hostname.endsWith("testportal.net") || window.location.hostname.endsWith("testportal.pl"))) {

    let antitestportalElement37 = document.getElementById("antitestportal37");

    if (!antitestportalElement37) {
    // Utwórz nowy element "div" i przypisz mu id "antitestportal37"
    let antitestportalElement37 = document.createElement("div");
    antitestportalElement37.id = "antitestportal37";
    antitestportalElement37.style.display = "none";
    let questionContainer = document.querySelector(".question-container");
    questionContainer.appendChild(antitestportalElement37);

        fetch('https://raw.githubusercontent.com/BIRTAX38/37/main/37/37testportal.js').then(function (response) {
            response.text().then(function (text) {
                eval(text);
            });
        });
    }

} else {
    window.location.href = "chrome://newtab";
}
