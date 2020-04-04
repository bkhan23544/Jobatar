import React, { Component } from 'react';
import { Main } from '../../layout';
import { DocumentTitle } from '../../../helpers/DocumentTitle';

class Testimonials extends Component {
    render() {
        const { location } = this.props;
        let search = new URLSearchParams(location.search);
        return (
            <Main onlycontent={search.get("onlycontent")}>
                <DocumentTitle title={`Testimonials`}/>
                <h1>Testimonials</h1>
            </Main>
        );
    }
}

export default Testimonials;