import axiosService from './axiosService';
import { API_ENDPOINT } from './../constants';

const url = "v3/covid-19/historical/all?lastdays=120";

export const getHistoricalData = () => {
    return axiosService.get(`${API_ENDPOINT}/${url}`);
}