import firebase from "firebase"
const config = {
    // apiKey: "AIzaSyBwZtAcDfPvmcTuL4RczRyc3rc2uLZEh_U",
    // authDomain: "jobarter-d95cc.firebaseapp.com",
    // databaseURL: "https://jobarter-d95cc.firebaseio.com",
    // projectId: "jobarter-d95cc",
    // storageBucket: "jobarter-d95cc.appspot.com",
    // messagingSenderId: "893397141456",
    // appId: "1:893397141456:web:5a383e5033dd0b01345bd5",
    // measurementId: "G-RSJK99DC35"
     apiKey: "AIzaSyDybSrWl7Pl4XhdD-5bwrXaXUJ677sU_uY",
    authDomain: "saylaniwebsite-8f6d4.firebaseapp.com",
    databaseURL: "https://saylaniwebsite-8f6d4.firebaseio.com",
    projectId: "saylaniwebsite-8f6d4",
    storageBucket: "saylaniwebsite-8f6d4.appspot.com",
    messagingSenderId: "38913764822",
    appId: "1:38913764822:web:e15d3c8389c8b53b9b0877"
};

const app = firebase.initializeApp(config);
const storage = app.storage();
const db = app.database();

export const firebaseConfig = {
    firebase,
    app,
    storage,
    db
};