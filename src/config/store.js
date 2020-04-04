import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
//import { createLogger } from 'redux-logger';
import rootReducer from '../common/redux/reduers';

//const loggerMiddleware = createLogger();
const allStoreEnhancer = compose(
    applyMiddleware(thunkMiddleware),
   // (process.env.NODE_ENV === 'development') ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : null
);

export const store = createStore(
    rootReducer, {
        user: null,
    },
    allStoreEnhancer
);