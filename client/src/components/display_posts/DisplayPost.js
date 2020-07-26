import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PostDetails from './PostDetails';
import CommentForm from './CommentForm';
import CommentList from './CommentList';


class DisplayPost extends Component {

    constructor(props) {
        super(props);
        this.displayAddCommentBox = this.displayAddCommentBox.bind(this);
        this.state = { showAddComment: false }
    }

    renderComment() {
        if(this.state.showAddComment) {
            return <CommentForm match={this.props.match} displayAddCommentBox={this.displayAddCommentBox}/>
        }
        return;
    }

    displayAddCommentBox() {
        this.setState({showAddComment: !this.state.showAddComment}); 
    }

    render() {
        return(
            <div>
                <Link to="/posts/" className="btn blue">
                    <i className="material-icons">keyboard_backspace</i>
                </Link>
                <PostDetails match={this.props.match} displayAddCommentBox={this.displayAddCommentBox}/>
                {this.renderComment()}
                <CommentList match={this.props.match} />
            </div>
        );
    }

}

export default DisplayPost;