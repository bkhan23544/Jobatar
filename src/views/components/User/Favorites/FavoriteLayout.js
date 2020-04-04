import React, { Component } from 'react';
import { Main } from '../../../layout';
import FavoriteNavbar from './partials/FavoriteNavbar';

class FavoriteLayout extends Component {
    render() {
        const { children } = this.props;
        return (<Main>
            <div className="bg-body my-favorites">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="pb-2">My Favorites</h1>
                            <FavoriteNavbar />
                        </div>
                        <div className="col-12">
                            { children }
                        </div>
                    </div>
                </div>
            </div>
        </Main>);
    }
}

export default FavoriteLayout;