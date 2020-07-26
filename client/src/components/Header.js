import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {

    renderAdminContent() {
        switch(this.props.auth) {
            case null:
                return;
            default:
                if(this.props.auth.role === "admin") {
                    return (<li><a href="/admin">Admin</a></li>);
                }
                return;
        }
    }
    
    renderAuthContent(){
        switch(this.props.auth) {
            case null:
                return;
            case false: 
                return (<li><a href="/auth/google">Login with Google</a></li>);
            default:
                return (<li><a href="/api/logout">logout</a></li>);
        }
    }

    render() {
        return(
            <nav>
                <div className="nav-wrapper">
                    <Link 
                        to={this.props.auth ? '/posts' : '/'} 
                        className="left brand-logo"
                    >
                        Building Portal 
                    </Link>
                    
                    <ul className="right">
                        <li><a href={this.props.auth ? '/posts' : '/'}>Post Dashboard</a></li>
                        <li><a href={this.props.auth ? '/amenities' : '/'}>Ammenity Reservation</a></li>
                        <li><a href="/location">Location</a></li>
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

export default connect(mapStateToProps)(Header);