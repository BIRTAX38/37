// ==UserScript==
// @name         37Testportal Multi Tool
// @namespace    https://*.testportal.pl/
// @version      3.0.5
// @description  Ha-ha H@ck0wansko xd
// @author       Czarek Nakamoto (mrcyjanek.net) remake by 37
// @updateURL    https://raw.githubusercontent.com/BIRTAX38/37/main/37/37testportal.js
// @downloadURL  https://raw.githubusercontent.com/BIRTAX38/37/main/37/37testportal.js
// @match        https://*.testportal.net/*
// @match        https://*.testportal.pl/*
// @grant        none
// ==/UserScript==

//(function() {
//    'use strict';
    document.cookie = `blurs=0; path=/exam; secure`;
console.log("[TESTPORTAL MULTITOOL] started")
const original = RegExp.prototype.test;
RegExp.prototype.test = function (s) {
    const string = this.toString();
    if (string.includes("native code") && string.includes("function")) {
        return true;
    }
    const r = original.call(this, s);
    return r;
};

if (typeof logToServer === "function") {
  logToServer = function(x) { console.log(x) }
}
function initPage() {
    if (!window.location.href.includes("LoadTestStart.html")) {
        return
    }
    //if (document.getElementsByClassName('test-card-body').length == 1) {

    //} else {
    document.getElementsByClassName('test-card-body')[0].innerHTML += "Witaj byczq, skoncentruj sie na tescie, ale nie za bardzo, tak na luzie. Wszystko będzie git.<br />Mozesz wychodzic poza karte, szukac w przegladarce, lub innej aplikacji, i robic wszystkie te cuda, nauczyciel sie nie dowie.<br /> Btw hopsaj na <a href=\"https://discord.gg/KhMuN7tJfF\" target=\"_blank\">discorda</a> <br />Z fartem. <br />~ Wiesz kto"
    document.getElementsByClassName('test-card-content-with-icon__icon')[0].innerHTML = "<img src=\"https://git.mrcyjanek.net/mrcyjanek/testportal-multitool/raw/branch/main/static/error.svg\" width=\"75\">"
    //}
}
function timeLimit() {

    document.hasFocus = () => {
        return true;
    };

    /*
        if (!document.querySelector('div.navigation_controls')) {
    window.startTime = Infinity;

    document.getElementById("remaining_time_content").outerHTML = "";
    document.getElementById("remaining_time_label").style.color = "#0bc279";
    document.getElementById("remaining_time_label").style.fontWeight = 600;
    document.getElementById("remaining_time_label").innerText = "Czas na odpowiedz: Tyle, ile ci potrzeba."
        }
        */
}

function answerSearch() {
    let classqanda = ["answer_body", "question_essence"]
    classqanda.forEach(c => {
        let elms = document.getElementsByClassName(c)
        for (let i = 0; i < elms.length; i++) {
            console.log(elms[i])
            let text = elms[i].innerText
            if (text == "") {
                continue
            }
            elms[i].innerHTML = elms[i].innerHTML.replace(/&nbsp;/g,'');
            let searchenginesdiv = document.createElement('div');
            searchenginesdiv.classList.add('searchengines'); // Dodanie klasy do nowego diva
            searchenginesdiv.insertAdjacentHTML('beforeend', `<a target="_blank" href="https://duckduckgo.com/?q=${ encodeURIComponent(text) }">DDG</a> | <a target="_blank" href="https://google.com/search?q=${ encodeURIComponent(text) }&igu=1">Google</a>`);
            elms[i].appendChild(searchenginesdiv); // Dodanie nowego diva wokół elementu
            if (c === 'question_essence') { // Dodanie warunku, aby &nbsp; dodawane było tylko dla question_essence
                continue;
            }
            elms[i].insertAdjacentHTML('beforeend', '&nbsp;');
        }
    })
}
function imageSearch() {
    const images = document.querySelectorAll('img');

    images.forEach((image) => {
      if (
        !image.classList.contains('logo_wide') &&
        !image.classList.contains('logo_default')
      ) {
        image.addEventListener('click', () => {
          const imageUrl = image.getAttribute('src');
          const googleSearchUrl =
            'https://lens.google.com/uploadbyurl?url=' + encodeURIComponent(imageUrl);
          window.open(googleSearchUrl);
        });
      }
    });
}


//setTimeout(initPage, 100)
if (!window.location.href.includes("LoadTestStart.html")) {
    setTimeout(timeLimit, 0)
    setTimeout(answerSearch, 100)
    setTimeout(imageSearch, 200)
}
//})();
