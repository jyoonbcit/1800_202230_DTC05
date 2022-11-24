
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var email = user.email;
        console.log(email, "is signed in");
        $("#loginBtn").hide();
        displayCards("Buses")
        $("#logoutBtn").click(logout);
        // ...
    } else {
        console.log("No user is signed in");
        $("#logoutBtn").hide();
        // User is signed out
        // ...
    }
});


function displayCards(collection) {
    let cardTemplate = document.getElementById("transitCardTemplate");

    db.collection(collection).get()
        .then(snap => {
            snap.forEach(doc => { //iterate thru each doc
                var title = doc.data().BusID;        // get value of the "BusIDs" key
                var RouteHour = doc.data().RouteHour;   // get value of the "RouteHour" key
                var stop = doc.data().StopIDs; // get value of the "StopIDs" key
                var transitID = doc.data().Code; // get value of the "Code" key
                let newcard = cardTemplate.content.cloneNode(true);
                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title; // set the title of the card to the BusIDs
                newcard.querySelector('.card-RouteHour').innerHTML = RouteHour; // set the RouteHour of the card to the RouteHour
                newcard.querySelector('.card-stop').innerHTML = stop; // set the stop of the card to the StopIDs
                newcard.querySelector('.card-image').src = `../images/ubc_transit/${transitID}.jpeg`; //Example: UBC01.jpg
                newcard.querySelector('.detailbtn').href = "UBC_transit_template.html?title=" + title + "&id=" + transitID; // set the href of the detail button to the Code
                //give unique ids to all elements for future use
                document.getElementById(collection + "-go-here").appendChild(newcard); // populate card with data
            })
        })
}


function logout() {
    console.log("logout");
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
}