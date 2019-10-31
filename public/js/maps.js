let platform = new H.service.Platform({
    'apikey': '5LtHEjbv-acFABKlOVG0J5dHK3rvxyo7lGxaIXtcClE'
  });

  /*let platform = new H.service.Platform({
    'app_id': 'znHaGgvwQxq4ZbASSJRO',
    'app_code': 'yF3Uv4I2NbE7ITd2F4P2Ww'
  });*/


function landmarkGeocode() {
    let title = document.querySelector('h1').textContent;
    var geocoder = platform.getGeocodingService(),
      landmarkGeocodingParameters = {
        searchtext: title, 
        jsonattributes : 1
      };
  
    geocoder.search(
      landmarkGeocodingParameters,
      showMap,
      (e)=> console.log(e)
    );
  }

  function showMap(result){
    let location = result.response.view[0].result[0].place.locations[0].displayPosition;
   // console.log(location);
    //Layer of our map is created  
    let defaultLayers = platform.createDefaultLayers();

    // Initialize the map
    let map = new H.Map(
    document.querySelector('.map'),
    defaultLayers.vector.normal.map,
    { 
      zoom: 15,
      center: { lat: location.latitude, lng: location.longitude }
    });

    //adding marker
    let marker = new H.map.Marker({lat: location.latitude, lng: location.longitude});
    map.addObject(marker);
  
    // Create the default UI:
    var ui = H.ui.UI.createDefault(map, defaultLayers);
  }

  landmarkGeocode();