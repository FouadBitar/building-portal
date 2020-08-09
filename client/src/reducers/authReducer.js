import { FETCH_USER } from '../actions/types';

//{ isAuthenticated: false, user: { username: "", role: "" } }
export default function(state = { isAuthenticated: null, user: { username: "", role: "" } }, action) {
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false;
        default:
            return state;
    }
}