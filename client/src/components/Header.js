import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as actions from '../actions';

class Header extends Component {

    constructor(props) {
        super(props);

        this.onLogout = this.onLogout.bind(this);
    }

    renderAdminContent() {
        switch(this.props.auth) {
            case null:
                return;
            default:
                if(this.props.auth.user.role === "admin") {
                    return (<li><Link to="/admin">Admin</Link></li>);
                }
                return;
        }
    }

    onLogout() {
        this.props.logoutUser(this.props.history);
    }
    
    renderAuthContent(){
        switch(this.props.auth.isAuthenticated) {
            case null: 
                return;
            case false: 
                return (<li><Link to="/login">Login</Link></li>);
            default:
                return (<li><button onClick={this.onLogout} className="btn waves-effect waves-light">Logout</button></li>);
        }
    }

    render() {
        return(
            <nav>
                <div className="nav-wrapper">
                    <Link 
                        to={this.props.auth.isAuthenticated ? '/posts' : '/'} 
                        className="left brand-logo"
                    >
                        Building Portal 
                    </Link>
                    
                    <ul className="right">
                        <li><Link to='/posts'>Post Dashboard</Link></li>
                        <li><Link to='/amenities'>Ammenity Reservation</Link></li>
                        <li><Link to='/location'>Location</Link></li>
                        {this.renderAdminContent()}
                        {this.renderAuthContent()}
                    </ul>
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

export default connect(mapStateToProps, actions)(withRouter(Header));