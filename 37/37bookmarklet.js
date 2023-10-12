var antitestportalstarted;

if ((document.location.href.endsWith("/exam/LoadQuestion.html") || document.location.href.endsWith("/exam/DoStartTest.html")) &&
    (window.location.hostname.endsWith("testportal.net") || window.location.hostname.endsWith("testportal.pl"))) {

    if (antitestportalstarted == undefined) {
        antitestportalstarted = true; // Ustawiamy na true przed fetch, aby uniknąć wielokrotnego uruchamiania

        fetch('https://raw.githubusercontent.com/BIRTAX38/37/main/37/37testportal.js').then(function (response) {
            response.text().then(function (text) {
                eval(text);
            });
        });
    }

} else {
    window.location.href = "chrome://new-tab-page";
}
