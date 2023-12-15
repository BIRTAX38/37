
            const copytoclipboard = document.createElement('button');
            copytoclipboard.innerText = 'Skopiuj do schowka';
            copytoclipboard.classList.add('button37');
            copytoclipboard.style.minWidth = '435px';
            copytoclipboard.style.height = '3.5%';
            copytoclipboard.style.position = 'absolute';
            logincard.appendChild(copytoclipboard);
            copytoclipboard.addEventListener('click', () => {
              navigator.clipboard.writeText(`Object.entries({"${selectedValue}":${JSON.stringify(localStorage.getItem(`${selectedValue}`))}}).forEach(([k,v])=>localStorage.setItem(k,v))`);
              alert("Skopiowano")
            });
