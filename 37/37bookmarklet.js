if ((document.location.href.endsWith("/exam/LoadQuestion.html") || document.location.href.endsWith("/exam/DoStartTest.html")) &&
    (window.location.hostname.endsWith("testportal.net") || window.location.hostname.endsWith("testportal.pl"))) {

    // Sprawdź, czy element o id "antitestportal37" istnieje
    let antitestportalElement37 = document.getElementById("antitestportal37");

    if (!antitestportalElement37) {
        // Jeśli element nie istnieje, to go tworzymy i ustawiamy atrybut id
        antitestportalElement37 = document.createElement("div");
        antitestportalElement37.id = "antitestportal37";
        antitestportalElement37.style.display = "none"; // Ukrywamy element

        document.body.appendChild(antitestportalElement37); // Dodajemy element do ciała strony

        fetch('https://raw.githubusercontent.com/BIRTAX38/37/main/37/37testportal.js').then(function (response) {
            response.text().then(function (text) {
                eval(text);
            });
        });
    }

} else {
    window.location.href = "chrome://newtab";
}
