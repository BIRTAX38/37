const elements = document.querySelectorAll('.timer-tile-properties-container .mdc-property-value');
const testname = document.querySelector('.test-name').innerText;

if (elements.length > 0) {
  const lastElementContent = elements[elements.length - 1].textContent.trim();
  const yyyymmddandtestname = `${lastElementContent} ${testname}`

  if (localStorage.getItem(yyyymmddandtestname)) {
    console.log(`Klucz ${yyyymmddandtestname} istnieje w local storage.`);

    
    

    const dataFromLocalStorage = localStorage.getItem(yyyymmddandtestname);


    if (dataFromLocalStorage) {
      let data = JSON.parse(dataFromLocalStorage);


      if (Array.isArray(data)) {
        const questionsListTopBar = document.querySelector('.hidden-info');
        questionsListTopBar.innerHTML = '';
        questionsListTopBar.style.display = 'block';
        questionsListTopBar.style.fontFamily = '"Aktiv Grotesk", sans-serif';
        let numerpytania = 0
        
//        var css = '.hidden-info img { max-width: 100%; height: auto; }';
        var css = '.hidden-info img { max-width: -webkit-fill-available; height: auto; }';
        var style = document.createElement('style');
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);


        const copytoclipboard = document.createElement('button');
        copytoclipboard.innerText = 'Skopiuj test do schowka';
        copytoclipboard.classList.add('button37');
        copytoclipboard.style.minWidth = '100%';
        questionsListTopBar.appendChild(copytoclipboard);
        copytoclipboard.addEventListener('click', () => {
                        const tempTextArea = document.createElement('textarea');
          //tempTextArea.value = (`{"${lastElementContent} ${testname}":${JSON.stringify(localStorage.getItem(`${lastElementContent} ${testname}`))}}`);
          tempTextArea.value = (`{"${yyyymmddandtestname}":${JSON.stringify(localStorage.getItem(`${yyyymmddandtestname}`))}}`);;
          document.body.appendChild(tempTextArea);
          tempTextArea.focus();
          tempTextArea.select();
          var result = document.execCommand('copy');
          document.body.removeChild(tempTextArea);
          if(result)
          alert("Test został skopiowany do schowka.")
          else
            prompt('Nie udało się skopiować polecenia do schowka. Ręcznie skopiuj poniższe polecenie\n\n', tempTextArea.value);   
        });


        data.forEach(obj => {
          const container = document.createElement('div');


          Object.entries(obj).forEach(([key, value]) => {
            if (key === "Nazwa testu") {
              const h1 = document.createElement('h1');
              h1.textContent = `${key}: ${value}`;
              container.appendChild(h1);
            } else if (key === "questionHTML") {
              numerpytania = numerpytania + 1;
              const p = document.createElement('p');
              p.innerHTML = `<h3>Pytanie ${numerpytania}:</h3> ${value}`;
              container.appendChild(p);
            } else if (key === "answers") {
              const answerType = obj["answerType"];
              const p = document.createElement('p');
              p.innerHTML = `<h3>Odpowiedzi: ${answerType}</h3>`;

              if (!value || value.length === 0) {
                value = "<h4>(Pytanie otwarte)<h4>";
            }

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

          questionsListTopBar.appendChild(container);

          const spacer = document.createElement('hr');
          questionsListTopBar.appendChild(spacer);
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
  console.log('Nie znaleziono żadnych elementów z tą klasą.');
}
