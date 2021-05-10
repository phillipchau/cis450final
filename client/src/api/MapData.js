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

export const getPovertyQ1 = (state, startdate) => axios.get(`${basePath}/poverty/q1?state=${state}&startdate=${startdate}`)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
})

export const getPovertyQ2 = (state, startdate) => axios.get(`${basePath}/poverty/q2?state=${state}&startdate=${startdate}`)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
})

export const getPovertyQ3 = (state, startdate) => axios.get(`${basePath}/poverty/q3?state=${state}&startdate=${startdate}`)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
})

export const getPovertyQ4 = (state, startdate) => axios.get(`${basePath}/poverty/q4?state=${state}&startdate=${startdate}`)
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

export const getMaskQ1 = (state, startdate) => axios.get(`${basePath}/mask/q1?state=${state}&startdate=${startdate}`)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
})

export const getMaskQ2 = (state, startdate) => axios.get(`${basePath}/mask/q2?state=${state}&startdate=${startdate}`)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
})

export const getMaskQ3 = (state, startdate) => axios.get(`${basePath}/mask/q3?state=${state}&startdate=${startdate}`)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
})

export const getMaskQ4 = (state, startdate) => axios.get(`${basePath}/mask/q4?state=${state}&startdate=${startdate}`)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
})

export const getBoundQ1 = (type) => axios.get(`${basePath}/${type}bound?offset=0`)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
})

export const getBoundQ2 = (type) => axios.get(`${basePath}/${type}bound?offset=413`)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
})

export const getBoundQ3 = (type) => axios.get(`${basePath}/${type}bound?offset=826`)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
})

export const getBoundQ4 = (type) => axios.get(`${basePath}/${type}bound?offset=1239`)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
})
