import axios from 'axios';
import { axiosErrorHandler } from './Error';

// This will not work for deployed versions - only for connecting to local.
const basePath = 'http://localhost:8081';
const routes = {
};

export const getIncomeDataQ1 = (state) => axios.get(`${basePath}/income/q1?state=${state}`)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
  });

export const getIncomeDataQ2= (state) => axios.get(`${basePath}/income/q2?state=${state}`)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
  });

export const getIncomeDataQ3 = (state) => axios.get(`${basePath}/income/q3?state=${state}`)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
  });

export const getIncomeDataQ4 = (state) => axios.get(`${basePath}/income/q4?state=${state}`)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
  });
