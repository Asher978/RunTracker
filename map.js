console.log('map.js is loaded!');
var map;
var runData = [];
let startBtn = document.getElementById('start');
startBtn.addEventListener('click', () => startRun())

navigator.geolocation.getCurrentPosition((pos) => {
  const { latitude: lat, longitude: lng } = pos.coords;  
  map = L.map('map').setView([lat, lng], 14);
  mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
  L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; ' + mapLink + ' Contributors',
      maxZoom: 18,
    }).addTo(map);
});
  
function startRun () {
  var polyline;
  console.log('start was clicked!');
  watchId = navigator.geolocation.watchPosition((pos) => {
    const { latitude: lat, longitude: lng } = pos.coords;
    runData.push([[lat, lng]])
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
        
        