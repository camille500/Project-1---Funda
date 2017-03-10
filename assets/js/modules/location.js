const UserLocation = (function() {
  'use strict';

  /* GET THE USERS LOCATION
  ------------------------------------------------  */
  const init = () => {
    elements.loader.classList.remove('hidden');
    if (navigator.geolocation.getCurrentPosition && window.location.hostname != 'camille-sebastien.com') {
      navigator.geolocation.getCurrentPosition(location => {
        makeUrl(location.coords.latitude, location.coords.longitude)
      });
    } else {
      makeUrl(52.377027, 4.919229);
    }
  }

  /* MAKE THE URL FOR THE GEOCODING API REQUEST
  ------------------------------------------------  */
  const makeUrl = (lat,long) => {
    Requests.get(`${config.googleBaseUrl}latlng=${lat},${long}${config.googleApiKey}`, 'location');
  }

  /* GET THE STREET & CITY NAME OUT OF THE RETURNED GEO DATA
  ------------------------------------------------  */
  const toString = (locationData) => {
    locationData.results.map(function(data,i) {
      data.address_components.map(function(adres) {
        if(adres.types.includes('route')) {
          localStorage.setItem('street', adres.long_name);
        } else if(adres.types.includes('locality')) {
          localStorage.setItem('city', adres.long_name);
        }
      });
    });
    Funda.makeListUrl('');
  }

  /* MAKES SURE THAT THE RETURNED FUNCTIONS CAN BE USED
  ------------------------------------------------  */
  return {
      init: init,
      makeUrl: makeUrl,
      toString: toString
  };

})();
