import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import EmailHome from './EmailHome';
import EmailForm from './EmailForm';
import EmailFormReview from './EmailFormReview';

/**
 * - Display history of sent out emails with their dates on this page
 * - Display a button that will direct the admin user to a form page
 * - How do you save the emails, does sendgrid do this for you and you can access them through an api?
 */
class Email extends Component {

    state = { showEmailForm: false, showEmailFormReview: false };

    renderContent() {
        if(this.state.showEmailForm) {
            return <EmailForm 
                        onCancelClick={() => {this.setState({ showEmailForm: false })}} 
                        onEmailSubmit={() => {this.setState({ showEmailForm: false, showEmailFormReview: true })}}
                    />;
        }
        if(this.state.showEmailFormReview) {
            return <EmailFormReview onCancelClick={() => {this.setState({ showEmailForm: true, showEmailFormReview: false })}} />
        }
        return <EmailHome onCreateEmailClick={() => {this.setState({ showEmailForm: true })}} />
    }

    render() {
        return(
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

export default reduxForm({
    form: 'emailForm'
})(Email);