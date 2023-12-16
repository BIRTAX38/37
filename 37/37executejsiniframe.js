(function() {
    if (!(window.location.href.includes("testportal.net") || window.location.href.includes("testportal.pl"))) {
        alert("Domain is invalid script cannot be executed")
        redirecttotestportal = confirm("Czy chcesz zostać przeniesiony do strony testportal?\nPamiętaj musisz ponownie uruchomić skrypt po przeniesieniu.")
        if (redirecttotestportal) 
        {
            window.location.href = "https://testportal.pl"
        }
        return;
    }
    var wprowadzonylink = prompt("Wprowadź link do testu:\n");
    if (!(wprowadzonylink.includes("testportal.net") || wprowadzonylink.includes("testportal.pl"))) {
        alert("Niepoprawny adres url (link)")
    }
    var adresurl = new URL(window.location.href).hostname.replace(/^www\./, '');
    console.log(adresurl);
    if (!wprowadzonylink.includes(adresurl)) {
        let adrestopenwindow = new URL(wprowadzonylink).origin;
        alert("37:Zostaniesz przekierowany na inną stronę, ponieważ skrypt nie może zostać wykonany. Wykonaj skrypt po przekierowaniu na inną stronę.");
        window.location.href = adrestopenwindow;
        console.log(domena);
    }
    
    document.getElementsByTagName("html")[0].innerHTML = "";
    document.body.style.backgroundColor = "white";
    function openIframeWithInjectedCode() {
        const iframe = document.createElement('iframe');
        iframe.src = wprowadzonylink;
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
            }`;
            iframeDocument.body.appendChild(script);
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
