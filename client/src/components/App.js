import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
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
    }

    componentDidUpdate() {
        if(this.props.auth) {
            this.props.fetchPosts();
            this.props.fetchDates();
        }
    }

    render() {
        return( 
            <div>
                <BrowserRouter>
                    <div className="container">
                        <Header />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/posts" component={Dashboard} />
                        <Route exact path="/posts/new" component={PostNew} />
                        <Route exact path="/posts/:id/info" component={DisplayPost} />
                        <Route exact path="/amenities" component={ReservationList} />
                        <Route exact path="/amenities/new" component={AmenityReservation} />
                        <Route exact path="/location" component={MapContainer} />
                        <Route exact path="/admin" component={Admin} />
                        <Route exact path="/admin/emails" component={Email} />
                    </div>
                </BrowserRouter>
            </div> 
        );
    }
};

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps, actions)(App);