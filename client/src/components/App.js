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
                        <PrivateRoute exact path="/posts" component={Dashboard} isAuthenticated={this.props.auth.isAuthenticated} />  
                        <PrivateRoute exact path="/posts/new" component={PostNew} isAuthenticated={this.props.auth.isAuthenticated} />
                        <PrivateRoute exact path="/posts/:id/info" component={DisplayPost} isAuthenticated={this.props.auth.isAuthenticated} />
                        <PrivateRoute exact path="/amenities" component={ReservationList} isAuthenticated={this.props.auth.isAuthenticated} />
                        <PrivateRoute exact path="/amenities/new" component={AmenityReservation} isAuthenticated={this.props.auth.isAuthenticated} />
                        <PrivateRoute exact path="/location" component={MapContainer} isAuthenticated={this.props.auth.isAuthenticated} />
                        <PrivateRoute exact path="/admin" component={Admin} isAuthenticated={this.props.auth.isAuthenticated} />
                        <PrivateRoute exact path="/admin/emails" component={Email} isAuthenticated={this.props.auth.isAuthenticated} />
                    </div>
                </BrowserRouter>
            </div> 
        );
    }
};


function PrivateRoute({ component: Component , isAuthenticated, match, ...rest }) {
    const isLoaded = (isAuthenticated === null) ? false : true;

    // If async authentication call is not returned, display loading sign
    return(
        <Route 
            {...rest}
            render={(props) =>  
            !isLoaded ? (
                <div>loading</div>
            ) :
            isAuthenticated ? 
                <Component {...rest} {...props}/>: 
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

export default connect(mapStateToProps, actions)(App);