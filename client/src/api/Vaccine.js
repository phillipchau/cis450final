import axios from 'axios';
import { axiosErrorHandler } from './Error';

// This will not work for deployed versions - only for connecting to local.
const basePath = 'http://localhost:8081';
const routes = {
  getVaccineData: `${basePath}/vaccine`,
  getRecentCovidVaccineTweets: `${basePath}/recent-covid-vaccine-tweets`,
};

export const getVaccineData = () => axios.get(routes.getVaccineData)
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

getRecentCovidVaccineTweets();
