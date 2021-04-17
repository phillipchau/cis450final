import axios from 'axios';
import { axiosErrorHandler } from './Error';

// This will not work for deployed versions - only for connecting to local.
const basePath = 'http://localhost:8081';
const routes = {
  getLatestCovidArticles: `${basePath}/latest-covid-articles`,
};

export const getLatestCovidArticles = () => {
  return axios.get(routes.getLatestCovidArticles)
  .then((res) => res.data)
  .catch((err) => {
    console.log(err);
    throw axiosErrorHandler(err);
  });
};
