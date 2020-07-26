import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import * as actions from '../../actions/index';


class PostDetails extends Component {

    handleDeletePost(postId) {
        this.props.deletePost(postId, this.props.history);
    }

    renderPostDetails() {
        return(
            <div className="jumbotron">
                <h1 className="display-4">{this.props.current_post.title}</h1>
                <p className="lead">{this.props.current_post.body}</p>
                <hr className="my-4"></hr>
                <button onClick={this.props.displayAddCommentBox} className="btn blue btn-lg">Comment</button>
                <button onClick={() => this.handleDeletePost(this.props.current_post._id)} className="btn red btn-danger">Delete</button>
            </div>
        );
    }

    renderContent() {
        switch(this.props.posts) {
            case null:
                return;
            case false: 
                return;
            default:
                return (<div>
                    {this.renderPostDetails()}
                </div>);
        }
    };

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        posts: state.posts,
        current_post: _.find(state.posts, { '_id': props.match.params.id }),
    };
}

export default connect(mapStateToProps, actions)(withRouter(PostDetails));