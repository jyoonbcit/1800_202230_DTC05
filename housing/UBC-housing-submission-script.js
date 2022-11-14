//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyC31Ktxw_RjB0cKuw6Pg0dN0BPOHsIbMR0",
    authDomain: "bcit-dtc05-project.firebaseapp.com",
    projectId: "bcit-dtc05-project",
    storageBucket: "bcit-dtc05-project.appspot.com",
    messagingSenderId: "494917892160",
    appId: "1:494917892160:web:4a4972c9f10060c8c587a5"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Review script

/* 

db.collection("UBC Vancouver Housing")
    .get()
    .then(housingResult => {
        size = housingResult.size;
        Housing = housingResult.docs;

        if (size = 1) {
            let thisHousing = Housing[0].data();
            name = thisHousing.name;
            //document.getElementById("name").innerHTML = name;
        } else {
            console.log("Query has more than one result.")
        }

    })
    
*/

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

                    db.collection("UBC Vancouver Housing").add({
                        name: housingName,
                        price: price,
                        description: description,
                        type: type,
                        detailed_description: detailed_description,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(() => {
                        window.location.href = "./jump_page_UBC_housing.html"; //new line added
                    })
                })

        } else {
            // No user is signed in.
            alert("Not logged in!")
        }
    });

}