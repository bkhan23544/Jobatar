import React from 'react';
import {connect} from 'react-redux';
import {Main} from "../../layout";
import {createSelector} from "reselect";
import {authActions} from "../../../common/redux/actions";


class DashBoard extends React.Component {

    constructor(props) {

        super(props);
        // reset login status
        this.onLogout = this.onLogout.bind(this);
    }

    onLogout(){
        const {dispatch} = this.props;
        dispatch(authActions.logout());
    }
    render() {

        return (<Main>

                <div className="col-md-6 col-md-offset-3">
                    DashBoard
                    <p>
                        <button onClick={this.onLogout}>Logout</button>
                    </p>
                </div>
            </Main>
        );
    }
}


const authSelector = createSelector(
    state => state.authentication,
    authentication => authentication
);

const mapStateToProps = createSelector(
    authSelector,
    (authentication) => ({
        authentication
    })
);

export default connect(mapStateToProps)(DashBoard);

