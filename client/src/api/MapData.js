import axios from 'axios';
import { axiosErrorHandler } from './Error';

// This will not work for deployed versions - only for connecting to local.
const basePath = 'http://localhost:8081';
const routes = {
  States: `${basePath}/state`,
  Filters:`${basePath}/filters`,
  totalCovid: `${basePath}/covidtotal`,
  totalCovidState: `${basePath}/covidtotalstate`
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

export const getPovertyQ1 = (state) => axios.get(`${basePath}/poverty/q1?state=${state}`)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
})

export const getPovertyQ2 = (state) => axios.get(`${basePath}/poverty/q2?state=${state}`)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
})

export const getPovertyQ3 = (state) => axios.get(`${basePath}/poverty/q3?state=${state}`)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
})

export const getPovertyQ4 = (state) => axios.get(`${basePath}/poverty/q4?state=${state}`)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
})

export const getTotalCovid = () => axios.get(routes.totalCovid)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
})

export const getTotalCovidState = () => axios.get(routes.totalCovidState)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
})