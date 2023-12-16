function start() {
  const klucze = Object.keys(localStorage);
  const kluczeWzor = klucze.filter(klucz => /^\d{4}-\d{2}-\d{2}( \w+)?$/.test(klucz));

  if (kluczeWzor.length === 0) {
    console.log('Brak kluczy o formacie ****-**-** w localStorage.');
    alert("Brak zapisanych testów")
    uploadtest = confirm("Czy chciałbyś przesłać test ze schowka?");
    if (uploadtest) {
        const readClipboard = async () => {
            try {
                let uploadedtest = await navigator.clipboard.readText();
                Object.entries(JSON.parse(uploadedtest)).forEach(([k,v]) => localStorage.setItem(k,v));
                alert("Wszystkie testy ze schowka zostały przesłane.")
                start();
                //location.reload();
            } catch (error) {
              alert('Nie udało się skopiować testu ze schowka unlucky\nMusisz zezwolić na dostęp do schowka');
                console.error("Error reading clipboard:", error);
            }
        };
    
        readClipboard();
    }
    
  } else {
    console.log('Klucze o formacie ****-**-** w localStorage:');

/////////////////////////////////////////////////////////////////////////COPYTESTS/////////////////////////////////////////////////////////////////////////
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
  
    // Dodanie loginLogoDiv do div.header-login-wrap
    const buttoncopytestsheaderLoginWrapDiv = document.querySelector('div.header-login-wrap');
    if (buttoncopytestsheaderLoginWrapDiv) {
      buttoncopytestsheaderLoginWrapDiv.appendChild(buttoncopytestsloginLogoDiv);
    } else {
      console.error('Nie znaleziono elementu div.header-login-wrap.');
    }
  
    // Dodanie zdarzenia do przycisku
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
/////////////////////////////////////////////////////////////////////////COPYTESTS/////////////////////////////////////////////////////////////////////////


    const selecttestloginLogoDiv = document.createElement('div');
    selecttestloginLogoDiv.className = 'login-logo';
  
    const selecttestcontainerDiv = document.createElement('div');
    selecttestcontainerDiv.className = 'container';
  
    const select = document.createElement('select');
    select.setAttribute('id', '37localstorageselectvalue');

    // Dodanie domyślnej opcji "Wybierz..."
    const defaultOption = document.createElement('option');
    defaultOption.text = 'Wybierz...';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    select.appendChild(defaultOption);

    kluczeWzor.forEach(klucz => {
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



/////////////////////////////////////////////////////////////////////////UPLOADTESTS/////////////////////////////////////////////////////////////////////////
        const buttonuploadtestloginLogoDiv = document.createElement('div');
        buttonuploadtestloginLogoDiv.className = 'login-logo';
    
        const buttonuploadtestcontainerDiv = document.createElement('div');
        buttonuploadtestcontainerDiv.className = 'container';
      
        const buttonuploadtest = document.createElement('button');
        buttonuploadtest.style.maxHeight = '35px';
        buttonuploadtest.innerHTML = 'Prześlij testy<br>ze schowka';
      
        buttonuploadtestcontainerDiv.appendChild(buttonuploadtest);
        buttonuploadtestloginLogoDiv.appendChild(buttonuploadtestcontainerDiv);
      
        // Dodanie loginLogoDiv do div.header-login-wrap
        const buttonuploadtestheaderLoginWrapDiv = document.querySelector('div.header-login-wrap');
        if (buttonuploadtestheaderLoginWrapDiv) {
          buttonuploadtestheaderLoginWrapDiv.appendChild(buttonuploadtestloginLogoDiv);
        } else {
          console.error('Nie znaleziono elementu div.header-login-wrap.');
        }
      
        // Dodanie zdarzenia do przycisku
        buttonuploadtest.addEventListener('click', function() {
          //const uploadedtest = prompt("Wpisz tutaj testy które skopiowałeś do schowka")
          const readClipboard = async () => {
            try {
                let uploadedtest = await navigator.clipboard.readText();
                Object.entries(JSON.parse(uploadedtest)).forEach(([k,v]) => localStorage.setItem(k,v));
                alert("Wszystkie testy ze schowka zostały przesłane.")
                start();
                //location.reload();
            } catch (error) {
              alert('Nie udało się skopiować testu ze schowka unlucky\nMusisz zezwolić na dostęp do schowka');
                console.error("Error reading clipboard:", error);
            }
        };
    
        readClipboard();
          start();
          //location.reload();
        });
/////////////////////////////////////////////////////////////////////////UPLOADTESTS/////////////////////////////////////////////////////////////////////////
//        var css = '.login-card img { max-width: 100%; height: auto; }';
var css = '.login-logo .container { padding: 0 5px; }';
var style = document.createElement('style');
style.appendChild(document.createTextNode(css));
document.head.appendChild(style);




    

      function reloadafterselected()
      {
        const selectedValue = selectElement.value;
        if (selectedValue !== 'Wybierz...') {
          console.log('Wybrano wartość:', selectedValue);

          const elements = document.querySelector('.login-footer');


          
  if (localStorage.getItem(selectedValue)) {
    console.log('Klucz istnieje w local storage.');



    const dataFromLocalStorage = localStorage.getItem(selectedValue);


    if (dataFromLocalStorage) {
      let data = JSON.parse(dataFromLocalStorage);


      if (Array.isArray(data)) {
        const logincard = document.querySelector('.login-card');
        logincard.innerHTML = ''; // Wyczyść zawartość elementu
        logincard.style.display = 'block';
        logincard.style.fontFamily = '"Aktiv Grotesk", sans-serif';
        let numerpytania = 0

        
//        var css = '.login-card img { max-width: 100%; height: auto; }';
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
            //navigator.clipboard.writeText(`Object.entries({"${selectedValue}":${JSON.stringify(localStorage.getItem(`${selectedValue}`))}}).forEach(([k,v])=>localStorage.setItem(k,v))`);

            
              const tempTextArea = document.createElement('textarea');
              tempTextArea.value = (`{"${selectedValue}":${JSON.stringify(localStorage.getItem(`${selectedValue}`))}}`);;
              document.body.appendChild(tempTextArea);
            
              tempTextArea.select();
              var result = document.execCommand('copy');
              document.body.removeChild(tempTextArea);
              if(result)
              alert('Wszystkie testy zostały skopiowane do schowka.');
              else
                alert('Nie udało się skopiować testu ze schowka unlucky\nMusisz zezwolić na dostęp do schowka');   
          });


        data.forEach(obj => {
          const container = document.createElement('div');
          container.className = 'createdelement37';
          const datatestu = selectedValue.replace(/(^\d{4}-\d{2}-\d{2}) .*/, '$1');

          Object.entries(obj).forEach(([key, value]) => {
            if (key === "Nazwa testu") {
              const h1 = document.createElement('h1');
              h1.textContent = `${key}: ${value} ${datatestu}`;
              container.appendChild(h1);
         } else if (key === "questionHTML") {
              numerpytania = numerpytania + 1; // Update numerpytania without 'let'
              const p = document.createElement('p');
              p.innerHTML = `<h2>Pytanie ${numerpytania}:</h2> ${value}`;
              container.appendChild(p);
            } else  if (key === "answers") {
                
              const p = document.createElement('p');
              p.innerHTML = `<h2>Odpowiedzi:</h2>`;


              if (Array.isArray(value)) {
                const ul = document.createElement('ul');
                value.forEach(answer => {
                  const li = document.createElement('li');
                  li.textContent = answer;
                  ul.appendChild(li);
                });
                p.appendChild(ul);
              } else {
                const div = document.createElement('div');
                div.innerHTML = value;
                p.appendChild(div);
              }


              container.appendChild(p);
            } else {
                const p = document.createElement('p');
                p.innerHTML = `<strong>${value}</strong> ${value}`;
            }
          });


          logincard.appendChild(container);


          // Dodaj odstęp między poszczególnymi elementami
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




        } else {
          console.log('Proszę wybrać opcję.');
        }
      }
  }
}

start();
