import React, { Component } from 'react';
import { Main } from '../../../layout';
import FavoriteNavbar from './partials/FavoriteNavbar';

class FavoriteLayout extends Component {
    render() {
        const { children } = this.props;
        return (
            // <Main>
            <div className="bg-body my-favorites col-lg-9 col-sm-12" style={{overflow: "hidden"}}>
                <div className="">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="pb-2 heading">My Favorites</h1>
                            <FavoriteNavbar />
                        </div>
                        <div className="col-12">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            // </Main>
        );
    }
}

export default FavoriteLayout;