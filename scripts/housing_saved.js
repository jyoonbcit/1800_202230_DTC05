var currentUser;

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        currentUser = db.collection("users").doc(user.uid)
        var email = user.email;
        console.log(email, "is signed in");
        console.log(currentUser);
        getBookmarks(user);
        $("#loginBtn").hide();
        $("#logoutBtn").click(logout);
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
            var housing_bookmarks = userDoc.data().housing_bookmarks;
            console.log(housing_bookmarks);

            let cardTemplate = document.getElementById("housingCardTemplate");
            housing_bookmarks.forEach(housingID => {
                console.log(housingID);
                db.collection(collection).get().then(function (querySnapshot) {
                    querySnapshot.forEach(doc => {
                        var name = doc.data().name;
                        var price = doc.data().price;
                        var description = doc.data().description;
                        var type = doc.data().type;
                        var img = doc.data().imgURL;
                        let newCard = cardTemplate.content.cloneNode(true);

                        //update title and text and image
                        newCard.querySelector('.card-name').innerHTML = name;
                        newCard.querySelector('.card-description').innerHTML = description;
                        newCard.querySelector('.card-price').innerHTML = price;
                        newCard.querySelector('.card-type').innerHTML = type;
                        newCard.querySelector('.card-image').src = `${img}`;

                        //attach to gallery
                        document.getElementById("housingCardGroup").appendChild(newCard);
                    })
                })

            });
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