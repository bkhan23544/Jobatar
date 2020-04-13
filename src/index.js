import React, {Suspense, lazy} from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { configureUrlQuery } from 'react-url-query';
/* Redux Provider init*/
import {Provider} from 'react-redux';
import {store} from './config/store';
import { SnackbarProvider } from 'notistack';
import "./bootstrap.scss";
import "./style.scss";
import "./ali.scss";
// import 'animate.min.css'
import { history } from './helpers/history';
import './assets/css/bootstrap.min.css'
// import './assets/css/font-awesome.min.css';
// import './assets/css/base.css';
import "react-image-gallery/styles/scss/image-gallery.scss";

configureUrlQuery({ history, addChangeHandlers: false });
const App = lazy(() => import('./App')) ;

ReactDOM.render(
    <Provider store={store} >
        <SnackbarProvider maxSnack={2} >
            <Suspense fallback={<div className="app-loading"><div className="loading"></div></div>}>
                    <App siteName="JoArter"/>
            </Suspense>
        </SnackbarProvider>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
