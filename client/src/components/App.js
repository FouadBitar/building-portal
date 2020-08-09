import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import PostNew from './create_posts/PostNew';
import DisplayPost from './display_posts/DisplayPost';
import AmenityReservation from './AmenityReservation';
import ReservationList from './ReservationList';
import MapContainer from './MapContainer';
import Admin from './administration_components/Admin';
import Email from './administration_components/Email';
import Login from './Login';

class App extends Component {

    //need to await to see if user is logged in before displaying page if page is refreshed.
    componentDidMount() {
        this.props.fetchUser();
        this.props.fetchPosts();
        this.props.fetchDates();
    }

    render() {
        return( 
            <div>
                <BrowserRouter>
                    <div className="container">
                        <Header />
                        <Route exact path="/">
                            <Landing/>
                        </Route>
                        <Route exact path="/login">
                            <Login/>
                        </Route>
                        <PrivateRoute exact path="/posts" isAuthenticated={this.props.auth.isAuthenticated}>
                            <Dashboard/>
                        </PrivateRoute>
                        <PrivateRoute exact path="/posts/new" isAuthenticated={this.props.auth.isAuthenticated}>
                            <PostNew/>
                        </PrivateRoute>
                        <PrivateRoute exact path="/posts/:id/info" isAuthenticated={this.props.auth.isAuthenticated}>
                            <DisplayPost/>
                        </PrivateRoute>
                        <PrivateRoute exact path="/amenities" isAuthenticated={this.props.auth.isAuthenticated}>
                            <ReservationList/>
                        </PrivateRoute>
                        <PrivateRoute exact path="/amenities/new" isAuthenticated={this.props.auth.isAuthenticated}>
                            <AmenityReservation/>
                        </PrivateRoute>
                        <PrivateRoute exact path="/location" isAuthenticated={this.props.auth.isAuthenticated}>
                            <MapContainer/>
                        </PrivateRoute>
                        <PrivateRoute exact path="/admin" isAuthenticated={this.props.auth.isAuthenticated}>
                            <Admin/>
                        </PrivateRoute>
                        <PrivateRoute exact path="/admin/emails" isAuthenticated={this.props.auth.isAuthenticated}>
                            <Email/>
                        </PrivateRoute>
                    </div>
                </BrowserRouter>
            </div> 
        );
    }
};

// A wrapper for Route that redirects to the login page if not authenticated
function PrivateRoute({ children, isAuthenticated, ...rest }) {
    const isLoaded = (isAuthenticated === null) ? false : true;
    return(
        <Route 
            {...rest}
            render={({ location }) =>  
            !isLoaded ? (
                <div>loading</div>
            ) :
            isAuthenticated ? 
                (children) : 
                (<Redirect 
                    to={{
                        pathname: '/login',
                        state: { from: location }
                    }}
                />) 
            }
        />
    );
}

//each time a field from this changes (i.e. here when the auth reducer is fired) then react-redux library
//internally calls on the shouldComponentUpdate and thus will re-render the component (i.e. here App) so 
//that the component and its children may recieve the updated state.
function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps, actions)(App);