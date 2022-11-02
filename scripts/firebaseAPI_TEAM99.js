//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyBaO-mRqjLiKRjCLzjToXONL2yM788BoTk",
    authDomain: "fir-bcab4.firebaseapp.com",
    projectId: "fir-bcab4",
    storageBucket: "fir-bcab4.appspot.com",
    messagingSenderId: "71125048944",
    appId: "1:71125048944:web:ed4c9a297a09fe15179eb5"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();