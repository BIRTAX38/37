// ==UserScript==
// @name         37Antiblur Testportal
// @version      2
// @description  Omija zabezpieczenie na stronie testportal "Technologia Uczciwy Rozwiązujący"
// @author       b37
// @match        https://*.testportal.net/exam/*
// @match        https://*.testportal.pl/exam/*
// @updateURL    https://raw.githubusercontent.com/BIRTAX38/37/main/37/37antiblur.js
// @downloadURL  https://raw.githubusercontent.com/BIRTAX38/37/main/37/37antiblur.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=testportal.net
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

var popupToRemove = document.getElementById('honestRespondentBlockade_popup');
if (popupToRemove) popupToRemove.remove();


document.body.style.overflow = 'auto';

setInterval(function() {
    document.cookie = `blurs=0; path=/exam; secure`;
}, 500);

})();
