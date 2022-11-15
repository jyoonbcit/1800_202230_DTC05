let restaurantID = localStorage.getItem("SFU_restaurantID");

db.collection("SFU restaurants").where("code", "==", restaurantID)
    .get()
    .then(queryRestaurant => {
        //see how many results you have got from the query
        size = queryRestaurant.size;
        // get the documents of query
        SFU_restaurants = queryRestaurant.docs;
        if (size = 1) {
            var thisRestaurant = SFU_restaurants[0].data();
            name = thisRestaurant.name;
            document.getElementById("RestaurantName").innerHTML = name;
        } else {
            console.log("Query has more than one data")
        }
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

function writeReview() {
    console.log("in")
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
                        window.location.href = "thanks.html"; //new line added
                    })
                })

        } else {
            // No user is signed in.
        }
    });

}