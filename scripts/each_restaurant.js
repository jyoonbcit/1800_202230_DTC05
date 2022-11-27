// function to populate reviews for clicked restaurant
function populateReviews() {
    let restaurantCardTemplate = document.getElementById("CardTemplate");
    let restaurantCardGroup = document.getElementById("CardGroup");
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
