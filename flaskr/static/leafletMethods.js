/*
 the script mus be loaded after the map div is defined.
 otherwise this will not work (we would need a listener to
 wait for the DOM to be fully loaded).

 Just put the script tag below the map div.

 The source code below is the example from the leaflet start page.
 */


// 53.217359, 6.566565




var map = L.map('map').setView([53.217359, 6.566565], 13);



L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);



var popup = L.popup();


function test(data){
  alert(data)
}

function myFunction(data) {
  
  // MAKE AJAX CALL BITCH
}

function show_venue_markers(data){
  venues = data.responseJSON
  console.log(venues)
  for (const [key, value] of Object.entries(venues)) {
    let venue = key;
    let lat = value['lat'];
    let lng = value['lng'];
    let venue_id = value['venue_id']

    


    L.marker([lat, lng]).addTo(map)
      .bindPopup('Venue: ' + venue + 
      `<br/> <button onclick="myFunction(${venue_id})">show events</button>`) 
  
  };
};


function event_table(data){
 // update the table with event data from a user selected venue
}


function onMapClick(e) {

  let coordinates = e.latlng

  $.ajax({
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify(coordinates),
    url: '/_get_venues',
    contentType: 'application/json; charset=utf-8',

    complete: function (data) {


      show_venue_markers(data);
      // populate a table to the right
    },
    
    error: function () { console.log('something went wrong'); }
  });
}




map.on('click', onMapClick);



const search = new GeoSearch.GeoSearchControl({
  provider: new GeoSearch.OpenStreetMapProvider(),
});




map.addControl(search);