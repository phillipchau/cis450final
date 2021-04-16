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
//queries below retrieve quartile distribution of cases based on income
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

function getPovertyQ1(req, res) {
  var query = `
  WITH covidByCounty AS (
    SELECT State, County, CaseCount AS Cases, DeathCount AS Deaths
    FROM covid c 
    WHERE Date = '2021-04-01'
), covidRateByCounty AS (
    SELECT cov.State, cov.County, cov.Cases/cen.TotalPop AS CasesRate, cov.Deaths/cen.TotalPop AS DeathsRate
    FROM covidByCounty cov JOIN census cen ON cov.State = cen.State AND cov.County = cen.County
), povertyByCounty AS (
    SELECT i.State, i.County, AVG(i.Lat) AS LatCounty, AVG(i.Lon) AS LonCounty, AVG(c.Poverty) AS PovCounty
    FROM income i JOIN census c ON i.State = c.State AND i.County = c.County
    GROUP BY State, County
), povertyByCountyQuartile AS (
    SELECT *
    FROM povertyByCounty
    ORDER BY PovCounty ASC
    LIMIT 413
)
SELECT pov.State, pov.County, pov.LatCounty AS Lat, pov.LonCounty as Lon, pov.PovCounty, CasesRate, DeathsRate
FROM povertyByCountyQuartile pov JOIN covidRateByCounty cov
ON pov.State = cov.State AND pov.County = cov.County;
  `

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err)
    else {
      res.json(rows)
    }
  })
}

function getPovertyQ2(req, res) {
  var query = `
  WITH covidByCounty AS (
    SELECT State, County, CaseCount AS Cases, DeathCount AS Deaths
    FROM covid c 
    WHERE Date = '2021-04-01'
), covidRateByCounty AS (
    SELECT cov.State, cov.County, cov.Cases/cen.TotalPop AS CasesRate, cov.Deaths/cen.TotalPop AS DeathsRate
    FROM covidByCounty cov JOIN census cen ON cov.State = cen.State AND cov.County = cen.County
), povertyByCounty AS (
    SELECT i.State, i.County, AVG(i.Lat) AS LatCounty, AVG(i.Lon) AS LonCounty, AVG(c.Poverty) AS PovCounty
    FROM income i JOIN census c ON i.State = c.State AND i.County = c.County
    GROUP BY State, County
), povertyByCountyQuartile AS (
    SELECT *
    FROM povertyByCounty
    ORDER BY PovCounty ASC
    LIMIT 413
    OFFSET 413
)
SELECT pov.State, pov.County, pov.LatCounty AS Lat, pov.LonCounty as Lon, pov.PovCounty, CasesRate, DeathsRate
FROM povertyByCountyQuartile pov JOIN covidRateByCounty cov
ON pov.State = cov.State AND pov.County = cov.County;
  `

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err)
    else {
      res.json(rows)
    }
  })
}

function getPovertyQ3(req, res) {
  var query = `
  WITH covidByCounty AS (
    SELECT State, County, CaseCount AS Cases, DeathCount AS Deaths
    FROM covid c 
    WHERE Date = '2021-04-01'
), covidRateByCounty AS (
    SELECT cov.State, cov.County, cov.Cases/cen.TotalPop AS CasesRate, cov.Deaths/cen.TotalPop AS DeathsRate
    FROM covidByCounty cov JOIN census cen ON cov.State = cen.State AND cov.County = cen.County
), povertyByCounty AS (
    SELECT i.State, i.County, AVG(i.Lat) AS LatCounty, AVG(i.Lon) AS LonCounty, AVG(c.Poverty) AS PovCounty
    FROM income i JOIN census c ON i.State = c.State AND i.County = c.County
    GROUP BY State, County
), povertyByCountyQuartile AS (
    SELECT *
    FROM povertyByCounty
    ORDER BY PovCounty ASC
    LIMIT 413
    OFFSET 816
)
SELECT pov.State, pov.County, pov.LatCounty AS Lat, pov.LonCounty as Lon, pov.PovCounty, CasesRate, DeathsRate
FROM povertyByCountyQuartile pov JOIN covidRateByCounty cov
ON pov.State = cov.State AND pov.County = cov.County;
  `

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err)
    else {
      res.json(rows)
    }
  })
}

function getPovertyQ4(req, res) {
  var query = `
  WITH covidByCounty AS (
    SELECT State, County, CaseCount AS Cases, DeathCount AS Deaths
    FROM covid c 
    WHERE Date = '2021-04-01'
), covidRateByCounty AS (
    SELECT cov.State, cov.County, cov.Cases/cen.TotalPop AS CasesRate, cov.Deaths/cen.TotalPop AS DeathsRate
    FROM covidByCounty cov JOIN census cen ON cov.State = cen.State AND cov.County = cen.County
), povertyByCounty AS (
    SELECT i.State, i.County, AVG(i.Lat) AS LatCounty, AVG(i.Lon) AS LonCounty, AVG(c.Poverty) AS PovCounty
    FROM income i JOIN census c ON i.State = c.State AND i.County = c.County
    GROUP BY State, County
), povertyByCountyQuartile AS (
    SELECT *
    FROM povertyByCounty
    ORDER BY PovCounty ASC
    LIMIT 413
    OFFSET 1229
)
SELECT pov.State, pov.County, pov.LatCounty AS Lat, pov.LonCounty as Lon, pov.PovCounty, CasesRate, DeathsRate
FROM povertyByCountyQuartile pov JOIN covidRateByCounty cov
ON pov.State = cov.State AND pov.County = cov.County;
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

//gets the coordinates of each given state
function getStateCoords(req, res) {
  var state = req.params.state
  console.log(state)

  var query = 
  `SELECT State, AVG(Lat) as Lat, AVG(Lon) as Lon
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
  let type = 'CaseCount';
  var query = `
    SELECT Date, State, SUM(${type}) AS Cases
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

//gets the aggregation for all days
function getTotalCovid(req, res) {
  var query = `
  SELECT State, County, SUM(CaseCount) AS sum_cases, SUM(DeathCount) AS sum_deaths
  FROM covid
  GROUP BY State, County;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows)
    }
  })
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
  getStateCoords: getStateCoords,
  getPovertyQ1: getPovertyQ1,
  getPovertyQ2: getPovertyQ2,
  getPovertyQ3: getPovertyQ3,
  getPovertyQ4: getPovertyQ4,
  getTotalCovid: getTotalCovid
}
