import React, {Fragment} from 'react';

import {connect} from 'react-redux';
import {withSnackbar} from 'notistack';
import {createSelector} from "reselect";
import {Button} from "@material-ui/core";

class Notifier extends React.Component {

    componentDidUpdate() {
        const {alert, enqueueSnackbar, closeSnackbar} = this.props;
        if (alert) {
            const action = (key) => (
                <Fragment>
                    <Button className="text-white" style={{fontSize: '10px'}} onClick={() => {
                        closeSnackbar(key)
                    }}>
                        {'Dismiss'}
                    </Button>
                </Fragment>
            );

            enqueueSnackbar && enqueueSnackbar((alert.message ? alert.message : ''), {
                action,
                variant: alert.type,
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            });
        }
    }

    render() {
        return null;
    }
}

const alertSelector = createSelector(
    state => state.alert,
    alert => alert
);


const mapStateToProps = createSelector(
    alertSelector,
    (alert) => ({
        alert
    })
);

export default withSnackbar(connect(mapStateToProps)(Notifier));
