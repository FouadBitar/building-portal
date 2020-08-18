import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../actions';
import formFields from './registerFormFields';

class RegisterFormReview extends Component {

    reviewFields()  {
        return (
            _.map(formFields, field => {
                return(
                    <div key={field.name}>
                        <label>{field.label}</label>
                        <div>
                            {this.props.formValues[field.name]}
                        </div>
                    </div>  
                );
            })
        );
    }

    createUser(role) {
        if(role === "user") this.props.createUser(this.props.formValues, this.props.history);
        else this.props.createAdmin(this.props.formValues, this.props.history);
    }


    render() {
        return(
            <div>
                <h5>Please confirm your entries</h5>
                {this.reviewFields()}
                <button className="yellow darken-3 btn-flat" onClick={this.props.onCancel}>Back</button>
                <button onClick={() => this.createUser(this.props.match.params.role)}  className="green btn-flat right">
                    Upload Post
                    <i className="material-icons right">email</i>
                </button>
            </div>
        );
    }
}

function mapStateToProps(state){
    return { formValues: state.form.registerForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(RegisterFormReview));