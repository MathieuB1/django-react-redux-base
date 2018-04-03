import {
    DATA_RECEIVE_FAQ_DATA,
    DATA_FETCH_FAQ_DATA_REQUEST
} from '../constants';

const initialState = {
    data: [],
    isFetching: false
};

export default function faqReducer(state = initialState, action) {
    switch (action.type) {
        case DATA_RECEIVE_FAQ_DATA:
            return Object.assign({}, state, {
                data: action.payload.data,
                isFetching: false
            });

        case DATA_FETCH_FAQ_DATA_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        default:
            return state;
    }
}