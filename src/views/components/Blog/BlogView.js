import React, { Component } from 'react';
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { Main } from '../../layout';
import { DocumentTitle } from '../../../helpers/DocumentTitle';
import moment from "moment";
import { blogAction } from '../../../common/redux/actions';
import { FormLoader } from '../../../common/loaders';
import { Link } from 'react-router-dom';
import { globalService as gs } from '../../../common/services';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share';

class BlogView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: null,
        }
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(blogAction.item("GET", null, {slug: this.props.match.params.slug}));
    }

    render() {
        const { location, blog, process } = this.props;
        let item = blog.list ? blog.list.item : [];
        let search = new URLSearchParams(location.search);

        return (<Main onlycontent={search.get("onlycontent")}>
                <DocumentTitle title={item && item.title}/>
                <div className="bIndividual">
                    <div className="container bg-white">
                        <div className="row">
                            <div className="col-12">
                                {(process.loading) ? <div className="py-3"><FormLoader listCount={3} /></div> : 
                                <div className="content py-3 h-auto">
                                    {item && item.blog_image && <figure><img src={item.blog_image && item.blog_image.path} alt="" className="img-fluid" /></figure>}

                                    <h2 className="text-center">{item && item.title}</h2>
                                    <ul className="updated d-flex align-items-center flex-wrap">
                                        <li className="">{moment(item && item.created_at * 1000).format('LL')}</li>
                                        <li className="text-primary">{(item && item.created_by) ? item.created_by : 'JoBarter Team'}</li>
                                    </ul>
                                    <div className="details border-bottom-0">
                                        <div dangerouslySetInnerHTML={{__html: item && item.content}}></div>
                                    </div>

                                    <div className="tags border-top d-flex flex-wrap align-items-center justify-content-center">
                                        <div className="d-flex align-items-center col pl-0">
                                            <big>Tag:</big>
                                            <ul className="chip d-flex align-items-center mb-0">
                                                <li><Link to="#" className="active">Sales</Link></li>
                                                <li><Link to="#">Tyre</Link></li>
                                                <li><Link to="#">DIY</Link></li>
                                                <li><Link to="#">Medical</Link></li>
                                                <li><Link to="#">Transport</Link></li>
                                            </ul>
                                        </div>
                                        <div className="sharing d-flex align-items-center">
                                            <big>Share this blog</big>
                                            <ul className="d-flex ">
                                                <li>
                                                    <FacebookShareButton
                                                        url={`${gs.rootUrl}/press-release/${item && item.slug}`}
                                                        quote={item && item.title}
                                                        className="share-button">
                                                        <i className="fab fab fa-facebook-f"></i>
                                                    </FacebookShareButton>
                                                </li>
                                                <li>
                                                    <TwitterShareButton
                                                        url={`${gs.rootUrl}/press-release/${item && item.slug}`}
                                                        title={item && item.title}
                                                        className="share-button">
                                                        <i className="fab fa-twitter"></i>
                                                    </TwitterShareButton>
                                                </li>
                                                <li>
                                                    <LinkedinShareButton
                                                        url={`${gs.rootUrl}/press-release/${item && item.slug}`}
                                                        windowWidth={750}
                                                        windowHeight={600}
                                                        className="share-button">
                                                        <i className="fab fab fa-linkedin-in"></i>
                                                    </LinkedinShareButton>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </Main>);
    }
}

const processSelector = createSelector(
    state => state.process,
    process => process
);

const blogSelector = createSelector(
    state => state.blog,
    blog => blog
);

const mapStateToProps = createSelector(
    processSelector,
    blogSelector,
    (process, blog) => ({
        process, blog
    })
);

export default connect(mapStateToProps)(BlogView);