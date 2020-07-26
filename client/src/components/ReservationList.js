import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

class ReservationList extends Component {

    renderReservations() {
        // const user_reservations
        return(_.map(this.props.reservations, (date) => {
            var dateString = (new Date(date.date)).toUTCString();
            return (
                <div key={date._id} className="row">
                    <h4>{dateString}</h4>
                    {
                        _.map(date.reservations, (reservation) => {
                            return(
                                _.map(reservation.slots, (slot, index) => {
                                    return(
                                        <div key={index} className="col-md-12">
                                            <div className="card">
                                                <div className="card-body">
                                                    <h5 className="card-title">{slot}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            );
                        })
                    }
                </div>
            );
        }));
    }

    render() {
        return(
            <div>
                <Link to="/amenities/new/" className="btn blue">
                    <i className="material-icons">add</i>
                </Link>
                <h2>My Reservations</h2>
                {this.renderReservations()}
            </div>
        );
    }
}

const createUserReservations = (state) => {
    var dates = state.dates;
    var datesWithMatchingUserReservations = _.map(dates, (date) => {
        date.reservations = _.filter(date.reservations, { _user: state.auth._id });
        return date;
    });
    var reservations = _.filter(datesWithMatchingUserReservations, (date) => {
        return date.reservations.length > 0;
    });

    return reservations;
};

function mapStateToProps(state) {
    return {
        dates: state.dates,
        auth: state.auth,
        reservations: createUserReservations(state)
    };
}

export default connect(mapStateToProps)(ReservationList);