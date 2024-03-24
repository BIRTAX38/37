function startsaveqandatestportal() {

let saveqandatestportalElement37 = document.getElementById("saveqanda37");
if (!saveqandatestportalElement37) {
let saveqandatestportalElement37 = document.createElement("div");
saveqandatestportalElement37.id = "saveqanda37";
saveqandatestportalElement37.style.display = "none";
let body = document.querySelector("body");
body.appendChild(saveqandatestportalElement37);
}
 else
 {
   console.log("Unikam ponownego uruchomienia skryptu w celu uniknięcia dodatkowych błędów");
   return
 }


 let testNameElement = document.querySelector('.test-name');
 let testName;

 if (testNameElement) {
   testName = testNameElement.innerText;
 } else {
   return;
 }

 const today = new Date().toLocaleDateString('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
}).replace(/\//g, '-');


if ((window.location.href.includes("DoStartTest.html") || window.location.href.includes("DoTestQuestion.html") || window.location.href.includes("LoadQuestion.html") || window.location.href.includes("StartNextAttempt.html")) && testName) {



let loadingimages = document.querySelectorAll('.lazy');
loadingimages.forEach(function(img) {
var dataSrc = img.getAttribute('data-src');
if (dataSrc)
    {
    img.setAttribute('src', dataSrc);
    img.classList.remove('lazy');
    }
});


var elementonlywithNumberandamountofQuestion = document.querySelector('.question_header_content').innerHTML;
var spaceIndex = elementonlywithNumberandamountofQuestion.indexOf(' ');
if (spaceIndex !== -1) {
  var NumberandamountofQuestion = elementonlywithNumberandamountofQuestion.substring(spaceIndex + 1);
  var slashIndex = NumberandamountofQuestion.indexOf('/');
  if (slashIndex !== -1) {
  var questionNumber = NumberandamountofQuestion.substring(0, slashIndex).trim();
  var amountOfQuestions = NumberandamountofQuestion.substring(slashIndex + 1).trim();
  console.log("Numer pytania: " + questionNumber);
  console.log("Liczba pytań: " + amountOfQuestions);
  }
    else
    {
       console.log("Brak slasha w tekście po spacji.");
    }
}
 else
 {
    console.log("Brak spacji w tekście.");
 }


function checkIfDataExists(questionHTML, answersHTML) {
  const existingDataandTestname = localStorage.getItem(`${today} ${testName}`);

  if (existingDataandTestname) {
      const jsonData = JSON.parse(existingDataandTestname);

      for (const data of jsonData) {
          if (data.questionHTML === questionHTML && arraysEqual(data.answers, answersHTML)) {
              return true;
         }
      }
   }
  return false;
}


function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}


const questionId = document.querySelector('input[name="givenAnswer.id"][type="hidden"]').value;
const questionEssenceElement = document.querySelector('.question_essence');
const questionHTMLwithsearchengines = questionEssenceElement.innerHTML;
const questionHTMLwithoutsearchengines = questionHTMLwithsearchengines.replace(/<div class="searchengines">.*?<\/div>/, '')
.replace(/<div class="zoom-button-wrapper">.*?<\/div>/, '')
.replace(/<div class="zoom-out-button-wrapper">.*?<\/div>/, '');
const questionHTML = `<label questionid="${questionId}" class="savedquestion37">${questionHTMLwithoutsearchengines}</label>`
//console.log(questionHTML);
const questionAnswers = document.querySelector('.question_answers');

if (questionHTML && questionAnswers) {
  const answerContainers = questionAnswers.querySelectorAll('.answer_container');
  const answersHTML = [];
  answerContainers.forEach((answerContainer) => {
  const answer_wrap = answerContainer.querySelector('.question_answer_wrap');
  if (answer_wrap.getAttribute('for')) {
  const answerIdfromfor = answer_wrap.getAttribute('for')
  //console.log(forvalue);
  let answerIdhalfafterUnderlines = answerIdfromfor.indexOf('_');
  if (answerIdhalfafterUnderlines !== -1) {
  const answerId = answerIdfromfor.substring(answerIdhalfafterUnderlines + 1);
  //console.log(answerId);

  const answerBody = answerContainer.querySelector('.answer_body');
  if (answerBody) {
  const answerHTMLwithsearchenginesetc = answerBody.innerHTML.trim();
  const answerHTML = answerHTMLwithsearchenginesetc.replace(/<div class="searchengines">.*?<\/div>/, '')
  .replace(/<div class="zoom-button-wrapper">.*?<\/div>/, '')
  .replace(/<div class="zoom-out-button-wrapper">.*?<\/div>/, '')
  .replace(/\n\n&nbsp;/g, '');
  answersHTML.push(`<label answerid="${answerId}" class="savedanswer37">${answerHTML}</label>`);
    }
  }
}
 else
 {
   console.log("Podłoga nie została znaleziona.");
 }
});


const questionType = document.querySelector('input[name="givenAnswer.questionType"][type="hidden"]').value;

// Sprawdzenie czy pytanie i odpowiedzi już istnieją w local storage
if (!checkIfDataExists(questionHTML, answersHTML)) {
    let Datatosave = {}
    Datatosave = { questionHTML: questionHTML, questionId: questionId, questionNumber: questionNumber, answerType: questionType, answers: answersHTML };
if (questionType === "SINGLE_ANSWER" || questionType === "TRUE_FALSE" || questionType === "SURVEY") {
  Datatosave.idOfSelectedAnswer = null;
}
if (questionType === "MULTI_ANSWER") {
    Datatosave.idsOfSelectedAnswers = null;
  }
if (questionType === "SHORT_ANSWER") {
    Datatosave.typedAnswer = null;
}
//console.log(Datatosave)
  const existingDataandTestname = localStorage.getItem(`${today} ${testName}`);
  if (existingDataandTestname)
  {
    const jsonData = JSON.parse(existingDataandTestname);
    jsonData.push(Datatosave);
    localStorage.setItem(`${today} ${testName}`, JSON.stringify(jsonData));
  }
    else
    {
     localStorage.setItem(`${today} ${testName}`, JSON.stringify([{ "Test name": testName, "Amount of questions in test": amountOfQuestions }, Datatosave]));
    }
   console.log(`Zapisano pytanie i odpowiedzi w (local storage) dla testu "${today} ${testName}"`);
}
 else
 {
   console.log(`Dla testu "${today} ${testName}" aktualne pytanie oraz odpowiedzi są już zapisane w (local storage)`);
 }


 //Before unload
 /////////////////////////////////////////////////Save selected answers/////////////////////////////////////////////////
window.addEventListener("beforeunload", function() {
    if (questionType === "SINGLE_ANSWER" || questionType === "MULTI_ANSWER" || questionType === "TRUE_FALSE" || questionType === "SURVEY") {
        const inputs = document.querySelectorAll('.question_answers input[type="checkbox"], .question_answers input[type="radio"]');
        const selectedanswersId = [];

        inputs.forEach(input => {
            if (input.checked) {
                const answerIdfrominput = input.id;
                let answerIdhalfafterUnderlines = answerIdfrominput.indexOf('_');
                if (answerIdhalfafterUnderlines !== -1) {
                    const answerId = answerIdfrominput.substring(answerIdhalfafterUnderlines + 1);
                    //console.log(answerId);
                    selectedanswersId.push(answerId);
                }
            }
        });

        const allselectedanswersids = selectedanswersId.join(', ');
        if (allselectedanswersids) {
            if (questionType === "SINGLE_ANSWER" || questionType === "TRUE_FALSE" || questionType === "SURVEY") {
                const Changedata = saveselectedanswersinlocalstorage(allselectedanswersids, "idOfSelectedAnswer")
                                    
                if (Changedata) {
                    console.log("Zaktualizowano obiekt:", Changedata);
                } else {
                    console.log("Nie znaleziono obiektu o podanym questionId:", questionIdDoZmiany);
                } 
              }
              if (questionType === "MULTI_ANSWER") {
                const Changedata = saveselectedanswersinlocalstorage(allselectedanswersids, "idsOfSelectedAnswers")
                                    
                if (Changedata) {
                    console.log("Zaktualizowano obiekt:", Changedata);
                } else {
                    console.log("Nie znaleziono obiektu o podanym questionId:", questionIdDoZmiany);
                } 
                }
        }
    }
});

if (questionType === "SHORT_ANSWER") {
    setInterval(() => {
        const inputElement = document.querySelector('input[id^="shortAnswerBody_"]');
        if (inputElement) {
            const typedAnswer = inputElement.value;
            //console.log('Wartość z inputa:', typedAnswer);
            if (typedAnswer) {
                const Changedata = saveselectedanswersinlocalstorage(typedAnswer, "typedAnswer")
                
                /* 
                //Nie chce mieć tego w console
                if (Changedata) {
                    console.log("Zaktualizowano obiekt:", Changedata);
                } else {
                    console.log("Nie znaleziono obiektu o podanym questionId:", questionIdDoZmiany);
                } 
                */
            }
        } else {
            console.error('Nie znaleziono inputa.');
        }
    }, 500);
}

function saveselectedanswersinlocalstorage(Data, Keytochange) {
    const localStorageData = localStorage.getItem(`${today} ${testName}`);
    if (localStorageData) {
        const parsedData = JSON.parse(localStorageData);
        for (let i = 0; i < parsedData.length; i++) {
            const obj = parsedData[i];
            if (obj.questionId && obj.questionId === questionId) {
                obj[Keytochange] = Data;
                localStorage.setItem(`${today} ${testName}`, JSON.stringify(parsedData));
                return obj;
            }
        }
        return null;
    } else {
        return null;
    }
}

   

/////////////////////////////////////////////////Save selected answers/////////////////////////////////////////////////

  }
}
else
{
  if (window.location.href.includes("/exam/test-result.html"))
{
        console.log("Zapisywanie % zdanego testu i ilości zdobytych punktów za 5s")
        setTimeout(() => {

const timerTile = document.querySelector('.timer-tile');
let startofwritingtesttime = "";
let endofwritingtesttime = "";
let totaltestwritingtime = "";

if (timerTile) {
    const timeValues = timerTile.querySelectorAll('.mdc-property-value');
    timeValues.forEach(value => {
        const timeText = value.textContent.trim();
        if (timeText.includes(":")) {
            if (startofwritingtesttime === "") startofwritingtesttime = timeText;
            else if (endofwritingtesttime === "") endofwritingtesttime = timeText;
        }
    });
    totaltestwritingtime = timerTile.querySelector('.configuration-progress__text').textContent.trim();

    console.log('startofwritingtesttime:', startofwritingtesttime);
    console.log('endofwritingtesttime:', endofwritingtesttime);
    console.log('totaltestwritingtime:', totaltestwritingtime);
} else {
    console.log('Nie znaleziono elementu o klasie "timer-tile".');
}


const percentageDiv = document.querySelector('.mdc-typography--headline6.donut-main-value.donut-percents');
const pointsDiv = document.querySelector('.mdc-typography--body1.donut-sub-value');

if (percentageDiv && pointsDiv) {
   const scorePercents = percentageDiv.textContent.trim();
   const score = pointsDiv.textContent.trim();
   console.log('scorePercents:', scorePercents);
   console.log('score:', score);
   const elements = document.querySelectorAll('.timer-tile-properties-container .mdc-property-value');
   const testName = document.querySelector('.test-name').innerText;
   let yyyymmddandtestName;
   if (elements.length > 0) {
   let yyyymmdd = elements[elements.length - 1].textContent.trim();
   yyyymmddandtestName = `${yyyymmdd} ${testName}`;
   //console.log(yyyymmddandtestName);
   const existingDataandTestname = localStorage.getItem(`${yyyymmddandtestName}`);
   if (existingDataandTestname)
   {
    const existingData = JSON.parse(existingDataandTestname);
    const existingScoreAndTime = existingData.find(data => {
        return data.scorePercents === scorePercents &&
               data.score === score &&
               data.startofwritingtesttime === startofwritingtesttime &&
               data.endofwritingtesttime === endofwritingtesttime &&
               data.totaltestwritingtime === totaltestwritingtime;
    });

    if (!existingScoreAndTime) {
      const newData = {
          scorePercents: scorePercents,
          score: score,
          startofwritingtesttime: startofwritingtesttime,
          endofwritingtesttime: endofwritingtesttime,
          totaltestwritingtime: totaltestwritingtime
      };
      existingData.push(newData);
      localStorage.setItem(`${yyyymmddandtestName}`, JSON.stringify(existingData));
  } else {
      console.log("Dane dla tego testu dane dotyczące wyniki i czasu już istnieją w localStorage.");
  }
   }
   else
   {
       console.log("Klucz nie istnieje w local storage")
   }
}

}
      else
    {
      console.log('Nie znaleziono wymaganych elementów div.');
    }
  }, 5000);
}

}


}

setTimeout(startsaveqandatestportal, 500)
