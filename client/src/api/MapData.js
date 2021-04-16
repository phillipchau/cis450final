import axios from 'axios';
import { axiosErrorHandler } from './Error';

// This will not work for deployed versions - only for connecting to local.
const basePath = 'http://localhost:8081';
const routes = {
  States: `${basePath}/state`,
  Filters:`${basePath}/filters`,
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