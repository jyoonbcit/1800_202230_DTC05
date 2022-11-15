
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var email = user.email;
        console.log(email, "is signed in");
        // ...
    } else {
        console.log("No user is signed in");
        // User is signed out
        // ...
    }
});