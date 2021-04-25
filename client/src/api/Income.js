import axios from 'axios';
import { axiosErrorHandler } from './Error';

// This will not work for deployed versions - only for connecting to local.
const basePath = 'http://localhost:8081';
const routes = {
};

export const getIncomeDataQ1 = (state, startdate) => axios.get(`${basePath}/income/q1?state=${state}&startdate=${startdate}`)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
  });

export const getIncomeDataQ2= (state, startdate) => axios.get(`${basePath}/income/q2?state=${state}&startdate=${startdate}`)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
  });

export const getIncomeDataQ3 = (state, startdate) => axios.get(`${basePath}/income/q3?state=${state}&startdate=${startdate}`)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
  });

export const getIncomeDataQ4 = (state, startdate) => axios.get(`${basePath}/income/q4?state=${state}&startdate=${startdate}`)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
  });
