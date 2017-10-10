console.log('JS is loaded');

function initMap () {
  navigator.geolocation.watchPosition((pos) => {
    const { latitude: lat, longitude: lng } = pos.coords;
    console.log('new position--->', pos.coords)

    map = new google.maps.Map(document.getElementById('map'), {
      center: { lat, lng },
      zoom: 16
    }),

    marker = new google.maps.Marker({
      position: { lat, lng },
      map: map,
      title: 'Current Posiion'
    })
  }, err => {
    console.error(err)
  }, options)
}


let startBtn = document.getElementById('start');
startBtn.addEventListener('click', () => { initMap() })

var watchId;
function startRun () {
  console.log('Start Run Cicked!')
  watchId = navigator.geolocation.watchPosition(success, error, options);
}

const options = {
  enableHighAccuracy: true,
  timeout: 4000,
  maximumAge: 0
};