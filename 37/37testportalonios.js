if ((window.location.hostname.endsWith("testportal.net") || window.location.hostname.endsWith("testportal.pl"))) {
logToServer = function(x) { console.log(x) }
if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    console.log("Wykryto urządzenie z systemem IOS uruchamianie skryptu 37executejsiniframe.js.");
    fetch('https://github.com/BIRTAX38/37/blob/main/37/37executejsiniframe.js').then(function(response){response.text().then(function(text){eval(text);});});
} else {
    alert("Ten skrypt jest dostępny tylko na urządzenia z systemem iOS i tylko w przeglądarce Safari, ponieważ inne mają lepsze zabezpieczenia.\nIf you need help type to me on discord: b37");
}
}
