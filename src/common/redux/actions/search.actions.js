import { processSelectors, searchSelectors } from "../selectors";
import { itemService } from "../../services";

const freelancers = (method = "GET", params = null) => {
    return dispatch => {
        dispatch(processSelectors.start());
        itemService.users(method, params)
            .then(response => {
                dispatch(searchSelectors.freelancers(response));
                dispatch(processSelectors.stop());
            })
            .catch(exception => {
                console.log( exception );
            });
    };
};

//services search
const services = (method = "GET", params = null) => {
    return dispatch => {
        dispatch(processSelectors.start());
        itemService.services(method, null, params)
            .then(response => {
                dispatch(searchSelectors.services(response));
                dispatch(processSelectors.stop());
            })
            .catch(exception => {
                console.log(exception);
            });
    };
};
//jobs search
const jobs = (method = "GET", params = null) => {
    return dispatch => {
        dispatch(processSelectors.start());
        itemService.jobs(method, params)
            .then(response => {
                dispatch(searchSelectors.jobs(response));
                dispatch(processSelectors.stop());
            })
            .catch(exception => {
                console.log( exception );
            });
    };
};

const clear = () => {
    return dispatch => {
        dispatch(searchSelectors.clear());
    };
};


export const searchActions = {
    freelancers,
    jobs,
    services,
    clear
};
