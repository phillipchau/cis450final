import axios from 'axios';
import { axiosErrorHandler } from './Error';

// This will not work for deployed versions - only for connecting to local.
const basePath = 'http://localhost:8081';
const routes = {
  IncomeDataQ1: `${basePath}/income/q1`,
  IncomeDataQ2: `${basePath}/income/q2`,
  IncomeDataQ3: `${basePath}/income/q3`,
  IncomeDataQ4: `${basePath}/income/q4`
};

export const getIncomeDataQ1 = () => axios.get(routes.IncomeDataQ1)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
  });

export const getIncomeDataQ2= () => axios.get(routes.IncomeDataQ2)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
  });

export const getIncomeDataQ3 = () => axios.get(routes.IncomeDataQ3)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
  });

export const getIncomeDataQ4 = () => axios.get(routes.IncomeDataQ4)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
  });
