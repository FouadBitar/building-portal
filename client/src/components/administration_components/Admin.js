import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Admin extends Component {

    render() {
        return(
            <div>
                <ul className="nav nav-pills nav-fill">
                    <li className="nav-item">
                        <Link className="nav-link active" to="/admin/emails">Batch Emails</Link>
                        <br />
                        <Link className="nav-link active" to={`/admin/register/${"admin"}`} >Register Admin</Link>
                        <br />
                        <Link className="nav-link active" to={`/admin/register/${"user"}`} >Register User</Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Admin;