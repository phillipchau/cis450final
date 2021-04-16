import axios from 'axios';
import { axiosErrorHandler } from './Error';

// This will not work for deployed versions - only for connecting to local.
const basePath = 'http://localhost:8081';
const routes = {
  getDistinctStates: `${basePath}/states`,
  getCountPerStateDate: `${basePath}/state-date-cases`,
};

// Function used to get the number of cases or deaths per state for every date.
export const getDistinctStates = () => axios.get(routes.getDistinctStates)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
  });

// Function used to get the number of cases or deaths per state for every date.
export const getCountPerStateDate = () => axios.get(routes.getCountPerStateDate)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
  });
