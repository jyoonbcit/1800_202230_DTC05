
var storage = firebase.storage();
var currentDoc;

// file upload listen event
var ImageFile;   //global variable pointing to the picked file

function nextStep() {
    window.location.href = "./jump_page_UBC_housing.html";
}

function imageUploadListener() {
    const fileInput = document.getElementById("image-input"); // pointer #1
    const image = document.getElementById("image-input-goes-here"); // pointer #2

    //attach listener to input file
    //when this file changes, do something
    fileInput.addEventListener('change', function (e) {

        //the change event returns a file "e.target.files[0]"
        ImageFile = e.target.files[0];
        var blob = URL.createObjectURL(ImageFile);
        console.log(blob, ImageFile)

        //change the DOM img element source to point to this file
        image.src = blob; //assign the "src" property of the "img" tag
    })
}
imageUploadListener();

function uploadImage() {
    // on login
    firebase.auth().onAuthStateChanged(function (user) {
        var housingName = document.getElementById("name-input").value;
        var storageRef = storage.ref("images/" + `${housingName}` + ".jpg");

        storageRef.put(ImageFile)
            .then(function () {
                console.log(`${currentDoc}`, "uploadImage");
                storageRef.getDownloadURL().then(function (url) {
                    db.collection("UBC Vancouver Housing").doc(`${currentDoc}`).update({
                        imgURL: url
                    }).then(function () {
                        nextStep();
                    })
                })
            })
    })
}

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
                    var housingName = document.getElementById("name-input").value;
                    let price = document.getElementById("price-input").value;
                    let description = document.getElementById("description-input").value;
                    let type = document.getElementById("type-input").value;
                    let detailed_description = document.getElementById("detailed-description-input").value;

                    currentDoc = db.collection("UBC Vancouver Housing").add({
                        name: housingName,
                        price: price,
                        description: description,
                        type: type,
                        detailed_description: detailed_description,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(function (docRef) {
                        currentDoc = docRef.id;
                        console.log(currentDoc, "in writeListing");
                        uploadImage();
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
        // ...
    } else {
        console.log("No user is signed in");
        $("#logoutBtn").hide();
        // User is signed out
        // ...
    }
});

$("logoutBtn").click(function () {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        console.log("User signed out");
    }).catch(function (error) {
        // An error happened.
        console.log("Error signing out");
    });
});