import React, { Component } from 'react';

class BadRequest extends Component {
    render() {
        return (
            <div className="not-found my-4 float-left w-100">
                <div className="container">
                    <div className="row">
                    <div className="col-12">
                        <h1> Bad Request (#400)</h1>
                        <div className="alert alert-danger">Page not found.</div>
                        <p>The above error occurred while the Web server was processing your request.</p>
                        <p>Please contact us if you think this is a server error. Thank you.</p>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BadRequest;
