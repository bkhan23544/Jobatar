import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";
import Header from "./Header";
import Footer from './Footer';
import {globalService as gs} from "../../common/services";

class Main extends Component {

    render() {
        const { children, history, onlycontent } = this.props;
        //console.log('this.props', this.props)
        return (
            <Fragment>
                {(parseInt(onlycontent) !== parseInt(1)) && <Header history={history} />}
                <main className="all-content">
                    {children}
                </main>
                {(parseInt(onlycontent) !== parseInt(1)) && <Footer />}
            </Fragment>
        );
    }
}

Main.propTypes = {
    children: PropTypes.node,
};

export default Main;
