import axios from 'axios';
import { axiosErrorHandler } from './Error';

// This will not work for deployed versions - only for connecting to local.
const basePath = 'http://localhost:8081';
const routes = {
  getVaccineData: `${basePath}/vaccine`,
  getVaccinatedCaseCounts: `${basePath}/vaccinated-case-count`,
  getOverallVaccineData: `${basePath}/overall-vaccinations`,
  getRecentCovidVaccineTweets: `${basePath}/recent-covid-vaccine-tweets`,
};

export const getVaccineData = () => axios.get(routes.getVaccineData)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
  });

export const getVaccinatedCaseCounts = (params) => axios.get(routes.getVaccinatedCaseCounts, { params: params })
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
  });

export const getOverallVaccineData = (params) => axios.get(routes.getOverallVaccineData, { params: params })
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
  });

export const getRecentCovidVaccineTweets = () => {
  return axios.get(routes.getRecentCovidVaccineTweets)
  .then((res) => {
    return res.data;
  })
  .catch((err) => {
    console.log(err);
    throw axiosErrorHandler(err);
  });
};
