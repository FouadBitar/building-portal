import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import formFields from './emailFormFields';
import EmailFormField from './EmailFormField';

/**
 * - Feature that allows the admin to upload files or images?
 * - Form field should include weather or not they want to send the email to the entire tower 1 or 2
 * - Add emails to the models of the users or residents
 */
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

export default reduxForm({
    form: 'emailForm'
})(EmailForm);