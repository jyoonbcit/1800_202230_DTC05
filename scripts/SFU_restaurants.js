//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyC31Ktxw_RjB0cKuw6Pg0dN0BPOHsIbMR0",
    authDomain: "bcit-dtc05-project.firebaseapp.com",
    projectId: "bcit-dtc05-project",
    storageBucket: "bcit-dtc05-project.appspot.com",
    messagingSenderId: "494917892160",
    appId: "1:494917892160:web:ed4c9a297a09fe15179eb5"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// initialize housing database for UBC Vancouver

function getRestaurantData() {
    db.collection("SFU restaurants").get().then((querySnapshot) => {
        i = 1;
        querySnapshot.forEach((doc) => {
            $(`#image_${i}`).html(`<img src=images/SFU_restaurant_${i}.jpg'>`);
            document.getElementById(`image_${i}`).src = `./images/SFU_restaurant_${i}.jpg`;
            $(`#name_${i}`).html(doc.data().name);
            $(`#location_${i}`).html(doc.data().location);
            $(`#hours_${i}`).html(doc.data().hours);
            i++;
        });
    });
}

$(document).ready(getRestaurantData);