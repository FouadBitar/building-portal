import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import formFields from './emailFormFields';
import EmailFormField from './EmailFormField';

/**
 * - Feature that allows the admin to upload files or images?
 * - Form field should include weather or not they want to send the email to the entire tower 1 or 2
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
                <form>
                    {this.renderFields()}
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'emailForm'
})(EmailForm);