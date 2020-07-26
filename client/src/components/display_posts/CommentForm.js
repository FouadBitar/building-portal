import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';


class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = { commentText: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ commentText: event.target.value });
    }

    handleSubmit() {
        this.props.createPostComment(this.state.commentText, this.props.current_post._id);
        this.setState({ commentText: '' });
        this.props.displayAddCommentBox(); 
    }

    renderForm() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Comment</label>
                        <textarea 
                            className="form-control" 
                            id="comment" 
                            rows="3"
                            value={this.state.commentText}
                            onChange={this.handleChange}
                        >
                        </textarea>
                        <button className="teal btn btn-sm right" type="submit">submit</button>
                    </div>
                </form>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderForm()}
            </div>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        posts: state.posts,
        current_post: _.find(state.posts, { '_id': props.match.params.id })
    };
}

export default connect(mapStateToProps, actions)(CommentForm);