import { itemService, globalService as gs } from '../../services';
import { processSelectors, favoriteSelectors, alertSelectors } from "../selectors";

const favorites = (method = "GET", params = null, param2 = null, key = null) => {
    return dispatch => {
        dispatch(processSelectors.start());
        itemService.favorite(method, params, param2)
            .then(response => {
                switch(key){
                    case 'jobs':
                        if(method === 'GET') dispatch(favoriteSelectors.jobs(response));
                        break;
                    case 'freelancer':
                        if(method === 'GET') dispatch(favoriteSelectors.freelancers(response));
                        break;
                    case 'co-founder':
                        if(method === 'GET') dispatch(favoriteSelectors.freelancers(response));
                        break;
                    case 'services':
                        if(method === 'GET') dispatch(favoriteSelectors.services(response));
                        break;
                    default:
                }
                dispatch(processSelectors.stop());
            })
            .catch(exception => {
                gs.showErrors(dispatch, exception, alertSelectors);
                dispatch(processSelectors.stop());
            });
    };
};

const connections = (method = "GET", params = null, param2 = null) => {
    return dispatch => {
        dispatch(processSelectors.start());
        itemService.connection(method, params, param2)
            .then(response => {
                if(method === 'GET') dispatch(favoriteSelectors.connections(response));
                dispatch(processSelectors.stop());
            })
            .catch(exception => {
                gs.showErrors(dispatch, exception, alertSelectors);
                dispatch(processSelectors.stop());
            });
    };
};

const add = (data = null, key = null) => {
    return dispatch => {
        switch(key){
            case 'jobs':
                dispatch(favoriteSelectors.jobAdd(data));
                break;
            case 'freelancer':
                dispatch(favoriteSelectors.freelancerAdd(data));
                break;
            case 'co-founder':
                dispatch(favoriteSelectors.freelancerAdd(data));
                break;
            case 'connections':
                dispatch(favoriteSelectors.connectionsAdd(data));
                break;
            case 'services':
                dispatch(favoriteSelectors.serviceAdd(data));
                break;
            default:
        }
    };
};

const remove = (data = null, key = null) => {
    return dispatch => {
        switch(key){
            case 'jobs':
                dispatch(favoriteSelectors.jobRemove(data));
                break;
            case 'freelancer':
                dispatch(favoriteSelectors.freelancerRemove(data));
                break;
            case 'co-founder':
                dispatch(favoriteSelectors.freelancerRemove(data));
                break;
            case 'connections':
                dispatch(favoriteSelectors.connectionsRemove(data));
                break;
            case 'services':
                dispatch(favoriteSelectors.serviceRemove(data));
                break;
            default:
        }
        //dispatch(favoriteSelectors.remove(data));
    };
};

const clear = () => {
    return dispatch => {
        dispatch(favoriteSelectors.clear());
    };
};



export const favoriteActions = {
    favorites,
    add,
    connections,
    remove,
    clear
};

