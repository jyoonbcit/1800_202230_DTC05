//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyC31Ktxw_RjB0cKuw6Pg0dN0BPOHsIbMR0",
    authDomain: "bcit-dtc05-project.firebaseapp.com",
    projectId: "bcit-dtc05-project",
    storageBucket: "bcit-dtc05-project.appspot.com",
    messagingSenderId: "494917892160",
    appId: "1:494917892160:web:4a4972c9f10060c8c587a5"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// initialize housing database for UBC Vancouver

// old script
/* function load() {
    db.collection("UBC Vancouver Housing").get().then((querySnapshot) => {
        i = 1;
        querySnapshot.forEach((doc) => {
            $(`#image_${i}`).html(`<img src=images/UBCV_housing_${i}.jpg'>`);
            document.getElementById(`image_${i}`).src = `./images/UBCV_housing_${i}.jpg`;
            $(`#name_${i}`).html(doc.data().name);
            $(`#description_${i}`).html(doc.data().description);
            i++;
        });
    });
} */

function displayCards(collection) {
    let cardTemplate = document.getElementById("housingCardTemplate");

    db.collection(collection).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            var name = doc.data().name;
            var price = doc.data().price;
            var description = doc.data().description;
            var type = doc.data().type;
            let newCard = cardTemplate.content.cloneNode(true);

            //update title and text and image
            newCard.querySelector('.card-name').innerHTML = name;
            newCard.querySelector('.card-description').innerHTML = description;
            newCard.querySelector('.card-price').innerHTML = price;
            newCard.querySelector('.card-type').innerHTML = type;
            newCard.querySelector('.card-image').src = `../images/${name}.jpg`;

            //attach to gallery
            document.getElementById(collection + "-go-here").appendChild(newCard);
        })
    })
}

$(document).ready(displayCards("UBC Vancouver Housing"));

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var email = user.email;
        console.log(email, "is signed in");
        $("#loginBtn").hide();
        // ...
    } else {
        console.log("No user is signed in");
        // User is signed out
        // ...
    }
});

$("logoutBtn").click(function () {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        console.log("User signed out");
    }).catch(function (error) {
        // An error happened.
        console.log("Error signing out");
    });
});