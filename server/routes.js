var config = require('./db-config.json');
var mysql = require('mysql');
var axios = require('axios');

config.connectionLimit = 10;
var connection = mysql.createPool(config);
require('dotenv').config();

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */

/* ---- (Landing Page) ---- */
function getVaccineData(req, res) {
  var query = `
  SELECT v.State, v.Vaccinated / t.SumTotalPop
  FROM (SELECT State, SUM(Vaccinated) AS Vaccinated FROM vaccine GROUP BY State) v JOIN (SELECT State, SUM(TotalPop) AS SumTotalPop
  FROM census 
  GROUP BY State) t 
  ON v.State = t.State; 
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
  var condition = ''
  if (req.query.state !== 'none') {
    condition = `WHERE inc.State = '${req.query.state}'`
  }
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
${condition}
`

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err)
    else {
      res.json(rows)
    }
  })
}

function getIncomeQ2(req, res) {
  var condition = ''
  if (req.query.state !== 'none') {
    condition = `WHERE inc.State = '${req.query.state}'`
  }
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
${condition}
`

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err)
    else {
      res.json(rows)
    }
  })
}

function getIncomeQ3(req, res) {
  var condition = ''
  if (req.query.state !== 'none') {
    condition = `WHERE inc.State = '${req.query.state}'`
  }
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
${condition}
`

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err)
    else {
      res.json(rows)
    }
  })
}

function getIncomeQ4(req, res) {
  var condition = ''
  if (req.query.state !== 'none') {
    condition = `WHERE inc.State = '${req.query.state}'`
  }
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
${condition}
`

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err)
    else {
      res.json(rows)
    }
  })
}

function getPovertyQ1(req, res) {
  var condition = ''
  if (req.query.state !== 'none') {
    condition = `WHERE pov.State = '${req.query.state}'`
  }
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
ON pov.State = cov.State AND pov.County = cov.County
${condition};
  `

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err)
    else {
      res.json(rows)
    }
  })
}

function getPovertyQ2(req, res) {
  var condition = ''
  if (req.query.state !== 'none') {
    condition = `WHERE pov.State = '${req.query.state}'`
  }
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
ON pov.State = cov.State AND pov.County = cov.County
${condition};
  `

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err)
    else {
      res.json(rows)
    }
  })
}

function getPovertyQ3(req, res) {
  var condition = ''
  if (req.query.state !== 'none') {
    condition = `WHERE pov.State = '${req.query.state}'`
  }
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
ON pov.State = cov.State AND pov.County = cov.County
${condition};
  `

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err)
    else {
      res.json(rows)
    }
  })
}

function getPovertyQ4(req, res) {
  var condition = ''
  if (req.query.state !== 'none') {
    condition = `WHERE pov.State = '${req.query.state}'`
  }
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
ON pov.State = cov.State AND pov.County = cov.County
${condition};
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

  // Hard-code valid values to prevent SQL injection.
  if (req.query.typeCount !== 'CaseCount' && req.query.typeCount !== 'DeathCount') {
    console.log('The request must specify a valid typeCount. Default to CaseCount.');
    req.params.typeCount = 'CaseCount';
  }

  var query = `
    SELECT Date, State, SUM(${req.query.typeCount}) AS Count
    FROM covid
    WHERE State IN (${req.query.selectedStatesStr})
    GROUP BY Date, State
    HAVING Date >= '${req.query.startDate}' AND Date <= '${req.query.endDate}'
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


function getLatestCovidArticles(req, res) {
  axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=covid&sort=newest&api-key=${process.env.NYT_API_KEY}`)
  .then((articles) => res.json(articles.data.response))
  .catch((err) => {
    console.log(err);
  });
}

//gets the aggregation for all days of the total covid cases by county
function getTotalCovidState(req, res) {
  var query = `
  WITH covidState AS (
    SELECT State, County, AVG(Lat) AS Lat, AVG(Lon) AS Lon
    FROM income
    GROUP BY State, County
  ),
  casesState AS (
    SELECT State, County, SUM(CaseCount) AS sum_cases, SUM(DeathCount) AS sum_deaths
    FROM covid
    GROUP BY State, County
  )
  SELECT cov.State, cov.County, inc.Lat AS Lat, inc.Lon as Lon, sum_cases, sum_deaths
  FROM covidState inc JOIN casesState cov
  ON cov.State = inc.State AND cov.County = inc.County;`

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows)
    }
  })
}

// Get the recent COVID Vaccine tweets.
function getRecentCovidVaccineTweets(req, res) {
  var config = {
    params: {
      query: 'COVID Vaccine',
      'tweet.fields': 'lang',
    },
    headers: {
      'User-Agent': 'v2RecentSearchJS',
      'authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
    },
  };

  axios.get('https://api.twitter.com/2/tweets/search/recent', config)
  .then((data) => {
    console.log(data.data.data);
    res.json(data.data.data);
  })
  .catch((err) => {
    console.log(err);
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
  getStateCoords: getStateCoords,
  getPovertyQ1: getPovertyQ1,
  getPovertyQ2: getPovertyQ2,
  getPovertyQ3: getPovertyQ3,
  getPovertyQ4: getPovertyQ4,
  getTotalCovid: getTotalCovid,
  getLatestCovidArticles: getLatestCovidArticles,
  getTotalCovidState: getTotalCovidState,
  getRecentCovidVaccineTweets: getRecentCovidVaccineTweets,
}
