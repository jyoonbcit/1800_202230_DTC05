let restaurantID = localStorage.getItem("SFU_restaurantID");

// use the restaurantID to read the name of the restaurant from the Firestore and insert the name in the desired place
function getRestaurantName(restaurantCode) {
    db.collection("SFU restaurants").where("code", "==", restaurantID)
        .get()
        .then(queryRestaurant => {
            //see how many results you have got from the query
            size = queryRestaurant.size;
            console.log(size);
            // get the documents of query
            SFU_restaurants = queryRestaurant.docs;
            // if only 1 result matches
            if (size = 1) {
                var thisRestaurant = SFU_restaurants[0].data(); // access data for this restaurant
                name = thisRestaurant.name; // pass value to variable name
                document.getElementById("RestaurantName").innerHTML = name; // Change RestaurantName to variable name
                console.log("size =1")
            } else {
                // error
                console.log("Query has more than one data")
            }
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
}
getRestaurantName(restaurantID);

// write into Firestore Database upon submitting the review form
function writeReview() {
    console.log("Inside Review")
    let Title = document.getElementById("title").value;
    let Rating = document.getElementById("rating").value;
    let Description = document.getElementById("description").value;
    console.log(Title, Rating, Description);

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    var userEmail = userDoc.data().email;
                    db.collection("Reviews").add({
                        code: restaurantID,
                        userID: userID,
                        title: Title,
                        rating: Rating,
                        description: Description,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(() => {
                        window.location.href = "./thanks.html";
                    })
                })

        } else {
            // No user is signed in.
        }
    });

}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        var email = user.email; //grab email in user doc as variable email
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