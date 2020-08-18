import React, { Component } from 'react';

// Component that displays the action options for sending emails
class EmailHome extends Component {

    render() {
        return(
            <div className="container">
                <button onClick={this.props.onCreateEmailClick} type="button" className="btn blue">Create Batch Email</button>
            </div>
        );
    }
}

export default EmailHome;