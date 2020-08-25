import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser, fetchPosts, fetchDates } from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import PostNew from './create_posts/PostNew';
import DisplayPost from './display_posts/DisplayPost';
import AmenityReservation from './AmenityReservation';
import ReservationList from './ReservationList';
import MapContainer from './MapContainer';
import Admin from './administration_components/Admin';
import Email from './administration_components/email_components/Email';
import Login from './Login';
import Register from './administration_components/register_components/Register';

class App extends Component {

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
                        <Route exact path="/login" component={Login} />
                        <PrivateRoute exact path="/posts" component={Dashboard} isAuthenticated={this.props.auth} />  
                        <PrivateRoute exact path="/posts/new" component={PostNew} isAuthenticated={this.props.auth} />
                        <PrivateRoute exact path="/posts/:id/info" component={DisplayPost} isAuthenticated={this.props.auth} />
                        <PrivateRoute exact path="/amenities" component={ReservationList} isAuthenticated={this.props.auth} />
                        <PrivateRoute exact path="/amenities/new" component={AmenityReservation} isAuthenticated={this.props.auth} />
                        <PrivateRoute exact path="/location" component={MapContainer} isAuthenticated={this.props.auth} />
                        <PrivateRoute exact path="/admin" component={Admin} isAuthenticated={this.props.auth} admin={true}/>
                        <PrivateRoute exact path="/admin/emails" component={Email} isAuthenticated={this.props.auth} admin={true}/>
                        <PrivateRoute exact path="/admin/register/:role" component={Register} isAuthenticated={this.props.auth} admin={true}/>
                    </div>
                </BrowserRouter>
            </div> 
        );
    }
};


function PrivateRoute({ component: Component , isAuthenticated, admin, match, ...rest }) {
    const isLoaded = (isAuthenticated.isAuthenticated === null) ? false : true;

    // If async authentication call is not returned, display loading sign
    // If user role is "user", do not allow access to admin routes
    return(
        <Route 
            {...rest}
            render={(props) =>  
            !isLoaded ? (
                <div>loading</div>
            ) : 
            (isAuthenticated.user.role === "user" && admin ) ?
                (<Redirect to={{ pathname: '/posts' }} />) :
            isAuthenticated.isAuthenticated ? 
                <Component {...rest} {...props}/> : 
                (<Redirect 
                    to={{
                        pathname: '/login',
                        state: { from: props.location }
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

export default connect(mapStateToProps, { fetchUser, fetchPosts, fetchDates })(App);