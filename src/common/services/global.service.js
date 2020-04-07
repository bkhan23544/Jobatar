import { SCHEMA, DOMAIN, REACT_APP_IS_WEB, REACT_APP_FIREBASE_PASSWORD } from 'react-native-dotenv';
import { storageHelper, navigationHelper, alertHelper, firebaseConfig as FC } from '../../config';
const apiRoot = process.env.REACT_APP_API_ROOT ? process.env.REACT_APP_API_ROOT : `${"https"}://api.${"jobarter.com"}`;
const rootUrl = process.env.REACT_APP_HOSTNAME ? process.env.REACT_APP_HOSTNAME : `${"https"}://${"jobarter.com"}`;
const uploadRoot = process.env.REACT_APP_STORAGE ? process.env.REACT_APP_STORAGE : `${"https"}://uploads.${"jobarter.com"}`;
const isWeb = process.env.REACT_APP_IS_WEB ? process.env.REACT_APP_IS_WEB : REACT_APP_IS_WEB;
const firebasePassword = process.env.REACT_APP_FIREBASE_PASSWORD ? process.env.REACT_APP_FIREBASE_PASSWORD : REACT_APP_FIREBASE_PASSWORD;

const parseItem = (key) => {
    let auth = storageHelper.getItem(key);
    return auth ? auth : null;
};

const identity = parseItem('authentication');
const token = parseItem('token');
const authToken = () => {
    return (token) ? token : null;
};

const authHeader = () => {
    const headers = (token) ? ({ 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }) : ({ 'Content-Type': 'application/json' });
    return headers;
};

const logout = () => {
    // remove user from local storage to log user out
    storageHelper.removeItem('authentication');
    storageHelper.removeItem('token');
    firebaseLogout();
    fbLogout();
};
const fbLogout = () =>{

}

const clearAll = () => {
    logout();
}

const storeItem = (key, data) => {
    // remove user from local storage to log user out
    storageHelper.setItem(key, data);
};

const firebase = FC;
const db = FC.db;
const storage = FC.storage;
const app = FC.app;
const auth = app.auth();
const ref = db.ref();

const sendToFirebase = async (ref, data) => {
    return await db.ref(ref).set(data);
};

const isNotified = (recipients) => {
    recipients && recipients.map(async (recipient_id) => {
        await db.ref(`User/${recipient_id}`).update({ 'is_notified': Date.now() });
    });
    return true;
};

const firebaseRegister = (username) => {
    const authentication = parseItem('authentication');
    const user = authentication && authentication.user;
    const auth = app.auth();
    return auth
        .createUserWithEmailAndPassword(username, firebasePassword)
        .then((authUser) => {
            sendToFirebase(`/User/${user.id}`, user);
        }).catch(function (error) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Register Error:", errorCode, errorMessage);
        });
};

const firebaseLogin = async (username) => {
    const authentication = await parseItem('authentication');
    const user = authentication && authentication.user;
    const auth = app.auth();
   // console.log(username , " === " ,firebasePassword);
    return await auth.signInWithEmailAndPassword(username, firebasePassword)
        .then((auth) => {
            sendToFirebase(`/User/${user.id}`, user);
            return auth;
        })
        .catch(async (error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            if (errorCode === 'auth/user-not-found') {
                return await firebaseRegister(username);
            }
        });
};



const firebaseUpdatePassword = (newPassword) => {
    const user = app.auth().currentUser;
    user.updatePassword(newPassword).then(function () {
        // Update successful.
    }).catch(function (error) {
        // An error happened.
    });
};

const firebaseLogout = () => {
    const auth = app.auth();
    return auth
        .signOut();
};

const messageToFirebase = async (data, key = null) => {
    const { message, recipients, group, item, attachment } = data;
    let messageKey = (key === null) ? db.ref('/UserMessage').push().key : key;
    recipients.key = messageKey;
    //console.log("connection messageKey:", messageKey, message);
    await sendToFirebase(`/UserMessage/${messageKey}/${message.created_at}`, message);
    await sendToFirebase(`/UserMessageRecipient/${messageKey}`, recipients);

    if (group !== null) {
        group.key = messageKey;
        await sendToFirebase(`/UserMessageGroup/${messageKey}`, group);
    }
    if (item !== null) {
        item.key = messageKey;
        await sendToFirebase(`/UserMessageItem/${messageKey}`, item);
    }

    /*if (message.is_attachment) {
        storageHelper.upload(attachment);
    }*/

    return messageKey;
};

const deleteFirebaseMessage = async (messageKey) => {
    if (messageKey === null || messageKey === undefined || messageKey === '') return false;
    await db.ref(`/UserMessage/${messageKey}`).remove();
    await db.ref(`/UserMessageRecipient/${messageKey}`).remove();
    await db.ref(`/UserMessageGroup/${messageKey}`).remove();
    await db.ref(`/UserMessageItem/${messageKey}`).remove();
}
const readMessageThread = (messageKey, user_id) => {
    let update = {};
    let data = { id: user_id, unread: 0, status: 'read' };
    update[`/UserMessageRecipient/${messageKey}/recipients/${user_id}`] = data;
    db.ref().update(update);
    /*db.ref(`/UserMessageRecipient/${messageKey}/recipients/${user_id}`)
        .once("value", function (snap) {
            snap.ref.update({ id: user_id, unread: 0, status: 'read' });
    });*/
}

const ObjectToArray = (objs) => {
    const items = [];
    objs && Object.keys(objs).map(itemKey => {
        const item = objs[itemKey];
        items.push(item);
    });
    return items;
};

const getUser = () => {
    return (identity && identity.user) ? identity.user : null;
};

const isOwner = (user_id) => {
    const user = getUser();
    return (user && user.id === user_id);
};

const clearErrorMessages = () => {
    this.errors = [];
};

const siteTitle = () => {
    return this.mainTitle;
};

const handleHttpError = (error) => {
    throw new Error(error || 'Server Error');
};

const handleErrors = (error) => {
    const httpErrorCode = error.status;
    this.clearErrorMessages();
    switch (httpErrorCode) {
        case 401:
            const msg = error.error.data.message;
            this.errors.push(msg);
            this.error(msg, { showProgressBar: false });
            break;
        case 403:
            this.router.navigateByUrl('/');
            break;
        case 422:
            const messages = error.error.data.validation_messages;
            for (const message in messages) {
                if (messages[message]) {
                    this.errors.push(messages[message].join(''));
                }
            }
            this.warning(messages, { showProgressBar: false });
            break;
        default:
            this.error('An error occurred while processing your request.', { showProgressBar: false });
    }
};

const showErrors = (dispatch, exception, alertSelectors) => {
    if (exception instanceof TypeError) {
        dispatch(alertSelectors.error(`${exception.name}: ${exception.message}`))
    } else {
        if (exception instanceof String) {
            dispatch(alertSelectors.error(exception))
        }else{
            exception && exception.text().then(message => {
                const errorMessage = JSON.parse(message);
                // console.log('exception', errorMessage);
                (errorMessage !== undefined) && (errorMessage.errors !== undefined) && (errorMessage.errors.length > 0) && errorMessage.errors.map(item => dispatch(alertSelectors.error(item)));
            });
           // console.log('exception', exception);
        }

    }
};

const IsJson = (str) => {
    try {
       JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};

const requestOptions = (method = "GET", params = null) => {
    let headers = authHeader();
    let body = (params === null) ? null : JSON.stringify(params);
    return { method, headers, body };
};

const requestParamsQuery = (params) => {
    const query = Object.keys(params).map(k => {
        let key = encodeURIComponent(k);
        let inValid = ((params[key] === '') || (params[key] === undefined) || (params[key] === null));
        let val = (inValid ? null : encodeURIComponent(params[k]));
        return (inValid ? null : `${key}=${val}`);
    }).filter(item => (item !== null)).join('&');
    return query;
};

const requestParams = (url, params) => {
    const query = requestParamsQuery(params);
    return (params === null) ? url : (url + '?' + query);
};

const request = (url, options) => {
    return fetch(url, options)
        .then(
            response => {
                if (!response.ok) {
                    throw response
                }
                return response.json();
            });
};

const httpURL = (url) => {
    return (isWeb === true) ? (new URL(url)) : url;
};

const navigation = (location, is_reload = false, params=null) => {
    let query = (params !== null) ? requestParamsQuery(params) : null;
    switch (location) {
        case 'welcome':
            navigationHelper.welcome(is_reload);
            break;
        case 'services':
            navigationHelper.service(is_reload);
            break;
        case 'home':
            navigationHelper.home(is_reload);
            break;
        case 'login':
            navigationHelper.login();
            break;
        case 'logout':
            navigationHelper.logout();
            break;
        case 'received':
            navigationHelper.receivedOffer();
            break;
        case 'offers-sent-services-exchange':
        case 'offers-sent-services-cash':
        case 'offers-received-services-exchange':
        case 'offers-received-services-cash':
            navigationHelper.offersLocation(location.split('-').join('/'));
            break;
        case 'service-search':
            navigationHelper.serviceSearch(is_reload);
            break;
        case 'message':
            navigationHelper.message(is_reload, query);
        default:
    }

};

const messageAlert = (message) => {
    alertHelper.confirm(message);

};

const truncateString = (string, length) => {
    return string.length > length ? string.substring(0, length) + '...' : string;
};
const truncateWord = (string, length) => {
    return string.split(" ").splice(0, length).join(" ");
};

const html2text = (html) => {
    const text = (html !== null) ? html.replace(/<\/?[^>]+>/ig, " ") : '';
    return text;
};
const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1)
};

const checkImage = (uri) => {
    if (uri === undefined || uri === null) return false;
    return (uri.match(/(jpeg|jpg|gif|png)$/) != null);
};

const fileExtension = (url) => {
    if (url === undefined) return false;
    let extension = url.split('.').pop().split(/\#|\?/)[0];
    return extension;
}

const classIcon = (extension) => {
    let icons = null
    if (extension === false) return 'file';
    switch (true) {
        case (extension.match(/(xls|xlsx|ods|xlr|csv|xlt|xlm|xlsm|xltx|xltm|xlsb|xla|xlam|xll|xlw)$/) != null):
            icons = 'excel';
            break;
        case (extension.match(/(odp|pps|ppt|pptx|pps|pot)$/) != null):
            icons = 'powerpoint';
            break;
        case (extension.match(/(doc|docx|odt|rtf|tex|wks|wpd|dot|wbk|docm|dotx|dotm|docb)$/) != null):
            icons = 'word';
            break;
        case (extension.match(/(pdf|txt|)$/) != null):
            icons = 'pdf';
            break;
        default:
            icons = 'file';
    }
    return icons
}

export const globalService = {
    identity,
    getUser,
    rootUrl,
    isOwner,
    clearErrorMessages,
    siteTitle,
    handleHttpError,
    handleErrors,
    request,
    requestOptions,
    requestParamsQuery,
    requestParams,
    apiRoot,
    uploadRoot,
    authHeader,
    authToken,
    showErrors,
    logout,
    storeItem,
    parseItem,
    httpURL,
    navigation,
    IsJson,
    sendToFirebase,
    messageToFirebase,
    deleteFirebaseMessage,
    readMessageThread,
    firebase,
    ObjectToArray,
    truncateString,

    messageAlert,
    truncateWord,
    app,
    storage,
    db,
    ref,
    auth,

    html2text,
    firebaseRegister,
    firebaseLogin,
    firebaseUpdatePassword,
    firebaseLogout,
    isNotified,
    capitalize,
    checkImage,
    fileExtension,
    classIcon,
    clearAll
};
