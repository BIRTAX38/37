function fetchData() {
    let statusandchangelogurl = `https://raw.githubusercontent.com/BIRTAX38/37/main/37/addonsto37executejsiniframeios/37statusandchangelog.json`;
    fetch(statusandchangelogurl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        const changelogItems = json.changelog.map(item => `<li>${item}</li>`).join('');
        const textfromjson = `<hr><b>Status: ${json.status}</b><br /><br />Changelog:<br /><ul>${changelogItems}</ul><br />${json.text}<br /><br /><b>By: ${json.author}</b>`;
        
        const divaddedbyscript = document.createElement('div');
        divaddedbyscript.innerHTML = textfromjson;

        var hideelementsbutton = document.createElement("button");
        hideelementsbutton.className = "hideelementsbutton";
        hideelementsbutton.textContent = "Schowaj wszystkie elementy które dodał skrypt";
        hideelementsbutton.addEventListener('click', () => {
            divaddedbyscript.remove();
            hideelementsbutton.remove();
        });

        const parentDiv = document.getElementsByClassName('test-card-body')[0];
        parentDiv.appendChild(hideelementsbutton);
        parentDiv.appendChild(divaddedbyscript);
      })
      .catch(function(error) {
        console.log('Fetch Error:', error);
      });
}

fetchData();
