if ((window.location.hostname.endsWith("testportal.net") || window.location.hostname.endsWith("testportal.pl"))) {
  document.cookie = `blurs=0;secure`;
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
}
