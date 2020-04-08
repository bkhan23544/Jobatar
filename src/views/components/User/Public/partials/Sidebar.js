import React, { useState } from 'react';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { userActions } from '../../../../../common/redux/actions';
import { defaultService } from '../../../../../common/services/default.service';
import { globalService as gs } from '../../../../../common/services';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share';

const Sidebar = (props) => {
    const { user, authentication } = props;
    let auth = authentication ? authentication.authentication.user : {};
    let item = user ? user.user.userProfile : {};
    let language = user ? user.user.languages : [];
    const lans = ( typeof language === 'string' )  ? [ language ] : language;
    const languages = (lans === null) ? [] : lans;
    const [value, setValue] = useState(false);
    const handleUpload = (e) => {
        const { dispatch } = props;
        setValue(true);
        defaultService.uploadAndProgress(e.target.files, dispatch).then((res) => {
            let fileId = res.files[0].id;
            dispatch(userActions.profile("POST", {userProfile: {avatar_id: fileId}}, 'avatar'));
            setValue(false);
        });
    };
    return (
        <div className="card mb-4 card-profile">
            <div className="card-body px-0">
                {((item && item.is_verified === 2) && (item && item.userProfilePlatforms.length > 0)) && <div className="verified text-right px-3"><i className="fas fa-shield-alt text-success"></i> Verified</div>}
                <figure className="text-center px-3 d-flex align-items-center justify-content-center">
                    <div className="pic rounded-circle">
                        <img className="img-fluid rounded-circle border" alt="profile" width="145" height="145" src={((user && user.user.id) === (auth && auth.id)) ? auth.avatar : user && user.user.avatar} />
                        {((user && user.user.id) === (auth && auth.id)) &&
                            <label className="btn btn-info btn-upload">
                                <i className="fas fa-camera-retro"></i>
                                <input type="file" accept="image/*" onChange={handleUpload} />
                            </label>}
                        {value && <div className="loader rounded-circle"><span></span> <span></span></div>}
                    </div>
                </figure>
                <div className="px-3">
                    <h3 className="profile-heading">{item && item.name}</h3>
                    <div className="designation">{item && item.title} {/* UI/UX Designer, Social MediaDesigner */}</div>
                    <div className="address"><i className="fas fa-map-marker-alt icon-color"></i> {item && item.countryCode && item.countryCode.name}
                    </div>
                </div>
                <hr />
                <div className="sharing px-3">
                    <h5 className="profile-heading">Share my profile</h5>
                    <ul className="social-login nav nav-pills justify-content-center px-3">
                        <li>
                            <FacebookShareButton
                                url={`${gs.rootUrl}/user/public/co-founder/${item && item.user_id}`}
                                quote={item && item.name}
                                className="share-button">
                                <i className="fab fab fa-facebook-f icon-color"></i>
                            </FacebookShareButton>
                        </li>
                        <li>
                            <TwitterShareButton
                                url={`${gs.rootUrl}/user/public/co-founder/${item && item.user_id}`}
                                title={item && item.name}
                                className="share-button">
                                <i className="fab fa-twitter icon-color"></i>
                            </TwitterShareButton>
                        </li>
                        <li>
                            <LinkedinShareButton
                                url={`${gs.rootUrl}/user/public/co-founder/${item && item.user_id}`}
                                windowWidth={750}
                                windowHeight={600}
                                className="share-button">
                                <i className="fab fab fa-linkedin-in icon-color"></i>
                            </LinkedinShareButton>
                        </li>
                    </ul>
                </div>
                <div className="since text-center px-3">Member since <big>{user && user.user.since}</big></div>
                <hr className="mb-3" />
                <div className="languages sharing px-3">
                    <h5 className="profile-heading">Languages</h5>
                    {/*languages && languages.map((lang) => (<span className="mr-2" key={lang}>{lang}</span>)) */}
                    <span>{languages && languages.join(', ')}</span>
                </div>
            </div>
        </div>
    )
};

const processSelector = createSelector(
    state => state.process,
    process => process
);

const userSelector = createSelector(
    state => state.user,
    user => user
);

const uploadSelector = createSelector(
    state => state.upload,
    upload => upload
);

const authenticationSelector = createSelector(
    state => state.authentication,
    authentication => authentication
);

const mapStateToProps = createSelector(
    processSelector,
    userSelector,
    uploadSelector,
    authenticationSelector,
    (process, user, upload, authentication) => ({
        process, user, upload, authentication
    })
);

export default connect(mapStateToProps)(Sidebar);
