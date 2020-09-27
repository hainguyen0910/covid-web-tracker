import * as countryConstants from './../constants/country';

const initialState = {
    listCountry: [],
    countrySelecting: 'worldwide',
    data: null,
    countriesData: [],
};

const countryReducer = (state = initialState, action) => {
    switch (action.type) {
        case countryConstants.FETCH_COUNTRY: {
            return {
                ...state,
                listCountry: [],
            }
        }
        case countryConstants.FETCH_COUNTRY_SUCCESS: {
            const { data } = action.payload;
            return {
                ...state,
                listCountry: data,
            }
        }

        case countryConstants.FETCH_COUNTRY_FAILED: {
            return {
                ...state,
                listCountry: [],
            }
        }

        case countryConstants.SET_COUNTRY_SELECTING: {
            const { country } = action.payload;
            return {
                ...state,
                countrySelecting: country,
            }
        }

        case countryConstants.GET_COUNTRY_DATA: {
            return {
                ...state,
                data: [],
            }
        }

        case countryConstants.GET_COUNTRY_DATA_SUCCESS: {
            const { data } = action.payload;
            return {
                ...state,
                data: data,
            }
        }

        case countryConstants.GET_COUNTRY_DATA_FAILED: {
            return {
                ...state,
                data: null,
            }
        }

        case countryConstants.GET_TOP_10_COUNTRIES: {
            return {
                ...state,
                countriesData: [],
            }
        }

        case countryConstants.GET_TOP_10_COUNTRIES_SUCCESS: {
            const { data } = action.payload;
            return {
                ...state,
                countriesData: data,
            }
        }

        case countryConstants.GET_TOP_10_COUNTRIES_FAILED: {
            return {
                ...state,
                countriesData: [],
            }
        }

        default:
            return state;
    }
}

export default countryReducer;