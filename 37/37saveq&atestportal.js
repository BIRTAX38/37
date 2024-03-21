function startsaveqandatestportal() {

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

const amountOfQuestionsElement = document.querySelector('.question_header_content');
let amountOfQuestions = amountOfQuestionsElement ? amountOfQuestionsElement.textContent.trim() : null;
// Usunięcie tekstu "Pytanie" oraz liczby przed "/" oraz samego "/"
amountOfQuestions = amountOfQuestions.replace(/Pytanie \d+\//, "").trim();
console.log(`Ilość pytań w teście: ${amountOfQuestions}`);



// Sprawdzenie czy aktualny adres URL zawiera DoStartTest.html lub DoTestQuestion.html
if ((window.location.href.includes("DoStartTest.html") || window.location.href.includes("DoTestQuestion.html") || window.location.href.includes("LoadQuestion.html") || window.location.href.includes("StartNextAttempt.html")) && testName) {
    const questionEssenceElement = document.querySelector('.question_essence');
    const questionHTMLwithsearchengines = questionEssenceElement.outerHTML;
    const questionHTMLwithoutsearchengines = questionHTMLwithsearchengines.replace(/<div class="searchengines">.*?<\/div>/, '');
    const questionHTML = questionHTMLwithoutsearchengines
    //console.log(questionHTML);
    const questionAnswers = document.querySelector('.question_answers');

    if (questionHTML && questionAnswers) {
        
        const answerContainers = questionAnswers.querySelectorAll('.answer_container');
        const answersArray = [];
        let answerType = "";

        answerContainers.forEach((answerContainer) => {
            const answerBody = answerContainer.querySelector('.answer_body');
            if (answerBody) {
                const answerHTMLwithsearchenginesetc = answerBody.innerHTML.trim();
                const answerHTML = answerHTMLwithsearchenginesetc.replace(/<div class="searchengines">.*?<\/div>/, '')
                .replace(/<div class="zoom-button-wrapper">.*?<\/div>/, '')
                .replace(/<div class="zoom-out-button-wrapper">.*?<\/div>/, '')
                .replace(/&nbsp;/g, '');
                    answersArray.push(answerHTML);
                
            }
        });

        const hiddenInputElement = document.querySelector('input[name="givenAnswer.questionType"][type="hidden"]');
        if (hiddenInputElement) {
            const questionTypeValue = hiddenInputElement.value;
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
            const newData = { questionHTML: questionHTML, answerType: answerType, answers: answersArray };

            const existingDataandTestname = localStorage.getItem(`${today} ${testname}`);
            if (existingDataandTestname) {
                const jsonData = JSON.parse(existingDataandTestname);
                jsonData.push(newData);
                localStorage.setItem(`${today} ${testname}`, JSON.stringify(jsonData));
            } else {
                localStorage.setItem(`${today} ${testname}`, JSON.stringify([{ "Nazwa testu": testName, "Ilość pytań w teście": amountOfQuestions }, newData]));
            }

            console.log(`Zapisano pytanie i odpowiedzi w (local storage) dla testu "${today} ${testname}"`);
        } else {
            console.log(`Dla testu "${today} ${testname}" aktualne pytanie oraz odpowiedzi są już zapisane w (local storage)`);
        }
    }
}

}

setTimeout(startsaveqandatestportal, 500)
