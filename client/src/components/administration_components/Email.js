import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import EmailHome from './EmailHome';
import EmailForm from './EmailForm';

/**
 * - Display history of sent out emails with their dates on this page
 * - Display a button that will direct the admin user to a form page
 */
class Email extends Component {

    state = { showEmailForm: false };

    renderContent() {
        if(this.state.showEmailForm) {
            return <EmailForm />
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