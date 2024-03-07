function fetchData() {
    let statusandchangelogurl = `https://raw.githubusercontent.com/BIRTAX38/37/main/37/addonsto37executejsiniframeios/37statusandchangelog.json`;
    fetch(statusandchangelogurl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        const textfromjson = `<hr> <b>Status: ${json.status}</b> <br /> <br /> Changelog: ${json.changelog} <br /> <br /> ${json.text} <br /> <br /> <b>By: ${json.creator}</b>`;
        document.getElementsByClassName('test-card-body')[0].innerHTML += textfromjson;
      })
      .catch(function(error) {
        console.log('Fetch Error:', error);
      });
}

fetchData();