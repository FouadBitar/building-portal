import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import timeSlots from './reservationTimeSlots';
import * as actions from '../actions/index';

/**
 * TODO
 * - restrict the reservation of a date that is more than 2 months from the current day
 * - change display of time slots to be for the current date selected
 */
class AmenityReservation extends Component {

    constructor(props) {
        super(props);
        const checkedArray = _.map(timeSlots, () => {
            return -1;
        });
        this.state = { 
            current_date: "2020-07-24",
            checked: checkedArray
        };
        
        this.handleDateSelected = this.handleDateSelected.bind(this);
        this.handleSubmitReservation = this.handleSubmitReservation.bind(this);
    }

    // this function searches the dates array for the object with
    // the matching date, returns null if not found
    findDate(valueAsDate) {
        var selectedDate = new Date(valueAsDate);
        var selectedDay = selectedDate.getUTCDate();
        var selectedMonth = selectedDate.getUTCMonth()+1;
        var selectedYear = selectedDate.getUTCFullYear();
        var matchingDate = null;

        _.find(this.props.dates, function(n) {
            var date = new Date(n.date);
            var day = date.getUTCDate();
            var month = date.getUTCMonth()+1;
            var year = date.getUTCFullYear();

            if(day === selectedDay 
                && month === selectedMonth
                && year === selectedYear) {
                    matchingDate = n;
                }
        });

        return matchingDate;
    }

    handleDateSelected(value, valueAsDate) {
        this.setState({ current_date: value });

        var matchingDate = this.findDate(valueAsDate);

        this.setState({ current_date_match: matchingDate }, () => {
            this.updateAvailableSlots();
        });  
        
        this.updateCheckedArray();
    }

    handleToggle(index) {
        const currentIndexValue = this.state.checked[index];
        const newChecked = this.state.checked;

        if (currentIndexValue === -1) {
            newChecked.splice(index, 1, 1);
        } else {
            newChecked.splice(index, 1, -1);
        }
        
        this.setState({ checked: newChecked });
    }

    updateCheckedArray() {
        const checkedArray = _.map(timeSlots, () => {
            return -1;
        });
        this.setState({ checked: checkedArray })
    }

    /**
     * This method is called when a new date has been selected to view the time slots. The method
     * updates the locally stored component's state variable holding the time slots and their availability.
     */
    updateAvailableSlots() {
        var updatedAvailableSlots = timeSlots.map((x) => x);

        if(this.state.current_date_match){
            _.map(this.state.current_date_match.reservations, r => {
                updatedAvailableSlots = _.map(updatedAvailableSlots, function(slot) {
                    if(_.indexOf(r.slots, slot.time) !== -1){
                        return({
                            time: slot.time,
                            available: false
                        });
                    } else {
                        return slot;
                    }
                })
            });
        }
        
        this.setState({ available_slots: updatedAvailableSlots });
    }

    /**
     * All information is passed to the backend and logic is handled there.
     */
    handleSubmitReservation(event) {
        event.preventDefault();
        this.props.createReservation(this.state, this.props.history);
    }

    /**
     * Display all the time slots and mark the ones that have been reserved as disabled
     */
    renderTimeSlots() {
        return(
            <List>
                {_.map(this.state.available_slots, (slot, index) => {
                    return(
                        <ListItem key={index} disabled={!slot.available} button onClick={() => this.handleToggle(index)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={this.state.checked[index] !== -1} 
                                />
                            </ListItemIcon>
                            <ListItemText  primary={slot.time} />
                        </ListItem>
                    )
                })}
            </List>
        );
    }

    render(){
        return(
            <div>
                <form className="container" noValidate onSubmit={this.handleSubmitReservation}>
                    <Grid container spacing={3}>
                        <Grid item xs={6} sm={3}>
                            <Link to="/amenities" className="btn blue">
                                <i className="material-icons">arrow_back</i>
                            </Link>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="date"
                                ref="date"
                                label="Date"
                                type="date" 
                                className="textField"
                                value={this.state.current_date}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(event) => { this.handleDateSelected(event.target.value, event.target.valueAsDate) } }
                            />
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Button type="submit" variant="contained" color="secondary">Reserve</Button>
                        </Grid>
                    </Grid>
                </form>
                {this.renderTimeSlots()}
            </div>
        );
    }


}

function mapStateToProps(state) {
    return {
        dates: state.dates
    };
}

export default connect(mapStateToProps, actions)(withRouter(AmenityReservation));