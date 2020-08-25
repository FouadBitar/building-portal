import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { loginUser } from '../actions';


const renderField = ({ input, label, type, meta: { touched, error } }, ...rest) => {
    return(
        <div className="form-group row justify-content-center">
            <label className="col-sm-1 col-form-label">{label}</label>
            <div className="col-sm-3">
                <input className="form-control" {...input} type={type} ></input>
                <div className="font-italic text-danger" style={{ marginBottom: '10px' }}>
                    {touched && (error && <span>{error}</span>)}
                </div>
            </div>
        </div>
    );
}

let Login = props => {

    const onSubmit = ({ username, password }) => {
        const user = { username: username, password: password };
        props.loginUser(user, props.history);
    }

    return (
        <div className="container my-5">
            <form>
                <div>
                    <Field 
                        name="username"
                        type="text"
                        label="Username"
                        component={renderField}
                        validate={validateField}
                    />
                </div>
                <div>
                    <Field 
                        name="password"
                        type="password"
                        label="Password"
                        component={renderField}
                        validate={validateField}
                    />
                </div>
                <div className="row justify-content-center">
                    <button onClick={props.handleSubmit(onSubmit)} type="submit" className="btn btn-primary">Login</button>
                </div>
            </form>
        </div>
    );
}

function validateField(value) {
    var error = "";

    //check if value exists
    if(!value) error = 'You must provide a value';

    return error;
}

Login = reduxForm({
    form: 'loginForm'
})(Login);
Login = connect(null, { loginUser })(Login);
Login = withRouter(Login);

export default Login;