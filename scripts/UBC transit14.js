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
    let cardTemplate = document.getElementById("transitCardTemplate");

    db.collection(collection).get()
        .then(snap => {
            //var i = 1;  //if you want to use commented out section
            snap.forEach(doc => { //iterate thru each doc
                var title = doc.data().BusIDs;        // get value of the "BusIDs" key
                var LocationName = doc.data().LocationName;   // get value of the "LocationName" key
                var stop = doc.data().StopID;
                var transitID = doc.data().Code;
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-LocationName').innerHTML = LocationName;
                newcard.querySelector('.card-stop').innerHTML = stop;
                newcard.querySelector('.card-image').src = `../images/ubc_transit/${transitID}.jpeg`; //Example: NV01.jpg
                newcard.querySelector('.favourite').setAttribute("id", doc.id);
                newcard.querySelector('.favourite').setAttribute("onclick", "savefave(doc.id)");
                //give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery
                document.getElementById(collection + "-go-here").appendChild(newcard);
                //i++;   //if you want to use commented out section
            })
        })
}

displayCards("UBC 14 Stop");

function savefave(postid) {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            db.collection("users").doc(user.uid).update({
                faves: arrayUnion("favourites")
            })
        } else {
            // No user is signed in.
        }
    });
}