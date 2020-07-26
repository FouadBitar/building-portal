import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import PostField from './PostField';
import formFields from './postFields';

class PostForm extends Component {
    renderFields() {
        return _.map(formFields, fields => {
            return <Field key={fields.name} component={PostField} text="text" label={fields.label} name={fields.name} />
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onPostSubmit)}>
                    { this.renderFields() }
                    <Link to="/posts" className="red btn-flat white-text">
                        Cancel
                    </Link>
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

    _.each(formFields, (field) => {
        if(!values[field.name]) {
            errors[field.name] = 'You must provide a value';
        }
        if(field.name === "cost" && isNaN(values[field.name])) {
            errors[field.name] = 'You must provide a number';
        }
    });

    return errors;
}

export default reduxForm({
    validate: validate,
    form: 'postForm',
    destroyOnUnmount: false
})(PostForm);