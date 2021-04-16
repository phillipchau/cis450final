import axios from 'axios';
import { axiosErrorHandler } from './Error';

// This will not work for deployed versions - only for connecting to local.
const basePath = 'http://localhost:8081';
const routes = {
  States: `${basePath}/state`,
  Filters:`${basePath}/filters`,
  PovertyQ1: `${basePath}/poverty/q1`,
  PovertyQ2: `${basePath}/poverty/q2`,
  PovertyQ3: `${basePath}/poverty/q3`,
  PovertyQ4: `${basePath}/poverty/q4`,
  totalCovid: `${basePath}/covidtotal`
};

export const getStates = () => axios.get(routes.States)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
  });

export const getStateCoords = (state) => axios.get(`${basePath}/statecoords/${state}`)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
});

export const getPovertyQ1 = () => axios.get(routes.PovertyQ1)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
})

export const getPovertyQ2 = () => axios.get(routes.PovertyQ2)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
})

export const getPovertyQ3 = () => axios.get(routes.PovertyQ3)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
})

export const getPovertyQ4 = () => axios.get(routes.PovertyQ4)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
})

export const getTotalCovid = () => axios.get(routes.totalCovid)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
})