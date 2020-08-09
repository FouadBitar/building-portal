import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';



const renderField = ({ input, label, type, meta: { touched, error } }) => {
    return(
        <div>
            <label>{label}</label>
            <div>
                <input {...input} type={type} ></input>
                <div className="red-text" style={{ marginBottom: '10px' }}>
                    {touched && (error && <span>{error}</span>)}
                </div>
                
            </div>
        </div>
    );
}



let Login = props => {


    const onSubmit = async (event) => {
        event.preventDefault();

        console.log(props.passwordValue);
        const user = { username: props.usernameValue, password: props.passwordValue };
        props.loginUser(user, props.history);
    }


    return (
        <div>
            <form>
                <div>
                    <Field 
                        name="username"
                        type="text"
                        label="username"
                        component={renderField}
                        validate={validate}
                    />
                </div>
                <div>
                    <Field 
                        name="password"
                        type="password"
                        label="password"
                        component={renderField}
                        validate={validate}
                    />
                </div>
                <div>
                    <button onClick={onSubmit} className="btn red">Login</button>
                </div>
            </form>
        </div>
    );
}

function validate(value) {
    var error = "";

    //check if value exists
    if(!value) error = 'You must provide a value';

    return error;
}

Login = reduxForm({
    form: 'loginForm'
})(Login);

const selector = formValueSelector('loginForm');
Login = connect(state => {
    const usernameValue = selector(state, 'username');
    const passwordValue = selector(state, 'password');
    return {
        usernameValue,
        passwordValue,
        auth: state.auth
    }
}, actions)(Login);

Login = withRouter(Login);

export default Login;