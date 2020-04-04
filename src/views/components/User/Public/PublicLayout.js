import React, { Component } from 'react';
import { Main } from '../../../layout';
import Sidebar from './partials/Sidebar';
import PublicNavbar from './partials/PublicNavbar';

class PublicLayout extends Component {

    componentWillUnmount() {
        //console.log('componentWillUnmount');
    }

    render() {
        const { children } = this.props;

        return (<Main>
            <div className="bg-body public-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-12 left-side">
                            <Sidebar />
                        </div>
                        <div className="col-lg-9 col-md-8 col-12 right-side">
                            <PublicNavbar />
                            { children }
                        </div>
                    </div>
                </div>
            </div>
        </Main>);
    }
}

export default PublicLayout;
