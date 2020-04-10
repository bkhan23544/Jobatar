import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const propTypes = {
    onChangePage: PropTypes.func.isRequired,
    initialPage: PropTypes.number,
    pageSize: PropTypes.number,
    className: PropTypes.string,
    totalCount: PropTypes.number
};

const defaultProps = {
    initialPage: 1,
    pageSize: 20
};

class Pagination extends React.Component {

    constructor(props) {
        super(props);
        this.state = { pager: {} };
    }

    componentWillMount() {
        if (this.props.totalCount && this.props.totalCount) {
            this.setPage(this.props.initialPage);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.totalCount !== prevProps.totalCount) {
            this.setPage(this.props.initialPage);
        }
    }

    setPage(page) {
        var { pageSize, totalCount } = this.props;
        var pager = this.state.pager;

        if (page < 1 || page > pager.totalPages) {
            return;
        }
        pager = this.getPager(totalCount, page, pageSize);

        /*
            var itemsArr = [];
            for(let a = 0; a<= totalCount; a++) {
                itemsArr.push(a);
            }
            var pageOfItems = itemsArr.slice(pager.startIndex, pager.endIndex + 1);
        */

        this.setState({ pager: pager });
        this.props.onChangePage(page);
    }

    getPager(totalItems, currentPage, pageSize) {

        currentPage = currentPage || 1;

        pageSize = pageSize || 10;

        var totalPages = Math.ceil(totalItems / pageSize);

        var startPage, endPage;
        if (totalPages <= 5) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 3) {
                startPage = 1;
                endPage = 5;
            } else if (currentPage + 2 >= totalPages) {
                startPage = totalPages - 4;
                endPage = totalPages;
            } else {
                startPage = currentPage - 2;
                endPage = currentPage + 2;
            }
        }

        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    render() {
        var pager = this.state.pager;

        if (!pager.pages || pager.pages.length <= 1) {

            return null;
        }
        console.log(pager)
        return (
            <ul className={`pagination ${this.props.className ? this.props.className : ''}`}>
                {/* <li className={'page-item ' + (pager.currentPage === 1 ? 'disabled' : '')}>
                    <Link className="page-link" to="#" onClick={() => this.setPage(1)}>First</Link>
                </li> */}
                <li>
                    <Link  to="#" onClick={() => this.setPage(pager.currentPage - 1)}><i class="fa fa-angle-left" aria-hidden="true"></i></Link>
                </li>
                {pager.pages.map((page, index) =>
                    <li key={index} className={`${(pager.currentPage === page ? 'active' : '')}`}>
                        <Link  to="#" onClick={() => this.setPage(page)}>{page}</Link>
                    </li>
                )}
                <li>
                    <Link to="#" onClick={() => this.setPage(pager.currentPage + 1)}><i class="fa fa-angle-right" aria-hidden="true"></i></Link>
                </li>
                {/* <li className={'page-item ' + (pager.currentPage === pager.totalPages ? 'disabled' : '')}>
                    <Link className="page-link" to="#" onClick={() => this.setPage(pager.totalPages)}>Last</Link>
                </li> */}
            </ul>
        );
    }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;
export default Pagination;
