const elements = document.querySelectorAll('.timer-tile-properties-container .mdc-property-value');
const testname = document.querySelector('.test-name').innerText;

if (elements.length > 0) {
  const lastElementContent = elements[elements.length - 1].textContent.trim();


  if (localStorage.getItem(`${lastElementContent} ${testname}`)) {
    console.log('Klucz istnieje w local storage.');


    const dataFromLocalStorage = localStorage.getItem(`${lastElementContent} ${testname}`);


    if (dataFromLocalStorage) {
      let data = JSON.parse(dataFromLocalStorage);


      if (Array.isArray(data)) {
        const questionsListTopBar = document.querySelector('.hidden-info');
        questionsListTopBar.innerHTML = ''; // Wyczyść zawartość elementu
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
          //navigator.clipboard.writeText(`Object.entries({"${selectedValue}":${JSON.stringify(localStorage.getItem(`${selectedValue}`))}}).forEach(([k,v])=>localStorage.setItem(k,v))`);
                        const input = document.createElement('input');
          input.value = (`avascript:Object.entries({"${lastElementContent} ${testname}":${JSON.stringify(localStorage.getItem(`${lastElementContent} ${testname}`))}}).forEach(([k,v])=>localStorage.setItem(k,v))`);
          document.body.appendChild(input);
          input.focus();
          input.select();
          var result = document.execCommand('copy');
          document.body.removeChild(input);
          if(result)
          alert("Skopiowano polecenie do schowka. Pamiętaj żeby wpisać literkę j przed wklejeniem polecenia")
          else
            prompt('Nie udało się skopiować polecenia do schowka. Ręcznie skopiuj poniższe polecenie\n\n', input.value);   
        });


        data.forEach(obj => {
          const container = document.createElement('div');


          Object.entries(obj).forEach(([key, value]) => {
            if (key === "Nazwa testu") {
              const h1 = document.createElement('h1');
              h1.textContent = `${key}: ${value}`;
              container.appendChild(h1);
            } else if (key === "questionHTML") {
              numerpytania = numerpytania + 1; // Update numerpytania without 'let'
              const p = document.createElement('p');
              p.innerHTML = `<h2>Pytanie ${numerpytania}:</h2> ${value}`;
              container.appendChild(p);
            } else  if (key === "answers") {
                
              const p = document.createElement('p');
              p.innerHTML = `<strong>Odpowiedzi:</strong>`;


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


          // Dodaj odstęp między poszczególnymi elementami
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

