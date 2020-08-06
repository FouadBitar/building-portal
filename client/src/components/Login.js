import _ from 'lodash';
import React from 'react';
import { reduxForm, Field } from 'redux-form';



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

const Login = props => {
    return (
        <div>
            <form action="/api/login" method="post">
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
                    <button type="submit" className="btn red">Submit</button>
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

export default reduxForm({
    form: 'loginForm'
})(Login);