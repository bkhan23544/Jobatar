import React from 'react';
import {connect} from 'react-redux';
import {Main} from "../../layout";
import {createSelector} from "reselect";
import {authActions} from "../../../common/redux/actions";
import { userActions } from '../../../common/redux/actions';


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

    async componentWillMount() {
        const { dispatch, match } = this.props;
        let id = match.params.id;
        dispatch(userActions.publicProfile("GET", null, {item_id: id}));
        dispatch(userActions.experience("GET", null, {user_id: id}));
        dispatch(userActions.education("GET", null, {user_id: id}));
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            const { dispatch } = this.props;
            let id = this.props.match.params.id;
            dispatch(userActions.publicProfile("GET", null, {item_id: id}));
            dispatch(userActions.experience("GET", null, {user_id: id}));
            dispatch(userActions.education("GET", null, {user_id: id}));
        }
    }

    getYear = (date) => {
        let nedDate = [];
        //return new Date(date).getFullYear();
        nedDate.push(new Date(date).getMonth());
        nedDate.push(new Date(date).getFullYear());
        return nedDate.join("/ ")
    };



    render() {
        const { user, process, experiences, educations } = this.props;
        let about = user ? user.user.userProfile : {};
        const experienceItems = experiences.data ? experiences.data.items : [];
        const educationsItems = educations.data ? educations.data.items : [];
        console.log(about.name,"ysered")


        return (<Main>

                <div className="col-md-6 col-md-offset-3">
                    {about.name}
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



const processSelector = createSelector(
    state => state.process,
    process => process
);

const userSelector = createSelector(
    state => state.user,
    user => user
);

const experienceSelector = createSelector(
    state => state.experiences,
    experiences => experiences
);

const educationSelector = createSelector(
    state => state.educations,
    educations => educations
);

const mapStateToProps = createSelector(
    processSelector,
    userSelector,
    experienceSelector,
    educationSelector,
    authSelector,
    (process, user, experiences, educations,authentication) => ({
        process, user, experiences, educations,authentication
    })
);



export default connect(mapStateToProps)(DashBoard);

