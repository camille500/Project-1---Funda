{
  'use strict';

  const app = {
    init() {
      locationData.getUserLocation();
    },
    /* GET REQUEST FOR ALL API CALLS
    ------------------------------------------------  */
    get(url) {
      request.open('GET', url, true);
      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          const data = JSON.parse(request.responseText);
          if (data.results) {
            houseData.buildUrl(data.results[0].address_components);
          } else if (data.Objects) {
            houseData.clean(data);
          } else {
            houseDetail.clean(data);
          }
        } else {
          console.log('error');
        }
      };
      /* ERROR HANDLING
      ------------------------------------------------  */
      request.onerror = function() {
        console.log('error');
      };
      request.send();
    },
  };

  /* GETTING THE USERS LOCATION
  ------------------------------------------------  */
  const locationData = {
    /* GET THE LOCATION (COORDINATES) OF THE USER
    ------------------------------------------------  */
    getUserLocation() {
      if (navigator.geolocation.getCurrentPosition) {
        navigator.geolocation.getCurrentPosition(location => {
          locationData.buildUrl(location.coords.latitude, location.coords.longitude)
        });
      } else {
        console.log('Cannot get location');
      }
    },
    /* BUILD UP THE GEO API URL TO GET THE CITY AND STREETNAME
    ------------------------------------------------  */
    buildUrl(lat, long) {
      app.get(`${googleBaseUrl}latlng=${lat},${long}${googleApiKey}`);
    }
  };

  /* METHODS FOR THE HOUSE DATA (LISTS)
  ------------------------------------------------  */
  const houseData = {
    buildUrl(location) {
      const locationString = `/${location[4].long_name.toLowerCase()}/${location[2].long_name.toLowerCase()}/+1km/`;
      app.get(`${fundaBaseUrl}type=koop&zo=${locationString}&page=1&pagesize=25`);
    },
    /* CLEAN UP THE HOUSE DATA FOR LISTS
    ------------------------------------------------  */
    clean(data) {
      console.log(data);
      data.Objects.map(function(house) {

      });
      this.setAttributes(data);
    },
    /* SETUP THE ATTRIBUTES FOR DOM ELEMENTS
    ------------------------------------------------  */
    setAttributes(data) {
      let attributes = {
        house_id: {
          href: function() {
            return `#detail/${this.Id}`;
          }
        },
        list_image: {
          src: function() {
            return this.FotoLarge;
          }
        }
      }
      this.render(data, attributes)
    },
    /* ALL FILTER FUNCTIONALITY
    ------------------------------------------------  */
    filter(data) {

    },
    /* RENDER THE CLEANED LIST WITH ATTRIBUTES
    ------------------------------------------------  */
    render(data, attributes) {
      Transparency.render(elements.listSection, data.Objects, attributes);
    }
  };

  /* METHODS FOR THE HOUSE DETAIL PAGES
  ------------------------------------------------  */
  const houseDetail = {
    /* BUILD UP THE URL TO GET THE HOUSE DETAILS
    ------------------------------------------------  */
    buildUrl(id) {
      app.get(`http://funda.kyrandia.nl/feeds/Aanbod.svc/json/detail/${fundaApiKey}/koop/${id}/`)
    },
    /* CLEAN DATA FOR THE DETAIL VIEW
    ------------------------------------------------  */
    clean(data) {
      console.log(data);
    }
  }

  /* EVENT HANDLERS
  ------------------------------------------------  */
  const events = {
    /* INITIALIZE ALL EVENT LISTNERS
    ------------------------------------------------  */
    init() {

    }
  };

  /* ROUTIE FOR ROUTE HANDELING
  ------------------------------------------------  */
  routie({
    '': () => {

    },
    'detail/:id': (id) => {
      houseDetail.buildUrl(id);
    }
  });

  /* INITIALIZE THE APPLICATION
  ------------------------------------------------  */
  app.init();

};
