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

var currentUser;
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        currentUser = db.collection("users").doc(user.uid)
        var email = user.email;
        console.log(email, "is signed in");
        console.log(currentUser);
        getBookmarks(user);
        $("#loginBtn").hide();
    } else {
        console.log("No user is signed in");
        $("#logoutBtn").hide();
        // User is signed out
        // ...
    }
});

function getBookmarks(user) {
    db.collection("users").doc(user.uid).get()
        .then(userDoc => {
            console.log(userDoc.data().name)
            var transitbookmarks = userDoc.data().transitbookmarks;
            console.log(transitbookmarks);

            let transitCardTemplate = document.getElementById("transitCardTemplate");
            transitbookmarks.forEach(thisTransitID => {
                console.log(thisTransitID);
                db.collection("Stops").where("ImageCode", "==", thisTransitID).get().then(snap => {
                    size = snap.size;
                    queryData = snap.docs;


                    if (size == 1) {
                        doc = queryData[0];
                        var title = doc.data().BusIDs;        // get value of the "BusIDs" key
                        var LocationName = doc.data().LocationName;   // get value of the "LocationName" key
                        var stop = doc.data().StopID;
                        var transitID = doc.data().Code;
                        var imageID = doc.data().ImageCode; // unique id
                        let newcard = transitCardTemplate.content.cloneNode(true);

                        //update title and text and image
                        newcard.querySelector('.card-title').innerHTML = title;
                        newcard.querySelector('.card-LocationName').innerHTML = LocationName;
                        newcard.querySelector('.card-stop').innerHTML = stop;
                        newcard.querySelector('.card-image').src = `../images/ubc_transit/${imageID}.jpeg`; //Example: NV01.jpg
                        transitCardGroup.appendChild(newcard);
                    } else {
                        console.log("Query has more than one data")
                    }

                })

            });
        })
}