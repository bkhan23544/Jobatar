import { itemService, globalService as gs} from '../../services';
import {alertSelectors} from "../selectors/alert.selectors";
import {processSelectors} from "../selectors/process.selectors";
import {authSelectors, userSelectors, favoriteSelectors} from "../selectors";


const service = (method = "GET", params = null, param2 = null) => {
    return dispatch => {
        dispatch(processSelectors.start());
        itemService.service(method, params, param2 )
            .then(response => {
                if (response.success === true) {
                    dispatch(alertSelectors.success(response.message));
                } else {
                    dispatch(alertSelectors.error(response.message));
                }
                dispatch(processSelectors.stop());
            })
            .catch(exception => {
                gs.showErrors(dispatch, exception, alertSelectors);
                dispatch(processSelectors.stop());
            });
    };
};

const job = (method = "GET", params = null, param2 = null) => {
    return dispatch => {
        dispatch(processSelectors.start());
        itemService.job(method, params, param2)
            .then(response => {
                if (response.success === true){
                    if(params.userItem.is_publish === 'draft') {
                        dispatch(alertSelectors.success('You have successfully saved the job as draft. Please go to "My Jobs", and then select "Drafts" to complete and submit the job posting.'));
                    } else {
                        let action = (method === "POST" && param2 !== null) ? 'update' : 'add';
                        dispatch(alertSelectors.success(`You did successfully ${action} the job post.`));
                        gs.isNotified(response.recipients);
                    }
                } else {
                    let action = (method === "POST" && param2 !== null) ? 'update' : 'add';
                    dispatch(alertSelectors.success(`You did not ${action} the job post.`));
                }
                dispatch(processSelectors.stop());
            })
            .catch(exception => {
                gs.showErrors(dispatch, exception, alertSelectors);
                dispatch(processSelectors.stop());
            });
    };
};

const changePassword = (params) => {
    return dispatch => {
        dispatch(processSelectors.start());
        itemService.changePassword("POST", params )
            .then(response => {
                dispatch(alertSelectors.success(response.message));
                dispatch(processSelectors.stop());
            })
            .catch(exception => {
                gs.showErrors(dispatch, exception, alertSelectors);
                dispatch(processSelectors.stop());
            });
        };
};

const profile = (method = "POST", params = null, key='profile') => {
    return dispatch => {
        dispatch(processSelectors.start());
        itemService.profile(method, params)
            .then(response => {
                if (response.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    gs.storeItem('authentication', response);
                    dispatch(authSelectors.success(response));
                    let message = null;
                    let redirectTo = null;
                    switch(key){
                        case 'profile':
                            message = 'You have updated your profile.';
                            redirectTo = '/user/experience-and-education';
                            //history.push('/user/experience-and-education');
                            break;
                        case 'co-founder':
                            message = 'You have updated your co-founder information.';
                            redirectTo = '/user/stripe-connect';
                            break;
                        case 'avatar':
                            message = 'You have uploaded your picture.';
                        break;
                        default:
                    }
                    if(key !== 'delete_photo') {
                        dispatch(alertSelectors.success(message));
                    }
                    dispatch(processSelectors.stop());
                    redirectTo && gs.navigation(redirectTo);
                }

            })
            .catch(exception => {
                gs.showErrors(dispatch, exception, alertSelectors);
                dispatch(processSelectors.stop());
            });
    };
};


const stripeConnect = (method = "POST", params = null, params2 = null) => {
    return dispatch => {
        dispatch(processSelectors.start());
        itemService.stripeConnect(method, params, params2)
            .then(authentication => {
                if (authentication.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    gs.storeItem('authentication', authentication);
                    dispatch(authSelectors.success(authentication));
                    dispatch(alertSelectors.success('You have successfully connected to stripe.'));
                    dispatch(processSelectors.stop());
                }
                if (authentication.code === false){
                    dispatch(alertSelectors.error(authentication.message));
                }
                dispatch(processSelectors.stop());
            })
            .catch(exception => {
                gs.showErrors(dispatch, exception, alertSelectors);
                dispatch(processSelectors.stop());
            });
    };
};



const stripeDisconnect = (method = "POST", params = null) => {
    return dispatch => {
        dispatch(processSelectors.start());
        itemService.stripeDisconnect(method, params)
            .then(response => {
                if (response.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    gs.storeItem('authentication', response);
                    dispatch(authSelectors.success(response));
                    dispatch(alertSelectors.success('You have successfully updated your profile.'));
                    dispatch(processSelectors.stop());
                }
                dispatch(processSelectors.stop());

            })
            .catch(exception => {
                gs.showErrors(dispatch, exception, alertSelectors);
                dispatch(processSelectors.stop());
            });
    };
};

const stripeRetrieve = (method = "GET") => {
    return dispatch => {
        dispatch(processSelectors.start());
        itemService.stripeRetrieve(method)
            .then(response => {
                if (response) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    let verification = response.account.individual.verification;
                    let status = gs.capitalize(verification.status)
                    let message = `${status}!`;
                    if (verification.details !== null){
                        message = `${status}: ${verification.details}`;
                    }
                    dispatch(alertSelectors.success(message));
                    dispatch(processSelectors.stop());
                }
                dispatch(processSelectors.stop());

            })
            .catch(exception => {
                exception && exception.text().then(message => {
                    const errorMessage = JSON.parse(message);
                    (errorMessage !== undefined) && (errorMessage.message !== undefined) && (errorMessage.message.length > 0) && dispatch(alertSelectors.error(errorMessage.message, errorMessage.code));
                    (errorMessage !== undefined) && (errorMessage.errors !== undefined) && (errorMessage.errors.length > 0) && errorMessage.errors.map(item => dispatch(alertSelectors.error(item)));

                });
                //gs.showErrors(dispatch, exception, alertSelectors);
                dispatch(processSelectors.stop());
            });
    };
};





const experience = (method = "GET", params = null, params2 = null) => {
    return dispatch => {
        dispatch(processSelectors.start());
        itemService.experience(method, params, params2 )
            .then(response => {
                if(method === 'GET') dispatch(userSelectors.experiences(response));
                if(method === 'POST') {
                    dispatch(userActions.experience());
                    if(params2 === null) dispatch(alertSelectors.success('You have add your experience.'));
                    if(params2 !== null) dispatch(alertSelectors.success('You have updated your experience.'));
                }
                if(method === 'DELETE') dispatch(alertSelectors.success('You have deleted your experience.'));
            })
            .catch(exception => {
                gs.showErrors(dispatch, exception, alertSelectors);
                dispatch(processSelectors.stop());
            });
    };
};

const education = (method = "GET", params = null, params2 = null) => {
    return dispatch => {
        dispatch(processSelectors.start());
        itemService.education(method, params, params2 )
            .then(response => {
                if(method === 'GET') dispatch(userSelectors.educations(response));
                if(method === 'POST') {
                    dispatch(userActions.education());
                    if(params2 === null) dispatch(alertSelectors.success('You have add your education.'));
                    if(params2 !== null) dispatch(alertSelectors.success('You have updated your education.'));
                }
                if(method === 'DELETE') dispatch(alertSelectors.success('You have deleted your education.'));
            })
            .catch(exception => {
                gs.showErrors(dispatch, exception, alertSelectors);
                dispatch(processSelectors.stop());
            });
    };
};



const favorite = (method = "GET", params = null, param2 = null) => {
    return dispatch => {
        itemService.favorite(method, params, param2)
            .then(response => {
                if(method === 'GET') dispatch(userSelectors.favorites(response));
                if(method === 'GET') dispatch(favoriteSelectors.job(response));
                if(method === 'POST') dispatch(alertSelectors.success('You have successfully selected a favorite.'));
                if(method === 'DELETE') dispatch(alertSelectors.success('You have successfully removed a favorite.'));
            })
            .catch(exception => {
                gs.showErrors(dispatch, exception, alertSelectors);
                dispatch(processSelectors.stop());
            });
    };
};

const favorites = (method = "GET", params = null, param2 = null) => {
    return dispatch => {
        dispatch(processSelectors.start());
        itemService.favorite(method, params, param2)
            .then(response => {
                if(method === 'GET') dispatch(favoriteSelectors.job(response));
                dispatch(processSelectors.stop());
            })
            .catch(exception => {
                gs.showErrors(dispatch, exception, alertSelectors);
                dispatch(processSelectors.stop());
            });
    };
};

const connection = (method = "GET", params = null, param2 = null) => {
    return dispatch => {
        dispatch(processSelectors.start());
        itemService.connection(method, params, param2 )
            .then(response => {
                if(method === 'GET') dispatch(userSelectors.connections(response));
                if(method === 'POST') dispatch(alertSelectors.success('You have successfully added a connection.'));
                if(method === 'DELETE') dispatch(alertSelectors.success('You have successfully deleted a connection.'));
            })
            .catch(exception => {
                gs.showErrors(dispatch, exception, alertSelectors);
                dispatch(processSelectors.stop());
            });
    };
};

const publicProfile = (method = "GET", params = null, params2 = null) => {
    return dispatch => {
        dispatch(processSelectors.start());
        itemService.profile(method, params, params2)
            .then(response => {
                dispatch(userSelectors.publicProfile(response.user));
                dispatch(processSelectors.stop());
            })
            .catch(exception => {
                gs.showErrors(dispatch, exception, alertSelectors);
                dispatch(processSelectors.stop());
            });
    };
};

export const userActions = {
    service,
    job,
    profile,
    experience,
    education,
    changePassword,
    stripeConnect,
    stripeDisconnect,
    stripeRetrieve,
    publicProfile,
    favorite,
    favorites,
    connection,
};

