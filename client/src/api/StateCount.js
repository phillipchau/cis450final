import axios from 'axios';
import { axiosErrorHandler } from './Error';

// This will not work for deployed versions - only for connecting to local.
const basePath = 'http://localhost:8081';
const routes = {
  getDistinctStates: `${basePath}/states`,
  getCountPerStateDate: `${basePath}/state-date-count`,
};

export const TypeCount = Object.freeze({ CASES: 'CaseCount', DEATHS: 'DeathCount' });

// Function used to get the number of cases or deaths per state for every date.
export const getDistinctStates = () => axios.get(routes.getDistinctStates)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
  });

// Function used to get the number of cases or deaths per state for every date.
export const getCountPerStateDate = (params) => axios.get(routes.getCountPerStateDate, params)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
  });
