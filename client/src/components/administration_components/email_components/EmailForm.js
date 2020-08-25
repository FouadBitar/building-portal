import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import formFields from './emailFormFields';
import EmailFormField from './EmailFormField';
import validateEmails from '../../../utils/validateEmails';

// ADD OPTION TO SEND OUT EMAIL TO ALL OF TOWER 1 OR 2
class EmailForm extends Component {

    renderFields() {
        return _.map(formFields, field => {
            return <Field key={field.name} component={EmailFormField} text="text" label={field.label} name={field.name} />
        });
    }

    render() {
        return(
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onEmailSubmit)}>
                    {this.renderFields()}
                    <button onClick={this.props.onCancelClick} className="red btn" type="button">Cancel</button>
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

    errors.recipients = validateEmails(values.recipients || '');

    _.each(formFields, ({ name }) => {
        if (!values[name]) {
          errors[name] = 'You must provide a value';
        }
    });

    return errors;
}

export default reduxForm({
    validate,
    form: 'emailForm'
})(EmailForm);