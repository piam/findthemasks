const express = require('express');
require('dotenv').config();
const app = new express();
const router = express.Router();
const port = process.env.PORT || 3000;

app.set('strict routing', true);

app.use( (req, res, next) => {
  res.set('Cache-Control', 'public, max-age=300');
  next();
});

app.use(express.static('public'));
router.use(express.static('public'));

router.get('/', (req, res) => {
  res.sendFile(__dirname + '/');
});

router.get('/:countryCode/donation-form', (req, res) => {
  res.redirect(`/${req.params.countryCode}/donation-form-bounce.html?locale=${req.query.locale}`);
});

app.get('/config.js', (req, res) => {
  const envVariables = [
    'GOOGLE_MAPS_API_KEY'
  ];
  const envVarJSON = getEnvironmentVarJSON(envVariables);
  const windowVarScript = createWindowVarScript(envVarJSON);
  res.type('.js');
  res.send(windowVarScript);
});

app.use('/', router);
app.use('/:countryCode', router);

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