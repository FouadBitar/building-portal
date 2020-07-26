import React, { Component } from 'react';

class EmailHome extends Component {

    render() {
        return(
            <div>
                <button onClick={this.props.onCreateEmailClick} type="button" className="btn btn-primary">Create Batch Email</button>
                <p>email feature home page, display the list of emails sent</p>
            </div>
        );
    }
}

export default EmailHome;