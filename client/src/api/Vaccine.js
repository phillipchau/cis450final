import axios from 'axios';
import { axiosErrorHandler } from './Error';

// This will not work for deployed versions - only for connecting to local.
const basePath = 'http://localhost:8081';
const routes = {
  getVaccineData: `${basePath}/vaccine`,
};

export const getVaccineData = () => axios.get(routes.getVaccineData)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
  });
