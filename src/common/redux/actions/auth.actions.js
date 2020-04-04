import { globalService as gs, authService } from '../../services';
import { alertSelectors, processSelectors, authSelectors } from "../selectors";

const login = (params) => {
    return dispatch => {
        dispatch(processSelectors.start());
        authService.login(params)
            .then(authentication => {
                // login successful if there's a jwt token in the response
                if (authentication.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    gs.storeItem('authentication', authentication);
                    gs.storeItem('token', authentication.token);
                    dispatch(authSelectors.success(authentication));
                    dispatch(alertSelectors.success(authentication.message));
                    dispatch(processSelectors.stop());
                    gs.firebaseLogin(params.username)
                        .then((user) => {
                            if (user) {
                                gs.navigation('service-search', true);
                            }
                        });
                }
            })
            .catch(exception => {
                //console.log('exception', exception);
                // if(exception.statusText === 'Unauthorized') dispatch(alertSelectors.unVerified('Registered successfully, please check your email for verification', exception.code));
                exception && exception.text().then(message => {
                    const errorMessage = JSON.parse(message);
                    (errorMessage !== undefined) && (errorMessage.message !== undefined) && (errorMessage.message.length > 0) && dispatch(alertSelectors.unVerified(errorMessage.message, errorMessage.code));
                    (errorMessage !== undefined) && (errorMessage.errors !== undefined) && (errorMessage.errors.length > 0) && errorMessage.errors.map(item => dispatch(alertSelectors.error(item)));

                });
                //  gs.showErrors(dispatch, exception, alertSelectors);
                dispatch(processSelectors.stop());
            });
    };
};


const loginByAuth = (params, params2) => {

    return dispatch => {
        dispatch(processSelectors.start());
        authService.loginByAuth(params, params2).then(authentication => {
            // login successful if there's a jwt token in the response
            if (authentication.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                gs.storeItem('authentication', authentication);
                gs.storeItem('token', authentication.token);
                dispatch(authSelectors.success(authentication));
                dispatch(alertSelectors.success(authentication.message));
                dispatch(processSelectors.stop());
                gs.navigation('welcome', true);
            }
        })
            .catch(exception => {
                gs.firebaseLogout();
                exception && exception.text().then(message => {
                    const errorMessage = JSON.parse(message);
                    (errorMessage !== undefined) && (errorMessage.message !== undefined) && (errorMessage.message.length > 0) && dispatch(alertSelectors.unVerified(errorMessage.message, errorMessage.code));
                    (errorMessage !== undefined) && (errorMessage.errors !== undefined) && (errorMessage.errors.length > 0) && errorMessage.errors.map(item => dispatch(alertSelectors.error(item)));

                });
                //  gs.showErrors(dispatch, exception, alertSelectors);
                dispatch(processSelectors.stop());
            });
    }
};

const register = (data) => {

    return dispatch => {
        dispatch(processSelectors.start());
        authService.register(data)
            .then(response => {
                dispatch(alertSelectors.success(response.message));
                dispatch(processSelectors.stop());
                //gs.firebaseRegister(data.email);
                gs.navigation('home');
                gs.messageAlert('Check your email to complete the sign up process.');
            })
            .catch(exception => {
                exception.text().then(errorMessage => {
                    const errors = JSON.parse(errorMessage).errors.join(',');
                    dispatch(alertSelectors.error(errors));
                    dispatch(processSelectors.stop());
                })
            });
    };
};

const forgotPassword = (data) => {
    return dispatch => {
        dispatch(processSelectors.start());
        authService.forgotPassword(data)
            .then(response => {
                dispatch(alertSelectors.success(response.message));
                dispatch(processSelectors.stop());
                gs.navigation('home');
            })
            .catch(exception => {
                exception.text().then(errorMessage => {
                    const errors = JSON.parse(errorMessage).errors.join(',');
                    dispatch(alertSelectors.error(errors));
                    dispatch(processSelectors.stop());
                })
            });
    };
};

const resetPassword = (params = null, params2 = null) => {
    return dispatch => {
        dispatch(processSelectors.start());
        authService.resetPassword(params, params2)
            .then(response => {
                dispatch(alertSelectors.success(response.message));
                dispatch(processSelectors.stop());
                gs.navigation('home');
            })
            .catch(exception => {
                exception.text().then(errorMessage => {
                    const errors = JSON.parse(errorMessage).errors.join(',');
                    dispatch(alertSelectors.error(errors));
                    dispatch(processSelectors.stop());
                })
            });
    };
};

const emailVerification = (token) => {
    return dispatch => {
        dispatch(processSelectors.start());
        authService.emailVerification(null, { token: token })
            .then(response => {
                dispatch(alertSelectors.success(response.message));
                dispatch(processSelectors.stop());
                gs.navigation('login', true);
            })
            .catch(exception => {
                console.log(exception);
                exception.text().then(errorMessage => {
                    const errors = JSON.parse(errorMessage).errors.join(',');
                    dispatch(alertSelectors.error(errors));
                    dispatch(processSelectors.stop());
                })
            });
    };
};

const resendVerification = (params = null, params2 = null) => {
    return dispatch => {
        //dispatch(processSelectors.start());
        authService.resendVerification(params, params2)
            .then(response => {
                dispatch(alertSelectors.success(response.message));
                dispatch(processSelectors.stop());
            })
            .catch(exception => {
                console.log(exception);
                exception.text().then(errorMessage => {
                    const errors = JSON.parse(errorMessage).errors.join(',');
                    dispatch(alertSelectors.error(errors));
                    dispatch(processSelectors.stop());
                })
            });
    };
};

const logout = () => {
    return dispatch => {
        dispatch(processSelectors.start());
        authService.logout()
            .then(response => {
                gs.logout();
                dispatch(authSelectors.logout(response.message));
                dispatch(alertSelectors.success('Logout Successful.'));
                dispatch(processSelectors.stop());
                gs.navigation('logout');
            })
            .catch(exception => {
                exception.text().then(errorMessage => {
                    const errors = JSON.parse(errorMessage).errors.join(',');
                    dispatch(alertSelectors.error(errors));
                    dispatch(processSelectors.stop());
                })
            });
    };
};




export const authActions = {
    login,
    loginByAuth,
    register,
    logout,
    forgotPassword,
    resetPassword,
    emailVerification,
    resendVerification,
};
