var currentUser;
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        currentUser = db.collection("users").doc(user.uid) // recognize current user by the unique uid
        var email = user.email; //grab email in user doc as variable email
        console.log(email, "is signed in");
        console.log(currentUser);
        $("#loginBtn").hide(); // hide loginBtn when user is signed in
        $("#logoutBtn").click(logout); //when logoutBtn is clicked, call function logout
    } else {
        console.log("No user is signed in");
        $("#logoutBtn").hide(); // if no user is signed in, hide logoutBtn
        // User is signed out
        // ...
    }
});


function getBookmarks(user) {
    db.collection("users").doc(user.uid).get()
        .then(userDoc => {
            console.log(userDoc.data().name)
            var restaurant_bookmarks = userDoc.data().restaurant_bookmarks;
            console.log(restaurant_bookmarks);

            let cardTemplate = document.getElementById("CardTemplate");
            restaurant_bookmarks.forEach(thisResutaurantID => {
                console.log(thisResutaurantID);
                db.collection("SFU restaurants").where("code", "==", thisResutaurantID).get().then(snap => {
                    size = snap.size;
                    queryData = snap.docs;


                    if (size == 1) {
                        doc = queryData[0];
                        var title = doc.data().name;        // get value of the "name" key
                        var location = doc.data().location;   // get value of the "location" key
                        var hours = doc.data().hours;       // get value of the "hours" key
                        var SFU_restaurantID = doc.data().code;     // get value of the "code" key
                        console.log(title)
                        let newcard = cardTemplate.content.cloneNode(true);

                        //update title and text and image
                        newcard.querySelector('.card-title').innerHTML = title; // put value of title in '.card-title'
                        newcard.querySelector('.card-location').innerHTML = `Location:  ${location}`; // put value of location in '.card-location'
                        newcard.querySelector('.card-hours').innerHTML = `Hours:  ${hours}`; // put value of hours in '.card-hours'
                        newcard.querySelector('a').onclick = () => setSFURestaurantData(SFU_restaurantID); // call function setSFURestaurantData when clicked
                        newcard.querySelector('.card-image').src = `../images/sfu_restaurants/${SFU_restaurantID}.jpeg`; //Example: SFU01.jpeg
                        restaurantCardGroup.appendChild(newcard);
                    } else {
                        console.log("Query has more than one data")
                    }

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