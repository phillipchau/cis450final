import axios from 'axios';
import { axiosErrorHandler } from './Error';

// This will not work for deployed versions - only for connecting to local.
const basePath = 'http://localhost:8081';
const routes = {
  getDistinctStates: `${basePath}/states`,
  getCountPerStateDate: `${basePath}/state-date-count`,
  getCaseEthnicityQuantiles: `${basePath}/case-demographics`
};

/**
 * Constant with the ethnicities in the database (these are each columns, so
 * for ease of use they are hard-coded here).
 */
export const Ethnicities = Object.freeze({
  HISPANIC: 'Hispanic',
  WHITE: 'White',
  BLACK: 'Black',
  NATIVE: 'Native',
  ASIAN: 'Asian',
  PACIFIC: 'Pacific'
});

// Function used to get a quantile of case data for a specific ethnicity.
export const getCaseEthnicityQuantile = (params) => axios.get(
  routes.getCaseEthnicityQuantiles, { params: params })
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
  });
