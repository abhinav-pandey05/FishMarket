import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp ({
    apiKey: "AIzaSyCNMq_w2gRoUyHJPwUxzb7aCzp6YSjfXEE",
    authDomain: "catch-of-the-day-abhinav.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-abhinav.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// this is a default export
export default base;
