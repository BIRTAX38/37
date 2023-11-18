function utworzSelectZKluczamiLocalStorage() {
  const klucze = Object.keys(localStorage);
  const kluczeWzor = klucze.filter(klucz => /^\d{4}-\d{2}-\d{2}$/.test(klucz));

  if (kluczeWzor.length === 0) {
    console.log('Brak kluczy o formacie ****-**-** w localStorage.');
  } else {
    console.log('Klucze o formacie ****-**-** w localStorage:');

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

    const loginCard = document.querySelector('.login-footer');
    if (loginCard) {
      loginCard.appendChild(select);
      const selectElement = document.getElementById('37localstorageselectvalue');

      selectElement.addEventListener('change', function() {
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

        
//        var css = '.login-card img { max-width: 100%; height: auto; }';
        var css = '.login-card img { max-width: fit-content; height: auto; }';
        var style = document.createElement('style');
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);



        data.forEach(obj => {
          const container = document.createElement('div');


          Object.entries(obj).forEach(([key, value]) => {
            if (key === "Nazwa testu") {
              const h1 = document.createElement('h1');
              h1.textContent = `${key}: ${value} ${selectedValue}`;
              container.appendChild(h1);
            } else if (key === "questionHTML") {
              const p = document.createElement('p');
              p.innerHTML = `<h2>Pytanie:</h2> ${value}`;
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
      });
    } else {
      console.log('Nie znaleziono elementu o klasie .login-card.');
    }
  }
}

utworzSelectZKluczamiLocalStorage();
