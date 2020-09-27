import axiosService from './axiosService';
import { API_ENDPOINT } from './../constants';

const url = 'v3/covid-19/countries';
const url_2 = 'v3/covid-19';

export const getCountriesData = () => {
    return axiosService.get(`${API_ENDPOINT}/${url}`);
}

export const getCountryData = countryCode => {
    if(countryCode !== 'all')
        return axiosService.get(`${API_ENDPOINT}/${url}/${countryCode}`)
    return axiosService.get(`${API_ENDPOINT}/${url_2}/${countryCode}`)
}