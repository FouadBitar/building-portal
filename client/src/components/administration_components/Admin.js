import React, { Component } from 'react';

class Admin extends Component {

    render() {
        return(
            <div>
                <ul className="nav nav-pills nav-fill">
                    <li className="nav-item">
                        <a className="nav-link active" href="/admin/emails">Batch Emails</a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Admin;