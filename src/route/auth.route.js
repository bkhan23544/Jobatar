import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { globalService as gs } from '../common/services';

export const AuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        gs.identity
            ? <Component {...props} {...rest} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
);
