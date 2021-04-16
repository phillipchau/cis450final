var config = require('./db-config.js');
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
}
