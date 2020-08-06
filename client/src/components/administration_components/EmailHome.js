import React, { Component } from 'react';

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