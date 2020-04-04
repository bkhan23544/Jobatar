import firebase from "firebase"
const config = {
    apiKey: "AIzaSyBwZtAcDfPvmcTuL4RczRyc3rc2uLZEh_U",
    authDomain: "jobarter-d95cc.firebaseapp.com",
    databaseURL: "https://jobarter-d95cc.firebaseio.com",
    projectId: "jobarter-d95cc",
    storageBucket: "jobarter-d95cc.appspot.com",
    messagingSenderId: "893397141456",
    appId: "1:893397141456:web:5a383e5033dd0b01345bd5",
    measurementId: "G-RSJK99DC35"
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