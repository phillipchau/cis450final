import axios from 'axios';
import { axiosErrorHandler } from './Error';

export type Vaccine = {
  Date: string,
  State: string,
  Vaccinated: number,
};

// This will not work for deployed versions - only for connecting to local.
const basePath = 'http://localhost:8081';
const routes = {
  getVaccineData: `${basePath}/vaccine`,
};

export const getVaccineData = (): Promise<Vaccine[]> => axios.get<Vaccine[]>(routes.getVaccineData)
  .then((res) => res.data)
  .catch((err) => {
    throw axiosErrorHandler(err);
  });
