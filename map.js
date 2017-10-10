console.log('map.js is loaded!');
var map;
var mapId = 'mapbox.streets';
var access_token = 'pk.eyJ1IjoiYXNoZXI5NzgiLCJhIjoiY2o1eTVmNXlnMGJ2NjJ5cWRxMTRtY2hsMSJ9.y7O2ehEprrX26JpPyZatrQ';
var runData = [];
var marker;

// event listeners
let startBtn = document.getElementById('start');
startBtn.addEventListener('click', () => startRun())

let stopBtn = document.getElementById('stop');
stopBtn.addEventListener('click', () => stopRun());

navigator.geolocation.getCurrentPosition((pos) => {
  const { latitude: lat, longitude: lng } = pos.coords;  
  map = L.map('map').setView([lat, lng], 14);
  mapLink = '<a href="https://openstreetmap.org">OpenStreetMap</a>';
  L.tileLayer(
    `https://api.tiles.mapbox.com/v4/${mapId}/{z}/{x}/{y}.png?access_token=${access_token}`, {
      attribution: '&copy; ' + mapLink + ' Contributors',
      maxZoom: 18,
    }).addTo(map);
});
  
function startRun () {
  var polyline;
  console.log('start was clicked!');
  marker = L.marker(map.getCenter()).addTo(map);
  watchId = navigator.geolocation.watchPosition((pos) => {
    const { latitude: lat, longitude: lng } = pos.coords;
    runData.push([lat, lng])
    console.log(runData)
    marker.setLatLng(runData[runData.length - 1]);

    polyline = L.polyline(runData, 
    {
      color: 'red',
      weight: 10,
      opacity: .7,
      dashArray: '20,15',
      lineJoin: 'round'
    }).addTo(map);
  })
}

function stopRun () {
  navigator.geolocation.clearWatch(watchId);
}
        
        