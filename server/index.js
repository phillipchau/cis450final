const bodyParser = require('body-parser');
const express = require('express');
var routes = require("./routes.js");
const cors = require('cors');

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */

/* ---- (Landing Page) ---- */
// The route localhost:8081/vaccine is registered to the function
// routes.getAllPeople, specified in routes.js.
app.get('/vaccine', routes.getVaccineData);
app.get('/income/q1', routes.getIncomeDataQ1);
app.get('/income/q2', routes.getIncomeDataQ2);
app.get('/income/q3', routes.getIncomeDataQ3);
app.get('/income/q4', routes.getIncomeDataQ4);

app.get('/poverty/q1', routes.getPovertyQ1)
app.get('/poverty/q2', routes.getPovertyQ2)
app.get('/poverty/q3', routes.getPovertyQ3)
app.get('/poverty/q4', routes.getPovertyQ4)


app.get('/mask/q1', routes.getMaskQ1)
app.get('/mask/q2', routes.getMaskQ2)
app.get('/mask/q3', routes.getMaskQ3)
app.get('/mask/q4', routes.getMaskQ4)

app.get('/state/', routes.getState);
app.get('/statecoords/:state', routes.getStateCoords)
app.get('/states', routes.getDistinctStates);
app.get('/state-date-cases', routes.getCountPerStateDate);
app.get('/covidtotal', routes.getTotalCovid)
app.get('/covidtotalstate', routes.getTotalCovidState)
app.get('/state-date-count', routes.getCountPerStateDate);
app.get('/latest-covid-articles', routes.getLatestCovidArticles);
app.get('/recent-covid-vaccine-tweets', routes.getRecentCovidVaccineTweets);

app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});