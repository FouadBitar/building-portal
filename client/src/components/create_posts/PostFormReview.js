import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './postFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

const PostFormReview = (props) => {
    const reviewFields = _.map(formFields, field => {
        return(
            <div key={field.name}>
                <label>{field.label}</label>
                <div>
                    {props.formValues[field.name]}
                </div>
            </div>  
        );
    });

    function createPost(props){
        props.createPost(props.formValues, props.history);
        props.fetchPosts();
    }

    return (
        <div>
            <h5>Please confirm your entries</h5>
            {reviewFields}
            <button className="yellow darken-3 btn-flat" onClick={props.onCancel}>Back</button>
            <button onClick={() => createPost(props)}  className="green btn-flat right">
                Upload Post
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
};

function mapStateToProps(state){
    return { formValues: state.form.postForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(PostFormReview));