
var currentUser;
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        currentUser = db.collection("users").doc(user.uid)
        var email = user.email;
        console.log(email, "is signed in");
        console.log(currentUser);
        getBookmarks(user);
        $("#loginBtn").hide();
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
                        newcard.querySelector('.card-title').innerHTML = title;
                        newcard.querySelector('.card-location').innerHTML = location;
                        newcard.querySelector('.card-hours').innerHTML = hours;
                        newcard.querySelector('a').onclick = () => setSFURestaurantData(SFU_restaurantID);
                        newcard.querySelector('.card-image').src = `../images/${SFU_restaurantID}.jpeg`; //Example: NV01.jpg
                        restaurantCardGroup.appendChild(newcard);
                    } else {
                        console.log("Query has more than one data")
                    }

                })

            });
        })
}