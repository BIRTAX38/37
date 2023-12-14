
// Funkcja do formatowania odpowiedzi w żądany sposób
var testname = document.querySelector('.test-name').innerText;


function formatAnswers(answersArray) {
    return `["Odpowiedzi: ${answersArray.join(', ')}"]`;
}

// Funkcja sprawdzająca, czy pytanie i odpowiedzi już istnieją w local storage
function checkIfDataExists(questionHTML, answersArray) {
    const today = new Date().toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).replace(/\//g, '-');
    const existingDataandTestname =  localStorage.getItem(`${today} ${testname}`);

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

// Sprawdzenie czy aktualny adres URL zawiera LoadTestStart.html
if (window.location.href.includes("LoadTestStart.html") && testName) {
    const today = new Date().toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).replace(/\//g, '-');


    // Sprawdzenie czy dana data jest już w local storage
    const existingDataandTestname = localStorage.getItem(`${today} ${testname}`);
    if (!existingDataandTestname) {
        localStorage.setItem(`${today} ${testname}`, JSON.stringify([{ "Nazwa testu": testName }]));
        console.log(`Dodano do local storage: ${today} - ${testName}`);
    } else {
        const jsonData = JSON.parse(existingDataandTestname);
        const existingTestNameData = jsonData.find(data => data["Nazwa testu"] === testName);
        
        if (!existingTestNameData) {
            jsonData.unshift({ "Nazwa testu": testName });
            localStorage.setItem(`${today} ${testname}`, JSON.stringify(jsonData));
            console.log(`Dodano do local storage: ${today} - ${testName}`);
        } else {
            console.log(`Dla daty ${today} dane już istnieją w local storage`);
        }
    }
}

// Sprawdzenie czy aktualny adres URL zawiera DoStartTest.html lub DoTestQuestion.html
if ((window.location.href.includes("DoStartTest.html") || window.location.href.includes("DoTestQuestion.html")) || window.location.href.includes("LoadQuestion.html") && testName) {
    const questionEssenceElement = document.querySelector('.question_essence');
    const questionAnswers = document.querySelector('.question_answers');

    if (questionEssenceElement && questionAnswers) {
        const questionHTML = questionEssenceElement.outerHTML; // Kopiowanie całego elementu HTML
        const answerContainers = questionAnswers.querySelectorAll('.answer_container');
        const answersArray = [];

        answerContainers.forEach((answerContainer) => {
            const answerBody = answerContainer.querySelector('.answer_body');
            if (answerBody) {
                const answerText = answerBody.querySelector('p').textContent.trim();
                if (!answerText.includes('DDG | Google')) {
                    answersArray.push(answerText);
                }
            }
        });

        const today = new Date().toLocaleDateString('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          }).replace(/\//g, '-');

        // Sprawdzenie czy pytanie i odpowiedzi już istnieją w local storage
        if (!checkIfDataExists(questionHTML, answersArray)) {
            const formattedAnswers = formatAnswers(answersArray);
            const newData = { questionHTML: questionHTML, answers: answersArray };

            const existingDataandTestname = localStorage.getItem(`${today} ${testname}`);
            if (existingDataandTestname) {
                const jsonData = JSON.parse(existingDataandTestname);
                jsonData.push(newData);
                localStorage.setItem(`${today} ${testname}`, JSON.stringify(jsonData));
            } else {
                localStorage.setItem(`${today} ${testname}`, JSON.stringify([{ "Nazwa testu": testName }, newData]));
            }

            console.log(`Dodano pytanie i odpowiedzi do local storage dla daty ${today}`);
        } else {
            console.log(`Dla daty ${today} pytanie i odpowiedzi już istnieją w local storage`);
        }
    }
}



      
