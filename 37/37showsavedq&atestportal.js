function utworzSelectZKluczamiLocalStorage() {
    const klucze = Object.keys(localStorage);
    const kluczeWzor = klucze.filter(klucz => /^\d{4}-\d{2}-\d{2}( \w+)?$/.test(klucz));
  
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
  
      const loginLogo = document.querySelector('.login-logo');
      loginLogo.innerHTML = ''; // Usuń całą zawartość
          const containerDiv = document.createElement('div'); // Stwórz nowy element div
          containerDiv.className = 'container'; // Dodaj klasę "container"
          loginLogo.appendChild(containerDiv); // Dodaj nowy div do diva login-logo
      if (containerDiv) {
        containerDiv.appendChild(select);
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
          let numerpytania = 0
  
          
  //        var css = '.login-card img { max-width: 100%; height: auto; }';
            var css = '.login-card img { max-width: -webkit-fill-available; height: auto; }';
            var style = document.createElement('style');
            style.appendChild(document.createTextNode(css));
            document.head.appendChild(style);

            const copytoclipboard = document.createElement('button');
            copytoclipboard.innerText = 'Skopiuj do schowka';
            copytoclipboard.classList.add('button37');
            copytoclipboard.style.minWidth = '-webkit-fill-available';
            logincard.appendChild(copytoclipboard);
            copytoclipboard.addEventListener('click', () => {
              //navigator.clipboard.writeText(`Object.entries({"${selectedValue}":${JSON.stringify(localStorage.getItem(`${selectedValue}`))}}).forEach(([k,v])=>localStorage.setItem(k,v))`);
                            const input = document.createElement('input');
              input.value = (`avascript:Object.entries({"${selectedValue}":${JSON.stringify(localStorage.getItem(`${selectedValue}`))}}).forEach(([k,v])=>localStorage.setItem(k,v))`);
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
        });
      } else {
        console.log('Nie znaleziono elementu o klasie .login-card.');
      }
    }
  }
  
  utworzSelectZKluczamiLocalStorage();
  
