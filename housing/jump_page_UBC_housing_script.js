
// initialize housing database for UBC Vancouver

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

            //update title and text and image
            newCard.querySelector('.card-name').innerHTML = name;
            newCard.querySelector('.card-description').innerHTML = description;
            newCard.querySelector('.card-price').innerHTML = price;
            newCard.querySelector('.card-type').innerHTML = type;
            // newCard.querySelector('.card-image').src = `../images/${name}.jpg`;
            newCard.querySelector('.card-image').src = `${img}`;

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