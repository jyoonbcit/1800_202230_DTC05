
// populate restaurant cards on the page
function displayCards(collection) {
    let cardTemplate = document.getElementById("restaurantsCardTemplate"); // grab restaurantsCardTemplate from html

    db.collection(collection)
        .orderBy("name") // ordered by restaurant name
        .limit(5) // showing only 5 restaurants on the page
        .get()
        .then(snap => {
            snap.forEach(doc => { //iterate through each doc
                var title = doc.data().name;        // get value of the "name" key
                var location = doc.data().location;   // get value of the "location" key
                var hours = doc.data().hours;       // get value of the "hours" key
                var SFU_restaurantID = doc.data().code;     // get value of the "code" key
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title; // restaurant name as title
                newcard.querySelector('.card-location').innerHTML = location; // restaurant location
                newcard.querySelector('.card-hours').innerHTML = hours; // restaurant hours
                newcard.querySelector('a').onclick = () => setSFURestaurantData(SFU_restaurantID);
                newcard.querySelector('.card-image').src = `../images/${SFU_restaurantID}.jpeg`; //Example: SFU01.jpeg
                newcard.querySelector('i').id = 'save-' + SFU_restaurantID;  //know which restaurant to bookmark based on which restaurant was clicked
                newcard.querySelector('i').onclick = () => saveBookmark(SFU_restaurantID); //call a function to save the restaurants to the user's document
                newcard.querySelector('.read-more').href = "eachRestaurant.html?restaurantName=" + title + "&id=" + SFU_restaurantID; // set each restaurant address based on name and its ID
                // keep the bookmarked item showing filled-icon every time the SFU_restaurant.html page is refreshed
                currentUser.get().then(userDoc => {
                    //get the user name
                    var restaurant_bookmarks = userDoc.data().restaurant_bookmarks;
                    if (restaurant_bookmarks.includes(SFU_restaurantID)) {
                        document.getElementById('save-' + SFU_restaurantID).innerText = 'favorite';
                    }
                })
                document.getElementById(collection + "-go-here").appendChild(newcard);
            })
        })
}

displayCards("SFU restaurants");

// set restaurant data into locals storage
function setSFURestaurantData(id) {
    localStorage.setItem('SFU_restaurantID', id);
}

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


function logout() {
    console.log("logout");
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
}

// save bookmark for clicked restaurant by setting saved bookmarks under user doc in firebase console
function saveBookmark(SFU_restaurantID) {
    currentUser.set({
        restaurant_bookmarks: firebase.firestore.FieldValue.arrayUnion(SFU_restaurantID)
    }, {
        merge: true
    }) // update bookmark with SFU restaurant code in firebase console
        .then(function () {
            console.log("bookmark has been saved for: " + currentUser);
            var iconID = 'save-' + SFU_restaurantID;
            document.getElementById(iconID).innerText = 'favorite'; // change icon from favorite_border to favorite for bookmarked restaurants
        });
}