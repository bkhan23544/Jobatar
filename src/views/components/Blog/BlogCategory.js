import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { blogAction } from '../../../common/redux/actions';
import Pagination from '../../../helpers/Pagination';
import { DocumentTitle } from '../../../helpers/DocumentTitle';
import moment from "moment";
import { FreelancerListLoader } from '../../../common/loaders';

class BlogCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            moduleId: 'blog',
            category_slug: '',
            page: 1,
            pagesize: 30,
        }
    }

    componentWillMount() {
        this.onRouteChanged();
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            if(this.props.match.params.slug !== 'all') {
                this.setState({ category_slug: this.props.match.params.slug }, () => this.onRouteChanged());
            } else {
                this.setState({ category_slug: null }, () => this.onRouteChanged());
            }
            if(prevProps.match.params.slug !== this.props.match.params.slug) {
                //this.onRouteChanged();
            }
        }
    }

    onRouteChanged = () => {
        const { dispatch } = this.props;
        dispatch(blogAction.item("GET", null, this.state));
    };

    onChangePage = (page) => {
        this.setState({ page });
        //this.onRouteChanged();
    };

    render() {
        const { pagesize } = this.state;
        const { blog, process } = this.props;
        let items = blog.list ? blog.list.items : [];
        return (
            <div className="w-100">
                <DocumentTitle title={'Blog'}/>
                <div className="row">
                {(process.loading) ? <Fragment>{[1,2].map(item => <div className="col-md-6 col-12" key={item}><FreelancerListLoader listCount={0} /></div>)}</Fragment> : <Fragment>
                    {items && items.length === 0 && <div className="col">Blog not found</div>}
                    {items && items.map((item) =>
                        <div className="col-md-6 col-12" key={item.id}>
                            <div className="blog-box mb-4">
                                {item && item.blog_image && 
                                    <div className="image">
                                        <img src={item.blog_image && item.blog_image.path} alt="" className="img-fluid" />
                                    </div>
                                }
                                <div className="caption">
                                    <h4 className="text-truncate"><Link to={`/press-release/${item.slug}`}>{item.title}</Link></h4>
                                    <div className="date pl-0">{moment(item.created_at * 1000).format('LL')} | <span className="text-primary">{(item && item.created_by) ? item.created_by : 'JoBarter Team'}</span></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="col-12">
                        <Pagination className="justify-content-end"
                            pageSize={pagesize}
                            totalCount={(blog && blog.list && blog.list.pagination && blog.list.pagination.totalCount) ? blog.list.pagination.totalCount : 10}
                            onChangePage={this.onChangePage} />
                    </div>
                    </Fragment>}
                </div>
            </div>
        );
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

export default connect(mapStateToProps)(BlogCategory);