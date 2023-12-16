// ==UserScript==
// @name         Antiblur to testportal
// @version      37
// @description  Antiblur
// @author       b37
// @match        https://*.testportal.net/*
// @match        https://*.testportal.pl/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=testportal.net
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
var popupToRemove = document.getElementById('honestRespondentBlockade_popup');
if (popupToRemove) popupToRemove.remove();

document.body.style.overflow = 'auto';

setInterval(function() {
document.cookie = `blurs=0;secure`;
}, 10);

})();
