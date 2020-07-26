import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import postReducer from './postReducer';
import datesReducer from './datesReducer';


export default combineReducers({
    auth: authReducer,
    posts: postReducer,
    dates: datesReducer,
    form: reduxForm
});