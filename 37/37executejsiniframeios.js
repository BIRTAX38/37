(function() {
    if (!((window.location.href.includes("testportal.net") || window.location.href.includes("testportal.pl")) && (window.location.href.includes("LoadTestStart.html") || window.location.href.includes("DoStartTest.html") || window.location.href.includes("DoTestQuestion.html") || window.location.href.includes("LoadQuestion.html") || window.location.href.includes("StartNextAttempt.html")))) {
        alert("Aktualnie istnieje nowy sposób używania 7357P0R74L iframe.\nAby go użyć należy wykonać następujące kroki:\n\n===================\nWejdź w test używając linku i uruchom 7357P0R74L iframe przed rozpoczęciem testu.\n(W trakcie też można, ale nie jest to zalecane ponieważ mogą wystąpić pewne komplikacje)\n===================\n\nLink do testu powinien wyglądać następująco:\nhttps://www.testportal.pl/exam/LoadTestStart.html?t= i jakieś losowe znaki\nlub\nhttps://www.testportal.pl/test.html?t= i jakieś losowe znaki\nPo uruchomieniu zobaczysz dodatkowe informacje np. czy skrypt jest aktywny itp.\n");
        return
    }
    var linkdotestu = window.location.href
/////////////////////////////////////////////////ANTIBACKPAGE/////////////////////////////////////////////////
history.pushState(null, null, document.URL);
window.addEventListener('popstate', function () {
    history.pushState(null, null, document.URL);
});
/////////////////////////////////////////////////ANTIBACKPAGE/////////////////////////////////////////////////
//////////////////////////////
setInterval(function() {
document.cookie = `blurs=0;secure`;
}, 500);
//////////////////////////////

    document.getElementsByTagName("html")[0].innerHTML = "";
    document.body.style.backgroundColor = "white";
    function openIframeWithInjectedCode() {
        const iframe = document.createElement('iframe');
        iframe.src = linkdotestu;
        iframe.width = window.innerWidth;
        iframe.height = window.innerHeight;
        iframe.id = "37iframetestportal"
        iframe.style.border = 'none';
        document.body.appendChild(iframe);

        document.body.style.margin = '0';
        document.body.style.overflow = 'hidden';
        /*
        const resizeButton = document.createElement('button');
        resizeButton.textContent = 'Napraw IFRAME';
        resizeButton.addEventListener('click', function() {
        iframe.width = window.innerWidth - 23;
        iframe.height = window.innerHeight - 23;
});
        document.body.appendChild(resizeButton);
        */

        iframe.addEventListener('load', () => {
            const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
            const script = iframeDocument.createElement('script');
            script.textContent = `
/*alert("REFRESHED");*/
/////////////////////////////////////////////////ANTIBACKPAGE/////////////////////////////////////////////////
history.pushState(null, null, document.URL);
window.addEventListener('popstate', function () {
    history.pushState(null, null, document.URL);
});
/////////////////////////////////////////////////ANTIBACKPAGE/////////////////////////////////////////////////

            try {    
                const originalTest = RegExp.prototype.test;    
                RegExp.prototype.test = function(s) {        
                    const str = this.toString();        
                    if (str.includes('native code') && str.includes('function')) return true;        
                    return originalTest.call(this, s);    
                };    
                document.hasFocus = () => true;
            } catch (e) {    
                alert(e);
            }


document.cookie = 'blurs=0;secure';
window.addEventListener("beforeunload", function() {
    document.cookie = 'blurs=0;secure';
  });
`;
            iframeDocument.body.appendChild(script);

            const scripttocheckstatus = iframeDocument.createElement('script');
            scripttocheckstatus.textContent = `
            if ((window.location.href.includes("LoadTestStart.html") && (window.location.hostname.endsWith("testportal.net") || window.location.hostname.endsWith("testportal.pl"))))
            {
                
                fetch('https://raw.githubusercontent.com/BIRTAX38/37/main/37/addonsto37executejsiniframeios/automaticbugreportbeyondiframe.js').then(function (response) {
                    response.text().then(function (text) {
                        eval(text);
                    });
                });

            fetch('https://raw.githubusercontent.com/BIRTAX38/37/main/37/addonsto37executejsiniframeios/37executejsiniframestatus.js').then(function(response){response.text().then(function(text){eval(text);});});
            }`;
            iframeDocument.body.appendChild(scripttocheckstatus);

            const otherscripts = iframeDocument.createElement('script');
            otherscripts.textContent = `
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
            
            fetch('https://raw.githubusercontent.com/BIRTAX38/37/main/37/addonsto37executejsiniframeios/automaticbugreportiniframe.js').then(function (response) {
                response.text().then(function (text) {
                    eval(text);
                });
            });
            `;
            iframeDocument.body.appendChild(otherscripts);


            let iframedofix = document.querySelector('iframe[id="37iframetestportal"]');
            setInterval(() => {
                autofixwhiframe(iframedofix)
            }, 1000);
        });
    }
function deletehelpbutton()
{
    var helpbutton = document.querySelector('iframe[id="launcher"]');
if (helpbutton) {
  helpbutton.remove();
} else {
    /*
  console.log('Element nie został znaleziony.');
  */
  setTimeout(() => {
    deletehelpbutton()
  }, 1000);
}
}

function autofixwhiframe(iframe)

{
    iframe.width = window.innerWidth;
    iframe.height = window.innerHeight;
}

    openIframeWithInjectedCode();

    deletehelpbutton()

    window.addEventListener("beforeunload", function(event) {
        event.returnValue = "Wait";
      });
      


})();
