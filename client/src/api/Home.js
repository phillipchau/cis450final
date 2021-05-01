import axios from 'axios';
import { axiosErrorHandler } from './Error';

// This will not work for deployed versions - only for connecting to local.
const basePath = 'http://localhost:8081';
const routes = {
  getLog: `${basePath}/getlogin`,
};

export const getLogin = () => axios.get(routes.getLog, {withCredentials: true})
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
});

export const getUser = (user) => axios.get(`http://localhost:8081/user/${user}`)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
});

export const getCaseData = (state) => axios.get(`http://localhost:8081/casecount?state=${state}`)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
});


