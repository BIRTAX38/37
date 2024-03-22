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
const testName = document.querySelector('.test-name').innerText;
if (!testName)
{return}

if ((window.location.href.includes("DoStartTest.html") || window.location.href.includes("DoTestQuestion.html") || window.location.href.includes("LoadQuestion.html") || window.location.href.includes("StartNextAttempt.html")) && testName) {

let loadingimages = document.querySelectorAll('.lazy');
loadingimages.forEach(function(img) {
var dataSrc = img.getAttribute('data-src');
if (dataSrc) {
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
    } else {
    console.log("Brak slasha w tekście po spacji.");
    }
} else {
    console.log("Brak spacji w tekście.");
}


function checkIfDataExists(questionHTML, answersHTML) {
  const today = new Date().toLocaleDateString('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
  }).replace(/\//g, '-');
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
const questionHTMLwithsearchengines = questionEssenceElement.outerHTML;
const questionHTMLwithoutsearchengines = questionHTMLwithsearchengines.replace(/<div class="searchengines">.*?<\/div>/, '')
.replace(/<div class="zoom-button-wrapper">.*?<\/div>/, '')
.replace(/<div class="zoom-out-button-wrapper">.*?<\/div>/, '');
const questionHTML = `<label questionid="${questionId}" class="savedquestion37">${questionHTMLwithoutsearchengines}</label>`
//console.log(questionHTML);
const questionAnswers = document.querySelector('.question_answers');

if (questionHTML && questionAnswers) {
     const answerContainers = questionAnswers.querySelectorAll('.answer_container');
     const answersHTML = [];
     let answerType = "";    
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

const questionTypeValue = document.querySelector('input[name="givenAnswer.questionType"][type="hidden"]').value;     

const today = new Date().toLocaleDateString('en-CA', {
year: 'numeric',
month: '2-digit',
day: '2-digit'
}).replace(/\//g, '-');

// Sprawdzenie czy pytanie i odpowiedzi już istnieją w local storage
if (!checkIfDataExists(questionHTML, answersHTML)) {
  const Datatosave = { questionHTML: questionHTML, questionId: questionId, questionNumber: questionNumber, answerType: questionTypeValue, answers: answersHTML };

  const existingDataandTestname = localStorage.getItem(`${today} ${testName}`);
  if (existingDataandTestname) 
  {
    const jsonData = JSON.parse(existingDataandTestname);
    jsonData.push(Datatosave);
    localStorage.setItem(`${today} ${testName}`, JSON.stringify(jsonData));
  } 
    else
    {
     localStorage.setItem(`${today} ${testName}`, JSON.stringify([{ "Nazwa testu": testName, "Ilość pytań w teście": amountOfQuestions }, Datatosave]));
    }
   console.log(`Zapisano pytanie i odpowiedzi w (local storage) dla testu "${today} ${testName}"`);
}
else 
{
 console.log(`Dla testu "${today} ${testName}" aktualne pytanie oraz odpowiedzi są już zapisane w (local storage)`);
}


window.addEventListener("beforeunload", function() {
if (questionTypeValue === "SINGLE_ANSWER" || questionTypeValue === "MULTI_ANSWER" || questionTypeValue === "TRUE_FALSE" || questionTypeValue === "SURVEY") {
console.log("SAVE SELECTED ANSWER STARTED");

const inputs = document.querySelectorAll('.question_answers input[type="checkbox"], .question_answers input[type="radio"]');
const selectedanswersId = [];

inputs.forEach(input => {
  if (input.checked) {
    answerIdfrominput = input.id
    let answerIdhalfafterUnderlines = answerIdfrominput.indexOf('_');
      if (answerIdhalfafterUnderlines !== -1) 
      {
       const answerId = answerIdfrominput.substring(answerIdhalfafterUnderlines + 1);
       console.log(answerId);  
       selectedanswersId.push(answerId);
      }
    }
});

const allselectedanswersids = selectedanswersId.join(', ');

console.log(allselectedanswersids);


if (allselectedanswersids) 
  {
    const DataToSaveWithSelectedAnswers = { NumberOfQuestionWithSelectedAnswer: questionNumber, questionId: questionId, SelectedAnswerType: questionTypeValue, IdsOfSelectedAnswers: allselectedanswersids };
    const existingSaveWithSelectedAnswers = localStorage.getItem(`Sel_Answ ${today} ${testName}`);

    if (existingSaveWithSelectedAnswers) {
    let jsonData = JSON.parse(existingSaveWithSelectedAnswers);
    // Filter out old entry for the same question
    jsonData = jsonData.filter(entry => entry.NumberOfQuestionWithSelectedAnswer !== DataToSaveWithSelectedAnswers.NumberOfQuestionWithSelectedAnswer);
    jsonData.push(DataToSaveWithSelectedAnswers);
    localStorage.setItem(`Sel_Answ ${today} ${testName}`, JSON.stringify(jsonData));
    } 
    else
    {
      localStorage.setItem(`Sel_Answ ${today} ${testName}`, JSON.stringify([DataToSaveWithSelectedAnswers]));
    }
  }
}

    });
  }
}

}

setTimeout(startsaveqandatestportal, 500)
