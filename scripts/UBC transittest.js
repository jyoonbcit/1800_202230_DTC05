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
                var title = doc.data().BusID;        // get value of the "BusIDs" key
                var RouteHour = doc.data().RouteHour;   // get value of the "RouteHour" key
                var stop = doc.data().StopIDs;
                var transitID = doc.data().Code;
                let newcard = cardTemplate.content.cloneNode(true);
                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-RouteHour').innerHTML = RouteHour;
                newcard.querySelector('.card-stop').innerHTML = stop;
                newcard.querySelector('.card-image').src = `../images/ubc_transit/${transitID}.jpeg`; //Example: NV01.jpg
                newcard.querySelector('.detailbtn').href = "UBC_transit_template.html?title=" + title + "&id=" + transitID;
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

// function populateCardsDynamically() {
//     let hikeCardTemplate = document.getElementById("hikeCardTemplate");
//     let hikeCardGroup = document.getElementById("hikeCardGroup");

//     db.collection("hikes").orderBy("length").limit(2).get()
//         .then(allHikes => {
//             allHikes.forEach(doc => {
//                 var hikeName = doc.data().name; //gets the name field
//                 var hikeID = doc.data().code; //gets the unique ID field
//                 var hikeLength = doc.data().length; //gets the length field
//                 let testHikeCard = hikeCardTemplate.content.cloneNode(true);
//                 testHikeCard.querySelector('.card-title').innerHTML = hikeName;     //equiv getElementByClassName
//                 testHikeCard.querySelector('.card-length').innerHTML = hikeLength;  //equiv getElementByClassName
//                 testHikeCard.querySelector('a').onclick = () => setHikeData(hikeID);//equiv getElementByTagName
//                 testHikeCard.querySelector('i').id = 'save-' + hikeID; // assign specific ID to the card that was clicked
//                 testHikeCard.querySelector('i').onclick = () => saveBookmark(hikeID); // call a function to save the hikes to the users doc

//                 testHikeCard.querySelector('img').src = `./images/${hikeID}.jpg`;   //equiv getElementByTagName
//                 testHikeCard.querySelector('.read-more').href = "eachHike.html?hikeName=" + hikeName + "&id=" + hikeID;
//                 hikeCardGroup.appendChild(testHikeCard);
//             })

//         })
// }
displayCards("Buses");

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