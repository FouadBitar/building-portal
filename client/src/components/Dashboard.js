import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// When you login, it should refresh the posts that it has retrieved, have to refresh the page to do that now
class Dashboard extends Component {

    renderPosts() {
        return(_.map(this.props.posts, (post) => {
            return (
                <div key={post._id} className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">{post.body}</p>
                                <Link to={`/posts/${post._id}/info`} className="btn blue">View</Link>
                            </div>
                        </div>
                    </div>
                </div>
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
                return this.renderPosts();
        }
    };

    render() {
        return (
            <div>
                {this.renderContent()}
                
                <div className="fixed-action-btn">
                    <Link to="/posts/new" className="btn-floating btn-large grey">
                        <i className="material-icons">add</i>
                    </Link>
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

export default connect(mapStateToProps)(Dashboard);