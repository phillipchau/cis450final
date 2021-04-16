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
app.get('/states', routes.getDistinctStates);
app.get('/state-date-count', routes.getCountPerStateDate);

app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});