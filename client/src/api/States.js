import axios from 'axios';
import { axiosErrorHandler } from './Error';

// This will not work for deployed versions - only for connecting to local.
const basePath = 'http://localhost:8081';
const routes = {
  getVaccineData: `${basePath}/states`,
};

// Function temporarily unused in place of dummy variable.
const getStatesDummy = () => axios.get(routes.getStates)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
  });

const getStatesCasesMap = () => new Promise((resolve, reject) => {
  let casesMap = new Map();
  casesMap.set('Washington', [
    { 
      date: new Date(2021, 0, 1),
      cases: 15,
    },
    { 
      date: new Date(2021, 0, 2),
      cases: 20,
    },
    { 
      date: new Date(2021, 0, 3),
      cases: 30,
    },
  ]);
  casesMap.set('Oregon', [
    { 
      date: new Date(2021, 0, 1),
      cases: 10,
    },
    { 
      date: new Date(2021, 0, 2),
      cases: 5,
    },
    { 
      date: new Date(2021, 0, 3),
      cases: 20,
    },
  ]);
  casesMap.set('California', [
    { 
      date: new Date(2021, 0, 1),
      cases: 3,
    },
    { 
      date: new Date(2021, 0, 2),
      cases: 19,
    },
    { 
      date: new Date(2021, 0, 3),
      cases: 50,
    },
  ]);
  resolve(casesMap);
});

export default getStatesCasesMap;
