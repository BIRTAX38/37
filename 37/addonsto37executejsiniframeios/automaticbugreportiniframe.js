let useragent = window.navigator.userAgent

logToServer = function(x) {
datadolog = {
  "content": null,
  "embeds": [
    {
      "title": "Użyto skryptu 7357P0R74L iframe",
      "color": 65459,
      "fields": [
        {
          "name": "Full useragent:",
          "value": '```' + useragent + '```'
        },
        {
          "name": "Test name:",
          "value": '```' + testname + '```'
        },
        {
          "name": "Bug:",
          "value": x
        }
      ]
    }
  ],
  "attachments": []
};
  
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://ptb.discord.com/api/webhooks/1161454228791894096/I1vtRnliL_H_iISQbT8tXJaYw5R-BG0P0kB8qx8T64pYh_j0pJ0jktKsyTM-KBQuzW9y", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(datadolog));
}
