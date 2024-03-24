function start() 
{
const klucze = Object.keys(localStorage);
const kluczeWzor = klucze.filter(klucz => /^\d{4}-\d{2}-\d{2}( .+)?$/.test(klucz));
  
if (kluczeWzor.length === 0) 
{
   console.log('Brak kluczy o formacie ****-**-** w localStorage.');
   alert("Brak zapisanych testów")
   uploadtest = confirm("Czy chciałbyś przesłać test ze schowka?");
   if (uploadtest) 
   {
   const readClipboard = async () => {
   try {
     let uploadedtest = await navigator.clipboard.readText();
     Object.entries(JSON.parse(uploadedtest)).forEach(([k,v]) => localStorage.setItem(k,v));
     alert("Wszystkie testy ze schowka zostały przesłane.")
     start();
     } 
     catch (error) 
     {
         alert('Nie udało się skopiować testu ze schowka unlucky\nMusisz zezwolić na dostęp do schowka');
         alert('Zrób zrzut ekranu lub skopiuj następny alert który ci się wyświetli i mi go wyślij')
         console.error("Error reading clipboard:", error);
     }
      };
      readClipboard();
   }    
} 
 else 
  {
   //console.log('Klucze o formacie ****-**-** w localStorage:');
 
   const headerloginwrap = document.querySelector('.header-login-wrap');
   headerloginwrap.innerHTML = ''; 
 
   const buttoncopytestsloginLogoDiv = document.createElement('div');
   buttoncopytestsloginLogoDiv.className = 'login-logo';
 
   const buttoncopytestscontainerDiv = document.createElement('div');
   buttoncopytestscontainerDiv.className = 'container';
 
   const buttoncopytests = document.createElement('button');
   buttoncopytests.innerHTML = 'Skopiuj wszystkie<br>testy do schowka';
   buttoncopytests.style.maxHeight = '35px';
   buttoncopytestscontainerDiv.appendChild(buttoncopytests);
   buttoncopytestsloginLogoDiv.appendChild(buttoncopytestscontainerDiv);
 
   const buttoncopytestsheaderLoginWrapDiv = document.querySelector('div.header-login-wrap');
   if (buttoncopytestsheaderLoginWrapDiv) {
     buttoncopytestsheaderLoginWrapDiv.appendChild(buttoncopytestsloginLogoDiv);
   } else {
     console.error('Nie znaleziono elementu div.header-login-wrap.');
   }
 
   buttoncopytests.addEventListener('click', function() {
     const exportData = {};
     const regex = /\d{4}-\d{2}-\d{2}/;
   
     for (let i = 0; i < localStorage.length; i++) {
       const key = localStorage.key(i);
        if (regex.test(key)) {
          exportData[key] = localStorage.getItem(key);
        }
      }
    
      const testdataStr = JSON.stringify(exportData);
    
      const tempTextArea = document.createElement('textarea');
      tempTextArea.value = testdataStr;
      document.body.appendChild(tempTextArea);
    
      tempTextArea.select();
      var result = document.execCommand('copy');
      document.body.removeChild(tempTextArea);
      if(result)
      alert('Wszystkie testy zostały skopiowane do schowka.');
      else
        alert('Nie udało się skopiować testów do schowka F\nMusisz zezwolić na dostęp do schowka');   
    });
  
    const selecttestloginLogoDiv = document.createElement('div');
    selecttestloginLogoDiv.className = 'login-logo';
  
    const selecttestcontainerDiv = document.createElement('div');
    selecttestcontainerDiv.className = 'container';
  
    const select = document.createElement('select');
    select.setAttribute('id', '37localstorageselectvalue');
  
    const defaultOption = document.createElement('option');
    defaultOption.text = 'Wybierz...';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    select.style.maxWidth = '120px';
    select.appendChild(defaultOption);
  
    const sortedKeys = kluczeWzor.sort((a, b) => {
      return parseInt(b.replace(/\D/g, '')) - parseInt(a.replace(/\D/g, ''));
    });

    sortedKeys.forEach(klucz => {
      const option = document.createElement('option');
      option.value = klucz;
      option.text = klucz;
      select.appendChild(option);
    });
      
    selecttestcontainerDiv.appendChild(select);
    selecttestloginLogoDiv.appendChild(selecttestcontainerDiv);
    const selecttestheaderLoginWrapDiv = document.querySelector('div.header-login-wrap');
    selecttestheaderLoginWrapDiv.appendChild(selecttestloginLogoDiv);
  
    const selectElement = document.getElementById('37localstorageselectvalue');
  
    selectElement.addEventListener('change', reloadafterselected);
  
    const buttonuploadtestloginLogoDiv = document.createElement('div');
    buttonuploadtestloginLogoDiv.className = 'login-logo';
  
    const buttonuploadtestcontainerDiv = document.createElement('div');
    buttonuploadtestcontainerDiv.className = 'container';
  
    const buttonuploadtest = document.createElement('button');
    buttonuploadtest.style.maxHeight = '35px';
    buttonuploadtest.innerHTML = 'Prześlij testy<br>ze schowka';
  
    buttonuploadtestcontainerDiv.appendChild(buttonuploadtest);
    buttonuploadtestloginLogoDiv.appendChild(buttonuploadtestcontainerDiv);
  
    const buttonuploadtestheaderLoginWrapDiv = document.querySelector('div.header-login-wrap');
    if (buttonuploadtestheaderLoginWrapDiv) {
      buttonuploadtestheaderLoginWrapDiv.appendChild(buttonuploadtestloginLogoDiv);
    } else {
      console.error('Nie znaleziono elementu div.header-login-wrap.');
    }
  
    buttonuploadtest.addEventListener('click', function() {
      const readClipboard = async () => {
        try {
            let uploadedtest = await navigator.clipboard.readText();
            Object.entries(JSON.parse(uploadedtest)).forEach(([k,v]) => localStorage.setItem(k,v));
            alert("Wszystkie testy ze schowka zostały przesłane.")
            start();
        } catch (error) {
          alert('Nie udało się skopiować testu ze schowka unlucky\nMusisz zezwolić na dostęp do schowka');
            console.error("Error reading clipboard:", error);
        }
    };
  
    readClipboard();
      start();
    });
  
    var css = '.login-logo .container { padding: 0 5px; }';
    var style = document.createElement('style');
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  
    function reloadafterselected()
    {
      const selectedValue = selectElement.value;
      if (selectedValue !== 'Wybierz...') {
        console.log('Wybrano wartość:', selectedValue);
  
        if (localStorage.getItem(selectedValue)) {
          //console.log(`Klucz ${selectedValue} istnieje w local storage.`);
          const dataFromLocalStorage = localStorage.getItem(selectedValue);
  
          if (dataFromLocalStorage) {
            let data = JSON.parse(dataFromLocalStorage);
  
            if (Array.isArray(data)) {
              const logincard = document.querySelector('.login-card');
              logincard.innerHTML = ''; 
              logincard.style.display = 'block';
              logincard.style.fontFamily = '"Aktiv Grotesk", sans-serif';
              let numerpytania = 0
  
              var css = '.login-card img { max-width: -webkit-fill-available; height: auto; }';
              var style = document.createElement('style');
              style.appendChild(document.createTextNode(css));
              document.head.appendChild(style);
  
              const copytoclipboard = document.createElement('button');
              copytoclipboard.innerText = 'Skopiuj test do schowka';
              copytoclipboard.classList.add('button37');
              copytoclipboard.style.minWidth = '-webkit-fill-available';
              logincard.appendChild(copytoclipboard);
              copytoclipboard.addEventListener('click', () => {
                const tempTextArea = document.createElement('textarea');
                tempTextArea.value = (`{"${selectedValue}":${JSON.stringify(localStorage.getItem(`${selectedValue}`))}}`);;
                document.body.appendChild(tempTextArea);
              
                tempTextArea.select();
                var result = document.execCommand('copy');
                document.body.removeChild(tempTextArea);
                if(result)
                alert('Wszystkie testy zostały skopiowane do schowka.');
                else
                  alert('Nie udało się skopiować testu ze schowka. unlucky\nMusisz zezwolić na dostęp do schowka?');   
              });
  
              data.forEach(obj => {
                const container = document.createElement('div');
                container.className = 'createdelement37';
                const datatestu = selectedValue.replace(/(^\d{4}-\d{2}-\d{2}) .*/, '$1');
  
                Object.entries(obj).forEach(([key, value]) => {
                  if (key === "Nazwa testu" || key === "Test name") {
                    const h2 = document.createElement('h2')
                    const [rok, miesiac, dzien] = datatestu.split('-');
                    const skonwertowanaData = `${dzien}-${miesiac}-${rok}`;
                    console.log(skonwertowanaData)
                    h2.innerHTML = `Nazwa testu: <br>${value} <br>Data zapisania testu: <br>${skonwertowanaData}`;
                    h2.style.textAlign ="center"
                    container.appendChild(h2);
                  } else if (key === "Ilość pytań w teście" || key === "Amount of questions in test") {
                    const spacer = document.createElement('hr');
                    container.appendChild(spacer)
                    const h3amountofquestion = document.createElement('h3');
                    h3amountofquestion.textContent = `Ilość pytań w teście: ${value}`;
                    h3amountofquestion.style.textAlign ="center"
                    container.appendChild(h3amountofquestion)
                    
                    // Odczytaj dane z lokalnego magazynu
                    var storedData = localStorage.getItem(selectedValue);
                    var parsedData = JSON.parse(storedData);
                    var questionHTMLCount = 0;
                    parsedData.forEach(function(item) {
                      if (item.questionHTML) 
                      {
                          questionHTMLCount++;
                      }
                  });
                  if ((questionHTMLCount < value))
                  {
                      let iloscbrakujacychpytan = value - questionHTMLCount
                      alert(`Wszystkie pytania z testu nie zostały zapisane.\n\nIlość brakujących pytań to: ${iloscbrakujacychpytan}.\n\nTo może być spowodowane tym, że skrypt (saveq&a) nie został uruchomiony.\nLub też pytanie zostało pominięte przechodząc przykładowo z pytania 1 do 3.`)
                  }
                  else
                  {
                  if ((questionHTMLCount > value))
                  {
                      let iloscpowielonychpytan = questionHTMLCount - value
                      alert(`Pytania zostały powielone.\n\nIlość powielonych pytań to: ${iloscpowielonychpytan}.\n\nMoże to być spowodowane tym, że inny skrypt zmodyfikował kod strony, a skrypt "saveq&a" ponownie zapisał pytanie i odpowiedzi uznając pytanie za inne.`)
                  }
              }
                  console.log("Liczba elementów z questionHTML w (local storage): " + questionHTMLCount)
                    const h3amountofsavedquestion = document.createElement('h3');
                    h3amountofsavedquestion.textContent = `Ilość zapisanych pytań: ${questionHTMLCount}`;
                    h3amountofsavedquestion.style.textAlign ="center"
                    container.appendChild(h3amountofsavedquestion);
                  } else if (key === "questionHTML") {
                    numerpytania = numerpytania + 1;
                    const p = document.createElement('p');
                    let questionNumber = obj["questionNumber"];
                    if (questionNumber) {
                        numerpytania = questionNumber;
                    }
                    p.innerHTML = `<h3>Pytanie ${numerpytania}:</h3> ${value}`;
                    container.appendChild(p);
                  } else if (key === "answers") {
                    const p = document.createElement('p');
                    let answerType = obj["answerType"];
                    if (answerType === "SINGLE_ANSWER") {
                        answerType = "[Jednokrotny wybór]";
                        } else if (answerType === "MULTI_ANSWER") {
                        answerType = "[Wielokrotny wybór]";
                        }
                        else if (answerType === "DESCRIPTIVE") {
                        answerType = "[Opisowe]";
                        }
                        else if (answerType === "TRUE_FALSE") {
                        answerType = "[Prawda/fałsz]";
                        }
                        else if (answerType === "SHORT_ANSWER") {
                        answerType = "[Krótka odpowiedź]";
                        }
                        else if (answerType === "SURVEY") {
                        answerType = "[Ankietowe]";
                        }
                    p.innerHTML = `<h3>Odpowiedzi: ${answerType}</h3>`;
                    
                    if (!value || value.length === 0) {
                        value = "<h4>(Pytanie otwarte)<h4>";
                    }
                    
                    if (Array.isArray(value)) {
                        const ul = document.createElement('ul');
                        value.forEach(answer => {
                            const li = document.createElement('li');
                            li.innerHTML = answer;
                            ul.appendChild(li);
                        });
                        p.appendChild(ul);
                    } else {
                        const div = document.createElement('div');
                        div.innerHTML = value;
                        p.appendChild(div);
                    }
  
                    container.appendChild(p);
                  } else if (key === "typedAnswer") {
                    const p = document.createElement('p');
                    p.innerHTML = `<label class="savedtypedAnswer37"><hr><h3>Wpisana odpowiedź:</h3> <ul><li><p>${value}</li></ul></p></label>`;
                    container.appendChild(p);
                  }
                    else if (key === "scorePercents") {
                      const p = document.createElement('p');
                      p.innerHTML = `<label class="scorePercents"><h3>Wynik testu:</h3><h3>${value}</li></h3></label>`;
                      p.style.textAlign ="center"
                      container.appendChild(p);
                    }
                    else if (key === "score") {
                      const p = document.createElement('p');
                      p.innerHTML = `<label class="score"><h3>${value}</li></h3></label>`;
                      p.style.textAlign ="center"
                      container.appendChild(p);
                    }
                  else {
                    const p = document.createElement('p');
                    p.innerHTML = `<strong>${value}</strong> ${value}`;
                  }


                  
                });
  
                logincard.appendChild(container);
  
                const spacer = document.createElement('hr');
                logincard.appendChild(spacer);
              });
            } else {
              console.error('Dane w local storage nie są w formie tablicy.');
            }
          } else {
            console.error('Nie znaleziono danych w local storage pod podanym kluczem.');
          }
        } else {
          console.log('Klucz nie istnieje w local storage.');
        }
        } 
         else 
         {
           console.log('Proszę wybrać opcję.');
         }
      }
   }
}
  
setTimeout(start, 500)

