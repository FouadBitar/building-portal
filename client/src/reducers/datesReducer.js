import { FETCH_DATES } from '../actions/types';

export default function(state = null, action) {
    switch (action.type) {
        case FETCH_DATES:
            return action.payload || false;
        default:
            return state;
    }
}