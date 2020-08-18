import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import RegisterForm from './RegisterForm';
import RegisterFormReview from './RegisterFormReview';


class Register extends Component {

    state = { showFormReview: false };

    //if the :role parameter is not "admin" or "user", redirect back to admin - temp fix
    render() {
        if(this.props.match.params.role !== "admin" && this.props.match.params.role !== "user") {
            return(
                <h2>wrong route</h2>
            );
        }
        if(this.state.showFormReview) {
            return <RegisterFormReview match={this.props.match} onCancel={() => this.setState({ showFormReview: false })} />
        }
        return <RegisterForm match={this.props.match} onFormSubmit={() => this.setState({ showFormReview: true })} />
    }
}

export default reduxForm({
    form: 'registerForm'
})(Register);