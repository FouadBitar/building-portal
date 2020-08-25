import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';


class Dashboard extends Component {

    componentDidMount() {
        this.props.fetchPosts();
    }

    renderPostList() {
        return(_.map(this.props.posts, (post) => {
            return (
                <Link className="list-group-item list-group-item-action" key={post._id} to={`/posts/${post._id}/info`}>
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{post.title}</h5>
                        <small>price / month: {post.cost}</small> 
                    </div>
                    <p className="mb-1">{post.body}</p>
                </Link>
            );
        }));
    }

    renderContent() {
        switch(this.props.posts) {
            case null:
                return;
            case false: 
                return;
            default:
                return this.renderPostList();
        }
    };

    render() {
        return (
            <div>
                <Link to="/posts/new" className="btn btn-primary">
                    Create Post
                </Link>
                <div className="list-group">
                    {this.renderContent()}
                </div>
            </div>
        );
    }
};

function mapStateToProps(state) {
    return {
        posts: state.posts
    };
}

export default connect(mapStateToProps, { fetchPosts })(Dashboard);