function startsaveqandatestportal() {

    let startsaveqandatestportalElement37 = document.getElementById("startsaveqanda37");
    if (!startsaveqandatestportalElement37) {
    let startsaveqandatestportalElement37 = document.createElement("div");
    startsaveqandatestportalElement37.id = "startsaveqanda37";
    startsaveqandatestportalElement37.style.display = "none";
    let body = document.querySelector("body");
    body.appendChild(startsaveqandatestportalElement37);
    }
    else
    {
        console.log("Unikam ponownego uruchomienia skryptu w celu uniknięcia dodatkowych błędów");
        return
    }

    
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
    


// Funkcja do formatowania odpowiedzi w żądany sposób
var testname = document.querySelector('.test-name').innerText;

// Funkcja sprawdzająca, czy pytanie i odpowiedzi już istnieją w local storage
function checkIfDataExists(questionHTML, answersArray) {
    const today = new Date().toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).replace(/\//g, '-');
    const existingDataandTestname = localStorage.getItem(`${today} ${testname}`);

    if (existingDataandTestname) {
        const jsonData = JSON.parse(existingDataandTestname);

        for (const data of jsonData) {
            if (data.questionHTML === questionHTML && arraysEqual(data.answers, answersArray)) {
                return true;
            }
        }
    }

    return false;
}

// Funkcja sprawdzająca równość dwóch tablic
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

// Pobranie nazwy testu
const testNameElement = document.querySelector('.test-name');
const testName = testNameElement ? testNameElement.textContent.trim() : null;



// Sprawdzenie czy aktualny adres URL zawiera DoStartTest.html lub DoTestQuestion.html
if ((window.location.href.includes("DoStartTest.html") || window.location.href.includes("DoTestQuestion.html") || window.location.href.includes("LoadQuestion.html") || window.location.href.includes("StartNextAttempt.html")) && testName) {
    const questionEssenceElement = document.querySelector('.question_essence');
    const questionHTMLwithsearchengines = questionEssenceElement.outerHTML;
    const questionHTMLwithoutsearchengines = questionHTMLwithsearchengines.replace(/<div class="searchengines">.*?<\/div>/, '')
    .replace(/<div class="zoom-button-wrapper">.*?<\/div>/, '')
    .replace(/<div class="zoom-out-button-wrapper">.*?<\/div>/, '');
    const questionHTML = questionHTMLwithoutsearchengines
    //console.log(questionHTML);
    const questionAnswers = document.querySelector('.question_answers');

    if (questionHTML && questionAnswers) {
        
        const answerContainers = questionAnswers.querySelectorAll('.answer_container');
        const answersArray = [];
        let answerType = "";

        answerContainers.forEach((answerContainer) => {
            const answer_wrap = answerContainer.querySelector('.question_answer_wrap');
            if (answer_wrap.getAttribute('for')) {
                // Jeśli tak, wypisz wartość atrybutu 'for' do konsoli
                const forvalue = answer_wrap.getAttribute('for')
                //console.log(forvalue);
            
            const answerBody = answerContainer.querySelector('.answer_body');
            if (answerBody) {
                const answerHTMLwithsearchenginesetc = answerBody.innerHTML.trim();
                const answerHTML = answerHTMLwithsearchenginesetc.replace(/<div class="searchengines">.*?<\/div>/, '')
                .replace(/<div class="zoom-button-wrapper">.*?<\/div>/, '')
                .replace(/<div class="zoom-out-button-wrapper">.*?<\/div>/, '')
                .replace(/\n\n&nbsp;/g, '');
                    answersArray.push(`<label for="${forvalue}" class="savedanswer37">${answerHTML}</label>`);
                }
            }
        });

        const questionTypeValue = document.querySelector('input[name="givenAnswer.questionType"][type="hidden"]').value;
        if (questionTypeValue) {
            if (questionTypeValue === "SINGLE_ANSWER") {
                answerType = "[Jednokrotny wybór]";
            } else if (questionTypeValue === "MULTI_ANSWER") {
                answerType = "[Wielokrotny wybór]";
            }
            else if (questionTypeValue === "DESCRIPTIVE") {
                answerType = "[Opisowe]";
            }
            else if (questionTypeValue === "TRUE_FALSE") {
                answerType = "[Prawda/fałsz]";
            }
            else if (questionTypeValue === "SHORT_ANSWER") {
                answerType = "[Krótka odpowiedź]";
            }
            else if (questionTypeValue === "SURVEY") {
                answerType = "[Ankietowe]";
            }
        }
        

        const today = new Date().toLocaleDateString('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).replace(/\//g, '-');

        // Sprawdzenie czy pytanie i odpowiedzi już istnieją w local storage
        if (!checkIfDataExists(questionHTML, answersArray)) {
            const Datatosave = { questionHTML: questionHTML, questionNumber: questionNumber, answerType: answerType, answers: answersArray };

            const existingDataandTestname = localStorage.getItem(`${today} ${testname}`);
            if (existingDataandTestname) {
                const jsonData = JSON.parse(existingDataandTestname);
                jsonData.push(Datatosave);
                localStorage.setItem(`${today} ${testname}`, JSON.stringify(jsonData));
            } else {
                localStorage.setItem(`${today} ${testname}`, JSON.stringify([{ "Nazwa testu": testName, "Ilość pytań w teście": amountOfQuestions }, Datatosave]));
            }

            console.log(`Zapisano pytanie i odpowiedzi w (local storage) dla testu "${today} ${testname}"`);

                  
        } else {
            console.log(`Dla testu "${today} ${testname}" aktualne pytanie oraz odpowiedzi są już zapisane w (local storage)`);
        }
        
        window.addEventListener("beforeunload", function() {

if (questionTypeValue === "SINGLE_ANSWER" || questionTypeValue === "MULTI_ANSWER" || questionTypeValue === "TRUE_FALSE" || questionTypeValue === "SURVEY") {
    console.log("SAVE SELECTED ANSWER STARTED");

    const inputs = document.querySelectorAll('.question_answers input[type="checkbox"], .question_answers input[type="radio"]');
    const selectedanswersId = [];

    inputs.forEach(input => {
        if (input.checked) {
            selectedanswersId.push(input.id);
        }
    });

    const allselectedanswersids = selectedanswersId.join(', ');

    console.log(allselectedanswersids);


    if (allselectedanswersids) {
        const DataToSaveWithSelectedAnswers = { NumberOfQuestionWithSelectedAnswer: questionNumber, SelectedAnswerType: answerType, IdsOfSelectedAnswer: allselectedanswersids };
        const existingSaveWithSelectedAnswers = localStorage.getItem(`Selected_Answers ${today} ${testname}`);

        if (existingSaveWithSelectedAnswers) {
            let jsonData = JSON.parse(existingSaveWithSelectedAnswers);
            // Filter out old entry for the same question
            jsonData = jsonData.filter(entry => entry.NumberOfQuestionWithSelectedAnswer !== DataToSaveWithSelectedAnswers.NumberOfQuestionWithSelectedAnswer);
            jsonData.push(DataToSaveWithSelectedAnswers);
            localStorage.setItem(`Selected_Answers ${today} ${testname}`, JSON.stringify(jsonData));
        } else {
            localStorage.setItem(`Selected_Answers ${today} ${testname}`, JSON.stringify([DataToSaveWithSelectedAnswers]));
        }
    }
}

        });


    }
}

}

setTimeout(startsaveqandatestportal, 500)
