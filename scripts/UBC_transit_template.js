function displayCards() {
    let cardTemplate = document.getElementById("transitCardTemplate");
    let params = new URL(window.location.href);
    let transitCode = params.searchParams.get("id");
    let transitTitle = params.searchParams.get("title");
    db.collection("Stops").where("Code", "==", transitCode).get()
        .then(allStops => {
            stops = allStops.docs;
            console.log(stops)
            //var i = 1;  //if you want to use commented out section
            stops.forEach(doc => { //iterate thru each doc
                var title = doc.data().BusIDs;        // get value of the "BusIDs" key
                var LocationName = doc.data().LocationName;   // get value of the "LocationName" key
                var stop = doc.data().StopID;
                var transitID = doc.data().Code;
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-LocationName').innerHTML = LocationName;
                newcard.querySelector('.card-stop').innerHTML = stop;
                newcard.querySelector('.card-image').src = `../images/ubc_transit/${transitID}.jpeg`; //Example: NV01.jpg

                //give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery
                document.getElementById(collection + "-go-here").appendChild(newcard);
                //i++;   //if you want to use commented out section
            })
        })
}

displayCards("Stops");