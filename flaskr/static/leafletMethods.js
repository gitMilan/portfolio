var map = L.map('map').setView([53.217359, 6.566565], 13);


L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


var popup = L.popup();



function filter_events_to_list(events){
  events = events.responseJSON

  var filtered_events = []

  for (const [key, value] of Object.entries(events)){
    event_name = value['displayName'];
    filtered_events.push(event_name);
  }

  return filtered_events;
}


function populate_events_table(events){

  var events = filter_events_to_list(events);
  var table = document.getElementById("event-table");
  table.innerHTML = "";

  events.forEach(function (item, index){
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    cell1.innerHTML = item;
  });
}



function venue_events(venue_id) {
  
  $.ajax({
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify(venue_id),
    url: '/_get_venues_events',
    contentType: 'application/json; charset=utf-8',

    complete: function(data) {
      populate_events_table(data)
    },

    error: function() {console.log('something went wrong')}
  });
}


function show_venue_markers(data){
  venues = data.responseJSON
  
  for (const [key, value] of Object.entries(venues)) {
    let venue = key;
    let lat = value['lat'];
    let lng = value['lng'];
    let venue_id = value['venue_id']

    L.marker([lat, lng]).addTo(map)
      .bindPopup('Venue: ' + venue + 
      `<br/> <button onclick="venue_events(${venue_id})">show events</button>`) 
  };
};



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
    },
    error: function () { console.log('something went wrong'); }
  });
}


map.on('click', onMapClick);

const search = new GeoSearch.GeoSearchControl({
  provider: new GeoSearch.OpenStreetMapProvider(),
});


map.addControl(search);