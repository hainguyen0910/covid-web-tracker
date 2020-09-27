import * as historicalConstants from './../constants/historical';

const initialState = {
    historical: {},
    chartData: {},
};

const historicalReducer = (state = initialState, action) => {
    switch (action.type) {
        case historicalConstants.FETCH_HISTORICAL_DATA: {
            return {
                ...state,
                historical: {},
            }
        }

        case historicalConstants.FETCH_HISTORICAL_DATA_SUCCESS: {
            const { data } = action.payload;
            return {
                ...state,
                historical: data,
            }
        }

        case historicalConstants.FETCH_HISTORICAL_DATA_FAILED: {
            return {
                ...state,
                historical: {},
            }
        }

        case historicalConstants.SET_CHART_DATA: {
            const { data } = action.payload;
            return {
                ...state,
                chartData: data,
            }
        }

        default:
            return {
                ...state,
            }
    }
}

export default historicalReducer;