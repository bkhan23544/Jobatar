import React, { Component } from 'react';
import { Main } from '../../layout';
import { DocumentTitle } from '../../../helpers/DocumentTitle';

class Media extends Component {
    render() {
        const { location } = this.props;
        let search = new URLSearchParams(location.search);
        return (
            <Main onlycontent={search.get("onlycontent")}>
                <DocumentTitle title={`Media`}/>
                <div className="container contant-pages">
                    <div className="row">
                        <div className="col-12">
                            <h1>Media</h1>

                            <ul className="check-list">
                                <li>
                                    <a target="_blank" rel="noopener noreferrer" href={`http://blogs.bsg.ox.ac.uk/2019/12/02/the-future-of-work-in-america/`}>The future of work in America, Blavatnik School of Government, University of Oxford.</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Main>
        );
    }
}

export default Media;