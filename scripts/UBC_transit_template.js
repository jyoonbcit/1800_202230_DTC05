
var currentUser;

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var email = user.email;
        console.log(email, "is signed in");
        currentUser = db.collection("users").doc(user.uid);
        displayCards()
        // console.log(currentUser);

        $("#loginBtn").hide();
        // ...
    } else {
        console.log("No user is signed in");
        $("#logoutBtn").hide();
        // User is signed out
        // ...
    }
});

function displayCards() {
    let cardTemplate = document.getElementById("transitCardTemplate"); // get the template
    let params = new URL(window.location.href); // get the URL parameters
    let transitCode = params.searchParams.get("id"); // get the busstop code from the URL
    let transitTitle = params.searchParams.get("title"); // get the busstop title from the URL
    db.collection("Stops").where("Code", "==", transitCode).get() // in Stops collection grab all docuuments where Code is equal to transitCode
        .then(allStops => {
            stops = allStops.docs;
            console.log(stops)
            stops.forEach(doc => { //iterate thru each doc
                var title = doc.data().BusIDs;        // get value of the "BusIDs" key
                var LocationName = doc.data().LocationName;   // get value of the "LocationName" key
                var stop = doc.data().StopID; // get value of the "StopID" key
                var transitID = doc.data().Code; // get value of the "Code" key
                var imageID = doc.data().ImageCode; // get value of the "ImageCode" key
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title; // set the title of the card to the BusIDs
                newcard.querySelector('.card-LocationName').innerHTML = LocationName;  // set the LocationName of the card to the LocationName
                newcard.querySelector('.card-stop').innerHTML = stop; // set the stop of the card to the StopID
                newcard.querySelector('.card-image').src = `../images/ubc_transit/${imageID}.jpeg`; //Example: UBC01.jpg
                newcard.querySelector('i').id = 'save-' + imageID;  //know which busstop to bookmark based on which busstop was clicked
                newcard.querySelector('i').onclick = () => saveBookmark(imageID); //call a function to save the busstop to the user's document 
                currentUser.get().then(userDoc => {
                    //get the user name
                    var transitbookmarks = userDoc.data().transitbookmarks;
                    if (transitbookmarks.includes(imageID)) {
                        document.getElementById('save-' + imageID).innerText = 'favorite'; // if the user has bookmarked this busstop, change the icon to a filled in heart
                    }
                })
                document.getElementById("Stops" + "-go-here").appendChild(newcard); // populate card with data

            })
        })
}


$("logoutBtn").click(function () {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        console.log("User signed out");
    }).catch(function (error) {
        // An error happened.
        console.log("Error signing out");
    });
});

function saveBookmark(imageID) {
    console.log(imageID);
    console.log(currentUser)
    currentUser.get().then(userDoc => {
        console.log(userDoc.data().name)
    })
    currentUser.set({
        transitbookmarks: firebase.firestore.FieldValue.arrayUnion(imageID) // save the busstop to the user's document
    }, {
        merge: true
    })
        .then(function () {
            console.log("bookmark has been saved for: " + currentUser);
            var iconID = 'save-' + imageID;
            console.log(iconID);
            document.getElementById(iconID).innerText = 'favorite'; // change the icon to a filled in heart
        });

}