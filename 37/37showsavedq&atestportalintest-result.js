const elements = document.querySelectorAll('.timer-tile-properties-container .mdc-property-value');


if (elements.length > 0) {
  const lastElementContent = elements[elements.length - 1].textContent.trim();


  if (localStorage.getItem(lastElementContent)) {
    console.log('Klucz istnieje w local storage.');


    const dataFromLocalStorage = localStorage.getItem(lastElementContent);


    if (dataFromLocalStorage) {
      let data = JSON.parse(dataFromLocalStorage);


      if (Array.isArray(data)) {
        const questionsListTopBar = document.querySelector('.questions-list-top-bar');
        questionsListTopBar.innerHTML = ''; // Wyczyść zawartość elementu
        questionsListTopBar.style.display = 'block';
        questionsListTopBar.style.fontFamily = '"Aktiv Grotesk", sans-serif';
        let numerpytania = 0
        
//        var css = '.questions-list-top-bar img { max-width: 100%; height: auto; }';
        var css = '.questions-list-top-bar img { max-width: -webkit-fill-available; height: auto; }';
        var style = document.createElement('style');
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);



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

