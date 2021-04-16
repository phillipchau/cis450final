import axios from 'axios';
import { axiosErrorHandler } from './Error';

// This will not work for deployed versions - only for connecting to local.
const basePath = 'http://localhost:8081';
const routes = {
  getVaccineData: `${basePath}/states`,
};

// Function temporarily unused in place of dummy variable.
const getStatesDummy = () => axios.get(routes.getStates)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
  });

const getStates = () => new Promise((resolve, reject) => {
  resolve(['Washington', 'Oregon', 'California', 'Pennsylvania', 'Idaho']);
});

export default getStates;
