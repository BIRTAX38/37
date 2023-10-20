// Pobranie elementów z klasą "question_essence"
const questionEssenceElements = document.querySelectorAll('.question_essence');

// Pobranie elementów z klasą "answer_body"
const answerBodyElements = document.querySelectorAll('.answer_body');

// Funkcja do pobierania tekstu z elementu <p> wewnątrz elementu
function getTextFromElement(element, elementType) {
  const pElement = element.querySelector('p');
  if (pElement) {
    const text = pElement.textContent.trim();
    return `${elementType} ${text}\n`;
  }
  return '';
}

// Połączenie tekstu z "question_essence" i "answer_body"
let combinedText = '';

questionEssenceElements.forEach((element) => {
  combinedText += getTextFromElement(element, 'Pytanie:');
});

answerBodyElements.forEach((element, index) => {
  combinedText += getTextFromElement(element, `Odpowiedź: ${index + 1}`);
});

//console.log(combinedText);

let combinedtextdogpt = 'Podaj odpowiedź na pytanie np. 1, 2 lub 3\n\n' + combinedText

console.log(combinedtextdogpt)

function copyTextToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();

  try {
    document.execCommand('copy');
    console.log('Tekst został skopiowany do schowka.');
  } catch (err) {
    console.error('Błąd kopiowania tekstu do schowka:', err);
  }

  document.body.removeChild(textArea);
}

// Dodanie kliknięcia w okno przeglądarki


// Skopiowanie połączonego tekstu do schowka
copyTextToClipboard(combinedtextdogpt);
