

// Add listing
function writeListing() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    var userEmail = userDoc.data().email;
                    let housingName = document.getElementById("name-input").value;
                    //let img = document.getElementById("img-input").value;
                    let price = document.getElementById("price-input").value;
                    let description = document.getElementById("description-input").value;
                    let type = document.getElementById("type-input").value;
                    let detailed_description = document.getElementById("detailed-description-input").value;

                    /* image upload stuff

                    var storageRef = firebase.storage().ref();
                    var housingRef = storageRef.child(`${housingName}.jpg`);
                    var housingImagesRef = storageRef.child(`images/${housingName}.jpg`);
                    // while the file names are the same, the references point to different files
                    housingRef.name === housingImagesRef.name;
                    housingImagesRef.fullPath === housingImagesRef.fullPath;

                    */

                    db.collection("BCIT-Downtown-Housing").add({
                        name: housingName,
                        price: price,
                        description: description,
                        type: type,
                        detailed_description: detailed_description,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(() => {
                        window.location.href = "./jump_page_BCIT_housing.html"; //new line added
                    })
                })

        } else {
            // No user is signed in.
            alert("Not logged in!")
        }
    });

}

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