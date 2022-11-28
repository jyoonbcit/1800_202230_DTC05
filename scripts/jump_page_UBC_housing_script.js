// global variable initialization
var currentUser;

function displayCards(collection) {
    let cardTemplate = document.getElementById("housingCardTemplate");

    db.collection(collection).get().then(function (querySnapshot) {
        querySnapshot.forEach(doc => {
            var name = doc.data().name;
            var price = doc.data().price;
            var description = doc.data().description;
            var type = doc.data().type;
            var docID = doc.id;
            var img = doc.data().imgURL;
            console.log(img);
            let newCard = cardTemplate.content.cloneNode(true);

            // update title and text and image
            newCard.querySelector('.card-name').innerHTML = name;
            newCard.querySelector('.card-description').innerHTML = description;
            newCard.querySelector('.card-price').innerHTML = price;
            newCard.querySelector('.card-type').innerHTML = type;
            newCard.querySelector('.card-image').src = `${img}`;
            // know which housing to bookmark based on which housing was clicked
            newCard.querySelector('i').id = 'favourite ' + name;
            // call a function to save the housing to the user's document 
            newCard.querySelector('i').onclick = () => saveBookmark(name);

            //attach to gallery
            document.getElementById(collection + "-go-here").appendChild(newCard);
        })
    })
}

function saveBookmark(imageID) {
    currentUser.set(
        {
            housingBookmarks: firebase.firestore.FieldValue.arrayUnion(imageID)
        },
        {
            merge: true
        }
    ).then(function () {
        console.log("Bookmark has been saved for: " + currentUser);
        var iconID = 'favourite ' + imageID;
        document.getElementById(iconID).innerText = 'favorite'; // change the icon to a filled in heart
    });
}

$(document).ready(displayCards("UBC Vancouver Housing"));

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        currentUser = db.collection("users").doc(user.uid);
        var email = user.email;
        console.log(email, "is signed in");
        $("#loginBtn").hide();
        $("#logoutBtn").click(logout);
        // ...
    } else {
        console.log("No user is signed in");
        $("#logoutBtn").hide();
        // User is signed out
        // ...
    }
});

function logout() {
    console.log("logout");
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
}