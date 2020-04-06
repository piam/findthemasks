const express = require('express');
require('dotenv').config();
const app = new express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/');
});

app.get('/config.js', (req, res) => {
  var envVariables = [
    'GOOGLE_MAPS_API_KEY'
  ];
  const envVarJSON = getEnvironmentVarJSON(envVariables);
  const windowVarScript = createWindowVarScript(envVarJSON);

  res.type('.js');
  res.send(windowVarScript);
});

const getEnvironmentVarJSON = variableArray => {
  let varJSON = {};
  variableArray.forEach(variable => {
    varJSON[variable] = process.env[variable];
  });
  return varJSON;
};

const createWindowVarScript = jsonData => {
  var windowScript = '';
  for (property in jsonData) {
    windowScript += `window.${property} = "${jsonData[property]}";\n`;
  }
  return windowScript;
};

app.listen(port, () => {
  console.log('Server listening on port ' + port);
});