var config = require('./db-config.json');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */

/* ---- (Landing Page) ---- */
function getVaccineData(req, res) {
  var query = `
    SELECT *
    FROM vaccine
    WHERE State = 'Washington';
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

/*Map page*/ 
function getIncomeQ1(req, res) {
  var query = `
  WITH covidByCounty AS (
    SELECT State, County, CaseCount AS Cases, DeathCount AS Deaths
    FROM covid c 
    WHERE Date = '2021-04-01'
), covidRateByCounty AS (
    SELECT cov.State, cov.County, cov.Cases/cen.TotalPop AS CasesRate, cov.Deaths/cen.TotalPop AS DeathsRate
    FROM covidByCounty cov JOIN census cen ON cov.State = cen.State AND cov.County = cen.County
), incomeByCounty AS (
    SELECT State, County, AVG(Lat) AS LatCounty, AVG(Lon) AS LonCounty, AVG(Mean) AS Income
    FROM income
    GROUP BY State, County
), incomeByCountyQuartile AS (
    SELECT *
    FROM incomeByCounty
    ORDER BY Income ASC
    LIMIT 413
)
SELECT inc.State, inc.County, inc.LatCounty AS Lat, inc.LonCounty AS Lon, inc.Income, CasesRate, DeathsRate
FROM incomeByCountyQuartile inc JOIN covidRateByCounty cov
ON inc.State = cov.State AND inc.County = cov.County
`

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err)
    else {
      res.json(rows)
    }
  })
}

function getIncomeQ2(req, res) {
  var query = `
  WITH covidByCounty AS (
    SELECT State, County, CaseCount AS Cases, DeathCount AS Deaths
    FROM covid c 
    WHERE Date = '2021-04-01'
), covidRateByCounty AS (
    SELECT cov.State, cov.County, cov.Cases/cen.TotalPop AS CasesRate, cov.Deaths/cen.TotalPop AS DeathsRate
    FROM covidByCounty cov JOIN census cen ON cov.State = cen.State AND cov.County = cen.County
), incomeByCounty AS (
    SELECT State, County, AVG(Lat) AS LatCounty, AVG(Lon) AS LonCounty, AVG(Mean) AS Income
    FROM income
    GROUP BY State, County
), incomeByCountyQuartile AS (
    SELECT *
    FROM incomeByCounty
    ORDER BY Income ASC
    LIMIT 413
    OFFSET 413
)
SELECT inc.State, inc.County, inc.LatCounty AS Lat, inc.LonCounty AS Lon, inc.Income, CasesRate, DeathsRate
FROM incomeByCountyQuartile inc JOIN covidRateByCounty cov
ON inc.State = cov.State AND inc.County = cov.County
`

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err)
    else {
      res.json(rows)
    }
  })
}

function getIncomeQ3(req, res) {
  var query = `
  WITH covidByCounty AS (
    SELECT State, County, CaseCount AS Cases, DeathCount AS Deaths
    FROM covid c 
    WHERE Date = '2021-04-01'
), covidRateByCounty AS (
    SELECT cov.State, cov.County, cov.Cases/cen.TotalPop AS CasesRate, cov.Deaths/cen.TotalPop AS DeathsRate
    FROM covidByCounty cov JOIN census cen ON cov.State = cen.State AND cov.County = cen.County
), incomeByCounty AS (
    SELECT State, County, AVG(Lat) AS LatCounty, AVG(Lon) AS LonCounty, AVG(Mean) AS Income
    FROM income
    GROUP BY State, County
), incomeByCountyQuartile AS (
    SELECT *
    FROM incomeByCounty
    ORDER BY Income ASC
    LIMIT 413
    OFFSET 816
)
SELECT inc.State, inc.County, inc.LatCounty AS Lat, inc.LonCounty AS Lon, inc.Income, CasesRate, DeathsRate
FROM incomeByCountyQuartile inc JOIN covidRateByCounty cov
ON inc.State = cov.State AND inc.County = cov.County
`

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err)
    else {
      res.json(rows)
    }
  })
}

function getIncomeQ4(req, res) {
  var query = `
  WITH covidByCounty AS (
    SELECT State, County, CaseCount AS Cases, DeathCount AS Deaths
    FROM covid c 
    WHERE Date = '2021-04-01'
), covidRateByCounty AS (
    SELECT cov.State, cov.County, cov.Cases/cen.TotalPop AS CasesRate, cov.Deaths/cen.TotalPop AS DeathsRate
    FROM covidByCounty cov JOIN census cen ON cov.State = cen.State AND cov.County = cen.County
), incomeByCounty AS (
    SELECT State, County, AVG(Lat) AS LatCounty, AVG(Lon) AS LonCounty, AVG(Mean) AS Income
    FROM income
    GROUP BY State, County
), incomeByCountyQuartile AS (
    SELECT *
    FROM incomeByCounty
    ORDER BY Income ASC
    LIMIT 413
    OFFSET 1229
)
SELECT inc.State, inc.County, inc.LatCounty AS Lat, inc.LonCounty AS Lon, inc.Income, CasesRate, DeathsRate
FROM incomeByCountyQuartile inc JOIN covidRateByCounty cov
ON inc.State = cov.State AND inc.County = cov.County
`

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err)
    else {
      res.json(rows)
    }
  })
}

function getState(req, res) {
  var query = `SELECT DISTINCT State FROM census;`

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err)
    else {
      res.json(rows)
    }
  })
}

function getStateCoords(req, res) {
  var state = req.params.state
  console.log(state)

  var query = 
  `SELECT State, AVG(Lat), AVG(Lon)
   FROM income
   WHERE State = '${state}'
   GROUP BY State;`

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err)
    else {
      res.json(rows)
    }
  })
}

// Get the number of cases for each state for every date.
function getDistinctStates(req, res) {
  var query = `
    SELECT DISTINCT State
    FROM covid;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

// Get the number of cases for each state for every date.
function getCountPerStateDate(req, res) {

  // Hard-code valid values to prevent SQL injection.
  if (req.query.typeCount !== 'CaseCount' && req.query.typeCount !== 'DeathCount') {
    console.log('The request must specify a valid typeCount. Default to CaseCount.');
    req.params.typeCount = 'CaseCount';
  }

  var query = `
    SELECT Date, State, SUM(${req.query.typeCount}) AS Count
    FROM covid
    GROUP BY Date, State
    ORDER BY Date ASC, State ASC;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

// The exported functions, which can be accessed in index.js.
module.exports = {
  getVaccineData: getVaccineData,
  getDistinctStates: getDistinctStates,
  getCountPerStateDate: getCountPerStateDate,
  getIncomeDataQ1: getIncomeQ1,
  getIncomeDataQ2: getIncomeQ2,
  getIncomeDataQ3: getIncomeQ3,
  getIncomeDataQ4: getIncomeQ4,
  getState: getState,
  getStateCoords: getStateCoords
}
