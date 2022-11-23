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


function displayCards(collection) {
    let cardTemplate = document.getElementById("restaurantsCardTemplate");

    db.collection(collection)
        .get()
        .then(snap => {
            //var i = 1;  //if you want to use commented out section
            snap.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;        // get value of the "name" key
                var location = doc.data().location;   // get value of the "location" key
                var hours = doc.data().hours;       // get value of the "hours" key
                var SFU_restaurantID = doc.data().code;     // get value of the "code" key
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-location').innerHTML = location;
                newcard.querySelector('.card-hours').innerHTML = hours;
                newcard.querySelector('a').onclick = () => setSFURestaurantData(SFU_restaurantID);
                newcard.querySelector('.card-image').src = `../images/${SFU_restaurantID}.jpeg`; //Example: NV01.jpg
                newcard.querySelector('i').id = 'save-' + SFU_restaurantID;  //know which restaurant to bookmark based on which restaurant was clicked
                newcard.querySelector('i').onclick = () => saveBookmark(SFU_restaurantID); //call a function to save the restaurants to the user's document 
                currentUser.get().then(userDoc => {
                    //get the user name
                    var restaurant_bookmarks = userDoc.data().restaurant_bookmarks;
                    if (restaurant_bookmarks.includes(SFU_restaurantID)) {
                        document.getElementById('save-' + SFU_restaurantID).innerText = 'favorite';
                    }
                })
                document.getElementById(collection + "-go-here").appendChild(newcard);
                //i++;   //if you want to use commented out section
            })
        })
}

displayCards("SFU restaurants");

function setSFURestaurantData(id) {
    localStorage.setItem('SFU_restaurantID', id);
}

var currentUser;
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        currentUser = db.collection("users").doc(user.uid)
        var email = user.email;
        console.log(email, "is signed in");
        console.log(currentUser);
        $("#loginBtn").hide();
    } else {
        console.log("No user is signed in");
        $("#logoutBtn").hide();
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

function saveBookmark(SFU_restaurantID) {
    currentUser.set({
        restaurant_bookmarks: firebase.firestore.FieldValue.arrayUnion(SFU_restaurantID)
    }, {
        merge: true
    })
        .then(function () {
            console.log("bookmark has been saved for: " + currentUser);
            var iconID = 'save-' + SFU_restaurantID;
            document.getElementById(iconID).innerText = 'favorite';
        });
}