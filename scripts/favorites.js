firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        db.collection("users").doc(user.uid).get().then(snap => {
            alert(snap.data().name);
            let posts = doc.data().posts;   //get array of posts
            posts.forEach(post => {         //iterate thru this array
                console.log(post);
            }
    }
  } else {
        // No user is signed in.
    }
});

function createSomeLots() {
    for (var i = 1; i < 5; i++) {
        db.collection("lots").doc("lot" + i).set({
            details: "blah blah lot" + i,
            status: "empty",
            lastupdate: firebase.firestore.FieldValue.serverTimestamp()
        })
    }
}

function displayLots() {
    db.collection("lots").get().then(snap => {
        snap.forEach(doc => {
            lotname = doc.id;
            status = doc.data().status;
            let lotCard = document.getElementById("lotcard").content.cloneNode(true);
            lotCard.querySelector('.stuff').innerHTML = lotname + " status: " + status;
            lotCard.querySelector('.fave').onclick = () => setFave(lotname);
            document.getElementById("lots-go-here").appendChild(lotCard);
        })
    })
}
displayLots();

function setFave(lotid) {
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid).set({
            favourites: firebase.firestore.FieldValue.arrayUnion(lotid)
        }, { merge: true });
    })
}

function displayFaveLots() {
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid).get().then(doc => {
            faves = doc.data().favourites;
            console.log(faves)
            displayLots(faves)
        })
    })
}
displayFaveLots();