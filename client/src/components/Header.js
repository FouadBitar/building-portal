import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logoutUser } from '../actions';

class Header extends Component {

    renderAdminContent() {
        switch(this.props.auth) {
            case null:
                return;
            default:
                if(this.props.auth.user.role === "admin") {
                    return (<li className="nav-item"><Link className="nav-link" to="/admin">Admin</Link></li>);
                }
                return;
        }
    }
    
    renderAuthContent(){
        switch(this.props.auth.isAuthenticated) {
            case null: 
                return;
            case false: 
                return (<Link className="btn btn-primary" to="/login">Login</Link>);
            default:
                return (
                    <button className="btn btn-outline-primary" onClick={() => this.props.logoutUser(this.props.history)}>
                        Logout
                    </button>
                );
        }
    }

    render() {
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link 
                    to={this.props.auth.isAuthenticated ? '/posts' : '/'} 
                    className="navbar-brand"
                >
                    Building Portal 
                </Link>
                
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item"><Link className="nav-link" to='/posts'>Posts</Link></li>
                        <li className="nav-item"><Link className="nav-link" to='/amenities'>Ammenities</Link></li>
                        <li className="nav-item"><Link className="nav-link" to='/location'>Location</Link></li>
                        {this.renderAdminContent()}
                    </ul>
                    {this.renderAuthContent()}
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps, { logoutUser })(withRouter(Header));