import _ from 'lodash';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import formFields from './emailFormFields';
import * as actions from '../../../actions/index';

class EmailFormReview extends Component {

    renderReviewFields() { 
        return(
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

    render() {
        return(
            <div>
                EmailFormReview
                {this.renderReviewFields()}
                <button className="yellow darken-3 btn-flat" onClick={this.props.onCancelClick}>Back</button>
                <button onClick={() => this.props.createBatchEmail(this.props.formValues, this.props.history)}  className="green btn-flat right">
                    Send Email
                    <i className="material-icons right">email</i>
                </button>
            </div>
        );
    }
}

function mapStateToProps(state){
    return { formValues: state.form.emailForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(EmailFormReview));