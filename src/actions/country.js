import * as countryApis from './../apis/country';
import * as countryConstants from './../constants/country';

export const fetchListCountry = () => {
    return {
        type: countryConstants.FETCH_COUNTRY,
    }
}

export const fetchListCountrySuccess = data => {
    return {
        type: countryConstants.FETCH_COUNTRY_SUCCESS,
        payload: {
            data: data,
        }
    }
}

export const fetchListCountryFailed = error => {
    return {
        type: countryConstants.FETCH_COUNTRY_FAILED,
        payload: {
            error: error
        }
    }
}

export const setCountrySelecting = country => {
    return {
        type: countryConstants.SET_COUNTRY_SELECTING,
        payload: {
            country: country,
        }
    }
}

export const fetchListCountryRequest = () => {
    return dispatch => {
        dispatch(fetchListCountry());
        countryApis.getCountriesData()
            .then(res => {
                const { data } = res;
                const countries = data.map(country => ({
                    name: country.country,
                    countryCode: country.countryInfo.iso2,
                    cases: country.cases,
                    recovered: country.recovered,
                    deaths: country.deaths,
                    lat: country.countryInfo.lat,
                    long: country.countryInfo.long,
                    flag: country.countryInfo.flag,
                }))
                dispatch(fetchListCountrySuccess(countries));
            }).catch(err => {
                dispatch(fetchListCountryFailed(err));
            })
    }
}

export const getCountryData = () => {
    return {
        type: countryConstants.GET_COUNTRY_DATA,
    }
}

export const getCountryDataSuccess = data => {
    return {
        type: countryConstants.GET_COUNTRY_DATA_SUCCESS,
        payload: {
            data: data,
        }
    }
}

export const getCountryDataFailed = error => {
    return {
        type: countryConstants.GET_COUNTRY_DATA_FAILED,
        payload: {
            error: error
        }
    }
}

export const getCountryDataRequest = countryCode => {
    return dispatch => {
        countryApis.getCountryData(countryCode)
            .then(res => {
                const { data } = res;
                dispatch(getCountryDataSuccess(data));
            }).catch(err => {
                dispatch(getCountryDataFailed(err));
            })
    }
}

export const getTop10Countries = () => {
    return {
        type: countryConstants.GET_TOP_10_COUNTRIES,
    }
}

export const getTop15CountriesSuccess = data => {
    return {
        type: countryConstants.GET_TOP_10_COUNTRIES_SUCCESS,
        payload: {
            data: data,
        }
    }
}

export const getTop15CountriesFailed = error => {
    return {
        type: countryConstants.GET_TOP_10_COUNTRIES_FAILED,
        payload: {
            error: error
        }
    }
}


export const getTop15CountriesRequest = () => {
    return dispatch => {
        countryApis.getCountriesData()
            .then(res => {
                const { data } = res;
                const countries = data.map(country => ({
                    name: country.country,
                    todayCases: country.todayCases,
                }))
                dispatch(getTop15CountriesSuccess(countries));
            }).catch(err => {
                dispatch(getTop15CountriesFailed(err));
            })
    }
}