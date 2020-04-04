import React, { Component, Fragment } from 'react';
import { Main } from '../../layout';
import BlogCategory from './BlogCategory';
import { Route, NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import { createSelector } from "reselect";
import {history} from '../../../helpers/history';
import { DocumentTitle } from '../../../helpers/DocumentTitle';
import { blogAction } from '../../../common/redux/actions';

class BlogList extends Component {
    componentDidMount() {
        history.push(`/blog/category/all`);
        const { dispatch, blog } = this.props;
        Object.getOwnPropertyNames(blog).length === 0 && dispatch(blogAction.categories("GET", null, { parent_id: 2 }));
    }

    // componentDidUpdate(prevProps) {
    //     if (this.props.location !== prevProps.location) {
    //         history.push(`/blog/category/all`);
    //     }
    // }

    render() {
        const params = this.props.match;
        const { blog } = this.props;
        let categories = blog.categories ? blog.categories.items : [];
        //console.log(categories);
        return (<Main>
            <DocumentTitle title={`Blog`}/>
            <div className="blog-page" >
                <div className="heading border-bottom">
                    <img src="/images/articlebg.png" alt="" className="img-fluid" />
                    <div className="caption d-flex align-items-center justify-content-center w-100 h-100">
                        <h1 className="text-center mt-4 mt-lg-4 pb-3">Blogs</h1>
                    </div>
                </div>
                <div className="container">
                    <Route path={params.url} exact render={() => (<Fragment>                        
                        <div className="row">
                            <div className="col-12 mb-3 mb-lg-5">
                                <ul className="nav nav-tabs justify-content-center">
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to={`/blog/category/all`}>All</NavLink>
                                    </li>
                                    {categories && categories.map((item) =>
                                        <li className="nav-item" key={item.category_id}>
                                            <NavLink className="nav-link" to={`/blog/category/${item.slug}`}>{item.name}</NavLink>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                        <Route path={`/blog/category/:slug`} component={BlogCategory}/>
                    </Fragment>)}/>
                    
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

export default connect(mapStateToProps)(BlogList);