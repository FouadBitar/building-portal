import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import RegisterFormFieldInput from './RegisterFormFieldInput';
import validateEmails from '../../../utils/validateEmails';


class RegisterForm extends Component {

    // renders the form input needed to register a user (tower number & apartment number)
    renderUserRegistrationFields() {
        return(
            <div>
                <label>Tower</label>
                <p>
                <label>
                    <Field name="tower" component="input" type="radio" value="1"  />
                    <span>1</span>
                </label>
                </p>
                <p>
                <label>
                    <Field name="tower" component="input" type="radio" value="2" />
                    <span>2</span>
                </label>
                </p>

                <Field component={RegisterFormFieldInput} text="text" label="Apartment Number" name="apartment_number" />
            </div> 
        );
    }

    renderGeneralRegistrationFields() {
        return(
            <div>
                <Field component={RegisterFormFieldInput} text="text" label="Email" name="username" />
                <Field component={RegisterFormFieldInput} text="text" label="Password" name="password" />
            </div>
        );
    }

    //render username and password, if the user has the role "user", render the tower number and apartment number
    renderRegistrationFields() {
        if(this.props.match.params.role === "user") {
            return (
                <div>
                    {this.renderGeneralRegistrationFields()}
                    {this.renderUserRegistrationFields()}
                </div>
            );
        }
        return (
            <div>
                {this.renderGeneralRegistrationFields()}
            </div>
        );
    }

    render() {
        return(
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onFormSubmit)}>
                    {this.renderRegistrationFields()}
                    <Link className="red btn" to="/admin" >Cancel</Link>
                    <button type="submit" className="teal btn-flat right white-text">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    errors.username = validateEmails(values.username || '');

    if(!values['username']) errors['username'] = 'You must provide a username';
    if(!values['password']) errors['password'] = 'You must provide a password';
    if(!values['tower']) errors['tower'] = 'You must provide a tower number';
    if(!values['apartment_number']) errors['apartment_number'] = 'You must provide an apartment number';


    if(values['apartment_number'] && isNaN(values['apartment_number'])) errors['apartment_number'] = 'You must provide a number'
    if(values['apartment_number'] && ((values['apartment_number'] < 300) || (values['apartment_number'] > 4010) )) errors['apartment_number'] = 'Apartment number is invalid';
  
    return errors;
}

export default reduxForm({
    validate,
    form: 'registerForm'
})(RegisterForm);

