/*
TODO: - Show street and cityname
      - Make a list view from all the houses near users location
      - Create filters and sort options
      - Detailview for every house
      - Suggestions
      - Routes
      - Styling
      - Modular?
*/

{
  'use strict';

  const app = {
    init() {
      locationData.getUserLocation()
    },
    get(url) {
      request.open('GET', url, true);
      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          const data = JSON.parse(request.responseText);
          if (data.results) {
            houseData.buildUrl(data.results[0].address_components);
          } else {
            houseData.clean(data);
          }
        } else {
          console.log('error');
        }
      };
      request.onerror = function() {
        console.log('error');
      };
      request.send();
    },
  };

  /* OBJECT WITH ALL DATA METHODS
  ------------------------------------------------  */
  const locationData = {
    getUserLocation() {
      if (navigator.geolocation.getCurrentPosition) {
        navigator.geolocation.getCurrentPosition(location => {
          locationData.buildUrl(location.coords.latitude, location.coords.longitude)
        });
      }
    },
    buildUrl(lat, long) {
      app.get(`${googleBaseUrl}latlng=${lat},${long}${googleApiKey}`);
    }
  };

  const houseData = {
    buildUrl(location) {
      const locationString = `/${location[4].long_name.toLowerCase()}/${location[1].long_name.toLowerCase()}/+1km/`;
      app.get(`${fundaBaseUrl}type=koop&zo=${locationString}&page=1&pagesize=25`);
    },
    clean(data) {
      console.log(data.Objects);
      Transparency.render(document.querySelector('section'), data.Objects);
    }
  }

  /* EVENT HANDLERS
  ------------------------------------------------  */
  const events = {
    init() {

    }
  };

  app.init();

}
