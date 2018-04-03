import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import { DATA_FETCH_FAQ_DATA_REQUEST, DATA_RECEIVE_FAQ_DATA } from '../constants';
import { authLoginUserFailure } from './auth';


export function dataReceiveFaqData(data) {
    return {
        type: DATA_RECEIVE_FAQ_DATA,
        payload: {
            data
        }
    };
}

export function dataFetchFaqDataRequest() {
    return {
        type: DATA_FETCH_FAQ_DATA_REQUEST
    };
}

export function dataFetchFaqData() {
    return (dispatch, state) => {
        dispatch(dataFetchFaqDataRequest());
        return fetch(`${SERVER_URL}/api/v1/faq/`, {
            headers: {
                Accept: 'application/json'
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(dataReceiveFaqData(response.data));
                
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
                    // Invalid authentication credentials
                    return error.response.json().then((data) => {
                        dispatch(authLoginUserFailure(401, data.non_field_errors[0]));
                    });
                } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(authLoginUserFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                    dispatch(authLoginUserFailure('Connection Error', 'An error occurred while sending your data!'));
                }

                dispatch(push('/faq'));
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}
