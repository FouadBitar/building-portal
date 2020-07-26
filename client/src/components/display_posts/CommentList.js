import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';


class CommentList extends Component {

    handleDelete(comment) {
        this.props.deleteComment(comment._id, this.props.current_post._id);
    }

    renderCommentList() {
        return(
            <div>
                <ul className="list-group">
                    {_.map(this.props.current_post.comments, (comment) => {
                        return (
                            <li key={comment._id}className="list-group-item">
                                {comment.body}
                                <button onClick={() => this.handleDelete(comment)} className="btn-flat right">
                                    <i className="material-icons">delete</i>
                                </button>
                            </li>)
                    })}
                </ul>
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
                    {this.renderCommentList()}
                </div>);
        }
    };

    render() {
        return(
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

export default connect(mapStateToProps, actions)(CommentList);