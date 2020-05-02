import React, {Fragment} from 'react';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import ReadMoreReact from 'read-more-react';
import { globalService as gs } from '../../../../common/services';


const ItemView = (props) => {
    const { item, settlement, moduleTitle, itemType, authentication } = props;
    const auth = authentication.authentication.user;
    const pgLinkOwner = (moduleTitle === 'Job') ? `/job/view/${item.id}` : `/service/view/${item.id}`;
    const pgLink = (moduleTitle === 'Job') ? `/user/public/job/view/${item.id}` : `/user/public/service/view/${item.id}`;
    return (
        <div className="card mb-4 serviceInfo">
            <div className="card-body">
                <h2 className="font-black text-left">{`${moduleTitle} Information`}</h2>
                <div className="image">
                    {console.log(item)}
                    {item.cover && <Link to={(auth.id === item.user_id) ? pgLinkOwner : pgLink}>
                        <img className="img-fluid" src={item.cover} alt="Images" />
                        </Link>}
                    {(moduleTitle === 'Service') && <div className="fixed badge badge-primary">{settlement}</div>}
                </div>
                <div className="text">
                    <h5><Link to={(auth.id === item.user_id) ? pgLinkOwner : pgLink}>{item.title}</Link></h5>

                    {/* (moduleTitle === 'Job') && <div className="fixed badge badge-primary" style={{padding: '10px 25px', fontSize: '14px', marginBottom: '6px'}}>{settlement}</div> */}
                    {(moduleTitle === 'Job') && <div className="label labeled-success text-capitalize" >{itemType}</div>}

                    <ReadMoreReact className="custom-description" text={gs.html2text(item && item.description)} min={120} ideal={150} max={200} readMoreText={'Read More'} />
                    {(moduleTitle === 'Service') &&
                        <Fragment>
                            {item.sold_count && <div className="sold w-100">{item.sold_count} Service Sold</div>}
                            <div className="rating d-flex align-items-center w-100 mb-3">
                                <small>({item.avg_rating})</small>
                                <Box component="fieldset" mx={1.0} borderColor="transparent">
                                    <Rating value={parseInt(item.avg_rating)} readOnly size="small" />
                                </Box>
                                <small className="count">({item.proposal_count})</small>
                            </div>
                        </Fragment>
                    }
                    {settlement === 'cash' && <div className="price"><big>${item.budget}</big></div>}
                </div>
            </div>
        </div>
    )
};

const authenticationSelector = createSelector(
    state => state.authentication,
    authentication => authentication
);

const userSelector = createSelector(
    state => state.user,
    user => user
);

const mapStateToProps = createSelector(
    userSelector,
    authenticationSelector,
    (user, authentication) => ({
        user,
        authentication
    })
);

export default connect(mapStateToProps)(ItemView);
