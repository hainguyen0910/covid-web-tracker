import { combineReducers } from 'redux';
import countryReducer from './country';
import historicalReducer from './historical';

const rootReducer = combineReducers({
    countryReducer,
    historicalReducer,
});

export default rootReducer;