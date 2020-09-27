import * as historicalApis from './../apis/historical';
import * as historicalConstants from './../constants/historical';

export const fetchHistoricalData = () => {
    return {
        type: historicalConstants.FETCH_HISTORICAL_DATA,
    }
}

export const fetchHistoricalDataSuccess = data => {
    return {
        type: historicalConstants.FETCH_HISTORICAL_DATA_SUCCESS,
        payload: {
            data: data
        }
    }
}

export const fetchHistoricalDataFailed = err => {
    return {
        type: historicalConstants.FETCH_HISTORICAL_DATA_FAILED,
        payload: {
            err: err,
        }
    }
}

export const fetchHistoricalDataRequest = () => {
    return dispatch => {
        dispatch(fetchHistoricalData);
        historicalApis.getHistoricalData()
            .then(res => {
                const { data } = res;
                dispatch(fetchHistoricalDataSuccess(data));
            })
            .catch(err => {
                dispatch(fetchHistoricalDataFailed(err));
            })
    }
}

export const setChartData = data =>{
    return{
        type: historicalConstants.SET_CHART_DATA,
        payload:{
            data:data
        }
    }
}