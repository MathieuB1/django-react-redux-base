import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './auth';
import dataReducer from './data';
import faqReducer from './faq';

export default combineReducers({
    auth: authReducer,
    data: dataReducer,
    data: faqReducer,
    routing: routerReducer
});
