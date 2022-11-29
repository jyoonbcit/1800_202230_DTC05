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


// function to populate reviews for clicked restaurant
function populateReviews() {
    let restaurantCardTemplate = document.getElementById("CardTemplate");  //access CardTemplate element in each_restaurant.html and assign it to variable restaurantCardTemplate
    let restaurantCardGroup = document.getElementById("CardGroup"); //access CardGroup element in each_restaurant.html and assign it to variable restaurantCardGroup
    let params = new URL(window.location.href);         //get URL of search bar
    let restaurantCode = params.searchParams.get("id");       //get value for key "id"
    let restaurantName = params.searchParams.get("restaurantName"); //get value for key "restaurantName"
    document.getElementById("RestaurantName").innerHTML = restaurantName;
    let message = "All reviews submitted for" + restaurantName;
    message += " &nbsp | Document id is:  " + restaurantCode;
    document.getElementById("details-go-here").innerHTML = message;

    db.collection("Reviews").where("code", "==", restaurantCode).get()
        .then(allReviews => {
            reviews = allReviews.docs
            console.log(reviews);
            reviews.forEach(doc => {
                var title = doc.data().title; //gets the name field
                var rating = doc.data().rating; // gets the rating field
                var description = doc.data().description; //gets the description field

                let reviewCard = restaurantCardTemplate.content.cloneNode(true);
                reviewCard.querySelector('.title').innerHTML = title; // grab value from title value and display
                reviewCard.querySelector('.rating').innerHTML = `rating: ${rating}`; // grab value from rating value and display
                reviewCard.querySelector('.description').innerHTML = `Description: ${description}`; // grab value from description value and display
                restaurantCardGroup.appendChild(reviewCard); // Add new reviewCard to restaurantCardGroup
            })
        })
}
populateReviews();

// logout function
function logout() {
    console.log("logout");
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
}
