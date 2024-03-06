
  let statusandchangelogurl = `https://raw.githubusercontent.com/BIRTAX38/37/main/addonsto37executejsiniframe/37statusandchangelog.json`;
  var myDate = new Date();
  const godzinadopopup = myDate.toLocaleTimeString();
  await fetch(statusandchangelogurl).then((response) =>
                        response.json().then((json) => {

const textfromjson = `<hr> <b>Status: ${json.status}</b> <br /> Changelog: ${json.changelog} <br /> <br /> <b>${json.text}</b> <br /> <br /> <b>By: ${json.creator}</b>
`;
document.getElementsByClassName('test-card-body')[0].innerHTML += textfromjson
  })
                      );
